import React from 'react';
import { motion } from 'framer-motion';
import WaveDivider from '../components/WaveDivider';

const AboutUs = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display uppercase leading-none mb-6"
          >
            A2ZGROUPS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto opacity-90 font-light tracking-widest uppercase"
          >
            Redefining Premium Retail Excellence
          </motion.p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        </div>
      </section>

      <WaveDivider color="white" flip={true} />

      {/* Brand Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-primary font-bold tracking-widest mb-4 uppercase">Our Heritage</h4>
              <h2 className="text-5xl font-display uppercase mb-8 text-slate-900">Brand Story</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Founded with a vision to redefine the retail experience, A2ZGROUPS focuses on curated collections that blend functionality with premium aesthetics. Our journey started with a simple belief: everyone deserves access to high-end quality without compromise.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                We believe that true luxury lies in the details. From our carefully selected materials to our seamless digital experience, every touchpoint is designed to exceed expectations.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-[#159A9C]/10 rounded-[4rem] flex items-center justify-center p-12">
                <span className="text-8xl md:text-9xl font-display text-[#159A9C] font-black tracking-tighter">A2Z</span>
              </div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-accent rounded-full -z-10 opacity-50 blur-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-24 bg-[#159A9C] text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-display uppercase mb-4">Mission & Values</h2>
            <div className="w-24 h-1 bg-white mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { 
                title: 'Excellence', 
                desc: 'We strive for perfection in every product we curate, ensuring our customers receive only the best.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                  </svg>
                )
              },
              { 
                title: 'Innovation', 
                desc: 'Embracing modern technology and design trends to stay ahead in the premium retail landscape.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              { 
                title: 'Integrity', 
                desc: 'Building trust through transparency and unwavering commitment to customer satisfaction.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm p-12 rounded-[3rem] border border-white/10 hover:bg-white/20 transition-all text-center"
              >
                <div className="mb-6 flex justify-center text-accent">{value.icon}</div>
                <h3 className="text-2xl font-display uppercase mb-4">{value.title}</h3>
                <p className="text-white/80 leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden mt-8">
                  <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <h4 className="text-primary font-bold tracking-widest mb-4 uppercase">The A2Z Advantage</h4>
              <h2 className="text-5xl font-display uppercase mb-8 text-slate-900">Why Choose Us</h2>
              <ul className="space-y-6">
                {[
                  'Hand-picked curated collections',
                  'Unmatched premium build quality',
                  'Secure and seamless shopping experience',
                  'Dedicated 24/7 customer support',
                  'Sustainable and ethical sourcing'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg text-gray-700">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="mt-20">
        <WaveDivider color="#0f172b" />
      </div>
    </div>
  );
};

export default AboutUs;
