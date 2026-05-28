import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Workouts', path: '/workouts' },
    { name: 'Diet', path: '/diet' },
    { name: 'BMI Calculator', path: '/bmi' },
    { name: 'Progress', path: '/progress' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060609]/85 backdrop-blur-md border-b border-white/[0.05] py-4'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-purple-650/20">
            G
          </div>
          <span className="font-extrabold text-xl tracking-wider bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
            GK FIT
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium tracking-wide transition-colors ${
                location.pathname === link.path
                  ? 'text-purple-400 font-semibold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-gradient px-5 py-2 text-sm rounded-xl"
              >
                Dashboard
              </button>
              <button
                onClick={logout}
                className="btn-outline px-5 py-2 text-sm rounded-xl"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-3 py-2"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn-gradient px-5 py-2.5 text-sm rounded-xl"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
        >
          {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Dropdown Panel */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 border-b border-white/[0.05] bg-[#0c0c14]/95 backdrop-blur-lg flex flex-col p-6 gap-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-base font-medium tracking-wide transition-colors py-2 border-b border-white/[0.02] ${
                location.pathname === link.path ? 'text-purple-400' : 'text-gray-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/dashboard');
                  }}
                  className="btn-gradient w-full py-2.5 text-center text-sm"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="btn-outline w-full py-2.5 text-center text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="btn-outline w-full py-2.5 text-center text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="btn-gradient w-full py-2.5 text-center text-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
