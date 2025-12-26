import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaSignInAlt } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/executive-committee', label: 'Committee' },
    { path: '/events', label: 'Events' },
    { path: '/debate-club-directory', label: 'Directory' },
    { path: '/resources', label: 'Resources' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];

  // বাইরে ক্লিক করলে মেনু বন্ধ করার ফাংশন
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMenuOpen]);

  // মেনু বন্ধ করার ফাংশন
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-2 left-0 right-0 z-50"> {/* -top-4 থেকে top-2 করা হয়েছে */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation - লোগো সহ সম্পূর্ণ ব্যাকগ্রাউন্ড */}
        <div className="hidden lg:flex items-center justify-between backdrop-blur-sm bg-white/5 rounded-full px-6 py-2"> {/* mt-2 সরানো হয়েছে */}
          {/* Logo - একই ব্যাকগ্রাউন্ডে */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity duration-300 flex-shrink-0 min-w-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0">
              <img 
                src="https://i.ibb.co/Ldwswy4m/logo.png" 
                alt="Bangladesh Debate Federation Logo" 
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
          </Link>

          {/* Navigation Links - লোগোর পাশেই */}
          <div className="flex items-center space-x-0">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full transition-all duration-300 font-medium whitespace-nowrap ${
                    isActive
                      ? 'text-white font-bold bg-emerald-600/90 shadow-lg'
                      : 'text-emerald-800 hover:text-emerald-900 hover:bg-emerald-500/30'
                  }`
                }
              >
                {/* ডেস্কটপে Executive Committee, বাকিগুলো সাধারণ লেবেল */}
                {link.path === '/executive-committee' ? 'Executive Committee' : link.label}
              </NavLink>
            ))}
            
            {/* Sign In Button - একই ব্যাকগ্রাউন্ডে */}
            <Link
              to="/signin"
              className="text-emerald-800 hover:text-emerald-900 border border-emerald-300/50 hover:border-emerald-600 font-bold py-2 px-5 rounded-full transition-all duration-300 flex items-center whitespace-nowrap hover:scale-105 hover:shadow-lg ml-2"
            >
              <FaSignInAlt className="mr-2" /> 
              Sign In
            </Link>
          </div>
        </div>

        {/* Mobile Layout - আলাদাভাবে */}
        <div className="flex lg:hidden justify-between items-center py-3">
          {/* Mobile Logo - আলাদা */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity duration-300 flex-shrink-0 min-w-0 z-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0">
              <img 
                src="https://i.ibb.co/Ldwswy4m/logo.png" 
                alt="Bangladesh Debate Federation Logo" 
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:text-emerald-100 focus:outline-none p-3 hover:bg-emerald-700/30 rounded-full transition-all duration-300 backdrop-blur-sm bg-emerald-800/40"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? 
              <FaTimes className="w-6 h-6" /> : 
              <FaBars className="w-6 h-6" />
            }
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        ref={menuRef}
        className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex justify-between items-center p-4 border-b border-emerald-100">
            <h2 className="text-lg font-bold text-emerald-900">Menu</h2>
            <button
              onClick={closeMenu}
              className="text-emerald-900 hover:text-emerald-700 p-2 hover:bg-emerald-50 rounded-full transition-all duration-300"
              aria-label="Close menu"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg transition-all duration-300 font-medium text-left ${
                      isActive
                        ? 'text-emerald-700 font-bold border-l-4 border-emerald-700'
                        : 'text-emerald-900 hover:text-emerald-700 hover:border-l-4 hover:border-emerald-300'
                    }`
                  }
                >
                  {/* মোবাইলে শুধু Committee */}
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Menu Footer */}
          <div className="p-4 border-t border-emerald-100">
            <Link
              to="/signin"
              onClick={closeMenu}
              className="w-full text-emerald-900 hover:text-emerald-700 font-bold py-3 px-6 rounded-lg text-center transition-all duration-300 flex items-center justify-center hover:scale-[1.02]"
            >
              <FaSignInAlt className="mr-2" /> Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;