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
  Star,
  Handshake,
  FileCheck
} from 'lucide-react';

const FreelanceNavbar = () => {
  // State management
  const { user, setUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Refs for dropdown management
  const profileDropdownRef = useRef(null);
  const navigate = useNavigate();

  // Context for authentication

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
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navigation items based on user type
  const getNavigationItems = () => {
    if (!user?.user) {
      return [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Contact Us', href: '/contact' }
      ];
    }
    if (user?.user?.role === 'freelancer') {
      return [
        { label: 'Home', href: '/' },
        { label: 'Find Jobs', href: '/jobs' },
        { label: 'About', href: '/about' },
        { label: 'Contact Us', href: '/contact' }
      ];
    } else if (user?.user?.role === 'client') {
      return [
        { label: 'Home', href: '/' },
        { label: 'Find Services', href: '/services' },
        { label: 'About', href: '/about' },
        { label: 'Contact Us', href: '/contact' }
      ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div>
      {/* Main Navbar */}
      <nav className="bg-white h-[64px]  shadow-lg border-b border-blue-100 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-2 rounded-lg">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl hidden sm:block font-bold text-gray-900">FreelanceHub</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md-lg:hidden md:flex items-center space-x-4">
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
              {user?.user ? (
                <div className="flex items-center space-x-4">
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
                            {userData.avatar
                              ?
                              <img
                                src={userData.avatar}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              :
                              <div className='w-10 h-10 rounded-full object-cover flex justify-center items-center bg-blue-200'>
                                <User className="w-8 h-8 text-black" />
                              </div>}

                            <div>
                              <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                              <p className="text-xs text-gray-500">{userData.email}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                {/* <span className="text-xs text-gray-400">•</span> */}
                                {/* <span className="text-xs text-gray-600">{userData.completedJobs} jobs</span> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <a href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <User className="w-4 h-4 mr-3" />
                          View Profile
                        </a>{
                          user?.user?.role === 'freelancer' ?
                            (
                              <>
                                <a href="/orderrecieved" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  <Handshake className="w-4 h-4 mr-3" />
                                  Order Received
                                </a>
                                <a href="/myproposals" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  <FileCheck className="w-4 h-4 mr-3" />
                                  My Proposals
                                </a>
                              </>
                            ) :
                            (
                              <>
                                <a href="/proposalsreceived" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  <FileCheck className="w-4 h-4 mr-3" />
                                  Proposals Received
                                </a>
                                <a href="/myorder" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  <Handshake className="w-4 h-4 mr-3" />
                                  My Order
                                </a>
                              </>

                            )
                        }


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
                className="md-lg:block md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md-lg:block md:hidden bg-white px-0 absolute w-full top-[64px] left-0">
              <div className="px-2 pt-2 pb-3 space-y-1  sm:px-3 border-t border-gray-200">
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
    </div>
  );
};

export default FreelanceNavbar;