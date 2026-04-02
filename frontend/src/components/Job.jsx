import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        if (!mongodbTime) return "Recently";
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        const daysAgo = Math.floor(timeDifference/(1000*24*60*60));
        return daysAgo === 0 ? "Today" : `${daysAgo} days ago`;
    }
    
    return (
        <div className='p-6 rounded-xl shadow-lg bg-white border border-gray-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300 group'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt)}</p>
                <Button variant="outline" className="rounded-full hover:bg-purple-50 hover:text-[#6A38C2] transition-colors duration-300" size="icon">
                    <Bookmark className='h-4 w-4' />
                </Button>
            </div>

            <div className='flex items-center gap-3 my-4'>
                <Button className="p-5 hover:scale-105 transition-transform duration-300" variant="outline" size="icon">
                    <Avatar className='h-12 w-12'>
                        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-semibold text-lg text-gray-900 group-hover:text-[#6A38C2] transition-colors duration-300'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div className='mb-4'>
                <h1 className='font-bold text-xl my-2 text-gray-800'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-2'>{job?.description}</p>
            </div>
            
            <div className='flex items-center gap-2 mt-4 mb-5'>
                <Badge className='text-blue-700 font-bold bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors duration-300' variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className='text-[#F83002] font-bold bg-red-50 border-red-200 hover:bg-red-100 transition-colors duration-300' variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className='text-[#7209b7] font-bold bg-purple-50 border-purple-200 hover:bg-purple-100 transition-colors duration-300' variant="ghost">
                    {job?.salary}LPA
                </Badge>
            </div>
            
            <div className='flex items-center gap-3 mt-4'>
                <Button 
                    onClick={() => navigate(`/description/${job?._id}`)} 
                    variant="outline"
                    className="flex-1 hover:border-[#6A38C2] hover:text-[#6A38C2] transition-colors duration-300"
                >
                    Details
                </Button>
             
            </div>
        </div>
    )
}

Job.propTypes = {
    job: PropTypes.shape({
        _id: PropTypes.string,
        createdAt: PropTypes.string,
        company: PropTypes.shape({
            logo: PropTypes.string,
            name: PropTypes.string
        }),
        title: PropTypes.string,
        description: PropTypes.string,
        position: PropTypes.string,
        jobType: PropTypes.string,
        salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
}

export default Job