import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, FileText, Download, FileWarning } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import Footer from './shared/Footer'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    const hasResume = user?.profile?.resume;

    // SIMPLIFIED: Cloudinary URLs work directly
    const handleOpenResume = () => {
        if (hasResume) {
            // Cloudinary PDF URLs work directly in browser
            window.open(user.profile.resume, '_blank');
        }
    };

    // Check if the resume is a PDF file
    const isPDFResume = () => {
        if (!hasResume) return false;
        const resumeName = user?.profile?.resumeOriginalName || '';
        const resumeUrl = user.profile.resume || '';
        
        // Check by file extension or URL
        return resumeName.toLowerCase().endsWith('.pdf') || 
               resumeUrl.toLowerCase().includes('.pdf');
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            <div className='max-w-4xl mx-auto my-6 px-4'>
                {/* Profile Card */}
                <div className='bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-6'>
                    <div className='flex justify-between items-start mb-6'>
                        <div className='flex items-center gap-4'>
                            <Avatar className="h-20 w-20 border-2 border-purple-100">
                                <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                            </Avatar>
                            <div>
                                <h1 className='font-bold text-xl text-gray-900'>{user?.fullname}</h1>
                                <p className="text-gray-600 text-sm max-w-md">{user?.profile?.bio || "No bio added"}</p>
                            </div>
                        </div>
                        <Button 
                            onClick={() => setOpen(true)} 
                            className="bg-[#6A38C2] hover:bg-purple-700 text-white text-sm px-4 py-2"
                        >
                            <Pen size={16} className="mr-2" />
                            Edit
                        </Button>
                    </div>
                    
                    {/* Contact Info */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                        <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                            <Mail size={18} className="text-gray-500" />
                            <div>
                                <p className="font-medium text-gray-900 text-sm">{user?.email}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                            <Contact size={18} className="text-gray-500" />
                            <div>
                                <p className="font-medium text-gray-900 text-sm">{user?.phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Skills Section */}
                    <div className='mb-6'>
                        <h1 className="font-bold text-gray-900 mb-3">Skills</h1>
                        <div className='flex items-center gap-2 flex-wrap'>
                            {
                                user?.profile?.skills?.length > 0 ? 
                                    user.profile.skills.map((item, index) => (
                                        <Badge 
                                            key={index} 
                                            className="bg-purple-100 text-purple-800 border-purple-200 text-xs px-3 py-1"
                                        >
                                            {item}
                                        </Badge>
                                    )) : 
                                    <span className="text-gray-500 text-sm">No skills added</span>
                            }
                        </div>
                    </div>
                    
                    {/* Resume Section */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <Label className="font-bold text-gray-900">Resume</Label>
                            <div className="flex items-center gap-2">
                                <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">
                                    PDF Only
                                </Badge>
                                {hasResume && !isPDFResume() && (
                                    <Badge className="bg-red-100 text-red-800 border-red-200 text-xs">
                                        Invalid Format
                                    </Badge>
                                )}
                            </div>
                        </div>
                        
                        {
                            hasResume ? (
                                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            {isPDFResume() ? (
                                                <FileText className="text-green-500" size={20} />
                                            ) : (
                                                <FileWarning className="text-red-500" size={20} />
                                            )}
                                            <div>
                                                <p className="font-medium text-gray-900 text-sm">
                                                    {user?.profile?.resumeOriginalName}
                                                </p>
                                                <p className={`text-xs mt-1 ${isPDFResume() ? 'text-green-600' : 'text-red-600'}`}>
                                                    {isPDFResume() ? '✓ Valid PDF Resume' : '⚠ Non-PDF file - Please upload PDF format'}
                                                </p>
                                            </div>
                                        </div>
                                        <Button 
                                            onClick={handleOpenResume}
                                            size="sm"
                                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                                        >
                                            <Download size={14} />
                                            {isPDFResume() ? 'View PDF' : 'Open File'}
                                        </Button>
                                    </div>
                                    
                                    {/* Warning for non-PDF files */}
                                    {!isPDFResume() && (
                                        <div className="mt-3 p-3 bg-red-50 border border-red-100 rounded-md">
                                            <div className="flex items-start gap-2">
                                                <FileWarning className="text-red-500 mt-0.5" size={16} />
                                                <div>
                                                    <p className="text-red-700 text-sm font-medium">Invalid File Format</p>
                                                    <p className="text-red-600 text-xs">
                                                        This is not a PDF file. Please update your resume with a PDF file for better compatibility.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <FileText className="text-gray-400" size={20} />
                                            <div>
                                                <p className="text-gray-500 text-sm">No resume uploaded</p>
                                                <p className="text-gray-400 text-xs mt-1">Upload a PDF file (max 10MB)</p>
                                            </div>
                                        </div>
                                        <Button 
                                            onClick={() => setOpen(true)}
                                            size="sm"
                                            variant="outline"
                                            className="border-blue-200 text-blue-700 hover:bg-blue-50"
                                        >
                                            Upload PDF
                                        </Button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                
                {/* Applied Jobs Section */}
                <div className='bg-white rounded-xl shadow-md border border-gray-100 p-6'>
                    <h1 className='font-bold text-lg text-gray-900 mb-4'>Applied Jobs</h1>
                    <AppliedJobTable />
                </div>
            </div>
            
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
            <Footer/>
        </div>
    )
}

export default Profile