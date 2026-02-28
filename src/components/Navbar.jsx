import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="bg-primary text-white text-[10px] md:text-xs font-bold py-2 text-center tracking-[0.2em] uppercase">
        Premium Retail Experience • Free UK Delivery Over £50 • A2ZGROUPS
      </div>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-display text-gray-900 tracking-tighter">
          A2Z<span className="text-primary">GROUPS</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className="text-xs font-bold tracking-widest hover:text-primary transition-colors">HOME</Link>
          <Link to="/shop" className="text-xs font-bold tracking-widest hover:text-primary transition-colors">SHOP</Link>
          <Link to="/about" className="text-xs font-bold tracking-widest hover:text-primary transition-colors">ABOUT</Link>
          <Link to="/contact" className="text-xs font-bold tracking-widest hover:text-primary transition-colors">CONTACT</Link>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/login" className="hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
          <Link to="/cart" className="relative hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
