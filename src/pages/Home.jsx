import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useProducts, useBanners, useCategories } from '../hooks/useData';
import ProductCard from '../components/ui/ProductCard';
import WaveDivider from '../components/WaveDivider';
import Button from '../components/ui/Button';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

const Home = () => {

  useEffect(() => {
  gsap.from(".promo-img", {
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 1.2,
    scrollTrigger: {
      trigger: ".promo-img",
      start: "top 80%",
    }
  })
}, []);

  const heroRef = useRef(null);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const heroImages = [
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1441984908747-d4128530063b?auto=format&fit=crop&q=80&w=1000',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000',
  ];

  const { products, loading: productsLoading } = useProducts({ limit: 12 });
  const { categories, loading: categoriesLoading } = useCategories();
  const { banners: promoBanners } = useBanners('promotion');
  const scrollRef = useRef(null);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEndHero = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    } else if (isRightSwipe) {
      setCurrentHeroImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    }
  };

  const onTouchEndPromo = () => {
    if (!touchStart || !touchEnd || !promoBanners.length) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      setCurrentPromoIndex((prev) => (prev + 1) % promoBanners.length);
    } else if (isRightSwipe) {
      setCurrentPromoIndex((prev) => (prev - 1 + promoBanners.length) % promoBanners.length);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    if (promoBanners && promoBanners.length > 0) {
      const interval = setInterval(() => {
        setCurrentPromoIndex((prev) => (prev + 1) % promoBanners.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [promoBanners]);

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
        className="relative min-h-screen flex items-center bg-white px-6 lg:px-20 py-20 lg:py-0 mt-9"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEndHero}
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
          
          <div className="hero-image relative hidden lg:block h-[600px]">
            {heroImages.map((img, idx) => (
              <div 
                key={idx}
                className={`absolute inset-0 z-10 w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-1000 ease-in-out transform ${
                  idx === currentHeroImage 
                    ? 'opacity-100 translate-x-0 rotate-3' 
                    : 'opacity-0 translate-x-12 pointer-events-none'
                }`}
              >
                <img 
                  src={img} 
                  alt={`Premium Retail ${idx + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent rounded-full -z-10 blur-3xl opacity-50"></div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary rounded-full -z-10 blur-3xl opacity-20"></div>
            
            {/* Carousel Navigation Indicators */}
            <div className="absolute -bottom-8 right-0 flex gap-4 z-20">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHeroImage(idx)}
                  className={`h-1 transition-all duration-300 ${
                    idx === currentHeroImage ? 'w-12 bg-primary' : 'w-6 bg-gray-200 hover:bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <WaveDivider />
{/* PROMOTIONAL PRODUCTS COLLAGE */}
<section className="relative py-40 bg-white overflow-hidden">

  {/* CENTER TITLE */}
  <h2 className="text-center text-6xl md:text-8xl font-heading tracking-wide z-20 relative">
    PROMOTIONAL PRODUCTS
  </h2>

  {/* FLOATING IMAGES */}
  <img src="/promo1.jpg" className="promo-img absolute top-10 left-10 w-40 md:w-64" />
  <img src="/promo2.jpg" className="promo-img absolute top-20 right-20 w-48 md:w-72" />
  <img src="/promo3.jpg" className="promo-img absolute bottom-20 left-32 w-44 md:w-60" />
  <img src="/promo4.jpg" className="promo-img absolute bottom-10 right-10 w-52 md:w-80" />
  <img src="/promo5.jpg" className="promo-img absolute top-1/2 left-1/3 w-56 md:w-72" />

</section>
      
      
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

      <WaveDivider flip={true} color="#f9fafb" />

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

     
       {/* New Arrivals Carousel Section */}
      <section className="section-spacing bg-white overflow-hidden">
        <div className="container mx-auto px-6 mb-16">
          <div className="flex justify-between items-end">
            <div>
              <h4 className="text-primary font-bold tracking-widest mb-2">JUST LANDED</h4>
              <h2 className="text-5xl md:text-6xl">NEW ARRIVALS</h2>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  if (scrollRef.current) scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
                }}
                className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={() => {
                  if (scrollRef.current) scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                }}
                className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto no-scrollbar px-6 md:px-[10%] pb-12 snap-x"
        >
          {productsLoading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="min-w-[300px] md:min-w-[450px] aspect-[16/10] bg-gray-100 animate-pulse rounded-[2.5rem] flex-shrink-0"></div>
            ))
          ) : (
            products.map((product) => (
              <div key={product.id} className="min-w-[300px] md:min-w-[450px] flex-shrink-0 snap-center">
                <Link to={`/product/${product.id}`} className="block group relative aspect-[16/10] overflow-hidden rounded-[2.5rem] shadow-premium hover:shadow-premium-hover transition-all duration-500">
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-10">
                    <span className="text-primary font-bold text-xs tracking-[0.2em] mb-2 uppercase">{product.category}</span>
                    <h3 className="text-white text-3xl mb-4 group-hover:translate-x-2 transition-transform duration-500">{product.name}</h3>
                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <span className="text-white text-xl font-bold">£{product.price.toFixed(2)}</span>
                      <span className="text-white text-xs font-bold border-b border-white pb-1">VIEW PRODUCT</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
 <WaveDivider flip={true} color="#0f172b" />
    </div>
  );
};

export default Home;
