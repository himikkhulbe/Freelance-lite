// import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Star,
    Briefcase,
    Search,
    ArrowRight,
    User,
    DollarSign,
    Shield,
    MessageCircle,
    Code,
    Palette,
    Smartphone,
    PenTool,
    TrendingUp,
    Video,
    Loader,
    CheckCircle,
    Target,
    Award,
    Clock
} from 'lucide-react';

export default function Home() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    console.log("from home", user);



    const features = [
        {
            icon: <Briefcase className="text-blue-600" size={24} />,
            title: "Post & Apply for Jobs",
            description: "Clients post projects, freelancers apply with proposals"
        },
        {
            icon: <DollarSign className="text-blue-600" size={24} />,
            title: "Buy & Sell Services",
            description: "Freelancers create services, clients purchase directly"
        },
        {
            icon: <Star className="text-blue-600" size={24} />,
            title: "Rating System",
            description: "Rate and review after project completion"
        },
        {
            icon: <User className="text-blue-600" size={24} />,
            title: "Profile Management",
            description: "Update profiles and showcase your work"
        }
    ];

    const stats = [
        { number: "50K+", label: "Freelancers" },
        { number: "25K+", label: "Clients" },
        { number: "150K+", label: "Projects" },
        { number: "98%", label: "Success Rate" }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Marketing Manager",
            text: "Great platform to find talented freelancers. The rating system really helps.",
            rating: 5
        },
        {
            name: "Mike Chen",
            role: "Web Developer",
            text: "Easy to showcase my services and connect with quality clients.",
            rating: 5
        },
        {
            name: "Emma Davis",
            role: "Graphic Designer",
            text: "Simple interface and reliable payment system. Highly recommended.",
            rating: 5
        }
    ];

    const services = [
        { icon: <Code className="text-blue-600" size={32} />, title: "Web Development", jobs: "2,450+ jobs available" },
        { icon: <Palette className="text-blue-600" size={32} />, title: "Graphic Design", jobs: "1,890+ jobs available" },
        { icon: <Smartphone className="text-blue-600" size={32} />, title: "Mobile Apps", jobs: "1,340+ jobs available" },
        { icon: <PenTool className="text-blue-600" size={32} />, title: "Content Writing", jobs: "3,200+ jobs available" },
        { icon: <TrendingUp className="text-blue-600" size={32} />, title: "Digital Marketing", jobs: "1,670+ jobs available" },
        { icon: <Video className="text-blue-600" size={32} />, title: "Video Editing", jobs: "980+ jobs available" }
    ];

        if (loading) {
            return (
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="text-center">
                        <Loader className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                        <p className="text-gray-600">Please Wait...</p>
                    </div>
                </div>
            );
        }

    return (
        <div className="min-h-screen pt-[85px] bg-white">
            {/* Hero Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    {user?.user ? (
                        // Logged in user view
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Welcome back, {user?.user?.name}!
                            </h1>
                            {user?.user?.role === 'freelancer' ? (
                                <>
                                    <p className="text-xl text-gray-600 mb-8">
                                        Ready to find your next project? Browse available jobs or manage your services.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                                        <button onClick={() => navigate('/jobs')} className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors">
                                            Find Jobs
                                        </button>
                                        <button onClick={() => navigate('/addservice')} className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-50 transition-colors">
                                            Post Service
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="text-xl text-gray-600 mb-8">
                                        Looking for talent? Browse services or post a new job to get started.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                                        <button onClick={() => navigate('/services')} className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors">
                                            Find Services
                                        </button>
                                            <button onClick={() => navigate('/addjob')} className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-50 transition-colors">
                                            Post a Job
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Quick Stats for logged in users */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
                                {user?.user?.role === 'freelancer' ? (
                                    <>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">5</div>
                                            <div className="text-sm text-gray-600">Active Applications</div>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">12</div>
                                            <div className="text-sm text-gray-600">Completed Projects</div>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">{user?.user?.averageRating.toFixed(1)}</div>
                                            <div className="text-sm text-gray-600">Rating</div>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">{user?.services.length || 0}</div>
                                            <div className="text-sm text-gray-600">Services</div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">{user?.jobs.length || 0}</div>
                                            <div className="text-sm text-gray-600">Active Jobs</div>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">15</div>
                                            <div className="text-sm text-gray-600">Completed Projects</div>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">{user?.user?.averageRating.toFixed(1)}</div>
                                            <div className="text-sm text-gray-600">Rating</div>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <div className="text-2xl font-bold text-blue-600">8</div>
                                            <div className="text-sm text-gray-600">Services Purchased</div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        // Non-logged in user view
                        <>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                                Connect Freelancers
                                <span className="text-blue-600 block">with Clients</span>
                            </h1>

                            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                                The professional platform where talented freelancers meet quality clients.
                                Post jobs, offer services, and build successful partnerships.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Join as Freelancer
                                </button>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-50 transition-colors"
                                >
                                    Hire Talent
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Platform Features
                        </h2>
                        <p className="text-xl text-gray-600">
                            Everything you need for successful freelancing
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center p-6 rounded-lg border hover:shadow-lg transition-shadow">
                                <div className="flex justify-center mb-4">{feature.icon}</div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Services */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Popular Services
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-lg border hover:shadow-lg transition-shadow cursor-pointer"
                            >
                                <div className="flex justify-center mb-4">{service.icon}</div>
                                <h3 className="text-xl text-center font-semibold text-gray-900 mb-2">{service.title}</h3>
                                <p className="text-gray-600 text-center">{service.jobs}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            How It Works
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 gap-12">
                        {/* For Clients */}
                        <div>
                            <h3 className="text-2xl font-bold text-blue-600 mb-6">For Clients</h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Register & Post Jobs</h4>
                                        <p className="text-gray-600">Create your account and post job requirements</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Browse & Buy Services</h4>
                                        <p className="text-gray-600">Find services or review freelancer proposals</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Rate & Review</h4>
                                        <p className="text-gray-600">Complete project and rate your experience</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* For Freelancers */}
                        <div>
                            <h3 className="text-2xl font-bold text-blue-600 mb-6">For Freelancers</h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">1</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Create Profile & Services</h4>
                                        <p className="text-gray-600">Setup your profile and list your services</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">2</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Apply for Jobs</h4>
                                        <p className="text-gray-600">Browse jobs and submit compelling proposals</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">3</span>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Deliver & Get Rated</h4>
                                        <p className="text-gray-600">Complete work and build your reputation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            What Our Users Say
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg border shadow-sm">
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="text-blue-600 fill-current" size={16} />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                                <div>
                                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            {user?.user ? null : (
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to Get Started?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            Join thousands of professionals using FreelanceHub
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => navigate('/signup')} className="bg-white text-blue-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-50 transition-colors">
                                Sign Up Now
                            </button>
                            <button className="border border-white text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors">
                                Know More
                            </button>
                        </div>
                    </div>
                </section>
            )}
            
        </div>
    );
}