import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // 🟢 1. Define Paths
  const isLoginPage = path === '/admin/login';
  const isProtectedPath = path.startsWith('/admin') && !isLoginPage;

  // 🟢 2. Get the Cookie
  // Note: We named it 'admin_session' in your Login API
  const sessionCookie = request.cookies.get('admin_session');
  
  // 🟢 3. Parse the Cookie to find the Role
  let userRole = null;
  if (sessionCookie) {
    try {
      const sessionData = JSON.parse(sessionCookie.value);
      userRole = sessionData.username === 'purchasing' ? 'purchasing' : sessionData.role; 
      // (Or strictly check sessionData.username if you prefer)
    } catch (e) {
      console.error("Middleware: Failed to parse session cookie");
    }
  }

  // --- SCENARIO A: Not Logged In ---
  // Trying to access admin pages without a cookie -> Go to Login
  if (isProtectedPath && !sessionCookie) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // --- SCENARIO B: Already Logged In ---
  if (sessionCookie) {
    
    // 1. If user is on Login Page -> Send them to their "Home"
    if (isLoginPage) {
      if (userRole === 'purchasing') {
        return NextResponse.redirect(new URL('/admin/products', request.url));
      }
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    // 2. RESTRICTION: Purchasing User trying to access Dashboard or Orders
    // If 'purchasing' user tries to go ANYWHERE except /admin/products, force them back.
    if (userRole === 'purchasing') {
      // Allow /admin/products and sub-routes like /admin/products/add
      if (!path.startsWith('/admin/products')) {
         return NextResponse.redirect(new URL('/admin/products', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};