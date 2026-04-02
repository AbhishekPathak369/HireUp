import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Browse', path: '/browse' },
    { name: 'FAQ', path: '/faq' },
    { name: 'About', path: '/about' }
  ];

  const companyLinks = [
    { name: 'Terms of Service', path: '/about' },
    { name: 'Contact Us', path: '/about' },
    { name: 'Careers', path: '/jobs' }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3 group">
              <div className="w-8 h-8 bg-gradient-to-br from-[#6A38C2] to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-[#6A38C2] bg-clip-text text-transparent">
                  HireUp
                </h2>
                <span className="text-xs text-gray-500 font-medium">Find Your Dream Job</span>
              </div>
            </Link>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              Connecting talented professionals with amazing career opportunities. 
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4 text-[#6A38C2]" />
                <span className="text-sm">pathakabhi290@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="h-4 w-4 text-[#6A38C2]" />
                <span className="text-sm">+91 7017331435</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4 text-[#6A38C2]" />
                <span className="text-sm">Ghaziabad, UP</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-[#6A38C2] transition-colors duration-200 hover:translate-x-1 transform block text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-gray-600 hover:text-[#6A38C2] transition-colors duration-200 hover:translate-x-1 transform block text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-lg">Connect With Us</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Follow us on social media for updates.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              <a 
                href="https://github.com/AbhishekPathak369" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-100 hover:bg-[#6A38C2] text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.997.108-.776.418-1.305.76-1.605-2.665-.305-5.466-1.334-5.466-5.933 0-1.31.47-2.38 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.005-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.045.138 3.003.404 2.28-1.552 3.285-1.23 3.285-1.23.655 1.652.244 2.873.12 3.176.77.84 1.23 1.91 1.23 3.22 0 4.61-2.807 5.625-5.48 5.922.43.37.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .32.216.694.825.576C20.565 21.795 24 17.297 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

              <a 
                href="https://x.com/HiiAnsh65815" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-100 hover:bg-black text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z"/>
                </svg>
              </a>

              <a 
                href="https://www.linkedin.com/in/abhishekpathakofficial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-100 hover:bg-blue-600 text-gray-600 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-3 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="flex items-center gap-2 text-gray-600 mb-2 md:mb-0">
              <span>© {currentYear} HireUp. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="h-3 w-3 text-red-500 fill-current" /> by Abhishek Pathak
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-gray-600">
              <Link to="/privacy" className="hover:text-[#6A38C2] transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-[#6A38C2] transition-colors">
                Terms
              </Link>
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;