
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaEye, 
  FaEyeSlash,
  FaPhone,
  FaUniversity,
  FaArrowRight,
  FaCheckCircle,
  FaHome,
  FaSignInAlt,
  FaArrowLeft,
  FaBook
} from 'react-icons/fa';

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isTurning, setIsTurning] = useState(false);
  const [pageTurned, setPageTurned] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
    document.body.style.minHeight = '100vh';
    
    setTimeout(() => {
      setPageTurned(true);
    }, 100);
    
    return () => {
      document.body.style.background = '';
      document.body.style.minHeight = '';
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    
    if (!formData.institution.trim()) {
      newErrors.institution = "Institution is required";
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
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
      setIsSuccess(true);
      
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTurnBack = () => {
    setIsTurning(true);
    setTimeout(() => {
      navigate('/signin');
    }, 600);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-all duration-700 ${isTurning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Book Container - Responsive */}
      <div className="relative w-full max-w-5xl h-[85vh] min-h-[650px] max-h-[900px] perspective-1000">
        {/* Book Shadow */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-[95%] h-6 bg-black/20 blur-md rounded-full hidden md:block"></div>
        
        {/* Book - Flipped with responsive layout */}
        <div className={`relative w-full h-full flex flex-col md:flex-row transition-transform duration-1000 ${pageTurned ? 'rotate-0' : 'rotate-y-90'}`}>
          {/* Book Page - Left (Sign Up Form) - ADJUSTED FOR TABLET */}
          <div className="w-full md:w-[60%] h-full bg-gradient-to-b from-amber-50 to-amber-100 rounded-t-2xl md:rounded-l-2xl md:rounded-t-none shadow-xl z-10 overflow-hidden border-b md:border-b-0 md:border-r border-amber-200">
            {/* Page Texture */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8B4513_1px,transparent_1px)] [background-size:20px_20px]"></div>
            
            {/* Page Content */}
            <div className="relative z-10 w-full h-full p-4 sm:p-6 md:p-8 flex flex-col">
              {/* Page Header - POSITION CHANGED */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  {/* Navigation Buttons - MOVED TO LEFT */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleTurnBack}
                      className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white/80 border border-amber-200 rounded-lg text-xs sm:text-sm font-medium text-amber-800 hover:bg-white hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
                    >
                      <FaArrowLeft className="mr-1 sm:mr-2" />
                    </button>
                    <Link
                      to="/"
                      className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-white/80 border border-amber-200 rounded-lg text-xs sm:text-sm font-medium text-amber-800 hover:bg-white hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
                    >
                      <FaHome className="mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Home</span>
                      <span className="inline sm:hidden">Home</span>
                    </Link>
                  </div>
                  
                  {/* Sign Up Title - MOVED TO RIGHT */}
                  <div className="flex items-center">
                    <FaBook className="text-emerald-600 mr-2" />
                    <h2 className={`font-serif font-bold text-gray-800 ${
                      isTablet ? 'text-xl' : 'text-2xl'
                    }`}>Sign Up</h2>
                  </div>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-3 sm:mb-4"></div>
              </div>

              {isSuccess ? (
                <div className="text-center py-6 sm:py-8 flex-1 flex flex-col items-center justify-center">
                  <div className={`mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-100 to-emerald-200 mb-4 sm:mb-6 animate-bounce ${
                    isTablet ? 'h-20 w-20' : 'h-24 w-24'
                  }`}>
                    <FaCheckCircle className={`text-emerald-600 ${
                      isTablet ? 'h-10 w-10' : 'h-12 w-12'
                    }`} />
                  </div>
                  <h3 className={`font-serif font-bold text-gray-900 mb-2 sm:mb-3 ${
                    isTablet ? 'text-xl' : 'text-2xl'
                  }`}>
                    Registration Successful!
                  </h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto font-serif text-sm sm:text-base">
                    Welcome to the Bangladesh Debate Federation. Your account has been created.
                  </p>
                  <div className="w-48 sm:w-64 h-2 bg-emerald-100 rounded-full overflow-hidden mx-auto mb-4 sm:mb-6">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                      style={{ animation: 'progress 3s linear forwards' }}
                    ></div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mb-6 font-serif">
                    Redirecting to sign in...
                  </p>
                </div>
              ) : (
                <form className="space-y-3 sm:space-y-4 flex-1 overflow-y-auto pr-1 sm:pr-2" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1 font-serif">
                        <span className="flex items-center">
                          <FaUser className="mr-1 sm:mr-2 text-emerald-600 text-xs sm:text-sm" />
                          Full Name
                        </span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
                          errors.fullName ? 'border-red-300 focus:border-red-500' : 'border-amber-300 hover:border-emerald-400'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-red-600 font-serif">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 font-serif">
                        <span className="flex items-center">
                          <FaEnvelope className="mr-1 sm:mr-2 text-emerald-600 text-xs sm:text-sm" />
                          Email Address
                        </span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
                          errors.email ? 'border-red-300 focus:border-red-500' : 'border-amber-300 hover:border-emerald-400'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600 font-serif">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 font-serif">
                        <span className="flex items-center">
                          <FaPhone className="mr-1 sm:mr-2 text-emerald-600 text-xs sm:text-sm" />
                          Phone Number
                        </span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
                          errors.phone ? 'border-red-300 focus:border-red-500' : 'border-amber-300 hover:border-emerald-400'
                        }`}
                        placeholder="+880 1XXX XXXXXX"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-600 font-serif">{errors.phone}</p>
                      )}
                    </div>

                    {/* Institution */}
                    <div>
                      <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1 font-serif">
                        <span className="flex items-center">
                          <FaUniversity className="mr-1 sm:mr-2 text-emerald-600 text-xs sm:text-sm" />
                          Institution
                        </span>
                      </label>
                      <input
                        id="institution"
                        name="institution"
                        type="text"
                        value={formData.institution}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
                          errors.institution ? 'border-red-300 focus:border-red-500' : 'border-amber-300 hover:border-emerald-400'
                        }`}
                        placeholder="School/College/University"
                      />
                      {errors.institution && (
                        <p className="mt-1 text-xs text-red-600 font-serif">{errors.institution}</p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 font-serif">
                        <span className="flex items-center">
                          <FaLock className="mr-1 sm:mr-2 text-emerald-600 text-xs sm:text-sm" />
                          Password
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          className={`appearance-none block w-full px-3 sm:px-4 pr-8 sm:pr-10 py-2 sm:py-2.5 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
                            errors.password ? 'border-red-300 focus:border-red-500' : 'border-amber-300 hover:border-emerald-400'
                          }`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center hover:text-emerald-600 transition-colors duration-300"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? (
                            <FaEyeSlash className="h-4 w-4 text-gray-400 hover:text-emerald-600" />
                          ) : (
                            <FaEye className="h-4 w-4 text-gray-400 hover:text-emerald-600" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-xs text-red-600 font-serif">{errors.password}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1 font-serif">
                        <span className="flex items-center">
                          <FaLock className="mr-1 sm:mr-2 text-emerald-600 text-xs sm:text-sm" />
                          Confirm Password
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`appearance-none block w-full px-3 sm:px-4 pr-8 sm:pr-10 py-2 sm:py-2.5 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
                            errors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-amber-300 hover:border-emerald-400'
                          }`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-2 sm:pr-3 flex items-center hover:text-emerald-600 transition-colors duration-300"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                          {showConfirmPassword ? (
                            <FaEyeSlash className="h-4 w-4 text-gray-400 hover:text-emerald-600" />
                          ) : (
                            <FaEye className="h-4 w-4 text-gray-400 hover:text-emerald-600" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-xs text-red-600 font-serif">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start pt-3 sm:pt-4 border-t border-amber-300">
                    <div className="flex items-center h-5">
                      <input
                        id="acceptTerms"
                        name="acceptTerms"
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded transition duration-300"
                      />
                    </div>
                    <div className="ml-2 sm:ml-3">
                      <label htmlFor="acceptTerms" className="text-xs sm:text-sm text-gray-700 font-serif">
                        I agree to the{' '}
                        <Link to="/terms" className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline transition-colors duration-300">
                          Terms and Conditions
                        </Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline transition-colors duration-300">
                          Privacy Policy
                        </Link>
                      </label>
                      {errors.acceptTerms && (
                        <p className="mt-1 text-xs sm:text-sm text-red-600 font-serif">{errors.acceptTerms}</p>
                      )}
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
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <FaArrowRight className="ml-2 sm:ml-3" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Back to Sign In */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-amber-300 text-center">
                <button
                  onClick={handleTurnBack}
                  className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg shadow-lg hover:from-amber-600 hover:to-amber-700 hover:shadow-xl transition-all duration-500 hover:scale-105 group"
                >
                  <FaArrowLeft className="mr-2 sm:mr-3 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className={`font-serif ${
                    isTablet ? 'text-sm' : 'text-base'
                  }`}>
                    ← Sign In
                  </span>
                  <div className={`ml-2 sm:ml-3 relative ${
                    isTablet ? 'w-4 h-4' : 'w-6 h-6'
                  } hidden sm:block`}>
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`bg-white rounded-sm transform rotate-180 ${
                        isTablet ? 'w-1 h-2' : 'w-2 h-4'
                      }`}></div>
                    </div>
                  </div>
                </button>
                <p className="text-xs text-gray-500 mt-1 sm:mt-2 font-serif">Sign in on page 1</p>
              </div>

              {/* Page Footer */}
              <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-amber-300">
                <p className="text-xs text-gray-500 text-center font-serif">
                  © {new Date().getFullYear()} Bangladesh Debate Federation 
                </p>
              </div>
            </div>
          </div>

          {/* Book Cover - Right - ADJUSTED FOR TABLET */}
          <div className="w-full md:w-[40%] h-full bg-gradient-to-l from-emerald-700 via-emerald-600 to-emerald-500 rounded-b-2xl md:rounded-r-2xl md:rounded-b-none shadow-2xl z-20 overflow-hidden border-t md:border-t-0 md:border-l-2 border-emerald-900/30">
            {/* Book Spine */}
            <div className="absolute left-0 top-1/4 w-3 h-1/2 bg-gradient-to-r from-emerald-900/80 to-emerald-800/50 rounded-r-lg hidden md:block"></div>
            
            <div className="relative w-full h-full p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-white z-10">
              {/* Decorative Pattern */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute bottom-10 left-10 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 border-2 border-white rounded-full"></div>
                <div className="absolute top-10 right-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-2 border-white rounded-full"></div>
              </div>
              
              <div className="relative z-20 text-center">
                <div className={`mx-auto mb-4 sm:mb-6 md:mb-8 bg-white rounded-full p-2 sm:p-3 md:p-4 border-2 border-white/20 shadow-xl ${
                  isTablet ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-24 h-24 sm:w-32 sm:h-32'
                }`}>
                  <img 
                    src="https://i.ibb.co/Ldwswy4m/logo.png" 
                    alt="Bangladesh Debate Federation Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* বাংলাদেশ ডিবেট ফেডারেশন টেক্সট - SignIn পেজের মতো স্টাইল */}
                <h1 className={`font-bold mb-2 sm:mb-3 md:mb-4 tracking-wide ${
                  isTablet ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl md:text-4xl'
                }`}>
                  Bangladesh Debate Federation
                </h1>
                {/* The Art of Argumentation টেক্সট কমেন্ট আউট করা হয়েছে SignIn পেজের মতো */}
                {/* <p className="text-white/90 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8">The Art of Argumentation</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for page turning animation */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-y-90 {
          transform: rotateY(-90deg);
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @media (max-width: 768px) {
          .rotate-y-90 {
            transform: rotateX(-90deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SignUp;
