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
      
      if (filters.minPrice !== undefined && filters.minPrice !== null) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
        query = query.lte('price', filters.maxPrice);
      }

      if (filters.is_promotional !== undefined) {
  query = query.eq('is_promotional', filters.is_promotional);
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
        throw error;
      } else {
        setProducts(data || []);
        if (count !== null) setTotalCount(count);
      }
    } catch (err) {
      setError(err.message);
      setProducts([]);
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
        throw error;
      } else {
        setCategories(data || []);
      }
    } catch (err) {
      console.error(err.message);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, refresh: fetchCategories };
};

export const useBanners = (filters = {}) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = async () => {
    try {
      let query = supabase.from('banners').select('*');
      
      // Handle legacy string argument
      const filterObj = typeof filters === 'string' ? { location: filters } : filters;

      if (filterObj.location && filterObj.location !== 'all') {
        query = query.eq('location', filterObj.location);
      }
      if (filterObj.page) {
        query = query.eq('page', filterObj.page);
      }
      if (filterObj.position) {
        query = query.eq('position', filterObj.position);
      }
      if (filterObj.active !== undefined) {
        query = query.eq('active', filterObj.active);
      }

      const { data, error } = await query;
      if (error) {
        throw error;
      } else {
        setBanners(data || []);
      }
    } catch (err) {
      console.error(err.message);
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, [JSON.stringify(filters)]);

  return { banners, loading, refresh: fetchBanners };
};
