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
    { path: '/debate-club-directory', label: 'Directory' }, // শুধু "Directory" নাম
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
        {/* নেভবারের উচ্চতা কমানো হয়েছে */}
        <div className="flex justify-between items-center py-1 md:py-2">
          {/* Logo - বড় করা হয়েছে */}
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

          {/* Desktop Navigation - ফন্ট এবং প্যাডিং সামান্য বাড়ানো */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg transition-all duration-300 font-medium whitespace-nowrap hover:text-emerald-800 ${
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

          {/* Desktop Sign In Button - বড় করা হয়েছে */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/signin"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-5 rounded-lg transition-all duration-300 flex items-center whitespace-nowrap hover:scale-105 hover:shadow-md ml-3 text-base"
            >
              <FaSignInAlt className="mr-2" /> 
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button - আইকন বড় করা হয়েছে */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-emerald-700 focus:outline-none p-2 hover:bg-gray-50 rounded-lg transition-all duration-300"
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

        {/* Mobile Navigation Menu - উচ্চতা সামান্য কমানো */}
        <div 
          ref={menuRef}
          className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Menu Header - প্যাডিং কমানো */}
            <div className="flex justify-between items-center p-3 border-b border-emerald-100">
              <h2 className="text-lg font-bold text-emerald-800">Menu</h2>
              <button
                onClick={closeMenu}
                className="text-emerald-700 hover:text-emerald-800 p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
                aria-label="Close menu"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Items - প্যাডিং সামান্য কমানো */}
            <div className="flex-1 overflow-y-auto p-3">
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
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

            {/* Menu Footer - বাটন বড় করা */}
            <div className="p-3 border-t border-emerald-100">
              <Link
                to="/signin"
                onClick={closeMenu}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-all duration-300 flex items-center justify-center hover:scale-[1.02] text-base"
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