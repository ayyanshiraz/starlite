"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 2FA State
  const [requires2FA, setRequires2FA] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.require2FA) {
        setRequires2FA(true);
        setUserId(data.userId); // Save User ID for step 2
        setLoading(false);
        return;
      }

      if (data.success) {
        if (data.user.username === 'purchasing') {
            window.location.href = "/admin/products";
        } else {
            window.location.href = "/admin/dashboard";
        }
      } else {
        setError(data.error || "Login failed");
        setLoading(false);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("Submitting 2FA...", { userId, otpCode }); // 🟢 Debug Log in Browser Console

    try {
      // 🟢 ENSURE THIS MATCHES YOUR API FILE NAME (verify-2fa or verify-otp)
      // Based on your logs, it seems you are using 'verify-2fa'
      const res = await fetch("/api/admin/verify-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // 🟢 CRITICAL: key must be 'otpCode' to match the API
        body: JSON.stringify({ userId, otpCode }), 
      });

      const data = await res.json();

      if (data.success) {
         window.location.href = "/admin/dashboard";
      } else {
        setError(data.error || "Invalid Code");
        setLoading(false);
      }
    } catch (err) {
      setError("Verification failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
           {/* Ensure you have a logo or remove this Image tag */}
           <Image src="/logofile.png" alt="Logo" width={150} height={50} className="object-contain" />
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          {requires2FA ? "Enter Security Code" : "Admin Login"}
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {!requires2FA ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input 
                type="text" 
                required 
                className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                required 
                className="w-full border rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#00001E] text-white py-2 rounded-md font-bold hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Checking..." : "Sign In"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify2FA} className="space-y-4">
            <p className="text-sm text-gray-600 text-center mb-4">
              We sent a code to your email. Please enter it below.
            </p>
            <div>
              <input 
                type="text" 
                required 
                placeholder="123456"
                className="w-full border rounded-md p-3 text-center text-2xl tracking-widest outline-none focus:ring-2 focus:ring-blue-500" 
                value={otpCode} 
                onChange={(e) => setOtpCode(e.target.value)} 
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
            <button 
                type="button" 
                onClick={() => setRequires2FA(false)}
                className="w-full text-sm text-gray-500 hover:text-gray-900 mt-2"
            >
                Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}