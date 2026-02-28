import Button from '../components/ui/Button';

const About = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="container mx-auto px-6 pt-12">
        <h1 className="text-6xl md:text-8xl font-display font-black text-slate-900 mb-12 uppercase tracking-tighter">ABOUT <span className="text-primary">A2ZGROUPS</span></h1>
        
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-[4rem] blur-3xl group-hover:bg-primary/30 transition-all duration-700"></div>
            <img 
              src="https://images.unsplash.com/photo-1556740734-792f40ff8923?auto=format&fit=crop&q=80&w=1200" 
              alt="Our Story" 
              className="relative z-10 rounded-[4rem] shadow-2xl transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          
          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-4xl font-display font-black text-slate-900 uppercase tracking-tight">OUR <span className="text-primary">STORY</span></h2>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                Born in the heart of the UK, A2ZGROUPS started with a simple vision: to bridge the gap between premium quality and accessible retail. We believe that every product should tell a story of craftsmanship and modern design.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                Our journey began as a small boutique, and has since evolved into a nationwide brand known for its curation of high-end electronics, fashion, and lifestyle essentials.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-10 pt-10 border-t border-slate-200">
              <div className="space-y-4 text-center">
                <h3 className="text-5xl font-display font-black text-primary uppercase">10k+</h3>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Happy Customers</p>
              </div>
              <div className="space-y-4 text-center">
                <h3 className="text-5xl font-display font-black text-primary uppercase">500+</h3>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Premium Products</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-32 bg-slate-900 text-white p-24 rounded-[5rem] text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
          
          <h2 className="text-5xl md:text-7xl font-display font-black mb-8 uppercase tracking-tighter relative z-10 leading-tight">PREMIUM RETAIL <br />FOR THE <span className="text-primary">MODERN WORLD</span></h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12 relative z-10 font-medium">
            We are dedicated to providing an unparalleled shopping experience through our commitment to quality, style, and customer satisfaction.
          </p>
          <Button variant="light" size="xl" onClick={() => window.location.href = '/shop'}>Explore Collections</Button>
        </div>
      </div>
    </div>
  );
};

export default About;
