import React from 'react';
import { useAuth } from "../contexts/AuthContext.jsx";

import { Star, MapPin, Calendar, Clock, DollarSign, MessageSquare, CheckCircle, User, Mail, Phone, Github, Linkedin, Globe } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();
    console.log(user);
    const userData = user;
   

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
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
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 h-32 rounded-t-lg"></div>
                    <div className="px-6 pb-6">
                        <div className="flex flex-col md:flex-row items-start md:items-end -mt-16 md:-mt-12">
                            <div className="relative mb-4 md:mb-0">
                                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                                    {userData.user.profilePicture ? (
                                        <img
                                            src={userData.user.profilePicture}
                                            alt={userData.user.name}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <User className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
                                    )}
                                </div>
                                {userData.user.isVerified && (
                                    <CheckCircle className="absolute -bottom-1 -right-1 w-6 h-6 text-blue-600 bg-white rounded-full" />
                                )}
                            </div>

                            <div className="md:ml-6 flex-1">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize">
                                            {userData.user.name}
                                        </h1>
                                        <p className="text-gray-600 capitalize">@{userData.user.username}</p>
                                        <p className="text-blue-600 font-medium capitalize mt-1">{userData.user.role}</p>
                                    </div>

                                    <div className="flex items-center mt-4 md:mt-0">
                                        <div className="flex items-center mr-4">
                                            {renderStars(userData.user.averageRating)}
                                            <span className="ml-2 text-sm font-medium text-gray-700">
                                                {userData.user.averageRating.toFixed(1)}
                                            </span>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            ({userData.ratings.length} review{userData.ratings.length !== 1 ? 's' : ''})
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Contact Information */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 text-blue-600 mr-3" />
                                    <span className="text-sm text-gray-700">{userData.user.email}</span>
                                </div>
                                {userData.user.contactInfo.phone && (
                                    <div className="flex items-center">
                                        <Phone className="w-4 h-4 text-blue-600 mr-3" />
                                        <span className="text-sm text-gray-700">{userData.user.contactInfo.phone}</span>
                                    </div>
                                )}
                                {userData.user.location && (
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 text-blue-600 mr-3" />
                                        <span className="text-sm text-gray-700">{userData.user.location}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Member Since */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Since</h3>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 text-blue-600 mr-3" />
                                <span className="text-sm text-gray-700">{formatDate(userData.user.createdAt)}</span>
                            </div>
                        </div>

                        {/* Social Media */}
                        {(userData.user.socialMedia.Github || userData.user.socialMedia.Linkedin || userData.user.socialMedia.Portfolio) && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
                                <div className="space-y-3">
                                    {userData.user.socialMedia.Github && (
                                        <a href={userData.user.socialMedia.Github} className="flex items-center text-blue-600 hover:text-blue-700">
                                            <Github className="w-4 h-4 mr-3" />
                                            <span className="text-sm">GitHub</span>
                                        </a>
                                    )}
                                    {userData.user.socialMedia.Linkedin && (
                                        <a href={userData.user.socialMedia.Linkedin} className="flex items-center text-blue-600 hover:text-blue-700">
                                            <Linkedin className="w-4 h-4 mr-3" />
                                            <span className="text-sm">LinkedIn</span>
                                        </a>
                                    )}
                                    {userData.user.socialMedia.Portfolio && (
                                        <a href={userData.user.socialMedia.Portfolio} className="flex items-center text-blue-600 hover:text-blue-700">
                                            <Globe className="w-4 h-4 mr-3" />
                                            <span className="text-sm">Portfolio</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Services */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Services Offered</h3>
                            <div className="grid gap-6">
                                {userData.services.map((service) => (
                                    <div key={service._id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-3">
                                            <h4 className="text-lg font-medium text-gray-900">{service.title}</h4>
                                            <div className="flex items-center text-blue-600 font-semibold">
                                                <DollarSign className="w-4 h-4" />
                                                <span>{service.price}</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 mb-4">{service.description}</p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                                {service.category}
                                            </span>
                                            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                                                {service.subcategory}
                                            </span>
                                            {service.tags.map((tag, index) => (
                                                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <Clock className="w-4 h-4 mr-1" />
                                                <span>{service.deliveryTime} days delivery</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span>{service.revisions} revision{service.revisions !== 1 ? 's' : ''}</span>
                                            </div>
                                        </div>

                                        {service.faqs.length > 0 && (
                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <h5 className="font-medium text-gray-900 mb-2">FAQ</h5>
                                                {service.faqs.map((faq) => (
                                                    <div key={faq._id} className="mb-2">
                                                        <p className="text-sm font-medium text-gray-700">{faq.question}</p>
                                                        <p className="text-sm text-gray-600">{faq.answer}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Reviews</h3>
                            <div className="space-y-4">
                                {userData.ratings.map((rating) => (
                                    <div key={rating._id} className="border-b border-gray-100 pb-4 last:border-b-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center">
                                                {renderStars(rating.rating)}
                                                <span className="ml-2 text-sm font-medium text-gray-700">
                                                    {rating.rating}
                                                </span>
                                            </div>
                                            <span className="text-sm text-gray-500">
                                                {formatDate(rating.createdAt)}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 text-sm">{rating.comment}</p>
                                    </div>
                                ))}
                                {userData.ratings.length === 0 && (
                                    <p className="text-gray-500 text-center py-8">No reviews yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;