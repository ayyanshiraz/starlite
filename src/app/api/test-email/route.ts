import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // 1. Read Settings
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      return NextResponse.json({ error: "Missing Env Vars", debug: { host, user, hasPass: !!pass } });
    }

    // 2. Setup Transporter
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // True for 465, False for 587
      auth: { user, pass },
      tls: {
        // This helps with some cPanel certificate errors
        rejectUnauthorized: false 
      }
    });

    // 3. Verify Connection
    console.log(`Testing connection to ${host}:${port}...`);
    await transporter.verify();
    console.log("Connection Successful!");

    // 4. Send Test Mail
    await transporter.sendMail({
      from: user,
      to: user, // Send to yourself
      subject: "Test Email form Starlight Debugger",
      text: "If you are reading this, your email configuration is PERFECT! 🚀",
    });

    return NextResponse.json({ success: true, message: "Email sent! Check your inbox." });

  } catch (error: any) {
    console.error("Test Email Failed:", error);
    return NextResponse.json({ 
        success: false, 
        error: error.message,
        code: error.code,
        command: error.command
    }, { status: 500 });
  }
}