import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ServiceCard from '../../components/Common/ServiceCard';
import { useAuth } from '../../contexts/AuthContext';
import formatDate from '../../Utils/formatDate';
import RenderStars from "../../components/Common/RenderStars";
import {
    Clock,
    MessageCircle,
    Heart,
    Share2,
    MapPin,
    CheckCircle,
    HelpCircle,
    ArrowLeft,
    Loader,
    RefreshCw
} from 'lucide-react';

const Service = () => {
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [showOrderModal, setShowOrderModal] = useState(false);
    const { id } = useParams();
    const { user } = useAuth();


console.log("User in Service:", user?.user);

const handleMail = ()=>{
    window.location.href = `mailto:${service?.service?.user.email}?subject=${service?.service?.title}&body=Service Id = ${service?.service?._id}`;
}

    const fetchService = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://freelance-lite.onrender.com/api/freelancer/service/${id}`, {
                method: "GET",
                credentials: "include"
            });
            if (response.ok) {
                const data = await response.json();
                setService(data);
                console.log('Service fetched from API:', data);
            } else {
                throw new Error('API not available');
            }
        } catch (error) {
            console.error('Error fetching service:', error);
            setError('Failed to load service');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchService();
    }, [id]);

    const OrderModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <h3 className="text-lg font-semibold mb-4">Order This Service</h3>
                <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">{service?.service?.title}</h4>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Delivery: {service?.service?.deliveryTime} days</span>
                            <span>Revisions: {service?.service?.revisions}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-lg font-bold">₹{service?.service?.price}</span>
                        </div>
                    </div>

                    <textarea
                        placeholder="Describe your requirements (optional)"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex space-x-3">
                        <button
                            onClick={() => setShowOrderModal(false)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                setShowOrderModal(false);
                                alert('Order placed successfully! (Demo)');
                            }}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading service details...</p>
                </div>
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error || 'Service not found'}</p>
                    <button
                        onClick={fetchService}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button onClick={() => window.history.back()} className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Services
                    </button>

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        {/* Service Info */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                        {service?.service?.title}
                                    </h1>

                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="flex items-center">
                                            {RenderStars(service?.service?.rating)}
                                            <span className="ml-2 text-sm font-medium text-gray-900">
                                                {service?.service?.rating}
                                            </span>
                                            <span className="text-sm text-gray-500 ml-1">
                                                ({service?.service?.reviewCount} reviews)
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                                                {service?.service?.category}
                                            </span>
                                            {service?.service?.subcategory && (
                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                                    {service?.service?.subcategory}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Freelancer Info */}
                                    <div className="flex items-center space-x-3 mb-6">
                                        <img
                                            src={service?.service?.user.profilePicture}
                                            alt={service?.service?.user.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="font-medium text-gray-900">{service?.service?.user.name}</h3>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <MapPin className="w-3 h-3 mr-1" />
                                                {service?.service?.user.location}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center space-x-2">
                                    <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                                        <Heart className="w-5 h-5 text-gray-500" />
                                    </button>
                                    <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50">
                                        <Share2 className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Order Card */}
                        <div className="lg:w-80">
                            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
                                <div className="text-center mb-6">
                                    <div className="text-3xl font-bold text-gray-900 mb-2">
                                        ₹{service?.service?.price}
                                    </div>
                                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {service?.service?.deliveryTime} days delivery
                                        </div>
                                        <div className="flex items-center">
                                            <RefreshCw className="w-4 h-4 mr-1" />
                                            {service?.service?.revisions} revisions
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <button
                                        onClick={() => setShowOrderModal(true)}
                                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 font-medium"
                                    >
                                        Continue (₹{service?.service?.price})
                                    </button>
                                    <button onClick={()=>{
                                        handleMail();
                                    }} className="w-full border border-gray-300 py-3 px-4 rounded-md hover:bg-gray-50 flex items-center justify-center">
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Contact Seller
                                    </button>
                                </div>

                                {/* Service Features */}
                                <div className="border-t pt-4">
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center text-gray-600">
                                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                            {service?.service?.deliveryTime} days delivery
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                            {service?.service?.revisions} revisions included
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column */}
                    <div className="flex-1">
                        {/* Service Image */}
                        <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg h-64 sm:h-80 flex items-center justify-center mb-8">
                            <div className="text-center">
                                <div className="text-blue-600 text-2xl font-bold mb-2">
                                    {service?.service?.category}
                                </div>
                                <div className="text-blue-500 text-lg">
                                    Professional Service Preview
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200 mb-6">
                            <nav className="-mb-px flex space-x-8">
                                {[
                                    { id: 'overview', label: 'Overview' },
                                    { id: 'reviews', label: `Reviews (${service?.service?.reviewCount})` },
                                    { id: 'faq', label: 'FAQ' },
                                    { id: 'seller', label: 'About Seller' }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="bg-white rounded-lg border p-6">
                            {activeTab === 'overview' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">About This Service</h3>
                                        <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                                            {service?.service?.description}
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div>
                                        <h4 className="font-medium mb-3">Skills & Tags</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {service?.service?.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Requirements */}
                                    <div>
                                        <h4 className="font-medium mb-3">What I Need From You</h4>
                                        <ul className="space-y-2">
                                            {service?.service?.requirements.map((req, index) => (
                                                <li key={index} className="flex items-start">
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0" />
                                                    <span className="text-gray-700">{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'reviews' && (
                                <div className="space-y-6">
                                    {service?.service?.reviews.map(review => (
                                        <div key={review._id} className="border-b border-gray-100 pb-6 last:border-b-0">
                                            <div className="flex items-start space-x-4">
                                                <img
                                                    src={review.user.avatar}
                                                    alt={review.user.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="font-medium text-gray-900">{review.user.name}</h4>
                                                        <span className="text-sm text-gray-500">
                                                            {formatDate(review.createdAt)}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center mb-2">
                                                        {RenderStars(review.rating)}
                                                    </div>
                                                    <p className="text-gray-700">{review.comment}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'faq' && (
                                <div className="space-y-4">
                                    {service?.service?.faqs.map((faq, index) => (
                                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                                            <div className="flex items-start">
                                                <HelpCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                                                    <p className="text-gray-700">{faq.answer}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'seller' && (
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <img
                                            src={service?.service?.user.profilePicture}
                                            alt={service?.service?.user.name}
                                            className="w-20 h-20 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold mb-2">{service?.service?.user.name}</h3>
                                            <div className="flex items-center mb-2">
                                                {RenderStars(service?.service?.user.averageRating)}{
                                                <span className="ml-2 text-sm text-gray-800">
                                                    {service?.service?.user.averageRating.toFixed(1)}
                                                </span>
                                                }
                                                <span className="ml-2 text-sm text-gray-600">
                                                    ({service?.service?.user.totalOrders || 0} orders completed)
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500">From:</span>
                                                    <div className="font-medium">{service?.service?.user.location}</div>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Member since:</span>
                                                    <div className="font-medium">{formatDate(service?.service?.user.createdAt)}</div>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Avg. response time:</span>
                                                    <div className="font-medium">{service?.service?.user.responseTime || "10hr"}</div>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Languages:</span>
                                                    <div className="font-medium">{service?.service?.user.Languages.join(', ')}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button onClick={()=>{
                                        handleMail();
                                    }} className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center">
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Contact {service?.service?.user.name}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Related Services */}
                    <div className="lg:w-[400px]">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="font-semibold mb-4">More from {service?.service?.user.name}</h3>
                            <div className="space-y-4">
                                {/* Mock related services */}
                                {service?.services?.map(data => (
                                    <ServiceCard
                                        key={data._id}
                                        data={data}
                                        loggedInUser={user?.user}
                                        size={true}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Modal */}
            {showOrderModal && <OrderModal />}
        </div>
    );
};

export default Service;