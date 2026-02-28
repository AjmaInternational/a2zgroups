import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={product.image_url || 'https://via.placeholder.com/400x500?text=A2ZGROUPS'} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.is_new && (
          <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            New
          </span>
        )}
        {product.is_sold_out && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-gray-900 text-white text-sm font-bold px-6 py-2 rounded-full uppercase tracking-widest">
              Sold Out
            </span>
          </div>
        )}
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-gray-400 text-xs font-semibold uppercase tracking-widest">
            {product.category}
          </span>
        </div>
        
        <Link to={`/product/${product.id}`} className="block mb-4">
          <h3 className="text-xl font-display group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            £{product.price?.toFixed(2)}
          </span>
          <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
