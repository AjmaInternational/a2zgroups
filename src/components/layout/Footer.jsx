import { Link } from 'react-router-dom';
import WaveDivider from '../WaveDivider';
import logo from "../../assets/logo.png";


const Footer = () => {
  
  return (
    
    <footer className="bg-slate-900 text-white pt-16 pb-8 px-6" >
      
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1 flex flex-col items-start">
          <Link to="/" className="inline-block">
            <img src={logo} alt="A2ZGROUPS" className="h-16 md:h-24 w-auto object-contain mb-4" />
          </Link>
          <p className="mt-4 text-slate-400 text-sm leading-relaxed max-w-xs">
           A2Z Groups of Companies UK is a UK-based trading and distribution company focused on delivering a wide range of consumer products to the market.
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-6 uppercase tracking-wider">Shop</h4>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li><Link to="/shop" className="hover:text-primary transition-colors">All Products</Link></li>
            <li><Link to="/shop?category=new" className="hover:text-primary transition-colors">New Arrivals</Link></li>
            <li><Link to="/shop?category=popular" className="hover:text-primary transition-colors">Popular</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-6 uppercase tracking-wider">Customer Care</h4>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-6 uppercase tracking-wider">Stay Updated</h4>
          <p className="text-slate-400 text-sm mb-4">Subscribe to our newsletter for exclusive offers and updates.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-slate-800 border-none text-white px-4 py-2 w-full rounded-l-lg focus:ring-1 focus:ring-primary outline-none text-sm"
            />
            <button className="bg-primary text-white px-4 py-2 rounded-r-lg font-bold uppercase text-xs tracking-widest hover:bg-opacity-90 transition-all">
              Join
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs gap-4">
        <p>© 2025 A2ZGROUPS LTD. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="https://www.instagram.com/_a2zgroup/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
          <a href="https://www.facebook.com/people/A2Z-Groups-of-Company-Ltd/100044358881999/#" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Facebook</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
