import React from 'react';
import { motion } from 'framer-motion';
import WaveDivider from '../components/WaveDivider';

const Contact = () => {
  return (
    <div className="pt-20">
      {/* Contact Hero */}
      <section className="bg-primary text-white py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display uppercase leading-none mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto opacity-90"
          >
            Have a question or feedback? We'd love to hear from you.
          </motion.p>
        </div>
      </section>

      <WaveDivider color="fill-white" flip={true} />

      {/* Form and Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display uppercase mb-8 text-primary">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary text-xl">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-display uppercase text-primary">Location</h4>
                    <p className="text-gray-600">Premium Retail District, London, UK</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary text-xl">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-display uppercase text-primary">Email</h4>
                    <p className="text-gray-600">support@a2zgroups.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary text-xl">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h4 className="text-xl font-display uppercase text-primary">Phone</h4>
                    <p className="text-gray-600">+44 20 1234 5678</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="text-xl font-display uppercase text-primary mb-6">Social Media</h4>
                <div className="flex space-x-4">
                  {['instagram', 'facebook', 'twitter'].map((social) => (
                    <a 
                      key={social}
                      href="#" 
                      className="bg-primary text-white p-4 rounded-2xl hover:bg-primary/80 transition-colors"
                    >
                      <i className={`fab fa-${social} text-xl`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-light-bg p-10 rounded-3xl shadow-soft"
            >
              <h2 className="text-3xl font-display uppercase mb-8 text-primary">Send a Message</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Message</label>
                  <textarea 
                    rows="5"
                    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Tell us what you're thinking..."
                  ></textarea>
                </div>
                <button className="w-full bg-primary text-white font-display uppercase py-4 rounded-2xl hover:bg-primary/90 transition-all transform hover:-translate-y-1">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
