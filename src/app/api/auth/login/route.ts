import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Find User
    const customer = await prisma.customer.findUnique({
      where: { email: email },
    });

    if (!customer) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 2. Check Password
    const isValid = await bcrypt.compare(password, customer.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // 3. Create Session Token
    const token = jwt.sign(
      { userId: customer.id, email: customer.email, name: customer.firstName },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' } // Login lasts 7 days
    );

// ... existing code ...

    // 4. Set Cookie
    const serializedCookie = serialize('customer_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    // 🟢 UPDATED RESPONSE: Send back the user's name
    const response = NextResponse.json({ 
      success: true,
      user: { firstName: customer.firstName, email: customer.email } 
    });
    
    response.headers.set('Set-Cookie', serializedCookie);

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}