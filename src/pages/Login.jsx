import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, call supabase.auth.signInWithPassword
    console.log({ email, password });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 pt-20">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-premium p-10 md:p-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-2">WELCOME BACK</h1>
          <p className="text-gray-500">Enter your details to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase mb-2 text-gray-400">Email Address</label>
            <input 
              type="email" 
              className="w-full border-2 border-gray-100 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase mb-2 text-gray-400">Password</label>
            <input 
              type="password" 
              className="w-full border-2 border-gray-100 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end">
            <Link to="/forgot-password" size="sm" className="text-sm text-primary font-bold">FORGOT PASSWORD?</Link>
          </div>
          <Button type="submit" variant="primary" className="w-full rounded-2xl py-5">
            SIGN IN
          </Button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Don't have an account? {' '}
            <Link to="/register" className="text-primary font-bold">CREATE ONE</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
