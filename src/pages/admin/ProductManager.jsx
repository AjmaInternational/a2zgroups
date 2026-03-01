import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useProducts, useCategories } from '../../hooks/useData';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import ImageUpload from '../../components/admin/ImageUpload';

const ProductManager = () => {
  const { products, refresh: refreshProducts } = useProducts();
  const { categories } = useCategories();
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image_url: '',
    is_sold_out: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else {
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        image_url: '',
        is_sold_out: false,
      });
    }
  }, [editingProduct]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        image_url: formData.image_url,
        is_sold_out: formData.is_sold_out,
      };

      if (editingProduct) {
        const { error } = await supabase.from('products').update(productData).eq('id', editingProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert([productData]);
        if (error) throw error;
      }
      setEditingProduct(null);
      refreshProducts();
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        image_url: '',
        is_sold_out: false,
      });
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) alert(error.message);
      refreshProducts();
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end pb-12 border-b border-slate-800">
        <div>
          <h1 className="text-6xl font-display font-black uppercase tracking-tighter text-white">PRODUCTS</h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs mt-2">Manage your premium inventory</p>
        </div>
        <button 
          onClick={() => setEditingProduct(null)}
          className="bg-primary text-white px-8 py-4 rounded-full font-bold uppercase text-[10px] tracking-[0.2em] shadow-[0_0_20px_rgba(21,154,156,0.3)] hover:scale-105 transition-all"
        >
          Add New Product
        </button>
      </header>

      <div className="grid lg:grid-cols-3 gap-16">
        {/* Form */}
        <div className="lg:col-span-1">
          <div className="bg-slate-950 p-12 rounded-[4rem] border border-slate-800 sticky top-32">
            <h2 className="text-2xl font-display font-black uppercase mb-10 text-white tracking-tight">{editingProduct ? 'Edit' : 'Add'} Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input 
                label="Product Name" 
                name="name" 
                className="!bg-slate-900 !border-slate-800 !text-white" 
                required 
                value={formData.name} 
                onChange={handleInputChange} 
              />
              <Input 
                label="Price (£)" 
                name="price" 
                type="number" 
                step="0.01" 
                className="!bg-slate-900 !border-slate-800 !text-white" 
                required 
                value={formData.price} 
                onChange={handleInputChange} 
              />
              <div className="flex flex-col mb-4">
                <label className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-2">Category</label>
                <select 
                  name="category" 
                  className="bg-slate-900 border-2 border-slate-800 px-6 py-4 rounded-3xl outline-none focus:border-primary transition-all text-sm text-white" 
                  required 
                  value={formData.category} 
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                </select>
              </div>
              <div className="flex flex-col mb-4">
                <label className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-2">Description</label>
                <textarea 
                  name="description" 
                  className="bg-slate-900 border-2 border-slate-800 px-6 py-4 rounded-3xl outline-none focus:border-primary transition-all text-sm text-white min-h-[120px]" 
                  value={formData.description} 
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <ImageUpload 
                currentImage={formData.image_url} 
                onUpload={(url) => setFormData({ ...formData, image_url: url })} 
              />
              <label className="flex items-center space-x-4 cursor-pointer p-4 bg-slate-900 rounded-2xl border border-slate-800">
                <input 
                  type="checkbox" 
                  name="is_sold_out" 
                  checked={formData.is_sold_out} 
                  onChange={handleInputChange}
                  className="w-5 h-5 accent-primary"
                />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Mark as Sold Out</span>
              </label>
              <div className="pt-6">
                <Button type="submit" size="xl" className="w-full" disabled={loading}>
                  {loading ? 'Processing...' : (editingProduct ? 'Update Product' : 'Create Product')}
                </Button>
                {editingProduct && (
                  <button 
                    type="button" 
                    onClick={() => setEditingProduct(null)} 
                    className="w-full mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="bg-slate-950 rounded-[4rem] border border-slate-800 overflow-hidden shadow-2xl">
            <div className="p-10 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
              <h2 className="text-2xl font-display font-black uppercase text-white tracking-tight">Product <span className="text-primary">Inventory</span></h2>
              <span className="text-[10px] font-black bg-primary/20 text-primary px-4 py-2 rounded-full uppercase tracking-widest">{products.length} Items</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-900/50 border-b border-slate-800 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  <tr>
                    <th className="px-10 py-6">Image</th>
                    <th className="px-10 py-6">Name</th>
                    <th className="px-10 py-6">Price</th>
                    <th className="px-10 py-6">Status</th>
                    <th className="px-10 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-slate-900/30 transition-colors group">
                      <td className="px-10 py-6">
                        <div className="w-12 h-12 bg-slate-800 rounded-xl overflow-hidden border border-slate-700 group-hover:border-primary transition-colors">
                          <img src={product.image_url || 'https://via.placeholder.com/100'} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="px-10 py-6">
                        <p className="font-bold text-xs text-white uppercase truncate max-w-[200px]">{product.name}</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{product.category || 'No Category'}</p>
                      </td>
                      <td className="px-10 py-6 font-display font-bold text-primary text-sm">£{product.price}</td>
                      <td className="px-10 py-6">
                        <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${product.is_sold_out ? 'bg-red-500/20 text-red-500' : 'bg-green-500/20 text-green-500'}`}>
                          {product.is_sold_out ? 'Sold Out' : 'Active'}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-right space-x-4">
                        <button onClick={() => setEditingProduct(product)} className="text-slate-400 hover:text-white transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductManager;
