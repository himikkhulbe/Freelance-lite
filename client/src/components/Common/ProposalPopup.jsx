import { useState } from 'react';
import { X, DollarSign, Clock, FileText, Send, AlertCircle, Paperclip, User, Star, MapPin } from 'lucide-react';

export default function SubmitProposalModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [proposalForm, setProposalForm] = useState({
        bidAmount: '',
        coverLetter: '',
        Status: "pending"
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Sample job data
    const jobData = {
        title: 'Full-Stack E-Commerce Website Development',
        description: 'Looking for an experienced developer to build a modern e-commerce website with React, Node.js, and MongoDB. The project includes user authentication, payment integration, and admin dashboard.',
        budget: '₹15,000 - ₹25,000',
        duration: '1-2 months',
        skills: ['React', 'Node.js', 'MongoDB', 'Payment Gateway'],
        client: {
            name: 'TechStart Solutions',
            rating: 4.8,
            jobsPosted: 12,
            location: 'Mumbai, India'
        },
        postedTime: '2 days ago'
    };

    const validateForm = () => {
        const newErrors = {};

        if (!proposalForm.bidAmount || proposalForm.bidAmount <= 0) {
            newErrors.bidAmount = 'Please enter a valid bid amount';
        }

        if (!proposalForm.coverLetter.trim()) {
            newErrors.coverLetter = 'Cover letter is required';
        } else if (proposalForm.coverLetter.trim().length < 50) {
            newErrors.coverLetter = 'Cover letter must be at least 50 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitProposal = async () => {
        if (validateForm()) {
            setIsSubmitting(true);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            console.log('Submitting proposal:', proposalForm);

            // Reset form and close modal
            setProposalForm({
                bidAmount: '',
                status: 'pending',
                coverLetter: '',
            });
            setErrors({});
            setIsSubmitting(false);
            setIsOpen(false);

            // Show success message
            alert('Proposal submitted successfully!');
        }
    };

    const handleInputChange = (field, value) => {
        setProposalForm(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        console.log('Files selected:', files);
        // Handle file upload logic here
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Demo Job Card */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{jobData.title}</h1>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                <span className="flex items-center space-x-1">
                                    <DollarSign className="w-4 h-4" />
                                    <span>{jobData.budget}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{jobData.duration}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{jobData.client.location}</span>
                                </span>
                            </div>
                            <p className="text-gray-700 mb-4">{jobData.description}</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {jobData.skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                                <User className="w-5 h-5 text-gray-400" />
                                <span className="font-medium text-gray-900">{jobData.client.name}</span>
                                <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="text-sm text-gray-600">{jobData.client.rating}</span>
                                </div>
                            </div>
                            <span className="text-sm text-gray-500">• {jobData.client.jobsPosted} jobs posted</span>
                        </div>

                        <button
                            onClick={() => setIsOpen(true)}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Submit Proposal
                        </button>
                    </div>
                </div>
            </div>

            {/* Proposal Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Blurred Background Overlay */}
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="pr-12">
                                <h2 className="text-2xl font-bold mb-2">Submit Your Proposal</h2>
                                <p className="text-blue-100">Stand out from the competition with a compelling proposal</p>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="overflow-y-auto max-h-[calc(95vh-180px)]">
                            <div className="p-6 space-y-6">
                                {/* Job Summary */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">Project: {jobData.title}</h3>
                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                        <span>Budget: {jobData.budget}</span>
                                        <span>•</span>
                                        <span>Duration: {jobData.duration}</span>
                                    </div>
                                </div>

                                {/* Bid Section */}
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                                            Your Bid <span className="text-red-500">*</span>
                                        </label>

                                        {/* Bid Type Toggle */}
                                        <div className="flex space-x-1 mb-4 bg-gray-100 rounded-xl p-1">
                                            <button
                                                onClick={() => handleInputChange('bidType', 'fixed')}
                                                className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${proposalForm.bidType === 'fixed'
                                                        ? 'bg-white text-blue-600 shadow-sm border border-blue-100'
                                                        : 'text-gray-600 hover:text-gray-800'
                                                    }`}
                                            >
                                                Fixed Price Project
                                            </button>
                                            <button
                                                onClick={() => handleInputChange('bidType', 'hourly')}
                                                className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${proposalForm.bidType === 'hourly'
                                                        ? 'bg-white text-blue-600 shadow-sm border border-blue-100'
                                                        : 'text-gray-600 hover:text-gray-800'
                                                    }`}
                                            >
                                                Hourly Rate
                                            </button>
                                        </div>

                                        {/* Bid Amount Input */}
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                                                ₹
                                            </div>
                                            <input
                                                type="number"
                                                placeholder={proposalForm.bidType === 'hourly' ? '750' : '18000'}
                                                value={proposalForm.bidAmount}
                                                onChange={(e) => handleInputChange('bidAmount', e.target.value)}
                                                className={`w-full pl-10 pr-20 py-4 border-2 rounded-xl text-lg font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.bidAmount ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            />
                                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                                                {proposalForm.bidType === 'hourly' ? '/hour' : 'total'}
                                            </div>
                                        </div>
                                        {errors.bidAmount && (
                                            <div className="flex items-center space-x-2 mt-2 text-red-600">
                                                <AlertCircle className="w-4 h-4" />
                                                <span className="text-sm">{errors.bidAmount}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Timeline Section */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Delivery Timeline <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., 3 weeks, 1 month, 45 days"
                                            value={proposalForm.timeline}
                                            onChange={(e) => handleInputChange('timeline', e.target.value)}
                                            className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.timeline ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        />
                                        {errors.timeline && (
                                            <div className="flex items-center space-x-2 mt-2 text-red-600">
                                                <AlertCircle className="w-4 h-4" />
                                                <span className="text-sm">{errors.timeline}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Cover Letter Section */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Cover Letter <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-gray-600 mb-3">
                                        Describe your approach, relevant experience, and why you're the best fit for this project.
                                    </p>
                                    <textarea
                                        rows={8}
                                        placeholder="Dear Client,

I'm excited to submit my proposal for your e-commerce website project. With over 5 years of experience in full-stack development and a strong background in React and Node.js...

I would love to discuss your project in more detail. Please feel free to reach out with any questions.

Best regards,"
                                        value={proposalForm.coverLetter}
                                        onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                                        className={`w-full px-4 py-4 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors ${errors.coverLetter ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    />
                                    <div className="flex items-center justify-between mt-2">
                                        {errors.coverLetter && (
                                            <div className="flex items-center space-x-2 text-red-600">
                                                <AlertCircle className="w-4 h-4" />
                                                <span className="text-sm">{errors.coverLetter}</span>
                                            </div>
                                        )}
                                        <div className="ml-auto">
                                            <span className={`text-sm font-medium ${proposalForm.coverLetter.length < 50 ? 'text-red-500' : 'text-gray-500'
                                                }`}>
                                                {proposalForm.coverLetter.length}/50 min characters
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Attachments Section */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Portfolio & Attachments (Optional)
                                    </label>
                                    <div
                                        className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer group"
                                        onClick={() => document.getElementById('file-upload').click()}
                                    >
                                        <input
                                            id="file-upload"
                                            type="file"
                                            multiple
                                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={handleFileUpload}
                                        />
                                        <FileText className="w-12 h-12 text-gray-400 group-hover:text-blue-500 mx-auto mb-3 transition-colors" />
                                        <p className="text-gray-700 font-medium mb-1">Drop files here or click to browse</p>
                                        <p className="text-sm text-gray-500">PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</p>
                                    </div>
                                </div>

                                {/* Pro Tips */}
                                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-5">
                                    <h4 className="text-sm font-semibold text-green-900 mb-3 flex items-center">
                                        <span className="text-lg mr-2">💡</span>
                                        Pro Tips for Winning Proposals
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-green-800">
                                        <div className="flex items-start space-x-2">
                                            <span className="text-green-500 mt-0.5">•</span>
                                            <span>Mention specific relevant projects</span>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <span className="text-green-500 mt-0.5">•</span>
                                            <span>Ask thoughtful questions</span>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <span className="text-green-500 mt-0.5">•</span>
                                            <span>Suggest improvements or alternatives</span>
                                        </div>
                                        <div className="flex items-start space-x-2">
                                            <span className="text-green-500 mt-0.5">•</span>
                                            <span>Include portfolio samples</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="border-t border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                    <Paperclip className="w-4 h-4 inline mr-1" />
                                    You can edit this proposal until the client responds
                                </div>
                                <div className="flex space-x-3">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        disabled={isSubmitting}
                                        className="px-6 py-3 text-gray-700 bg-gray-100 border border-gray-200 rounded-xl hover:bg-gray-200 transition-colors font-medium disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmitProposal}
                                        disabled={isSubmitting}
                                        className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-lg disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4" />
                                                <span>Submit Proposal</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}