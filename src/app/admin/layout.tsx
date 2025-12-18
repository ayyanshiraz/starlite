"use client";

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [permissions, setPermissions] = useState<string[]>([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. FETCH USER DATA FROM SERVER
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 🟢 FIX: Added { cache: 'no-store' } to prevent stale 401 errors
        const res = await fetch('/api/admin/me', { cache: 'no-store' });
        
        if (res.ok) {
          const data = await res.json();
          setIsSuperAdmin(data.user.isSuperAdmin);
          setUsername(data.user.username);

          // 🟢 LOGIC: Handle permissions
          // If it is specifically the 'purchasing' user, force 'products' permission
          if (data.user.username === 'purchasing') {
            setPermissions(['products']);
          } 
          // Otherwise rely on DB permissions if you have them implemented
          else if (data.user.permissions) {
            setPermissions(data.user.permissions.split(','));
          }
          // Default fallback for other admins (give them dashboard/orders/products)
          else if (!data.user.isSuperAdmin) {
             setPermissions(['dashboard', 'orders', 'products']);
          }

        } else {
          // If fetch fails (e.g. cookie expired), redirect to login
          router.push('/admin/login');
        }
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we are NOT on the login page
    if (pathname !== '/admin/login') {
      fetchUser();
    }
  }, [pathname, router]);

  const canAccess = (module: string) => {
    // If SuperAdmin, allow everything
    if (isSuperAdmin) return true; 
    // If standard admin, check specific permissions
    return permissions.includes(module);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (err) {
      console.error("Logout failed", err);
    }
    // Force Redirect
    window.location.href = '/admin/login';
  };

  // If on login page, render children without sidebar
  if (pathname === '/admin/login') return <>{children}</>;

  const NavItem = ({ href, label, extraClass = '' }: { href: string; label: string, extraClass?: string }) => {
    // Check if current path starts with the href (for active state)
    const isActive = pathname.startsWith(href);
    return (
      <Link 
        href={href} 
        className={`block px-4 py-3 rounded mb-1 transition-colors ${
          isActive ? 'bg-blue-700 text-white font-bold' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
        } ${extraClass}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-[#00001E] text-white flex-shrink-0 flex flex-col h-screen sticky top-0 z-20">
        <div className="p-6 border-b border-gray-800 mb-4 text-center">
          <h2 className="text-xl font-bold tracking-wider">ADMIN PORTAL</h2>
          <p className="text-xs text-gray-500 mt-2">
            {loading ? 'Loading...' : `User: ${username}`}
          </p>
        </div>
        
        <nav className="px-4 space-y-1 flex-1">
          {/* 🟢 Render Links based on permissions */}
          {canAccess('dashboard') && <NavItem href="/admin/dashboard" label="Overview" />}
          {canAccess('orders') && <NavItem href="/admin/orders" label="Orders & Quotes" />}
          {canAccess('products') && <NavItem href="/admin/products" label="Product Manager" />}
          
          {isSuperAdmin && (
            <NavItem 
              href="/admin/users" 
              label="User Management" 
              extraClass="text-yellow-400 hover:text-yellow-200 font-bold border border-gray-700 mt-4" 
            />
          )}
        </nav>

        <div className="p-4 mt-6 border-t border-gray-800">
          <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-bold transition-colors flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}