import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Sidebar from '../components/Navigation/Sidebar.jsx';
import LoadingSpinner from '../components/Common/LoadingSpinner.jsx';

const DashboardLayout = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [loading, isAuthenticated, navigate, location]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060609] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#060609] text-gray-250 flex">
      {/* Sidebar Panel */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden md:pl-64">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-white/[0.05] bg-[#0c0c14]/50 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold text-white tracking-wide">
            {location.pathname === '/dashboard' && 'Analytics Dashboard'}
            {location.pathname === '/workouts' && 'Workout Routines'}
            {location.pathname.startsWith('/workouts/') && 'Exercise Details'}
            {location.pathname === '/diet' && 'Nutrition & Meal Plans'}
            {location.pathname === '/bmi' && 'Body Mass Index (BMI)'}
            {location.pathname === '/progress' && 'Track My Progress'}
            {location.pathname === '/profile' && 'User Settings'}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 font-medium bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.05]">
              Goal: {user.fitnessGoal}
            </span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-orange-500 flex items-center justify-center font-bold text-white text-xs shadow-md shadow-purple-500/20">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-white hidden sm:inline">{user.name}</span>
          </div>
        </header>

        {/* Dashboard Pages Outlet */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
