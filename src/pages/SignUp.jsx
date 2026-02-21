import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import {
  FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash,
  FaPhone, FaUniversity, FaCheckCircle
} from 'react-icons/fa';

const SignUp = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword]             = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting]             = useState(false);
  const [isSuccess, setIsSuccess]                   = useState(false);
  const [errors, setErrors]                         = useState({});

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '',
    institution: '', password: '', confirmPassword: '',
    acceptTerms: false,
  });

  const validate = () => {
    const e = {};
    if (!formData.fullName.trim())       e.fullName    = 'Full name is required';
    if (!formData.email.trim())          e.email       = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
                                         e.email       = 'Enter a valid email';
    if (!formData.phone.trim())          e.phone       = 'Phone is required';
    if (!formData.institution.trim())    e.institution = 'Institution is required';
    if (!formData.password.trim())       e.password    = 'Password is required';
    else if (formData.password.length < 6)
                                         e.password    = 'At least 6 characters';
    if (!formData.confirmPassword.trim()) e.confirmPassword = 'Please confirm password';
    else if (formData.password !== formData.confirmPassword)
                                         e.confirmPassword = 'Passwords do not match';
    if (!formData.acceptTerms)           e.acceptTerms = 'You must accept the terms';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const data = await apiService.register({
        fullName:    formData.fullName,
        email:       formData.email,
        phone:       formData.phone,
        institution: formData.institution,
        password:    formData.password,
      });
      if (data.success) {
        setIsSuccess(true);
        setTimeout(() => navigate('/signin'), 3000);
      } else {
        setErrors(data.errors || {});
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success screen ──
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#f0fdf4] flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
            <FaCheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Account Created!</h2>
          <p className="text-sm text-gray-500 mb-6">
            Your account is pending approval. Redirecting to sign in...
          </p>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ animation: 'progress 3s linear forwards' }}
            />
          </div>
          <style>{`@keyframes progress { from { width: 0% } to { width: 100% } }`}</style>
        </div>
      </div>
    );
  }

  // ── Form ──
  return (
    <div className="min-h-screen bg-[#f0fdf4] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Create an account</h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

          {errors.general && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-red-600 text-sm text-center">{errors.general}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* 2-col grid on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Full Name */}
              <Field
                label="Full Name" name="fullName" type="text"
                icon={<FaUser />} placeholder="John Doe"
                value={formData.fullName} onChange={handleChange} error={errors.fullName}
              />

              {/* Email */}
              <Field
                label="Email" name="email" type="email"
                icon={<FaEnvelope />} placeholder="you@example.com"
                value={formData.email} onChange={handleChange} error={errors.email}
              />

              {/* Phone */}
              <Field
                label="Phone" name="phone" type="tel"
                icon={<FaPhone />} placeholder="+880 1XXX XXXXXX"
                value={formData.phone} onChange={handleChange} error={errors.phone}
              />

              {/* Institution */}
              <Field
                label="Institution" name="institution" type="text"
                icon={<FaUniversity />} placeholder="School / College / University"
                value={formData.institution} onChange={handleChange} error={errors.institution}
              />

            </div>

            {/* Password row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    name="password" type={showPassword ? 'text' : 'password'}
                    value={formData.password} onChange={handleChange}
                    placeholder="••••••••"
                    className={inputCls(errors.password) + ' pl-9 pr-10'}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword} onChange={handleChange}
                    placeholder="••••••••"
                    className={inputCls(errors.confirmPassword) + ' pl-9 pr-10'}
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirmPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-500">{errors.confirmPassword}</p>}
              </div>

            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-1">
              <input
                id="acceptTerms" name="acceptTerms" type="checkbox"
                checked={formData.acceptTerms} onChange={handleChange}
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-600 cursor-pointer">
                I agree to the{' '}
                <Link to="/terms" className="text-emerald-600 hover:underline">Terms</Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-emerald-600 hover:underline">Privacy Policy</Link>
              </label>
            </div>
            {errors.acceptTerms && <p className="text-xs text-red-500 -mt-2">{errors.acceptTerms}</p>}

            {/* Submit */}
            <button
              type="submit" disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white text-sm font-semibold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 mt-1"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </>
              ) : 'Create Account'}
            </button>

          </form>
        </div>

        {/* Sign in link */}
        <p className="text-center text-sm text-gray-500 mt-5">
          Already have an account?{' '}
          <Link to="/signin" className="text-emerald-600 font-medium hover:text-emerald-700 hover:underline">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
};

// ── Helpers ──
const inputCls = (error) =>
  `w-full py-2.5 text-sm rounded-xl border bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all text-gray-900 placeholder-gray-400 ${
    error
      ? 'border-red-300 focus:ring-red-100'
      : 'border-gray-200 focus:ring-emerald-100 focus:border-emerald-400'
  }`;

const Field = ({ label, name, type, icon, placeholder, value, onChange, error }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 flex items-center justify-center text-sm">
        {icon}
      </span>
      <input
        name={name} type={type} value={value}
        onChange={onChange} placeholder={placeholder}
        className={inputCls(error) + ' pl-9 pr-4'}
      />
    </div>
    {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
  </div>
);

export default SignUp;