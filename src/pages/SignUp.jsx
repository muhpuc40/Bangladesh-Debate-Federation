import React, { useState } from 'react';
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
  FaSignInAlt
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      {/* Back to Home Button */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-white border border-emerald-200 rounded-lg shadow-sm text-sm font-medium text-emerald-700 hover:bg-emerald-50 hover:shadow-md transition-all duration-300"
        >
          <FaHome className="mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        {/* Logo with Click to Home */}
        <Link to="/" className="flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full shadow-lg p-4 mb-4 border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <img 
              src="https://i.ibb.co/Ldwswy4m/logo.png" 
              alt="Bangladesh Debate Federation Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-center text-3xl font-bold text-emerald-900 bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
            Join Our Community
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create your Bangladesh Debate Federation account
          </p>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        {isSuccess ? (
          <div className="bg-white/80 backdrop-blur-sm py-12 px-6 shadow-2xl border border-emerald-100 rounded-2xl sm:px-10 text-center relative overflow-hidden">
            {/* Success Animation Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent"></div>
            
            <div className="relative z-10">
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-emerald-100 to-emerald-200 mb-6 animate-pulse">
                <FaCheckCircle className="h-10 w-10 text-emerald-600 animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Registration Successful!
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Welcome to the Bangladesh Debate Federation community. Your account has been created successfully.
              </p>
              
              {/* Progress Bar */}
              <div className="w-64 h-2 bg-emerald-100 rounded-full overflow-hidden mx-auto mb-6">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full animate-progress"></div>
              </div>
              
              <p className="text-sm text-gray-500 mb-6">
                Redirecting to sign in page in 3 seconds...
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/signin')}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:from-emerald-700 hover:to-emerald-600 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <FaSignInAlt className="mr-3" />
                  Go to Sign In
                </button>
                <div>
                  <Link 
                    to="/"
                    className="text-emerald-600 hover:text-emerald-700 font-medium hover:underline transition-colors duration-300 text-sm"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            </div>
            
            <style jsx>{`
              @keyframes progress {
                0% { width: 0%; }
                100% { width: 100%; }
              }
              .animate-progress {
                animation: progress 3s linear forwards;
              }
            `}</style>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm py-8 px-6 shadow-2xl border border-emerald-100 rounded-2xl sm:px-10 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-100/30 rounded-full"></div>
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-blue-100/20 rounded-full"></div>
            
            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="group">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
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
                    className={`appearance-none block w-full px-4 py-3 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-emerald-500 sm:text-sm transition-all duration-300 ${
                      errors.fullName ? 'border-red-300 focus:border-red-500' : 'border-emerald-200 hover:border-emerald-300'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="mt-2 text-sm text-red-600 animate-pulse">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                    className={`appearance-none block w-full px-4 py-3 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-emerald-500 sm:text-sm transition-all duration-300 ${
                      errors.email ? 'border-red-300 focus:border-red-500' : 'border-emerald-200 hover:border-emerald-300'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 animate-pulse">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="group">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
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
                    className={`appearance-none block w-full px-4 py-3 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-emerald-500 sm:text-sm transition-all duration-300 ${
                      errors.phone ? 'border-red-300 focus:border-red-500' : 'border-emerald-200 hover:border-emerald-300'
                    }`}
                    placeholder="+880 1XXX XXXXXX"
                  />
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600 animate-pulse">{errors.phone}</p>
                  )}
                </div>

                {/* Institution */}
                <div className="group">
                  <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">
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
                    className={`appearance-none block w-full px-4 py-3 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-emerald-500 sm:text-sm transition-all duration-300 ${
                      errors.institution ? 'border-red-300 focus:border-red-500' : 'border-emerald-200 hover:border-emerald-300'
                    }`}
                    placeholder="School/College/University"
                  />
                  {errors.institution && (
                    <p className="mt-2 text-sm text-red-600 animate-pulse">{errors.institution}</p>
                  )}
                </div>

                {/* Password */}
                <div className="group">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
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
                      className={`appearance-none block w-full px-4 pr-12 py-3 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-emerald-500 sm:text-sm transition-all duration-300 ${
                        errors.password ? 'border-red-300 focus:border-red-500' : 'border-emerald-200 hover:border-emerald-300'
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
                    <p className="mt-2 text-sm text-red-600 animate-pulse">{errors.password}</p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Must be at least 6 characters long
                  </p>
                </div>

                {/* Confirm Password */}
                <div className="group">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
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
                      className={`appearance-none block w-full px-4 pr-12 py-3 border-2 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-emerald-500 sm:text-sm transition-all duration-300 ${
                        errors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-emerald-200 hover:border-emerald-300'
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
                    <p className="mt-2 text-sm text-red-600 animate-pulse">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start pt-4 border-t border-emerald-100">
                <div className="flex items-center h-6">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-emerald-300 rounded transition duration-300"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                    I agree to the{' '}
                    <Link to="/terms" className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors duration-300">
                      Terms and Conditions
                    </Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline transition-colors duration-300">
                      Privacy Policy
                    </Link>
                  </label>
                  {errors.acceptTerms && (
                    <p className="mt-1 text-sm text-red-600 animate-pulse">{errors.acceptTerms}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <FaArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center pt-6 border-t border-emerald-100 relative z-10">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link 
                  to="/signin" 
                  className="inline-flex items-center font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-300 hover:underline group"
                >
                  <FaSignInAlt className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Bangladesh Debate Federation. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignUp;