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

      <WaveDivider color="white" flip={true} />

      {/* Form and Info */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display uppercase mb-12 text-slate-900">Contact Information</h2>
              <div className="space-y-8">
                <div className="flex items-center space-x-6 group">
                  <div className="bg-primary/10 p-5 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-display uppercase text-slate-900 mb-1">Location</h4>
                    <p className="text-gray-600">Premium Retail District, London, UK</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 group">
                  <div className="bg-primary/10 p-5 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-display uppercase text-slate-900 mb-1">Email</h4>
                    <p className="text-gray-600">support@a2zgroups.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 group">
                  <div className="bg-primary/10 p-5 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-display uppercase text-slate-900 mb-1">Phone</h4>
                    <p className="text-gray-600">+44 20 1234 5678</p>
                  </div>
                </div>
              </div>

              <div className="mt-16">
                <h4 className="text-xl font-display uppercase text-slate-900 mb-8 tracking-widest">Follow Our Journey</h4>
                <div className="flex space-x-4">
                  {[
                    { name: 'Instagram', path: 'M7 2c-3.309 0-6 2.691-6 6v8c0 3.309 2.691 6 6 6h8c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6H7zm0 2h8c2.206 0 4 1.794 4 4v8c0 2.206-1.794 4-4 4H7c-2.206 0-4-1.794-4-4V8c0-2.206 1.794-4 4-4zm8.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM12 7c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3z' },
                    { name: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                    { name: 'Twitter', path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' }
                  ].map((social) => (
                    <a 
                      key={social.name}
                      href="#" 
                      className="bg-primary text-white p-4 rounded-2xl hover:bg-slate-900 transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/20"
                    >
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-10 md:p-12 rounded-[3rem] border border-gray-100 shadow-xl"
            >
              <h2 className="text-3xl font-display uppercase mb-8 text-slate-900">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1">
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2 text-gray-400">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white border-2 border-transparent rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all shadow-sm"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-bold tracking-widest uppercase mb-2 text-gray-400">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full bg-white border-2 border-transparent rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all shadow-sm"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest uppercase mb-2 text-gray-400">Message</label>
                  <textarea 
                    rows="5"
                    className="w-full bg-white border-2 border-transparent rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all shadow-sm resize-none"
                    placeholder="Tell us what you're thinking..."
                  ></textarea>
                </div>
                <button className="w-full bg-primary text-white font-bold uppercase py-5 rounded-2xl hover:bg-slate-900 transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/20 tracking-widest">
                  Send Message
                </button>
              </form>
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

export default Contact;
