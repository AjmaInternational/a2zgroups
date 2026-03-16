import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../components/ui/ProductCard";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import WaveDivider from "../components/WaveDivider";
import PromoProductCard from "../components/ui/PromoProductCard";
import { useProducts, useCategories, useBanners } from "../hooks/useData";

const Home = () => {
  const { products: promotionalProducts = [] } = useProducts({
    is_promotional: true,
    limit: 10,
  });
  
const { banners: newArrivalBanners = [] } = useBanners({
  page: "home",
  position: "new-arrivals",
});


  const { categories = [] } = useCategories();

  const { banners = [] } = useBanners({
    page: "home",
    position: "hero",
  });

  const { products: allProducts = [] } = useProducts({ limit: 9 });

  return (
    <div className="flex flex-col w-full mt-10">
      {/* HERO SECTION */}
        <section className="bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-32 pb-24 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mb-10 md:mb-0"
        >
          <h1 className="text-5xl md:text-7xl font-display leading-[0.9] tracking-tight">
            <span className="block text-primary drop-shadow-md">
             Everything You Need 
            </span>

            <span className="block text-primary-dark text-6xl md:text-8xl mt-2">
            From A To Z
            </span>
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-lg mt-6">
            Explore a wide range of quality products with A2Z Groups Of Companies.
          </p>

          <Link
            to="/shop"
            className="bg-primary text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-opacity-90 transition-all inline-block"
          >
            Shop Now
          </Link>
        </motion.div>

        {/* HERO SLIDER */}
      <div className="md:w-1/2 w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-2xl">
  {banners.length > 0 && (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      loop={banners.length > 1}
      pagination={{ clickable: true }}
      className="w-full h-full"
    >
      {banners.map((banner) => (
        <SwiperSlide key={banner.id}>
          <img
            src={banner.image_url}
            alt={banner.title || "Banner"}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )}
</div>
      </section>


    {/* CATEGORY SECTION */}
<section className="bg-white py-28 px-6 relative overflow-hidden">

  <div className="max-w-7xl mx-auto text-center mb-20">
    <h3 className="text-primary font-bold uppercase tracking-[0.25em] text-sm mb-4">
      Shop by Category
    </h3>

    <h2 className="text-5xl md:text-6xl font-black text-primary leading-[1.1] tracking-tight">
      Popular Categories
    </h2>

    <p className="text-gray-500 mt-4 max-w-xl mx-auto">
      Explore curated product collections designed for modern lifestyles.
    </p>
  </div>

  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

    {categories.slice(0,3).map((category,index)=>(
      <motion.div
        key={category.id}
        initial={{opacity:0,y:40}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        transition={{delay:index*0.15}}
      >

        <Link
          to={`/shop?category=${category.name}`}
          className="group relative block overflow-hidden rounded-[28px] h-[300px] shadow-premium hover:shadow-premium-hover transition-all duration-500"
        >

          <img
            src={category.image_url}
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">

            <h3 className="text-white text-xl font-bold uppercase tracking-wider">
              {category.name}
            </h3>

            <span className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold tracking-wider group-hover:bg-primary group-hover:text-white transition-all">
              Explore
            </span>

          </div>

        </Link>

      </motion.div>
    ))}

  </div>

</section>

      {/* PROMOTIONAL PRODUCTS */}

        <div className="bg-white">
  <WaveDivider waveColor="#159a9c" />
</div>
<section className="bg-primary py-20 px-6 md:px-20">
        <div className="max-w-7xl mx-auto mt-0">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white uppercase mb-4 tracking-wider">
              Promotional Products
            </h2>

            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>

          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={promotionalProducts.length > 3}
            navigation
            spaceBetween={30}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12 px-2"
          >
            {promotionalProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <PromoProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <div className="bg-white">
  <WaveDivider waveColor="#159a9c" flip/>
</div>

      {/* ALL PRODUCTS */}
<section className="py-20 px-4 md:px-10 bg-white">
  
  <div className="max-w-7xl mx-auto text-center">

      <h3 className="text-primary font-bold uppercase tracking-widest mb-2">
      Explore
    </h3>

    <h2 className="text-4xl md:text-5xl font-black text-primary mb-16">
      ALL PRODUCTS
    </h2>

      <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
      {allProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      </motion.div>

    <Link
      to="/shop"
      className="inline-block mt-16 bg-primary text-white px-10 py-3 rounded-md font-bold uppercase tracking-widest text-sm hover:opacity-90 transition"
    >
      VIEW ALL PRODUCTS
    </Link>

  </div>
</section>

      {/* NEW ARRIVALS */}
            <div className="bg-white">
  <WaveDivider waveColor="#159a9c" />
</div>

                <section className="pt-20 pb-16 px-4 md:px-10 bg-primary">
              
                    <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-2"> NEW ARRIVALS         </h2>
<h3 className="text-white font-bold uppercase tracking-widest mb-2">               Just Landed 
          </h3>

          <Link
            to="/shop"
            className="inline-block text-white font-bold border-b-2 border-white mb-12 hover:opacity-70 transition-colors"
          >
            VIEW ALL COLLECTIONS
          </Link>

          <Swiper
  modules={[Autoplay, Pagination]}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  loop={newArrivalBanners.length > 1}
  pagination={{ clickable: true }}
  slidesPerView={1}
  className="rounded-2xl shadow-xl overflow-hidden"
>
  {newArrivalBanners.map((banner) => (
    <SwiperSlide key={banner.id}>
      <div className="relative w-full h-[400px] md:h-[600px]">
        <img
          src={banner.image_url}
          alt={banner.title || "New Arrival"}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h3 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter drop-shadow-lg">
            {banner.title}
          </h3>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
        </div>
</section>

<div className="bg-primary -mt-1" >
  <WaveDivider waveColor="#0f172a" />
</div>

</div>
  );
};

export default Home;