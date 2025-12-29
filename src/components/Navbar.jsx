import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaSignInAlt, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isCommitteeDropdownOpen, setIsCommitteeDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileCommitteeOpen, setMobileCommitteeOpen] = useState(false);
  const menuRef = useRef(null);
  const mobileMenuRef = useRef(null);
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

  // Home আলাদাভাবে দেখানো হবে, তাই navLinks থেকে রিমুভ করা হয়েছে
  const navLinks = [
    { path: '/events', label: 'Events' },
    { path: '/debate-club-directory', label: 'Directory' },
    { path: '/news', label: 'News' },
    { path: '/resources', label: 'Resources' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];

  // বাইরে ক্লিক করলে মেনু ও ড্রপডাউন বন্ধ করার ফাংশন
  useEffect(() => {
    const handleClickOutside = (event) => {
      // মোবাইল মেনু বাইরে ক্লিক করলে বন্ধ হবে
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          isMenuOpen && !event.target.closest('.mobile-menu-button')) {
        closeMenu();
      }
      
      // ডেস্কটপ About ড্রপডাউন বাইরে ক্লিক করলে বন্ধ হবে
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target)) {
        setIsAboutDropdownOpen(false);
      }
      
      // ডেস্কটপ Committee ড্রপডাউন বাইরে ক্লিক করলে বন্ধ হবে
      if (committeeDropdownRef.current && !committeeDropdownRef.current.contains(event.target)) {
        setIsCommitteeDropdownOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
        setIsAboutDropdownOpen(false);
        setIsCommitteeDropdownOpen(false);
      }
    };

    const addOverlay = () => {
      if (isMenuOpen) {
        const overlay = document.createElement('div');
        overlay.id = 'mobile-menu-overlay';
        overlay.className = 'fixed inset-0 bg-black/30 z-40 lg:hidden';
        overlay.addEventListener('click', () => closeMenu());
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
      }
    };

    const removeOverlay = () => {
      const overlay = document.getElementById('mobile-menu-overlay');
      if (overlay) {
        overlay.remove();
      }
      document.body.style.overflow = '';
    };

    // সব ক্লিকে বাইরের ক্লিক হ্যান্ডলিং যোগ করুন
    const handleGlobalClick = (event) => {
      // শুধু ডেস্কটপ ড্রপডাউনের জন্য
      if (!window.matchMedia('(max-width: 1023px)').matches) {
        // About ড্রপডাউন
        if (isAboutDropdownOpen && aboutDropdownRef.current && 
            !aboutDropdownRef.current.contains(event.target) &&
            !event.target.closest('button[class*="About"]')) {
          setIsAboutDropdownOpen(false);
        }
        
        // Committee ড্রপডাউন
        if (isCommitteeDropdownOpen && committeeDropdownRef.current && 
            !committeeDropdownRef.current.contains(event.target) &&
            !event.target.closest('button[class*="Committee"]')) {
          setIsCommitteeDropdownOpen(false);
        }
      }
    };

    if (isMenuOpen || isAboutDropdownOpen || isCommitteeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('click', handleGlobalClick);
      
      if (isMenuOpen) {
        addOverlay();
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('click', handleGlobalClick);
      removeOverlay();
    };
  }, [isMenuOpen, isAboutDropdownOpen, isCommitteeDropdownOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsAboutDropdownOpen(false);
    setIsCommitteeDropdownOpen(false);
    setMobileAboutOpen(false);
    setMobileCommitteeOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      setMobileAboutOpen(false);
      setMobileCommitteeOpen(false);
    }
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // শুধু ক্লিকে ড্রপডাউন টগল হবে
    setIsAboutDropdownOpen(!isAboutDropdownOpen);
    // অন্য ড্রপডাউন বন্ধ করুন
    if (isCommitteeDropdownOpen) {
      setIsCommitteeDropdownOpen(false);
    }
  };

  const handleCommitteeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // শুধু ক্লিকে ড্রপডাউন টগল হবে
    setIsCommitteeDropdownOpen(!isCommitteeDropdownOpen);
    // অন্য ড্রপডাউন বন্ধ করুন
    if (isAboutDropdownOpen) {
      setIsAboutDropdownOpen(false);
    }
  };

  const toggleMobileAbout = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileAboutOpen(!mobileAboutOpen);
    if (mobileCommitteeOpen) {
      setMobileCommitteeOpen(false);
    }
  };

  const toggleMobileCommittee = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileCommitteeOpen(!mobileCommitteeOpen);
    if (mobileAboutOpen) {
      setMobileAboutOpen(false);
    }
  };

  return (
    <nav className="fixed top-2 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between backdrop-blur-sm bg-white/5 rounded-full px-3.5 py-1.5">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity duration-300 flex-shrink-0 min-w-0">
            <div className="w-13 h-13 flex-shrink-0">
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
            {/* Home */}
            <NavLink
              to="/"
              className="px-3 py-1.5 rounded-full transition-all duration-300 font-medium whitespace-nowrap text-emerald-800 hover:text-emerald-900 hover:bg-emerald-500/30 text-sm"
            >
              Home
            </NavLink>

            {/* About Us - শুধু ক্লিকে ড্রপডাউন */}
            <div 
              ref={aboutDropdownRef}
              className="relative"
            >
              <button
                onClick={handleAboutClick}
                className={`px-3 py-1.5 rounded-full transition-all duration-300 font-medium whitespace-nowrap flex items-center text-emerald-800 hover:text-emerald-900 hover:bg-emerald-500/30 text-sm cursor-pointer ${
                  isAboutDropdownOpen ? 'bg-emerald-500/30 text-emerald-900' : ''
                }`}
              >
                About Us
                <FaChevronDown className={`ml-1 w-3 h-3 transition-transform duration-300 ${isAboutDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isAboutDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-emerald-100 overflow-hidden z-50">
                  {aboutSubItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 text-sm transition-all duration-200 ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-700 font-semibold'
                            : 'text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900'
                        }`
                      }
                      onClick={() => {
                        setIsAboutDropdownOpen(false);
                      }}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
            
            {/* Committee - শুধু ক্লিকে ড্রপডাউন */}
            <div 
              ref={committeeDropdownRef}
              className="relative"
            >
              <button
                onClick={handleCommitteeClick}
                className={`px-3 py-1.5 rounded-full transition-all duration-300 font-medium whitespace-nowrap flex items-center text-emerald-800 hover:text-emerald-900 hover:bg-emerald-500/30 text-sm cursor-pointer ${
                  isCommitteeDropdownOpen ? 'bg-emerald-500/30 text-emerald-900' : ''
                }`}
              >
                Committee
                <FaChevronDown className={`ml-1 w-3 h-3 transition-transform duration-300 ${isCommitteeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCommitteeDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-emerald-100 overflow-hidden z-50">
                  {committeeSubItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 text-sm transition-all duration-200 ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-700 font-semibold'
                            : 'text-emerald-800 hover:bg-emerald-50 hover:text-emerald-900'
                        }`
                      }
                      onClick={() => {
                        setIsCommitteeDropdownOpen(false);
                      }}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
            
            {/* অন্যান্য লিংক */}
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="px-3 py-1.5 rounded-full transition-all duration-300 font-medium whitespace-nowrap text-emerald-800 hover:text-emerald-900 hover:bg-emerald-500/30 text-sm"
              >
                {link.label}
              </NavLink>
            ))}
            
            {/* Sign In Button */}
            <Link
              to="/signin"
              className="text-white bg-emerald-700 hover:bg-emerald-800 border border-emerald-700 font-bold py-1.5 px-3.5 rounded-full transition-all duration-300 flex items-center whitespace-nowrap hover:scale-105 hover:shadow-lg ml-2 text-sm"
            >
              <FaSignInAlt className="mr-1.5 w-3 h-3" />
              Sign In
            </Link>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex lg:hidden justify-between items-center backdrop-blur-sm bg-white/5 rounded-full px-3 py-1.5">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity duration-300 flex-shrink-0 min-w-0 z-10">
            <div className="w-11 h-11 flex-shrink-0">
              <img 
                src="https://i.ibb.co/Ldwswy4m/logo.png" 
                alt="Bangladesh Debate Federation Logo" 
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
          </Link>

          <button
            onClick={toggleMobileMenu}
            className="text-emerald-800 hover:text-emerald-900 focus:outline-none p-2 hover:bg-emerald-500/20 rounded-full transition-all duration-300 mobile-menu-button backdrop-blur-sm"
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
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex justify-between items-center p-2.5 border-b border-emerald-100">
            <h2 className="text-sm font-bold text-emerald-900">Menu</h2>
            <button
              onClick={closeMenu}
              className="text-emerald-900 hover:text-emerald-700 p-1 hover:bg-emerald-50 rounded-full transition-all duration-300"
              aria-label="Close menu"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto p-2.5">
            <div className="flex flex-col space-y-0.5">
              {/* Home */}
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-lg transition-all duration-300 font-medium text-left text-xs ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50 border-l-3 border-emerald-500'
                      : 'text-emerald-900 hover:text-emerald-700 hover:bg-emerald-50'
                  }`
                }
              >
                Home
              </NavLink>

              {/* About Us - Mobile */}
              <div className="space-y-0.5">
                <button
                  onClick={toggleMobileAbout}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 cursor-pointer transition-all duration-300 text-left"
                >
                  <span className="font-medium text-emerald-900 text-xs">About Us</span>
                  <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${mobileAboutOpen ? 'rotate-180' : ''} text-emerald-700`} />
                </button>
                
                {mobileAboutOpen && (
                  <div className="ml-2.5 pl-2.5 border-l-2 border-emerald-100">
                    <div className="flex flex-col space-y-0.5">
                      {aboutSubItems.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          onClick={closeMenu}
                          className={({ isActive }) =>
                            `block px-2.5 py-1 rounded-lg transition-all duration-300 text-left text-xs ${
                              isActive
                                ? 'text-emerald-700 bg-emerald-50 border-l-2 border-emerald-300'
                                : 'text-emerald-800 hover:text-emerald-700 hover:bg-emerald-50'
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

              {/* Committee - Mobile */}
              <div className="space-y-0.5">
                <button
                  onClick={toggleMobileCommittee}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 cursor-pointer transition-all duration-300 text-left"
                >
                  <span className="font-medium text-emerald-900 text-xs">Committee</span>
                  <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${mobileCommitteeOpen ? 'rotate-180' : ''} text-emerald-700`} />
                </button>
                
                {mobileCommitteeOpen && (
                  <div className="ml-2.5 pl-2.5 border-l-2 border-emerald-100">
                    <div className="flex flex-col space-y-0.5">
                      {committeeSubItems.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          onClick={closeMenu}
                          className={({ isActive }) =>
                            `block px-2.5 py-1 rounded-lg transition-all duration-300 text-left text-xs ${
                              isActive
                                ? 'text-emerald-700 bg-emerald-50 border-l-2 border-emerald-300'
                                : 'text-emerald-800 hover:text-emerald-700 hover:bg-emerald-50'
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

              {/* অন্যান্য লিংক */}
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `px-2.5 py-1.5 rounded-lg transition-all duration-300 font-medium text-left text-xs ${
                      isActive
                        ? 'text-emerald-700 bg-emerald-50 border-l-3 border-emerald-500'
                        : 'text-emerald-900 hover:text-emerald-700 hover:bg-emerald-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Menu Footer - Sign In */}
          <div className="p-2.5 border-t border-emerald-100">
            <Link
              to="/signin"
              onClick={closeMenu}
              className="w-full text-white bg-emerald-700 hover:bg-emerald-800 font-bold py-1.5 px-3 rounded-lg text-center transition-all duration-300 flex items-center justify-center hover:scale-[1.02] text-xs"
            >
              <FaSignInAlt className="mr-1.5 w-3 h-3" /> Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;