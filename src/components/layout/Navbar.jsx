import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import logo from "../../assets/logo.png";


const Navbar = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-white text-[10px] py-2 px-4 text-center font-bold tracking-[0.2em] uppercase">
        PREMIUM RETAIL EXPERIENCE • FREE UK DELIVERY OVER £50 • A2ZGROUPS
      </div>
      
      {/* Main Navbar */}
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        {/* Mobile Hamburger */}
        <button 
          className="md:hidden text-slate-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>

        <Link to="/" className="flex items-center">
          <img src={logo} alt="A2ZGROUPS" className="h-14 md:h-20 w-auto object-contain shrink-0" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <Link to="/about" className="hover:text-primary transition-colors">About</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>

        <div className="flex items-center space-x-6">
          <Link to="/cart" className="relative text-slate-900 hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
          {/* Mobile Menu Overlay */}
<div
  className={`fixed top-[88px] left-0 w-full h-[calc(100vh-88px)] bg-white z-40 transition-transform duration-300 md:hidden ${
    isMenuOpen ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div className="flex flex-col p-10 space-y-8 text-2xl font-display uppercase font-black text-slate-900 bg-white h-full">
    <Link to="/" onClick={() => setIsMenuOpen(false)} className="border-b border-slate-100 pb-4">
      Home
    </Link>
    <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="border-b border-slate-100 pb-4">
      Shop
    </Link>
    <Link to="/about" onClick={() => setIsMenuOpen(false)} className="border-b border-slate-100 pb-4">
      About
    </Link>
    <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="border-b border-slate-100 pb-4">
      Contact
    </Link>
  </div>
</div>
    </nav>
  );
};

export default Navbar;
