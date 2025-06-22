import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Star, Edit, Mail, Phone, Github, Linkedin, Globe, Twitter , Calendar} from "lucide-react";
import IconWithtext from "./components/IconWithtext/IconWithtext.jsx"

function Profile() {
    const { user } = useAuth();
    console.log(user);

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

    return (
        <div className="min-h-screen flex flex-col pt-[60px] items-center justify-start bg-gray-100 gap-[30px] pb-[50px]">
            {/* Profile Section */}
            <div className="xl:w-[80%] w-[90%] min-h-[250px] border-[0.5px] border-slate-500 bg-slate-50 rounded-lg flex md:flex-row flex-col justify-start md:gap-[30px] gap-[20px] md:items-end items-start pb-[30px] px-[30px] pt-[50px] relative">
                <div className="w-full h-[125px] bg-blue-600 absolute top-0 left-0 rounded-tl-lg rounded-tr-lg"></div>
                <div className="md:w-[150px] w-[120px] aspect-[1/1] bg-slate-300 rounded-full shadow-md relative z-20">
                    <img
                        className="w-full h-full object-cover rounded-full"
                        src={user?.user?.profilePicture}
                        alt={`${user?.user?.name} profile`}
                    />
                </div>
                <div className="flex md:flex-row flex-col justify-between md:items-center md:gap-[30px] gap-[20px] grow h-full">
                    <div>
                        <div className="flex justify-start items-center gap-[8px]">
                            <p className="text-black text-4xl font-bold">{user?.user?.name}</p>
                            <Edit className="text-blue-600 w-4 h-4 cursor-pointer" />
                        </div>
                        <p className="text-black text-md">{`@${user?.user?.username}`}</p>
                        <p className="text-lg font-semibold text-blue-600">
                            {user?.user?.role}
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-[7px]">
                        <div className="flex items-center">
                            {renderStars(user?.user?.averageRating)}
                        </div>
                        <p>{user?.user?.averageRating}.0</p>
                        <p className="text-gray-500">{`(5 reviews)`}</p>
                    </div>
                </div>
            </div>
            {/* bottom Section */}
            <div className="xl:w-[80%] w-[90%] min-h-[250px] flex lg:flex-row flex-col md:gap-[30px] gap-[20px]">
                {/* left side */}
                <div className="lg:w-[35%] w-full flex flex-col xl:gap-[30px] gap-[20px]">
                    {/* contact info */}
                    <div className="w-full min-h-[120px] p-[30px] border-[0.5px] border-slate-500 bg-slate-50 rounded-lg">
                        <div className="w-full flex justify-between items-center">
                            <p className="text-black text-xl font-semibold">
                                Contact Information
                            </p>
                            <Edit className="text-blue-600 w-4 h-4 cursor-pointer" />
                        </div>
                        <div className="mt-[20px]">
                            {user?.user?.contactInfo?.email && (
                                <IconWithtext Icon={Mail} text={user?.user?.contactInfo?.email} />

                            )}
                            {user?.user?.contactInfo?.phone && (
                                <IconWithtext Icon={Phone} text={user?.user?.contactInfo?.phone} />

                            )}
                        </div>
                    </div>
                    {/* Member since */}
                    <div className="w-full min-h-[120px] p-[30px] border-[0.5px] border-slate-500 bg-slate-50 rounded-lg">
                        <div>
                            <p className="text-black text-xl font-semibold">Member Since</p>
                        </div>
                        <div className="mt-[20px]">
                            <IconWithtext Icon={Calendar} text={formatDate(user?.user?.createdAt)} />

                        </div>
                    </div>
                    {/* Social Links */}
                    <div className="w-full min-h-[120px] p-[30px] border-[0.5px] border-slate-500 bg-slate-50 rounded-lg">
                        <div className="w-full flex justify-between items-center">
                            <p className="text-black text-xl font-semibold">Social Links</p>
                            <Edit className="text-blue-600 w-4 h-4 cursor-pointer" />
                        </div>
                        <div className="mt-[20px]">
                            {/* github render */}
                            {user?.user?.socialMedia?.Github && (
                                <IconWithtext Icon={Github} link={user?.user?.socialMedia?.Github} text="Github" />

                            )}
                            {/* linkedin render */}
                            {user?.user?.socialMedia?.Linkedin && (
                                <IconWithtext Icon={Linkedin} link={user?.user?.socialMedia?.Linkedin} text="Linkedin" />

                            )}
                            {/* Twitter render */}
                            {user?.user?.socialMedia?.Twitter && (
                                <IconWithtext Icon={Twitter} link={user?.user?.socialMedia?.Twitter} text="Twitter" />

                            )}
                            {/* portfolio render */}
                            {user?.user?.socialMedia?.Portfolio && (
                                <IconWithtext Icon={Globe} link={user?.user?.socialMedia?.Portfolio} text="Portfolio" />

                            )}
                        </div>
                    </div>
                </div>
                {/* right side */}
                <div className="lg:w-[65%] w-full min-h-[120px] border-[0.5px] border-slate-500 bg-slate-50 rounded-lg">

                </div>
            </div>
        </div>
    );
}

export default Profile;
