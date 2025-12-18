import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cookieStore = await cookies();
    // 🟢 1. Use the correct cookie name: 'admin_session'
    const sessionCookie = cookieStore.get('admin_session');

    if (!sessionCookie) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }

    // 🟢 2. Parse the session data (It is stored as JSON)
    let sessionData;
    try {
      sessionData = JSON.parse(sessionCookie.value);
    } catch (e) {
      return NextResponse.json({ error: "Invalid session format" }, { status: 401 });
    }

    // 🟢 3. Fetch fresh user data from DB using the ID from the session
    const user = await prisma.adminUser.findUnique({
      where: { id: sessionData.id }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // 🟢 4. Return the data structure your Frontend expects
    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        // If 'permissions' exists in your DB schema, include it. Otherwise default to empty.
        permissions: (user as any).permissions || [], 
        isSuperAdmin: user.isSuperAdmin,
        isActive: user.isActive
      }
    });

  } catch (error) {
    console.error("API/ME Error:", error);
    return NextResponse.json({ error: "Error fetching profile" }, { status: 500 });
  }
}