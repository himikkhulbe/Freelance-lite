import { useEffect, useState } from "react";
import SearchBar from "../Jobs/components/SearchBar";
import Filters from "../Jobs/components/Filters";
import JobCard from "../Jobs/components/JobCard";
import Mobilefilter from "../Jobs/components/Mobilefilter";
import JobsCard from "../../components/Common/JobsCard";
import { useAuth } from "../../contexts/AuthContext";

const jobsData = [
  {
    id: "68563628adb7c8fa5c4ac9bd",
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
    id: "68563628adb7c8fa5c4ac9be",
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
    id: "68563628adb7c8fa5c4ac9bf",
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
    id: "68563628adb7c8fa5c4ac9c0",
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
    id: "68563628adb7c8fa5c4ac9c1",
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
    id: "68563628adb7c8fa5c4ac9c2",
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
  const { user } = useAuth();
  const [jobData, setJobData] = useState(jobsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedBudget, setSelectedBudget] = useState("All Budgets");
  const [sortBy, setSortBy] = useState("newest");
  const [filteredJobs, setFilteredJobs] = useState(jobsData);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://freelance-lite.onrender.com/api/client/jobs"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setJobData(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    })();
  }, []);

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

  const filterProps = {
    selectedCategory,
    setSelectedCategory,
    selectedBudget,
    setSelectedBudget,
    sortBy,
    setSortBy,
    categories,
    budgetRanges,
  };

  const mobileFilterProps = {
    selectedCategory,
    setSelectedCategory,
    selectedBudget,
    setSelectedBudget,
    sortBy,
    setSortBy,
    categories,
    budgetRanges,
    showMobileFilters,
    setShowMobileFilters,
  };

  return (
    <div className="min-h-screen w-full flex flex-col pt-[10%] max-sm:pt-[12%] md:pt-[8%] lg:pt-[6%] xl:pt-[5%] items-center justify-start bg-gray-100 gap-[30px] pb-[50px]">
      <div className="p-5 xl:px-32 md:px-5 min-h-screen w-full flex gap-10 bg-gray-100 relative">
        {/* Sidebar */}     
        <Filters {...filterProps} />

        <div className="w-full relative">
          
          {/* Search Bar */}
          
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setShowMobileFilters={setShowMobileFilters}
          />
          

          {/* Mobile Filters */}
          
          <Mobilefilter {...mobileFilterProps} />
          

          {/* Job Cards */}
          
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              return (
                <JobsCard key={job._id} data={job} loggedInUser={user?.user} />
              );
            })
          ) : (
            <h1 className="text-center text-zinc-500 font-medium">No Jobs Found</h1>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Jobs;
