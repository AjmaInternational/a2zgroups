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
            Our Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto opacity-90"
          >
            A2ZGROUPS is a premium retail brand dedicated to bringing the finest quality products to the UK market with a touch of modern elegance.
          </motion.p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        </div>
      </section>

      <WaveDivider color="fill-white" flip={true} />

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display uppercase mb-6 text-primary">Excellence in Every Detail</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded with a vision to redefine the retail experience, A2ZGROUPS focuses on curated collections that blend functionality with premium aesthetics. Our journey started with a simple belief: everyone deserves access to high-end quality without compromise.
              </p>
              <p className="text-gray-600 leading-relaxed">
                From our turquoise-themed accents to our meticulously designed digital presence, every element of A2ZGROUPS reflects our commitment to excellence, innovation, and customer satisfaction.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-light-bg rounded-3xl p-8 aspect-square flex items-center justify-center shadow-soft"
            >
              <div className="text-primary text-9xl font-display">A2Z</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-light-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display uppercase mb-12 text-center text-primary">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Quality', desc: 'We source only the finest materials and products for our discerning customers.' },
              { title: 'Innovation', desc: 'Constantly evolving to provide a seamless and modern shopping experience.' },
              { title: 'Customer First', desc: 'Your satisfaction is the heartbeat of everything we do at A2ZGROUPS.' }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-soft"
              >
                <h3 className="text-2xl font-display uppercase mb-4 text-primary">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
