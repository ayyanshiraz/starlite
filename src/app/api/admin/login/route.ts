import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log("Attempting login for:", username);

    // 1. Find the user in the database
    const user = await prisma.adminUser.findFirst({
      where: { username: username },
    });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // 2. Check Password
    if (user.password !== password) {
      console.log("Wrong password");
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // 3. Login Success: Set Cookies
    const cookieStore = await cookies();

    // Cookie A: The "Access Pass" (Used by Middleware to allow access)
    cookieStore.set('auth_token', 'valid_token', { 
        httpOnly: true, 
        path: '/',
        maxAge: 86400 // 1 day
    });

    // Cookie B: The "Identity Card" (Used by Layout to know WHO you are)
    // 🟢 THIS IS THE NEW PART THAT FIXES YOUR SIDEBAR 🟢
    cookieStore.set('auth_user', user.username, { 
        httpOnly: true, 
        path: '/',
        maxAge: 86400 
    });

    console.log("Login success. Is Super Admin?", user.isSuperAdmin);

    // 4. Return success response
    return NextResponse.json({ 
      success: true,
      user: {
        username: user.username,
        permissions: user.permissions || "", 
        isSuperAdmin: user.isSuperAdmin || false 
      }
    });

  } catch (error) {
    console.error("LOGIN API CRASHED:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}