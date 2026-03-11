import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useCategories } from '../../hooks/useData';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const CategoryManager = () => {
  const { categories, refresh: refreshCategories } = useCategories();
  const [formData, setFormData] = useState({ name: '', image_url: '' });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingCategory) {
        const { error } = await supabase.from('categories').update(formData).eq('id', editingCategory.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('categories').insert([formData]);
        if (error) throw error;
      }
      setFormData({ name: '', image_url: '' });
      setEditingCategory(null);
      refreshCategories();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this category?')) {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) alert(error.message);
      refreshCategories();
    }
  };

  return (
    <div className="space-y-12">
      <header className="pb-12 border-b border-slate-800">
        <h1 className="text-6xl font-display font-black uppercase tracking-tighter text-white">CATEGORIES</h1>
        <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs mt-2">Organize your premium catalog</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-16">
        <div className="bg-slate-950 p-12 rounded-[4rem] border border-slate-800 h-fit sticky top-32">
          <h2 className="text-2xl font-display font-black uppercase mb-10 text-white tracking-tight">
            {editingCategory ? 'Edit' : 'Create New'} <span className="text-primary">Category</span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              label="Category Name" 
              className="!bg-slate-900 !border-slate-800 !text-white" 
              placeholder="e.g. Apparel"
              required 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            />
            <div>
  <label className="text-xs text-slate-400 uppercase">Category Image</label>
  <input
    type="file"
    accept="image/*"
    onChange={async (e) => {

      const file = e.target.files[0];
      if (!file) return;

      setUploading(true);

      const fileName = `category-${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("categories")
        .upload(fileName, file);

      if (error) {
        alert(error.message);
        setUploading(false);
        return;
      }

      const { data } = supabase.storage
        .from("categories")
        .getPublicUrl(fileName);

      setFormData({
        ...formData,
        image_url: data.publicUrl
      });

      setUploading(false);

    }}
  />
</div>
            <div className="pt-6">
              <Button type="submit" size="xl" className="w-full" disabled={loading}>
                {loading ? 'Processing...' : (editingCategory ? 'Update Category' : 'Add Category')}
              </Button>
              {editingCategory && (
                <button 
                  type="button" 
                  onClick={() => {setEditingCategory(null); setFormData({name:'', image_url:''});}} 
                  className="w-full mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-slate-950 rounded-[4rem] border border-slate-800 overflow-hidden shadow-2xl h-fit">
          <div className="p-10 border-b border-slate-800 bg-slate-950/50">
            <h2 className="text-2xl font-display font-black uppercase text-white tracking-tight">Existing <span className="text-primary">Categories</span></h2>
          </div>
          <div className="p-10">
            {categories.length === 0 ? (
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] text-center py-8">No categories found.</p>
            ) : (
              <div className="space-y-4">
                {categories.map(cat => (
                  <div key={cat.id} className="flex justify-between items-center p-6 bg-slate-900/50 rounded-3xl border border-slate-800 hover:border-primary transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 border border-slate-700">
                        <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-white uppercase">{cat.name}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setEditingCategory(cat);
                          setFormData({ name: cat.name, image_url: cat.image_url });
                        }} 
                        className="text-slate-400 hover:text-primary transition-colors p-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                      </button>
                      <button onClick={() => handleDelete(cat.id)} className="text-slate-400 hover:text-red-500 transition-colors p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
