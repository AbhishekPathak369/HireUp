import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Code, Database, Palette, Globe, BarChart, Cpu } from 'lucide-react';

const categories = [
    { name: "Frontend Developer", icon: Code, color: "blue", bg: "bg-blue-50", textColor: "text-blue-600", borderColor: "border-blue-200", hoverBg: "hover:bg-blue-100/50", gradient: "from-blue-500" },
    { name: "Backend Developer", icon: Database, color: "purple", bg: "bg-purple-50", textColor: "text-purple-600", borderColor: "border-purple-200", hoverBg: "hover:bg-purple-100/50", gradient: "from-purple-500" },
    { name: "Data Science", icon: BarChart, color: "green", bg: "bg-green-50", textColor: "text-green-600", borderColor: "border-green-200", hoverBg: "hover:bg-green-100/50", gradient: "from-green-500" },
    { name: "UI/UX Designer", icon: Palette, color: "pink", bg: "bg-pink-50", textColor: "text-pink-600", borderColor: "border-pink-200", hoverBg: "hover:bg-pink-100/50", gradient: "from-pink-500" },
    { name: "Full Stack", icon: Globe, color: "orange", bg: "bg-orange-50", textColor: "text-orange-600", borderColor: "border-orange-200", hoverBg: "hover:bg-orange-100/50", gradient: "from-orange-500" },
    { name: "DevOps", icon: Cpu, color: "cyan", bg: "bg-cyan-50", textColor: "text-cyan-600", borderColor: "border-cyan-200", hoverBg: "hover:bg-cyan-100/50", gradient: "from-cyan-500" },
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="bg-[#faf9fe] py-12">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header with Gradient */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
                            Popular Categories
                        </span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore opportunities across{' '}
                        <span className="text-blue-600 font-medium">tech</span>,{' '}
                        <span className="text-purple-600 font-medium">design</span>, and{' '}
                        <span className="text-orange-600 font-medium">more</span>
                    </p>
                </div>

                <Carousel className="w-full max-w-5xl mx-auto">
                    <CarouselContent className="-ml-4">
                        {categories.map((cat, index) => {
                            const Icon = cat.icon;
                            return (
                                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                    <div className="group relative">
                                        <div className={`absolute -inset-0.5 bg-gradient-to-r ${cat.gradient} via-purple-500 to-orange-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-all duration-500`}></div>
                                        <button
                                            onClick={() => searchJobHandler(cat.name)}
                                            className={`relative w-full h-auto py-5 px-4 bg-white border border-gray-200 rounded-xl transition-all duration-300 flex flex-col items-center gap-2 shadow-sm hover:shadow ${cat.hoverBg}`}
                                            style={{ backgroundColor: 'white' }}
                                        >
                                            <div className={`p-2.5 ${cat.bg} rounded-xl group-hover:scale-105 transition-transform duration-300`}>
                                                <Icon className={`w-5 h-5 ${cat.textColor}`} />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-800">
                                                {cat.name}
                                            </span>
                                            <span className="text-xs text-gray-400">1.2k+ open positions</span>
                                            
                                            {/* Colorful dot indicator */}
                                            <div className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full ${cat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                                        </button>
                                    </div>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    <CarouselPrevious className="-left-12 bg-white border border-gray-200 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300" />
                    <CarouselNext className="-right-12 bg-white border border-gray-200 hover:border-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300" />
                </Carousel>

                {/* Decorative gradient line */}
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full mx-auto mt-8"></div>
            </div>
        </div>
    );
};

export default CategoryCarousel;