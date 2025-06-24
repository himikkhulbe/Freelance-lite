import React, { useState } from 'react';
import { User, Mail, Phone, Github, Linkedin, Twitter, Globe, Camera ,X } from 'lucide-react';


function ProfileEditPopup({ loggedInUser, close }) {
    const [formData, setFormData] = useState({
        name: loggedInUser?.user?.name || "",
        profilePicture: loggedInUser?.user?.profilePicture || "",
        contactInfo: {
            email: loggedInUser?.user?.contactInfo?.email || "",
            phone: loggedInUser?.user?.contactInfo?.phone || ""
        },
        socialMedia: {
            Github: loggedInUser?.user?.socialMedia?.Github || "",
            Linkedin: loggedInUser?.user?.socialMedia?.Linkedin || "",
            Twitter: loggedInUser?.user?.socialMedia?.Twitter || "",
            Portfolio: loggedInUser?.user?.socialMedia?.Portfolio || ""
        }
    }
        );

    const [previewImage, setPreviewImage] = useState(loggedInUser?.user?.profilePicture);


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Split the name by '.' to handle nested fields like 'contactInfo.email'
        const keys = name.split(".");

        if (keys.length === 1) {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        } else {
            setFormData((prev) => {
                const updated = { ...prev };
                let curr = updated;

                for (let i = 0; i < keys.length - 1; i++) {
                    curr[keys[i]] = { ...curr[keys[i]] };
                    curr = curr[keys[i]];
                }

                curr[keys[keys.length - 1]] = value;
                return updated;
            });
        }
    };
      

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target.result);
                setFormData(prev => ({
                    ...prev,
                    profilePicture: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Submitting form data:", formData);
            const res = await fetch("http://localhost:8000/api/user/profile/update", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include", // very important for cookie-based auth
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (res.ok) {
                alert("Profile updated successfully");
                console.log("Updated user:", result.user);
            } else {
                alert(result.message || "Update failed");
            }
        } catch (error) {
            console.error("Update failed:", error);
            alert("Something went wrong");
        }
      };

    return (
        <div className='fixed inset-0 bg-black/30 backdrop-blur-sm top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-full w-full flex md:items-center items-start justify-center z-[100]'>
            <div className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-[90%] w-[100%] max-w-[800px] md:h-[80%] h-full bg-white md:rounded-lg shadow-lg p-[20px] z-50 '>
                <div className="h-[50px] mb-[20px] flex justify-between items-center grow">
                    <p className="text-black text-lg font-semibold">Edit Profile</p>
                    <button onClick={() => close(false)} className="text-gray-600 hover:text-gray-800 transition-colors">
                        <X className="text-gray-600 w-4 h-4" />
                    </button>
                </div>
                <div className="w-full h-[calc(100%_-_70px)] px-[30px] border-[0.5px] border-slate-500 bg-slate-50 rounded-lg overflow-auto">
                    <div className="p-8 space-y-6">
                        {/* Profile Picture */}
                        <div className="text-center">
                            <div className="relative inline-block">
                                <div className="w-32 h-32 rounded-full bg-blue-100 border-4 border-blue-200 overflow-hidden mx-auto mb-4">
                                    {previewImage ? (
                                        <img
                                            src={previewImage}
                                            alt="Profile preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <User className="w-16 h-16 text-blue-400" />
                                        </div>
                                    )}
                                </div>
                                <label className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors shadow-lg">
                                    <Camera className="w-4 h-4" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            <p className="text-sm text-gray-600">Click the camera icon to upload a photo</p>
                        </div>

                        {/* Personal Information */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <User className="w-4 h-4 inline mr-2 text-blue-600" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Mail className="w-4 h-4 inline mr-2 text-blue-600" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="contactInfo.email"
                                    value={formData.contactInfo.email}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="your.email@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Phone className="w-4 h-4 inline mr-2 text-blue-600" />
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="contactInfo.phone"
                                    value={formData.contactInfo.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Globe className="w-4 h-4 inline mr-2 text-blue-600" />
                                    Portfolio Website
                                </label>
                                <input
                                    type="url"
                                    name="socialMedia.Portfolio"
                                    value={formData.socialMedia.Portfolio}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="https://yourportfolio.com"
                                />
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-800 border-b border-blue-100 pb-2">
                                Social Media Links
                            </h3>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <Github className="w-4 h-4 inline mr-2 text-blue-600" />
                                        GitHub Profile
                                    </label>
                                    <input
                                        type="url"
                                        name="socialMedia.Github"
                                        value={formData.socialMedia.Github}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="https://github.com/username"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <Linkedin className="w-4 h-4 inline mr-2 text-blue-600" />
                                        LinkedIn Profile
                                    </label>
                                    <input
                                        type="url"
                                        name="socialMedia.Linkedin"
                                        value={formData.socialMedia.Linkedin}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="https://linkedin.com/in/username"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        <Twitter className="w-4 h-4 inline mr-2 text-blue-600" />
                                        Twitter Profile
                                    </label>
                                    <input
                                        type="url"
                                        name="socialMedia.Twitter"
                                        value={formData.socialMedia.Twitter}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="https://twitter.com/username"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button
                                onClick={handleSubmit}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105 shadow-lg"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileEditPopup