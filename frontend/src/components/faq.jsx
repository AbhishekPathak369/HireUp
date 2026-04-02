import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, Briefcase, User, Building, Shield, Mail } from 'lucide-react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleEmailContact = () => {
        window.location.href = 'mailto:support@hireup.com?subject=Help%20Request&body=Hello%20HireUp%20Support,';
    };

    const faqCategories = {
        jobSeekers: [
            {
                question: "How do I apply for jobs on HireUp?",
                answer: "Browse job listings, click on positions that match your skills, and use the 'Apply Now' button. Ensure your profile is complete with resume and skills for better chances."
            },
            {
                question: "What should I include in my HireUp profile?",
                answer: "Complete your profile with professional photo, detailed work experience, education, relevant skills, portfolio links, and a compelling bio to attract employers."
            },
            {
                question: "How can I increase my chances of getting hired?",
                answer: "Keep your profile updated, tailor applications to each job, showcase relevant skills, maintain an active presence, and follow up on applications professionally."
            },
            {
                question: "Can I track my job applications?",
                answer: "Yes, visit the 'Applied Jobs' section in your profile to track application status, view responses, and manage your job search progress."
            },
            {
                question: "What types of employment are available?",
                answer: "We offer full-time, part-time, contract, remote, hybrid, and internship opportunities across various industries and experience levels."
            },
            {
                question: "How do I know if a company viewed my application?",
                answer: "You'll receive notifications when employers view your profile or application. Check your dashboard for real-time updates on application status."
            }
        ],
        employers: [
            {
                question: "How do I post a job on HireUp?",
                answer: "Register as an employer, verify your company, then use the 'Post Job' feature to create detailed listings with requirements, benefits, and application process."
            },
            {
                question: "What features help in screening candidates?",
                answer: "Use our advanced filtering by skills, experience, education, and location. View candidate profiles, resumes, and application history for informed decisions."
            },
            {
                question: "How can I attract quality candidates?",
                answer: "Create detailed job descriptions, showcase company culture, highlight benefits, respond promptly to applications, and maintain a professional company profile."
            },
            {
                question: "What's the process for interviewing candidates?",
                answer: "Schedule interviews directly through the platform, use our messaging system for communication, and track candidate progress through the hiring pipeline."
            }
        ],
        technical: [
            {
                question: "What file formats are supported for resumes?",
                answer: "We support PDF, DOC, DOCX files up to 5MB. For best results, use PDF format to preserve formatting across all devices."
            },
            {
                question: "How do I reset my password?",
                answer: "Click 'Forgot Password' on login page, enter your registered email, and follow the secure link sent to create a new password."
            },
            {
                question: "Is my personal data secure on HireUp?",
                answer: "Yes, we use industry-standard encryption, secure servers, and strict privacy policies to protect your personal and professional information."
            },
            {
                question: "Can I use HireUp on mobile devices?",
                answer: "Absolutely! Our platform is fully responsive and works seamlessly on smartphones, tablets, and desktop computers."
            }
        ],
        account: [
            {
                question: "How do I delete my HireUp account?",
                answer: "Go to Account Settings, select 'Delete Account', confirm your choice. Note: This action is permanent and removes all your data."
            },
            {
                question: "Can I have both job seeker and employer accounts?",
                answer: "You need separate accounts for job seeking and employer functionalities. Use different email addresses for each type of account."
            },
            {
                question: "How do I update my contact information?",
                answer: "Navigate to your Profile Settings, edit your contact details, and save changes. Keep this updated for important notifications."
            }
        ]
    };

    const allFAQs = [
        ...faqCategories.jobSeekers.map(faq => ({ ...faq, category: 'jobSeekers' })),
        ...faqCategories.employers.map(faq => ({ ...faq, category: 'employers' })),
        ...faqCategories.technical.map(faq => ({ ...faq, category: 'technical' })),
        ...faqCategories.account.map(faq => ({ ...faq, category: 'account' }))
    ];

    const filteredFAQs = activeCategory === 'all' 
        ? allFAQs 
        : allFAQs.filter(faq => faq.category === activeCategory);

    const getCategoryIcon = (category) => {
        switch(category) {
            case 'jobSeekers': return <User className="h-5 w-5" />;
            case 'employers': return <Building className="h-5 w-5" />;
            case 'technical': return <Shield className="h-5 w-5" />;
            case 'account': return <Mail className="h-5 w-5" />;
            default: return <HelpCircle className="h-5 w-5" />;
        }
    };

    const getCategoryColor = (category) => {
        switch(category) {
            case 'jobSeekers': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'employers': return 'bg-green-100 text-green-800 border-green-200';
            case 'technical': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'account': return 'bg-orange-100 text-orange-800 border-orange-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="flex justify-center items-center gap-3 mb-4">
                            <div className="bg-gradient-to-r from-[#6A38C2] to-purple-600 p-3 rounded-2xl">
                                <HelpCircle className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-purple-700 bg-clip-text text-transparent">
                                Help Center
                            </h2>
                        </div>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                            Get answers to all your questions about finding jobs, hiring talent, and using HireUp effectively.
                        </p>
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-3 mb-8">
                        <button
                            onClick={() => setActiveCategory('all')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                                activeCategory === 'all' 
                                    ? 'bg-[#6A38C2] text-white border-[#6A38C2] shadow-lg' 
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-[#6A38C2] hover:text-[#6A38C2]'
                            }`}
                        >
                            <Briefcase className="h-4 w-4" />
                            All Questions
                        </button>
                        <button
                            onClick={() => setActiveCategory('jobSeekers')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                                activeCategory === 'jobSeekers' 
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600 hover:text-blue-600'
                            }`}
                        >
                            <User className="h-4 w-4" />
                            Job Seekers
                        </button>
                        <button
                            onClick={() => setActiveCategory('employers')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                                activeCategory === 'employers' 
                                    ? 'bg-green-600 text-white border-green-600 shadow-lg' 
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-green-600 hover:text-green-600'
                            }`}
                        >
                            <Building className="h-4 w-4" />
                            Employers
                        </button>
                        <button
                            onClick={() => setActiveCategory('technical')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                                activeCategory === 'technical' 
                                    ? 'bg-purple-600 text-white border-purple-600 shadow-lg' 
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-purple-600 hover:text-purple-600'
                            }`}
                        >
                            <Shield className="h-4 w-4" />
                            Technical
                        </button>
                        <button
                            onClick={() => setActiveCategory('account')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                                activeCategory === 'account' 
                                    ? 'bg-orange-600 text-white border-orange-600 shadow-lg' 
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-orange-600 hover:text-orange-600'
                            }`}
                        >
                            <Mail className="h-4 w-4" />
                            Account
                        </button>
                    </div>

                    {/* FAQ List */}
                    <div className="grid gap-4">
                        {filteredFAQs.map((faq, index) => (
                            <div 
                                key={index}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                <button
                                    className="flex justify-between items-start w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-purple-100"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <div className="flex items-start gap-4 flex-1">
                                        <div className={`p-2 rounded-lg mt-1 ${getCategoryColor(faq.category)}`}>
                                            {getCategoryIcon(faq.category)}
                                        </div>
                                        <div className="flex-1">
                                            <span className="font-semibold text-gray-900 text-lg leading-relaxed">
                                                {faq.question}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0 ml-4 mt-1">
                                        {openIndex === index ? (
                                            <ChevronUp className="h-6 w-6 text-[#6A38C2]" />
                                        ) : (
                                            <ChevronDown className="h-6 w-6 text-gray-400" />
                                        )}
                                    </div>
                                </button>
                                
                                {openIndex === index && (
                                    <div className="px-6 pb-6 ml-12">
                                        <div className="border-t border-gray-100 pt-4">
                                            <p className="text-gray-600 leading-relaxed text-lg">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Contact Support */}
                    <div className="text-center mt-16 p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
                        <div className="bg-gradient-to-r from-[#6A38C2] to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Mail className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            Still need help?
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Contact our support team directly via email for personalized assistance.
                        </p>
                        <button 
                            onClick={handleEmailContact}
                            className="bg-[#6A38C2] hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                        >
                            <Mail className="h-5 w-5" />
                            Email Support Team
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default FAQ