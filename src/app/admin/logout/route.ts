import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Delete cookie by expiring it immediately
  // We match the path '/' to ensure we target the global cookie
  response.cookies.set('admin_session', '', { 
    httpOnly: true, 
    path: '/', 
    expires: new Date(0), // Set date to 1970 (The past)
    maxAge: 0 
  });
  
  return response;
}