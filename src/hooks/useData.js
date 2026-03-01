import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let query = supabase.from('products').select('*', { count: 'exact' });

      if (filters.category && filters.category !== 'All') {
        query = query.eq('category', filters.category);
      }
      if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }
      
      if (filters.minPrice) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }

      const sortField = filters.sortField || 'created_at';
      const ascending = filters.sortOrder === 'asc';
      query = query.order(sortField, { ascending });

      if (filters.page && filters.pageSize) {
        const from = (filters.page - 1) * filters.pageSize;
        const to = from + filters.pageSize - 1;
        query = query.range(from, to);
      } else if (filters.limit) {
        query = query.limit(filters.limit);
      }
      
      const { data, error, count } = await query;
      
      if (error) {
        // Mock data for development if table doesn't exist
        const mockProducts = [
          { id: 1, name: 'Classic Premium Tee', price: 45.00, category: 'Apparel', image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800', is_new: true },
          { id: 2, name: 'Modern Wool Blazer', price: 185.00, category: 'Outwear', image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800' },
          { id: 3, name: 'Minimalist Leather Watch', price: 120.00, category: 'Accessories', image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800' },
          { id: 4, name: 'Premium Denim Jeans', price: 95.00, category: 'Apparel', image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800' },
        ];
        setProducts(mockProducts);
        setTotalCount(mockProducts.length);
      } else {
        setProducts(data);
        if (count !== null) setTotalCount(count);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [JSON.stringify(filters)]);

  return { products, totalCount, loading, error, refresh: fetchProducts };
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) {
         const mockCategories = [
          { id: 1, name: 'Apparel', image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800' },
          { id: 2, name: 'Accessories', image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800' },
          { id: 3, name: 'Footwear', image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800' },
        ];
        setCategories(mockCategories);
      } else {
        setCategories(data);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, refresh: fetchCategories };
};

export const useBanners = (location = 'home') => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = async () => {
    try {
      let query = supabase.from('banners').select('*');
      if (location !== 'all') {
        query = query.eq('location', location);
      }
      const { data, error } = await query;
      if (error) {
        setBanners([]);
      } else {
        setBanners(data);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, [location]);

  return { banners, loading, refresh: fetchBanners };
};
