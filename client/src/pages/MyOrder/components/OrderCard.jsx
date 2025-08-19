import React from 'react'
import formatDate from "../../../Utils/formatDate"
import {
    Calendar, CheckCircle, Clock, Star,
    Eye, Edit3, Trash2, Phone, Mail, MapPin, Briefcase
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

const OrderCard = ({ order, openModal, getStatusColor, getStatusIcon }) => {
    const navigate = useNavigate();


    

    return (
        <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="p-4 sm:p-6">

                {/* Top Section */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 break-words">{order.service.title}</h3>
                            <span className={`mt-2 sm:mt-0 flex w-fit items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getStatusColor(order.status)}`}>
                                {getStatusIcon(order.status)}
                                <span className="ml-1">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                            </span>
                        </div>
                        <p className="text-gray-600 mb-2 text-sm sm:text-base">{order.freelancer.name}</p>
                        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6 space-y-1 sm:space-y-0 text-xs sm:text-sm text-gray-500">
                            <span className="flex items-center">
                                Price: ₹{order.service.price.toLocaleString()}
                            </span>
                            <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Submitted: {formatDate(order.createdAt)}
                            </span>
                            {order.editing >= 1 && (
                                <span className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    Updated: {formatDate(order.updatedAt)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Client Contact Details */}
                {order.status !== 'pending' && order.status != 'rejected' && order.status != 'cancelled' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 mb-4">
                        <h4 className="font-semibold text-green-800 mb-2 flex items-center text-sm sm:text-base">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Freelancer Contact Details
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                            <div className="flex items-center text-green-700 break-all">
                                <Mail className="w-4 h-4 mr-2" />
                                {order.freelancer.contactInfo.email}
                            </div>
                            <div className="flex items-center text-green-700 break-all">
                                <Phone className="w-4 h-4 mr-2" />
                                {order.freelancer.contactInfo.phone}
                            </div>
                            <div className="flex items-center text-green-700 break-words">
                                <MapPin className="w-4 h-4 mr-2" />
                                {order.freelancer.location}
                            </div>
                        </div>
                    </div>
                )}

                {/* requirements */}
                {order.requirement &&
                    <div className="mb-4">
                        <p className="text-gray-700 text-xs sm:text-sm line-clamp-2 break-words">{`Requirements: ${order.requirement}`}</p>
                    </div>
                }
                

                {/* Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100 space-y-3 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                        <button
                            onClick={() => openModal('view', order)}
                            className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-xs sm:text-sm font-medium"
                        >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                        </button>
                        <button
                            onClick={() => {
                                navigate(`/service/${order.service._id}`)
                            }}
                            className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium"
                        >
                            <Briefcase className="w-4 h-4 mr-2" />
                            View Service
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {(order.status === 'pending' || order.status === 'accepted') && (
                            (order.editing < 2 && order.startWork === 'pending' &&
                                <button
                                    onClick={() => openModal('edit', order)}
                                    title={"Edit Proposal"}
                                    className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Edit
                                </button>)
                        )}
                        {order.status !== 'completed' && order.status !== 'rejected' && order.status !== 'cancelled' && order.status !== 'processing' && order.startWork !== 'accepted' && (
                            <button
                                onClick={() => openModal('cancel', order)}
                                className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium bg-red-600 text-white hover:bg-red-700"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Cancel
                            </button>
                        )}
                        {order.startWork === 'start' && order.status === 'accepted' &&
                            <button
                            onClick={() => openModal('agreeStartWork', order)}
                                className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium bg-green-600 text-white hover:bg-green-700"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Agree
                            </button>
                        }
                        {order.completedWork === 'request' && order.status === 'processing' &&
                            <button
                                onClick={() => openModal('markAsCompleted', order)}
                                className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium bg-green-600 text-white hover:bg-green-700"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Mark As Completed
                            </button>
                        }
                        {order.completedWork === 'completed' && order.status === 'completed' &&
                            <button
                                className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium bg-yellow-500 text-white hover:bg-green-700"
                            >
                                <Star className="w-4 h-4 mr-2" />
                                Rate {order.client.name.split(" ")[0]}
                            </button>
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default OrderCard
