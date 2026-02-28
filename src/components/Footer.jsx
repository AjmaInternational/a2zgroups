import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-display tracking-tighter">A2Z<span className="text-primary">GROUPS</span></h2>
            <p className="text-gray-400 leading-relaxed">
              Redefining premium retail with a focus on quality, sustainability, and modern design. Based in the UK, serving the world.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold tracking-widest mb-8 text-primary">SHOP</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><Link to="/shop" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=Apparel" className="hover:text-white transition-colors">Apparel</Link></li>
              <li><Link to="/shop?category=Accessories" className="hover:text-white transition-colors">Accessories</Link></li>
              <li><Link to="/shop?category=Footwear" className="hover:text-white transition-colors">Footwear</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-widest mb-8 text-primary">COMPANY</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold tracking-widest mb-8 text-primary">NEWSLETTER</h4>
            <p className="text-gray-400 mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/5 border border-white/10 rounded-full px-6 py-3 flex-grow focus:outline-none focus:border-primary transition-colors"
              />
              <button className="bg-primary hover:bg-primary-dark p-3 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500 font-medium">
          <p>© 2024 A2ZGROUPS LTD. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">INSTAGRAM</a>
            <a href="#" className="hover:text-white transition-colors">FACEBOOK</a>
            <a href="#" className="hover:text-white transition-colors">TWITTER</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
