import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useProducts } from '../hooks/useData';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import WaveDivider from '../components/WaveDivider';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const { products: relatedProducts } = useProducts({ limit: 4 });

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (!error && data) {
  setProduct(data);

  if (data.images && data.images.length > 0) {
    setMainImage(data.images[0]);
  } else {
    setMainImage(data.image_url);
  }
} else {
        // Mock fallback
        setProduct({
          id,
          name: 'Premium Wool Overcoat',
          price: 245.00,
          description: 'A masterpiece of contemporary design, this premium wool overcoat combines timeless elegance with modern functionality. Crafted from the finest ethically sourced wool, it offers superior warmth and a soft, luxurious feel. The structured silhouette and meticulous tailoring ensure a sharp look for any occasion.',
          category: 'Outwear',
          image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000',
          stock: 10,
          features: ['100% Premium Wool', 'Silk-lined Interior', 'Hand-stitched Details', 'Water-resistant Finish']
        });
      }
      setLoading(false);
      window.scrollTo(0, 0);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>;

  return (
    <div className="bg-white pt-32 m-12">
      <div className="container mx-auto px-6 mb-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Image Gallery */}
          <div className="lg:w-1/2 space-y-6">
            <div className="w-full h-[500px] rounded-[2rem] overflow-hidden shadow-premium">
  <img
    src={mainImage || '/assets/logo.png'}
    alt={product.name}
    className="w-full h-full object-cover"
  />
</div>
            <div className="grid grid-cols-4 gap-4">
      {product.images && product.images.map((img, i) => (

<div
  key={i}
  onClick={() => setMainImage(img)}
  className="aspect-square rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-primary cursor-pointer"
>

<img src={img} className="w-full h-full object-cover"/>

</div>

))}        
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="sticky top-32">
              <span className="text-primary font-bold tracking-[0.2em] text-sm uppercase mb-4 block">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-6xl mb-6">{product.name}</h1>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">£{product.price.toFixed(2)}</p>
              
              <div className="prose prose-lg text-gray-600 mb-10">
               <p className="text-gray-600 leading-relaxed whitespace-pre-line">
  {product.description}
</p>
                {product.features && (
                  <ul className="mt-6 space-y-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex flex-col gap-6 mb-12">
                <div className="flex items-center gap-6">
                  <span className="font-bold text-sm uppercase tracking-widest">Quantity</span>
                  <div className="flex items-center border-2 border-gray-100 rounded-full px-4 py-2">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 flex items-center justify-center hover:text-primary">—</button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:text-primary">+</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="rounded-full"
                    onClick={() => addToCart(product, quantity)}
                    disabled={product.is_sold_out}
                  >
                    ADD TO CART
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="rounded-full"
                    onClick={() => {
                      addToCart(product, quantity);
                      navigate('/checkout');
                    }}
                    disabled={product.is_sold_out}
                  >
                    BUY IT NOW
                  </Button>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-8 space-y-4">
                <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free UK delivery on orders over £50
                </div>
                <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Easy 30-day returns & exchanges
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      {/* Related Products */}
      <section className="bg-gray-50 section-spacing">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl mb-16 text-center">YOU MAY ALSO LIKE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {relatedProducts.map(rp => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
