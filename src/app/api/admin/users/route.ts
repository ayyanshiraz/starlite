import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Fetch All
export async function GET() {
  const users = await prisma.adminUser.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(users);
}

// POST: Create User (Keep your existing one)
// POST: Create New User
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // 🟢 Extract isSuperAdmin from the request body
    const { username, password, permissions, isSuperAdmin } = body;

    const newUser = await prisma.adminUser.create({
      data: {
        username,
        password,
        permissions: permissions.join(','),
        // 🟢 Use the value passed from frontend, default to false if missing
        isSuperAdmin: isSuperAdmin || false, 
        isActive: true
      }
    });
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}

// PUT: Update (Password OR Ban Status)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { userId, newPassword, isActive, permissions, isSuperAdmin } = body; // Added isSuperAdmin

    const updateData: any = {};
    
    if (newPassword) updateData.password = newPassword;
    if (typeof isActive === 'boolean') updateData.isActive = isActive;
    if (typeof isSuperAdmin === 'boolean') updateData.isSuperAdmin = isSuperAdmin; // 🟢 Added this check
    
    if (Array.isArray(permissions)) {
        updateData.permissions = permissions.join(',');
    }

    await prisma.adminUser.update({
      where: { id: userId },
      data: updateData
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE: Remove User
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    // Prevent deleting Super Admin (Safety check)
    const userToCheck = await prisma.adminUser.findUnique({ where: { id } });
    if (userToCheck?.isSuperAdmin) {
       return NextResponse.json({ error: "Cannot delete Super Admin" }, { status: 403 });
    }

    await prisma.adminUser.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}