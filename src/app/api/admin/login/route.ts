import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { sendAdminOTP } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log("Attempting login for:", username);

    // 1. Find User
    const user = await prisma.adminUser.findUnique({
      where: { username: username },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 2. Check Password
    if (user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 3. Check Status
    if (!user.isActive) {
      return NextResponse.json({ error: "Account is banned. Contact Support." }, { status: 403 });
    }

    // =========================================================
    // 4. TWO-FACTOR AUTHENTICATION (2FA) FLOW
    // =========================================================
    if (user.isSuperAdmin || user.email) {
        
        // A. Generate 6-digit Code
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 Minutes expiry

        // 🟢 DEBUG: Print OTP to Terminal (So you can login even if email fails)
        console.log("============================================");
        console.log(`🔐 YOUR LOGIN OTP IS: ${otp}`);
        console.log("============================================");

        // B. Save Code to DB
        await prisma.adminUser.update({
          where: { id: user.id },
          data: { otpCode: otp, otpExpires: expires }
        });

        // C. Send Email (We don't await this, so it doesn't block the UI if it's slow)
        const targetEmail = user.email || 'billing@starlightlinkers.com';
        
        // We run this in the background so the UI doesn't hang
        sendAdminOTP(targetEmail, otp).catch(err => console.error("Background Email Failed:", err));

        // D. Return "2FA Required" immediately
        return NextResponse.json({ 
            require2FA: true, 
            userId: user.id,
            message: `OTP Code sent to ${targetEmail}` 
        });
    }

    // =========================================================
    // 5. STANDARD LOGIN FLOW
    // =========================================================
    const cookieStore = await cookies();

    cookieStore.set('auth_token', 'valid_token', { 
        httpOnly: true, path: '/', maxAge: 86400 
    });

    cookieStore.set('auth_user', user.username, { 
        httpOnly: true, path: '/', maxAge: 86400 
    });

    const userCookieData = JSON.stringify({ 
      id: user.id, 
      username: user.username, 
      permissions: user.permissions,
      isSuperAdmin: user.isSuperAdmin 
    });
    
    cookieStore.set('admin_data', userCookieData, {
        httpOnly: false, path: '/', maxAge: 86400
    });

    return NextResponse.json({ 
      success: true,
      user: {
        username: user.username,
        permissions: user.permissions || "", 
        isSuperAdmin: user.isSuperAdmin || false 
      }
    });

  } catch (error) {
    console.error("LOGIN API CRASHED:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}