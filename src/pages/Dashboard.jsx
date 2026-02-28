import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const navItems = [
    { label: 'Profile', path: '/dashboard', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { label: 'Orders', path: '/dashboard/orders', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
    { label: 'Tracking', path: '/dashboard/tracking', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 11V9' },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-72 border-r border-gray-100 flex-shrink-0 flex flex-col pt-20">
        <div className="p-8 border-b border-gray-50 text-center">
          <div className="w-20 h-20 rounded-full bg-accent text-primary text-3xl font-bold flex items-center justify-center mx-auto mb-4">
            JD
          </div>
          <h2 className="text-xl font-bold">JOHN DOE</h2>
          <p className="text-sm text-gray-400">Premium Member</p>
        </div>
        
        <nav className="flex-grow p-6 space-y-2">
          {navItems.map(item => (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => 
                `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                  isActive ? 'bg-primary text-white font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-primary'
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

        <div className="p-6">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-6 py-4 rounded-2xl text-gray-400 hover:text-red-500 transition-colors font-bold uppercase tracking-widest text-xs"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <div className="p-12 max-w-4xl mx-auto">
          <Outlet />
          {/* Default view when just at /dashboard */}
          <div className="space-y-12">
            <h1 className="text-4xl">MY PROFILE</h1>
            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 border-2 border-gray-50 rounded-3xl">
                <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Personal Details</h3>
                <div className="space-y-2 text-lg">
                  <p><strong>Name:</strong> John Doe</p>
                  <p><strong>Email:</strong> john@example.com</p>
                  <p><strong>Phone:</strong> +44 7700 900000</p>
                </div>
              </div>
              <div className="p-8 border-2 border-gray-50 rounded-3xl">
                <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Default Address</h3>
                <div className="space-y-2 text-lg text-gray-600">
                  <p>123 High Street</p>
                  <p>London, W1A 1AA</p>
                  <p>United Kingdom</p>
                </div>
              </div>
            </div>
            
            <div className="pt-12">
              <h2 className="text-2xl mb-8">RECENT ORDERS</h2>
              <div className="bg-gray-50 rounded-3xl p-8 text-center text-gray-500">
                You haven't placed any orders yet. <Link to="/shop" className="text-primary font-bold ml-2">START SHOPPING</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
