import React, { useState, useEffect } from 'react';
import {
    User, DollarSign, Calendar, MessageSquare, CheckCircle, XCircle, Clock,
    Eye, Filter, Edit3, Trash2, Phone, Mail, MapPin, Star, Briefcase,
    AlertTriangle, Send, X, Save, FileText, ExternalLink
} from 'lucide-react';

const MyProposals = () => {
    const [proposals, setProposals] = useState([]);

    const [filter, setFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'view', 'edit', 'cancel', 'job'
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editForm, setEditForm] = useState({
        coverLetter: '',
        bidAmount: 0
    });
    const [cancelReason, setCancelReason] = useState('');

    const statusOptions = ['all', 'pending', 'accepted', 'cancelled', 'rejected', 'processing', 'completed'];

    const updateProposalStatus = (proposalId, newStatus) => {
        setProposals(prev =>
            prev.map(proposal =>
                proposal._id === proposalId
                    ? { ...proposal, status: newStatus, updatedAt: new Date().toISOString() }
                    : proposal
            )
        );
    };

    const filteredProposals = proposals.filter(proposal => {
        if (filter === 'all') return true;
        return proposal.status === filter;
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
            case 'cancelled': return 'bg-gray-50 text-gray-700 border-gray-200';
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
            case 'cancelled': return <X className="w-4 h-4" />;
            case 'processing': return <MessageSquare className="w-4 h-4" />;
            case 'completed': return <Star className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const openModal = (type, proposal) => {
        setModalType(type);
        setSelectedProposal(proposal);
        if (type === 'edit') {
            setEditForm({
                coverLetter: proposal.coverLetter,
                bidAmount: proposal.bidAmount
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalType('');
        setSelectedProposal(null);
        setCancelReason('');
        setEditForm({ coverLetter: '', bidAmount: 0 });
    };

    const fetchMyProposals = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://freelance-lite.onrender.com/api/client/myproposals`, {
                method: "GET",
                credentials: "include"
            });
            if (response.ok) {
                const data = await response.json();
                setProposals(data);
                console.log('Job fetched from API:', data);
            } else {
                throw new Error('API not available');
            }
        } catch (error) {
            console.error('Error fetching job:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMyProposals();
    },[filter])

const handleEdit = async() => {
    try{
        const response = await fetch(`https://freelance-lite.onrender.com/api/client/editproposal/${selectedProposal._id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editForm)
        });
        console.log(selectedProposal._id)
        console.log(response);
        if (response.ok) {
            const data = await response.json();
            console.log('Proposal edited:', data);
            closeModal();
        } else {
            throw new Error('API not available');
        }
    }catch(error){
        console.error('Error editing proposal:', error);
    }
}

    const handleCancel = () => {
        if (selectedProposal.status === 'processing') {
            // Send cancellation request
            alert('Cancellation request sent to client. You will be notified of their response.');
        } else {
            updateProposalStatus(selectedProposal._id, 'cancelled');
        }
        closeModal();
    };

    const stats = {
        total: proposals.length,
        pending: proposals.filter(p => p.status === 'pending').length,
        accepted: proposals.filter(p => p.status === 'accepted').length,
        rejected: proposals.filter(p => p.status === 'rejected').length,
        processing: proposals.filter(p => p.status === 'processing').length,
        completed: proposals.filter(p => p.status === 'completed').length,
        cancelled: proposals.filter(p => p.status === 'cancelled').length
    };

    return (
        <div className="min-h-screen mt-[65px] bg-gray-50">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Proposals</h1>
                            <p className="text-gray-600 mt-1">Track and manage all your submitted proposals</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Total Active</p>
                            <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                            <div className="text-center">
                                <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">Pending</p>
                                <p className="text-2xl font-bold text-blue-700 mt-1">{stats.pending}</p>
                            </div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                            <div className="text-center">
                                <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Accepted</p>
                                <p className="text-2xl font-bold text-green-700 mt-1">{stats.accepted}</p>
                            </div>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                            <div className="text-center">
                                <p className="text-xs text-yellow-600 font-medium uppercase tracking-wide">Processing</p>
                                <p className="text-2xl font-bold text-yellow-700 mt-1">{stats.processing}</p>
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
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <div className="text-center">
                                <p className="text-xs text-gray-600 font-medium uppercase tracking-wide">Cancelled</p>
                                <p className="text-2xl font-bold text-gray-700 mt-1">{stats.cancelled}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
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
                </div>

                {/* Proposals List */}
                <div className="space-y-4">
                    {filteredProposals.map((proposal) => (
                        <div key={proposal._id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-bold text-gray-900">{proposal.job.title}</h3>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(proposal.status)}`}>
                                                {getStatusIcon(proposal.status)}
                                                <span className="ml-1">{proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}</span>
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-2">{proposal.client.name}</p>
                                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                                            <span className="flex items-center">
                                                <DollarSign className="w-4 h-4 mr-1" />
                                                Bid: ₹{proposal.bidAmount.toLocaleString()}
                                            </span>
                                            <span className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                Submitted: {formatDate(proposal.submittedAt)}
                                            </span>
                                            {proposal.status !== 'pending' && (
                                                <span className="flex items-center">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    Updated: {formatDate(proposal.updatedAt)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Client Contact Details (for accepted proposals) */}
                                {proposal.status === 'accepted' && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                        <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Client Contact Details
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                            <div className="flex items-center text-green-700">
                                                <Mail className="w-4 h-4 mr-2" />
                                                {proposal.client.email}
                                            </div>
                                            <div className="flex items-center text-green-700">
                                                <Phone className="w-4 h-4 mr-2" />
                                                {proposal.client.phone}
                                            </div>
                                            <div className="flex items-center text-green-700">
                                                <MapPin className="w-4 h-4 mr-2" />
                                                {proposal.client.location}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="mb-4">
                                    <p className="text-gray-700 text-sm line-clamp-2">{proposal.coverLetter}</p>
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
                                            onClick={() => openModal('job', proposal)}
                                            className="inline-flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                                        >
                                            <Briefcase className="w-4 h-4 mr-2" />
                                            View Job
                                        </button>
                                    </div>

                                    <div className="flex space-x-2">
                                        {(proposal.status === 'pending' || proposal.status === 'accepted') && (
                                            <button
                                                onClick={() => openModal('edit', proposal)}
                                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                            >
                                                <Edit3 className="w-4 h-4 mr-2" />
                                                Edit
                                            </button>
                                        )}
                                        {proposal.status !== 'completed' && proposal.status !== 'rejected' && proposal.status !== 'cancelled' && (
                                            <button
                                                onClick={() => openModal('cancel', proposal)}
                                                className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors text-sm font-medium ${proposal.status === 'processing'
                                                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                                                        : 'bg-red-600 text-white hover:bg-red-700'
                                                    }`}
                                            >
                                                {proposal.status === 'processing' ? (
                                                    <>
                                                        <Send className="w-4 h-4 mr-2" />
                                                        Request Cancel
                                                    </>
                                                ) : (
                                                    <>
                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                        Cancel
                                                    </>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProposals.length === 0 && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No proposals found</h3>
                        <p className="text-gray-600">
                            {filter === 'all'
                                ? "You haven't submitted any proposals yet."
                                : `No ${filter} proposals found.`
                            }
                        </p>
                    </div>
                )}

                {/* Modal */}
                {showModal && selectedProposal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {modalType === 'view' && 'Proposal Details'}
                                        {modalType === 'edit' && 'Edit Proposal'}
                                        {modalType === 'cancel' && 'Cancel Proposal'}
                                        {modalType === 'job' && 'Job Details'}
                                    </h2>
                                    <button
                                        onClick={closeModal}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                {modalType === 'view' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-3">Proposal Information</h3>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Status</label>
                                                        <div className="mt-1">
                                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedProposal.status)}`}>
                                                                {getStatusIcon(selectedProposal.status)}
                                                                <span className="ml-1">{selectedProposal.status.charAt(0).toUpperCase() + selectedProposal.status.slice(1)}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Bid Amount</label>
                                                        <p className="text-xl font-bold text-blue-600">₹{selectedProposal.bidAmount.toLocaleString()}</p>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Submitted</label>
                                                        <p className="text-gray-900">{formatDate(selectedProposal.submittedAt)}</p>
                                                    </div>
                                                    {selectedProposal.status !== 'pending' && (
                                                        <div>
                                                            <label className="text-sm font-medium text-gray-500">Last Updated</label>
                                                            <p className="text-gray-900">{formatDate(selectedProposal.updatedAt)}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-3">Client Information</h3>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Client Name</label>
                                                        <p className="text-gray-900">{selectedProposal.client.name}</p>
                                                    </div>
                                                    {selectedProposal.status === 'accepted' && (
                                                        <>
                                                            <div>
                                                                <label className="text-sm font-medium text-gray-500">Email</label>
                                                                <p className="text-gray-900">{selectedProposal.client.email}</p>
                                                            </div>
                                                            <div>
                                                                <label className="text-sm font-medium text-gray-500">Phone</label>
                                                                <p className="text-gray-900">{selectedProposal.client.phone}</p>
                                                            </div>
                                                            <div>
                                                                <label className="text-sm font-medium text-gray-500">Location</label>
                                                                <p className="text-gray-900">{selectedProposal.client.location}</p>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3">Cover Letter</h3>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-gray-900 leading-relaxed">{selectedProposal.coverLetter}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {modalType === 'edit' && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Bid Amount (₹)</label>
                                            <input
                                                type="number"
                                                value={editForm.bidAmount}
                                                onChange={(e) => setEditForm({ ...editForm, bidAmount: parseInt(e.target.value) || 0 })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter your bid amount"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter</label>
                                            <textarea
                                                value={editForm.coverLetter}
                                                onChange={(e) => setEditForm({ ...editForm, coverLetter: e.target.value })}
                                                rows={6}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Write your cover letter here..."
                                            />
                                        </div>
                                        <div className="flex space-x-3 pt-4">
                                            <button
                                                onClick={handleEdit}
                                                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                            >
                                                <Save className="w-5 h-5 mr-2" />
                                                Save Changes
                                            </button>
                                            <button
                                                onClick={closeModal}
                                                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {modalType === 'cancel' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                                            <AlertTriangle className="w-6 h-6 text-red-600" />
                                            <div>
                                                <h3 className="font-semibold text-red-800">
                                                    {selectedProposal.status === 'processing' ? 'Request Cancellation' : 'Cancel Proposal'}
                                                </h3>
                                                <p className="text-sm text-red-700">
                                                    {selectedProposal.status === 'processing'
                                                        ? 'This will send a cancellation request to the client. You cannot cancel directly during processing.'
                                                        : 'This action cannot be undone. Are you sure you want to cancel this proposal?'
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {selectedProposal.status === 'processing' ? 'Cancellation Reason (Required)' : 'Reason (Optional)'}
                                            </label>
                                            <textarea
                                                value={cancelReason}
                                                onChange={(e) => setCancelReason(e.target.value)}
                                                rows={4}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                placeholder="Please provide a reason for cancellation..."
                                            />
                                        </div>

                                        <div className="flex space-x-3 pt-4">
                                            <button
                                                onClick={handleCancel}
                                                disabled={selectedProposal.status === 'processing' && !cancelReason.trim()}
                                                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {selectedProposal.status === 'processing' ? (
                                                    <>
                                                        <Send className="w-5 h-5 mr-2" />
                                                        Send Request
                                                    </>
                                                ) : (
                                                    <>
                                                        <Trash2 className="w-5 h-5 mr-2" />
                                                        Cancel Proposal
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                onClick={closeModal}
                                                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {modalType === 'job' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-3">Job Information</h3>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Job Title</label>
                                                        <p className="text-lg font-semibold text-gray-900">{selectedProposal.job.title}</p>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Budget</label>
                                                        <p className="text-xl font-bold text-green-600">₹{selectedProposal.job.budget.toLocaleString()}</p>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Deadline</label>
                                                        <p className="text-gray-900">{formatDate(selectedProposal.job.deadline)}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-3">Posted By</h3>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Client</label>
                                                        <p className="text-gray-900">{selectedProposal.client.name}</p>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Location</label>
                                                        <p className="text-gray-900">{selectedProposal.client.location}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3">Job Description</h3>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-gray-900 leading-relaxed">{selectedProposal.job.description}</p>
                                            </div>
                                        </div>

                                        <div className="flex space-x-3 pt-4">
                                            <button
                                                onClick={closeModal}
                                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyProposals;
