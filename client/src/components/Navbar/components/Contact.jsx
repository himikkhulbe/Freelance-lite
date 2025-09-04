import React, { useState } from 'react';
import { Briefcase, Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Headphones } from 'lucide-react';

const Contact = () => {
  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    userType: '',
    message: ''
  });

  // Contact information data
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-blue-600" />,
      title: "Email Us",
      content: "support@freelancelite.com",
      description: "We'll respond within 24 hours"
    },
    // {
    //   icon: <Phone className="w-6 h-6 text-blue-600" />,
    //   title: "Call Us",
    //   content: "+1 (555) 123-4567",
    //   description: "Mon-Fri, 9AM-6PM EST"
    // },
    // {
    //   icon: <MapPin className="w-6 h-6 text-blue-600" />,
    //   title: "Visit Us",
    //   content: "123 Business Ave, Suite 100",
    //   description: "New York, NY 10001"
    // },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "Business Hours",
      content: "Monday - Friday",
      description: "9:00 AM - 6:00 PM EST"
    }
  ];

  // Support categories
  const supportCategories = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Account Support",
      description: "Help with account setup, profile management, and verification issues"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
      title: "Project Assistance",
      description: "Support for project posting, applications, and project management"
    },
    {
      icon: <Headphones className="w-8 h-8 text-blue-600" />,
      title: "Technical Support",
      description: "Platform issues, bugs, and technical troubleshooting"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-blue-600" />,
      title: "General Inquiries",
      description: "Questions about our services, pricing, and platform features"
    }
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      userType: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pt-32 pb-10">
        
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Contact <span className="text-blue-600">Us</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions or need support? We're here to help! Reach out to our team and 
            we'll get back to you as soon as possible.
          </p>
        </section>

        {/* Contact Information Grid */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{info.title}</h3>
                <p className="text-gray-800 font-medium mb-1">{info.content}</p>
                <p className="text-sm text-gray-600">{info.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="grid lg:grid-cols-2 gap-12 mb-16">
          
          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <div className="space-y-6">
              
              {/* Name and Email Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Subject and User Type Row */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Enter subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I am a *
                  </label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  >
                    <option value="">Select user type</option>
                    <option value="client">Client</option>
                    <option value="freelancer">Freelancer</option>
                    <option value="visitor">Visitor</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </div>
          </div>

          {/* Support Categories */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8">How can we help?</h2>
            <div className="space-y-6">
              {supportCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-600">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-2xl p-12 mb-16 shadow-sm">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                How do I get started on Freelance Lite?
              </h3>
              <p className="text-gray-600 mb-6">
                Simply create an account, complete your profile, and start browsing jobs (for freelancers) 
                or post services (for clients).
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                What payment methods do you support?
              </h3>
              <p className="text-gray-600">
                We support all major credit cards, PayPal, and bank transfers for secure transactions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                How do you ensure project quality?
              </h3>
              <p className="text-gray-600 mb-6">
                We have a comprehensive rating system, verified profiles, and dedicated support 
                team to ensure high-quality outcomes.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Is there customer support available?
              </h3>
              <p className="text-gray-600">
                Yes! Our support team is available Monday-Friday, 9AM-6PM EST via email, 
                phone, and live chat.
              </p>
            </div>
          </div>
        </section>

        {/* Response Time Notice */}
        <section className="bg-blue-50 rounded-2xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              We're Here to Help!
            </h3>
            <p className="text-gray-600 text-lg">
              We typically respond to all inquiries within <strong>24 hours</strong>. 
              For urgent matters, please call us directly during business hours.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Contact;