import { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Footer from './shared/Footer';

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();
    
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch])

    const filteredJobs = allJobs.filter(job => {
        if (!searchedQuery) return true;
        
        const searchTerm = searchedQuery.toLowerCase();
        
        // Safe search - handle cases where position might not be a string
        const titleMatch = job.title?.toLowerCase().includes(searchTerm) || false;
        const companyMatch = job.company?.name?.toLowerCase().includes(searchTerm) || false;
        const positionMatch = String(job.position || '').toLowerCase().includes(searchTerm);
        
        return titleMatch || companyMatch || positionMatch;
    });

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-8'>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                        {searchedQuery ? `Search Results for "${searchedQuery}"` : 'All Jobs'}
                    </h1>
                    <p className='text-gray-600'>
                        {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
                    </p>
                </div>
                
                {filteredJobs.length === 0 ? (
                    <div className='text-center py-16'>
                        <div className='text-gray-400 text-6xl mb-4'>🔍</div>
                        <h3 className='text-xl font-semibold text-gray-700 mb-2'>No jobs found</h3>
                        <p className='text-gray-500'>
                            {searchedQuery ? `No jobs matching "${searchedQuery}"` : 'No jobs available at the moment'}
                        </p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {filteredJobs.map((job) => (
                            <Job key={job._id} job={job}/>
                        ))}
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    )
}

export default Browse