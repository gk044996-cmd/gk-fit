import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navigation/Navbar.jsx';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#060609]">
      <Navbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <footer className="bg-[#0b0b12] border-t border-white/[0.05] py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center font-bold text-white text-lg">G</div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">GK FIT</span>
            </div>
            <p className="text-gray-450 text-sm">
              Your premium companion to workout plans, precision diet recommendations, BMI trackers, and continuous fitness metrics.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/workouts" className="hover:text-purple-400 transition-colors">Workouts</a></li>
              <li><a href="/diet" className="hover:text-purple-400 transition-colors">Diets</a></li>
              <li><a href="/bmi" className="hover:text-purple-400 transition-colors">BMI Calculator</a></li>
              <li><a href="/progress" className="hover:text-purple-400 transition-colors">Progress</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Use</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-sm text-gray-450 mb-4">Get the latest fitness tips and updates delivered to your inbox.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter email" className="bg-[#12121e] border border-white/[0.08] px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500" />
              <button className="bg-purple-650 hover:bg-purple-500 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/[0.05] text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} GK FIT. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
