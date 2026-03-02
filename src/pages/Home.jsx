import { supabase } from '../lib/supabase';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useProducts, useBanners, useCategories } from '../hooks/useData';
import ProductCard from '../components/ui/ProductCard';
import WaveDivider from '../components/WaveDivider';
import Button from '../components/ui/Button';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);
  const promoCarouselRef = useRef(null);
  const newArrivalsScrollRef = useRef(null);

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // 1. Fetch data as per requirements
  const { banners: heroBanners } = useBanners({ page: 'home', position: 'hero', active: true });
  const { banners: sliderBanners } = useBanners({ page: 'home', position: 'slider' });
  const { products: promoProducts, loading: promoLoading } = useProducts({ is_promotional: true, limit: 10 });
  const { products: newArrivals, loading: arrivalsLoading } = useProducts({ sortField: 'created_at', sortOrder: 'desc', limit: 8 });
  const { categories, loading: categoriesLoading } = useCategories();

  // Hero carousel logic
  useEffect(() => {
    if (heroBanners.length > 0) {
      const interval = setInterval(() => {
        setCurrentHeroIndex((prev) => (prev + 1) % heroBanners.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [heroBanners.length]);

  useEffect(() => {
  const test = async () => {
    const { data, error } = await supabase.from('products').select('*')
    console.log('DATA:', data)
    console.log('ERROR:', error)
  }
  test()
}, [])


  // GSAP for Hero Content
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-content > *', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      });
      gsap.from('.hero-image-container', {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
      });
    }, heroRef);
    return () => ctx.revert();
  }, [heroBanners.length > 0]);

  // GSAP Auto Sliding Carousel for Promotional Products
  useEffect(() => {
    if (promoProducts.length > 0 && promoCarouselRef.current) {
      const carousel = promoCarouselRef.current;
      const totalWidth = carousel.scrollWidth;
      
      const tl = gsap.to(carousel, {
        scrollLeft: totalWidth / 2,
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      return () => tl.kill();
    }
  }, [promoProducts]);

  // New Arrivals Auto Slider using GSAP
  useEffect(() => {
    if (newArrivals.length > 0 && newArrivalsScrollRef.current) {
      const slider = newArrivalsScrollRef.current;
      const tl = gsap.to(slider, {
        scrollLeft: slider.scrollWidth / 2,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
      return () => tl.kill();
    }
  }, [newArrivals]);

  return (
    <div className="overflow-hidden">
      {/* 1. Hero Section (Dynamic) */}
      <section 
        ref={heroRef}
        className="relative min-h-[90vh] md:min-h-screen flex items-center bg-white px-6 lg:px-20 py-20 lg:py-0 mt-16 md:mt-9"
      >
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="hero-content z-10 text-center lg:text-left">
            <h4 className="text-primary font-bold tracking-widest mb-4 uppercase text-xs md:text-sm">A2ZGROUPS PREMIUM</h4>
            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 font-display font-black">
              REDEFINE <br />
              <span className="text-primary">YOUR STYLE</span>
            </h1>
            <p className="text-gray-600 text-base md:text-xl max-w-xl mb-10 mx-auto lg:mx-0">
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
          
          <div className="hero-image-container relative hidden lg:block h-[600px]">
            {heroBanners.length > 0 ? (
              heroBanners.map((banner, idx) => (
                <div 
                  key={banner.id}
                  className={`absolute inset-0 z-10 w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ease-in-out transform ${
                    idx === currentHeroIndex 
                      ? 'opacity-100 translate-x-0 rotate-3' 
                      : 'opacity-0 translate-x-12 pointer-events-none'
                  }`}
                >
                  <img 
                    src={banner.image_url} 
                    alt={banner.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="absolute inset-0 z-10 w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400">Loading premium collection...</span>
              </div>
            )}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent rounded-full -z-10 blur-3xl opacity-50"></div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary rounded-full -z-10 blur-3xl opacity-20"></div>
            
            <div className="absolute -bottom-8 right-0 flex gap-4 z-20">
              {heroBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHeroIndex(idx)}
                  className={`h-1 transition-all duration-300 ${
                    idx === currentHeroIndex ? 'w-12 bg-primary' : 'w-6 bg-gray-200 hover:bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
       
      </section>

  

      {/* 2. Promotional Products Carousel (Teal Theme) */}
      <section className="relative py-32 md:py-40 bg-[#159A9C] text-white overflow-hidden">
                    <WaveDivider color="#159A9C" />
        <div className="container mx-auto px-6 mb-16 relative z-10 text-center">
          <h2 className="text-4xl md:text-7xl font-display uppercase tracking-wide mb-4">
            PROMOTIONAL <span className="text-slate-900">PRODUCTS</span>
          </h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </div>

        <div 
          ref={promoCarouselRef}
          className="flex gap-6 md:gap-8 overflow-hidden whitespace-nowrap px-6"
        >
          {promoLoading ? (
            [...Array(5)].map((_, i) => (
              <div key={i} className="min-w-[280px] md:min-w-[300px] h-[380px] md:h-[400px] bg-white/10 rounded-3xl animate-pulse"></div>
            ))
          ) : (
            // Double the items for seamless looping
            [...promoProducts, ...promoProducts].map((product, idx) => (
              <div key={`${product.id}-${idx}`} className="min-w-[280px] md:min-w-[300px] group relative bg-white/5 p-6 rounded-[2.5rem] backdrop-blur-sm border border-white/10">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl mb-6">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                </div>
                <h3 className="text-xl font-bold truncate mb-2">{product.name}</h3>
                <p className="text-accent font-bold text-lg tracking-widest">£{product.price.toFixed(2)}</p>
              </div>
            ))
          )}
        </div>
      </section>

      

      {/* 3. New Arrivals Auto Slider (White Theme) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 mb-16">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-center md:text-left">
            <div>
              <h4 className="text-primary font-bold tracking-[0.3em] mb-2 uppercase text-xs">JUST LANDED</h4>
              <h2 className="text-4xl md:text-6xl text-slate-900 font-display font-black uppercase">NEW ARRIVALS</h2>
            </div>
            <Link to="/shop" className="text-primary font-bold border-b-2 border-primary pb-1 hover:text-slate-900 hover:border-slate-900 transition-all uppercase tracking-widest text-sm">
              VIEW ALL COLLECTIONS
            </Link>
          </div>
        </div>

        <div 
          ref={newArrivalsScrollRef}
          className="flex gap-6 md:gap-8 overflow-hidden px-6 pb-12"
        >
          {arrivalsLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="min-w-[300px] md:min-w-[450px] aspect-[16/10] bg-gray-100 animate-pulse rounded-[2.5rem]"></div>
            ))
          ) : (
            [...newArrivals, ...newArrivals].map((product, idx) => (
              <div key={`${product.id}-${idx}`} className="min-w-[300px] md:min-w-[450px] flex-shrink-0">
                <Link to={`/product/${product.id}`} className="block group relative aspect-[16/10] overflow-hidden rounded-[2.5rem] shadow-premium hover:shadow-premium-hover transition-all duration-500">
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 text-white">
                    <span className="text-primary font-bold text-[10px] tracking-[0.2em] mb-2 uppercase">{product.category}</span>
                    <h3 className="text-2xl md:text-3xl mb-4 group-hover:translate-x-2 transition-transform duration-500 font-display font-bold uppercase">{product.name}</h3>
                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <span className="text-xl font-bold">£{product.price.toFixed(2)}</span>
                      <span className="text-[10px] font-bold border-b border-white pb-1 tracking-widest uppercase">VIEW PRODUCT</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      <WaveDivider color="#159A9C" />

      {/* 4. Promotional Banners Slider (Teal Theme) */}
      <section className="py-32 bg-[#159A9C]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {sliderBanners.map(banner => (
              <div key={banner.id} className="relative h-64 md:h-96 rounded-[3rem] overflow-hidden group shadow-2xl border border-white/10">
                <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-10">
                  <h3 className="text-white text-3xl md:text-4xl font-display font-black uppercase tracking-tight leading-none">{banner.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider flip={true} color="#159A9C" />

      {/* 5. Category Showcase (White Theme) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h4 className="text-primary font-bold tracking-[0.3em] mb-2 uppercase text-xs">COLLECTIONS</h4>
            <h2 className="text-4xl md:text-5xl mb-4 text-slate-900 font-display font-black uppercase">SHOP BY CATEGORY</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categoriesLoading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 animate-pulse rounded-3xl"></div>
              ))
            ) : (
              categories.slice(0, 3).map((category, index) => (
                <Link 
                  key={category.id}
                  to={`/shop?category=${category.id}`}
                  className={`group relative h-96 overflow-hidden rounded-[3rem] shadow-xl ${index === 1 ? 'md:translate-y-12' : ''}`}
                >
                  <img 
                    src={category.image_url} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-10">
                    <h3 className="text-3xl text-white mb-2 font-display font-black uppercase tracking-tight">{category.name}</h3>
                    <span className="text-white/80 font-bold text-[10px] tracking-widest uppercase translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                      EXPLORE COLLECTION →
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <div className="mt-32">
        <WaveDivider color="#0f172b" />
      </div>
    </div>
  );
};

export default Home;
