import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cookieStore = await cookies();
    const username = cookieStore.get('auth_user')?.value;

    if (!username) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    // Fetch fresh permissions from DB
    const user = await prisma.adminUser.findUnique({
      where: { username: username }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    return NextResponse.json({
      username: user.username,
      permissions: user.permissions || "",
      isSuperAdmin: user.isSuperAdmin
    });

  } catch (error) {
    return NextResponse.json({ error: "Error fetching profile" }, { status: 500 });
  }
}