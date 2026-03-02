import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useCategories } from '../../hooks/useData';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const CategoryManager = () => {
  const { categories, refresh: refreshCategories } = useCategories();
  const [formData, setFormData] = useState({ name: '', slug: '' });
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
      setFormData({ name: '', slug: '' });
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
        <div className="bg-slate-950 p-12 rounded-[4rem] border border-slate-800 h-fit">
          <h2 className="text-2xl font-display font-black uppercase mb-10 text-white tracking-tight">Create <span className="text-primary">New Category</span></h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              label="Category Name" 
              className="!bg-slate-900 !border-slate-800 !text-white" 
              placeholder="e.g. Electronics"
              required 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            />
            <Input 
              label="Slug" 
              className="!bg-slate-900 !border-slate-800 !text-white" 
              placeholder="e.g. electronics"
              required 
              value={formData.slug} 
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/ /g, '-') })} 
            />
            <div className="pt-6">
              <Button type="submit" size="xl" className="w-full" disabled={loading}>
                {loading ? 'Adding...' : 'Add Category'}
              </Button>
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
                    <div>
                      <p className="font-bold text-xs text-white uppercase">{cat.name}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{cat.slug}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setEditingCategory(cat);
                          setFormData({ name: cat.name, slug: cat.slug });
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
