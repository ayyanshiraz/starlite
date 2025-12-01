"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
      console.log("1. Sending login request...");
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      console.log("2. Response received, status:", res.status);

      // Try to parse the JSON
      const data = await res.json();
      console.log("3. Data parsed:", data);

      if (res.ok) {
        console.log("4. Login successful! Saving to storage...");
        
        // 🛑 CRITICAL CHECK: Ensure data.user exists before saving
        if (data.user) {
          localStorage.setItem('adminUser', JSON.stringify(data.user));
          console.log("5. Saved to LocalStorage. Redirecting...");
          
          router.push('/admin/dashboard');
          router.refresh(); 
        } else {
          console.error("ERROR: Backend returned success but no user data!");
          setError("Login succeeded but user data is missing.");
        }

      } else {
        // Handle server errors (like 'Invalid password')
        console.warn("Login failed by server:", data.error);
        setError(data.error || 'Login failed');
      }

    } catch (err) {
      // This catches network errors or JSON parsing errors
      console.error("CRITICAL FRONTEND ERROR:", err);
      setError('Something went wrong. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h1>
        
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 text-black"
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 text-black"
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full text-white font-bold py-2 px-4 rounded transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}