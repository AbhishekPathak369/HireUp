import React, { useState } from 'react'
import { Button } from './ui/button'
import { ChevronDown, Filter } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["All Locations", "Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Position",
        array: ["All Positions", "Frontend Developer", "Backend Developer", "FullStack Developer"]
    }
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    
    const changeHandler = (value) => {
        if (value.includes("All")) {
            setSelectedValue('');
            dispatch(setSearchedQuery(''));
        } else {
            setSelectedValue(value);
            dispatch(setSearchedQuery(value));
        }
        setIsOpen(false);
    }

    return (
        <div className='relative'>
            {/* Dropdown Trigger Button */}
            <Button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gradient-to-r from-[#6A38C2] to-purple-700 hover:from-purple-700 hover:to-[#6A38C2] transition-all duration-300 shadow-md hover:shadow-lg px-5 py-2 font-semibold flex items-center gap-2 text-sm"
            >
                <Filter className='h-4 w-4' />
                Filter
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </Button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className='absolute top-full left-0 mt-2 w-64 bg-white p-3 rounded-xl shadow-2xl border border-gray-100 z-50'>
                    <h1 className='font-bold text-md text-gray-900 mb-2'>Filter Jobs</h1>
                    <hr className='border-gray-200 mb-3' />
                    
                    <div className='space-y-3'>
                        {filterData.map((data, index) => (
                            <div key={index} className='space-y-1'>
                                <h1 className='font-semibold text-sm text-gray-800 bg-purple-50 py-1 px-2 rounded'>
                                    {data.filterType}
                                </h1>
                                <div className='space-y-0'>
                                    {data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`
                                        return (
                                            <div 
                                                key={itemId} 
                                                className='flex items-center space-x-2 p-1 rounded hover:bg-purple-50 transition-all duration-200 cursor-pointer'
                                                onClick={() => changeHandler(item)}
                                            >
                                                <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                                    selectedValue === item 
                                                        ? 'border-[#6A38C2] bg-[#6A38C2]' 
                                                        : 'border-gray-300 hover:border-[#6A38C2]'
                                                }`}>
                                                    {selectedValue === item && (
                                                        <div className='w-1 h-1 rounded-full bg-white'></div>
                                                    )}
                                                </div>
                                                <label className='text-gray-700 hover:text-gray-900 cursor-pointer transition-colors duration-200 text-xs'>
                                                    {item}
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Selected filter display */}
                    {selectedValue && !selectedValue.includes("All") && (
                        <div className='mt-3 p-2 bg-purple-50 rounded border border-purple-200'>
                            <p className='text-xs text-gray-600'>Selected:</p>
                            <p className='font-semibold text-[#6A38C2] text-xs'>{selectedValue}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default FilterCard