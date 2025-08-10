import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Star, Eye, IndianRupee, Clock, Edit } from "lucide-react";
import { useParams } from "react-router-dom";
import ProfileMain from "./components/ProfileMain/ProfileMain.jsx";
import RatingSection from "./components/RatingSection/RatingSection.jsx";
import DetailsSection from "./components/DetailsSection/DetailsSection.jsx";
import RatingPopup from "./components/Popup/RatingPopup.jsx";
import ProfileEditPopup from "./components/Popup/ProfileEditPopup.jsx";
import JobsPopup from "./components/Popup/JobsPopup.jsx";
import JobsCard from "../Common/JobCard.jsx";
import ServiceCard from "../Common/ServiceCard.jsx";
import { useNavigate } from "react-router-dom";
import formatDate from "../../Utils/formatDate.js";
import Loader from "../Common/Loading.jsx";

function Profile() {
    const { user } = useAuth();
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [showProfileEditModal, setShowProfileEditModal] = useState(false);
    const [showJobsPopup, setShowJobsPopup] = useState(false);
    const [showServicePopup, setShowServicePopup] = useState(false);
    const { id } = useParams();
    const [profileData, setProfileData] = useState(null);
    const navigate = useNavigate();

    const addService = () => {
        console.log("Add service clicked");
        navigate(`/addservice`);
    }
    const addJob = () => {
        console.log("Add service clicked");
        navigate(`/addJob`);
    }

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
    useEffect(() => {
        if (!showRatingModal && !showProfileEditModal && !showJobsPopup && !showServicePopup) {
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.overflow = 'hidden';
        }
        return () => (document.body.style.overflow = 'auto');
    }, [showRatingModal, showProfileEditModal, showJobsPopup, showServicePopup]);
    if (!profileData) {
        return (
            <Loader />
        );
    }
    return (
        <div className="min-h-screen flex flex-col pt-[85px] items-center justify-start bg-gray-100 gap-[30px] pb-[50px]">
            {/* Profile Section */}
            {showRatingModal && <RatingPopup user={profileData} close={setShowRatingModal} />}
            {showProfileEditModal && <ProfileEditPopup loggedInUser={profileData} close={setShowProfileEditModal} />}
            {showJobsPopup && <JobsPopup Component={JobsCard} loggedInUser={user} data={profileData?.jobs} close={setShowJobsPopup} heading="Jobs Offered" />}
            {showServicePopup && <JobsPopup Component={ServiceCard} loggedInUser={user} data={profileData?.services} close={setShowServicePopup} heading="Services Offered" />}
            <ProfileMain user={profileData} loggedInUser={user} openEdit={setShowProfileEditModal} />
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
                                {user?.user?._id === profileData?.user?._id && profileData?.user?.role === "freelancer" &&
                                    <button onClick={addService} className="bg-blue-600 flex px-[10px] h-[42px] py-[5px] rounded-md justify-center items-center gap-[7px] text-sm text-white">
                                        <span className=" text-2xl">+</span> Add Services
                                    </button>
                                }
                                {user?.user?._id === profileData?.user?._id && profileData?.user?.role === "client" &&
                                    <button onClick={addJob} className="bg-blue-600 flex px-[10px] h-[42px] py-[5px] rounded-md justify-center items-center gap-[7px] text-sm text-white">
                                        <span className=" text-2xl">+</span> Add Job
                                    </button>
                                }
                                {profileData?.jobs?.length > 2 &&
                                    <button onClick={() => setShowJobsPopup(true)} className="bg-gray-200 flex px-[10px] h-[42px] py-[5px] rounded-md justify-center items-center gap-[7px] text-sm text-gray-600">
                                        <Eye className="text-gray-600 w-4 h-4" /> View All
                                    </button>
                                }
                                {profileData?.services?.length > 2 &&
                                    <button onClick={() => setShowServicePopup(true)} className="bg-gray-200 flex px-[10px] h-[42px] py-[5px] rounded-md justify-center items-center gap-[7px] text-sm text-gray-600">
                                        <Eye className="text-gray-600 w-4 h-4" /> View All
                                    </button>
                                }
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            {profileData?.user?.role === "freelancer"
                                ?
                                (
                                    profileData?.services?.length === 0 ? (
                                        <p className="text-gray-500 text-sm font-semibold mb-5">No jobs found</p>
                                    ) : (
                                        profileData?.services?.slice(0, 2).map((item) => (
                                            <ServiceCard
                                                key={item._id}
                                                data={item}
                                                loggedInUser={user?.user}
                                            />
                                        ))
                                    ))
                                :
                                null
                            }
                            {
                                profileData?.user?.role === "client"
                                    ?
                                    (profileData?.jobs?.length === 0 ? (
                                        <p className="text-gray-500 text-sm font-semibold mb-5">No jobs found</p>
                                    ) : (
                                        profileData?.jobs?.slice(0, 2).map((item) => (
                                            <JobsCard
                                                key={item._id}
                                                data={item}
                                                loggedInUser={user?.user}
                                            />
                                        ))
                                    ))
                                    :
                                    null
                            }

                        </div>
                    </div>
                    {/* rating */}
                    <RatingSection user={profileData} open={setShowRatingModal} setShowRatingModal={setShowRatingModal} />
                </div>
            </div>
        </div>
    );
}
export default Profile;