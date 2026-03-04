import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import WaveDivider from "../components/WaveDivider";
import PromoProductCard from "../components/ui/PromoProductCard";

const Home = () => {
  // Mock data for products
  const promoProducts = [
    { id: 1, name: "Premium Jacket", price: 120, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80" },
    { id: 2, name: "Leather Boots", price: 85, image: "https://images.unsplash.com/photo-1520639889413-52a129efee15?auto=format&fit=crop&w=800&q=80" },
    { id: 3, name: "Designer Watch", price: 250, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80" },
    { id: 4, name: "Silk Scarf", price: 45, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80" },
  ];

  const newArrivals = [
    { id: 5, name: "Designer Shoes", price: 199, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80" },
    { id: 6, name: "Winter Coat", price: 299, image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1200&q=80" },
  ];
  

  const heroImages = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-32 pb-24 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between min-h-screen">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-5xl md:text-7xl font-display leading-[0.9] tracking-tight">
  <span className="block text-primary drop-shadow-md">
    ELEVATE YOUR STYLE
  </span>
  <span className="block text-primary-dark text-6xl md:text-8xl mt-2">
    WITH A2Z GROUPS
  </span>
</h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Discover our curated collection of premium products designed for the modern lifestyle.
          </p>
          <Link
            to="/shop"
            className="bg-primary text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-opacity-90 transition-all inline-block"
          >
            Shop Now
          </Link>
        </div>
        <div className="md:w-1/2 w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-2xl">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000 }}
            loop={true}
            pagination={{ clickable: true }}
            className="w-full h-full"
          >
            {heroImages.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`Hero ${index}`} className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Promotional Products */}
      <section className="bg-primary py-20 px-4 md:px-10">
        {/* Wave from Hero (white) to Promo (primary) */}
        <WaveDivider color="#159a9c" backgroundColor="white" className="-mt-20 md:-mt-32 mb-10" />
        
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white uppercase mb-4 tracking-wider">
              Promotional Products
            </h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>

          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 3000 }}
            loop={true}
            navigation
            spaceBetween={30}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {promoProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <PromoProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="bg-white py-20 px-4 md:px-10">
        {/* Wave from Promo (primary) to New Arrivals (white) */}
        <WaveDivider color="white" backgroundColor="#159a9c" className="-mt-20 md:-mt-32 mb-10" />

        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-primary font-bold uppercase tracking-widest mb-2">Just Landed</h3>
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-12">NEW ARRIVALS</h2>

          <Link
            to="/shop"
            className="inline-block text-primary font-bold border-b-2 border-primary mb-12 hover:opacity-70 transition-colors"
          >
            VIEW ALL COLLECTIONS
          </Link>

          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000 }}
            loop={true}
            pagination={{ clickable: true }}
            slidesPerView={1}
            className="rounded-2xl shadow-xl overflow-hidden"
          >
            {newArrivals.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="relative w-full h-[400px] md:h-[600px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h3 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter drop-shadow-lg">
                      {product.name}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Footer Divider (white to footer dark) */}
      <section className="bg-[#0f172b]">
        <WaveDivider color="#0f172b" backgroundColor="white" className="-mt-20 md:-mt-32" />
      </section>
    </div>
  );
};

export default Home;
