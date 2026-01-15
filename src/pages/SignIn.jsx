import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
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
    
    setTimeout(() => {
      setIsSubmitting(false);
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

  // Simple responsive book layout without complex positioning
  const DesktopLayout = () => (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col lg:flex-row rounded-2xl shadow-2xl overflow-hidden min-h-[500px] max-h-[85vh]">
        {/* Left Cover - Green */}
        <div className="lg:w-2/5 bg-gradient-to-r from-emerald-700 to-emerald-600 p-6 lg:p-8 flex flex-col items-center justify-center text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-8 left-8 w-24 h-24 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-8 right-8 w-20 h-20 border-2 border-white rounded-full"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-4 lg:mb-6 bg-white rounded-full p-2 border-2 border-white/20 shadow-xl">
              <img 
                src="https://i.ibb.co/Ldwswy4m/logo.png" 
                alt="Bangladesh Debate Federation Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-3 tracking-wide">Bangladesh Debate Federation</h1>
            <p className="text-white/90 text-sm lg:text-base">The Art of Argumentation</p>
          </div>
        </div>

        {/* Right Page - Amber */}
        <div className="lg:w-3/5 bg-gradient-to-b from-amber-50 to-amber-100 p-6 lg:p-8 flex flex-col overflow-auto relative">
          {/* Page Texture */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8B4513_1px,transparent_1px)] [background-size:20px_20px]"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="mb-4 lg:mb-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <FaBookOpen className="text-emerald-600 mr-2" />
                  <h2 className="text-lg lg:text-xl font-serif font-bold text-gray-800">Sign In</h2>
                </div>
                
                <Link
                  to="/"
                  className="inline-flex items-center px-3 py-1.5 bg-white/80 border border-amber-200 rounded-lg text-sm font-medium text-amber-800 hover:bg-white hover:shadow-lg transition-all duration-300"
                >
                  <FaHome className="mr-1.5" />
                  <span>Home</span>
                </Link>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            </div>

            {/* Form */}
            <form className="space-y-4 flex-grow" onSubmit={handleSubmit}>
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
                    className={`appearance-none block w-full pl-10 pr-4 py-2.5 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
                      errors.email ? 'border-red-300 focus:border-red-500' : 'border-amber-300 hover:border-emerald-400'
                    }`}
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-600 font-serif">{errors.email}</p>
                )}
              </div>

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
                    className={`appearance-none block w-full pl-10 pr-12 py-2.5 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
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

              <div className="pt-2">
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

            {/* Sign Up Link */}
            <div className="mt-6 pt-4 border-t border-amber-300 text-center">
              <button
                onClick={handleTurnPage}
                className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg shadow-lg hover:from-amber-600 hover:to-amber-700 hover:shadow-xl transition-all duration-500 hover:scale-105 group"
              >
                <FaUserPlus className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-serif">Create New Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MobileLayout = () => (
    <div className="w-full max-w-md bg-gradient-to-b from-amber-50 to-amber-100 rounded-2xl shadow-xl overflow-hidden border border-amber-200">
      {/* Page Texture for Mobile */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8B4513_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      {/* Mobile Header */}
      <div className="relative z-10 p-6 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-white rounded-full p-2 border-2 border-white/30">
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
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center">
            <FaBookOpen className="text-emerald-600 mr-2" />
            <h2 className="text-xl font-serif font-bold text-gray-800">Sign In</h2>
          </div>
          
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-white/90 border border-amber-200 rounded-lg text-sm font-medium text-amber-800 hover:bg-white hover:shadow transition-all duration-300"
          >
            <FaHome className="mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6"></div>

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
                className={`appearance-none block w-full pl-10 pr-4 py-3 bg-white/80 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
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
                className={`appearance-none block w-full pl-10 pr-12 py-3 bg-white/80 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
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

        {/* Sign Up Link - Mobile */}
        <div className="mt-8 pt-6 border-t border-amber-300 text-center">
          <button
            onClick={handleTurnPage}
            className="inline-flex items-center justify-center w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg shadow-lg hover:from-amber-600 hover:to-amber-700 hover:shadow-xl transition-all duration-500"
          >
            <FaUserPlus className="mr-3" />
            <span className="font-serif">Create New Account</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-700 ${isTurning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </div>
  );
};

export default SignIn;