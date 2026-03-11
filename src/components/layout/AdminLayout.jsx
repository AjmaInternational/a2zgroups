import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';

const AdminLayout = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/safranbro-admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) return <div className="h-screen flex items-center justify-center font-display font-bold text-2xl uppercase tracking-widest text-primary animate-pulse">Checking Access...</div>;
  if (!user || !isAdmin) return null;

  return (
    <div className="flex min-h-screen bg-slate-900 text-white font-body">
      {/* Sidebar */}
      <aside className="w-80 bg-slate-950 border-r border-slate-800 flex flex-col fixed h-full z-20 overflow-y-auto">
        <div className="p-10 border-b border-slate-800">
          <Link to="/" className="text-3xl font-display font-black tracking-tighter hover:text-primary transition-colors">
            A2Z<span className="text-primary text-4xl">.</span>ADMIN
          </Link>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] mt-2">Management Suite</p>
        </div>

        <nav className="flex-grow py-12 px-6">
          <ul className="space-y-4">
            <li>
              <Link to="/safranbro-admin" className="flex items-center space-x-6 px-6 py-4 rounded-3xl hover:bg-slate-900 hover:text-primary transition-all group">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                <span className="font-bold uppercase tracking-widest text-xs">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/safranbro-admin/products" className="flex items-center space-x-6 px-6 py-4 rounded-3xl hover:bg-slate-900 hover:text-primary transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                <span className="font-bold uppercase tracking-widest text-xs">Products</span>
              </Link>
            </li>
            <li>
              <Link to="/safranbro-admin/categories" className="flex items-center space-x-6 px-6 py-4 rounded-3xl hover:bg-slate-900 hover:text-primary transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16.5 9.4 4.5-2.8L12 2 3 6.6l4.5 2.8"/><path d="M3 11.4l9 5.6 9-5.6"/><path d="M3 16.4l9 5.6 9-5.6"/></svg>
                <span className="font-bold uppercase tracking-widest text-xs">Categories</span>
              </Link>
            </li>
            <li>
              <Link to="/safranbro-admin/banners" className="flex items-center space-x-6 px-6 py-4 rounded-3xl hover:bg-slate-900 hover:text-primary transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                <span className="font-bold uppercase tracking-widest text-xs">Banners</span>
              </Link>
            </li>
            <li>
              <Link to="/safranbro-admin/orders" className="flex items-center space-x-6 px-6 py-4 rounded-3xl hover:bg-slate-900 hover:text-primary transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                <span className="font-bold uppercase tracking-widest text-xs">Orders</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-10 border-t border-slate-800">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-black">A</div>
            <div>
              <p className="font-bold text-xs uppercase tracking-widest">Admin User</p>
              <p className="text-[10px] text-slate-500 uppercase">{user?.email}</p>
            </div>
          </div>
          <button onClick={() => window.location.href = '/'} className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-primary transition-colors">
            Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-80 p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
