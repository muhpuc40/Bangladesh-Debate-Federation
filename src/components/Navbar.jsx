
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaSignInAlt, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isCommitteeHovered, setIsCommitteeHovered] = useState(false);
  const [isCommitteeDropdownOpen, setIsCommitteeDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileCommitteeOpen, setMobileCommitteeOpen] = useState(false);
  const menuRef = useRef(null);
  const aboutDropdownRef = useRef(null);
  const committeeDropdownRef = useRef(null);

  const aboutSubItems = [
    { path: '/mission-vision', label: 'Mission & Vision' },
    { path: '/hall-of-fame', label: 'Hall of Fame' },
    { path: '/advisor-panel', label: 'Advisor Panel' },
  ];

  const committeeSubItems = [
    { path: '/executive-committee', label: 'Executive Committee' },
    { path: '/presidium-member', label: 'Presidium Member' },
  ];

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us', isDropdown: true },
    { path: '/committee', label: 'Committee', isDropdown: true },
    { path: '/events', label: 'Events' },
    { path: '/debate-club-directory', label: 'Directory' },
    { path: '/resources', label: 'Resources' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];

  // বাইরে ক্লিক করলে মেনু ও ড্রপডাউন বন্ধ করার ফাংশন
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target)) {
        setIsAboutHovered(false);
        setIsAboutDropdownOpen(false);
      }
      if (committeeDropdownRef.current && !committeeDropdownRef.current.contains(event.target)) {
        setIsCommitteeHovered(false);
        setIsCommitteeDropdownOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        setIsAboutHovered(false);
        setIsAboutDropdownOpen(false);
        setIsCommitteeHovered(false);
        setIsCommitteeDropdownOpen(false);
      }
    };

    if (isMenuOpen || isAboutHovered || isAboutDropdownOpen || isCommitteeHovered || isCommitteeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMenuOpen, isAboutHovered, isAboutDropdownOpen, isCommitteeHovered, isCommitteeDropdownOpen]);

  // মেনু বন্ধ করার ফাংশন
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsAboutHovered(false);
    setIsAboutDropdownOpen(false);
    setIsCommitteeHovered(false);
    setIsCommitteeDropdownOpen(false);
    setMobileAboutOpen(false);
    setMobileCommitteeOpen(false);
  };

  const handleAboutMouseEnter = () => {
    setIsAboutHovered(true);
    setIsAboutDropdownOpen(true);
  };

  const handleAboutMouseLeave = () => {
    setIsAboutHovered(false);
    setIsAboutDropdownOpen(false);
  };

  const handleCommitteeMouseEnter = () => {
    setIsCommitteeHovered(true);
    setIsCommitteeDropdownOpen(true);
  };

  const handleCommitteeMouseLeave = () => {
    setIsCommitteeHovered(false);
    setIsCommitteeDropdownOpen(false);
  };

  // মোবাইল মেনুতে About Us টগল ফাংশন
  const toggleMobileAbout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileAboutOpen(!mobileAboutOpen);
    // Committee মেনু বন্ধ রাখুন যখন About Us খুলছেন
    if (mobileCommitteeOpen) {
      setMobileCommitteeOpen(false);
    }
  };

  // মোবাইল মেনুতে Committee টগল ফাংশন
  const toggleMobileCommittee = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileCommitteeOpen(!mobileCommitteeOpen);
    // About Us মেনু বন্ধ রাখুন যখন Committee খুলছেন
    if (mobileAboutOpen) {
      setMobileAboutOpen(false);
    }
  };

  return (
    <nav className="fixed top-2 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between backdrop-blur-sm bg-white/5 rounded-full px-6 py-2">
          {/* Logo */}
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

          {/* Navigation Links */}
          <div className="flex items-center space-x-0">
            {navLinks.map((link) => {
              // About Us বাটনকে বিশেষভাবে হ্যান্ডেল করব
              if (link.path === '/about') {
                return (
                  <div 
                    key="about"
                    ref={aboutDropdownRef}
                    className="relative"
                    onMouseEnter={handleAboutMouseEnter}
                    onMouseLeave={handleAboutMouseLeave}
                  >
                    <NavLink
                      to="/about"
                      className="px-4 py-2 rounded-full transition-all duration-300 font-medium whitespace-nowrap flex items-center text-emerald-800 hover:text-emerald-900 hover:bg-emerald-500/30"
                    >
                      About Us
                      <FaChevronDown className={`ml-1 w-3 h-3 transition-transform duration-300 ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
                    </NavLink>
                    
                    {/* Dropdown Menu - হোভারে শো হবে */}
                    {isAboutDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-emerald-100 overflow-hidden z-50">
                        {aboutSubItems.map((item) => (
                          <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                              `block px-4 py-3 text-sm transition-all duration-200 ${
                                isActive
                                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                                  : 'text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900'
                              }`
                            }
                            onClick={() => {
                              setIsAboutHovered(false);
                              setIsAboutDropdownOpen(false);
                            }}
                          >
                            {item.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              
              // Committee বাটনকে বিশেষভাবে হ্যান্ডেল করব
              if (link.path === '/committee') {
                return (
                  <div 
                    key="committee"
                    ref={committeeDropdownRef}
                    className="relative"
                    onMouseEnter={handleCommitteeMouseEnter}
                    onMouseLeave={handleCommitteeMouseLeave}
                  >
                    <NavLink
                      to="/executive-committee" // প্রাথমিক লিংক হিসেবে Executive Committee
                      className="px-4 py-2 rounded-full transition-all duration-300 font-medium whitespace-nowrap flex items-center text-emerald-800 hover:text-emerald-900 hover:bg-emerald-500/30"
                    >
                      Committee
                      <FaChevronDown className={`ml-1 w-3 h-3 transition-transform duration-300 ${isCommitteeDropdownOpen ? 'rotate-180' : ''}`} />
                    </NavLink>
                    
                    {/* Dropdown Menu - হোভারে শো হবে */}
                    {isCommitteeDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-emerald-100 overflow-hidden z-50">
                        {committeeSubItems.map((item) => (
                          <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                              `block px-4 py-3 text-sm transition-all duration-200 ${
                                isActive
                                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                                  : 'text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900'
                              }`
                            }
                            onClick={() => {
                              setIsCommitteeHovered(false);
                              setIsCommitteeDropdownOpen(false);
                            }}
                          >
                            {item.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              
              // অন্যান্য লিংক (Home সহ সব)
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className="px-4 py-2 rounded-full transition-all duration-300 font-medium whitespace-nowrap text-emerald-800 hover:text-emerald-900 hover:bg-emerald-500/30"
                >
                  {link.label}
                </NavLink>
              );
            })}
            
            {/* Sign In Button */}
            <Link
              to="/signin"
              className="text-emerald-800 hover:text-emerald-900 border border-emerald-300/50 hover:border-emerald-600 font-bold py-2 px-5 rounded-full transition-all duration-300 flex items-center whitespace-nowrap hover:scale-105 hover:shadow-lg ml-2"
            >
              <FaSignInAlt className="mr-2" /> 
              Sign In
            </Link>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex lg:hidden justify-between items-center py-3">
          {/* Mobile Logo */}
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
              {/* Home বাটন মোবাইলে প্রথমে */}
              <NavLink
                to="/"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg transition-all duration-300 font-medium text-left text-emerald-900 hover:text-emerald-700 hover:border-l-4 hover:border-emerald-300"
              >
                Home
              </NavLink>

              {/* About Us with Sub-items in Mobile */}
              <div className="space-y-2">
                <div className="relative">
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg transition-all duration-300 font-medium text-left flex justify-between items-center ${
                        isActive
                          ? 'text-emerald-700 border-l-4 border-emerald-300'
                          : 'text-emerald-900 hover:text-emerald-700 hover:border-l-4 hover:border-emerald-300'
                      }`
                    }
                    onClick={(e) => {
                      if (mobileAboutOpen) {
                        e.preventDefault();
                        setMobileAboutOpen(false);
                      } else {
                        closeMenu();
                      }
                    }}
                  >
                    <span>About Us</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleMobileAbout(e);
                      }}
                      className="ml-2 p-1 hover:bg-emerald-50 rounded-full transition-colors duration-300"
                      aria-label="Toggle About Us submenu"
                    >
                      <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${mobileAboutOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </NavLink>
                </div>
                
                {mobileAboutOpen && (
                  <div className="ml-4 pl-4 border-l-2 border-emerald-100">
                    <div className="flex flex-col space-y-2 mt-2">
                      {aboutSubItems.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          onClick={closeMenu}
                          className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg transition-all duration-300 font-medium text-left text-sm ${
                              isActive
                                ? 'text-emerald-700 border-l-2 border-emerald-300'
                                : 'text-emerald-800 hover:text-emerald-700 hover:border-l-2 hover:border-emerald-300'
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Committee with Sub-items in Mobile */}
              <div className="space-y-2">
                <div className="relative">
                  <NavLink
                    to="/executive-committee"
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg transition-all duration-300 font-medium text-left flex justify-between items-center ${
                        isActive
                          ? 'text-emerald-700 border-l-4 border-emerald-300'
                          : 'text-emerald-900 hover:text-emerald-700 hover:border-l-4 hover:border-emerald-300'
                      }`
                    }
                    onClick={(e) => {
                      if (mobileCommitteeOpen) {
                        e.preventDefault();
                        setMobileCommitteeOpen(false);
                      } else {
                        closeMenu();
                      }
                    }}
                  >
                    <span>Committee</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleMobileCommittee(e);
                      }}
                      className="ml-2 p-1 hover:bg-emerald-50 rounded-full transition-colors duration-300"
                      aria-label="Toggle Committee submenu"
                    >
                      <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${mobileCommitteeOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </NavLink>
                </div>
                
                {mobileCommitteeOpen && (
                  <div className="ml-4 pl-4 border-l-2 border-emerald-100">
                    <div className="flex flex-col space-y-2 mt-2">
                      {committeeSubItems.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          onClick={closeMenu}
                          className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg transition-all duration-300 font-medium text-left text-sm ${
                              isActive
                                ? 'text-emerald-700 border-l-2 border-emerald-300'
                                : 'text-emerald-800 hover:text-emerald-700 hover:border-l-2 hover:border-emerald-300'
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* অন্যান্য লিংক (Events থেকে শুরু) */}
              {navLinks.slice(3).map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg transition-all duration-300 font-medium text-left ${
                      isActive
                        ? 'text-emerald-700 border-l-4 border-emerald-300'
                        : 'text-emerald-900 hover:text-emerald-700 hover:border-l-4 hover:border-emerald-300'
                    }`
                  }
                >
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
