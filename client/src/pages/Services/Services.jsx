import { useEffect, useState } from "react";
import SearchBar from "../Jobs/components/SearchBar";
import Filters from "../Jobs/components/Filters";
import JobCard from "../Jobs/components/JobCard";
import Mobilefilter from "../Jobs/components/Mobilefilter";
import ServiceCard from "../../components/Common/ServiceCard";
import { useAuth } from "../../contexts/AuthContext";

// const servicesData = [
//   {
//     id: "srv1",
//     freelancer: "Arjun Mehta",
//     title: "Single Page Website with Animations",
//     description:
//       "Crafting sleek, responsive single-page websites with smooth scroll animations using React and GSAP. Perfect for portfolios or product launches.",
//     skills: ["React", "GSAP", "JavaScript", "HTML", "Tailwind CSS"],
//     category: "Web Development",
//     experienceLevel: "Intermediate",
//     budget: 22000,
//     createdAt: "2025-07-20T10:30:00.000Z",
//   },
//   {
//     id: "srv2",
//     freelancer: "Neha Kapoor",
//     title: "iOS & Android App UI Design",
//     description:
//       "I design intuitive mobile interfaces that focus on user experience and accessibility. Deliverables include Figma designs for iOS & Android.",
//     skills: ["UI Design", "Figma", "Mobile UX", "Accessibility"],
//     category: "Design",
//     experienceLevel: "Expert",
//     budget: 28000,
//     createdAt: "2025-07-22T11:15:00.000Z",
//   },
//   {
//     id: "srv3",
//     freelancer: "Ravi Sharma",
//     title: "Technical Blog Writing for SaaS Startups",
//     description:
//       "Writing engaging, SEO-optimized blog posts and landing page content specifically for tech/SaaS companies.",
//     skills: ["SEO Writing", "Content Strategy", "Copywriting", "SaaS"],
//     category: "Writing",
//     experienceLevel: "Intermediate",
//     budget: 8000,
//     createdAt: "2025-07-21T09:00:00.000Z",
//   },
//   {
//     id: "srv4",
//     freelancer: "Aditi Singh",
//     title: "Custom Data Dashboards with Python & Streamlit",
//     description:
//       "Interactive, real-time dashboards using Streamlit and Pandas. Ideal for internal data monitoring and reporting.",
//     skills: ["Python", "Streamlit", "Pandas", "Data Visualization"],
//     category: "Data Science",
//     experienceLevel: "Expert",
//     budget: 35000,
//     createdAt: "2025-07-18T14:00:00.000Z",
//   },
//   {
//     id: "srv5",
//     freelancer: "Kabir Verma",
//     title: "Reels & Shorts Editing for Instagram & YouTube",
//     description:
//       "I edit short-form videos with snappy transitions, effects, and captions—perfect for boosting your social reach.",
//     skills: [
//       "Video Editing",
//       "Reels",
//       "Shorts",
//       "Adobe Premiere",
//       "Social Media",
//     ],
//     category: "Video & Animation",
//     experienceLevel: "Intermediate",
//     budget: 6000,
//     createdAt: "2025-07-24T13:40:00.000Z",
//   },
//   {
//     id: "srv6",
//     freelancer: "Sanya Grover",
//     title: "SEO Audit & Keyword Strategy for Niche Sites",
//     description:
//       "In-depth website audits, keyword mapping, and backlink strategy tailored to small businesses or affiliate sites.",
//     skills: [
//       "SEO",
//       "Google Search Console",
//       "Keyword Research",
//       "Link Building",
//     ],
//     category: "Digital Marketing",
//     experienceLevel: "Expert",
//     budget: 27000,
//     createdAt: "2025-07-19T15:25:00.000Z",
//   },
//   {
//     id: "srv7",
//     freelancer: "Ishaan Malhotra",
//     title: "Full Branding Kit: Logo + Social Templates",
//     description:
//       "Get a complete brand identity with a logo, color palette, typography, and editable templates for Instagram and LinkedIn.",
//     skills: ["Branding", "Graphic Design", "Canva", "Illustrator"],
//     category: "Design",
//     experienceLevel: "Intermediate",
//     budget: 18000,
//     createdAt: "2025-07-23T12:10:00.000Z",
//   },
//   {
//     id: "srv8",
//     freelancer: "Meera Desai",
//     title: "Modern E-commerce Frontend with React & Next.js",
//     description:
//       "Build lightning-fast, SEO-ready e-commerce frontends using React + Next.js. Includes product pages, carts, and authentication.",
//     skills: ["React", "Next.js", "Tailwind", "Zustand", "Auth"],
//     category: "Web Development",
//     experienceLevel: "Expert",
//     budget: 45000,
//     createdAt: "2025-07-17T08:50:00.000Z",
//   },
// ];

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

        <div className="w-full">
          {/* Search Bar */}
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setShowMobileFilters={setShowMobileFilters}
          />

          {/* Mobile Filters */}
          <Mobilefilter {...mobileFilterProps} />

          {/* Job Cards */}
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
            <h1>No Services Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;
