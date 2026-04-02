import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, FileText, AlertCircle } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const [fileError, setFileError] = useState('');
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(', ') || "",
        file: null
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setFileError(''); // Reset error
        
        if (file) {
            // Validate file type
            const allowedTypes = ['application/pdf'];
        const maxSize = 10 * 1024 * 1024; // 10MB (matches backend)
            
            // Check if file is PDF
            if (!allowedTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.pdf')) {
                setFileError('Only PDF files are allowed');
                e.target.value = ''; // Clear the file input
                setInput({ ...input, file: null });
                return;
            }
            
            // Check file size
            if (file.size > maxSize) {
                setFileError('File size must be less than 5MB');
                e.target.value = ''; // Clear the file input
                setInput({ ...input, file: null });
                return;
            }
        }
        
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Validate file before submission if a new file is selected
        if (input.file) {
            const allowedTypes = ['application/pdf'];
            if (!allowedTypes.includes(input.file.type) && !input.file.name.toLowerCase().endsWith('.pdf')) {
                toast.error('Please upload a PDF file only');
                return;
            }
        }
        
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
                setFileError(''); // Clear error on success
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Update failed");
        } finally{
            setLoading(false);
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="fullname" className="text-right">Name</Label>
                                <Input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="phoneNumber" className="text-right">Phone</Label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="bio" className="text-right">Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                    placeholder="Tell us about yourself"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="skills" className="text-right">Skills</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="col-span-3"
                                    placeholder="HTML, CSS, JavaScript, React"
                                />
                            </div>
                            <div className='grid grid-cols-4 items-center gap-4'>
                                <Label htmlFor="file" className="text-right">Resume</Label>
                                <div className="col-span-3 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <FileText className="text-red-500" size={16} />
                                        <span className="text-sm text-gray-600">PDF only</span>
                                    </div>
                                    <Input
                                        id="file"
                                        name="file"
                                        type="file"
                                        accept=".pdf,application/pdf"
                                        onChange={fileChangeHandler}
                                        className="w-full"
                                    />
                                    {fileError && (
                                        <div className="flex items-center gap-1 text-red-500 text-xs">
                                            <AlertCircle size={12} />
                                            <span>{fileError}</span>
                                        </div>
                                    )}
                                    <p className="text-xs text-gray-500">
                                        Upload your resume in PDF format (max 10MB)
                                    </p>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            {
                                loading ? (
                                    <Button disabled className="w-full my-4">
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Updating...
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full my-4">
                                        Update Profile
                                    </Button>
                                )
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog