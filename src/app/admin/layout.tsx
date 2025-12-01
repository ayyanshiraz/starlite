"use client";

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [permissions, setPermissions] = useState<string[]>([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. FETCH USER DATA FROM SERVER (The Robust Fix)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/admin/me');
        if (res.ok) {
          const data = await res.json();
          setIsSuperAdmin(data.isSuperAdmin);
          setPermissions(data.permissions ? data.permissions.split(',') : []);
          setUsername(data.username);
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
    if (loading) return false;
    if (isSuperAdmin) return true; 
    return permissions.includes(module);
  };

    const handleLogout = async () => {
        // 1. Call the API to delete the HttpOnly cookie
        try {
        await fetch('/api/admin/logout', { method: 'POST' });
        } catch (err) {
        console.error("Logout failed", err);
        }

        // 2. Clear Local Storage (Browser memory)
        localStorage.removeItem('adminUser');

        // 3. Force Redirect to Login
        window.location.href = '/admin/login';
    };

  if (pathname === '/admin/login') return <>{children}</>;

  const NavItem = ({ href, label, extraClass = '' }: { href: string; label: string, extraClass?: string }) => {
    const isActive = pathname === href;
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
      <aside className="w-64 bg-[#00001E] text-white flex-shrink-0 flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-gray-800 mb-4">
          <h2 className="text-xl font-bold tracking-wider">ADMIN PORTAL</h2>
          <p className="text-xs text-gray-500 mt-2">
            {loading ? 'Loading...' : `User: ${username}`}
          </p>
        </div>
        
        <nav className="px-4 space-y-1">
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
          <button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-bold transition-colors">
            Log Out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}