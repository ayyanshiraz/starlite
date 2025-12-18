import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // 1. Standard Delete
    cookieStore.delete('admin_session');
    
    // 2. Aggressive Overwrite (Force Expiry)
    // This ensures even stubborn browsers drop it immediately
    cookieStore.set('admin_session', '', {
      path: '/',
      maxAge: 0,
      expires: new Date(0), // Set date to 1970
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    return NextResponse.json({ success: true, message: "Logged out" });
  } catch (error) {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}