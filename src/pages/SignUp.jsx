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

  useEffect(() => {
    // Add book page styling to body
    document.body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
    document.body.style.minHeight = '100vh';
    
    // Animate page turning on mount
    setTimeout(() => {
      setPageTurned(true);
    }, 100);
    
    return () => {
      document.body.style.background = '';
      document.body.style.minHeight = '';
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
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Redirect to sign in after 3 seconds
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
      {/* Book Container - Flipped */}
      <div className="relative w-full max-w-5xl h-[85vh] perspective-1000">
        {/* Book Shadow */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-11/12 h-8 bg-black/20 blur-lg rounded-full"></div>
        
        {/* Book - Flipped */}
        <div className={`relative w-full h-full transition-transform duration-1000 ${pageTurned ? 'rotate-0' : 'rotate-y-90'}`}>
          {/* Book Page - Left (Sign Up Form) */}
          <div className="absolute left-0 top-0 w-3/5 h-full bg-gradient-to-b from-amber-50 to-amber-100 rounded-l-2xl shadow-xl z-10 overflow-hidden border-r border-amber-200">
            {/* Page Texture */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8B4513_1px,transparent_1px)] [background-size:20px_20px]"></div>
            
            {/* Page Content */}
            <div className="relative z-10 w-full h-full p-8 flex flex-col">
              {/* Page Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FaBook className="text-emerald-600 mr-2" />
                    <h2 className="text-2xl font-serif font-bold text-gray-800">Sign Up</h2>
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    Chapter 2 • Registration
                  </div>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-4"></div>
                <p className="text-gray-600 italic">"Begin your journey of eloquence"</p>
              </div>

              {/* Navigation Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleTurnBack}
                  className="inline-flex items-center px-4 py-2 bg-white/80 border border-amber-200 rounded-lg text-sm font-medium text-amber-800 hover:bg-white hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
                >
                  <FaArrowLeft className="mr-2" />
                  Previous Page
                </button>
                <Link
                  to="/"
                  className="inline-flex items-center px-4 py-2 bg-white/80 border border-amber-200 rounded-lg text-sm font-medium text-amber-800 hover:bg-white hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
                >
                  <FaHome className="mr-2" />
                  Home
                </Link>
              </div>

              {isSuccess ? (
                <div className="text-center py-8 flex-1 flex flex-col items-center justify-center">
                  <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-r from-emerald-100 to-emerald-200 mb-6 animate-bounce">
                    <FaCheckCircle className="h-12 w-12 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                    Registration Successful!
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto font-serif">
                    Welcome to the Bangladesh Debate Federation. Your account has been created.
                  </p>
                  <div className="w-64 h-2 bg-emerald-100 rounded-full overflow-hidden mx-auto mb-6">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
                      style={{ animation: 'progress 3s linear forwards' }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mb-6 font-serif">
                    Redirecting to sign in...
                  </p>
                </div>
              ) : (
                <form className="space-y-4 flex-1 overflow-y-auto pr-2" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1 font-serif">
                        <span className="flex items-center">
                          <FaUser className="mr-2 text-emerald-600 text-sm" />
                          Full Name
                        </span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-4 py-2.5 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 sm:text-sm transition-all duration-300 font-serif ${
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
                          <FaEnvelope className="mr-2 text-emerald-600 text-sm" />
                          Email Address
                        </span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-4 py-2.5 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 sm:text-sm transition-all duration-300 font-serif ${
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
                          <FaPhone className="mr-2 text-emerald-600 text-sm" />
                          Phone Number
                        </span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-4 py-2.5 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 sm:text-sm transition-all duration-300 font-serif ${
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
                          <FaUniversity className="mr-2 text-emerald-600 text-sm" />
                          Institution
                        </span>
                      </label>
                      <input
                        id="institution"
                        name="institution"
                        type="text"
                        value={formData.institution}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-4 py-2.5 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 sm:text-sm transition-all duration-300 font-serif ${
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
                          <FaLock className="mr-2 text-emerald-600 text-sm" />
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
                          className={`appearance-none block w-full px-4 pr-10 py-2.5 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 sm:text-sm transition-all duration-300 font-serif ${
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
                          <FaLock className="mr-2 text-emerald-600 text-sm" />
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
                          className={`appearance-none block w-full px-4 pr-10 py-2.5 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 sm:text-sm transition-all duration-300 font-serif ${
                            errors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-amber-300 hover:border-emerald-400'
                          }`}
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-emerald-600 transition-colors duration-300"
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
                  <div className="flex items-start pt-4 border-t border-amber-300">
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
                    <div className="ml-3">
                      <label htmlFor="acceptTerms" className="text-sm text-gray-700 font-serif">
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
                        <p className="mt-1 text-sm text-red-600 font-serif">{errors.acceptTerms}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-serif"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <FaArrowRight className="ml-3" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Back to Sign In */}
              <div className="mt-6 pt-4 border-t border-amber-300 text-center">
                <button
                  onClick={handleTurnBack}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg shadow-lg hover:from-amber-600 hover:to-amber-700 hover:shadow-xl transition-all duration-500 hover:scale-105 group"
                >
                  <FaArrowLeft className="mr-3 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="font-serif">← Turn to previous page</span>
                  <div className="ml-3 relative w-6 h-6">
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-4 bg-white rounded-sm transform rotate-180"></div>
                    </div>
                  </div>
                </button>
                <p className="text-xs text-gray-500 mt-2 font-serif">Sign in on page 1</p>
              </div>

              {/* Page Footer */}
              <div className="mt-4 pt-4 border-t border-amber-300">
                <p className="text-xs text-gray-500 text-center font-serif">
                  © {new Date().getFullYear()} Bangladesh Debate Federation • Volume I, Page 2
                </p>
              </div>
            </div>
          </div>

          {/* Book Cover - Right */}
          <div className="absolute right-0 top-0 w-2/5 h-full bg-gradient-to-l from-emerald-700 via-emerald-600 to-emerald-500 rounded-r-2xl shadow-2xl z-20 overflow-hidden border-l-2 border-emerald-900/30">
            {/* Book Spine */}
            <div className="absolute left-0 top-1/4 w-3 h-1/2 bg-gradient-to-r from-emerald-900/80 to-emerald-800/50 rounded-r-lg"></div>
            
            {/* Book Cover Content */}
            <div className="relative w-full h-full p-8 flex flex-col items-center justify-center text-white z-10">
              {/* Decorative Pattern */}
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute bottom-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
                <div className="absolute top-10 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
              </div>
              
              <div className="relative z-20 text-center">
                <div className="w-32 h-32 mx-auto mb-8 bg-white/10 backdrop-blur-sm rounded-full p-4 border-2 border-white/20 shadow-xl">
                  <img 
                    src="https://i.ibb.co/Ldwswy4m/logo.png" 
                    alt="Bangladesh Debate Federation Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <h1 className="text-4xl font-bold mb-4 tracking-wide">Join The Debate</h1>
                <div className="w-48 h-1 bg-white/50 rounded-full mx-auto mb-6"></div>
                <p className="text-xl mb-2 opacity-90">Master the Art of Persuasion</p>
                <p className="text-lg opacity-80">Continue Your Journey</p>
                
                {/* Page Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <p className="text-sm mt-2 opacity-70">Page 2 of 2</p>
                </div>
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
      `}</style>
    </div>
  );
};

export default SignUp;