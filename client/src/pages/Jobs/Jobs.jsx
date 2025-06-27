import {
  Search,
  Filter,
  MapPin,
  Clock,
  DollarSign,
  IndianRupee,
  User,
  Star,
  Bookmark,
  BookmarkCheck,
  Eye,
  X,
  Menu,
} from "lucide-react";
import { useEffect, useState } from "react";

const jobsData = [
  {
    _id: "68563628adb7c8fa5c4ac9bd",
    client: "6855becd96f186bf3e4cbaaf",
    title: "Build a Landing Page for SaaS Product",
    description:
      "Need a responsive landing page built with React and Tailwind. Should include hero section, features, pricing, and contact form.",
    requiredSkills: ["React", "Tailwind CSS", "JavaScript"],
    budget: 25000,
    duration: "2 weeks",
    deadline: "2025-07-10T00:00:00.000Z",
    category: "Web Development",
    isOpen: true,
    proposals: [],
    createdAt: "2025-06-21T04:33:44.135Z",
    updatedAt: "2025-06-21T04:33:44.135Z",
    __v: 0,
  },
  {
    _id: "68563628adb7c8fa5c4ac9be",
    client: "6855becd96f186bf3e4cbaaf",
    title: "Mobile App UI/UX Design for Healthcare App",
    description:
      "Seeking a talented UI/UX designer to create intuitive and accessible designs for our healthcare mobile application. Experience in healthcare industry preferred.",
    requiredSkills: [
      "UI/UX Design",
      "Mobile Design",
      "Figma",
      "Healthcare",
      "Accessibility",
    ],
    budget: 35000,
    duration: "1 month",
    deadline: "2025-07-25T00:00:00.000Z",
    category: "Design",
    isOpen: true,
    proposals: [],
    createdAt: "2025-06-22T04:33:44.135Z",
    updatedAt: "2025-06-22T04:33:44.135Z",
    __v: 0,
  },
  {
    _id: "68563628adb7c8fa5c4ac9bf",
    client: "6855becd96f186bf3e4cbaaf",
    title: "Content Writing for Digital Marketing Campaign",
    description:
      "Need experienced content writers for various digital marketing campaigns. Must be able to write engaging blog posts, social media content, and email campaigns.",
    requiredSkills: [
      "Content Writing",
      "SEO",
      "Social Media",
      "Email Marketing",
      "Copywriting",
    ],
    budget: 15000,
    duration: "3 weeks",
    deadline: "2025-07-15T00:00:00.000Z",
    category: "Writing",
    isOpen: true,
    proposals: [],
    createdAt: "2025-06-21T04:33:44.135Z",
    updatedAt: "2025-06-21T04:33:44.135Z",
    __v: 0,
  },
  {
    _id: "68563628adb7c8fa5c4ac9c0",
    client: "6855becd96f186bf3e4cbaaf",
    title: "Data Analysis and Visualization Dashboard",
    description:
      "Looking for a data scientist to create interactive dashboards and perform complex data analysis. Experience with Python, Tableau, and statistical modeling required.",
    requiredSkills: ["Python", "Tableau", "Data Analysis", "Statistics", "SQL"],
    budget: 45000,
    duration: "6 weeks",
    deadline: "2025-08-05T00:00:00.000Z",
    category: "Data Science",
    isOpen: true,
    proposals: [],
    createdAt: "2025-06-19T04:33:44.135Z",
    updatedAt: "2025-06-19T04:33:44.135Z",
    __v: 0,
  },
  {
    _id: "68563628adb7c8fa5c4ac9c1",
    client: "6855becd96f186bf3e4cbaaf",
    title: "Video Editing for YouTube Channel",
    description:
      "Seeking a skilled video editor for ongoing YouTube content creation. Must be proficient in After Effects and Premiere Pro with a creative eye for storytelling.",
    requiredSkills: [
      "Video Editing",
      "After Effects",
      "Premiere Pro",
      "Motion Graphics",
      "YouTube",
    ],
    budget: 20000,
    duration: "4 weeks",
    deadline: "2025-07-20T00:00:00.000Z",
    category: "Video & Animation",
    isOpen: true,
    proposals: [],
    createdAt: "2025-06-23T04:33:44.135Z",
    updatedAt: "2025-06-23T04:33:44.135Z",
    __v: 0,
  },
  {
    _id: "68563628adb7c8fa5c4ac9c2",
    client: "6855becd96f186bf3e4cbaaf",
    title: "SEO Optimization for E-commerce Website",
    description:
      "Need an SEO expert to improve organic search rankings for our e-commerce website. Must have proven track record with technical SEO and content optimization.",
    requiredSkills: [
      "SEO",
      "Google Analytics",
      "Keyword Research",
      "Technical SEO",
      "Content Strategy",
    ],
    budget: 30000,
    duration: "5 weeks",
    deadline: "2025-07-30T00:00:00.000Z",
    category: "Digital Marketing",
    isOpen: true,
    proposals: [],
    createdAt: "2025-06-18T04:33:44.135Z",
    updatedAt: "2025-06-18T04:33:44.135Z",
    __v: 0,
  },
];

const categories = [
  "All Categories",
  "Web Development",
  "Design",
  "Writing",
  "Data Science",
  "Video & Animation",
  "Digital Marketing",
];

const budgetRanges = [
  "All Budgets",
  "Under ₹20,000",
  "₹20,000 - ₹30,000",
  "₹30,000 - ₹50,000",
  "Above ₹50,000",
];

const Jobs = () => {
  const [jobData, setJobData] = useState(jobsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedBudget, setSelectedBudget] = useState("All Budgets");
  const [sortBy, setSortBy] = useState("newest");
  const [filteredJobs, setFilteredJobs] = useState(jobsData);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    let filtered = jobData;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.requiredSkills.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Category filter
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((job) => job.category === selectedCategory);
    }

    // Budget filter
    if (selectedBudget !== "All Budgets") {
      filtered = filtered.filter((job) => {
        const budget = job.budget;
        switch (selectedBudget) {
          case "Under ₹20,000":
            return budget < 20000;
          case "₹20,000 - ₹30,000":
            return budget >= 20000 && budget <= 30000;
          case "₹30,000 - ₹50,000":
            return budget >= 30000 && budget <= 50000;
          case "Above ₹50,000":
            return budget > 50000;
          default:
            return true;
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "budget-high":
          return b.budget - a.budget;
        case "budget-low":
          return a.budget - b.budget;
        case "deadline":
          return new Date(a.deadline) - new Date(b.deadline);
        default:
          return 0;
      }
    });

    setFilteredJobs(filtered);
  }, [searchTerm, selectedCategory, selectedBudget, sortBy, jobData]);

  return (
    <div className="min-h-screen flex flex-col pt-[20px] items-center justify-start bg-gray-100 gap-[30px] pb-[50px]">

      <div className="p-5 xl:px-32 md:px-5 min-h-screen flex gap-10 bg-gray-100">
        {/* Sidebar */}

        <div className="hidden lg:block w-1/3 h-min py-3 rounded-md bg-white border border-gray-200 shadow-lg">
          <h3 className="font-semibold pt-2 px-3">Filters</h3>

          {/* Category Filter */}
          <div className="p-3 ">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Filter */}
          <div className="p-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget Range
            </label>
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {budgetRanges.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Options */}
          <div className="p-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
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
          <div className="p-3">
            <button
              onClick={() => {
                setSelectedCategory("All Categories");
                setSelectedBudget("All Budgets");
                // setSearchTerm('');
                setSortBy("newest");
              }}
              className="w-full px-4 py-2  text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        <div className="w-full">
          <div className="px-4 py-4 lg:w-full rounded-md border border-gray-200 shadow-lg flex gap-3 justify-center bg-white">
            <div
              style={isSearchFocused ? { border: "2px solid #2463EB" } : {}}
              className="p-2 border border-gray-300 rounded-md flex gap-4 w-full "
            >
              <Search className="text-gray-500" />
              <input
                className="px-2 w-full border-collapse border-0 focus:ring-0 focus:border-transparent outline-none"
                type="text"
                placeholder="Search jobs by title, skills, or description..."
                value={searchTerm}
                onFocus={()=>{
                  setIsSearchFocused(true);
                }}
                onBlur={()=>{
                  setIsSearchFocused(false);
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex border text-gray-600 border-gray-300 rounded-md items-center py-1 px-2 gap-2"
            >
              <Filter className="text-gray-500 text-sm w-5 h-5" />
              Filters
            </button>
          </div>

          {showMobileFilters && (
            <div className="border rounded-md shadow-lg p-2 bg-white h-min mt-5">
              <div className="flex justify-between pt-2 px-3 mb-4">
                <h3 className="font-semibold text-xl">Filters</h3>
                <X
                  onClick={() => setShowMobileFilters(false)}
                  className="w-6 h-6"
                />
              </div>
              {/* Category Filter */}
              <div className="p-3 ">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget Filter */}
              <div className="p-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div className="p-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
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
              <div className="p-3">
                <button
                  onClick={() => {
                    setSelectedCategory("All Categories");
                    setSelectedBudget("All Budgets");
                    // setSearchTerm('');
                    setSortBy("newest");
                  }}
                  className="w-full px-4 py-2  text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}

          {filteredJobs.map((job) => {
            return (
              <div
                key={job._id}
                className="p-5 border border-gray-200 shadow-lg rounded-md mt-5 flex flex-col gap-3 overflow-x-hidden bg-white"
              >
                <div className="flex sm:flex-row flex-col gap-[20px] ">
                  <h2 className="font-medium text-xl">{job.title}</h2>
                  <span className="py-2 bg-blue-200 text-blue-800 w-fit rounded-full text-xs text-center flex justify-center items-center  px-5 ">
                    {job.category}
                  </span>
                </div>
                <p className="text-gray-500">{job.description}</p>
                <div className="flex gap-10 justify-start items-center">
                  <div className="flex items-center">
                    <IndianRupee className="w-4 h-4 text-gray-500" />
                    <span className="text-green-600">{job.budget}</span>
                  </div>
                  <span className="flex gap-1 justify-start items-center text-gray-500">
                    <Clock className="w-4 h-4 text-gray-500" />
                    {job.duration}
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {job.requiredSkills.slice(0, 3).map((skill) => {
                    return (
                      <span
                        key={skill}
                        className="bg-gray-200 p-1 rounded-full text-sm text-gray-600 px-4 text-nowrap"
                      >
                        {skill}
                      </span>
                    );
                  })}
                  {job.requiredSkills.length > 3 && (
                    <span
                      className="bg-gray-200 p-1 rounded-full text-sm text-gray-600 px-4 text-nowrap"
                    >
                      +{job.requiredSkills.length-3} more
                    </span>
                  )}
                </div>
                <div className="flex gap-4 pt-2 flex-wrap">
                  <button className="px-14 py-2 bg-blue-700 sm:w-fit w-full text-white text-lg font-light rounded-lg text-nowrap">
                    Apply Now
                  </button>
                  <button className="px-4 py-2 border text-gray-500 rounded-lg sm:w-fit w-full">
                    {" "}
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
