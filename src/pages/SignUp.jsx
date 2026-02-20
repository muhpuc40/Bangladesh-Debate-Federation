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



const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) return;
  
  setIsSubmitting(true);
  
  try {
    const response = await fetch('http://192.168.0.104:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        institution: formData.institution,
        password: formData.password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        navigate('/signin');
      }, 3000);
    } else {
      setErrors(data.errors || {});
      setIsSubmitting(false);
    }
  } catch (error) {
    console.error('Registration error:', error);
    setIsSubmitting(false);
    alert('Registration failed. Please try again.');
  }
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

  // Mobile Layout (SignIn এর মতো)
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
        {/* Header - SignIn পেজের মতো */}
        <div className="mb-6 flex justify-between items-center">
          {/* Sign Up Title on LEFT */}
          <div className="flex items-center">
            <FaBook className="text-emerald-600 mr-2" />
            <h2 className="text-xl font-serif font-bold text-gray-800">Sign Up</h2>
          </div>
          
          {/* Back to Home Button on RIGHT */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleTurnBack}
              className="inline-flex items-center px-3 py-1.5 bg-white/80 border border-amber-200 rounded-lg text-sm font-medium text-amber-800 hover:bg-white hover:shadow transition-all duration-300"
            >
              <FaArrowLeft className="mr-1" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <Link
              to="/"
              className="inline-flex items-center px-3 py-1.5 bg-white/80 border border-amber-200 rounded-lg text-sm font-medium text-amber-800 hover:bg-white hover:shadow transition-all duration-300"
            >
              <FaHome className="mr-1" />
              <span>Home</span>
            </Link>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6"></div>

        {/* Success Message */}
        {isSuccess ? (
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-100 to-emerald-200 mb-6 h-20 w-20 animate-bounce">
              <FaCheckCircle className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="font-serif font-bold text-gray-900 text-xl mb-3">
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
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1 font-serif">
                <span className="flex items-center">
                  <FaUser className="mr-2 text-emerald-600" />
                  Full Name
                </span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className={`appearance-none block w-full px-4 py-3 bg-white/80 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
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
                  <FaEnvelope className="mr-2 text-emerald-600" />
                  Email Address
                </span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`appearance-none block w-full px-4 py-3 bg-white/80 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
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
                  <FaPhone className="mr-2 text-emerald-600" />
                  Phone Number
                </span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className={`appearance-none block w-full px-4 py-3 bg-white/80 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
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
                  <FaUniversity className="mr-2 text-emerald-600" />
                  Institution
                </span>
              </label>
              <input
                id="institution"
                name="institution"
                type="text"
                value={formData.institution}
                onChange={handleChange}
                className={`appearance-none block w-full px-4 py-3 bg-white/80 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
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
                  <FaLock className="mr-2 text-emerald-600" />
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
                  className={`appearance-none block w-full px-4 py-3 pr-12 bg-white/80 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
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

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1 font-serif">
                <span className="flex items-center">
                  <FaLock className="mr-2 text-emerald-600" />
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
                  className={`appearance-none block w-full px-4 py-3 pr-12 bg-white/80 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
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
                    <FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-emerald-600" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-400 hover:text-emerald-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600 font-serif">{errors.confirmPassword}</p>
              )}
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

            {/* Sign Up Button */}
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

        {/* Back to Sign In - Mobile */}
        {!isSuccess && (
          <div className="mt-8 pt-6 border-t border-amber-300 text-center">
            <button
              onClick={handleTurnBack}
              className="inline-flex items-center justify-center w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg shadow-lg hover:from-amber-600 hover:to-amber-700 hover:shadow-xl transition-all duration-500"
            >
              <FaArrowLeft className="mr-3" />
              <span className="font-serif">Already have an account? Sign In</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Desktop Layout (SignIn এর মতো simple flex layout)
  const DesktopLayout = () => (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col lg:flex-row rounded-2xl shadow-2xl overflow-hidden min-h-[600px] max-h-[85vh]">
        {/* Left Cover - Amber (Sign Up Form Side) */}
        <div className="lg:w-3/5 bg-gradient-to-b from-amber-50 to-amber-100 p-6 lg:p-8 flex flex-col overflow-auto relative">
          {/* Page Texture */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8B4513_1px,transparent_1px)] [background-size:20px_20px]"></div>
          
          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleTurnBack}
                    className="inline-flex items-center px-3 py-1.5 bg-white/80 border border-amber-200 rounded-lg text-sm font-medium text-amber-800 hover:bg-white hover:shadow-lg transition-all duration-300"
                  >
                    <FaArrowLeft className="mr-1.5" />
                    Back
                  </button>
                  <Link
                    to="/"
                    className="inline-flex items-center px-3 py-1.5 bg-white/80 border border-amber-200 rounded-lg text-sm font-medium text-amber-800 hover:bg-white hover:shadow-lg transition-all duration-300"
                  >
                    <FaHome className="mr-1.5" />
                    Home
                  </Link>
                </div>
                
                <div className="flex items-center">
                  <FaBook className="text-emerald-600 mr-2" />
                  <h2 className="text-xl font-serif font-bold text-gray-800">Sign Up</h2>
                </div>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="flex-grow overflow-y-auto pr-2">
              {isSuccess ? (
                <div className="text-center py-8 flex flex-col items-center justify-center h-full">
                  <div className="mx-auto flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-100 to-emerald-200 mb-6 h-24 w-24 animate-bounce">
                    <FaCheckCircle className="h-12 w-12 text-emerald-600" />
                  </div>
                  <h3 className="font-serif font-bold text-gray-900 text-2xl mb-3">
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
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1 font-serif">
                        <span className="flex items-center">
                          <FaUser className="mr-2 text-emerald-600" />
                          Full Name
                        </span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-4 py-2.5 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
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
                          <FaEnvelope className="mr-2 text-emerald-600" />
                          Email Address
                        </span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-4 py-2.5 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
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
                          <FaPhone className="mr-2 text-emerald-600" />
                          Phone Number
                        </span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-4 py-2.5 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
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
                          <FaUniversity className="mr-2 text-emerald-600" />
                          Institution
                        </span>
                      </label>
                      <input
                        id="institution"
                        name="institution"
                        type="text"
                        value={formData.institution}
                        onChange={handleChange}
                        className={`appearance-none block w-full px-4 py-2.5 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
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
                          <FaLock className="mr-2 text-emerald-600" />
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
                          className={`appearance-none block w-full px-4 py-2.5 pr-10 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
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
                          <FaLock className="mr-2 text-emerald-600" />
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
                          className={`appearance-none block w-full px-4 py-2.5 pr-10 bg-white/70 border-2 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-emerald-500 text-sm transition-all duration-300 font-serif text-black ${
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

                  {/* Sign Up Button */}
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
            </div>

            {/* Back to Sign In */}
            {!isSuccess && (
              <div className="mt-6 pt-4 border-t border-amber-300 text-center">
                <button
                  onClick={handleTurnBack}
                  className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg shadow-lg hover:from-amber-600 hover:to-amber-700 hover:shadow-xl transition-all duration-500 hover:scale-105 group"
                >
                  <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="font-serif">Already have an account? Sign In</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Cover - Green */}
        <div className="lg:w-2/5 bg-gradient-to-l from-emerald-700 to-emerald-600 p-6 lg:p-8 flex flex-col items-center justify-center text-white relative overflow-hidden">
          <div className="relative z-10 text-center">
            <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto mb-6 bg-white rounded-full p-3 border-2 border-white/20 shadow-xl">
              <img 
                src="https://i.ibb.co/Ldwswy4m/logo.png" 
                alt="Bangladesh Debate Federation Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-3 tracking-wide">Bangladesh Debate Federation</h1>
            <p className="text-white/90 text-lg">The Art of Argumentation</p>
          </div>
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

export default SignUp;