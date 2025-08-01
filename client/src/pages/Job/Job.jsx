import React, { useState, useEffect } from 'react';
import {
    Briefcase,
    Calendar,
    DollarSign,
    Clock,
    Tag,
    FileText,
    User,
    MapPin,
    Star,
    Send,
    CheckCircle,
    AlertTriangle,
    X,
    Eye,
    ThumbsUp,
    ThumbsDown,
    MessageSquare
} from 'lucide-react';

// Toast Component
const Toast = ({ message, type, isVisible, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out">
            <div className={`flex items-center space-x-3 px-6 py-4 rounded-lg shadow-lg border ${type === 'success'
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                {type === 'success' ? (
                    <CheckCircle className="text-green-600" size={20} />
                ) : (
                    <AlertTriangle className="text-red-600" size={20} />
                )}
                <span className="font-medium">{message}</span>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 ml-4"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

// Proposal Modal Component
const ProposalModal = ({ isOpen, onClose, jobId, jobTitle, onSubmitSuccess }) => {
    const [proposalData, setProposalData] = useState({
        coverLetter: '',
        bidAmount: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProposalData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        if (!proposalData.coverLetter.trim() || !proposalData.bidAmount) {
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`http://localhost:8000/api/freelancer/proposal/${jobId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    coverLetter: proposalData.coverLetter,
                    bidAmount: parseInt(proposalData.bidAmount)
                })
            });

            if (response.ok) {
                onSubmitSuccess('Proposal submitted successfully!');
                setProposalData({ coverLetter: '', bidAmount: '' });
                onClose();
            } else {
                const errorData = await response.json();
                onSubmitSuccess(errorData.message || 'Failed to submit proposal', 'error');
            }
        } catch (error) {
            onSubmitSuccess('Network error. Please try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-md" onClick={onClose} />

            <div className="relative bg-white rounded-xl shadow-2xl border border-gray-100 p-8 mx-4 max-w-2xl w-full">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-all duration-200"
                >
                    <X size={20} />
                </button>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Submit Proposal</h2>
                    <p className="text-gray-600">for "{jobTitle}"</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cover Letter *
                        </label>
                        <textarea
                            name="coverLetter"
                            value={proposalData.coverLetter}
                            onChange={handleInputChange}
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                            placeholder="Explain why you're the perfect fit for this project..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bid Amount (₹) *
                        </label>
                        <input
                            type="number"
                            name="bidAmount"
                            value={proposalData.bidAmount}
                            onChange={handleInputChange}
                            min="1"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Enter your bid amount"
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4 mt-8">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !proposalData.coverLetter.trim() || !proposalData.bidAmount}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                <span>Submitting...</span>
                            </>
                        ) : (
                            <>
                                <Send size={16} />
                                <span>Submit Proposal</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Proposal Card Component
const ProposalCard = ({ proposal, isClient, onUpdateStatus }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'accepted': return <CheckCircle size={16} />;
            case 'rejected': return <X size={16} />;
            default: return <Clock size={16} />;
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                        <User className="text-blue-600" size={20} />
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900">{proposal.freelancer?.name || 'Freelancer'}</h4>
                        <p className="text-sm text-gray-500">
                            Submitted {new Date(proposal.submittedAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center space-x-1 ${getStatusColor(proposal.status)}`}>
                        {getStatusIcon(proposal.status)}
                        <span className="capitalize">{proposal.status}</span>
                    </span>
                </div>
            </div>

            <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">{proposal.coverLetter}</p>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <DollarSign size={16} className="text-green-600" />
                    <span className="font-semibold text-green-600">
                        ₹{proposal.bidAmount.toLocaleString('en-IN')}
                    </span>
                </div>

                {isClient && proposal.status === 'pending' && (
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onUpdateStatus(proposal._id, 'accepted')}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
                        >
                            <ThumbsUp size={14} />
                            <span>Accept</span>
                        </button>
                        <button
                            onClick={() => onUpdateStatus(proposal._id, 'rejected')}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-1"
                        >
                            <ThumbsDown size={14} />
                            <span>Reject</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const Job = () => {

    // State variables
    const [job, setJob] = useState(null); // Job data
    const [loading, setLoading] = useState(true); // Loading state
    const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
    const [toast, setToast] = useState({ isVisible: false, message: '', type: '' }); // Toast state
    const [userType, setUserType] = useState('freelancer'); // 'client' or 'freelancer'
    const [currentUserId, setCurrentUserId] = useState('user123'); // Mock user ID

    // Mock job data for demo
    const mockJob = {
        _id: "685ee1ffe3461591786e99a9",
        client: {
            _id: "client123",
            name: "Tech Solutions Inc.",
            email: "client@techsolutions.com"
        },
        title: "Build a Landing Page for SaaS Product",
        description: "Need a responsive landing page built with React and Tailwind. Should include hero section, features, pricing, and contact form. The landing page should be modern, fast-loading, and optimized for conversions. Experience with SaaS products preferred.",
        requiredSkills: ["React", "Tailwind CSS", "JavaScript"],
        budget: 25000,
        duration: "2 weeks",
        deadline: "2025-07-10T00:00:00.000Z",
        category: "Web Development",
        isOpen: true,
        proposals: [
            {
                _id: "prop1",
                freelancer: {
                    _id: "freelancer1",
                    name: "John Doe",
                    email: "john@example.com"
                },
                coverLetter: "I have 5+ years of experience building modern React applications with Tailwind CSS. I've created similar SaaS landing pages that achieved 15%+ conversion rates. I can deliver this project within your timeline with pixel-perfect design and optimal performance.",
                bidAmount: 22000,
                status: "pending",
                submittedAt: "2025-06-28T10:30:00.000Z"
            },
            {
                _id: "prop2",
                freelancer: {
                    _id: "freelancer2",
                    name: "Sarah Smith",
                    email: "sarah@example.com"
                },
                coverLetter: "Experienced frontend developer specializing in React and modern CSS frameworks. I've built 20+ landing pages for SaaS companies with focus on user experience and conversion optimization. My approach includes thorough testing and performance optimization.",
                bidAmount: 24000,
                status: "accepted",
                submittedAt: "2025-06-27T14:15:00.000Z"
            }
        ],
        createdAt: "2025-06-27T18:25:03.375Z",
        updatedAt: "2025-06-27T18:25:03.375Z"
    };

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setJob(mockJob);
            setLoading(false);
        }, 1000);
    }, []);

    const showToast = (message, type = 'success') => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => {
            setToast({ isVisible: false, message: '', type: '' });
        }, 4000);
    };

    const handleProposalSubmit = (message, type = 'success') => {
        showToast(message, type);
        // Refresh job data here
    };

    const handleUpdateProposalStatus = async (proposalId, status) => {
        try {
            // Mock API call
            showToast(`Proposal ${status} successfully!`);

            // Update local state
            setJob(prev => ({
                ...prev,
                proposals: prev.proposals.map(p =>
                    p._id === proposalId ? { ...p, status } : p
                )
            }));
        } catch (error) {
            showToast('Failed to update proposal status', 'error');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Job Not Found</h2>
                    <p className="text-gray-600">The job you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    const isClient = userType === 'client' && currentUserId === job.client._id;

    return (
        <>
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() => setToast({ isVisible: false, message: '', type: '' })}
            />

            <ProposalModal
                isOpen={isProposalModalOpen}
                onClose={() => setIsProposalModalOpen(false)}
                jobId={job._id}
                jobTitle={job.title}
                onSubmitSuccess={handleProposalSubmit}
            />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">

                    {/* Job Header */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-8">
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="bg-blue-600 p-3 rounded-full">
                                            <Briefcase className="text-white" size={24} />
                                        </div>
                                        <div>
                                            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                                            <p className="text-gray-600">Posted by {job.client.name}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                                        <div className="flex items-center space-x-2">
                                            <Calendar size={16} className="text-blue-600" />
                                            <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Clock size={16} className="text-blue-600" />
                                            <span>Duration: {job.duration}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <DollarSign size={16} className="text-green-600" />
                                            <span className="font-semibold text-green-600">₹{job.budget.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Tag size={16} className="text-blue-600" />
                                            <span>{job.category}</span>
                                        </div>
                                    </div>
                                </div>

                                {!isClient && job.isOpen && (
                                    <button
                                        onClick={() => setIsProposalModalOpen(true)}
                                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium flex items-center space-x-2 shadow-lg"
                                    >
                                        <Send size={16} />
                                        <span>Submit Proposal</span>
                                    </button>
                                )}
                            </div>

                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Description</h3>
                                <p className="text-gray-700 leading-relaxed mb-6">{job.description}</p>

                                <div className="mb-6">
                                    <h4 className="text-md font-medium text-gray-900 mb-3">Required Skills</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {job.requiredSkills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                                        <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                                        <span>•</span>
                                        <span>{job.proposals.length} Proposals</span>
                                        <span>•</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${job.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                            {job.isOpen ? 'Open' : 'Closed'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Proposals Section */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    Proposals ({job.proposals.length})
                                </h2>
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <MessageSquare size={16} />
                                    <span>All proposals for this job</span>
                                </div>
                            </div>

                            {job.proposals.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                        <MessageSquare className="text-gray-400" size={24} />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals yet</h3>
                                    <p className="text-gray-500">Be the first to submit a proposal for this job.</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {job.proposals.map((proposal) => (
                                        <ProposalCard
                                            key={proposal._id}
                                            proposal={proposal}
                                            isClient={isClient}
                                            onUpdateStatus={handleUpdateProposalStatus}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Demo Controls */}
                    <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Demo Controls</h3>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setUserType('freelancer')}
                                className={`px-4 py-2 rounded-lg transition-colors ${userType === 'freelancer'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                View as Freelancer
                            </button>
                            <button
                                onClick={() => setUserType('client')}
                                className={`px-4 py-2 rounded-lg transition-colors ${userType === 'client'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                View as Client
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Job;