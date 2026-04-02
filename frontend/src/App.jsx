import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import FAQ from './components/faq'
import AboutUs from './components/Aboutus'
import HireUpAI from './components/HireUpAI' 
import Chatbot from '/Chatbot'
import { useState } from 'react'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/faq",
    element: <FAQ />
  },
  {
    path: "/about",
    element: <AboutUs />
  },

  {
    path: "/truepath",
    element: <HireUpAI />
  },
  // admin routes
  {
    path:"/admin/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },
])

function App() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div>
      <RouterProvider router={appRouter} />
      
      {/* Global Chatbot Widget */}
      <div className="global-chatbot-widget">
        {/* Chatbot Toggle Button */}
        <button 
          className={`chatbot-toggle-btn ${showChatbot ? 'active' : ''}`}
          onClick={() => setShowChatbot(!showChatbot)}
          aria-label="Toggle chatbot"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path 
              d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" 
              fill="currentColor"
            />
          </svg>
        </button>

        {/* Chatbot Container */}
        {showChatbot && (
          <div className="global-chatbot-container">
            <Chatbot />
          </div>
        )}
      </div>
    </div>
  )
}

export default App