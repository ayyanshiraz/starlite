import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  
  // Clear the secure cookie
  cookieStore.delete('customer_token');

  return NextResponse.json({ success: true });
}