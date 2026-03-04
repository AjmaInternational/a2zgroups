import React from 'react';
import { Link } from 'react-router-dom';

const PromoProductCard = ({ product }) => {
  return (
    <div className="group relative bg-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-sm border border-white/10 aspect-[3/4] md:aspect-[4/5]">
      <img 
        src={product.image_url} 
        alt={product.name} 
        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
      
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-white">
        <h3 className="text-2xl md:text-4xl font-display font-black uppercase mb-4 group-hover:translate-x-2 transition-transform duration-500">
          {product.name}
        </h3>
        <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <p className="text-xl md:text-2xl font-bold text-accent">£{product.price.toFixed(2)}</p>
          <Link 
            to={`/product/${product.id}`} 
            className="text-[10px] md:text-xs font-bold border-b-2 border-white pb-1 tracking-[0.2em] uppercase hover:text-accent hover:border-accent transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PromoProductCard;
