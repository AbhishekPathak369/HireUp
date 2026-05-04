# HireUp - MERN Stack Job Portal 🚀

<div align="center">
<p align="center">
  <img src="https://komarev.com/ghpvc/?username=abhishekpathak369&label=Profile%20Views&color=0e75b6&style=flat" alt="profile views" />
</p>
**Connecting Talent with Opportunity**  
*A modern job portal built with MERN stack featuring AI-powered career guidance*

[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)](https://mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-orange)](https://jwt.io/)

</div>

## 📖 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🎯 About The Project

HireUp is a full-stack job portal application designed to bridge the gap between job seekers and employers. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), it provides a seamless platform for students to find their dream jobs and for recruiters to discover top talent.

### Why HireUp?

- 🤖 **AI-Powered Career Assistant** - Get instant career guidance
- 👥 **Dual Role System** - Separate interfaces for students and recruiters
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔒 **Secure Authentication** - JWT-based secure access
- ⚡ **Real-time Updates** - Instant application status tracking

## ✨ Features

### 🎓 For Job Seekers
- **Smart Job Search** - Advanced filtering and search functionality
- **One-Click Applications** - Quick and easy job application process
- **Application Tracking** - Real-time status updates (Pending/Accepted/Rejected)
- **Profile Management** - Comprehensive profile with skills and resume upload
- **AI Career Coach** - 24/7 career guidance and interview tips

### 💼 For Recruiters
- **Company Registration** - Easy company onboarding process
- **Job Posting** - Create and manage job listings
- **Applicant Management** - View and manage all job applications
- **Status Updates** - Update application status with one click
- **Candidate Dashboard** - Comprehensive view of all applicants

### 🌟 Platform Features
- **Secure Authentication** - JWT with httpOnly cookies
- **File Upload** - Cloudinary integration for resumes and profiles
- **Real-time Chatbot** - Groq AI-powered career assistance
- **Responsive UI** - Tailwind CSS with beautiful components
- **Dual Language Support** - English and Hinglish chatbot

## 📸 Screenshots

### Homepage
<img width="1901" height="909" alt="image" src="https://github.com/user-attachments/assets/631937f4-a100-4836-92d8-30df9c0daa01" />
*Beautiful landing page with featured jobs and categories*

### Job Listings
<img width="1796" height="892" alt="image" src="https://github.com/user-attachments/assets/d03f1e35-ef2c-468c-a6be-7cfc83c38d9b" />
*Comprehensive job listings with search and filters*

### User Profile
<img width="1900" height="905" alt="image" src="https://github.com/user-attachments/assets/9a8b4298-df4e-4fb7-84dd-0bc96f4b55f4" />
*User profile with skills, applications, and resume management*

### Company Portal
<img width="1793" height="910" alt="image" src="https://github.com/user-attachments/assets/5c8826c9-360e-4d10-84c7-961eab218504" />
*Recruiter dashboard for company and job management*

### AI Chatbot
<img width="583" height="830" alt="image" src="https://github.com/user-attachments/assets/2a6dc9cc-6436-41f3-9731-0e154d3bb1a0" />

 *AI-powered career assistant with voice support*

### FAQ Section
<img width="1791" height="915" alt="image" src="https://github.com/user-attachments/assets/5b3e07b4-dd0d-4030-b148-20314b8edcb5" />
*Comprehensive help and support section*

### About Us
<img width="1725" height="906" alt="image" src="https://github.com/user-attachments/assets/8ead9913-ee00-42ce-8105-65ffa4b2a1f6" />

*Learn more about HireUp's mission and team*

## 🛠 Tech Stack

### Frontend
- **React.js** - UI framework
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **Sonner** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **Cloudinary** - File storage

### External Services
- **Groq AI** - Chatbot intelligence
- **Cloudinary** - Image and file storage
- **MongoDB Atlas** - Cloud database
- **Render** - Deployment platform

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Cloudinary account
- Groq AI API key

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hireup.git
   cd hireup
2.Backend Setup

bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Add your environment variables
Frontend Setup

bash
cd ../frontend
npm install

# Create .env file
cp .env.example .env
# Add your environment variables
Environment Variables

Backend (.env)

env
PORT=8000
MONGO_URI=your_mongodb_atlas_uri
SECRET_KEY=your_jwt_secret
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
Frontend (.env)

env
VITE_USER_API_END_POINT=http://localhost:8000/api/v1/user
VITE_JOB_API_END_POINT=http://localhost:8000/api/v1/job
VITE_APPLICATION_API_END_POINT=http://localhost:8000/api/v1/application
VITE_COMPANY_API_END_POINT=http://localhost:8000/api/v1/company
Run the application

bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
Access the application

Frontend: http://localhost:5173

Backend API: http://localhost:8000

📚 API Documentation
Authentication Endpoints
Method	Endpoint	Description
POST	/api/v1/user/register	User registration

POST	/api/v1/user/login	User login

POST	/api/v1/user/profile/update	Update user profile

GET	/api/v1/user/logout	User logout

Job Endpoints
Method	Endpoint	Description
GET	/api/v1/job/get	Get all jobs

POST	/api/v1/job/post	Create new job

GET	/api/v1/job/getadminjobs	Get admin jobs

GET	/api/v1/job/get/:id	Get job by ID

Application Endpoints
Method	Endpoint	Description
GET	/api/v1/application/apply/:id	Apply for job

GET	/api/v1/application/get	Get user applications

GET	/api/v1/application/:id/applicants	Get job applicants

POST	/api/v1/application/status/:id/update	Update application status

Company Endpoints
Method	Endpoint	Description
POST	/api/v1/company/register	Register company

GET	/api/v1/company/get	Get user companies

GET	/api/v1/company/get/:id	Get company by ID

PUT	/api/v1/company/update/:id	Update company

🌐 Deployment
Production Deployment
The application is deployed on Render with the following configuration:

Frontend: Static site serving from Express

Backend: Node.js service on Render

Database: MongoDB Atlas

File Storage: Cloudinary CDN

Environment Setup for Production
env
# Production Environment Variables
NODE_ENV=production
CLIENT_URL=https://your-frontend-url.com
🤝 Contributing
We love your input! We want to make contributing to HireUp as easy and transparent as possible.

Development Workflow
Fork the Project

Create your Feature Branch (git checkout -b feature/AmazingFeature)

Commit your Changes (git commit -m 'Add some AmazingFeature')

Push to the Branch (git push origin feature/AmazingFeature)

Open a Pull Request

Code Standards
Follow React best practices

Use meaningful commit messages

Test all features before submitting

Update documentation as needed

📄 License
Distributed under the MIT License. See LICENSE for more information.

📞 Contact
Your Name - Abhishek Pathak

Project Link: https://hireup-abhi.onrender.com/

🙏 Acknowledgments
React - Frontend framework

Node.js - Backend runtime

MongoDB - Database

Tailwind CSS - Styling

Groq AI - AI capabilities

Cloudinary - File storage

<div align="center">
⭐ Don't forget to star this repository if you find it helpful!
Built with ❤️ using the MERN Stack

</div> 
