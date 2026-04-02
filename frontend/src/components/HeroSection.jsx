
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Sparkles, Briefcase, Building2, Users, ArrowRight } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="bg-[#faf9fe]">
            {/* Soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-orange-50/30 pointer-events-none"></div>
            
            <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Animated Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-blue-100 mb-6 group hover:shadow-md transition-all duration-300">
                        <Sparkles className="w-4 h-4 text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-sm font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
                            India's Most Trusted Job Platform
                        </span>
                    </div>

                    {/* Main Heading - Blue Dominant with Color Accents */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
                        <span className="text-gray-800">Find Your</span>
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
                            Dream Career
                        </span>
                    </h1>
                    
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                        Join <span className="font-semibold text-blue-600">10,000+</span> professionals who found their perfect role through our{' '}
                        <span className="font-semibold bg-gradient-to-r from-purple-600 to-orange-600 bg-clip-text text-transparent">
                            AI-powered matching
                        </span>
                    </p>

                    {/* Search Bar with Colorful Focus */}
                    <div className="max-w-2xl mx-auto mb-8">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 rounded-xl blur opacity-0 group-hover:opacity-70 transition-all duration-500"></div>
                            <div className="relative flex items-center bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                                <Search className="absolute left-4 h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                                <input
                                    type="text"
                                    placeholder="Try 'Frontend Developer', 'Product Manager', 'Data Scientist'..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                                    className="w-full pl-11 pr-36 py-4 bg-transparent rounded-lg focus:outline-none text-gray-700 placeholder:text-gray-400"
                                />
                                <Button 
                                    onClick={searchJobHandler}
                                    className="absolute right-1.5 px-6 py-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 hover:from-blue-700 hover:via-purple-700 hover:to-orange-700 text-white rounded-md font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
                                >
                                    Search
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>

                        {/* Popular Searches with Colorful Tags */}
                        <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
                            <span className="text-sm text-gray-500">Popular:</span>
                            {[
                                { name: 'Frontend', color: 'blue' },
                                { name: 'Backend', color: 'purple' },
                                { name: 'Full Stack', color: 'orange' },
                                { name: 'Data Science', color: 'green' }
                            ].map((term, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setQuery(term.name);
                                        searchJobHandler();
                                    }}
                                    className={`px-3 py-1.5 bg-${term.color}-50 text-${term.color}-600 rounded-full text-sm hover:shadow-md transition-all duration-300 hover:scale-105 border border-${term.color}-200`}
                                >
                                    {term.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Colorful Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                        <div className="group bg-white p-5 rounded-xl border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center justify-center gap-3">
                                <div className="p-2.5 bg-blue-50 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <Briefcase className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xl font-bold text-gray-800">50K+</p>
                                    <p className="text-xs text-gray-500">Active Jobs</p>
                                </div>
                            </div>
                        </div>

                        <div className="group bg-white p-5 rounded-xl border border-purple-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center justify-center gap-3">
                                <div className="p-2.5 bg-purple-50 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <Building2 className="w-5 h-5 text-purple-600" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xl font-bold text-gray-800">5K+</p>
                                    <p className="text-xs text-gray-500">Companies</p>
                                </div>
                            </div>
                        </div>

                        <div className="group bg-white p-5 rounded-xl border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-center justify-center gap-3">
                                <div className="p-2.5 bg-orange-50 rounded-lg group-hover:scale-110 transition-transform duration-300">
                                    <Users className="w-5 h-5 text-orange-600" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xl font-bold text-gray-800">100K+</p>
                                    <p className="text-xs text-gray-500">Placements</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection