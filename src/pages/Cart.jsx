import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import WaveDivider from '../components/WaveDivider';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();

  return (
    <div className="bg-white min-h-screen pt-32 mt-10">
      <div className="pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <h1 className="text-4xl md:text-5xl mb-12 md:mb-16 text-center">YOUR SHOPPING BAG</h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-8">
              {cart.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-gray-100 sm:items-center">
                  <div className="w-full sm:w-24 h-48 sm:h-32 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <img src={item.image_url || item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg md:text-xl mb-1 uppercase font-bold">{item.name}</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Quantity</span>
                      <div className="flex items-center border border-gray-100 rounded-full px-3 py-1">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center hover:text-primary">—</button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center hover:text-primary">+</button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] font-black text-gray-400 hover:text-red-500 underline uppercase tracking-[0.2em] transition-colors"
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                  <div className="text-xl font-bold font-display text-gray-900">
                    £{(item.price * item.quantity).toFixed(2)}
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
              <WaveDivider waveColor="#0f172b"/>
    </div>
  );
};

export default Cart;
