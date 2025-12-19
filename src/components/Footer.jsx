import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaYoutube, 
  FaTwitter, 
  FaInstagram, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaClock,
  FaGraduationCap,
  FaArrowUp
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Quick Links': [
      { path: '/', label: 'Home' },
      { path: '/about', label: 'About Us' },
      { path: '/events', label: 'Events Calendar' },
      { path: '/registration', label: 'Register Now' },
      { path: '/results', label: 'Latest Results' },
    ],
    'Resources': [
      { path: '/rules', label: 'Debate Formats' },
      { path: '/resources', label: 'Training Materials' },
      { path: '/resources#tutorials', label: 'Video Tutorials' },
      { path: '/resources#sample-motions', label: 'Sample Motions' },
      { path: '/resources#glossary', label: 'Debate Glossary' },
    ],
  };

  const socialMedia = [
    { platform: 'Facebook', icon: <FaFacebook />, link: 'https://facebook.com' },
    { platform: 'YouTube', icon: <FaYoutube />, link: 'https://youtube.com' },
    { platform: 'Twitter', icon: <FaTwitter />, link: 'https://twitter.com' },
    { platform: 'Instagram', icon: <FaInstagram />, link: 'https://instagram.com' },
  ];

  return (
    <footer className="bg-white border-t border-emerald-100 pt-6 md:pt-8 pb-4 md:pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex flex-col items-center sm:items-start space-y-2 mb-4">
              <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
                <img 
                  src="https://i.ibb.co/Ldwswy4m/logo.png" 
                  alt="Bangladesh Debate Federation Logo" 
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-lg md:text-xl font-bold text-emerald-800 leading-tight">
                  Bangladesh Debate Federation
                </h2>
                <p className="text-emerald-600 text-xs md:text-sm mt-1">
                  National Platform for Debate Excellence
                </p>
              </div>
            </Link>
            <p className="text-gray-600 mb-4 text-xs md:text-sm text-center sm:text-left leading-relaxed">
              Established to promote debate culture across Bangladesh.
            </p>
            <div className="flex justify-center sm:justify-start space-x-3">
              {socialMedia.map((social) => (
                <a
                  key={social.platform}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300 border border-emerald-200 hover:scale-110 text-sm"
                  title={social.platform}
                  aria-label={`Follow us on ${social.platform}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links & Contact Section */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Links Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Object.entries(footerLinks).map(([category, links]) => (
                  <div key={category} className="w-full">
                    <h3 className="text-sm md:text-base font-bold mb-3 text-emerald-800 border-b border-emerald-200 pb-2">
                      {category}
                    </h3>
                    <ul className="space-y-2">
                      {links.map((link) => (
                        <li key={link.path}>
                          <Link
                            to={link.path}
                            className="text-gray-600 hover:text-emerald-700 hover:pl-2 transition-all duration-300 flex items-center text-xs md:text-sm group"
                          >
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2 hidden sm:block group-hover:scale-125 transition-transform duration-300"></span>
                            <span className="group-hover:font-medium transition-all duration-300">
                              {link.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Contact Information - Resources এর পাশে */}
              <div className="space-y-4 md:space-y-5">
                <div>
                  <div className="flex items-center mb-2">
                    <div className="bg-emerald-100 p-1.5 rounded-full mr-2 group hover:bg-emerald-200 transition-all duration-300">
                      <FaMapMarkerAlt className="text-emerald-600 text-xs group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h4 className="font-bold text-emerald-800 text-sm md:text-base">
                      Head Office
                    </h4>
                  </div>
                  <p className="text-gray-600 text-xs md:text-sm pl-8">
                    BDF Tower, 123 Debate Road<br />
                    Dhaka 1212, Bangladesh
                  </p>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <div className="bg-emerald-100 p-1.5 rounded-full mr-2 group hover:bg-emerald-200 transition-all duration-300">
                      <FaPhone className="text-emerald-600 text-xs group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h4 className="font-bold text-emerald-800 text-sm md:text-base">
                      Contact
                    </h4>
                  </div>
                  <p className="text-gray-600 text-xs md:text-sm pl-8">
                    Phone: +880 2 1234 5678<br />
                    Email: info@debatefederation.org
                  </p>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <div className="bg-emerald-100 p-1.5 rounded-full mr-2 group hover:bg-emerald-200 transition-all duration-300">
                      <FaClock className="text-emerald-600 text-xs group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h4 className="font-bold text-emerald-800 text-sm md:text-base">
                      Office Hours
                    </h4>
                  </div>
                  <p className="text-gray-600 text-xs md:text-sm pl-8">
                    Sun-Thu: 9:00 AM - 5:00 PM<br />
                    Fri-Sat: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accreditation - রিমুভ করিনি */}
        <div className="mb-4 md:mb-6 text-center">
          <div className="inline-flex items-center bg-emerald-50 px-3 md:px-4 py-2 rounded-full border border-emerald-100 hover:border-emerald-200 transition-all duration-300">
            <FaGraduationCap className="text-emerald-600 mr-2 text-sm" />
            <p className="text-emerald-700 text-xs md:text-sm">
              Recognized by Ministry of Education | Member of Asian Debate Council
            </p>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="border-t border-emerald-100 pt-4 md:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div>
              <p className="text-gray-500 text-xs md:text-sm text-center md:text-left">
                &copy; {currentYear} Bangladesh Debate Federation. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <Link to="/privacy" className="text-gray-500 hover:text-emerald-700 transition-all duration-300 text-xs md:text-sm hover:font-medium">
                Privacy Policy
              </Link>
              <span className="text-gray-300 hidden md:inline-block">|</span>
              <Link to="/terms" className="text-gray-500 hover:text-emerald-700 transition-all duration-300 text-xs md:text-sm hover:font-medium">
                Terms of Service
              </Link>
              <span className="text-gray-300 hidden md:inline-block">|</span>
              <Link to="/code-of-conduct" className="text-gray-500 hover:text-emerald-700 transition-all duration-300 text-xs md:text-sm hover:font-medium">
                Code of Conduct
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 bg-emerald-600 hover:bg-emerald-700 text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-40 border border-emerald-700 hover:scale-110 text-sm"
        title="Back to Top"
        aria-label="Back to top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;