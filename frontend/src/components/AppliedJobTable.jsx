import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const {allAppliedJobs} = useSelector(store=>store.job);
    
    const getStatusColor = (status) => {
        switch(status) {
            case 'accepted':
                return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
        }
    }

    return (
        <div className='bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden'>
            <Table>
                <TableCaption className='py-4 text-gray-500 bg-gray-50'>A list of your applied jobs</TableCaption>
                <TableHeader className='bg-gradient-to-r from-purple-50 to-indigo-50'>
                    <TableRow className='hover:bg-transparent'>
                        <TableHead className='font-bold text-gray-900 py-4'>Date Applied</TableHead>
                        <TableHead className='font-bold text-gray-900 py-4'>Job Role</TableHead>
                        <TableHead className='font-bold text-gray-900 py-4'>Company</TableHead>
                        <TableHead className="text-right font-bold text-gray-900 py-4">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-8">
                                    <div className='flex flex-col items-center justify-center text-gray-500'>
                                        <div className='text-4xl mb-2'>📝</div>
                                        <p className='text-lg font-medium'>You haven't applied any job yet.</p>
                                        <p className='text-sm'>Start applying to see your applications here</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className='hover:bg-purple-50/50 transition-colors duration-200 group'>
                                <TableCell className='font-medium text-gray-700 py-4 group-hover:text-gray-900'>
                                    {appliedJob?.createdAt?.split("T")[0]}
                                </TableCell>
                                <TableCell className='font-semibold text-gray-800 py-4 group-hover:text-[#6A38C2] transition-colors duration-200'>
                                    {appliedJob.job?.title}
                                </TableCell>
                                <TableCell className='text-gray-600 py-4 group-hover:text-gray-800 transition-colors duration-200'>
                                    {appliedJob.job?.company?.name}
                                </TableCell>
                                <TableCell className="text-right py-4">
                                    <Badge 
                                        className={`font-semibold px-3 py-1 border-2 transition-all duration-300 ${getStatusColor(appliedJob.status)}`}
                                    >
                                        {appliedJob.status.charAt(0).toUpperCase() + appliedJob.status.slice(1)}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable