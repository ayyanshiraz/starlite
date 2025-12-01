"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; // Optional: If you want to add your logo

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        // 1. Save basic info to localStorage (helps UI load faster before API check)
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        
        // 2. Redirect and Refresh (Vital for Middleware to see new cookies)
        router.push('/admin/dashboard');
        router.refresh(); 
      } else {
        setError(data.error || 'Invalid credentials');
      }

    } catch (err) {
      console.error("Login Error:", err);
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4">
      
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm">
        {/* Optional Logo Header */}
        <div className="text-center mb-6">
           <h2 className="text-2xl font-bold text-gray-800">Admin Portal</h2>
           <p className="text-sm text-gray-500 mt-1">Sign in to manage your store</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-black transition"
              placeholder="Enter admin username"
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-black transition"
              placeholder="••••••••"
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full text-white font-bold py-3 px-4 rounded-lg transition-all shadow-md ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform active:scale-95'
            }`}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Back to Website Link */}
        <div className="mt-6 text-center pt-4 border-t border-gray-100">
          <Link href="/" className="text-sm text-gray-500 hover:text-blue-600 transition">
            ← Return to Live Website
          </Link>
        </div>
      </div>
    </div>
  );
}