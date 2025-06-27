import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Star, Eye, IndianRupee, Clock, Edit } from "lucide-react";
import { useParams } from "react-router-dom";
import ProfileMain from "./components/ProfileMain/ProfileMain.jsx";
import RatingSection from "./components/RatingSection/RatingSection.jsx";
import DetailsSection from "./components/DetailsSection/DetailsSection.jsx";
import RatingPopup from "./components/Popup/RatingPopup.jsx";
import ProfileEditPopup from "./components/Popup/ProfileEditPopup.jsx";
import ServiceOrJobsPopup from "./components/Popup/ServiceOrJobsPopup.jsx";

function Profile() {
    const { user } = useAuth();
    console.log(user)
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [showProfileEditModal, setShowProfileEditModal] = useState(false);
    const [showServiceOrJobsPopup, setShowServiceOrJobsPopup] = useState(false);
    const { id } = useParams();
    const [profileData, setProfileData] = useState(null);

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

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const endpoint = id
                    ? `https://freelance-lite.onrender.com/api/user/profile/${id}` // other user
                    : `https://freelance-lite.onrender.com/api/user/profile`;       // self

                const res = await fetch(endpoint, {
                    credentials: "include"
                });
                const data = await res.json();
                setProfileData(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, [id, showProfileEditModal]);
    console.log("Fetching profile for ID:", id);
    console.log("Profile data:", profileData);
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
            />
        ));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    useEffect(() => {

        if (!showRatingModal && !showProfileEditModal && !showServiceOrJobsPopup) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';

        }
        return () => (document.body.style.overflow = 'auto');
    }, [showRatingModal, showProfileEditModal, showServiceOrJobsPopup]);

    if (!profileData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">Loading...</p>
            </div>
        );
    }




    return (
        <div className="min-h-screen flex flex-col pt-[20px] items-center justify-start bg-gray-100 gap-[30px] pb-[50px]">
            {/* Profile Section */}
            {showRatingModal && <RatingPopup renderStars={renderStars} formatDate={formatDate} user={profileData} close={setShowRatingModal} />}
            {showProfileEditModal && <ProfileEditPopup loggedInUser={profileData} close={setShowProfileEditModal} />}
            {showServiceOrJobsPopup && <ServiceOrJobsPopup close={setShowServiceOrJobsPopup} />}
            <ProfileMain renderStars={renderStars} user={profileData} loggedInUser={user} openEdit={setShowProfileEditModal} />
            {/* bottom Section */}
            <div className="xl:w-[80%] w-[90%] min-h-[250px] flex lg:flex-row flex-col md:gap-[30px] gap-[20px]">
                {/* left side */}
                <DetailsSection user={profileData} loggedInUser={user} formatDate={formatDate} profileOpen={setShowProfileEditModal} />
                {/* right side */}
                <div className="lg:w-[68%] w-full min-h-[120px] flex flex-col xl:gap-[30px] gap-[20px]">
                    {/* services or jobs */}
                    <div className="w-full min-h-[120px] p-5 border-[0.5px] border-slate-500 bg-slate-50 rounded-lg">
                        <div className="flex justify-between items-center grow">
                            {user?.user?.role === "freelancer" && <p className="text-black text-lg font-semibold">Services Offered</p>}
                            {user?.user?.role === "client" && <p className="text-black text-lg font-semibold">Jobs Offered</p>}
                            <div className="flex gap-[10px]">
                                <button className="bg-blue-600 flex px-[10px] h-[42px] py-[5px] rounded-md justify-center items-center gap-[7px] text-sm text-white">
                                    <span className=" text-2xl">+</span> Add Services
                                </button>
                                <button onClick={() => setShowServiceOrJobsPopup(true)} className="bg-gray-200 flex px-[10px] h-[42px] py-[5px] rounded-md justify-center items-center gap-[7px] text-sm text-gray-600">
                                    <Eye className="text-gray-600 w-4 h-4" /> View All
                                </button>
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            {jobsData.length === 0 ? (
                                <p className="text-gray-500 text-sm font-semibold">
                                    Click on "Add Service" to create your first one.
                                </p>
                            ) : (
                                jobsData.slice(0, 2).map((job) => {
                                    return (
                                        <div
                                            key={job._id}
                                            className="p-5 border border-gray-200 shadow-lg rounded-md mt-5 flex flex-col gap-3 overflow-x-hidden bg-white"
                                        >

                                                <div className="flex gap-[20px] justify-between items-center ">
                                                    <h2 className="font-medium text-lg">{job.title}</h2>
                                                {profileData?.user?._id === user?.user?._id && 
                                                    <Edit className="text-blue-600 w-4 h-4 cursor-pointer" />
                                                }
                                                </div>


                                            <p className="text-gray-500 text-sm">{job.description}</p>
                                            <div className="flex gap-5 justify-start items-center">
                                                <div className="flex items-center">
                                                    <IndianRupee className="w-4 h-4 text-gray-500" />
                                                    <span className="text-green-600">{job.budget.toLocaleString('en-IN')}</span>
                                                </div>
                                                <span className="flex gap-1 justify-start items-center text-gray-500">
                                                    <Clock className="w-4 h-4 text-gray-500" />
                                                    {job.duration}
                                                </span>
                                            </div>
                                            <div className="flex gap-2 flex-wrap">
                                                <span className=" bg-blue-200 text-blue-800  p-1 rounded-full text-xs px-2 text-nowrap">
                                                    {job.category}
                                                </span>
                                                {job.requiredSkills.slice(0, 3).map((skill) => {
                                                    return (
                                                        <span
                                                            key={skill}
                                                            className="bg-gray-200 p-1 rounded-full text-xs text-gray-600 px-2 text-nowrap"
                                                        >
                                                            {skill}
                                                        </span>
                                                    );
                                                })}
                                                {job.requiredSkills.length > 3 && (
                                                    <span
                                                        className="bg-gray-200 p-1 rounded-full text-xs text-gray-600 px-2 text-nowrap"
                                                    >
                                                        +{job.requiredSkills.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                            {profileData?.user?._id !== user?.user?._id &&
                                                <div className="flex gap-4 pt-2 flex-wrap">
                                                    <button className="px-14 py-2 bg-blue-700 sm:w-fit w-full text-white text-lg font-light rounded-lg text-nowrap ">
                                                        Apply Now
                                                    </button>
                                                    <button className="px-4 py-2 border text-gray-500 rounded-lg sm:w-fit w-full">
                                                        {" "}
                                                        View Details
                                                    </button>
                                                </div>}

                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                    {/* rating */}
                    <RatingSection user={profileData} renderStars={renderStars} formatDate={formatDate} open={setShowRatingModal} setShowRatingModal={setShowRatingModal} />
                </div>
            </div>
        </div>
    );
}

export default Profile;