import React, { useState } from 'react';
import { Star, MapPin, Calendar, Clock, DollarSign, MessageSquare, CheckCircle, User, Mail, Phone, Github, Linkedin, Globe, Edit, Plus, X, Save, Eye } from 'lucide-react';

const UserProfile = () => {
    const [userData, setUserData] = useState({
        user: {
            socialMedia: { Linkedin: "", Github: "", Twitter: "", Portfolio: "" },
            contactInfo: { phone: "", email: "" },
            location: "",
            isVerified: false,
            _id: "68553bb96f6cb78c100cb03e",
            name: "admin",
            username: "admin",
            email: "admin@gmail.com",
            role: "freelancer",
            averageRating: 5,
            skills: [],
            Languages: [],
            profilePicture: "",
            createdAt: "2025-06-20T10:45:13.288Z",
            updatedAt: "2025-06-20T10:45:13.288Z",
            __v: 0
        },
        services: [
            {
                _id: "685565990647b17380dde19a",
                user: "68553bb96f6cb78c100cb03e",
                title: "I will build your MERN website",
                description: "Professional full-stack web app in React, Node, MongoDB.",
                category: "Web Development",
                subcategory: "Full Stack",
                tags: ["React", "Node", "MongoDB"],
                deliveryTime: 5,
                revisions: 2,
                price: 250,
                images: [],
                faqs: [{ question: "Will it be mobile-friendly?", answer: "Yes, 100% responsive.", _id: "1" }],
                requirements: ["Content", "Hosting info"],
                isActive: true,
                rating: 4.8,
                reviewCount: 12,
                createdAt: "2025-06-20T13:43:53.030Z",
                updatedAt: "2025-06-20T13:43:53.030Z",
                __v: 0
            },
            {
                _id: "685565e20647b17380dde19e",
                user: "68553bb96f6cb78c100cb03e",
                title: "I will create a responsive React application",
                description: "Modern React app with hooks, context API, and best practices.",
                category: "Web Development",
                subcategory: "Frontend",
                tags: ["React", "JavaScript", "CSS"],
                deliveryTime: 3,
                revisions: 3,
                price: 180,
                images: [],
                faqs: [],
                requirements: ["Design files", "Requirements document"],
                isActive: true,
                rating: 4.9,
                reviewCount: 8,
                createdAt: "2025-06-20T13:45:06.801Z",
                updatedAt: "2025-06-20T13:45:06.801Z",
                __v: 0
            },
            {
                _id: "685570a7c3539063d1170b5a",
                user: "68553bb96f6cb78c100cb03e",
                title: "I will develop Node.js backend API",
                description: "RESTful API with authentication, database integration, and documentation.",
                category: "Web Development",
                subcategory: "Backend",
                tags: ["Node.js", "Express", "MongoDB", "JWT"],
                deliveryTime: 7,
                revisions: 2,
                price: 300,
                images: [],
                faqs: [
                    { question: "Do you provide API documentation?", answer: "Yes, complete Swagger documentation included.", _id: "2" },
                    { question: "What databases do you work with?", answer: "MongoDB, PostgreSQL, MySQL", _id: "3" }
                ],
                requirements: ["API specifications", "Database schema"],
                isActive: true,
                rating: 5.0,
                reviewCount: 15,
                createdAt: "2025-06-20T14:31:03.635Z",
                updatedAt: "2025-06-20T14:31:03.635Z",
                __v: 0
            }
        ],
        ratings: [
            {
                _id: "68557103c3539063d1170b75",
                raterId: "68556abd64c4b90cbdd176ef",
                raterName: "John Smith",
                raterAvatar: "",
                ratedId: "68553bb96f6cb78c100cb03e",
                rating: 5,
                comment: "Excellent work! Very professional and delivered on time. Highly recommended for MERN stack projects.",
                serviceTitle: "MERN Website Development",
                createdAt: "2025-06-20T14:32:35.727Z",
                updatedAt: "2025-06-20T14:32:35.727Z",
                __v: 0
            },
            {
                _id: "68557103c3539063d1170b76",
                raterId: "68556abd64c4b90cbdd176f0",
                raterName: "Sarah Johnson",
                raterAvatar: "",
                ratedId: "68553bb96f6cb78c100cb03e",
                rating: 4,
                comment: "Great developer with good communication skills. The project was completed as requested.",
                serviceTitle: "React Application",
                createdAt: "2025-06-19T10:15:22.543Z",
                updatedAt: "2025-06-19T10:15:22.543Z",
                __v: 0
            },
            {
                _id: "68557103c3539063d1170b77",
                raterId: "68556abd64c4b90cbdd176f1",
                raterName: "Mike Wilson",
                raterAvatar: "",
                ratedId: "68553bb96f6cb78c100cb03e",
                rating: 5,
                comment: "Outstanding API development. Clean code, well documented, and excellent performance.",
                serviceTitle: "Node.js Backend API",
                createdAt: "2025-06-18T16:45:10.123Z",
                updatedAt: "2025-06-18T16:45:10.123Z",
                __v: 0
            },
            {
                _id: "68557103c3539063d1170b78",
                raterId: "68556abd64c4b90cbdd176f2",
                raterName: "Emily Davis",
                raterAvatar: "",
                ratedId: "68553bb96f6cb78c100cb03e",
                rating: 5,
                comment: "Very satisfied with the work quality. Fast delivery and great attention to detail.",
                serviceTitle: "MERN Website Development",
                createdAt: "2025-06-17T12:30:45.789Z",
                updatedAt: "2025-06-17T12:30:45.789Z",
                __v: 0
            },
            {
                _id: "68557103c3539063d1170b79",
                raterId: "68556abd64c4b90cbdd176f3",
                raterName: "David Brown",
                raterAvatar: "",
                ratedId: "68553bb96f6cb78c100cb03e",
                rating: 4,
                comment: "Good work overall. Minor revisions were needed but the final result was satisfactory.",
                serviceTitle: "React Application",
                createdAt: "2025-06-16T08:20:15.456Z",
                updatedAt: "2025-06-16T08:20:15.456Z",
                __v: 0
            }
        ]
    });

    const [modals, setModals] = useState({
        editProfile: false,
        editContact: false,
        editSocial: false,
        addService: false,
        editService: false,
        viewAllServices: false,
        viewAllRatings: false
    });

    const [editingService, setEditingService] = useState(null);
    const [formData, setFormData] = useState({});

    const openModal = (modalName, data = {}) => {
        setModals({ ...modals, [modalName]: true });
        setFormData(data);
    };

    const closeModal = (modalName) => {
        setModals({ ...modals, [modalName]: false });
        setFormData({});
        setEditingService(null);
    };

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleNestedInputChange = (parent, field, value) => {
        setFormData({
            ...formData,
            [parent]: { ...formData[parent], [field]: value }
        });
    };

    const saveProfileChanges = () => {
        setUserData({
            ...userData,
            user: { ...userData.user, ...formData }
        });
        closeModal('editProfile');
    };

    const saveContactChanges = () => {
        setUserData({
            ...userData,
            user: {
                ...userData.user,
                contactInfo: formData.contactInfo,
                location: formData.location
            }
        });
        closeModal('editContact');
    };

    const saveSocialChanges = () => {
        setUserData({
            ...userData,
            user: {
                ...userData.user,
                socialMedia: formData.socialMedia
            }
        });
        closeModal('editSocial');
    };

    const saveService = () => {
        if (editingService) {
            const updatedServices = userData.services.map(service =>
                service._id === editingService._id ? { ...service, ...formData } : service
            );
            setUserData({ ...userData, services: updatedServices });
            closeModal('editService');
        } else {
            const newService = {
                ...formData,
                _id: Date.now().toString(),
                user: userData.user._id,
                isActive: true,
                rating: 0,
                reviewCount: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                __v: 0
            };
            setUserData({ ...userData, services: [...userData.services, newService] });
            closeModal('addService');
        }
    };

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

    const Modal = ({ isOpen, onClose, title, children }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="p-6">
                        {children}
                    </div>
                </div>
            </div>
        );
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
                                        <div className="flex items-center gap-2">
                                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize">
                                                {userData.user.name}
                                            </h1>
                                            <button
                                                onClick={() => openModal('editProfile', userData.user)}
                                                className="text-blue-600 hover:text-blue-700 transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </div>
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
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                                <button
                                    onClick={() => openModal('editContact', {
                                        contactInfo: userData.user.contactInfo,
                                        location: userData.user.location
                                    })}
                                    className="text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                            </div>
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
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Social Links</h3>
                                <button
                                    onClick={() => openModal('editSocial', { socialMedia: userData.user.socialMedia })}
                                    className="text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                            </div>
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
                                {!userData.user.socialMedia.Github && !userData.user.socialMedia.Linkedin && !userData.user.socialMedia.Portfolio && (
                                    <p className="text-gray-500 text-sm">No social links added</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Services */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Services Offered</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => openModal('addService', {
                                            title: '',
                                            description: '',
                                            category: '',
                                            subcategory: '',
                                            tags: [],
                                            deliveryTime: 1,
                                            revisions: 1,
                                            price: 0,
                                            faqs: [],
                                            requirements: []
                                        })}
                                        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Service
                                    </button>
                                    <button
                                        onClick={() => openModal('viewAllServices')}
                                        className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        View All
                                    </button>
                                </div>
                            </div>
                            {/* service cards */}
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {userData.services.slice(0, 2).map((service) => (
                                    <div key={service._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex justify-between items-start mb-3">
                                            <h4 className="text-lg font-medium text-gray-900 flex-1 mr-2">{service.title}</h4>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center text-blue-600 font-semibold">
                                                    <DollarSign className="w-4 h-4" />
                                                    <span>{service.price}</span>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setEditingService(service);
                                                        openModal('editService', service);
                                                    }}
                                                    className="text-blue-600 hover:text-blue-700 transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 mb-3 text-sm">{service.description}</p>

                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                                {service.category}
                                            </span>
                                            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                                                {service.subcategory}
                                            </span>
                                            {service.tags.slice(0, 3).map((tag, index) => (
                                                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <div className="flex items-center">
                                                <Clock className="w-3 h-3 mr-1" />
                                                <span>{service.deliveryTime} days</span>
                                            </div>
                                            <div className="flex items-center">
                                                {renderStars(service.rating)}
                                                <span className="ml-1">({service.reviewCount})</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Reviews</h3>
                                <button
                                    onClick={() => openModal('viewAllRatings')}
                                    className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                                >
                                    <Eye className="w-4 h-4 mr-2" />
                                    View All
                                </button>
                            </div>

                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {userData.ratings.slice(0, 3).map((rating) => (
                                    <div key={rating._id} className="border-b border-gray-100 pb-4 last:border-b-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                                    {rating.raterAvatar ? (
                                                        <img src={rating.raterAvatar} alt={rating.raterName} className="w-full h-full rounded-full object-cover" />
                                                    ) : (
                                                        <User className="w-4 h-4 text-gray-500" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 text-sm">{rating.raterName}</p>
                                                    <div className="flex items-center">
                                                        {renderStars(rating.rating)}
                                                        <span className="ml-2 text-sm text-gray-600">{rating.rating}.0</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(rating.createdAt)}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 text-sm mb-1">{rating.comment}</p>
                                        <p className="text-xs text-blue-600">Service: {rating.serviceTitle}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <Modal
                isOpen={modals.editProfile}
                onClose={() => closeModal('editProfile')}
                title="Edit Profile"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            value={formData.name || ''}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            value={formData.username || ''}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            value={formData.role || ''}
                            onChange={(e) => handleInputChange('role', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="freelancer">Freelancer</option>
                            <option value="client">Client</option>
                            <option value="agency">Agency</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => closeModal('editProfile')}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={saveProfileChanges}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Edit Contact Modal */}
            <Modal
                isOpen={modals.editContact}
                onClose={() => closeModal('editContact')}
                title="Edit Contact Information"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                            type="tel"
                            value={formData.contactInfo?.phone || ''}
                            onChange={(e) => handleNestedInputChange('contactInfo', 'phone', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                            type="text"
                            value={formData.location || ''}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => closeModal('editContact')}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={saveContactChanges}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Edit Social Media Modal */}
            <Modal
                isOpen={modals.editSocial}
                onClose={() => closeModal('editSocial')}
                title="Edit Social Media Links"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                        <input
                            type="url"
                            value={formData.socialMedia?.Github || ''}
                            onChange={(e) => handleNestedInputChange('socialMedia', 'Github', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://github.com/username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                        <input
                            type="url"
                            value={formData.socialMedia?.Linkedin || ''}
                            onChange={(e) => handleNestedInputChange('socialMedia', 'Linkedin', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://linkedin.com/in/username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio</label>
                        <input
                            type="url"
                            value={formData.socialMedia?.Portfolio || ''}
                            onChange={(e) => handleNestedInputChange('socialMedia', 'Portfolio', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://yourportfolio.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                        <input
                            type="url"
                            value={formData.socialMedia?.Twitter || ''}
                            onChange={(e) => handleNestedInputChange('socialMedia', 'Twitter', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://twitter.com/username"
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => closeModal('editSocial')}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={saveSocialChanges}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Add/Edit Service Modal */}
            <Modal
                isOpen={modals.addService || modals.editService}
                onClose={() => {
                    closeModal('addService');
                    closeModal('editService');
                }}
                title={editingService ? "Edit Service" : "Add New Service"}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
                        <input
                            type="text"
                            value={formData.title || ''}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="I will..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            value={formData.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Describe your service..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                value={formData.category || ''}
                                onChange={(e) => handleInputChange('category', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Category</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Mobile Development">Mobile Development</option>
                                <option value="Design">Design</option>
                                <option value="Writing">Writing</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                            <select
                                value={formData.subcategory || ''}
                                onChange={(e) => handleInputChange('subcategory', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Subcategory</option>
                                <option value="Full Stack">Full Stack</option>
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="UI/UX">UI/UX</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                        <input
                            type="text"
                            value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
                            onChange={(e) => handleInputChange('tags', e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="React, Node.js, MongoDB"
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                            <input
                                type="number"
                                value={formData.price || ''}
                                onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery (days)</label>
                            <input
                                type="number"
                                value={formData.deliveryTime || ''}
                                onChange={(e) => handleInputChange('deliveryTime', parseInt(e.target.value) || 1)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="1"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Revisions</label>
                            <input
                                type="number"
                                value={formData.revisions || ''}
                                onChange={(e) => handleInputChange('revisions', parseInt(e.target.value) || 1)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="1"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Requirements (comma separated)</label>
                        <input
                            type="text"
                            value={Array.isArray(formData.requirements) ? formData.requirements.join(', ') : ''}
                            onChange={(e) => handleInputChange('requirements', e.target.value.split(',').map(req => req.trim()).filter(req => req))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Design files, Content, Hosting info"
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => {
                                closeModal('addService');
                                closeModal('editService');
                            }}
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={saveService}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {editingService ? 'Update Service' : 'Add Service'}
                        </button>
                    </div>
                </div>
            </Modal>

            {/* View All Services Modal */}
            <Modal
                isOpen={modals.viewAllServices}
                onClose={() => closeModal('viewAllServices')}
                title="All Services"
            >
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {userData.services.map((service) => (
                        <div key={service._id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-gray-900">{service.title}</h4>
                                <div className="flex items-center gap-2">
                                    <span className="text-blue-600 font-semibold">${service.price}</span>
                                    <button
                                        onClick={() => {
                                            setEditingService(service);
                                            closeModal('viewAllServices');
                                            openModal('editService', service);
                                        }}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>{service.deliveryTime} days delivery</span>
                                <div className="flex items-center">
                                    {renderStars(service.rating)}
                                    <span className="ml-1">({service.reviewCount})</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>

            {/* View All Ratings Modal */}
            <Modal
                isOpen={modals.viewAllRatings}
                onClose={() => closeModal('viewAllRatings')}
                title="All Reviews"
            >
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {userData.ratings.map((rating) => (
                        <div key={rating._id} className="border-b border-gray-100 pb-4 last:border-b-0">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                        {rating.raterAvatar ? (
                                            <img src={rating.raterAvatar} alt={rating.raterName} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            <User className="w-5 h-5 text-gray-500" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{rating.raterName}</p>
                                        <div className="flex items-center">
                                            {renderStars(rating.rating)}
                                            <span className="ml-2 text-sm text-gray-600">{rating.rating}.0</span>
                                        </div>
                                    </div>
                                </div>
                                <span className="text-sm text-gray-500">
                                    {formatDate(rating.createdAt)}
                                </span>
                            </div>
                            <p className="text-gray-700 mb-2">{rating.comment}</p>
                            <p className="text-sm text-blue-600">Service: {rating.serviceTitle}</p>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default UserProfile;