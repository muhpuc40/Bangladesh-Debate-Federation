import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaSignInAlt } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/events', label: 'Events' },
    { path: '/resources', label: 'Resources' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-emerald-100 sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4 lg:py-5">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-2 md:space-x-3 lg:space-x-4 hover:opacity-90 transition-opacity duration-300 min-w-0 flex-shrink">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex-shrink-0">
              <img 
                src="https://i.ibb.co/Ldwswy4m/logo.png" 
                alt="Bangladesh Debate Federation Logo" 
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-emerald-800 leading-tight whitespace-normal overflow-visible">
                Bangladesh Debate Federation
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 xl:px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm xl:text-base whitespace-nowrap ${
                    isActive
                      ? 'text-emerald-800 font-bold'
                      : 'text-emerald-700 hover:text-emerald-800 hover:font-medium'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Sign In Button */}
          <div className="hidden lg:flex items-center flex-shrink-0">
            <Link
              to="/signin"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 xl:px-6 rounded-lg transition-all duration-300 flex items-center text-sm xl:text-base whitespace-nowrap hover:scale-105 hover:shadow-md ml-2 xl:ml-4"
            >
              <FaSignInAlt className="mr-2 text-base xl:text-lg" /> 
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button and Sign In Button */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:hidden flex-shrink-0">
            {/* Mobile Sign In Button */}
            <Link
              to="/signin"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg transition-all duration-300 flex items-center text-xs sm:text-sm whitespace-nowrap hover:scale-105 flex-shrink-0"
            >
              <FaSignInAlt className="mr-1 sm:mr-2 text-sm sm:text-base" /> 
              <span className="hidden xs:inline">Sign In</span>
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-emerald-700 focus:outline-none p-1.5 sm:p-2 hover:bg-gray-50 rounded-lg transition-all duration-300 flex-shrink-0"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? 
                <FaTimes className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" /> : 
                <FaBars className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              }
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-emerald-100 py-3 shadow-inner animate-slideDown">
            <div className="flex flex-col space-y-1 sm:space-y-2 md:space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 sm:py-3.5 md:py-4 rounded-lg transition-all duration-300 font-medium text-sm sm:text-base md:text-lg ${
                      isActive
                        ? 'text-emerald-800 font-bold'
                        : 'text-emerald-700 hover:text-emerald-800 hover:font-medium'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-3 border-t border-emerald-100 mt-2">
                <Link
                  to="/signin"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-all duration-300 flex items-center justify-center text-sm sm:text-base md:text-lg hover:scale-[1.02]"
                >
                  <FaSignInAlt className="mr-2" /> Sign In
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;