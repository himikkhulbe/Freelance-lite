import React, { useState, useEffect } from 'react';
import {
    User, DollarSign, Calendar, MessageSquare, CheckCircle, XCircle, Clock,
    Eye, Filter, Edit3, Trash2, Phone, Mail, MapPin, Star, Briefcase,
    AlertTriangle, Send, X, Save, FileText, ExternalLink
} from 'lucide-react';
import OrderCard from "./components/OrderCard"
import Loading from '../../components/Common/Loading';

const MyOrder = () => {
    const [order, setOrder] = useState([]);

    const [filter, setFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(''); // 'view', 'edit', 'cancel', 'job'
    const [selectedService, setSelectedService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editForm, setEditForm] = useState({
        requirement: '',
    });
    const [cancelReason, setCancelReason] = useState('');

    const statusOptions = ['all', 'pending', 'accepted', 'cancelled', 'rejected', 'processing', 'completed'];

    // const updateorderStatus = (orderId, newStatus) => {
    //     setorders(prev =>
    //         prev.map(order =>
    //             order._id === orderId
    //                 ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
    //                 : order
    //         )
    //     );
    // };

    const filteredOrder = (order || []).filter((o) => {
  if (filter === 'all') return true;
  return o.status === filter;
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

    const openModal = (type, order) => {
        setModalType(type);
        setSelectedService(order);
        if (type === 'edit') {
            setEditForm({
                requirement: order.requirement,
                bidAmount: order.bidAmount
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalType('');
        setSelectedService(null);
        setCancelReason('');
        setEditForm({ requirement: '', bidAmount: 0 });
    };

    const fetchMyOrders = async () => {
        console.log("run")
        try {
            setLoading(true);
            const response = await fetch(`https://freelance-lite.onrender.com/api/freelancer/myorders`, {
                method: "GET",
                credentials: "include"
            });
            if (response.ok) {
                const data = await response.json();
                setOrder(data);
                console.log('order Fetched From Api:', data);
            } else {
                throw new Error('API not available');
            }
        } catch (error) {
            console.error('Error fetching job:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrders();
    }, []); // <- empty dependency array


    const handleEdit = async () => {
        try {
            const response = await fetch(`https://freelance-lite.onrender.com/api/freelancer/editorder/${selectedService._id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editForm)
            });
            console.log(selectedService._id)
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                console.log('order edited:', data);
                fetchMyOrders();
                closeModal();
            } else {
                const responseText = await response.text();
                console.log(responseText)
            }
        } catch (error) {
            console.error('Error editing order:', error);
        }
    }
    const handleCancel = async () => {
        try {
            const response = await fetch(
                `https://freelance-lite.onrender.com/api/freelancer/cancelorder/${selectedService._id}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ cancelReason }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log("order cancelled:", data);
                fetchMyOrders();
                closeModal();
            } else {
                const responseText = await response.text();
                console.log(responseText);
            }
        } catch (error) {
            console.error("Error cancelling order:", error);
        }
    };


    const handleAgreeStartWork = async () => {
        try {
            const response = await fetch(
                `https://freelance-lite.onrender.com/api/freelancer/agreestartwork/${selectedService._id}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log("Work started:", data);
                fetchMyOrders();
                closeModal();
            } else {
                const responseText = await response.text();
                console.log(responseText);
            }
        } catch (error) {
            console.error("Error starting work:", error);
        }
    };


    const handleCompleteWork = async () => {
        try {
            const response = await fetch(
                `https://freelance-lite.onrender.com/api/freelancer/completework/${selectedService._id}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log("Work completed:", data);
            fetchMyOrders();
                closeModal();
            }
        } catch (error) {
            console.error("Error completing work:", error);
        }
    };

    const stats = {
        total: (order || []).length,
        pending: order.filter(p => p.status === 'pending').length,
        accepted: order.filter(p => p.status === 'accepted').length,
        rejected: order.filter(p => p.status === 'rejected').length,
        processing: order.filter(p => p.status === 'processing').length,
        completed: order.filter(p => p.status === 'completed').length,
        cancelled: order.filter(p => p.status === 'cancelled').length
    };

    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen mt-[65px] bg-gray-50">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                            <p className="text-gray-600 mt-1">Track and manage all your Orders</p>
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

                {/* orders List */}
                <div className="space-y-4">
                    {filteredOrder.map((order) => (
                        <OrderCard
                            key={order._id}
                            order={order}
                            openModal={openModal}
                            getStatusColor={getStatusColor}
                            getStatusIcon={getStatusIcon}
                        />
                    ))}
                </div>

                {filteredOrder.length === 0 && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No Order found</h3>
                        <p className="text-gray-600">
                            {filter === 'all'
                                ? "You haven't submitted any Order yet."
                                : `No ${filter} Order found.`
                            }
                        </p>
                    </div>
                )}

                {/* Modal */}
                {showModal && selectedService && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {modalType === 'view' && 'Order Details'}
                                        {modalType === 'edit' && 'Edit Order'}
                                        {modalType === 'cancel' && 'Cancel Order'}
                                        {modalType === 'job' && 'Job Details'}
                                        {modalType === 'agreeStartWork' && 'Agree & Start Work'}
                                        {modalType === 'markAsCompleted' && 'Mark as Completed'}
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
                                                <h3 className="font-semibold text-gray-900 mb-3">Order Information</h3>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Status</label>
                                                        <div className="mt-1">
                                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedService.status)}`}>
                                                                {getStatusIcon(selectedService.status)}
                                                                <span className="ml-1">{selectedService.status.charAt(0).toUpperCase() + selectedService.status.slice(1)}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Price:</label>
                                                        <p className="text-xl font-bold text-blue-600">₹{selectedService.service.price.toLocaleString()}</p>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Submitted</label>
                                                        <p className="text-gray-900">{formatDate(selectedService.createdAt)}</p>
                                                    </div>
                                                    {selectedService.status !== 'pending' && (
                                                        <div>
                                                            <label className="text-sm font-medium text-gray-500">Last Updated</label>
                                                            <p className="text-gray-900">{formatDate(selectedService.updatedAt)}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-3">Freelancer Information</h3>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Freelancer Name</label>
                                                        <p className="text-gray-900">{selectedService.freelancer.name}</p>
                                                    </div>
                                                    {selectedService.status === 'accepted' || selectedService.status === 'processing' || selectedService.status === 'completed' && (
                                                        <>
                                                            {selectedService.freelancer.contactInfo.email && (
                                                                <div>
                                                                    <label className="text-sm font-medium text-gray-500">Email</label>
                                                                    <p className="text-gray-900">{selectedService.freelancer.contactInfo.email}</p>
                                                                </div>
                                                        )}
                                                        {
                                                                selectedService.freelancer.contactInfo.phone &&(
                                                                    <div>
                                                                        <label className="text-sm font-medium text-gray-500">Phone</label>
                                                                        <p className="text-gray-900">{selectedService.freelancer.contactInfo.phone}</p>
                                                                    </div>
                                                            )
                                                        }
                                                            <div>
                                                                <label className="text-sm font-medium text-gray-500">Location</label>
                                                                <p className="text-gray-900">{selectedService.freelancer.location}</p>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            selectedService?.requirement && (
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-3">Requirements</h3>
                                                    <div className="bg-gray-50 p-4 rounded-lg">
                                                        <p className="text-gray-900 leading-relaxed">{selectedService.requirement}</p>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                )}

                                {modalType === 'edit' && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Requirement</label>
                                            <textarea
                                                value={editForm.requirement}
                                                onChange={(e) => setEditForm({ ...editForm, requirement: e.target.value })}
                                                rows={6}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Write your cover letter here..."
                                            />
                                        </div>
                                        <p className="text-gray-600 text-sm">Edited : {selectedService.editing}/2</p>
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
                                                <p className="text-sm text-red-700">
                                                    This action cannot be undone. Are you sure you want to cancel this order?
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex space-x-3 pt-4">
                                            <button
                                                onClick={handleCancel}
                                                disabled={selectedService.status === 'processing' || selectedService.status === 'completed'}
                                                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Trash2 className="w-5 h-5 mr-2" />
                                                Cancel order
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
                                                        <p className="text-lg font-semibold text-gray-900">{selectedService.job.title}</p>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Budget</label>
                                                        <p className="text-xl font-bold text-green-600">₹{selectedService.job.budget.toLocaleString()}</p>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Deadline</label>
                                                        <p className="text-gray-900">{formatDate(selectedService.job.deadline)}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="font-semibold text-gray-900 mb-3">Posted By</h3>
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">freelancer</label>
                                                        <p className="text-gray-900">{selectedService.freelancer.name}</p>
                                                    </div>
                                                    <div>
                                                        <label className="text-sm font-medium text-gray-500">Location</label>
                                                        <p className="text-gray-900">{selectedService.freelancer.location}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3">Job Description</h3>
                                            <div className="bg-gray-50 p-4 rounded-lg">
                                                <p className="text-gray-900 leading-relaxed">{selectedService.job.description}</p>
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

                                {modalType === 'agreeStartWork' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                                            <CheckCircle className="w-6 h-6 text-green-600" />
                                            <div>
                                                <h3 className="text-lg font-semibold text-green-600">Are You Sure!</h3>
                                                <p className="text-gray-900">You can't cancel this deal again.</p>
                                            </div>
                                        </div>

                                        <div className="flex space-x-3 pt-4">
                                            <button
                                                onClick={handleAgreeStartWork}
                                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                            >
                                                Agree & Start Work
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

                                {modalType === 'markAsCompleted' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                                            <CheckCircle className="w-6 h-6 text-green-600" />
                                            <div>
                                                <h3 className="text-lg font-semibold text-green-600">Are You Sure!</h3>
                                                <p className="text-gray-900">You can't undo this action.</p>
                                            </div>
                                        </div>

                                        <div className="flex space-x-3 pt-4">
                                            <button
                                                onClick={handleCompleteWork}
                                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                            >
                                                Mark As Completed
                                            </button>
                                            <button
                                                onClick={closeModal}
                                                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrder;
