import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useBanners } from '../../hooks/useData';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const BannerManager = () => {
  const { banners, refresh: refreshBanners } = useBanners(); 
  const [formData, setFormData] = useState({ title: '', page: 'home', position: 'hero', image_url: '', active: true });
  const [loading, setLoading] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const bannerData = {
        title: formData.title,
        page: formData.page,
        position: formData.position,
        image_url: formData.image_url,
        active: formData.active
      };

      if (editingBanner) {
        const { error } = await supabase.from('banners').update(bannerData).eq('id', editingBanner.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('banners').insert([bannerData]);
        if (error) throw error;
      }
      setFormData({ title: '', page: 'home', position: 'hero', image_url: '', active: true });
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

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title || '',
      page: banner.page || 'home',
      position: banner.position || 'hero',
      image_url: banner.image_url || '',
      active: banner.active ?? true
    });
  };

  return (
    <div className="space-y-12">
      <header className="pb-12 border-b border-slate-800 flex justify-between items-end">
        <div>
          <h1 className="text-6xl font-display font-black uppercase tracking-tighter text-white">BANNERS</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs mt-2">Manage promotional graphics</p>
        </div>
        {!editingBanner ? null : (
          <button 
            onClick={() => {
              setEditingBanner(null);
              setFormData({ title: '', page: 'home', position: 'hero', image_url: '', active: true });
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
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-2">Page</label>
                <select 
                  className="bg-slate-900 border-2 border-slate-800 px-6 py-4 rounded-3xl outline-none focus:border-primary transition-all text-sm text-white" 
                  value={formData.page} 
                  onChange={(e) => setFormData({ ...formData, page: e.target.value })}
                >
                  <option value="home">Home</option>
                  <option value="shop">Shop</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-2">Position</label>
                <select 
                  className="bg-slate-900 border-2 border-slate-800 px-6 py-4 rounded-3xl outline-none focus:border-primary transition-all text-sm text-white" 
                  value={formData.position} 
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                >
                  <option value="hero">Hero</option>
                  <option value="slider">Slider</option>
                  <option value="new-arrivals">New Arrivals</option>
                </select>
              </div>
            </div>
            <div>
  <label className="text-xs text-slate-400 uppercase">Banner Image</label>
  <input
    type="file"
    accept="image/*"
    onChange={async (e) => {

      const file = e.target.files[0];
      if (!file) return;

      const fileName = `banner-${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("banners")
        .upload(fileName, file);

      if (error) {
        alert(error.message);
        return;
      }

      const { data } = supabase.storage
        .from("banners")
        .getPublicUrl(fileName);

      setFormData({
        ...formData,
        image_url: data.publicUrl
      });

    }}
  />
</div>
            <label className="flex items-center space-x-4 cursor-pointer p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <input 
                type="checkbox" 
                checked={formData.active} 
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-5 h-5 accent-primary"
              />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Banner is Active</span>
            </label>
            <div className="pt-6">
              <Button type="submit" size="xl" className="w-full" disabled={loading}>
                {loading ? 'Processing...' : (editingBanner ? 'Update Banner' : 'Add Banner')}
              </Button>
            </div>
          </form>
        </div>

        <div className="bg-slate-950 rounded-[4rem] border border-slate-800 overflow-hidden shadow-2xl h-fit">
          <div className="p-10 border-b border-slate-800 bg-slate-950/50">
            <h2 className="text-2xl font-display font-black uppercase text-white tracking-tight">Existing <span className="text-primary">Banners</span></h2>
          </div>
          <div className="p-10">
            <div className="space-y-6">
              {banners.length === 0 ? (
                <p className="text-slate-500 text-center py-10 font-bold uppercase tracking-widest text-xs">No banners found</p>
              ) : banners.map(banner => (
                <div key={banner.id} className="relative group h-48 rounded-3xl overflow-hidden border border-slate-800 shadow-lg">
                  <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/60 p-6 flex flex-col justify-end">
                    <div className="flex gap-2 mb-2">
                      <p className="text-[8px] font-black bg-primary text-white px-3 py-1 rounded-full uppercase tracking-widest w-fit">{banner.page}</p>
                      <p className="text-[8px] font-black bg-slate-700 text-white px-3 py-1 rounded-full uppercase tracking-widest w-fit">{banner.position}</p>
                      {!banner.active && <p className="text-[8px] font-black bg-red-500 text-white px-3 py-1 rounded-full uppercase tracking-widest w-fit">Inactive</p>}
                    </div>
                    <h3 className="text-lg font-display font-black text-white uppercase tracking-tight">{banner.title}</h3>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button 
                        onClick={() => handleEdit(banner)}
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
