import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useProducts, useBanners, useCategories } from '../hooks/useData';
import ProductCard from '../components/ProductCard';
import WaveDivider from '../components/WaveDivider';
import Button from '../components/Button';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const { products, loading: productsLoading } = useProducts({ limit: 8 });
  const { categories, loading: categoriesLoading } = useCategories();
  const { banners } = useBanners('home');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      });
      gsap.from('.hero-image', {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center bg-white px-6 lg:px-20 py-20 lg:py-0"
      >
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="hero-content z-10 text-center lg:text-left">
            <h4 className="text-primary font-bold tracking-widest mb-4">A2ZGROUPS PREMIUM</h4>
            <h1 className="text-6xl md:text-7xl lg:text-8xl leading-tight mb-6">
              REDEFINE <br />
              <span className="text-primary">YOUR STYLE.</span>
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-xl mb-10 mx-auto lg:mx-0">
              Discover our exclusive collection of premium retail products designed for those who appreciate quality and modern aesthetics.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button to="/shop" variant="primary" size="lg" className="rounded-full px-10">
                SHOP NOW
              </Button>
              <Button to="/about" variant="outline" size="lg" className="rounded-full px-10">
                LEARN MORE
              </Button>
            </div>
          </div>
          
          <div className="hero-image relative hidden lg:block">
            <div className="relative z-10 w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1000" 
                alt="Premium Retail" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent rounded-full -z-10 blur-3xl opacity-50"></div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary rounded-full -z-10 blur-3xl opacity-20"></div>
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* Best Sellers Section */}
      <section className="section-spacing bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl mb-4">BEST SELLERS</h2>
              <p className="text-gray-500 max-w-md">Our most popular pieces, loved by customers worldwide for their quality and timeless design.</p>
            </div>
            <Link to="/shop" className="text-primary font-bold border-b-2 border-primary pb-1 hover:text-primary-dark transition-colors">
              VIEW ALL PRODUCTS
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {productsLoading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse rounded-3xl"></div>
              ))
            ) : (
              products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Category Showcase */}
      <section className="section-spacing bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl mb-4">SHOP BY CATEGORY</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categoriesLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-3xl"></div>
              ))
            ) : (
              categories.map((category, index) => (
                <Link 
                  key={category.id}
                  to={`/shop?category=${category.name}`}
                  className={`group relative h-96 overflow-hidden rounded-3xl shadow-lg ${index === 1 ? 'md:translate-y-12' : ''}`}
                >
                  <img 
                    src={category.image_url || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800'} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <h3 className="text-3xl text-white mb-2">{category.name}</h3>
                    <span className="text-white/80 font-medium translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                      EXPLORE COLLECTION →
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <div className="pt-24 lg:pt-32">
        <WaveDivider />
      </div>

      {/* Promotional Banner */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
          alt="Promotion" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary-dark/40"></div>
        <div className="relative z-10 text-center px-6">
          <h2 className="text-5xl md:text-7xl text-white mb-8">SUMMER COLLECTION 2024</h2>
          <p className="text-white/90 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light">
            Up to 40% off on selected premium items. Elevate your wardrobe today.
          </p>
          <Button to="/shop" variant="primary" size="lg" className="bg-white text-primary hover:bg-gray-100 border-none rounded-full px-12">
            SHOP THE SALE
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
