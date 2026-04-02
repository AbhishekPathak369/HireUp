import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Footer from './shared/Footer';
import Navbar from './shared/Navbar';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div>
             <Navbar/>
        <div className='max-w-7xl mx-auto my-10 px-4'>
           
            {/* Header Section */}
            <div className='flex items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-200 shadow-sm'>
                <div>
                    <h1 className='font-bold text-2xl text-gray-900'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className='text-blue-700 font-bold bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors duration-300' variant="ghost">
                            {singleJob?.postion} Positions
                        </Badge>
                        <Badge className='text-[#F83002] font-bold bg-red-50 border-red-200 hover:bg-red-100 transition-colors duration-300' variant="ghost">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className='text-[#7209b7] font-bold bg-purple-50 border-purple-200 hover:bg-purple-100 transition-colors duration-300' variant="ghost">
                            {singleJob?.salary}LPA
                        </Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg px-8 py-6 text-lg font-semibold transition-all duration-300 ${
                        isApplied 
                            ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400 shadow-none' 
                            : 'bg-gradient-to-r from-[#6A38C2] to-purple-600 hover:from-purple-600 hover:to-[#6A38C2] hover:shadow-xl hover:scale-105 shadow-lg'
                    }`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            {/* Job Description Section */}
            <div className='bg-white rounded-2xl shadow-lg border border-gray-100 mt-6 overflow-hidden'>
                <h1 className='border-b-2 border-b-purple-200 font-bold text-xl py-5 px-6 bg-gradient-to-r from-white to-purple-50 text-gray-800'>
                    Job Description
                </h1>
                <div className='my-6 px-6 space-y-4'>
                    <div className='flex items-center py-2 hover:bg-purple-50 rounded-lg px-3 transition-colors duration-200'>
                        <h1 className='font-bold text-gray-700 min-w-32'>Role:</h1>
                        <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span>
                    </div>
                    <div className='flex items-center py-2 hover:bg-purple-50 rounded-lg px-3 transition-colors duration-200'>
                        <h1 className='font-bold text-gray-700 min-w-32'>Location:</h1>
                        <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span>
                    </div>
                    <div className='flex items-start py-2 hover:bg-purple-50 rounded-lg px-3 transition-colors duration-200'>
                        <h1 className='font-bold text-gray-700 min-w-32'>Description:</h1>
                        <span className='pl-4 font-normal text-gray-800 flex-1'>{singleJob?.description}</span>
                    </div>
                    <div className='flex items-center py-2 hover:bg-purple-50 rounded-lg px-3 transition-colors duration-200'>
                        <h1 className='font-bold text-gray-700 min-w-32'>Experience:</h1>
                        <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span>
                    </div>
                    <div className='flex items-center py-2 hover:bg-purple-50 rounded-lg px-3 transition-colors duration-200'>
                        <h1 className='font-bold text-gray-700 min-w-32'>Salary:</h1>
                        <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span>
                    </div>
                    <div className='flex items-center py-2 hover:bg-purple-50 rounded-lg px-3 transition-colors duration-200'>
                        <h1 className='font-bold text-gray-700 min-w-32'>Total Applicants:</h1>
                        <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span>
                    </div>
                    <div className='flex items-center py-2 hover:bg-purple-50 rounded-lg px-3 transition-colors duration-200'>
                        <h1 className='font-bold text-gray-700 min-w-32'>Posted Date:</h1>
                        <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span>
                    </div>
                </div>
            </div>
            
        </div><Footer/></div>
    )
}

export default JobDescription