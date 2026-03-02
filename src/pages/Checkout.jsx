import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';
import Button from '../components/ui/Button';

const Checkout = () => {
  const { cart, subtotal, clearCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('orders').insert([{
        customer_name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city}, ${formData.postcode}`,
        items: cart,
        total: subtotal,
        status: 'pending'
      }]);

      if (error) throw error;

      setShowSuccess(true);
      clearCart();
    } catch (err) {
      console.error(err);
      alert('Error creating order: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-4xl mb-8">YOUR BAG IS EMPTY</h2>
          <Button to="/shop" variant="primary">GO TO SHOP</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-5xl mb-16 text-center">CHECKOUT</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl mb-8 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</span>
                SHIPPING DETAILS
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2 text-gray-400">First Name</label>
                  <input name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-primary outline-none" required />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2 text-gray-400">Last Name</label>
                  <input name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-primary outline-none" required />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2 text-gray-400">Email Address</label>
                  <input name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-primary outline-none" required />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2 text-gray-400">Phone Number</label>
                  <input name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-primary outline-none" required />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2 text-gray-400">Street Address</label>
                  <input name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-primary outline-none" required />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2 text-gray-400">City</label>
                  <input name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-primary outline-none" required />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2 text-gray-400">Postcode</label>
                  <input name="postcode" value={formData.postcode} onChange={handleInputChange} type="text" className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-primary outline-none" required />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl mb-8 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">2</span>
                DELIVERY METHOD
              </h3>
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-4 border-2 border-primary rounded-xl cursor-pointer bg-primary/5">
                  <input type="radio" name="delivery" defaultChecked className="text-primary focus:ring-primary h-4 w-4" />
                  <div className="flex-grow">
                    <p className="font-bold">STANDARD DELIVERY</p>
                    <p className="text-sm text-gray-500">Free • 3-5 Working Days</p>
                  </div>
                </label>
                <label className="flex items-center gap-4 p-4 border-2 border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input type="radio" name="delivery" className="text-primary focus:ring-primary h-4 w-4" />
                  <div className="flex-grow">
                    <p className="font-bold">EXPRESS NEXT DAY</p>
                    <p className="text-sm text-gray-500">£9.99 • Next Working Day</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-900 text-white rounded-[2.5rem] p-10 lg:sticky lg:top-32">
              <h3 className="text-2xl mb-8">ORDER SUMMARY</h3>
              <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto no-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
                      <img src={item.image_url} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow text-sm">
                      <p className="font-bold uppercase tracking-tight">{item.name}</p>
                      <p className="text-white/60 uppercase text-[10px] font-bold tracking-widest">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold font-display text-primary">£{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-6 space-y-4 mb-10">
                <div className="flex justify-between text-white/60 font-bold text-xs uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60 font-bold text-xs uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-primary font-bold uppercase">Free</span>
                </div>
                <div className="flex justify-between text-3xl font-display pt-4 border-t border-white/10">
                  <span>TOTAL</span>
                  <span className="text-primary">£{subtotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Button type="submit" variant="primary" className="w-full rounded-2xl py-5 shadow-lg shadow-primary/20" disabled={loading}>
                {loading ? 'PROCESSING...' : 'COMPLETE ORDER'}
              </Button>
              <p className="text-xs text-center text-white/40 mt-6 px-4">
                By placing an order, you agree to our Terms & Conditions and Privacy Policy.
              </p>
            </div>
          </div>
        </form>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-[3rem] p-12 md:p-16 max-w-lg w-full text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-4xl mb-4">ORDER RECEIVED</h2>
            <p className="text-gray-500 mb-10 leading-relaxed">
              Thank you for your order. We've sent a confirmation email to your inbox. 
              Please contact us at <strong>orders@a2zgroups.uk</strong> for manual processing of payments.
            </p>
            <Button to="/shop" variant="primary" className="rounded-full px-12">
              CONTINUE SHOPPING
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
