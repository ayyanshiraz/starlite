import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendAdminOTP } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log(`Login Attempt: ${username}`); // 🟢 Debug Log

    // 1. Find User
    const user = await prisma.adminUser.findUnique({ where: { username } });

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (!user.isActive) {
      return NextResponse.json({ error: "Account is banned." }, { status: 403 });
    }

    // 2. CHECK: Super Admin or Email User -> 2FA
    if (user.isSuperAdmin || user.email) {
        
        // Generate Code
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expires = new Date(Date.now() + 5 * 60 * 1000);

        // 🟢 LOG OTP TO CONSOLE (Backup for you)
        console.log("=================================");
        console.log(`🔐 GENERATED OTP: ${otp}`);
        console.log("=================================");

        // Save to DB
        await prisma.adminUser.update({
          where: { id: user.id },
          data: { otpCode: otp, otpExpires: expires }
        });

        // Attempt Email (Fail-Safe)
        const targetEmail = user.email || 'sales@starlightlinkers.com';
        try {
            console.log(`Sending email to ${targetEmail}...`);
            await sendAdminOTP(targetEmail, otp);
            console.log("✅ Email sent successfully.");
        } catch (emailErr: any) {
            // 🔴 If email fails, LOG IT but DO NOT CRASH.
            // This allows you to still login using the Console OTP.
            console.error("❌ Email Failed (Login continuing):", emailErr.message);
        }

        return NextResponse.json({ 
            require2FA: true, 
            userId: user.id,
            message: `OTP Code sent to ${targetEmail}` 
        });
    }

    // 3. Standard Login (No 2FA) logic would go here...
    // (For your current setup, SuperAdmin always hits the block above)
    
    return NextResponse.json({ error: "2FA configuration error" }, { status: 500 });

  } catch (error: any) {
    console.error("LOGIN CRASHED:", error);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}