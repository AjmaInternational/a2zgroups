import { useState } from 'react';

const OrderManager = () => {
  // Mock data for orders
  const [orders] = useState([
    { id: 'ORD-001', customer: 'John Doe', email: 'john@example.com', total: 1250.00, status: 'pending', date: '2025-05-15' },
    { id: 'ORD-002', customer: 'Jane Smith', email: 'jane@smith.co.uk', total: 450.50, status: 'shipped', date: '2025-05-14' },
    { id: 'ORD-003', customer: 'Michael Brown', email: 'mike@brown.com', total: 89.99, status: 'cancelled', date: '2025-05-13' },
  ]);

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
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-slate-900/30 transition-colors group">
                  <td className="px-10 py-6 font-bold text-xs text-white uppercase tracking-widest">{order.id}</td>
                  <td className="px-10 py-6">
                    <p className="font-bold text-xs text-white uppercase">{order.customer}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{order.email}</p>
                  </td>
                  <td className="px-10 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">{order.date}</td>
                  <td className="px-10 py-6 font-display font-bold text-primary text-sm">£{order.total.toFixed(2)}</td>
                  <td className="px-10 py-6">
                    <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest 
                      ${order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                        order.status === 'shipped' ? 'bg-green-500/20 text-green-500' : 
                        'bg-red-500/20 text-red-500'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <button className="bg-slate-800 text-white px-6 py-2 rounded-full font-bold uppercase text-[8px] tracking-[0.2em] hover:bg-primary hover:text-white transition-all">View Details</button>
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
