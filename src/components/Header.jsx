import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, UserCircle2, LogOut } from 'lucide-react';

export default function Header({ isCollapsed, sidebarWidth }) {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const searchRef = useRef(null);
  const notificationsRef = useRef(null);
  const userMenuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current && !searchRef.current.contains(event.target) &&
        notificationsRef.current && !notificationsRef.current.contains(event.target) &&
        userMenuRef.current && !userMenuRef.current.contains(event.target)
      ) {
        setShowSearch(false);
        setShowNotifications(false);
        setShowUserMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className="bg-white/80 backdrop-blur-md shadow-md shadow-green-200 px-6 py-4 flex justify-between items-center fixed top-0 z-30 border-b border-green-100 transition-all duration-300"
      style={{ left: sidebarWidth, width: `calc(100% - ${sidebarWidth})` }}
    >
      <h1 className="text-2xl font-extrabold text-green-700 tracking-wide select-none">
       .  Textile
      </h1>

      <div className="flex items-center gap-4 relative">
        {/* Search Input */}
        {showSearch && (
          <div ref={searchRef} className="relative min-w-[200px] max-w-[320px]">
            <input
              type="text"
              placeholder="Search cloths..."
              className="border border-green-300 bg-white px-3 py-2 text-sm rounded-lg outline-none w-full shadow-sm focus:ring-2 focus:ring-green-400 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
        )}

        {/* Search Button */}
        <button
          onClick={() => {
            setShowSearch(!showSearch);
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
          className="text-green-600 hover:text-green-800"
          title="Search"
        >
          <Search size={22} />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowSearch(false);
              setShowUserMenu(false);
            }}
            className="text-green-600 hover:text-green-800"
            title="Notifications"
          >
            <Bell size={22} />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-green-100 rounded-xl shadow-lg z-50 animate-fadeIn">
              <ul className="text-sm text-green-800">
                <li className="px-4 py-3 hover:bg-green-50 border-b border-green-100 cursor-pointer">
                  🛍️ New order placed
                </li>
                <li className="px-4 py-3 hover:bg-green-50 border-b border-green-100 cursor-pointer">
                  ⚠️ Stock running low
                </li>
                <li className="px-4 py-3 hover:bg-green-50 cursor-pointer">
                  ⭐ New review submitted
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowSearch(false);
              setShowNotifications(false);
            }}
            className="text-green-600 hover:bg-green-100 rounded-full p-1.5"
            title="User"
          >
            <UserCircle2 size={28} />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-green-100 rounded-xl shadow-lg z-50 animate-fadeIn">
              <div className="px-4 py-3 border-b border-green-100">
                <p className="font-semibold text-green-800">Kesavan S</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-2 px-4 py-3 text-green-700 hover:bg-green-50 font-semibold"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
