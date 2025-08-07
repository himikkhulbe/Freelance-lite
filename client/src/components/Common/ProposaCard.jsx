import { useState } from 'react';
import { Star, Calendar, DollarSign, User, MessageCircle, CheckCircle, Clock, X } from 'lucide-react';

export default function ProposalCard() {
    const [selectedProposal, setSelectedProposal] = useState(null);

    // Sample proposal data
    const proposals = [
        {
            _id: '1',
            freelancer: {
                name: 'Sarah Johnson',
                profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b9235345?w=150&h=150&fit=crop&crop=face',
                rating: 4.9,
                completedProjects: 47,
                skills: ['React', 'Node.js', 'MongoDB']
            },
            bidAmount: 2500,
            status: 'pending',
            submittedAt: '2024-01-15T10:30:00Z',
            coverLetter: 'I have over 5 years of experience in full-stack development with a focus on React and Node.js. I\'ve completed similar e-commerce projects and can deliver high-quality code within your timeline. I\'d love to discuss your specific requirements and provide a detailed project plan.',
            timeline: '2-3 weeks',
            isHourly: false
        },
        {
            _id: '2',
            freelancer: {
                name: 'Michael Chen',
                profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                rating: 4.7,
                completedProjects: 32,
                skills: ['Vue.js', 'Python', 'PostgreSQL']
            },
            bidAmount: 45,
            status: 'accepted',
            submittedAt: '2024-01-14T14:20:00Z',
            coverLetter: 'Hello! I\'m a senior full-stack developer with expertise in modern web technologies. Your project aligns perfectly with my skills, and I\'m confident I can exceed your expectations. I prefer agile development methodology and maintain regular communication throughout the project.',
            timeline: '3-4 weeks',
            isHourly: true
        },
        {
            _id: '3',
            freelancer: {
                name: 'Emily Rodriguez',
                profilePicture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
                rating: 5.0,
                completedProjects: 68,
                skills: ['React', 'TypeScript', 'AWS']
            },
            bidAmount: 3200,
            status: 'rejected',
            submittedAt: '2024-01-13T09:15:00Z',
            coverLetter: 'I\'m a certified AWS developer with extensive experience in building scalable web applications. I specialize in React and TypeScript, ensuring type-safe and maintainable code. I can provide architectural recommendations and best practices for your project.',
            timeline: '4-5 weeks',
            isHourly: false
        }
    ];

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'accepted':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <Clock className="w-3 h-3" />;
            case 'accepted':
                return <CheckCircle className="w-3 h-3" />;
            case 'rejected':
                return <X className="w-3 h-3" />;
            default:
                return null;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Project Proposals</h1>
                <p className="text-gray-600">Review and manage proposals for your project</p>
            </div>

            <div className="space-y-6">
                {proposals.map(proposal => (
                    <div
                        key={proposal._id}
                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="flex items-start space-x-4">
                            {/* Profile Picture */}
                            <div className="relative">
                                <img
                                    src={proposal.freelancer?.profilePicture || '/default-avatar.png'}
                                    alt={proposal.freelancer?.name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
                                />
                                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 min-w-0">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <h4 className="text-lg font-semibold text-gray-900">
                                                {proposal.freelancer?.name}
                                            </h4>
                                            <div className="flex items-center space-x-1 text-yellow-500">
                                                <Star className="w-4 h-4 fill-current" />
                                                <span className="text-sm font-medium text-gray-700">
                                                    {proposal.freelancer?.rating}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    ({proposal.freelancer?.completedProjects} projects)
                                                </span>
                                            </div>
                                        </div>

                                        {/* Skills */}
                                        <div className="flex flex-wrap gap-1 mb-2">
                                            {proposal.freelancer?.skills?.slice(0, 3).map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full border border-blue-200"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Bid Amount and Status */}
                                    <div className="text-right">
                                        <div className="flex items-center justify-end space-x-2 mb-2">
                                            <DollarSign className="w-5 h-5 text-green-600" />
                                            <span className="text-2xl font-bold text-green-600">
                                                ₹{proposal.bidAmount.toLocaleString()}
                                            </span>
                                            {proposal.isHourly && (
                                                <span className="text-sm text-gray-500">/hr</span>
                                            )}
                                        </div>
                                        <div className={`inline-flex items-center space-x-1 px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(proposal.status)}`}>
                                            {getStatusIcon(proposal.status)}
                                            <span className="capitalize">{proposal.status}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Meta Information */}
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>Submitted {formatDate(proposal.submittedAt)}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Clock className="w-4 h-4" />
                                        <span>Timeline: {proposal.timeline}</span>
                                    </div>
                                </div>

                                {/* Cover Letter */}
                                <div className="mb-4">
                                    <p className="text-gray-700 leading-relaxed">
                                        {proposal.coverLetter}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex space-x-3">
                                        <button className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                            <User className="w-4 h-4" />
                                            <span>View Profile</span>
                                        </button>
                                        <button className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                            <MessageCircle className="w-4 h-4" />
                                            <span>Send Message</span>
                                        </button>
                                    </div>

                                    {proposal.status === 'pending' && (
                                        <div className="flex space-x-2">
                                            <button className="px-4 py-2 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                                                Decline
                                            </button>
                                            <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                                                Accept Proposal
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {proposals.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals yet</h3>
                    <p className="text-gray-500">Proposals will appear here once freelancers submit them.</p>
                </div>
            )}
        </div>
    );
}