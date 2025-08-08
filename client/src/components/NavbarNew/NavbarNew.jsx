import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
    const { user, setUser } = useAuth();
    console.log(user)
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [userType, setUserType] = useState(user?.user?.role);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    // const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);


    // const [searchQuery, setSearchQuery] = useState('');
    // const [searchCategory, setSearchCategory] = useState('all');
    // const [searchLocation, setSearchLocation] = useState('');
    // const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    // const [searchType, setSearchType] = useState(userType === 'freelancer' ? 'jobs' : 'services');

    const profileDropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();


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
                credentials: 'include'
            });
            if (res.ok) {
                setUser(null);
                navigate('/login');
            } else {
                console.error('Failed to logout');
            }
        } catch (err) {
            console.error(err);
        }
    };

    // useEffect(() => {
    //   const handleClickOutside = (event) => {
    //     if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
    //       setIsProfileDropdownOpen(false);
    //     }
    //     if (searchModalRef.current && !searchModalRef.current.contains(event.target)) {
    //       setIsSearchModalOpen(false);
    //     }
    //   };
    //   document.addEventListener('mousedown', handleClickOutside);
    //   return () => document.removeEventListener('mousedown', handleClickOutside);
    // }, []);

    const getNavigationItems = () => {
        if (!isLoggedIn) {
            return [
                { label: 'Find Freelancers', href: '/freelancers' },
                { label: 'Find Jobs', href: '/jobs' },
                { label: 'How It Works', href: '/how-it-works' }
            ];
        }
        if (userType === 'freelancer') {
            return [
                { label: 'Find Jobs', href: '/jobs', icon: <Briefcase className="w-4 h-4" /> },
                { label: 'My Services', href: '/services', icon: <Star className="w-4 h-4" /> },
                { label: 'Post Service', href: '/addservice', icon: <PlusCircle className="w-4 h-4" /> }
            ];
        } else {
            return [
                { label: 'Find Services', href: '/services', icon: <Star className="w-4 h-4" /> },
                { label: 'My Jobs', href: '/my-jobs', icon: <Briefcase className="w-4 h-4" /> },
                { label: 'Post Job', href: '/post-job', icon: <PlusCircle className="w-4 h-4" /> }
            ];
        }
    };

    const navigationItems = getNavigationItems();

    // const handleSearch = () => {
    //   console.log('Search params:', {
    //     query: searchQuery,
    //     category: searchCategory,
    //     location: searchLocation,
    //     priceRange,
    //     type: searchType
    //   });
    //   setIsSearchModalOpen(false);
    // };

    const toggleUserType = () => {
        setUserType(userType === 'freelancer' ? 'client' : 'freelancer');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-blue-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <a href="/" className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-2 rounded-lg">
                        <Briefcase className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">FreelanceHub</span>
                </a>

                <nav className="hidden md:flex items-center gap-6">
                    {navigationItems.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.href}
                            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-200 ${isActive(item.href)
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    {/* <button onClick={() => setIsSearchModalOpen(true)} className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full">
            <Search className="w-5 h-5" />
          </button> */}

                    {isLoggedIn ? (
                        <div className="relative" ref={profileDropdownRef}>
                            <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 rounded-full px-2 py-1">
                                {userData.avatar ? (
                                    <img src={userData.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-600" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                                        <User className="w-5 h-5 text-black" />
                                    </div>
                                )}
                                <span className="hidden sm:block text-sm font-medium text-gray-700">{userData.name}</span>
                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            </button>

                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
                                    <div className="px-5 py-4 bg-gray-50">
                                        <div className="flex items-center gap-4">
                                            {userData.avatar ? (
                                                <img src={userData.avatar} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                                                    <User className="w-6 h-6 text-black" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                                                <p className="text-xs text-gray-500">{userData.email}</p>
                                                <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                                                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                                    {userData.rating} • {userData.completedJobs} jobs
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <a href="/profile" className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-gray-100">
                                        <User className="w-4 h-4 mr-3" />
                                        View Profile
                                    </a>

                                    {/* <a href="/settings" className="flex items-center px-5 py-3 text-sm text-gray-700 hover:bg-gray-100">
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </a> */}

                                    <button onClick={toggleUserType} className="flex items-center w-full px-5 py-3 text-sm text-gray-700 hover:bg-gray-100">
                                        <Briefcase className="w-4 h-4 mr-3" />
                                        Switch to {userType === 'freelancer' ? 'Client' : 'Freelancer'}
                                    </button>

                                    <div className="border-t border-gray-100">
                                        <button onClick={handleLogout} className="flex items-center w-full px-5 py-3 text-sm text-red-600 hover:bg-red-50">
                                            <LogOut className="w-4 h-4 mr-3" />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <a href="/login" className="text-gray-700 hover:text-blue-600 text-sm font-medium">Sign In</a>
                            <a href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">Sign Up</a>
                        </div>
                    )}

                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 px-4 py-3 bg-white shadow-sm">
                    {navigationItems.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium"
                        >
                            {item.icon}
                            {item.label}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
};

export default FreelanceNavbar;