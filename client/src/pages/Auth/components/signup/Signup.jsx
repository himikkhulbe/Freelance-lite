import React, { useState } from "react";
import { Eye, EyeOff, UserPlus, Mail, Lock, User, AtSign, AlertCircle, CheckCircle, Loader2, Briefcase, ArrowRight, Shield, Check, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("freelancer");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const navigate = useNavigate();
  
  // Validation states
  const [nameError, setNameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Password strength indicators
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    letter: false,
    number: false,
    special: false,
    match: false
  });

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const lengthCheck = /^.{6,15}$/;
    const letterCheck = /[A-Za-z]/;
    const numberCheck = /\d/;
    const specialCheck = /[@#$%^&*!?]/;
    
    const strength = {
      length: lengthCheck.test(password),
      letter: letterCheck.test(password),
      number: numberCheck.test(password),
      special: specialCheck.test(password)
    };
    
    setPasswordStrength({
      ...strength,
      match: confirmPassword ? password === confirmPassword : false
    });
    
    return strength.length && strength.letter && strength.number && strength.special;
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  };

  // Real-time validation handlers
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value && value.length < 2) {
      setNameError('Name must be at least 2 characters');
    } else {
      setNameError('');
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (value && !validateUsername(value)) {
      setUsernameError('Username must be 3-20 characters, letters, numbers, and underscores only');
    } else {
      setUsernameError('');
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const isValid = validatePassword(value);
    if (value && !isValid) {
      setPasswordError('Password must meet all requirements below');
    } else {
      setPasswordError('');
    }
    // Update confirm password validation
    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else if (confirmPassword) {
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value && value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
    setPasswordStrength(prev => ({ ...prev, match: value === password }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Final validation
    if (!name) {
      setNameError('Name is required');
      return;
    }
    if (!username) {
      setUsernameError('Username is required');
      return;
    }
    if (!validateUsername(username)) {
      setUsernameError('Username must be 3-20 characters, letters, numbers, and underscores only');
      return;
    }
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setPasswordError('Password is required');
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError('Password must meet all requirements');
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }
    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const res = await fetch('https://freelance-lite.onrender.com/api/user/register', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, username, email, password, role })
      });

      if (res.ok) {
        setSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          // alert('Redirecting to login page...');
          navigate("/login");
        }, 2000);
      } else {
        const errorData = await res.json();
        setError(errorData?.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError(`Network error. Please check your connection and try again.${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate('/login')
  };

  const PasswordStrengthIndicator = ({ requirement, met, text }) => (
    <div className={`flex items-center space-x-2 text-xs ${met ? 'text-green-600' : 'text-gray-400'}`}>
      {met ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen mt-[65px] bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center items-start space-y-8 p-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800">
                FREELANCE <span className="text-blue-600">LITE</span>
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-md">
              Connect with top talent and trusted clients worldwide. Start your freelance journey today!
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Secure Platform</h3>
                <p className="text-gray-600">Your data is protected with enterprise-grade security</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Global Opportunities</h3>
                <p className="text-gray-600">Access projects and talent from around the world</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <CheckCircle className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Easy Getting Started</h3>
                <p className="text-gray-600">Simple onboarding process to get you working fast</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 space-y-6">
            {/* Mobile Branding */}
            <div className="lg:hidden text-center mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">
                  FREELANCE <span className="text-blue-600">LITE</span>
                </h1>
              </div>
            </div>

            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
              <p className="text-gray-600">Sign up and start working or hiring today</p>
            </div>

            {/* Alert Messages */}
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">{success}</span>
              </div>
            )}

            {/* Signup Form */}
            <div className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    nameError ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Enter your full name"
                  disabled={isLoading}
                />
                {nameError && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{nameError}</span>
                  </p>
                )}
              </div>

              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <AtSign className="w-4 h-4" />
                  <span>Username</span>
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    usernameError ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Choose a unique username"
                  disabled={isLoading}
                />
                {usernameError && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{usernameError}</span>
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    emailError ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Enter your email address"
                  disabled={isLoading}
                />
                {emailError && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{emailError}</span>
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      passwordError ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Create a strong password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Strength Indicators */}
                {password && (
                  <div className="space-y-1 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs font-medium text-gray-700 mb-2">Password Requirements:</p>
                    <div className="grid grid-cols-2 gap-1">
                      <PasswordStrengthIndicator requirement="length" met={passwordStrength.length} text="6-15 characters" />
                      <PasswordStrengthIndicator requirement="letter" met={passwordStrength.letter} text="Contains letter" />
                      <PasswordStrengthIndicator requirement="number" met={passwordStrength.number} text="Contains number" />
                      <PasswordStrengthIndicator requirement="special" met={passwordStrength.special} text="Special character" />
                    </div>
                  </div>
                )}
                
                {passwordError && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{passwordError}</span>
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Confirm Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      confirmPasswordError ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    placeholder="Confirm your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {confirmPassword && (
                  <div className={`text-xs flex items-center space-x-1 ${passwordStrength.match ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordStrength.match ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                    <span>{passwordStrength.match ? 'Passwords match' : 'Passwords do not match'}</span>
                  </div>
                )}
                {confirmPasswordError && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{confirmPasswordError}</span>
                  </p>
                )}
              </div>

              {/* Role Selection */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">I want to:</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    role === 'freelancer' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      value="freelancer"
                      checked={role === 'freelancer'}
                      onChange={(e) => setRole(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex flex-col items-center space-y-2 w-full">
                      <User className={`w-6 h-6 ${role === 'freelancer' ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className={`font-semibold ${role === 'freelancer' ? 'text-blue-700' : 'text-gray-600'}`}>
                        Find Work
                      </span>
                      <span className="text-xs text-gray-500 text-center">I'm a freelancer looking for projects</span>
                    </div>
                  </label>
                  
                  <label className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    role === 'client' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      value="client"
                      checked={role === 'client'}
                      onChange={(e) => setRole(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex flex-col items-center space-y-2 w-full">
                      <Briefcase className={`w-6 h-6 ${role === 'client' ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className={`font-semibold ${role === 'client' ? 'text-blue-700' : 'text-gray-600'}`}>
                        Hire Talent
                      </span>
                      <span className="text-xs text-gray-500 text-center">I'm a client looking to hire</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <button type="button" className="text-blue-600 hover:text-blue-700 underline focus:outline-none">
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button type="button" className="text-blue-600 hover:text-blue-700 underline focus:outline-none">
                    Privacy Policy
                  </button>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSignup}
                disabled={isLoading || !agreedToTerms}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={handleLoginClick}
                  className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 focus:outline-none inline-flex items-center space-x-1"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>© 2025 Freelance Lite. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
