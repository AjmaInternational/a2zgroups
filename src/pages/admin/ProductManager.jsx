import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { useProducts, useCategories } from "../../hooks/useData";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import ImageUpload from "../../components/admin/ImageUpload";

const ProductManager = () => {
  const { products, refresh: refreshProducts } = useProducts();
  const { categories } = useCategories();

  const [editingProduct, setEditingProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    stock: 0,
    is_promotional: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        price: editingProduct.price || "",
        description: editingProduct.description || "",
        category: editingProduct.category || "",
        stock: editingProduct.stock || 0,
        is_promotional: editingProduct.is_promotional || false,
      });
      setImageUrl(editingProduct.image_url || "");
    } else {
      setFormData({
        name: "",
        price: "",
        description: "",
        category: "",
        stock: 0,
        is_promotional: false,
      });
      setImageUrl("");
    }
  }, [editingProduct]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        image_url: imageUrl, // 🔥 from ImageUpload
      };

      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert([productData]);
        if (error) throw error;
      }

      setEditingProduct(null);
      refreshProducts();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) alert(error.message);
      refreshProducts();
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex justify-between items-end pb-12 border-b border-slate-800">
        <div>
          <h1 className="text-6xl font-display font-black uppercase tracking-tighter text-white">
            PRODUCTS
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs mt-2">
            Manage inventory
          </p>
        </div>
        <button
          onClick={() => setEditingProduct(null)}
          className="bg-primary text-white px-8 py-4 rounded-full font-bold uppercase text-[10px]"
        >
          Add New Product
        </button>
      </header>

      <div className="grid lg:grid-cols-3 gap-16">
        {/* FORM */}
        <div className="lg:col-span-1">
          <div className="bg-slate-950 p-12 rounded-[4rem] border border-slate-800 sticky top-32">
            <h2 className="text-2xl font-display font-black uppercase mb-10 text-white">
              {editingProduct ? "Edit" : "Add"} Product
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Product Name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
              />

              <Input
                label="Price"
                name="price"
                type="number"
                required
                value={formData.price}
                onChange={handleInputChange}
              />

              <Input
                label="Stock"
                name="stock"
                type="number"
                required
                value={formData.stock}
                onChange={handleInputChange}
              />

              {/* CATEGORY */}
              <div>
                <label className="text-xs text-slate-400 uppercase">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* DESCRIPTION */}
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-white"
              />

              {/* 🔥 IMAGE UPLOAD COMPONENT */}
              <ImageUpload
                onUpload={(url) => setImageUrl(url)}
                currentImage={imageUrl}
              />

              {/* PROMOTIONAL */}
              <label className="flex items-center gap-3 text-white">
                <input
                  type="checkbox"
                  name="is_promotional"
                  checked={formData.is_promotional}
                  onChange={handleInputChange}
                />
                Promotional Product
              </label>

              <Button type="submit" size="xl" disabled={loading}>
                {loading
                  ? "Saving..."
                  : editingProduct
                  ? "Update Product"
                  : "Create Product"}
              </Button>
            </form>
          </div>
        </div>

        {/* PRODUCT LIST */}
        <div className="lg:col-span-2">
          <div className="bg-slate-950 rounded-[4rem] border border-slate-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-slate-400 text-xs uppercase">
                  <th className="p-6">Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-slate-800">
                    <td className="p-6">
                      <img
                        src={
                          product.image_url ||
                          "https://via.placeholder.com/100"
                        }
                        className="w-14 h-14 object-cover rounded-xl"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>£{product.price}</td>
                    <td>{product.stock}</td>
                    <td className="space-x-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="text-primary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500"
                      >
                        Delete
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
  );
};

export default ProductManager;