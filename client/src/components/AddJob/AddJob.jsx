import React, { useState } from 'react';
import {
    Briefcase,
    Calendar,
    DollarSign,
    Clock,
    Tag,
    FileText,
    Plus,
    X,
    Upload,
    CheckCircle,
    AlertTriangle
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

const AddJob = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState({ isVisible: false, message: '', type: '' });

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        requiredSkills: [],
        budget: '',
        durationValue: '',
        durationType: 'weeks',
        deadline: '',
        category: ''
    });

    const [currentSkill, setCurrentSkill] = useState('');

    const categories = [
        'Web Development',
        'Design',
        'Marketing',
        'Data Entry',
        'Writing',
        'Video Editing',
        'Others'
    ];

    const showToast = (message, type) => {
        setToast({ isVisible: true, message, type });
        setTimeout(() => {
            setToast({ isVisible: false, message: '', type: '' });
        }, 4000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addSkill = () => {
        if (currentSkill.trim() && !formData.requiredSkills.includes(currentSkill.trim())) {
            setFormData(prev => ({
                ...prev,
                requiredSkills: [...prev.requiredSkills, currentSkill.trim()]
            }));
            setCurrentSkill('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setFormData(prev => ({
            ...prev,
            requiredSkills: prev.requiredSkills.filter(skill => skill !== skillToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setIsSubmitting(true);

        try {
            // Validate required fields
            if (!formData.title || !formData.description || !formData.budget || !formData.durationValue || !formData.deadline || !formData.category) {
                showToast('Please fill in all required fields.', 'error');
                setIsSubmitting(false);
                return;
            }

            // Validate and format the deadline
            const deadlineDate = new Date(formData.deadline);
            if (isNaN(deadlineDate.getTime())) {
                showToast('Please select a valid deadline date.', 'error');
                setIsSubmitting(false);
                return;
            }

            // Combine duration value and type
            const duration = `${formData.durationValue} ${formData.durationType}`;

            const jobData = {
                title: formData.title,
                description: formData.description,
                requiredSkills: formData.requiredSkills,
                budget: parseInt(formData.budget),
                duration: duration,
                deadline: deadlineDate.toISOString(),
                category: formData.category
            };

            const response = await fetch('https://freelance-lite.onrender.com/api/client/job', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(jobData)
            });

            if (response.ok) {
                showToast('Job posted successfully!', 'success');
                // Reset form
                setFormData({
                    title: '',
                    description: '',
                    requiredSkills: [],
                    budget: '',
                    durationValue: '',
                    durationType: 'weeks',
                    deadline: '',
                    category: ''
                });
            } else {
                const errorData = await response.json();
                showToast(errorData.message || 'Failed to post job. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error posting job:', error);
            showToast('Network error. Please check your connection and try again.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Toast
                message={toast.message}
                type={toast.type}
                isVisible={toast.isVisible}
                onClose={() => setToast({ isVisible: false, message: '', type: '' })}
            />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex justify-center mb-4">
                            <div className="bg-blue-600 p-3 rounded-full">
                                <Briefcase className="text-white" size={32} />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Fill out the details below to post your job and connect with talented freelancers
                        </p>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                                {/* Left Column */}
                                <div className="space-y-6">
                                    {/* Job Title */}
                                    <div>
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                            <Briefcase className="mr-2 text-blue-600" size={16} />
                                            Job Title *
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            placeholder="e.g., Build a Landing Page for SaaS Product"
                                        />
                                    </div>

                                    {/* Category */}
                                    <div>
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                            <Tag className="mr-2 text-blue-600" size={16} />
                                            Category *
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Budget */}
                                    <div>
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                            <DollarSign className="mr-2 text-blue-600" size={16} />
                                            Budget (₹) *
                                        </label>
                                        <input
                                            type="number"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleInputChange}
                                            required
                                            min="1"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            placeholder="25000"
                                        />
                                    </div>

                                    {/* Duration */}
                                    <div>
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                            <Clock className="mr-2 text-blue-600" size={16} />
                                            Duration *
                                        </label>
                                        <div className="flex gap-3">
                                            <input
                                                type="number"
                                                name="durationValue"
                                                value={formData.durationValue}
                                                onChange={handleInputChange}
                                                required
                                                min="1"
                                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                placeholder="1"
                                            />
                                            <select
                                                name="durationType"
                                                value={formData.durationType}
                                                onChange={handleInputChange}
                                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white min-w-[100px]"
                                            >
                                                <option value="weeks">Weeks</option>
                                                <option value="months">Months</option>
                                            </select>
                                        </div>
                                        {formData.durationValue && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                Duration: {formData.durationValue} {formData.durationType}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    {/* Description */}
                                    <div>
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                            <FileText className="mr-2 text-blue-600" size={16} />
                                            Job Description *
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            required
                                            rows={6}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                                            placeholder="Describe your project requirements, expectations, and any specific details..."
                                        />
                                    </div>

                                    {/* Deadline */}
                                    <div>
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                            <Calendar className="mr-2 text-blue-600" size={16} />
                                            Deadline *
                                        </label>
                                        <input
                                            type="date"
                                            name="deadline"
                                            value={formData.deadline}
                                            onChange={handleInputChange}
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        />
                                    </div>

                                    {/* Required Skills */}
                                    <div>
                                        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                            <Tag className="mr-2 text-blue-600" size={16} />
                                            Required Skills
                                        </label>
                                        <div className="flex gap-2 mb-3">
                                            <input
                                                type="text"
                                                value={currentSkill}
                                                onChange={(e) => setCurrentSkill(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                placeholder="Add a skill (e.g., React, Node.js)"
                                            />
                                            <button
                                                type="button"
                                                onClick={addSkill}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {formData.requiredSkills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                                >
                                                    {skill}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSkill(skill)}
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Save as Draft
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        onClick={handleSubmit}
                                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                                                <span>Posting Job...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Upload size={16} />
                                                <span>Post Job</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddJob;