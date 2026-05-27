import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid,
  FiActivity,
  FiCompass,
  FiPercent,
  FiTrendingUp,
  FiUser,
  FiLogOut,
  FiX,
  FiVideo
} from 'react-icons/fi';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

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
    setIsOpen(false);
    logout();
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0c0c14] border-r border-white/[0.05] p-6">
      {/* Brand logo */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-purple-650/20">
            G
          </div>
          <span className="font-extrabold text-xl tracking-wider bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            GK FIT
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <FiX className="text-lg" />
        </button>
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
      {/* Desktop Sidebar (Permanent) */}
      <aside className="hidden md:block fixed top-0 bottom-0 left-0 w-64 z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            {/* Slide-over panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-0 bottom-0 left-0 w-64 z-50 shadow-2xl h-full"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
