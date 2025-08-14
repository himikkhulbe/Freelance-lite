import React, { useState } from 'react';
import {
    User, DollarSign, Calendar, MessageSquare, CheckCircle, XCircle, Clock,
    Eye, Filter, Star, Phone, Mail, MapPin, Briefcase, AlertTriangle,
    Send, X, FileText, ExternalLink, Users, TrendingUp, Award, BookOpen
} from 'lucide-react';

const ClientProposals = () => {
    const [proposals, setProposals] = useState([
        {
            "_id": "689c21b62b48647b5d52892f",
            "freelancer": {
                "_id": "685e3a9a504cd6eabc858438",
                "name": "Md Alkama",
                "username": "admin",
                "email": "alkama@example.com",
                "phone": "+91 98765 43210",
                "location": "Mumbai, India",
                "profilePicture": "https://plus.unsplash.com/premium_photo-1689629870780-5d0e655383e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "rating": 4.8,
                "totalReviews": 156,
                "completedProjects": 89,
                "skills": ["React", "Node.js", "MongoDB", "E-commerce"],
                "experience": "5+ years"
            },
            "job": {
                "_id": "68985664c5a67e8e75e92783",
                "title": "E-commerce Website Development",
                "description": "Looking for a skilled web developer to build a responsive e-commerce website with product catalog, shopping cart, and payment integration.",
                "budget": 20000,
                "deadline": "2025-09-15"
            },
            "coverLetter": "I have extensive experience in e-commerce development with React, Node.js, and payment gateway integrations. I have successfully delivered 25+ e-commerce projects with features like inventory management, multi-payment gateways, and advanced analytics. I can deliver a fully responsive website within your timeline with modern UI/UX design.",
            "bidAmount": 14000,
            "deliveryTime": "25 days",
            "status": "pending",
            "submittedAt": "2025-08-13T05:25:10.651Z",
            "portfolio": [
                { title: "Fashion Store", url: "https://fashionstore.com", image: "https://via.placeholder.com/300x200" },
                { title: "Electronics Shop", url: "https://electroshop.com", image: "https://via.placeholder.com/300x200" }
            ]
        },
        {
            "_id": "689c22c52b48647b5d52896a",
            "freelancer": {
                "_id": "689990be7b0f0cd5dad2b677",
                "name": "Himik Khulbe",
                "username": "himikkhulbe",
                "email": "himik@example.com",
                "phone": "+91 87654 32109",
                "location": "Bangalore, India",
                "profilePicture": "",
                "rating": 4.6,
                "totalReviews": 89,
                "completedProjects": 67,
                "skills": ["React", "Vue.js", "PHP", "Laravel"],
                "experience": "4+ years"
            },
            "job": {
                "_id": "68985664c5a67e8e75e92783",
                "title": "E-commerce Website Development",
                "description": "Looking for a skilled web developer to build a responsive e-commerce website with product catalog, shopping cart, and payment integration.",
                "budget": 20000,
                "deadline": "2025-09-15"
            },
            "coverLetter": "I specialize in e-commerce solutions and have worked with various payment gateways. My approach focuses on user experience and conversion optimization. I can build a scalable platform that grows with your business needs.",
            "bidAmount": 12000,
            "deliveryTime": "30 days",
            "status": "accepted",
            "submittedAt": "2025-08-13T05:29:41.407Z",
            "acceptedAt": "2025-08-13T10:45:00.000Z",
            "portfolio": [
                { title: "Book Store", url: "https://bookstore.com", image: "https://via.placeholder.com/300x200" }
            ]
        },
        {
            "_id": "689c23d52b48647b5d52897b",
            "freelancer": {
                "_id": "689990be7b0f0cd5dad2b678",
                "name": "Sarah Johnson",
                "username": "sarah_dev",
                "email": "sarah@example.com",
                "phone": "+91 76543 21098",
                "location": "Delhi, India",
                "profilePicture": "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                "rating": 4.9,
                "totalReviews": 203,
                "completedProjects": 134,
                "skills": ["React", "Next.js", "Shopify", "WooCommerce"],
                "experience": "6+ years"
            },
            "job": {
                "_id": "68985664c5a67e8e75e92783",
                "title": "E-commerce Website Development",
                "description": "Looking for a skilled web developer to build a responsive e-commerce website with product catalog, shopping cart, and payment integration.",
                "budget": 20000,
                "deadline": "2025-09-15"
            },
            "coverLetter": "As a senior full-stack developer specializing in e-commerce, I bring 6+ years of experience building high-performance online stores. I focus on mobile-first design, SEO optimization, and conversion rate optimization.",
            "bidAmount": 18000,
            "deliveryTime": "20 days",
            "status": "processing",
            "submittedAt": "2025-08-12T08:15:30.000Z",
            "acceptedAt": "2025-08-12T14:20:00.000Z",
            "portfolio": [
                { title: "Luxury Watches", url: "https://luxurywatches.com", image: "https://via.placeholder.com/300x200" },
                { title: "Organic Foods", url: "https://organicfoods.com", image: "https://via.placeholder.com/300x200" },
                { title: "Tech Gadgets", url: "https://techgadgets.com", image: "https://via.placeholder.com/300x200" }
            ]
        },
        {
            "_id": "689c24e52b48647b5d52898c",
            "freelancer": {
                "_id": "689990be7b0f0cd5dad2b679",
                "name": "Rajesh Kumar",
                "username": "rajesh_tech",
                "email": "rajesh@example.com",
                "phone": "+91 65432 10987",
                "location": "Pune, India",
                "profilePicture": "",
                "rating": 4.3,
                "totalReviews": 45,
                "completedProjects": 23,
                "skills": ["HTML", "CSS", "JavaScript", "WordPress"],
                "experience": "2+ years"
            },
            "job": {
                "_id": "68985664c5a67e8e75e92783",
                "title": "E-commerce Website Development",
                "description": "Looking for a skilled web developer to build a responsive e-commerce website with product catalog, shopping cart, and payment integration.",
                "budget": 20000,
                "deadline": "2025-09-15"
            },
            "coverLetter": "I am a dedicated web developer with experience in creating responsive websites. I can build your e-commerce site using modern technologies and ensure it meets all your requirements.",
            "bidAmount": 8000,
            "deliveryTime": "35 days",
            "status": "rejected",
            "submittedAt": "2025-08-11T14:20:15.000Z",
            "rejectedAt": "2025-08-12T09:30:00.000Z",
            "rejectionReason": "Limited experience with e-commerce platforms and payment integrations.",
            "portfolio": [
                { title: "Business Website", url: "https://business.com", image: "https://via.placeholder.com/300x200" }
            ]
        }
    ]);

    const [filter, setFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'view', 'reject', 'job', 'freelancer'
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [sortBy, setSortBy] = useState('date'); // 'date', 'amount', 'rating'

    const statusOptions = ['all', 'pending', 'accepted', 'rejected', 'processing', 'completed'];

    const updateProposalStatus = (proposalId, newStatus, additionalData = {}) => {
        setProposals(prev =>
            prev.map(proposal =>
                proposal._id === proposalId
                    ? {
                        ...proposal,
                        status: newStatus,
                        [`${newStatus}At`]: new Date().toISOString(),
                        ...additionalData
                    }
                    : proposal
            )
        );
    };

    const filteredAndSortedProposals = proposals
        .filter(proposal => {
            if (filter === 'all') return true;
            return proposal.status === filter;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'amount':
                    return a.bidAmount - b.bidAmount;
                case 'rating':
                    return b.freelancer.rating - a.freelancer.rating;
                case 'date':
                default:
                    return new Date(b.submittedAt) - new Date(a.submittedAt);
            }
        });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'accepted': return 'bg-green-50 text-green-700 border-green-200';
            case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
            case 'processing': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock className="w-4 h-4" />;
            case 'accepted': return <CheckCircle className="w-4 h-4" />;
            case 'rejected': return <XCircle className="w-4 h-4" />;
            case 'processing': return <MessageSquare className="w-4 h-4" />;
            case 'completed': return <Star className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const openModal = (type, proposal) => {
        setModalType(type);
        setSelectedProposal(proposal);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalType('');
        setSelectedProposal(null);
        setRejectionReason('');
    };

    const handleAccept = (proposalId) => {
        updateProposalStatus(proposalId, 'accepted');
    };

    const handleReject = () => {
        updateProposalStatus(selectedProposal._id, 'rejected', { rejectionReason });
        closeModal();
    };

    const handleStartWork = (proposalId) => {
        updateProposalStatus(proposalId, 'processing');
    };

    const stats = {
        total: proposals.length,
        pending: proposals.filter(p => p.status === 'pending').length,
        accepted: proposals.filter(p => p.status === 'accepted').length,
        rejected: proposals.filter(p => p.status === 'rejected').length,
        processing: proposals.filter(p => p.status === 'processing').length,
        completed: proposals.filter(p => p.status === 'completed').length
    };

    const averageBid = proposals.reduce((sum, p) => sum + p.bidAmount, 0) / proposals.length || 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Proposal Management</h1>
                            <p className="text-gray-600 mt-1">Review and manage proposals for your project</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Average Bid</p>
                            <p className="text-2xl font-bold text-blue-600">₹{Math.round(averageBid).toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <div className="text-center">
                                <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">Total</p>
                                <p className="text-2xl font-bold text-blue-700 mt-1">{stats.total}</p>
                            </div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                            <div className="text-center">
                                <p className="text-xs text-yellow-600 font-medium uppercase tracking-wide">Pending</p>
                                <p className="text-2xl font-bold text-yellow-700 mt-1">{stats.pending}</p>
                            </div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                            <div className="text-center">
                                <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Accepted</p>
                                <p className="text-2xl font-bold text-green-700 mt-1">{stats.accepted}</p>
                            </div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                            <div className="text-center">
                                <p className="text-xs text-orange-600 font-medium uppercase tracking-wide">Processing</p>
                                <p className="text-2xl font-bold text-orange-700 mt-1">{stats.processing}</p>
                            </div>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                            <div className="text-center">
                                <p className="text-xs text-emerald-600 font-medium uppercase tracking-wide">Completed</p>
                                <p className="text-2xl font-bold text-emerald-700 mt-1">{stats.completed}</p>
                            </div>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                            <div className="text-center">
                                <p className="text-xs text-red-600 font-medium uppercase tracking-wide">Rejected</p>
                                <p className="text-2xl font-bold text-red-700 mt-1">{stats.rejected}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Sorting */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        {/* Filters */}
                        <div className="flex items-center flex-wrap gap-4">
                            <div className="flex items-center text-gray-700">
                                <Filter className="w-5 h-5 mr-2" />
                                <span className="font-medium">Filter:</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {statusOptions.map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilter(status)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === status
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-white text-gray-700 border border-gray-200 hover:bg-blue-50 hover:border-blue-200'
                                            }`}
                                    >
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                        {status !== 'all' && (
                                            <span className="ml-1">
                                                ({stats[status] || 0})
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sorting */}
                        <div className="flex items-center space-x-3">
                            <span className="text-gray-700 font-medium">Sort by:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="date">Date Submitted</option>
                                <option value="amount">Bid Amount</option>
                                <option value="rating">Freelancer Rating</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Job Details */}
                {proposals.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">{proposals[0].job.title}</h2>
                                <p className="text-gray-700 mb-4">{proposals[0].job.description}</p>
                                <div className="flex items-center space-x-6 text-sm text-gray-600">
                                    <span className="flex items-center">
                                        <DollarSign className="w-4 h-4 mr-1" />
                                        Budget: ₹{proposals[0].job.budget.toLocaleString()}
                                    </span>
                                    <span className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        Deadline: {formatDate(proposals[0].job.deadline)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Proposals List */}
                <div className="space-y-4">
                    {filteredAndSortedProposals.map((proposal) => (
                        <div key={proposal._id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-start space-x-4 flex-1">
                                        <div className="flex-shrink-0">
                                            {proposal.freelancer.profilePicture ? (
                                                <img
                                                    src={proposal.freelancer.profilePicture}
                                                    alt={proposal.freelancer.name}
                                                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-100">
                                                    <User className="w-8 h-8 text-gray-600" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-xl font-bold text-gray-900">{proposal.freelancer.name}</h3>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(proposal.status)}`}>
                                                    {getStatusIcon(proposal.status)}
                                                    <span className="ml-1">{proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}</span>
                                                </span>
                                            </div>
                                            <p className="text-gray-600 mb-2">@{proposal.freelancer.username} • {proposal.freelancer.location}</p>

                                            {/* Freelancer Stats */}
                                            <div className="flex items-center space-x-4 mb-3">
                                                <div className="flex items-center text-yellow-500">
                                                    <Star className="w-4 h-4 mr-1 fill-current" />
                                                    <span className="text-sm font-medium text-gray-700">{proposal.freelancer.rating}</span>
                                                    <span className="text-sm text-gray-500 ml-1">({proposal.freelancer.totalReviews})</span>
                                                </div>
                                                <div className="flex items-center text-gray-600 text-sm">
                                                    <Award className="w-4 h-4 mr-1" />
                                                    {proposal.freelancer.completedProjects} projects
                                                </div>
                                                <div className="flex items-center text-gray-600 text-sm">
                                                    <BookOpen className="w-4 h-4 mr-1" />
                                                    {proposal.freelancer.experience}
                                                </div>
                                            </div>

                                            {/* Skills */}
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {proposal.freelancer.skills.map((skill, index) => (
                                                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                                                <span className="flex items-center font-medium">
                                                    <DollarSign className="w-4 h-4 mr-1" />
                                                    <span className="text-lg font-bold text-blue-600">₹{proposal.bidAmount.toLocaleString()}</span>
                                                </span>
                                                <span className="flex items-center">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {proposal.deliveryTime}
                                                </span>
                                                <span className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    {formatDate(proposal.submittedAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Details (for accepted/processing proposals) */}
                                {(proposal.status === 'accepted' || proposal.status === 'processing') && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                        <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Freelancer Contact Details
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                            <div className="flex items-center text-green-700">
                                                <Mail className="w-4 h-4 mr-2" />
                                                {proposal.freelancer.email}
                                            </div>
                                            <div className="flex items-center text-green-700">
                                                <Phone className="w-4 h-4 mr-2" />
                                                {proposal.freelancer.phone}
                                            </div>
                                            <div className="flex items-center text-green-700">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                {proposal.freelancer.location}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Rejection Reason */}
                                {proposal.status === 'rejected' && proposal.rejectionReason && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                                        <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                                            <XCircle className="w-4 h-4 mr-2" />
                                            Rejection Reason
                                        </h4>
                                        <p className="text-red-700 text-sm">{proposal.rejectionReason}</p>
                                    </div>
                                )}

                                <div className="mb-4">
                                    <p className="text-gray-700 text-sm line-clamp-3">{proposal.coverLetter}</p>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => openModal('view', proposal)}
                                            className="inline-flex items-center px-4 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium"
                                        >
                                            <Eye className="w-4 h-4 mr-2" />
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => openModal('freelancer', proposal)}
                                            className="inline-flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                                        >
                                            <User className="w-4 h-4 mr-2" />
                                            View Profile
                                        </button>
                                    </div>

                                    <div className="flex space-x-2">
                                        {proposal.status === 'pending' && (
                                            <>
                                                <button
                                                    onClick={() => openModal('reject', proposal)}
                                                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                                                >
                                                    <XCircle className="w-4 h-4 mr-2" />
                                                    Reject
                                                </button>
                                                <button
                                                    onClick={() => handleAccept(proposal._id)}
                                                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                                                >
                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                    Accept
                                                </button>
                                            </>
                                        )}

                                        {proposal.status === 'accepted' && (
                                            <button
                                                onClick={() => handleStartWork(proposal._id)}
                                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                            >
                                                <MessageSquare className="w-4 h-4 mr-2" />
                                                Start Work
                                            </button>
                                        )}

                                        {proposal.status === 'processing' && (
                                            <span className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium">
                                                <TrendingUp className="w-4 h-4 mr-2" />
                                                In Progress
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredAndSortedProposals.length === 0 && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No proposals found</h3>
                        <p className="text-gray-600">
                            {filter === 'all'
                                ? "No proposals have been submitted yet."
                                : `No ${filter} proposals found.`
                            }
                        </p>
                    </div>
                )}

                {/* Modal */}
                {showModal && selectedProposal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Header */}
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-900">Proposal Details</h2>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                    >
                                        <span className="sr-only">Close</span>
                                        <XCircle className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-6">
                                {/* View Mode */}
                                {modalType === 'view' && (
                                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
                                        <p><strong>Cover Letter:</strong> {selectedProposal.coverLetter}</p>
                                        <p><strong>Bid Amount:</strong> ${selectedProposal.bidAmount}</p>
                                        <p><strong>Status:</strong> {selectedProposal.status}</p>
                                        <p><strong>Submitted On:</strong> {new Date(selectedProposal.createdAt).toLocaleDateString()}</p>
                                    </div>
                                )}

                                {/* Edit Mode */}
                                {modalType === 'edit' && (
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleEdit();
                                        }}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
                                            <textarea
                                                value={editForm.coverLetter}
                                                onChange={(e) =>
                                                    setEditForm({ ...editForm, coverLetter: e.target.value })
                                                }
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                                rows="4"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Bid Amount</label>
                                            <input
                                                type="number"
                                                value={editForm.bidAmount}
                                                onChange={(e) =>
                                                    setEditForm({ ...editForm, bidAmount: e.target.value })
                                                }
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="flex justify-end space-x-3">
                                            <button
                                                type="button"
                                                onClick={closeModal}
                                                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                )}



                        </div>
                    </div>
                )}

export default ClientProposals;