import { useProducts, useCategories, useBanners } from '../../hooks/useData';

const AdminDashboard = () => {
  const { products } = useProducts();
  const { categories } = useCategories();
  const { banners } = useBanners();

  const stats = [
    { label: 'Products', value: products.length, icon: '📦' },
    { label: 'Categories', value: categories.length, icon: '📂' },
    { label: 'Banners', value: banners.length, icon: '🖼️' },
    { label: 'Orders', value: 0, icon: '🛒' },
  ];

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end pb-12 border-b border-slate-800">
        <div>
          <h1 className="text-6xl font-display font-black uppercase tracking-tighter text-white">DASHBOARD</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs mt-2">Welcome to A2ZGROUPS Command Center</p>
        </div>
        <div className="bg-slate-800 px-8 py-4 rounded-3xl border border-slate-700 flex items-center space-x-6">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">System Status: <span className="text-white">Optimal</span></p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-950 p-10 rounded-[3rem] border border-slate-800 hover:border-primary transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="text-5xl mb-6">{stat.icon}</div>
            <h3 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-2">{stat.label}</h3>
            <p className="text-5xl font-display font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-slate-950 p-12 rounded-[4rem] border border-slate-800">
          <h2 className="text-2xl font-display font-black uppercase mb-10 text-white tracking-tight">RECENT <span className="text-primary">PRODUCTS</span></h2>
          <div className="space-y-6">
            {products.slice(0, 5).map(product => (
              <div key={product.id} className="flex items-center justify-between p-6 bg-slate-900/50 rounded-3xl border border-slate-800">
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl overflow-hidden">
                    <img src={product.image_url || 'https://via.placeholder.com/100'} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs uppercase text-white">{product.name}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{product.category}</p>
                  </div>
                </div>
                <p className="text-primary font-black text-xs">£{product.price}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-950 p-12 rounded-[4rem] border border-slate-800 flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mb-10 border border-primary/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#159A9C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="m17 5-5-3-5 3"/><path d="m17 19-5 3-5-3"/><path d="M2 12h20"/><path d="m5 7-3 5 3 5"/><path d="m19 7 3 5-3 5"/></svg>
          </div>
          <h2 className="text-3xl font-display font-black text-white mb-4 uppercase">READY TO <span className="text-primary">SHIP</span></h2>
          <p className="text-slate-500 font-medium mb-12">You have 0 pending orders today. Great job keeping up with your customers!</p>
          <button className="bg-white text-slate-900 px-10 py-5 rounded-full font-display font-bold uppercase text-xs tracking-widest hover:bg-primary hover:text-white transition-all">Manage Orders</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
