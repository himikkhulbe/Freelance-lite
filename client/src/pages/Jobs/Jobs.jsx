import { useEffect, useState } from "react";
import SearchBar from "../Jobs/components/SearchBar";
import Filters from "../Jobs/components/Filters";
import JobCard from "../../components/Common/JobCard";
import Mobilefilter from "../Jobs/components/Mobilefilter";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../../components/Common/Loading";


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
  const [jobData, setJobData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedBudget, setSelectedBudget] = useState("All Budgets");
  const [sortBy, setSortBy] = useState("newest");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
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

  if (loading) {
    return (<Loading />)
  }


  return (
    <div className="min-h-screen  w-full flex flex-col pt-[85px] items-center justify-start bg-gray-100 gap-[30px] pb-[50px]">
      <div className="xl:px-32 md:px-5 min-h-screen w-full flex gap-10 bg-gray-100">
        {/* Sidebar */}     
        <Filters {...filterProps} />

        <div className="w-full relative">
          
          {/* Search Bar */}
          
          <div className="w-full sticky top-[85px] ">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setShowMobileFilters={setShowMobileFilters}
            />
          </div>
          

          {/* Mobile Filters */}
          
          <Mobilefilter {...mobileFilterProps} />
          

          {/* Job Cards */}
          <div className="mt-5 rounded min-h-[70vh] overflow-y-auto">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              return (
                <JobCard key={job._id} data={job} loggedInUser={user?.user} />
              );
            })
          ) : (
              <h1 className="text-center text-zinc-500 font-medium">No Job Found</h1>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
