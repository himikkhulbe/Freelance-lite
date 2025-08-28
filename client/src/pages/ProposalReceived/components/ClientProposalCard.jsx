import React from 'react'
import formatDate from "../../../Utils/formatDate"
import {
    Calendar, CheckCircle, Clock, Star,
    Eye, User, Phone, Mail, MapPin, Briefcase,
    ThumbsUp, ThumbsDown, MessageCircle, Award
} from 'lucide-react';
import { useNavigate } from "react-router-dom";

const ClientProposalCard = ({ proposal, openModal, getStatusColor, getStatusIcon }) => {
    const navigate = useNavigate();

    return (
        <div key={proposal._id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="p-4 sm:p-6">

                {/* Top Section */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 break-words">{proposal.job.title}</h3>
                            <span className={`mt-2 sm:mt-0 flex w-fit items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium border ${getStatusColor(proposal.status)}`}>
                                {getStatusIcon(proposal.status)}
                                <span className="ml-1">{proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}</span>
                            </span>
                        </div>

                        {/* Freelancer Info */}
                        <div className="flex items-center mb-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                {proposal.freelancer.profilePicture ? (
                                    <img
                                        src={proposal.freelancer.profilePicture}
                                        alt={proposal.freelancer.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <User className="w-5 h-5 text-blue-600" />
                                )}
                            </div>
                            <div>
                                <p onClick={() => navigate(`/profile/${proposal.freelancer._id}`)} className="font-semibold text-gray-900 text-sm sm:text-base cursor-pointer">{proposal.freelancer.name}</p>
                                <div className="flex items-center text-xs sm:text-sm text-gray-500">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {proposal.freelancer.location}
                                    {proposal.freelancer.averageRating > 0 && (
                                        <>
                                            <span className="mx-2">•</span>
                                            <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                                            {proposal.freelancer.averageRating.toFixed(1)}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6 space-y-1 sm:space-y-0 text-xs sm:text-sm text-gray-500">
                            <span className="flex items-center font-semibold text-green-600">
                                Bid: ₹{proposal.bidAmount.toLocaleString()}
                            </span>
                            <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Received: {formatDate(proposal.createdAt)}
                            </span>
                            {proposal.editing >= 1 && (
                                <span className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    Updated: {formatDate(proposal.updatedAt)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Freelancer Contact Details - Show only for accepted/processing/completed proposals */}
                {(proposal.status === 'accepted' || proposal.status === 'processing' || proposal.status === 'completed') && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 mb-4">
                        <h4 className="font-semibold text-green-800 mb-2 flex items-center text-sm sm:text-base">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Freelancer Contact Details
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                            <div className="flex items-center text-green-700 break-all">
                                <Mail className="w-4 h-4 mr-2" />
                                {proposal.freelancer.contactInfo.email || 'Contact via platform'}
                            </div>
                            <div className="flex items-center text-green-700 break-all">
                                <Phone className="w-4 h-4 mr-2" />
                                {proposal.freelancer.contactInfo.phone || 'Contact via platform'}
                            </div>
                        </div>
                    </div>
                )}

                {/* Cover Letter */}
                <div className="mb-4">
                    <h5 className="font-medium text-gray-900 mb-2 text-sm">Proposal:</h5>
                    <p className="text-gray-700 text-xs sm:text-sm line-clamp-3 break-words bg-gray-50 p-3 rounded-lg">
                        {proposal.coverLetter.slice(0, 100) + (proposal.coverLetter.length > 100 ? '...' : '')}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-100 space-y-3 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                        <button
                            onClick={() => openModal('view', proposal)}
                            className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-xs sm:text-sm font-medium"
                        >
                            <Eye className="w-4 h-4 mr-2" />
                            View Full Proposal
                        </button>
                        <button
                            onClick={() => {
                                navigate(`/job/${proposal.job._id}`)
                            }}
                            className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium"
                        >
                            <User className="w-4 h-4 mr-2" />
                            View Jobs
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {/* Accept/Reject buttons for pending proposals */}
                        {proposal.status === 'pending' && (
                            <>
                                <button
                                    onClick={() => openModal('accept', proposal)}
                                    className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-xs sm:text-sm font-medium"
                                >
                                    <ThumbsUp className="w-4 h-4 mr-2" />
                                    Accept
                                </button>
                                <button
                                    onClick={() => openModal('reject', proposal)}
                                    className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-xs sm:text-sm font-medium"
                                >
                                    <ThumbsDown className="w-4 h-4 mr-2" />
                                    Reject
                                </button>
                            </>
                        )}

                        {/* Approve work start for accepted proposals */}
                        {proposal.status === 'accepted' && proposal.startWork === 'pending' && (
                            <button
                                onClick={() => openModal('approveStart', proposal)}
                                className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                            >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve Work Start
                            </button>
                        )}
                        {
                            proposal.startWork === 'start' && (
                                <p className="text-[#A16207] text-xs sm:text-sm">Waiting for Approval...</p>
                            )
                        }

                        {/* Mark as completed when freelancer requests completion */}
                        {proposal.completedWork === 'pending' && proposal.status === 'processing' && (
                            <button
                                onClick={() => openModal('markCompleted', proposal)}
                                className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium bg-green-600 text-white hover:bg-green-700"
                            >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Mark as Complete
                            </button>
                        )}
                        {
                            proposal.completedWork === 'request' &&
                            <p className="text-[#A16207] text-xs sm:text-sm">Waiting for Approval...</p>
                        }

                        {/* Rate freelancer for completed work */}
                        {proposal.status === 'completed' && proposal.completedWork === 'completed' && (
                            <button
                                onClick={() => openModal('rate', proposal)}
                                className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm font-medium bg-yellow-500 text-white hover:bg-yellow-600"
                            >
                                <Award className="w-4 h-4 mr-2" />
                                Rate {proposal.freelancer.name.split(" ")[0]}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientProposalCard