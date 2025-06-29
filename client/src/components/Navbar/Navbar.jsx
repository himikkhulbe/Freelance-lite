import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Search,
  Bell,
  MessageCircle,
  User,
  LogOut,
  Settings,
  Briefcase,
  PlusCircle,
  Menu,
  X,
  ChevronDown,
  Filter,
  MapPin,
  DollarSign,
  Star
} from 'lucide-react';

const FreelanceNavbar = () => {
  // State management
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userType, setUserType] = useState('freelancer');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [notifications] = useState(3);
  const [messages] = useState(5);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchLocation, setSearchLocation] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [searchType, setSearchType] = useState(userType === 'freelancer' ? 'jobs' : 'services');

  // Refs for dropdown management
  const profileDropdownRef = useRef(null);
  const searchModalRef = useRef(null);
  const navigate = useNavigate();

  // Context for authentication
  const { user, setUser } = useAuth();

  // Demo user data
  const userData = {
    name: user?.user?.name,
    email: user?.user?.email,
    avatar: user?.user?.profilePicture,
    rating: user?.user?.averageRating,
    completedJobs: 127
  };
  const handleLogout = async () => {
    try {
      const res = await fetch('https://freelance-lite.onrender.com/api/user/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        setUser(null);
        navigate('/login'); // Redirect back to login
      } else {
        console.error('Failed to logout');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (searchModalRef.current && !searchModalRef.current.contains(event.target)) {
        setIsSearchModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navigation items based on user type
  const getNavigationItems = () => {
    if (!isLoggedIn) {
      return [
        { label: 'Find Freelancers', href: '/freelancers' },
        { label: 'Find Jobs', href: '/jobs' },
        { label: 'How It Works', href: '/how-it-works' },
      ];
    }

    if (userType === 'freelancer') {
      return [
        { label: 'Find Jobs', href: '/jobs', icon: React.createElement(Briefcase, { className: "w-4 h-4" }) },
        { label: 'My Services', href: '/my-services', icon: React.createElement(Star, { className: "w-4 h-4" }) },
        { label: 'Post Service', href: '/post-service', icon: React.createElement(PlusCircle, { className: "w-4 h-4" }) },
      ];
    } else {
      return [
        { label: 'Find Services', href: '/services', icon: React.createElement(Star, { className: "w-4 h-4" }) },
        { label: 'My Jobs', href: '/my-jobs', icon: React.createElement(Briefcase, { className: "w-4 h-4" }) },
        { label: 'Post Job', href: '/post-job', icon: React.createElement(PlusCircle, { className: "w-4 h-4" }) },
      ];
    }
  };

  const navigationItems = getNavigationItems();

  // Handle search
  const handleSearch = () => {
    console.log('Search params:', {
      query: searchQuery,
      category: searchCategory,
      location: searchLocation,
      priceRange,
      type: searchType
    });
    setIsSearchModalOpen(false);
  };

  // Toggle user type
  const toggleUserType = () => {
    setUserType(userType === 'freelancer' ? 'client' : 'freelancer');
  };

  return (
    <div>
      {/* Main Navbar */}
      <nav className="bg-white shadow-lg border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-2 rounded-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">FreelanceHub</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-50"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">

              {/* Search Button */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                title="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  {/* Messages */}
                  <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200">
                    <MessageCircle className="w-5 h-5" />
                    {messages > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {messages}
                      </span>
                    )}
                  </button>

                  {/* Notifications */}
                  <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200">
                    <Bell className="w-5 h-5" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </button>

                  {/* Profile Dropdown */}
                  <div className="relative" ref={profileDropdownRef}>
                    <button
                      onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                      className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 rounded-full p-1 pr-3 transition-colors duration-200"
                    >
                      {userData.avatar ? 
                        <img
                          src={userData.avatar}
                          alt="Profile"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      : 
                      <div className='w-8 h-8 rounded-full object-cover flex justify-center items-center bg-blue-200'>
                        <User className="w-6 h-6 text-black" />
                      </div>

                      }
                      
                      <span className="hidden sm:block text-sm font-medium text-gray-700">{userData.name}</span>
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>

                    {/* Profile Dropdown Menu */}
                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="flex items-center space-x-3">
                            <img
                              src={userData.avatar}
                              alt="Profile"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                              <p className="text-xs text-gray-500">{userData.email}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-600">{userData.rating}</span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-600">{userData.completedJobs} jobs</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <a href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <User className="w-4 h-4 mr-3" />
                          View Profile
                        </a>

                        <a href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <Settings className="w-4 h-4 mr-3" />
                          Settings
                        </a>

                        <button
                          onClick={toggleUserType}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Briefcase className="w-4 h-4 mr-3" />
                          Switch to {userType === 'freelancer' ? 'Client' : 'Freelancer'}
                        </button>

                        <div className="border-t border-gray-100">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <LogOut className="w-4 h-4 mr-3" />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <a
                    href="/login"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Sign Up
                  </a>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
                {navigationItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Advanced Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div
            ref={searchModalRef}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Advanced Search</h2>
                <button
                  onClick={() => setIsSearchModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Search Type Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setSearchType('jobs')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${searchType === 'jobs'
                        ? 'bg-white text-gray-900 shadow'
                        : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    <Briefcase className="w-4 h-4 inline mr-2" />
                    Search Jobs
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchType('services')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${searchType === 'services'
                        ? 'bg-white text-gray-900 shadow'
                        : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    <Star className="w-4 h-4 inline mr-2" />
                    Search Services
                  </button>
                </div>

                {/* Search Query */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What are you looking for?
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={`Search for ${searchType}...`}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Category and Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <div className="relative">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <select
                        value={searchCategory}
                        onChange={(e) => setSearchCategory(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="all">All Categories</option>
                        <option value="web-development">Web Development</option>
                        <option value="mobile-development">Mobile Development</option>
                        <option value="design">Design</option>
                        <option value="writing">Writing</option>
                        <option value="marketing">Marketing</option>
                        <option value="business">Business</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        placeholder="Location (optional)"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Price Range
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                      placeholder="Min price"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                      placeholder="Max price"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Search Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleSearch}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200"
                  >
                    <Search className="w-4 h-4 inline mr-2" />
                    Search
                  </button>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSearchCategory('all');
                      setSearchLocation('');
                      setPriceRange({ min: '', max: '' });
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreelanceNavbar;