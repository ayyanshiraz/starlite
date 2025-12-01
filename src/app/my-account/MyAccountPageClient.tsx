"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// --- ICONS (Kept Same) ---
const baseIconProps = { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "w-5 h-5 text-gray-400" };
const UserIcon = () => (<svg {...baseIconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>);
const LockIcon = () => (<svg {...baseIconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>);
const EmailIcon = () => (<svg {...baseIconProps}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>);
const EyeIcon = () => (<svg {...baseIconProps} className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 10.224 7.29 6.75 12 6.75s8.577 3.474 9.964 4.933a1.012 1.012 0 0 1 0 .639C20.577 13.776 16.71 17.25 12 17.25s-8.577-3.474-9.964-4.933Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>);
const EyeSlashIcon = () => (<svg {...baseIconProps} className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 14.334 7.21 17.25 12 17.25c.996 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.79 0 8.774 2.884 10.066 5.166A10.451 10.451 0 0 1 12 19.5c-.996 0-1.953-.138-2.863-.395m-4.028-4.028A3 3 0 0 1 9 9m4.058 4.058A3 3 0 0 1 9 9m-4.028-4.028" /></svg>);

// --- MAIN COMPONENT ---
export default function MyAccountPageClient() {
  const [activeTab, setActiveTab] = useState('login'); 

  const formVariants = {
    hidden: { opacity: 0, x: activeTab === 'login' ? -30 : 30 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
    exit: { opacity: 0, x: activeTab === 'login' ? 30 : -30, transition: { duration: 0.15 } }
  };

  return (
    <div className="bg-white text-gray-800 pt-12 pb-16 md:pb-24">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="flex flex-col items-center mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mt-4">Welcome to Starlight Linkers</h2>
          <p className="text-lg text-gray-600 mt-2">Please login or create an account to continue</p>
        </div>

        {/* Tab Switcher */}
        <div className="relative bg-gray-100 p-1 rounded-lg grid grid-cols-2 max-w-sm mx-auto mb-8">
          <motion.div
            className="absolute top-1 bottom-1 left-1 w-1/2 bg-blue-600 rounded-md"
            layoutId="tab-highlighter"
            animate={{ x: activeTab === 'login' ? '0%' : '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
          <button onClick={() => setActiveTab('login')} className={`relative z-10 w-full py-3 text-lg font-bold rounded-md transition-colors ${activeTab === 'login' ? 'text-white' : 'text-gray-700 hover:text-black'}`}>Login</button>
          <button onClick={() => setActiveTab('signup')} className={`relative z-10 w-full py-3 text-lg font-bold rounded-md transition-colors ${activeTab === 'signup' ? 'text-white' : 'text-gray-700 hover:text-black'}`}>Sign Up</button>
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'login' ? (
              <motion.div key="login" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                <LoginForm />
              </motion.div>
            ) : (
              <motion.div key="signup" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                <SignUpForm switchToLogin={() => setActiveTab('login')} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// --- LOGIN FORM ---
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

// ... inside handleLogin ...
      const data = await res.json();

      if (res.ok) {
        // 🟢 SAVE USER TO LOCAL STORAGE
        localStorage.setItem('customer_user', JSON.stringify(data.user));
        
        // Trigger event so Header updates immediately
        window.dispatchEvent(new Event('storage'));
        
        router.push('/'); 
        router.refresh();
      } else {
        setError(data.error || 'Login failed');
      }
        } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded border border-red-100 text-center">{error}</div>}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center"><EmailIcon /></span>
          <input type="email" required className="block w-full rounded-md border-gray-300 shadow-sm pl-10 pr-4 py-3 focus:ring-blue-500 focus:border-blue-500 text-gray-900" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center"><LockIcon /></span>
          <input type={showPassword ? 'text' : 'password'} required className="block w-full rounded-md border-gray-300 shadow-sm pl-10 pr-10 py-3 focus:ring-blue-500 focus:border-blue-500 text-gray-900" placeholder="Your Password" value={password} onChange={e => setPassword(e.target.value)} />
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeSlashIcon /> : <EyeIcon />}</span>
        </div>
      </div>

      <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-[#00001E] hover:bg-gray-900 disabled:bg-gray-400 transition-colors">
        {loading ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  );
};

// --- SIGN UP FORM ---
const SignUpForm = ({ switchToLogin }: { switchToLogin: () => void }) => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            firstName: formData.firstName, 
            lastName: formData.lastName, 
            email: formData.email, 
            password: formData.password 
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Account created successfully! Please login.");
        switchToLogin(); // Switch tab
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <form onSubmit={handleSignup} className="space-y-6">
      {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded border border-red-100 text-center">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center"><UserIcon /></span>
            <input type="text" id="firstName" required className="block w-full rounded-md border-gray-300 shadow-sm pl-10 pr-4 py-3 focus:ring-blue-500 focus:border-blue-500 text-gray-900" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center"><UserIcon /></span>
            <input type="text" id="lastName" required className="block w-full rounded-md border-gray-300 shadow-sm pl-10 pr-4 py-3 focus:ring-blue-500 focus:border-blue-500 text-gray-900" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center"><EmailIcon /></span>
          <input type="email" id="email" required className="block w-full rounded-md border-gray-300 shadow-sm pl-10 pr-4 py-3 focus:ring-blue-500 focus:border-blue-500 text-gray-900" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center"><LockIcon /></span>
          <input type={showPassword ? 'text' : 'password'} id="password" required className="block w-full rounded-md border-gray-300 shadow-sm pl-10 pr-10 py-3 focus:ring-blue-500 focus:border-blue-500 text-gray-900" placeholder="Create Password" value={formData.password} onChange={handleChange} />
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeSlashIcon /> : <EyeIcon />}</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center"><LockIcon /></span>
          <input type="password" id="confirmPassword" required className="block w-full rounded-md border-gray-300 shadow-sm pl-10 pr-10 py-3 focus:ring-blue-500 focus:border-blue-500 text-gray-900" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
        </div>
      </div>

      <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-[#00001E] hover:bg-gray-900 disabled:bg-gray-400 transition-colors">
        {loading ? 'Creating Account...' : 'Sign Up'}
      </button>
    </form>
  );
};