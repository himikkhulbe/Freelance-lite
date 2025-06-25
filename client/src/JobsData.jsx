import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, User, Star, Bookmark, BookmarkCheck, Eye, X, Menu } from 'lucide-react';

// Sample data matching your structure - replace with your Data.js import
const jobsData = [
  {
    "_id": "68563628adb7c8fa5c4ac9bd",
    "client": "6855becd96f186bf3e4cbaaf",
    "title": "Build a Landing Page for SaaS Product",
    "description": "Need a responsive landing page built with React and Tailwind. Should include hero section, features, pricing, and contact form.",
    "requiredSkills": ["React", "Tailwind CSS", "JavaScript"],
    "budget": 25000,
    "duration": "2 weeks",
    "deadline": "2025-07-10T00:00:00.000Z",
    "category": "Web Development",
    "isOpen": true,
    "proposals": [],
    "createdAt": "2025-06-21T04:33:44.135Z",
    "updatedAt": "2025-06-21T04:33:44.135Z",
    "__v": 0
  },
  {
    "_id": "68563628adb7c8fa5c4ac9be",
    "client": "6855becd96f186bf3e4cbaaf",
    "title": "Mobile App UI/UX Design for Healthcare App",
    "description": "Seeking a talented UI/UX designer to create intuitive and accessible designs for our healthcare mobile application. Experience in healthcare industry preferred.",
    "requiredSkills": ["UI/UX Design", "Mobile Design", "Figma", "Healthcare", "Accessibility"],
    "budget": 35000,
    "duration": "1 month",
    "deadline": "2025-07-25T00:00:00.000Z",
    "category": "Design",
    "isOpen": true,
    "proposals": [],
    "createdAt": "2025-06-22T04:33:44.135Z",
    "updatedAt": "2025-06-22T04:33:44.135Z",
    "__v": 0
  },
  {
    "_id": "68563628adb7c8fa5c4ac9bf",
    "client": "6855becd96f186bf3e4cbaaf",
    "title": "Content Writing for Digital Marketing Campaign",
    "description": "Need experienced content writers for various digital marketing campaigns. Must be able to write engaging blog posts, social media content, and email campaigns.",
    "requiredSkills": ["Content Writing", "SEO", "Social Media", "Email Marketing", "Copywriting"],
    "budget": 15000,
    "duration": "3 weeks",
    "deadline": "2025-07-15T00:00:00.000Z",
    "category": "Writing",
    "isOpen": true,
    "proposals": [],
    "createdAt": "2025-06-21T04:33:44.135Z",
    "updatedAt": "2025-06-21T04:33:44.135Z",
    "__v": 0
  },
  {
    "_id": "68563628adb7c8fa5c4ac9c0",
    "client": "6855becd96f186bf3e4cbaaf",
    "title": "Data Analysis and Visualization Dashboard",
    "description": "Looking for a data scientist to create interactive dashboards and perform complex data analysis. Experience with Python, Tableau, and statistical modeling required.",
    "requiredSkills": ["Python", "Tableau", "Data Analysis", "Statistics", "SQL"],
    "budget": 45000,
    "duration": "6 weeks",
    "deadline": "2025-08-05T00:00:00.000Z",
    "category": "Data Science",
    "isOpen": true,
    "proposals": [],
    "createdAt": "2025-06-19T04:33:44.135Z",
    "updatedAt": "2025-06-19T04:33:44.135Z",
    "__v": 0
  },
  {
    "_id": "68563628adb7c8fa5c4ac9c1",
    "client": "6855becd96f186bf3e4cbaaf",
    "title": "Video Editing for YouTube Channel",
    "description": "Seeking a skilled video editor for ongoing YouTube content creation. Must be proficient in After Effects and Premiere Pro with a creative eye for storytelling.",
    "requiredSkills": ["Video Editing", "After Effects", "Premiere Pro", "Motion Graphics", "YouTube"],
    "budget": 20000,
    "duration": "4 weeks",
    "deadline": "2025-07-20T00:00:00.000Z",
    "category": "Video & Animation",
    "isOpen": true,
    "proposals": [],
    "createdAt": "2025-06-23T04:33:44.135Z",
    "updatedAt": "2025-06-23T04:33:44.135Z",
    "__v": 0
  },
  {
    "_id": "68563628adb7c8fa5c4ac9c2",
    "client": "6855becd96f186bf3e4cbaaf",
    "title": "SEO Optimization for E-commerce Website",
    "description": "Need an SEO expert to improve organic search rankings for our e-commerce website. Must have proven track record with technical SEO and content optimization.",
    "requiredSkills": ["SEO", "Google Analytics", "Keyword Research", "Technical SEO", "Content Strategy"],
    "budget": 30000,
    "duration": "5 weeks",
    "deadline": "2025-07-30T00:00:00.000Z",
    "category": "Digital Marketing",
    "isOpen": true,
    "proposals": [],
    "createdAt": "2025-06-18T04:33:44.135Z",
    "updatedAt": "2025-06-18T04:33:44.135Z",
    "__v": 0
  }
];

const categories = [
  "All Categories",
  "Web Development",
  "Design",
  "Writing",
  "Data Science",
  "Video & Animation",
  "Digital Marketing"
];

const budgetRanges = [
  "All Budgets",
  "Under ₹20,000",
  "₹20,000 - ₹30,000",
  "₹30,000 - ₹50,000",
  "Above ₹50,000"
];

const JobsPage = () => {
  const [jobs, setJobs] = useState(jobsData);
  const [filteredJobs, setFilteredJobs] = useState(jobsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedBudget, setSelectedBudget] = useState('All Budgets');
  const [sortBy, setSortBy] = useState('newest');
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    let filtered = jobs;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.requiredSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    // Budget filter
    if (selectedBudget !== 'All Budgets') {
      filtered = filtered.filter(job => {
        const budget = job.budget;
        switch (selectedBudget) {
          case 'Under ₹20,000':
            return budget < 20000;
          case '₹20,000 - ₹30,000':
            return budget >= 20000 && budget <= 30000;
          case '₹30,000 - ₹50,000':
            return budget >= 30000 && budget <= 50000;
          case 'Above ₹50,000':
            return budget > 50000;
          default:
            return true;
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'budget-high':
          return b.budget - a.budget;
        case 'budget-low':
          return a.budget - b.budget;
        case 'deadline':
          return new Date(a.deadline) - new Date(b.deadline);
        default:
          return 0;
      }
    });

    setFilteredJobs(filtered);
  }, [searchTerm, selectedCategory, selectedBudget, sortBy, jobs]);

  const toggleSaveJob = (jobId) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const formatBudget = (budget) => {
    return `₹${budget.toLocaleString()}`;
  };

  const getTimeSince = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInDays = Math.floor((now - posted) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const getDeadlineStatus = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffInDays = Math.floor((deadlineDate - now) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 0) return { text: 'Expired', color: 'text-red-600' };
    if (diffInDays <= 7) return { text: `${diffInDays} days left`, color: 'text-orange-600' };
    return { text: `${diffInDays} days left`, color: 'text-green-600' };
  };

  const handleViewDetails = (jobId) => {
    // This would typically use React Router
    // For demo purposes, we'll show an alert
    alert(`Navigate to job details page with ID: ${jobId}`);
    // In real implementation:
    // navigate(`/job/${jobId}`);
  };

  const FilterSidebar = ({ isMobile = false }) => (
    <div className={`${isMobile ? 'fixed inset-0 z-50 bg-black bg-opacity-50' : ''}`}>
      <div className={`bg-white h-full ${isMobile ? 'w-80 shadow-xl' : 'w-full'} ${isMobile ? 'absolute right-0' : ''}`}>
        {isMobile && (
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">Filters</h3>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        
        <div className="p-4 space-y-6">
          {!isMobile && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
            </div>
          )}

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Budget Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {budgetRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="budget-high">Highest Budget</option>
              <option value="budget-low">Lowest Budget</option>
              <option value="deadline">Deadline (Urgent First)</option>
            </select>
          </div>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSelectedCategory('All Categories');
              setSelectedBudget('All Budgets');
              setSearchTerm('');
              setSortBy('newest');
            }}
            className="w-full px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Find Your Next Project</h1>
            <p className="mt-2 text-gray-600">Discover opportunities that match your skills and interests</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-6">
              <FilterSidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search Bar and Mobile Filter Toggle */}
            <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search jobs by title, skills, or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {filteredJobs.map(job => {
                const deadlineStatus = getDeadlineStatus(job.deadline);
                return (
                  <div key={job._id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                              {job.title}
                            </h3>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              {job.category}
                            </span>
                          </div>
                          
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {job.description}
                          </p>

                          {/* Essential Details */}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              <span className="font-medium text-green-600">{formatBudget(job.budget)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{job.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className={`font-medium ${deadlineStatus.color}`}>
                                {deadlineStatus.text}
                              </span>
                            </div>
                            <div className="text-gray-500">
                              Posted {getTimeSince(job.createdAt)}
                            </div>
                          </div>

                          {/* Skills */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.requiredSkills.slice(0, 4).map(skill => (
                              <span
                                key={skill}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                            {job.requiredSkills.length > 4 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                                +{job.requiredSkills.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => toggleSaveJob(job._id)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-4"
                        >
                          {savedJobs.has(job._id) ? (
                            <BookmarkCheck className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Bookmark className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                          Apply Now
                        </button>
                        <button 
                          onClick={() => handleViewDetails(job._id)}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <FilterSidebar isMobile={true} />
      )}
    </div>
  );
};

export default JobsPage;