import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const Cart = () => {
  // Mock cart items
  const items = [
    { id: 1, name: 'Premium Wool Overcoat', price: 245.00, quantity: 1, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=200' },
    { id: 2, name: 'Minimalist Leather Watch', price: 120.00, quantity: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200' },
  ];

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-5xl mb-16 text-center">YOUR SHOPPING BAG</h1>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-8">
              {items.map(item => (
                <div key={item.id} className="flex gap-6 pb-8 border-b border-gray-100 items-center">
                  <div className="w-24 h-32 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl mb-1">{item.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">QTY: {item.quantity}</p>
                    <div className="flex items-center gap-4">
                      <button className="text-xs font-bold text-gray-400 hover:text-red-500 underline uppercase tracking-widest">Remove</button>
                    </div>
                  </div>
                  <div className="text-xl font-bold">
                    £{item.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-[2.5rem] p-10 h-fit">
              <h3 className="text-2xl mb-8">ORDER SUMMARY</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-bold">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Shipping</span>
                  <span className="text-primary font-bold">FREE</span>
                </div>
                <div className="pt-4 border-t border-gray-200 flex justify-between">
                  <span className="text-xl">Total</span>
                  <span className="text-2xl font-bold text-primary">£{subtotal.toFixed(2)}</span>
                </div>
              </div>
              <Button to="/checkout" variant="primary" className="w-full rounded-2xl py-4">
                CHECKOUT NOW
              </Button>
              <div className="mt-6 flex justify-center gap-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4 opacity-50" alt="Visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4 opacity-50" alt="Mastercard" />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 mb-8">Your bag is currently empty.</p>
            <Button to="/shop" variant="primary" className="rounded-full">CONTINUE SHOPPING</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
