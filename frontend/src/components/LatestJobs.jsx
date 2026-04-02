import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { Briefcase, Building2, TrendingUp, Sparkles } from 'lucide-react';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);

    return (
        <div className="bg-[#faf9fe] py-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header with Colorful Elements */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-blue-100 mb-3">
                        <Sparkles className="w-4 h-4 text-orange-500" />
                        <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Fresh Opportunities
                        </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
                            Trending Jobs
                        </span>
                    </h2>
                    
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover the most recent opportunities from{' '}
                        <span className="text-blue-600 font-medium">top companies</span> with{' '}
                        <span className="text-purple-600 font-medium">competitive packages</span>
                    </p>
                </div>

                {/* Colorful Stats Bar */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
                        <Briefcase className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-600">
                            <span className="font-semibold text-blue-600">{allJobs.length}+</span> Active Jobs
                        </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-purple-200 shadow-sm hover:shadow-md transition-all duration-300">
                        <Building2 className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-gray-600">
                            <span className="font-semibold text-purple-600">500+</span> Hiring Companies
                        </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-orange-200 shadow-sm hover:shadow-md transition-all duration-300">
                        <TrendingUp className="w-4 h-4 text-orange-600" />
                        <span className="text-sm text-gray-600">
                            <span className="font-semibold text-orange-600">2.5K+</span> New Jobs
                        </span>
                    </div>
                </div>

                {/* Jobs Grid with Colorful Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {allJobs.length <= 0 ? (
                        <div className="col-span-3 text-center py-12">
                            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 via-purple-100 to-orange-100 rounded-2xl flex items-center justify-center">
                                <Briefcase className="w-8 h-8 text-gray-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">No jobs available</h3>
                            <p className="text-sm text-gray-500">Check back later for new opportunities</p>
                            
                            {/* Animated dots */}
                            <div className="flex justify-center gap-2 mt-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                            </div>
                        </div>
                    ) : (
                        allJobs?.slice(0, 6).map((job, index) => (
                            <div 
                                key={job._id} 
                                className="group relative transform hover:-translate-y-1 transition-all duration-500"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-all duration-500"></div>
                                <div className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                                    <LatestJobCards job={job} />
                                </div>
                                
                                {/* Colorful corner accent */}
                                <div className="absolute top-0 right-0 w-10 h-10 overflow-hidden">
                                    <div className="absolute -top-5 -right-5 w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* View All Button with Gradient */}
                {allJobs.length > 0 && (
                    <div className="text-center mt-8">
                        <button className="group px-6 py-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 text-white rounded-lg font-medium hover:shadow-md transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 text-sm">
                            <span>View All Jobs</span>
                            <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                )}
            </div>

            {/* Decorative bottom gradient */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent mt-10"></div>
        </div>
    );
};

export default LatestJobs;