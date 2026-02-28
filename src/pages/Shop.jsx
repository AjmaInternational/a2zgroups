import React, { useState } from 'react';
import { useProducts, useCategories } from '../hooks/useData';
import ProductCard from '../components/ProductCard';
import WaveDivider from '../components/WaveDivider';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  const { products, totalCount, loading } = useProducts({
    category: selectedCategory,
    search: searchQuery,
    page,
    pageSize
  });

  const { categories } = useCategories();

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Shop Hero */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl mb-4">ALL PRODUCTS</h1>
          <p className="text-white/80 text-xl font-light tracking-widest">DISCOVER YOUR NEXT FAVORITE PIECE</p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      </section>

      <div className="container mx-auto px-6 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar Filters */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-32 space-y-12">
              {/* Search */}
              <div>
                <h4 className="text-lg font-bold mb-6 border-b pb-2">SEARCH</h4>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search products..."
                    className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 focus:border-primary outline-none transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-lg font-bold mb-6 border-b pb-2">CATEGORIES</h4>
                <div className="space-y-3">
                  <button 
                    onClick={() => setSelectedCategory('All')}
                    className={`block w-full text-left py-2 px-4 rounded-lg transition-colors ${selectedCategory === 'All' ? 'bg-primary text-white font-bold' : 'hover:bg-gray-50'}`}
                  >
                    ALL PRODUCTS
                  </button>
                  {categories.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`block w-full text-left py-2 px-4 rounded-lg transition-colors ${selectedCategory === cat.name ? 'bg-primary text-white font-bold' : 'hover:bg-gray-50'}`}
                    >
                      {cat.name.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Promotional sidebar banner */}
              <div className="bg-accent rounded-3xl p-8 relative overflow-hidden">
                <h5 className="text-primary font-bold mb-2">LIMITED OFFER</h5>
                <p className="text-sm text-gray-700 mb-6">Join our newsletter and get 15% off your first order.</p>
                <button className="text-xs font-bold border-b-2 border-primary pb-1">JOIN NOW</button>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary/10 rounded-full"></div>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="flex-grow">
            <div className="flex justify-between items-center mb-12">
              <p className="text-gray-500 font-medium">SHOWING {products.length} OF {totalCount} PRODUCTS</p>
              <select className="border-none bg-transparent font-bold text-gray-900 focus:ring-0">
                <option>NEWEST ARRIVALS</option>
                <option>PRICE: LOW TO HIGH</option>
                <option>PRICE: HIGH TO LOW</option>
              </select>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse rounded-3xl"></div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-20 flex justify-center gap-4">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`w-12 h-12 rounded-full font-bold transition-all ${page === i + 1 ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' : 'bg-gray-50 hover:bg-gray-100'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-32 bg-gray-50 rounded-3xl">
                <h3 className="text-3xl mb-4">NO PRODUCTS FOUND</h3>
                <p className="text-gray-500">Try adjusting your filters or search query.</p>
                <button 
                  onClick={() => {setSelectedCategory('All'); setSearchQuery('');}}
                  className="mt-8 text-primary font-bold border-b-2 border-primary pb-1"
                >
                  CLEAR ALL FILTERS
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      <WaveDivider flip={true} color="#159a9c" />
    </div>
  );
};

export default Shop;
