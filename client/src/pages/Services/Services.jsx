import { useEffect, useState } from "react";
import SearchBar from "../Jobs/components/SearchBar";
import Filters from "../Jobs/components/Filters";
import Mobilefilter from "../Jobs/components/Mobilefilter";
import ServiceCard from "../../components/Common/ServiceCard";
import { useAuth } from "../../contexts/AuthContext";

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

const Services = () => {
  const { user } = useAuth();
  const [serviceData, setServiceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedBudget, setSelectedBudget] = useState("All Budgets");
  const [sortBy, setSortBy] = useState("newest");
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://freelance-lite.onrender.com/api/freelancer/services"
        ); // Adjust the endpoint as needed
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setServiceData(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    })();
  }, []);

  useEffect(() => {
    let filtered = serviceData;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          service.skills.some((skill) =>
            skill.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Category filter
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(
        (service) => service.category === selectedCategory
      );
    }

    // Budget filter
    if (selectedBudget !== "All Budgets") {
      filtered = filtered.filter((service) => {
        const budget = service.budget;
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

    setFilteredServices(filtered);
  }, [searchTerm, selectedCategory, selectedBudget, sortBy, serviceData]);

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
    <div className="min-h-screen w-full flex flex-col pt-[20px] items-center justify-start bg-gray-100 gap-[30px] pb-[50px]">
      <div className="p-5 xl:px-32 md:px-5 min-h-screen w-full flex gap-10 bg-gray-100">
        {/* Sidebar */}
        <Filters {...filterProps} />

        <div className="w-full relative">

          {/* Search Bar */}
          <div className="w-full sticky top-5 ">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setShowMobileFilters={setShowMobileFilters}
          />
          </div>

          {/* Mobile Filters */}
          <Mobilefilter {...mobileFilterProps} />

          {/* Service Cards */}
          <div className="mt-5 rounded h-[70vh] overflow-y-auto">
          {filteredServices.length > 0 ? (
            filteredServices.map((job) => {
              return (
                <ServiceCard
                  key={job._id}
                  data={job}
                  loggedInUser={user?.user}
                />
              );
            })
          ) : (
            <h1 className="text-center text-zinc-500 font-medium">No Services Found</h1>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
