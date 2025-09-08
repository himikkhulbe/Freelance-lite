import React from "react";
import {
  Users,
  Briefcase,
  Award,
  TrendingUp,
  CheckCircle,
  Loader,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

const About = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  // Features data array for easy management
  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Connect Talent",
      description:
        "Bridge the gap between skilled freelancers and businesses seeking expertise",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-blue-600" />,
      title: "Quality Projects",
      description:
        "Access to diverse, high-quality projects across multiple industries",
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Trusted Platform",
      description:
        "Secure payments, verified profiles, and comprehensive project management",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      title: "Growth Focused",
      description:
        "Tools and resources to help freelancers and businesses grow together",
    },
  ];

  // Benefits for different user types
  const clientBenefits = [
    "Access to 50K+ verified freelancers",
    "Project management tools",
    "Secure payment protection",
    "24/7 customer support",
  ];

  const freelancerBenefits = [
    "Find quality projects quickly",
    "Competitive compensation",
    "Skill development resources",
    "Professional profile showcase",
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
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pt-32 pb-10">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            About <span className="text-blue-600">Freelance Lite</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing the way businesses and freelancers connect.
            Our platform creates meaningful partnerships that drive success for
            both clients and independent professionals.
          </p>
        </section>

        {/* Mission Statement */}
        <section className="bg-white rounded-2xl p-12 mb-16 shadow-sm">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Freelance Lite bridges the gap between talented freelancers and
                businesses seeking expertise. We provide a secure, efficient
                platform where quality meets opportunity.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our goal is to empower independent professionals while helping
                businesses access the skills they need to thrive in today's
                competitive marketplace.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-8 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600 font-medium">Success Rate</div>
              <div className="text-sm text-gray-500 mt-2">
                Client satisfaction across all projects
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose Freelance Lite?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Platform Stats */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-white mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Growing Community
          </h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Freelancers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25K+</div>
              <div className="text-blue-100">Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150K+</div>
              <div className="text-blue-100">Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Benefits for Everyone
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* For Clients */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <Briefcase className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">
                  For Clients
                </h3>
              </div>
              <ul className="space-y-4">
                {clientBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Freelancers */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center mb-6">
                <Star className="w-8 h-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">
                  For Freelancers
                </h3>
              </div>
              <ul className="space-y-4">
                {freelancerBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        {user?.user ? null : (
          <section className="text-center bg-white rounded-2xl p-12 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of successful freelancers and businesses who trust
              Freelance Lite for their project needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/signup")}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Join Now
              </button>
              {/* <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Post a Project
            </button> */}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default About;
