import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendAdminOTP } from "@/lib/email";
import { cookies } from "next/headers"; 

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log(`Login Attempt: ${username}`);

    // 1. Find User
    const user = await prisma.adminUser.findUnique({ where: { username } });

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (!user.isActive) {
      return NextResponse.json({ error: "Account is banned." }, { status: 403 });
    }

    // 2. CHECK: Does this user need 2FA?
    // Trigger 2FA if: (It is SuperAdmin) OR (User has an email address)
    const shouldTrigger2FA = user.isSuperAdmin || (user.email && user.email.length > 0);

    if (shouldTrigger2FA) {
        // --- 2FA LOGIC ---
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = new Date(Date.now() + 5 * 60 * 1000);

        console.log(`🔐 GENERATED OTP for ${username}: ${otp}`);

        await prisma.adminUser.update({
          where: { id: user.id },
          data: { otpCode: otp, otpExpires: expires }
        });

        const targetEmail = user.email || 'sales@starlightlinkers.com';
        
        try {
            await sendAdminOTP(targetEmail, otp);
        } catch (emailErr: any) {
            console.error("❌ Email Failed:", emailErr.message);
        }

        return NextResponse.json({ 
            require2FA: true, 
            userId: user.id,
            message: `OTP Code sent to ${targetEmail}` 
        });
    }

    // 3. NO 2FA REQUIRED (Direct Login)
    // 🟢 THIS SECTION WAS LIKELY MISSING OR CAUSING THE ERROR
    
    const sessionData = {
        id: user.id,
        username: user.username,
        role: user.isSuperAdmin ? 'superadmin' : 'admin',
        isLoggedIn: true
    };

    const cookieStore = await cookies();
    
    // Set the cookie
    cookieStore.set('admin_session', JSON.stringify(sessionData), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 // 1 Day
    });

    console.log(`✅ Direct Login Successful for ${username}`);

    return NextResponse.json({ 
        success: true,
        user: sessionData
    });

  } catch (error: any) {
    console.error("LOGIN CRASHED:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}