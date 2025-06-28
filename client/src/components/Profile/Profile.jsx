import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Star, Eye, IndianRupee, Clock, Edit } from "lucide-react";
import { useParams } from "react-router-dom";
import ProfileMain from "./components/ProfileMain/ProfileMain.jsx";
import RatingSection from "./components/RatingSection/RatingSection.jsx";
import DetailsSection from "./components/DetailsSection/DetailsSection.jsx";
import RatingPopup from "./components/Popup/RatingPopup.jsx";
import ProfileEditPopup from "./components/Popup/ProfileEditPopup.jsx";
import ServiceOrJobsPopup from "./components/Popup/JobsPopup.jsx";
import ServiceOrJobsCard from "./components/JobsCard/JobsCard.jsx";

function Profile() {
    const { user } = useAuth();
    console.log(user)
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [showProfileEditModal, setShowProfileEditModal] = useState(false);
    const [showServiceOrJobsPopup, setShowServiceOrJobsPopup] = useState(false);
    const { id } = useParams();
    const [profileData, setProfileData] = useState(null);


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
            {showServiceOrJobsPopup && <ServiceOrJobsPopup loggedInUser={user} user={profileData} close={setShowServiceOrJobsPopup} />}
            <ProfileMain renderStars={renderStars} user={profileData} loggedInUser={user} openEdit={setShowProfileEditModal} />
            {/* bottom Section */}
            <div className="xl:w-[80%] w-[90%] min-h-[250px] flex lg:flex-row flex-col md:gap-[30px] gap-[20px]">
                {/* left side */}
                <DetailsSection user={profileData} loggedInUser={user} formatDate={formatDate} profileOpen={setShowProfileEditModal} />
                {/* right side */}
                <div className="lg:w-[68%] w-full min-h-[120px] flex flex-col xl:gap-[30px] gap-[20px]">
                    {/* services or jobs */}
                    <div className="w-full min-h-[120px] px-5 pt-5 border-[0.5px] border-slate-500 bg-slate-50 rounded-lg">
                        <div className="flex justify-between items-center grow">
                            {profileData?.user?.role === "freelancer" && <p className="text-black text-lg font-semibold">Services Offered</p>}
                            {profileData?.user?.role === "client" && <p className="text-black text-lg font-semibold">Jobs Offered</p>}
                            <div className="flex gap-[10px]">
                                {user?.user?._id === profileData?.user?._id &&
                                    <button className="bg-blue-600 flex px-[10px] h-[42px] py-[5px] rounded-md justify-center items-center gap-[7px] text-sm text-white">
                                        <span className=" text-2xl">+</span> Add Services
                                    </button>
                                }

                                {profileData?.jobs?.length > 2 &&
                                    <button onClick={() => setShowServiceOrJobsPopup(true)} className="bg-gray-200 flex px-[10px] h-[42px] py-[5px] rounded-md justify-center items-center gap-[7px] text-sm text-gray-600">
                                        <Eye className="text-gray-600 w-4 h-4" /> View All
                                    </button>
                                }
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            {profileData?.user?.role === "freelancer"
                                ?
                                (profileData?.services?.length === 0 ? (
                                    <p className="text-gray-500 text-sm font-semibold mb-5">No services found</p>
                                ) : null
                                )
                                :
                                null
                            }
                            {
                                profileData?.user?.role === "client"
                                    ?
                                    (profileData?.jobs?.length === 0 ? (
                                        <p className="text-gray-500 text-sm font-semibold mb-5">No jobs found</p>
                                    ) : (
                                        profileData?.jobs?.slice(0, 2).map((job) => (
                                            <ServiceOrJobsCard
                                                key={job._id}
                                                job={job}
                                                user={profileData}
                                                loggedInUser={user}
                                            />
                                        ))
                                    ))
                                    :
                                    null
                            }

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