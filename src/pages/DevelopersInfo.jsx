import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe, FaStar, FaCode, FaPalette, FaRocket, FaGraduationCap } from 'react-icons/fa';

const DevelopersInfo = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const developers = [
    {
      id: 1,
      name: "Minhaj Uddin Hassan",
      // role: "Frontend Developer & UI/UX Designer",
      // bio: "Creating beautiful and functional user interfaces with modern web technologies.",
      image: "dev/2.jpg",
      degree: "Bachelor of Science (Engineering) in Computer Science and Engineering",
      social: {
        github: "https://github.com/muhpuc40",
        linkedin: "https://www.linkedin.com/in/minhajuddinhassan/?originalSubdomain=bd",
        email: "mdhassan49.muh@gmail.com",
        portfolio: "https://muhpuc40.github.io/Minhaj-Uddin-Hassan/"
      },
      color: "emerald",
      icon: <FaPalette className="text-xl" />
    },
    {
      id: 2,
      name: "Md Ebtesham Azam",
      // role: "Full Stack Developer",
      // bio: "Building robust backend systems and scalable applications with cutting-edge technologies.",
      image: "dev/1.jpg",
      degree: "Bachelor of Science (Engineering) in Computer Science and Engineering",
      social: {
        github: "https://github.com/ebteshampuc44",
        linkedin: "https://www.linkedin.com/in/mohammad-ebtesham-4619aa396/",
        email: "mdebteshamazam@gmail.com",
        portfolio: ""
      },
      color: "blue",
      icon: <FaCode className="text-xl" />
    }
  ];

  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      border: 'border-emerald-200',
      light: 'bg-emerald-100',
      dark: 'bg-emerald-600',
      gradient: 'from-emerald-400 to-emerald-600'
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-200',
      light: 'bg-blue-100',
      dark: 'bg-blue-600',
      gradient: 'from-blue-400 to-blue-600'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 pt-16 md:pt-20 pb-8 md:pb-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section with Animation */}
        <div className="text-center mb-12 md:mb-16 transform transition-all duration-700">
          {/* <div className="inline-block mb-4 animate-bounce-slow">
            <FaRocket className="text-4xl text-emerald-600" />
          </div> */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 animate-fade-in-up">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Developer Team</span>
          </h1>
          {/* <div className="mt-6 max-w-3xl mx-auto">
            <p className="text-gray-600 text-lg leading-relaxed animate-fade-in-up animation-delay-300">
              The Bangladesh Debate Federation website was crafted with passion and precision by our dedicated developer team, 
              blending cutting-edge technology with elegant design.
            </p>
          </div> */}
        </div>

        {/* Developers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {developers.map((developer) => {
            const colors = colorClasses[developer.color];
            
            return (
              <div 
                key={developer.id}
                className="relative group"
                onMouseEnter={() => setHoveredCard(developer.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Animated Glow Effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${colors.gradient} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`}></div>
                
                {/* Main Card */}
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2">
                  {/* Decorative Ribbon */}
                  <div className="absolute top-0 right-0">
                    {/* <div className={`${colors.dark} text-white px-4 py-1 text-sm font-semibold rounded-bl-lg flex items-center gap-2`}>
                      {developer.icon}
                      <span>{developer.role.split('&')[0].trim()}</span>
                    </div> */}
                  </div>

                  {/* Developer Image with Unique Frame */}
                  <div className="relative h-72 md:h-80 overflow-hidden bg-gradient-to-br from-gray-100 to-white">
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="w-full h-full" style={{
                        backgroundImage: `radial-gradient(${colors.text} 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                      }}></div>
                    </div>
                    
                    {/* Image Container */}
                    <div className="relative h-full flex items-center justify-center p-8">
                      {/* Floating Elements */}
                      <div className={`absolute top-4 left-4 w-16 h-16 ${colors.light} rounded-full animate-float-slow opacity-50`}></div>
                      <div className={`absolute bottom-4 right-4 w-12 h-12 ${colors.light} rounded-full animate-float opacity-30`}></div>
                      
                      {/* Main Image with Frame */}
                      <div className="relative w-48 h-48 md:w-56 md:h-56">
                        {/* Outer Glow Ring */}
                        <div className={`absolute inset-0 ${colors.light} rounded-full blur-md opacity-50 group-hover:opacity-70 transition duration-500`}></div>
                        
                        {/* Image Container */}
                        <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl transform transition-transform duration-500 group-hover:scale-105">
                          <img
                            src={developer.image}
                            alt={developer.name}
                            className="w-full h-full object-cover"
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        
                        {/* Floating Badge */}
                        <div className={`absolute -bottom-2 -right-2 ${colors.dark} text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                          <FaStar />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Developer Info */}
                  <div className="p-6 md:p-8 relative">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="w-full h-full" style={{
                        backgroundImage: `linear-gradient(45deg, ${colors.text} 25%, transparent 25%, transparent 75%, ${colors.text} 75%, ${colors.text})`,
                        backgroundSize: '20px 20px'
                      }}></div>
                    </div>

                    <div className="relative">
                      <div className="mb-4 text-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">
                          {developer.name}
                        </h3>
                        {/* <p className={`${colors.text} font-medium`}>
                          {developer.role}
                        </p> */}
                      </div>

                      <p className="text-gray-600 mb-6 leading-relaxed text-center">
                        {developer.bio}
                      </p>

                      {/* Degree Information with SVG Icon */}
                      <div className="mb-6 flex items-start gap-3 bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-100">
                        <div className={`${colors.light} p-3 rounded-lg flex-shrink-0`}>
                          <FaGraduationCap className={`text-2xl ${colors.text}`} />
                        </div>
                        <p className="text-gray-700 font-medium leading-relaxed">
                          {developer.degree}
                        </p>
                      </div>

                      {/* Social Links with Hover Effects */}
                      <div className="border-t border-gray-100 pt-6">
                        <h4 className="font-bold text-gray-800 mb-3 text-center">Connect With Me</h4>
                        <div className="flex justify-center space-x-4">
                          {[
                            { icon: FaGithub, href: developer.social.github, color: 'bg-gray-100 hover:bg-gray-900 text-gray-700 hover:text-white', title: 'GitHub' },
                            { icon: FaLinkedin, href: developer.social.linkedin, color: 'bg-blue-100 hover:bg-blue-700 text-blue-700 hover:text-white', title: 'LinkedIn' },
                            { icon: FaEnvelope, href: `mailto:${developer.social.email}`, color: 'bg-red-100 hover:bg-red-700 text-red-700 hover:text-white', title: 'Email' },
                            { icon: FaGlobe, href: developer.social.portfolio, color: 'bg-purple-100 hover:bg-purple-700 text-purple-700 hover:text-white', title: 'Portfolio' }
                          ].map((social, index) => (
                            <a
                              key={index}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`${social.color} w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:rotate-6`}
                              title={social.title}
                            >
                              <social.icon className="text-lg" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default DevelopersInfo;