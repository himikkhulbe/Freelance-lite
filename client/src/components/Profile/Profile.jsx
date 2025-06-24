import{ useEffect, useState } from "react"; 
import { useAuth } from "../../contexts/AuthContext";
import { Star, Eye } from "lucide-react";
import ProfileMain from "./components/ProfileMain/ProfileMain.jsx";
import RatingSection from "./components/RatingSection/RatingSection.jsx";
import DetailsSection from "./components/DetailsSection/DetailsSection.jsx";
import Popup from "./components/Popup/RatingPopup.jsx";
import ProfileEditPopup from "./components/Popup/ProfileEditPopup.jsx";

function Profile() {
    const { user } = useAuth();
    console.log(user)
    const [showRatingModal, setShowRatingModal] = useState(false);
    const [showProfileEditModal, setShowProfileEditModal] = useState(false);
    const [showSocialModal, setShowSocialModal] = useState(false);


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
        if (!showRatingModal && !showProfileEditModal && !showSocialModal) {
            document.body.style.overflow = 'auto';
        }else{
            document.body.style.overflow = 'hidden';

        }
        return () => (document.body.style.overflow = 'auto');
    }, [showRatingModal, showProfileEditModal, showSocialModal]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">Loading...</p>
            </div>
        );
    }




    return (
        <div className="min-h-screen flex flex-col pt-[60px] items-center justify-start bg-gray-100 gap-[30px] pb-[50px]">
            {/* Profile Section */}
            {showRatingModal && <Popup renderStars={renderStars} formatDate={formatDate} user={user} close={setShowRatingModal} />        }
            {showProfileEditModal && <ProfileEditPopup user={user} close={setShowProfileEditModal} />}
            <ProfileMain renderStars={renderStars} user={user} loggedInUser={user} openEdit={setShowProfileEditModal}/>
            {/* bottom Section */}
            <div className="xl:w-[80%] w-[90%] min-h-[250px] flex lg:flex-row flex-col md:gap-[30px] gap-[20px]">
                {/* left side */}
                <DetailsSection user={user} loggedInUser={user} formatDate={formatDate} socialOpen={setShowSocialModal} profileOpen={setShowProfileEditModal} />
                {/* right side */}
                <div className="lg:w-[68%] w-full min-h-[120px] flex flex-col xl:gap-[30px] gap-[20px]">
                    {/* services or jobs */}
                    <div className="w-full min-h-[120px] p-[30px] border-[0.5px] border-slate-500 bg-slate-50 rounded-lg">
                        <div className="flex justify-between items-center grow">
                            {user?.user?.role === "freelancer" && <p className="text-black text-lg font-semibold">Services Offered</p>}
                            {user?.user?.role === "client" && <p className="text-black text-lg font-semibold">Jobs Offered</p>}
                            <div className="flex gap-[10px]">
                                <button className="bg-blue-600 flex px-[10px] h-[42px] py-[5px] rounded-md justify-center items-center gap-[7px] text-sm text-white">
                                    <span className=" text-2xl">+</span> Add Services
                                </button>
                                <button className="bg-gray-200 flex px-[10px] h-[42px] py-[5px] rounded-md justify-center items-center gap-[7px] text-sm text-gray-600">
                                    <Eye className="text-gray-600 w-4 h-4" /> View All
                                </button>
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            {1 ? <p className="text-gray-500 text-sm font-semibold">
                                Click on "Add Service" to create your first one.
                            </p> :
                                null}
                        </div>
                    </div>
                    {/* rating */}
                    <RatingSection user={user} renderStars={renderStars} formatDate={formatDate} open={setShowRatingModal} setShowRatingModal={setShowRatingModal}/>
                </div>
            </div>
        </div>
    );
}

export default Profile;