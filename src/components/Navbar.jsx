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
    <nav className="bg-white shadow-sm border-b border-emerald-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 md:py-3">
          {/* Logo and Brand - UPDATED SIZE */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity duration-300 flex-shrink-0 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0">
              <img 
                src="https://i.ibb.co/Ldwswy4m/logo.png" 
                alt="Bangladesh Debate Federation Logo" 
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
            <div className="min-w-0">
              {/* <h1 className="text-sm md:text-base lg:text-lg font-bold text-emerald-800 leading-tight whitespace-normal">
                Bangladesh Debate Federation
              </h1> */}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-all duration-300 font-medium text-sm whitespace-nowrap hover:text-emerald-800 ${
                    isActive
                      ? 'text-emerald-800 font-bold bg-emerald-50'
                      : 'text-emerald-700 hover:bg-emerald-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Sign In Button */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/signin"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-4 rounded-lg transition-all duration-300 flex items-center text-sm whitespace-nowrap hover:scale-105 hover:shadow-md ml-3"
            >
              <FaSignInAlt className="mr-2" /> 
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button and Sign In Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-emerald-700 focus:outline-none p-2 hover:bg-gray-50 rounded-lg transition-all duration-300"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? 
                <FaTimes className="w-5 h-5" /> : 
                <FaBars className="w-5 h-5" />
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
            {/* Menu Header with Close Button */}
            <div className="flex justify-between items-center p-4 border-b border-emerald-100">
              <h2 className="text-lg font-bold text-emerald-800">Menu</h2>
              <button
                onClick={closeMenu}
                className="text-emerald-700 hover:text-emerald-800 p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
                aria-label="Close menu"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `px-4 py-2.5 rounded-lg transition-all duration-300 font-medium text-base ${
                        isActive
                          ? 'text-emerald-800 font-bold bg-emerald-50'
                          : 'text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50'
                      }`
                    }
                  >
                    {link.label === 'Committee' ? 'Executive Committee' : link.label}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Menu Footer with Sign In Button */}
            <div className="p-4 border-t border-emerald-100">
              <Link
                to="/signin"
                onClick={closeMenu}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-lg text-center transition-all duration-300 flex items-center justify-center text-base hover:scale-[1.02]"
              >
                <FaSignInAlt className="mr-2" /> Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;