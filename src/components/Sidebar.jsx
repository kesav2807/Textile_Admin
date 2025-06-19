import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UploadCloud,
  ShoppingCart,
  Truck,
  Boxes,
  Wallet,
  Star,
  Megaphone,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Upload', path: '/admin/upload-products', icon: UploadCloud },
  { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
  { name: 'Tracking', path: '/admin/delivery-tracking', icon: Truck },
  { name: 'Stocks', path: '/admin/stocks', icon: Boxes },
  { name: 'Expense', path: '/admin/expense', icon: Wallet },
  { name: 'Reviews', path: '/admin/reviews', icon: Star },
  { name: 'Ads', path: '/admin/advertisement', icon: Megaphone },
];

export default function Sidebar({ isCollapsed, toggleSidebar, isMobile, mobileMenuOpen }) {
  return (
    <>
      {/* Mobile Hamburger */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full bg-white/80 backdrop-blur-md shadow-xl border-r border-green-100
          transition-all duration-300 ease-in-out flex flex-col
          ${isCollapsed ? 'w-20' : 'w-72'}
          ${isMobile ? (mobileMenuOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-green-200">
          {!isCollapsed && (
            <h1 className="text-xl font-extrabold text-green-700">🧵 Cloths Admin</h1>
          )}
          <button onClick={toggleSidebar} className="text-green-600 hover:text-green-800">
            {isCollapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-2">
          {menuItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={name}
              to={path}
              title={isCollapsed ? name : ''}
              className={({ isActive }) =>
                `group flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-sm transition-all
                ${isCollapsed ? 'justify-center' : ''}
                ${
                  isActive
                    ? 'bg-green-100 text-green-700 shadow-inner'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                }`
              }
              onClick={() => isMobile && toggleSidebar()}
            >
              <Icon className="text-green-600 group-hover:scale-110 transition-transform" size={20} />
              {!isCollapsed && <span>{name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="text-xs text-center text-green-600 px-4 py-3 border-t border-green-100">
            &copy; {new Date().getFullYear()} Kesav_Sk
          </div>
        )}
      </aside>
    </>
  );
}
