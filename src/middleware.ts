import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Get the current path
  const path = request.nextUrl.pathname

  // 2. Define public paths (Paths that don't need a password)
  // We allow '/admin/login' so you can actually log in!
  const isPublicPath = path === '/admin/login'

  // 3. Get the token from the cookies
  // ⚠️ CRITICAL: Ensure this matches the name you set in your Login page code!
  // It might be 'auth_token', 'token', 'session', etc.
  const token = request.cookies.get('auth_token')?.value || ''

  // 4. LOGIC: Redirect based on scenarios

  // SCENARIO A: User is on a protected page (like /admin/dashboard) but HAS NO TOKEN
  if (!isPublicPath && !token) {
    // Kick them back to login
    return NextResponse.redirect(new URL('/admin/login', request.nextUrl))
  }

  // SCENARIO B: User is on Login page, but ALREADY HAS A TOKEN
  if (isPublicPath && token) {
    // Send them straight to dashboard (Better UX)
    return NextResponse.redirect(new URL('/admin/dashboard', request.nextUrl))
  }

  // Allow the request to proceed if checks pass
  return NextResponse.next()
}

// 5. CONFIG: Tell Middleware which paths to protect
export const config = {
  // We only run this on routes starting with /admin
  matcher: [
    '/admin/:path*'
  ]
}