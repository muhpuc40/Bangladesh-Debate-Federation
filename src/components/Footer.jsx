import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaYoutube, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaUsers,
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaArrowUp
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialMedia = [
    { platform: 'Facebook', icon: <FaFacebook />, link: 'https://www.facebook.com/BangladeshDebateFedaration' },
    { platform: 'Facebook Group', icon: <FaUsers />, link: 'https://www.facebook.com/groups/8307242668/' },
    { platform: 'YouTube', icon: <FaYoutube />, link: 'https://www.youtube.com/@bangladeshdebatefederation' },
    { platform: 'Twitter', icon: <FaTwitter />, link: 'https://twitter.com' },
    { platform: 'LinkedIn', icon: <FaLinkedin />, link: 'www.linkedin.com/company/bangladesh-debate-federation-bdf' },
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
              <h2 className="text-lg md:text-xl font-bold text-emerald-800 text-center sm:text-left">
                Bangladesh Debate Federation
              </h2>
            </Link>

            <div className="flex justify-center sm:justify-start space-x-3">
              {socialMedia.map((social) => (
                <a
                  key={social.platform}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-all duration-300 border border-emerald-200 hover:scale-110 text-sm"
                  title={social.platform}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Empty middle column */}
          <div className="hidden lg:block"></div>

          {/* Contact Info */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

            {/* Head Office */}
            <div className="mb-5 w-full">
              <div className="flex items-center justify-center lg:justify-start mb-2">
                <div className="bg-emerald-100 p-1.5 rounded-full mr-2">
                  <FaMapMarkerAlt className="text-emerald-600 text-xs" />
                </div>
                <h4 className="font-bold text-emerald-800 text-sm md:text-base">
                  Head Office
                </h4>
              </div>
              <p className="text-gray-600 text-xs md:text-sm lg:pl-8">
                House: 128, Road: 04, Mohammadia Housing Society, Mohammadpur, Dhaka
              </p>
            </div>

            {/* Contact */}
            <div className="w-full">
              <div className="flex items-center justify-center lg:justify-start mb-2">
                <div className="bg-emerald-100 p-1.5 rounded-full mr-2">
                  <FaPhone className="text-emerald-600 text-xs" />
                </div>
                <h4 className="font-bold text-emerald-800 text-sm md:text-base">
                  Contact
                </h4>
              </div>
              <p className="text-gray-600 text-xs md:text-sm lg:pl-8">
                Phone: +880 1719 142953<br />
                Phone: +880 1717 666166<br />
                Phone: +880 1777 408630
              </p>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-emerald-100 pt-4 md:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-500 text-xs md:text-sm text-center md:text-left">
              &copy; {currentYear} Bangladesh Debate Federation. All rights reserved.
            </p>

            <div className="flex gap-4 text-xs md:text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-emerald-700">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-emerald-700">
                Terms of Service
              </Link>
              <Link to="/developers-info" className="text-gray-500 hover:text-emerald-700">
                Developers Info
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 bg-emerald-600 hover:bg-emerald-700 text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-40"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;