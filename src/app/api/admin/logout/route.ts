import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  
  // Server-side deletion of HttpOnly cookies
  cookieStore.delete('auth_token');
  cookieStore.delete('auth_user');

  return NextResponse.json({ success: true });
}