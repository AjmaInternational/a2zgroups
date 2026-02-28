import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Call supabase.auth.signOut()
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/safranbro-admin', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { label: 'Products', path: '/safranbro-admin/products', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
    { label: 'Categories', path: '/safranbro-admin/categories', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
    { label: 'Banners', path: '/safranbro-admin/banners', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
    { label: 'Orders', path: '/safranbro-admin/orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-900 text-white flex-shrink-0 flex flex-col fixed inset-y-0">
        <div className="p-8 border-b border-white/10">
          <h2 className="text-2xl font-display text-primary">A2Z ADMIN</h2>
        </div>
        
        <nav className="flex-grow p-6 space-y-2 overflow-y-auto no-scrollbar">
          {navItems.map(item => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/safranbro-admin'}
              className={({ isActive }) => 
                `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                  isActive ? 'bg-primary text-white font-bold' : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-red-400 hover:bg-red-400/10 transition-colors font-bold uppercase tracking-widest text-xs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-72">
        <header className="bg-white border-b border-gray-100 px-12 py-6 sticky top-0 z-30 flex justify-between items-center">
          <h1 className="text-2xl font-bold">MANAGEMENT PANEL</h1>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="font-bold text-sm">Administrator</p>
              <p className="text-xs text-gray-400">admin@a2zgroups.uk</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-bold">
              A
            </div>
          </div>
        </header>
        
        <div className="p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
