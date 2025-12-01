import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, password } = body;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Check if user already exists
    const existingUser = await prisma.customer.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    // 2. Hash the password (Security)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create Customer
    await prisma.customer.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true, message: "Account created!" });

  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}