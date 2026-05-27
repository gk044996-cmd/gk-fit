import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  FiGrid,
  FiActivity,
  FiCompass,
  FiPercent,
  FiTrendingUp,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiVideo
} from 'react-icons/fi';

const Sidebar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiGrid },
    { name: 'Workouts', path: '/workouts', icon: FiCompass },
    { name: 'Fit The Form', path: '/fit-the-form', icon: FiVideo },
    { name: 'Diet & Nutrition', path: '/diet', icon: FiActivity },
    { name: 'BMI Calculator', path: '/bmi', icon: FiPercent },
    { name: 'Progress Tracker', path: '/progress', icon: FiTrendingUp },
    { name: 'Profile Settings', path: '/profile', icon: FiUser },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0c0c14] border-r border-white/[0.05] p-6">
      {/* Brand logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-purple-650/20">
          G
        </div>
        <span className="font-extrabold text-xl tracking-wider bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
          GK FIT
        </span>
      </div>

      {/* Nav List */}
      <nav className="flex-1 flex flex-col gap-1.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 select-none ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500/10 to-orange-500/5 border border-purple-500/20 text-white font-semibold'
                    : 'text-gray-400 hover:text-gray-250 hover:bg-white/[0.03]'
                }`
              }
            >
              <Icon className="text-lg" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Profile info & Logout */}
      <div className="pt-6 border-t border-white/[0.05] flex flex-col gap-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-orange-500 flex items-center justify-center font-bold text-white text-base shadow-md shadow-purple-500/20">
            {user?.name.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden leading-tight">
            <h4 className="text-sm font-semibold text-white truncate">{user?.name}</h4>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all duration-200 w-full"
        >
          <FiLogOut className="text-lg" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer Trigger (Sticky Top Bar hamburger helper) */}
      <div className="md:hidden fixed top-3 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 rounded-xl bg-[#12121e]/80 border border-white/[0.08] backdrop-blur-md flex items-center justify-center text-gray-300 hover:text-white transition-colors"
        >
          {isOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
        </button>
      </div>

      {/* Desktop Sidebar (Permanent) */}
      <aside className="hidden md:block fixed top-0 bottom-0 left-0 w-64 z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <div
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          <aside className="md:hidden fixed top-0 bottom-0 left-0 w-64 z-50">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
};

export default Sidebar;
