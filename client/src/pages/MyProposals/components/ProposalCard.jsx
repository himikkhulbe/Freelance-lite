import React from 'react'
import formatDate from "../../../Utils/formatDate"
import {
    Calendar, CheckCircle, Clock,
    Eye, Edit3, Trash2, Phone, Mail, MapPin, Briefcase, Send
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
const ProposalCard = ({ proposal, openModal, getStatusColor, getStatusIcon }) => {
    const navigate = useNavigate();

    return (
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
                                Bid: ₹{proposal.bidAmount.toLocaleString()}
                            </span>
                            <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                Submitted: {formatDate(proposal.submittedAt)}
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
                                {proposal.client.contactInfo.email}
                            </div>
                            <div className="flex items-center text-green-700">
                                <Phone className="w-4 h-4 mr-2" />
                                {proposal.client.contactInfo.phone}
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
                            onClick={() => {
                                navigate(`/job/${proposal.job._id}`)
                            }}
                            className="inline-flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                            <Briefcase className="w-4 h-4 mr-2" />
                            View Job
                        </button>
                    </div>

                    <div className="flex space-x-2">
                        {(proposal.status === 'pending' || proposal.status === 'accepted') && (
                            (proposal.editing < 2 && <button
                                onClick={() => openModal('edit', proposal)}
                                title={"Edit Proposal"}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Edit3 className="w-4 h-4 mr-2" />
                                Edit
                            </button>)
                        )}
                        {proposal.status !== 'completed' && proposal.status !== 'rejected' && proposal.status !== 'cancelled' &&  proposal.status !== 'processing' && (
                            <button
                                onClick={() => openModal('cancel', proposal)}
                                className={`inline-flex items-center px-4 py-2 rounded-lg transition-colors text-sm font-medium bg-red-600 text-white hover:bg-red-700'
                                    }`}
                            >
                                {proposal.status === 'processing' ? (
                                    null
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
    )
}

export default ProposalCard
