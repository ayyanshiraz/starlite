import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 1. GET ALL USERS
export async function GET() {
  const users = await prisma.adminUser.findMany({
    select: { id: true, username: true, permissions: true, isSuperAdmin: true, createdAt: true }
  });
  return NextResponse.json(users);
}

// 2. CREATE NEW USER
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, permissions } = body;

    // Check if user exists
    const existing = await prisma.adminUser.findUnique({ where: { username }});
    if (existing) return NextResponse.json({ error: "Username taken" }, { status: 400 });

    const newUser = await prisma.adminUser.create({
      data: {
        username,
        password, // In production, hash this!
        permissions: permissions.join(','), // Convert array to string
        isSuperAdmin: false
      }
    });

    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

// 3. CHANGE PASSWORD (ADMIN OVERRIDE)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { userId, newPassword } = body;

    await prisma.adminUser.update({
      where: { id: userId },
      data: { password: newPassword }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}