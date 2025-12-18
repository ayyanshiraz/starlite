import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { userId, otpCode } = await request.json();

    console.log(`🔍 VERIFY ATTEMPT for UserID: ${userId}`);
    console.log(`📥 Received Code: "${otpCode}"`);

    // 1. Find User
    const user = await prisma.adminUser.findUnique({ where: { id: userId } });

    if (!user) {
      console.log("❌ User not found in DB");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log(`💾 DB Stored Code: "${user.otpCode}"`);
    console.log(`🕒 Code Expires At: ${user.otpExpires}`);
    console.log(`⌚ Current Server Time: ${new Date()}`);

    // 2. Validate OTP
    // 🟢 Force String comparison to avoid Number vs String issues
    const inputCode = String(otpCode).trim();
    const dbCode = String(user.otpCode).trim();

    const isMatch = inputCode === dbCode;
    const isExpired = !user.otpExpires || new Date() > user.otpExpires;

    if (!isMatch) {
        console.log("❌ CODE MISMATCH: Input does not match DB.");
        return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    if (isExpired) {
        console.log("❌ CODE EXPIRED.");
        return NextResponse.json({ error: "Code has expired" }, { status: 400 });
    }

    // 3. Clear OTP
    await prisma.adminUser.update({
      where: { id: user.id },
      data: { otpCode: null, otpExpires: null }
    });

    // 4. Create Session & Set Cookie
    const sessionData = {
      id: user.id,
      username: user.username,
      role: user.isSuperAdmin ? 'superadmin' : 'admin',
      isLoggedIn: true
    };

    const cookieStore = await cookies();
    
    cookieStore.set('admin_session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: false, // Keep false for localhost testing
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 Day
    });

    console.log(`✅ SUCCESS! Cookie set for ${user.username}`);

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("OTP VERIFY ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}