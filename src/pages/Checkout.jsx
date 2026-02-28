import React, { useState } from 'react';
import Button from '../components/Button';

const Checkout = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };

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
                  <input type="text" className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-primary outline-none" required />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2 text-gray-400">Last Name</label>
                  <input type="text" className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-primary outline-none" required />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2 text-gray-400">Street Address</label>
                  <input type="text" className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-primary outline-none" required />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2 text-gray-400">City</label>
                  <input type="text" className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-primary outline-none" required />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2 text-gray-400">Postcode</label>
                  <input type="text" className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-primary outline-none" required />
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
              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white/10">
                    <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow text-sm">
                    <p className="font-bold">Premium Wool Overcoat</p>
                    <p className="text-white/60">Qty: 1</p>
                  </div>
                  <p className="font-bold">£245.00</p>
                </div>
              </div>
              <div className="border-t border-white/10 pt-6 space-y-4 mb-10">
                <div className="flex justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>£245.00</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Shipping</span>
                  <span className="text-primary font-bold uppercase">Free</span>
                </div>
                <div className="flex justify-between text-2xl font-bold pt-4 border-t border-white/10">
                  <span>TOTAL</span>
                  <span className="text-primary">£245.00</span>
                </div>
              </div>
              
              <Button type="submit" variant="primary" className="w-full rounded-2xl py-5">
                COMPLETE ORDER
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
