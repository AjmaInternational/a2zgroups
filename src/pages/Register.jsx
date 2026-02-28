import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 pt-20">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-premium p-10 md:p-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-2">CREATE ACCOUNT</h1>
          <p className="text-gray-500">Join A2ZGROUPS for a premium experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase mb-2 text-gray-400">Full Name</label>
            <input 
              type="text" 
              className="w-full border-2 border-gray-100 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase mb-2 text-gray-400">Email Address</label>
            <input 
              type="email" 
              className="w-full border-2 border-gray-100 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase mb-2 text-gray-400">Password</label>
            <input 
              type="password" 
              className="w-full border-2 border-gray-100 rounded-2xl px-6 py-4 focus:border-primary outline-none transition-all"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <Button type="submit" variant="primary" className="w-full rounded-2xl py-5">
            SIGN UP
          </Button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Already have an account? {' '}
            <Link to="/login" className="text-primary font-bold">LOG IN</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
