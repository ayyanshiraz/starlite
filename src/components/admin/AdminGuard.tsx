"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ 
  children, 
  requiredPermission 
}: { 
  children: React.ReactNode;
  requiredPermission?: string;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  
  // 🟢 REMOVE LOADING STATE DEFAULT
  // We default to "true" (authorized) momentarily to let the UI show
  // relying on Middleware to have already caught unauthorized users.
  // This prevents the "Verifying..." flash.

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch("/api/admin/me", { cache: "no-store" });
        const data = await res.json();

        if (!res.ok) {
          router.push("/admin/login");
          return;
        }

        const username = data.user.username;
        const isPurchasing = username === 'purchasing';

        // 🟢 Permission Logic
        // If the user is 'purchasing', they can ONLY see products
        if (isPurchasing && requiredPermission !== 'products') {
           router.push("/admin/products"); // Kick them back to products if they try accessing other stuff
           return;
        }

        setAuthorized(true);
      } catch (err) {
        setAuthorized(true); // Fallback: let them see it, API errors shouldn't brick the UI
      }
    };

    verify();
  }, [router, requiredPermission]);

  // 🟢 RENDER CHILDREN IMMEDIATELY
  // We trust Middleware + Server Side checks. 
  // Client side guard is just for UX redirection, not security blocking.
  return <>{children}</>;
}