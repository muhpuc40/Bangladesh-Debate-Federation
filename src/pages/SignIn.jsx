import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaArrowRight,
  FaHome,
  FaUserPlus,
  FaBookOpen
} from 'react-icons/fa';

const SignIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTurning, setIsTurning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Add book page styling to body
    document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
    document.body.style.minHeight = '100vh';
    
    return () => {
      document.body.style.background = '';
      document.body.style.minHeight = '';
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // On successful login, redirect to portal
      navigate('/portal');
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTurnPage = () => {
    setIsTurning(true);
    setTimeout(() => {
      navigate('/signup');
    }, 600);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-2 sm:p-4 transition-all duration-700 ${isTurning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Mobile Layout */}
      {isMobile ? (
        <div className="w-full max-w-md bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl shadow-xl overflow-hidden border border-amber-200">
          {/* Page Texture for Mobile */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8B4513_1px,transparent_1px)] [background-size:20px_20px]"></div>
          
          {/* Mobile Header */}
          <div className="relative z-10 p-6 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full p-2 border-2 border-white/30">
                <img 
                  src="https://i.ibb.co/Ldwswy4m/logo.png" 
                  alt="Bangladesh Debate Federation Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-center mb-2">Bangladesh Debate Federation</h1>
            <p className="text-center opacity-90">The Art of Argumentation</p>
          </div>

          {/* Mobile Content */}
          <div className="relative z-10 p-6">
            {/* Back to Home - Mobile */}
            <div className="mb-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 bg-white/90 border border-amber-200 rounded-lg text-sm font-medium text-amber-800 hover:bg-white hover:shadow transition-all duration-300"
              >
                <FaHome className="mr-2" />
                Back to Home
              </Link>
            </div>

            {/* Form Title */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <FaBookOpen className="text-emerald-600 mr-2" />
                <h2 className="text-xl font-serif font-bold text-gray-800">Sign In</h2>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-3"></div>
              <p className="text-gray-600 italic text-sm">"Enter the arena of ideas"</p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 font-serif">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors duration-300" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`appearance-none block w-full pl-10 pr-4 py-3 bg-white/80 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif ${
                      errors.email ? 'border-red-300 focus:border-red-500' : 'border-amber-300 hover:border-emerald-400'
                    }`}
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600 font-serif">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 font-serif">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors duration-300" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`appearance-none block w-full pl-10 pr-12 py-3 bg-white/80 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif ${
                      errors.password ? 'border-red-300 focus:border-red-500' : 'border-amber-300 hover:border-emerald-400'
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-emerald-600 transition-colors duration-300"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-emerald-600" />
                    ) : (
                      <FaEye className="h-5 w-5 text-gray-400 hover:text-emerald-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600 font-serif">{errors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded transition duration-300"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700 font-serif">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link 
                    to="/forgot-password" 
                    className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors duration-300 hover:underline font-serif"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Sign In Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-serif"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <FaArrowRight className="ml-3" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Social Login - Mobile */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-amber-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-amber-50 text-gray-500 font-serif">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-amber-300 rounded-lg shadow-sm bg-white/80 text-sm font-medium text-gray-700 hover:bg-white hover:shadow transition-all duration-300">
                  <FaGoogle className="h-5 w-5 text-red-500" />
                  <span className="ml-2 font-serif">Google</span>
                </button>
                <button className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-amber-300 rounded-lg shadow-sm bg-white/80 text-sm font-medium text-gray-700 hover:bg-white hover:shadow transition-all duration-300">
                  <FaFacebook className="h-5 w-5 text-blue-600" />
                  <span className="ml-2 font-serif">Facebook</span>
                </button>
              </div>
            </div>

            {/* Sign Up Link - Mobile */}
            <div className="mt-8 pt-6 border-t border-amber-300 text-center">
              <button
                onClick={handleTurnPage}
                className="inline-flex items-center justify-center w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg shadow-lg hover:from-amber-600 hover:to-amber-700 hover:shadow-xl transition-all duration-500"
              >
                <FaUserPlus className="mr-3" />
                <span className="font-serif">Create New Account</span>
              </button>
              <p className="text-xs text-gray-500 mt-2 font-serif">Don't have an account? Sign up</p>
            </div>

            {/* Footer - Mobile */}
            <div className="mt-6 pt-4 border-t border-amber-300">
              <p className="text-xs text-gray-500 text-center font-serif">
                © {new Date().getFullYear()} Bangladesh Debate Federation • Volume I
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Desktop Layout */
        <div className="relative w-full max-w-5xl h-[85vh] perspective-1000">
          {/* Book Shadow */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-11/12 h-8 bg-black/20 blur-lg rounded-full hidden lg:block"></div>
          
          {/* Book */}
          <div className="relative w-full h-full">
            {/* Book Cover - Left */}
            <div className="absolute left-0 top-0 w-full lg:w-2/5 h-full bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-600 rounded-l-2xl lg:rounded-l-2xl rounded-r-2xl lg:rounded-r-none shadow-2xl z-20 overflow-hidden border-r-2 border-emerald-900/30">
              {/* Book Spine */}
              <div className="absolute right-0 top-1/4 w-3 h-1/2 bg-gradient-to-l from-emerald-900/80 to-emerald-800/50 rounded-l-lg hidden lg:block"></div>
              
              {/* Book Cover Content */}
              <div className="relative w-full h-full p-4 sm:p-8 flex flex-col items-center justify-center text-white z-10">
                {/* Decorative Pattern */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full hidden lg:block"></div>
                  <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-white rounded-full hidden lg:block"></div>
                </div>
                
                <div className="relative z-20 text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto mb-4 sm:mb-6 lg:mb-8 bg-white/10 backdrop-blur-sm rounded-full p-2 sm:p-4 border-2 border-white/20 shadow-xl">
                    <img 
                      src="https://i.ibb.co/Ldwswy4m/logo.png" 
                      alt="Bangladesh Debate Federation Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2 sm:mb-3 lg:mb-4 tracking-wide">Bangladesh Debate Federation</h1>
                  <div className="w-32 sm:w-40 lg:w-48 h-1 bg-white/50 rounded-full mx-auto mb-3 sm:mb-4 lg:mb-6"></div>
                  <p className="text-base sm:text-lg lg:text-xl mb-1 lg:mb-2 opacity-90">The Art of Argumentation</p>
                  <p className="text-sm sm:text-base lg:text-lg opacity-80">Volume I</p>
                  
                  {/* Page Indicator */}
                  <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/30 rounded-full"></div>
                    </div>
                    <p className="text-xs sm:text-sm mt-1 lg:mt-2 opacity-70">Page 1 of 2</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Book Page - Right */}
            <div className="absolute right-0 top-0 w-full lg:w-3/5 h-full bg-gradient-to-b from-amber-50 to-amber-100 rounded-r-2xl lg:rounded-r-2xl rounded-l-2xl lg:rounded-l-none shadow-xl z-10 overflow-hidden border-l border-amber-200">
              {/* Page Texture */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8B4513_1px,transparent_1px)] [background-size:20px_20px]"></div>
              
              {/* Page Content */}
              <div className="relative z-10 w-full h-full p-4 sm:p-6 lg:p-8 flex flex-col">
                {/* Page Header */}
                <div className="mb-4 sm:mb-6 lg:mb-8">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center">
                      <FaBookOpen className="text-emerald-600 mr-2 text-sm sm:text-base" />
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-gray-800">Sign In</h2>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 font-medium hidden sm:block">
                      Chapter 1 • Authentication
                    </div>
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-3 sm:mb-4"></div>
                  <p className="text-gray-600 italic text-sm sm:text-base">"Enter the arena of ideas"</p>
                </div>

                {/* Back to Home */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                  <Link
                    to="/"
                    className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white/80 border border-amber-200 rounded-lg text-xs sm:text-sm font-medium text-amber-800 hover:bg-white hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
                  >
                    <FaHome className="mr-1.5 sm:mr-2" />
                    <span className="hidden sm:inline">Back to Home</span>
                    <span className="inline sm:hidden">Home</span>
                  </Link>
                </div>

                {/* Form */}
                <form className="space-y-4 sm:space-y-6 flex-1" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2 font-serif">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors duration-300" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`appearance-none block w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm sm:text-sm transition-all duration-300 font-serif ${
                          errors.email ? 'border-red-300 focus:border-red-500' : 'border-amber-300 hover:border-emerald-400'
                        }`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 font-serif">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2 font-serif">
                      Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors duration-300" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`appearance-none block w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm sm:text-sm transition-all duration-300 font-serif ${
                          errors.password ? 'border-red-300 focus:border-red-500' : 'border-amber-300 hover:border-emerald-400'
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-emerald-600 transition-colors duration-300"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <FaEyeSlash className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-emerald-600" />
                        ) : (
                          <FaEye className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-emerald-600" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-red-600 font-serif">{errors.password}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded transition duration-300"
                      />
                      <label htmlFor="remember-me" className="ml-2 text-xs sm:text-sm text-gray-700 font-serif">
                        Remember me
                      </label>
                    </div>

                    <div className="text-xs sm:text-sm">
                      <Link 
                        to="/forgot-password" 
                        className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors duration-300 hover:underline font-serif"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex justify-center items-center py-2.5 sm:py-3 px-4 border border-transparent rounded-lg shadow text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-serif"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent mr-2 sm:mr-3"></div>
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <FaArrowRight className="ml-2 sm:ml-3" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Social Login */}
                <div className="mt-4 sm:mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-amber-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs sm:text-sm">
                      <span className="px-3 sm:px-4 bg-amber-100/80 text-gray-500 font-serif">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-3">
                    <button className="w-full inline-flex justify-center items-center py-2 sm:py-2.5 px-3 sm:px-4 border border-amber-300 rounded-lg shadow-sm bg-white/80 text-xs sm:text-sm font-medium text-gray-700 hover:bg-white hover:shadow transition-all duration-300">
                      <FaGoogle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                      <span className="ml-1.5 sm:ml-2 font-serif">Google</span>
                    </button>
                    <button className="w-full inline-flex justify-center items-center py-2 sm:py-2.5 px-3 sm:px-4 border border-amber-300 rounded-lg shadow-sm bg-white/80 text-xs sm:text-sm font-medium text-gray-700 hover:bg-white hover:shadow transition-all duration-300">
                      <FaFacebook className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                      <span className="ml-1.5 sm:ml-2 font-serif">Facebook</span>
                    </button>
                  </div>
                </div>

                {/* Turn Page Button */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-amber-300 text-center">
                  <button
                    onClick={handleTurnPage}
                    className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg shadow-lg hover:from-amber-600 hover:to-amber-700 hover:shadow-xl transition-all duration-500 hover:scale-105 group"
                  >
                    <FaUserPlus className="mr-2 sm:mr-3 text-sm sm:text-base group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-serif text-sm sm:text-base">Turn to next page →</span>
                    <div className="ml-2 sm:ml-3 relative w-5 h-5 sm:w-6 sm:h-6 hidden sm:block">
                      <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-1.5 h-3 sm:w-2 sm:h-4 bg-white rounded-sm"></div>
                      </div>
                    </div>
                  </button>
                  <p className="text-xs text-gray-500 mt-1 sm:mt-2 font-serif">Sign up on page 2</p>
                </div>

                {/* Page Footer */}
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-amber-300">
                  <p className="text-xs text-gray-500 text-center font-serif">
                    © {new Date().getFullYear()} Bangladesh Debate Federation • Volume I, Page 1
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;