import React, { useState } from 'react';
import { Users, Target, Globe, Briefcase, Heart, Eye, Building } from 'lucide-react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const AboutUs = () => {
    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);
        formData.append("access_key", "d2f3b81e-2baa-432d-94c7-a1beb08c36fe");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                setResult("Form Submitted Successfully!");
                event.target.reset();
            } else {
                setResult("Error submitting form. Please try again.");
            }
        } catch (error) {
            setResult("Error submitting form. Please try again.");
        }
    };

    const stats = [
        { icon: <Briefcase className="h-6 w-6" />, number: "10,000+", label: "Jobs Posted" },
        { icon: <Users className="h-6 w-6" />, number: "50,000+", label: "Active Users" },
        { icon: <Building className="h-6 w-6" />, number: "2,000+", label: "Companies" },
        { icon: <Globe className="h-6 w-6" />, number: "50+", label: "Cities" }
    ];

    const values = [
        {
            icon: <Target className="h-8 w-8" />,
            title: "Our Mission",
            description: "To bridge the gap between talented professionals and innovative companies, creating meaningful connections that drive growth and success."
        },
        {
            icon: <Eye className="h-8 w-8" />,
            title: "Our Vision",
            description: "To become India&apos;s most trusted job portal, revolutionizing how people find careers and companies discover exceptional talent."
        },
        {
            icon: <Heart className="h-8 w-8" />,
            title: "Our Values",
            description: "Integrity, innovation, and inclusivity guide everything we do. We believe in equal opportunity and transparent processes."
        }
    ];

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-r from-[#6A38C2] to-purple-600 text-white py-20">
                    <div className="max-w-6xl mx-auto px-4 text-center">
                        <h1 className="text-5xl font-bold mb-6">About HireUp</h1>
                        <p className="text-xl max-w-3xl mx-auto leading-relaxed">
                            Transforming the way companies hire and job seekers find their dream careers. 
                            We&apos;re building India&apos;s most efficient and user-friendly job portal.
                        </p>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="bg-gradient-to-r from-[#6A38C2] to-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                                        {stat.icon}
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                                    <p className="text-gray-600">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    HireUp was born from a simple observation: the job search process was broken. 
                                    Companies struggled to find the right talent, while qualified candidates remained undiscovered.
                                </p>
                                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                    Founded in 2024, we set out to create a platform that makes hiring and job searching 
                                    seamless, efficient, and human-centric. Today, we&apos;re proud to connect thousands of 
                                    professionals with life-changing career opportunities.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Our AI-powered matching system, intuitive interface, and commitment to user success 
                                    have made us one of the fastest-growing job portals in India.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-[#6A38C2] to-purple-600 rounded-2xl p-8 text-white">
                                <h3 className="text-2xl font-bold mb-4">What We Offer</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                        Smart job matching algorithm
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                        Company profile verification
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                        Real-time application tracking
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                        Advanced candidate filtering
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                        Mobile-optimized platform
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                        24/7 customer support
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">What Drives Us</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {values.map((value, index) => (
                                <div key={index} className="text-center p-6">
                                    <div className="bg-gradient-to-r from-[#6A38C2] to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-16">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Founder</h2>
                        <div className="flex justify-center">
                            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
                                {/* Real Image Area */}
                                <div className="relative w-32 h-32 mx-auto mb-6">
                                    <img 
                                        src="https://github.com/AbhishekPathak369.png" 
                                        alt="Abhishek Pathak"
                                        className="w-full h-full rounded-full object-cover border-4 border-[#6A38C2] shadow-lg"
                                        onError={(e) => {
                                            // Fallback to gradient if image fails to load
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                    {/* Fallback that shows only if image fails */}
                                    <div 
                                        className="w-full h-full bg-gradient-to-r from-[#6A38C2] to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg absolute top-0 left-0"
                                        style={{ display: 'none' }}
                                    >
                                        AP
                                    </div>
                                </div>
                                
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Abhishek Pathak</h3>
                                <p className="text-[#6A38C2] font-semibold mb-3">Founder & CEO</p>
                                <p className="text-gray-600 mb-3">ABES Engineering College, Ghaziabad</p>
                                <p className="text-gray-500 mb-4">Uttar Pradesh</p>
                                <p className="text-gray-600 leading-relaxed">
                                    Passionate about connecting talent with opportunities and revolutionizing 
                                    the job market through innovative technology solutions.
                                </p>
                                
                                {/* Social Links */}
                                <div className="flex justify-center gap-4 mt-6">
                                    <a 
                                        href="https://github.com/AbhishekPathak369" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-[#6A38C2] transition-colors p-2 hover:bg-gray-100 rounded-lg"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.165 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.635.24 2.865.12 3.165.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                                        </svg>
                                    </a>
                                    <a 
                                        href="https://x.com/HiiAnsh65815" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-[#6A38C2] transition-colors p-2 hover:bg-gray-100 rounded-lg"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z"/>
                                        </svg>
                                    </a>
                                    <a 
                                        href="https://www.linkedin.com/in/abhishekpathakofficial" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-[#6A38C2] transition-colors p-2 hover:bg-gray-100 rounded-lg"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Connect With Our Team</h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Have questions or want to learn more about HireUp? Reach out to us and we&apos;ll get back to you shortly.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                            <form onSubmit={onSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your email address"
                                    />
                                </div>

                                {/* Message Field */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6A38C2] focus:border-transparent transition-all duration-200 resize-none"
                                        placeholder="Tell us how we can help you..."
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-[#6A38C2] to-purple-600 hover:from-purple-600 hover:to-[#6A38C2] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    Send Message
                                </button>

                                {/* Result Message */}
                                {result && (
                                    <div className={`text-center p-3 rounded-lg ${
                                        result.includes("Successfully") 
                                            ? "bg-green-100 text-green-700 border border-green-200" 
                                            : result.includes("Sending")
                                            ? "bg-blue-100 text-blue-700 border border-blue-200"
                                            : "bg-red-100 text-red-700 border border-red-200"
                                    }`}>
                                        {result}
                                    </div>
                                )}

                                {/* Hidden Fields */}
                                <input type="hidden" name="subject" value="New Contact Form Submission - HireUp" />
                                <input type="hidden" name="from_name" value="HireUp Website" />
                            </form>

                            {/* Additional Contact Info */}
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                    <div className="flex flex-col items-center">
                                        <div className="bg-blue-100 p-3 rounded-full mb-3">
                                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-gray-900">Call Us</h4>
                                        <p className="text-gray-600">+91 7017331435</p>
                                    </div>
                                    
                                    <div className="flex flex-col items-center">
                                        <div className="bg-green-100 p-3 rounded-full mb-3">
                                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-gray-900">Email Us</h4>
                                        <p className="text-gray-600">pathakabhi290@gmail.com</p>
                                    </div>
                                    
                                    <div className="flex flex-col items-center">
                                        <div className="bg-purple-100 p-3 rounded-full mb-3">
                                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-semibold text-gray-900">Visit Us</h4>
                                        <p className="text-gray-600">Ghaziabad, Uttar Pradesh</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>
        </div>
    );
};

export default AboutUs;