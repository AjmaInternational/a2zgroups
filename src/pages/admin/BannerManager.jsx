import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useBanners } from '../../hooks/useData';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import ImageUpload from '../../components/admin/ImageUpload';

const BannerManager = () => {
  const { banners, refresh: refreshBanners } = useBanners('all'); // Fetch all locations for manager
  const [formData, setFormData] = useState({ title: '', subtitle: '', location: 'home', image_url: '' });
  const [loading, setLoading] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingBanner) {
        const { error } = await supabase.from('banners').update(formData).eq('id', editingBanner.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('banners').insert([formData]);
        if (error) throw error;
      }
      setFormData({ title: '', subtitle: '', location: 'home', image_url: '' });
      setEditingBanner(null);
      refreshBanners();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this banner?')) {
      const { error } = await supabase.from('banners').delete().eq('id', id);
      if (error) alert(error.message);
      refreshBanners();
    }
  };

  return (
    <div className="space-y-12">
      <header className="pb-12 border-b border-slate-800 flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-display font-black uppercase tracking-tighter text-white">BANNERS</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs mt-2">Manage promotional graphics</p>
        </div>
        {editingBanner && (
          <button
            onClick={() => {
              setEditingBanner(null);
              setFormData({ title: '', subtitle: '', location: 'home', image_url: '' });
            }}
            className="bg-slate-800 text-white px-8 py-4 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-slate-700 transition-all"
          >
            Create New Banner
          </button>
        )}
      </header>

      <div className="grid lg:grid-cols-2 gap-16">
        <div className="bg-slate-950 p-12 rounded-[4rem] border border-slate-800 h-fit sticky top-32">
          <h2 className="text-2xl font-display font-black uppercase mb-10 text-white tracking-tight">{editingBanner ? 'Edit' : 'Add'} <span className="text-primary">Banner</span></h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              label="Banner Title" 
              className="!bg-slate-900 !border-slate-800 !text-white" 
              required 
              value={formData.title} 
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
            />
            <Input 
              label="Subtitle" 
              className="!bg-slate-900 !border-slate-800 !text-white" 
              value={formData.subtitle} 
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} 
            />
            <div className="flex flex-col mb-4">
              <label className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-2">Location</label>
              <select 
                className="bg-slate-900 border-2 border-slate-800 px-6 py-4 rounded-3xl outline-none focus:border-primary transition-all text-sm text-white" 
                value={formData.location} 
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              >
                <option value="home">Home Page Hero</option>
                <option value="shop">Shop Page Banner</option>
                <option value="promotion">Promo Slider</option>
              </select>
            </div>
            <ImageUpload 
              currentImage={formData.image_url} 
              onUpload={(url) => setFormData({ ...formData, image_url: url })} 
            />
            <div className="pt-6">
              <Button type="submit" size="xl" className="w-full" disabled={loading}>
                {loading ? 'Adding...' : 'Add Banner'}
              </Button>
            </div>
          </form>
        </div>

        <div className="bg-slate-950 rounded-[4rem] border border-slate-800 overflow-hidden shadow-2xl h-fit">
          <div className="p-10 border-b border-slate-800 bg-slate-950/50">
            <h2 className="text-2xl font-display font-black uppercase text-white tracking-tight">Live <span className="text-primary">Banners</span></h2>
          </div>
          <div className="p-10">
            <div className="space-y-6">
              {banners.map(banner => (
                <div key={banner.id} className="relative group h-48 rounded-3xl overflow-hidden border border-slate-800 shadow-lg">
                  <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/60 p-6 flex flex-col justify-end">
                    <p className="text-[10px] font-black bg-primary text-white px-3 py-1 rounded-full uppercase tracking-widest w-fit mb-2">{banner.location}</p>
                    <h3 className="text-lg font-display font-black text-white uppercase tracking-tight">{banner.title}</h3>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => {
                          setEditingBanner(banner);
                          setFormData({ title: banner.title, subtitle: banner.subtitle, location: banner.location, image_url: banner.image_url });
                        }}
                        className="bg-white/20 backdrop-blur-md text-white p-3 rounded-2xl hover:bg-primary hover:text-white transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                      </button>
                      <button onClick={() => handleDelete(banner.id)} className="bg-red-500/20 backdrop-blur-md text-red-500 p-3 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerManager;
