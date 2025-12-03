"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  // Stage 1: Credentials
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // Stage 2: 2FA
  const [show2FA, setShow2FA] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [tempUserId, setTempUserId] = useState('');
  const [message, setMessage] = useState('');
  
  // Resend Timer State
  const [countdown, setCountdown] = useState(0);

  // UI States
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Timer Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // --- 🟢 UPDATED Helper: Smart Redirect with Hard Navigation ---
  const performRedirect = (user: any) => {
    // 1. Save to Local Storage
    localStorage.setItem('adminUser', JSON.stringify(user));
    
    // 2. Determine Destination
    const perms = user.permissions ? user.permissions.split(',') : [];
    let destination = '/admin/dashboard';

    if (user.isSuperAdmin || perms.includes('dashboard')) {
        destination = '/admin/dashboard';
    } else if (perms.includes('products')) {
        destination = '/admin/products';
    } else if (perms.includes('orders')) {
        destination = '/admin/orders';
    } else if (perms.includes('users')) {
        destination = '/admin/users';
    }

    // 3. 🟢 FORCE REDIRECT (Fixes "Stuck" Issue)
    window.location.href = destination;
  };

  // 1. Handle Initial Login
  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.require2FA) {
            // 2FA REQUIRED
            setShow2FA(true);
            setTempUserId(data.userId);
            setMessage(data.message);
            setCountdown(30);
            setLoading(false); // Stop loading so user can type code
        } else if (data.user) {
            // Standard Login
            performRedirect(data.user);
        }
      } else {
        setError(data.error || 'Invalid credentials');
        setLoading(false);
      }
    } catch (err) {
      console.error("Login Error:", err);
      if (!show2FA) setError('Connection failed. Check console.');
      setLoading(false);
    }
  };

  // 2. Handle OTP Verification
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Start loading "Verifying..."

    try {
      const res = await fetch('/api/admin/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: tempUserId, code: otpCode }),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        // 🟢 SUCCESS: Redirecting...
        // (We do NOT set loading=false here because the page is about to reload)
        performRedirect(data.user);
      } else {
        setError(data.error || 'Invalid Code');
        setLoading(false); // Stop loading so user can try again
      }
    } catch (err) {
      setError('Verification failed.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4">
      
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-6">
           <h2 className="text-2xl font-bold text-gray-800">
             {show2FA ? 'Two-Step Verification' : 'Admin Portal'}
           </h2>
           <p className="text-sm text-gray-500 mt-1">
             {show2FA ? message : 'Sign in to manage your store'}
           </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded mb-6 text-sm font-medium">
            {error}
          </div>
        )}

        {!show2FA ? (
          // --- FORM 1: USERNAME / PASSWORD ---
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                required 
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-all shadow-md ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-95'
              }`}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        ) : (
          // --- FORM 2: OTP CODE ---
          <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-300">
            <form onSubmit={handleVerify}>
              <label className="block text-sm font-semibold text-gray-700 mb-1 text-center">Enter 6-Digit Code</label>
              <input 
                type="text" 
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg text-black text-center text-2xl tracking-widest font-mono focus:ring-2 focus:ring-green-500 outline-none mb-4"
                placeholder="000000"
                maxLength={6}
                autoFocus
                required 
              />

              <button 
                type="submit" 
                disabled={loading} 
                className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-all shadow-md mb-4 ${
                  loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700 hover:shadow-lg active:scale-95'
                }`}
              >
                {loading ? 'Verifying...' : 'Verify & Login'}
              </button>
            </form>
            
            {/* RESEND BUTTON */}
            <div className="text-center">
                {countdown > 0 ? (
                    <p className="text-xs text-gray-400">Resend code in {countdown}s</p>
                ) : (
                    <button 
                        onClick={() => handleLogin()} 
                        className="text-sm text-blue-600 hover:underline font-medium"
                    >
                        Resend Code
                    </button>
                )}
            </div>

            <button 
              type="button" 
              onClick={() => { setShow2FA(false); setError(''); }} 
              className="w-full text-gray-500 text-sm hover:underline mt-2"
            >
              Back to Login
            </button>
          </div>
        )}

        <div className="mt-6 text-center pt-4 border-t border-gray-100">
          <Link href="/" className="text-sm text-gray-500 hover:text-blue-600 transition">
            ← Return to Live Website
          </Link>
        </div>
      </div>
    </div>
  );
}