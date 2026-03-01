import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const OrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // Fallback to mock for UI demo if table missing
        setOrders([
          { id: '1', customer_name: 'John Doe', customer_email: 'john@example.com', total_amount: 1250.00, status: 'pending', created_at: new Date().toISOString() },
          { id: '2', customer_name: 'Jane Smith', customer_email: 'jane@smith.co.uk', total_amount: 450.50, status: 'shipped', created_at: new Date().toISOString() },
        ]);
      } else {
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (id, status) => {
    try {
      const { error } = await supabase.from('orders').update({ status }).eq('id', id);
      if (error) throw error;
      fetchOrders();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-12">
      <header className="pb-12 border-b border-slate-800">
        <h1 className="text-6xl font-display font-black uppercase tracking-tighter text-white">ORDERS</h1>
        <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs mt-2">Manage customer fulfillment</p>
      </header>

      <div className="bg-slate-950 rounded-[4rem] border border-slate-800 overflow-hidden shadow-2xl">
        <div className="p-10 border-b border-slate-800 bg-slate-950/50 flex justify-between items-center">
          <h2 className="text-2xl font-display font-black uppercase text-white tracking-tight">Recent <span className="text-primary">Orders</span></h2>
          <span className="text-[10px] font-black bg-primary/20 text-primary px-4 py-2 rounded-full uppercase tracking-widest">{orders.length} Total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 border-b border-slate-800 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <tr>
                <th className="px-10 py-6">Order ID</th>
                <th className="px-10 py-6">Customer</th>
                <th className="px-10 py-6">Date</th>
                <th className="px-10 py-6">Total</th>
                <th className="px-10 py-6">Status</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr><td colSpan="6" className="text-center py-20 text-slate-500 uppercase font-black text-[10px] tracking-widest">Loading orders...</td></tr>
              ) : orders.map(order => (
                <tr key={order.id} className="hover:bg-slate-900/30 transition-colors group">
                  <td className="px-10 py-6 font-bold text-xs text-white uppercase tracking-widest">#{order.id.toString().slice(0, 8)}</td>
                  <td className="px-10 py-6">
                    <p className="font-bold text-xs text-white uppercase">{order.customer_name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{order.customer_email}</p>
                  </td>
                  <td className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">{new Date(order.created_at).toLocaleDateString()}</td>
                  <td className="px-10 py-6 font-display font-bold text-primary text-sm">£{parseFloat(order.total_amount).toFixed(2)}</td>
                  <td className="px-10 py-6">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest bg-slate-900 border-none outline-none cursor-pointer
                        ${order.status === 'pending' ? 'text-yellow-500' :
                          order.status === 'shipped' ? 'text-green-500' :
                          'text-red-500'}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <button className="bg-slate-800 text-white px-6 py-2 rounded-full font-bold uppercase text-[8px] tracking-[0.2em] hover:bg-primary hover:text-white transition-all">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManager;
