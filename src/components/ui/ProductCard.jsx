import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, name, price, image_url, category, is_sold_out } = product;

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
      {/* Product Image */}
      <Link to={`/product/${id}`} className="block overflow-hidden aspect-[4/5] relative">
        <img 
          src={image_url || 'https://via.placeholder.com/400x500?text=A2ZGROUPS'} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {is_sold_out && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-black px-4 py-2 rounded-full font-display font-bold text-xs uppercase tracking-widest">Sold Out</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <span className="bg-primary/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">{category}</span>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/product/${id}`} className="block">
            <h3 className="text-slate-900 font-display text-lg font-bold leading-tight group-hover:text-primary transition-colors">{name}</h3>
          </Link>
          <p className="text-primary font-bold text-lg">£{price}</p>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <button 
            disabled={is_sold_out}
            className="flex-1 bg-slate-900 text-white py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-colors disabled:opacity-50"
          >
            Add to Cart
          </button>
          <button className="ml-3 p-3 rounded-2xl bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
