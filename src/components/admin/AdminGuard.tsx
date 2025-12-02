"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ 
  children, 
  requiredPermission 
}: { 
  children: React.ReactNode; 
  requiredPermission: string; 
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAccess = () => {
      const stored = localStorage.getItem("adminUser");
      
      if (!stored) {
        router.replace("/admin/login");
        return;
      }

      const user = JSON.parse(stored);

      // 1. Super Admin passes everything
      if (user.isSuperAdmin) {
        setIsAuthorized(true);
        setIsChecking(false);
        return;
      }

      // 2. Check specific permission
      const perms = user.permissions ? user.permissions.split(",") : [];
      
      if (perms.includes(requiredPermission)) {
        setIsAuthorized(true);
        setIsChecking(false);
      } else {
        // 🛑 DENIED: Redirect immediately
        if (perms.includes("dashboard")) router.replace("/admin/dashboard");
        else if (perms.includes("products")) router.replace("/admin/products");
        else if (perms.includes("orders")) router.replace("/admin/orders");
        else {
            localStorage.removeItem("adminUser");
            router.replace("/admin/login");
        }
      }
    };

    checkAccess();
  }, [requiredPermission, router]);

  // 🟢 WHILE CHECKING: Show a white screen or loader (BLOCKS CONTENT)
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-400 text-sm font-medium animate-pulse">Verifying Access...</p>
      </div>
    );
  }

  // 🔴 IF DENIED: Show nothing (Redirecting...)
  if (!isAuthorized) {
    return null;
  }

  // 🟢 IF ALLOWED: Show the page content
  return <>{children}</>;
}