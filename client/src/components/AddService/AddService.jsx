import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    FileText,
    Tag,
    DollarSign,
    Clock,
    Plus,
    X,
    HelpCircle,
    CheckCircle,
    Loader
} from 'lucide-react';

const AddService = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        subcategory: '',
        tags: [],
        deliveryTime: '',
        price: '',
        revisions: '1',
        faqs: [{ question: '', answer: '' }],
        requirements: []
    });
    console.log("ID:", id);

useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const response = await fetch(`https://freelance-lite.onrender.com/api/freelancer/service/${id}`, {
                        method: 'GET',
                        credentials: 'include'
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch service data');
                    }
                    const data = await response.json();
                    setFormData(data?.service);
                } catch (error) {
                    console.error("Error fetching service data:", error);
                }
            })();
        }
    }, [id]);




    console.log("Initial form data:", formData);
    const [tagInput, setTagInput] = useState('');
    const [requirementInput, setRequirementInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const categories = [
        'Web Development',
        'Graphic Design',
        'Content Writing',
        'SEO',
        'Marketing',
        'Data Entry',
        'Video Editing',
        'Others'
    ];

    const subcategories = {
        'Web Development': ['Frontend', 'Backend', 'Full Stack', 'React', 'Node.js', 'WordPress', 'E-commerce'],
        'Graphic Design': ['Logo Design', 'Web Design', 'Print Design', 'Branding', 'UI/UX Design'],
        'Content Writing': ['Blog Posts', 'Copywriting', 'Technical Writing', 'Social Media Content', 'Product Descriptions'],
        'SEO': ['On-Page SEO', 'Off-Page SEO', 'Technical SEO', 'Local SEO', 'SEO Audit'],
        'Marketing': ['Social Media Marketing', 'Email Marketing', 'Digital Marketing', 'Content Marketing', 'PPC'],
        'Data Entry': ['Excel Work', 'Database Entry', 'CRM Management', 'Lead Generation', 'Data Processing'],
        'Video Editing': ['Promotional Videos', 'Social Media Videos', 'Corporate Videos', 'YouTube Editing'],
        'Others': ['Virtual Assistant', 'Translation', 'Voice Over', 'Photography', 'Business Consulting']
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (name === 'category') {
            setFormData(prev => ({
                ...prev,
                subcategory: ''
            }));
        }
    };

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()]
            }));
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const addRequirement = () => {
        if (requirementInput.trim()) {
            setFormData(prev => ({
                ...prev,
                requirements: [...prev.requirements, requirementInput.trim()]
            }));
            setRequirementInput('');
        }
    };

    const removeRequirement = (index) => {
        setFormData(prev => ({
            ...prev,
            requirements: prev.requirements.filter((_, i) => i !== index)
        }));
    };

    const updateFAQ = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            faqs: prev.faqs.map((faq, i) =>
                i === index ? { ...faq, [field]: value } : faq
            )
        }));
    };

    const addFAQ = () => {
        setFormData(prev => ({
            ...prev,
            faqs: [...prev.faqs, { question: '', answer: '' }]
        }));
    };

    const removeFAQ = (index) => {
        if (formData.faqs.length > 1) {
            setFormData(prev => ({
                ...prev,
                faqs: prev.faqs.filter((_, i) => i !== index)
            }));
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            const serviceData = {
                title: formData.title,
                description: formData.description,
                category: formData.category,
                subcategory: formData.subcategory || undefined,
                tags: formData.tags,
                deliveryTime: parseInt(formData.deliveryTime),
                price: parseFloat(formData.price),
                revisions: parseInt(formData.revisions) || 1,
                faqs: formData.faqs.filter(faq => faq.question.trim() && faq.answer.trim()),
                requirements: formData.requirements
            };

            console.log("Submitting service data:", serviceData);

            const response = await fetch("https://freelance-lite.onrender.com/api/freelancer/service", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(serviceData)
            });

            const result = await response.json();
            console.log("Response from server:", result);

            if (response.ok) {
                console.log("Service created:", result.service);
                setShowSuccess(true);

                // Reset form
                setFormData({
                    title: '',
                    description: '',
                    category: '',
                    subcategory: '',
                    tags: [],
                    deliveryTime: '',
                    price: '',
                    revisions: '1',
                    faqs: [{ question: '', answer: '' }],
                    requirements: []
                });

                setTimeout(() => setShowSuccess(false), 4000);
            } else {
                throw new Error(result.message || 'Failed to create service');
            }
        } catch (error) {
            console.error("Service creation failed:", error);
            alert("Something went wrong: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-4 px-4 sm:py-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-t-lg shadow-sm border border-b-0 px-4 py-4 sm:px-6 sm:py-5">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Create New Service</h1>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                        Fill in the details to create your service listing
                    </p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-b-lg shadow-sm border px-4 py-6 sm:px-6 space-y-8">

                    {/* Basic Information */}
                    <div className="space-y-4">
                        <div className="flex items-center mb-4">
                            <FileText className="w-5 h-5 text-blue-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Service Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="I will create a professional website for you"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Describe your service in detail..."
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subcategory
                                </label>
                                <select
                                    name="subcategory"
                                    value={formData.subcategory}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                                    disabled={!formData.category}
                                >
                                    <option value="">Select Subcategory (Optional)</option>
                                    {formData.category && subcategories[formData.category]?.map(subcat => (
                                        <option key={subcat} value={subcat}>{subcat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-4">
                        <div className="flex items-center mb-4">
                            <Tag className="w-5 h-5 text-blue-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-900">Tags</h2>
                        </div>

                        {formData.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                                {formData.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="ml-2 text-blue-600 hover:text-blue-800"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addTag();
                                    }
                                }}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Add a tag (e.g., react, frontend, responsive)"
                            />
                            <button
                                type="button"
                                onClick={addTag}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                            >
                                <Plus className="w-4 h-4 mr-1" />
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Pricing & Delivery */}
                    <div className="space-y-4">
                        <div className="flex items-center mb-4">
                            <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-900">Pricing & Delivery</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price ($) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="50"
                                    min="5"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Delivery Time (days) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="deliveryTime"
                                    value={formData.deliveryTime}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="7"
                                    min="1"
                                    max="365"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Revisions
                                </label>
                                <input
                                    type="number"
                                    name="revisions"
                                    value={formData.revisions}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="3"
                                    min="1"
                                    max="10"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Requirements */}
                    <div className="space-y-4">
                        <div className="flex items-center mb-4">
                            <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-900">Requirements from Buyer</h2>
                        </div>

                        {formData.requirements.length > 0 && (
                            <div className="space-y-2 mb-4">
                                {formData.requirements.map((req, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm">
                                            {req}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeRequirement(index)}
                                            className="text-red-500 hover:text-red-700 p-1"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="text"
                                value={requirementInput}
                                onChange={(e) => setRequirementInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addRequirement();
                                    }
                                }}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="What do you need from the buyer?"
                            />
                            <button
                                type="button"
                                onClick={addRequirement}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                            >
                                <Plus className="w-4 h-4 mr-1" />
                                Add
                            </button>
                        </div>
                    </div>

                    {/* FAQs */}
                    <div className="space-y-4">
                        <div className="flex items-center mb-4">
                            <HelpCircle className="w-5 h-5 text-blue-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h2>
                        </div>

                        {formData.faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">FAQ #{index + 1}</span>
                                    {formData.faqs.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeFAQ(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                <input
                                    type="text"
                                    value={faq.question}
                                    onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Question"
                                />

                                <textarea
                                    value={faq.answer}
                                    onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                                    rows={2}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Answer"
                                />
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addFAQ}
                            className="w-full py-3 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add FAQ
                        </button>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 border-t border-gray-200">
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading || !formData.title || !formData.description || !formData.category || !formData.price || !formData.deliveryTime}
                            className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <Loader className="animate-spin w-4 h-4 mr-2" />
                                    Creating Service...
                                </>
                            ) : (
                                'Create Service'
                            )}
                        </button>
                    </div>
                </div>

                {/* Success Message */}
                {showSuccess && (
                    <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Service created successfully!
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddService;