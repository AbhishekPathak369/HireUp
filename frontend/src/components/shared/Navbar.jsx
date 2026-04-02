import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Building2, Briefcase, Home, Search, HelpCircle, Users, Bot } from 'lucide-react' // ✅ Added Bot icon
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

// Import your logo from shared folder
import logo from './logo.png'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/95'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                {/* Enhanced Branding with PNG Logo */}
                <Link to="/" className='flex items-center gap-3 group'>
                    <div className='relative'>
                        <img
                            src={logo}
                            alt="HireUp Logo"
                            className="w-10 h-10 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 object-cover"
                        />
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-2xl font-bold bg-gradient-to-r from-gray-900 to-[#6A38C2] bg-clip-text text-transparent leading-6'>
                            HireUp
                        </h1>
                        <span className='text-xs text-gray-500 font-medium'>Find Your Dream Job</span>
                    </div>
                </Link>

                <div className='flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-6'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li>
                                        <Link to="/admin/companies" className='flex items-center gap-2 text-gray-700 hover:text-[#6A38C2] transition-all duration-200 group'>
                                            <div className='p-2 bg-gray-100 rounded-lg group-hover:bg-purple-100 transition-colors'>
                                                <Building2 size={18} className='text-gray-600 group-hover:text-[#6A38C2]' />
                                            </div>
                                            <span className='font-semibold'>Companies</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/jobs" className='flex items-center gap-2 text-gray-700 hover:text-[#6A38C2] transition-all duration-200 group'>
                                            <div className='p-2 bg-gray-100 rounded-lg group-hover:bg-purple-100 transition-colors'>
                                                <Briefcase size={18} className='text-gray-600 group-hover:text-[#6A38C2]' />
                                            </div>
                                            <span className='font-semibold'>Jobs</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/about" className='flex items-center gap-2 text-gray-700 hover:text-[#6A38C2] transition-all duration-200 group'>
                                            <div className='p-2 bg-gray-100 rounded-lg group-hover:bg-purple-100 transition-colors'>
                                                <Users size={18} className='text-gray-600 group-hover:text-[#6A38C2]' />
                                            </div>
                                            <span className='font-semibold'>About</span>
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/" className='flex items-center gap-2 text-gray-700 hover:text-[#6A38C2] transition-all duration-200 group'>
                                            <div className='p-2 bg-gray-100 rounded-lg group-hover:bg-purple-100 transition-colors'>
                                                <Home size={18} className='text-gray-600 group-hover:text-[#6A38C2]' />
                                            </div>
                                            <span className='font-semibold'>Home</span>
                                        </Link>
                                    </li>
                                    {/* ✅ ADD HIREUP AI LINK HERE */}
                                    <li>
                                        <Link to="/truepath" className='flex items-center gap-2 text-gray-700 hover:text-[#6A38C2] transition-all duration-200 group'>
                                            <div className='p-2 bg-gray-100 rounded-lg group-hover:bg-purple-100 transition-colors'>
                                                <Bot size={18} className='text-gray-600 group-hover:text-[#6A38C2]' />
                                            </div>
                                            <span className='font-semibold'>TruePath</span>
                                        </Link>
                                    </li>
                                   
                                    <li>
                                        <Link to="/jobs" className='flex items-center gap-2 text-gray-700 hover:text-[#6A38C2] transition-all duration-200 group'>
                                            <div className='p-2 bg-gray-100 rounded-lg group-hover:bg-purple-100 transition-colors'>
                                                <Briefcase size={18} className='text-gray-600 group-hover:text-[#6A38C2]' />
                                            </div>
                                            <span className='font-semibold'>Jobs</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/browse" className='flex items-center gap-2 text-gray-700 hover:text-[#6A38C2] transition-all duration-200 group'>
                                            <div className='p-2 bg-gray-100 rounded-lg group-hover:bg-purple-100 transition-colors'>
                                                <Search size={18} className='text-gray-600 group-hover:text-[#6A38C2]' />
                                            </div>
                                            <span className='font-semibold'>Browse</span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/faq" className='flex items-center gap-2 text-gray-700 hover:text-[#6A38C2] transition-all duration-200 group'>
                                            <div className='p-2 bg-gray-100 rounded-lg group-hover:bg-purple-100 transition-colors'>
                                                <HelpCircle size={18} className='text-gray-600 group-hover:text-[#6A38C2]' />
                                            </div>
                                            <span className='font-semibold'>FAQ</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/about" className='flex items-center gap-2 text-gray-700 hover:text-[#6A38C2] transition-all duration-200 group'>
                                            <div className='p-2 bg-gray-100 rounded-lg group-hover:bg-purple-100 transition-colors'>
                                                <Users size={18} className='text-gray-600 group-hover:text-[#6A38C2]' />
                                            </div>
                                            <span className='font-semibold'>About</span>
                                        </Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-3'>
                                <Link to="/login">
                                    <Button variant="outline" className="border-gray-300 hover:border-[#6A38C2] hover:text-[#6A38C2] transition-all duration-200 font-semibold px-6">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-gradient-to-r from-[#6A38C2] to-purple-600 hover:from-purple-600 hover:to-[#6A38C2] text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-6 hover:scale-105">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <div className='relative cursor-pointer group'>
                                        <Avatar className="border-2 border-gray-200 group-hover:border-[#6A38C2] transition-all duration-300 shadow-sm group-hover:shadow-md">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                        </Avatar>
                                        <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-64 p-4 shadow-xl border border-gray-100 rounded-xl bg-white/95 backdrop-blur-sm">
                                    <div className='space-y-4'>
                                        <div className='flex gap-3 items-start'>
                                            <Avatar className="h-12 w-12 border-2 border-purple-100">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                            </Avatar>
                                            <div className='flex-1 min-w-0'>
                                                <h4 className='font-semibold text-gray-900 truncate'>{user?.fullname}</h4>
                                                <p className='text-sm text-gray-500 truncate'>{user?.email}</p>
                                                <p className='text-xs text-gray-400 mt-1 capitalize'>{user?.role}</p>
                                            </div>
                                        </div>

                                        <div className='border-t border-gray-100 pt-3 space-y-2'>
                                            {
                                                user && user.role === 'student' && (
                                                    <Button
                                                        variant="ghost"
                                                        className="w-full justify-start text-gray-700 hover:text-[#6A38C2] hover:bg-purple-50 transition-all duration-200 font-medium"
                                                        asChild
                                                    >
                                                        <Link to="/profile" className='flex items-center gap-3'>
                                                            <User2 size={18} />
                                                            View Profile
                                                        </Link>
                                                    </Button>
                                                )
                                            }
                                            <Button
                                                onClick={logoutHandler}
                                                variant="ghost"
                                                className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200 font-medium"
                                            >
                                                <LogOut size={18} />
                                                Logout
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar