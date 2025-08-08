import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import formatDate from '../../Utils/formatDate';
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
    DollarSign,
    Calendar,
    Users,
    FileText,
    Send
} from 'lucide-react';
import JobCard from "../../components/Common/JobCard.jsx";

const Job = () => {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [showProposalModal, setShowProposalModal] = useState(false);
    const [proposalData, setProposalData] = useState({
        coverLetter: '',
        bidAmount: 0
    });
    const { id } = useParams();
    const { user } = useAuth();

    console.log("User in Job:", user?.user);

    const handleMail = () => {
        window.location.href = `mailto:${job?.job?.client?.email}?subject=${job?.job?.title}&body=Job Id = ${job?.job?._id}`;
    }
    const fetchJob = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://freelance-lite.onrender.com/api/client/job/${id}`, {
                method: "GET",
                credentials: "include"
            });
            if (response.ok) {
                const data = await response.json();
                setJob(data);
                console.log('Job fetched from API:', data);
            } else {
                throw new Error('API not available');
            }
        } catch (error) {
            console.error('Error fetching job:', error);
            setError('Failed to load job');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJob();
    }, [id]);

    const handleProposalSubmit = async () => {
        try {
            const response = await fetch(`https://freelance-lite.onrender.com/api/job/${id}/proposal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(proposalData)
            });

            if (response.ok) {
                setShowProposalModal(false);
                setProposalData({ coverLetter: '', bidAmount: '' });
                alert('Proposal submitted successfully!');
                fetchJob(); // Refresh job data
            } else {
                throw new Error('Failed to submit proposal');
            }
        } catch (error) {
            console.error('Error submitting proposal:', error);
            alert('Failed to submit proposal');
        }
    };

    const ProposalModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Submit Proposal</h3>
                <div className="space-y-4">
                    <div className="border rounded-lg p-4 bg-gray-50">
                        <h4 className="font-medium mb-2">{job?.job?.title}</h4>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Budget: ₹{job?.job?.budget}</span>
                            <span>Duration: {job?.job?.duration}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Bid Amount (₹)
                        </label>
                        <input
                            type="number"
                            value={proposalData.bidAmount}
                            onChange={(e) => setProposalData(prev => ({
                                ...prev,
                                bidAmount: e.target.value
                            }))}
                            placeholder="Enter your bid amount"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cover Letter
                        </label>
                        <textarea
                            value={proposalData.coverLetter}
                            onChange={(e) =>
                                setProposalData((prev) => ({
                                    ...prev,
                                    coverLetter: e.target.value,
                                }))
                            }
                            placeholder="Describe why you're the best fit for this job..."
                            rows={5}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={() => setShowProposalModal(false)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleProposalSubmit}
                            disabled={!proposalData.coverLetter || !proposalData.bidAmount}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Submit Proposal
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
                    <p className="text-gray-600">Loading job details...</p>
                </div>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error || 'Job not found'}</p>
                    <button
                        onClick={fetchJob}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Check if user has already submitted a proposal
    const hasSubmittedProposal = job?.job?.proposals?.some(
        proposal => proposal.freelancer._id === user?.user?._id
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button onClick={() => window.history.back()} className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Jobs
                    </button>

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        {/* Job Info */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                        {job?.job?.title}
                                    </h1>

                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="flex items-center space-x-2">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                                                {job?.job?.category}
                                            </span>
                                            {job?.job?.isOpen ? (
                                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                                                    Open
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                                                    Closed
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center text-sm text-gray-500">
                                            <Users className="w-4 h-4 mr-1" />
                                            {job?.job?.proposals?.length || 0} proposals
                                        </div>
                                    </div>

                                    {/* Client Info */}
                                    <div className="flex items-center space-x-3 mb-6">
                                        <img
                                            src={job?.job?.client?.profilePicture || '/default-avatar.png'}
                                            alt={job?.job?.client?.name}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="font-medium text-gray-900">{job?.job?.client?.name}</h3>
                                            <div className="flex items-center text-sm text-gray-500">
                                                <MapPin className="w-3 h-3 mr-1" />
                                                {job?.job?.client?.location || 'Location not specified'}
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

                        {/* Proposal Card */}
                        <div className="lg:w-80">
                            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
                                <div className="text-center mb-6">
                                    <div className="text-3xl font-bold text-gray-900 mb-2">
                                        ₹{job?.job?.budget}
                                    </div>
                                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {job?.job?.duration}
                                        </div>
                                        {job?.job?.deadline && (
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {formatDate(job?.job?.deadline)}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    {job?.job?.isOpen && !hasSubmittedProposal ? (
                                        <button
                                            onClick={() => setShowProposalModal(true)}
                                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 font-medium flex items-center justify-center"
                                        >
                                            <Send className="w-4 h-4 mr-2" />
                                            Submit Proposal
                                        </button>
                                    ) : hasSubmittedProposal ? (
                                        <button
                                            disabled
                                            className="w-full bg-gray-400 text-white py-3 px-4 rounded-md font-medium cursor-not-allowed"
                                        >
                                            Proposal Submitted
                                        </button>
                                    ) : (
                                        <button
                                            disabled
                                            className="w-full bg-gray-400 text-white py-3 px-4 rounded-md font-medium cursor-not-allowed"
                                        >
                                            Job Closed
                                        </button>
                                    )}

                                    <button onClick={() => {
                                        handleMail();
                                    }} className="w-full border border-gray-300 py-3 px-4 rounded-md hover:bg-gray-50 flex items-center justify-center">
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Contact Client
                                    </button>
                                </div>

                                {/* Job Features */}
                                <div className="border-t pt-4">
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center text-gray-600">
                                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                            Budget: ₹{job?.job?.budget}
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                            Duration: {job?.job?.duration}
                                        </div>
                                        <div className="flex items-center text-gray-600">
                                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                            {job?.job?.proposals?.length || 0} proposals received
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
                        {/* Job Preview */}
                        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg h-64 sm:h-80 flex items-center justify-center mb-8">
                            <div className="text-center">
                                <div className="text-green-600 text-2xl font-bold mb-2">
                                    {job?.job?.category}
                                </div>
                                <div className="text-green-500 text-lg">
                                    Job Opportunity
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="border-b border-gray-200 mb-6">
                            <nav className="-mb-px flex space-x-8">
                                {[
                                    { id: 'overview', label: 'Overview' },
                                    { id: 'proposals', label: `Proposals (${job?.job?.proposals?.length || 0})` },
                                    { id: 'client', label: 'About Client' }
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
                                        <h3 className="text-lg font-semibold mb-4">Job Description</h3>
                                        <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                                            {job?.job?.description}
                                        </div>
                                    </div>

                                    {/* Required Skills */}
                                    <div>
                                        <h4 className="font-medium mb-3">Required Skills</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {job?.job?.requiredSkills?.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Job Details */}
                                    <div>
                                        <h4 className="font-medium mb-3">Project Details</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center">
                                                <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                                                <span className="text-gray-600">Budget:</span>
                                                <span className="ml-2 font-medium">₹{job?.job?.budget}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                                                <span className="text-gray-600">Duration:</span>
                                                <span className="ml-2 font-medium">{job?.job?.duration}</span>
                                            </div>
                                            {job?.job?.deadline && (
                                                <div className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                                                    <span className="text-gray-600">Deadline:</span>
                                                    <span className="ml-2 font-medium">{formatDate(job?.job?.deadline)}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center">
                                                <FileText className="w-4 h-4 mr-2 text-gray-500" />
                                                <span className="text-gray-600">Category:</span>
                                                <span className="ml-2 font-medium">{job?.job?.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'proposals' && (
                                <div className="space-y-6">
                                    {job?.job?.proposals?.length > 0 ? (
                                        job.job.proposals.map(proposal => (
                                            <div key={proposal._id} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex items-start space-x-4">
                                                    <img
                                                        src={proposal.freelancer?.profilePicture || '/default-avatar.png'}
                                                        alt={proposal.freelancer?.name}
                                                        className="w-12 h-12 rounded-full object-cover"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h4 className="font-medium text-gray-900">
                                                                {proposal.freelancer?.name}
                                                            </h4>
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-lg font-bold text-green-600">
                                                                    ₹{proposal.bidAmount}
                                                                </span>
                                                                <span className={`px-2 py-1 text-xs rounded-full ${proposal.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                    proposal.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                                        'bg-red-100 text-red-800'
                                                                    }`}>
                                                                    {proposal.status}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="text-sm text-gray-500 mb-2">
                                                            Submitted on {formatDate(proposal.submittedAt)}
                                                        </div>
                                                        <p className="text-gray-700">{proposal.coverLetter}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8">
                                            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                            <p className="text-gray-500">No proposals submitted yet</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === 'client' && (
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <img
                                            src={job?.job?.client?.profilePicture || '/default-avatar.png'}
                                            alt={job?.job?.client?.name}
                                            className="w-20 h-20 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold mb-2">{job?.job?.client?.name}</h3>
                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <span className="text-gray-500">From:</span>
                                                    <div className="font-medium">{job?.job?.client?.location || 'Location not specified'}</div>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Member since:</span>
                                                    <div className="font-medium">{formatDate(job?.job?.client?.createdAt)}</div>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Jobs posted:</span>
                                                    <div className="font-medium">{job?.job?.client?.totalJobsPosted || 0}</div>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Jobs completed:</span>
                                                    <div className="font-medium">{job?.job?.client?.totalJobsCompleted || 0}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button onClick={() => {
                                        handleMail();
                                    }}
                                        className="w-full sm:w-auto px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center">
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Contact {job?.job?.client?.name}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Related Jobs */}
                    <div className="lg:w-[400px]">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="font-semibold mb-4">Similar Jobs</h3>
                            <div className="space-y-4">
                                {/* Mock related jobs - you can replace with actual data */}
                                {
                                    job?.jobs?.length > 0 ?
                                        job?.jobs.map(relatedJob => (
                                            <JobCard
                                                key={relatedJob._id}
                                                data={relatedJob}
                                                loggedInUser={user?.user}
                                                size={true}
                                            />
                                        )) : (
                                            <p className="text-gray-500">No similar jobs found</p>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Proposal Modal */}
            {showProposalModal && <ProposalModal />}
        </div>
    );
};

export default Job;