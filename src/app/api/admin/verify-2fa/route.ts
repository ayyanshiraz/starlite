import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers"; // 🟢 Use Next.js cookies helper

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { userId, code } = await request.json();

    // 1. Find User
    const user = await prisma.adminUser.findUnique({ where: { id: userId } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // 2. Verify Code
    if (!user.otpCode || user.otpCode !== code) {
      return NextResponse.json({ error: "Invalid Code" }, { status: 400 });
    }
    if (!user.otpExpires || new Date() > user.otpExpires) {
      return NextResponse.json({ error: "Code Expired" }, { status: 400 });
    }

    // 3. Clear OTP from DB
    await prisma.adminUser.update({
      where: { id: user.id },
      data: { otpCode: null, otpExpires: null }
    });

    // 🟢 4. SET COOKIES (Critical Fix)
    // We must set the same cookies that the Middleware checks for.
    const cookieStore = await cookies();

    // Cookie A: Access Token (Middleware checks this!)
    cookieStore.set('auth_token', 'valid_token', {
        httpOnly: true, path: '/', maxAge: 86400 
    });

    // Cookie B: Identity
    cookieStore.set('auth_user', user.username, {
        httpOnly: true, path: '/', maxAge: 86400 
    });

    // Cookie C: Admin Data
    const userCookieData = JSON.stringify({
      id: user.id,
      username: user.username,
      permissions: user.permissions,
      isSuperAdmin: user.isSuperAdmin
    });

    cookieStore.set('admin_data', userCookieData, {
        httpOnly: false, path: '/', maxAge: 86400
    });

    return NextResponse.json({ success: true, user });

  } catch (error) {
    console.error("Verify 2FA Error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}