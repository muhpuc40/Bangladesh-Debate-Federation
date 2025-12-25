import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUserTie, 
  FaUsers, 
  FaAward, 
  FaCalendarAlt,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaTwitter,
  FaArrowRight
} from 'react-icons/fa';

// Placeholder image URL - replace with actual image URLs
const placeholderImage = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=face";

const ExecutiveCommittee = () => {
  // Committee members data
  const committeeMembers = [
    {
      name: "Dr. Ahmed Rahman",
      description: "Leading the federation with 15+ years of experience in debate education and international relations. Former national debate champion and education policy advisor.",
      image: placeholderImage
    },
    {
      name: "Prof. Sarah Islam",
      description: "Expert in educational development with a focus on debate curriculum design. Has trained over 5000 debaters across Bangladesh.",
      image: placeholderImage
    },
    {
      name: "Mr. Kamal Hossain",
      description: "Oversees daily operations and national debate circuit. Former international debate judge with extensive tournament experience.",
      image: placeholderImage
    },
    {
      name: "Ms. Fatima Akter",
      description: "Financial management expert with background in nonprofit organizations. Ensures sustainable growth of debate initiatives.",
      image: placeholderImage
    },
    {
      name: "Dr. Rahim Khan",
      description: "Develops debate curriculum for schools and universities. PhD in Rhetoric and Communication.",
      image: placeholderImage
    },
    {
      name: "Ms. Nusrat Jahan",
      description: "Manages international partnerships and exchange programs. Fluent in 4 languages with global debate network.",
      image: placeholderImage
    },
    {
      name: "Mr. Arif Chowdhury",
      description: "Former journalist overseeing public relations and media outreach. Expert in digital communication strategies.",
      image: placeholderImage
    }
  ];

  // Committee structure data
  const committeeStructure = [
    {
      title: "Executive Board",
      description: "Overall governance and strategic direction of the federation",
      members: "7 members",
      icon: <FaUserTie className="text-emerald-600 text-2xl" />
    },
    {
      title: "Academic Committee",
      description: "Curriculum development, judge training, and educational standards",
      members: "12 members",
      icon: <FaAward className="text-emerald-600 text-2xl" />
    },
    {
      title: "Events & Tournament Committee",
      description: "Organizes national and regional debate tournaments",
      members: "15 members",
      icon: <FaCalendarAlt className="text-emerald-600 text-2xl" />
    },
    {
      title: "Finance & Resource Committee",
      description: "Financial oversight, fundraising, and resource management",
      members: "8 members",
      icon: <FaBuilding className="text-emerald-600 text-2xl" />
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
              Executive Committee
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Meet the dedicated leaders steering Bangladesh Debate Federation. 
              Our committee comprises experts in education, debate, finance, and 
              international relations working together to promote debate culture nationwide.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="#members" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center border border-emerald-700 hover:shadow-xl hover:-translate-y-1"
              >
                <FaUsers className="mr-2" /> Meet Our Team
              </Link>
              <Link 
                to="#committees" 
                className="bg-white hover:bg-emerald-50 text-emerald-700 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center border border-emerald-300 hover:shadow-xl hover:-translate-y-1"
              >
                <FaBuilding className="mr-2" /> Committee Structure
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Committee Members Section */}
      <section id="members" className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 text-center mb-12">
            Our Leadership Team
          </h2>

          {/* Single Card - First Member (centered) */}
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex flex-col items-center p-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-100 shadow-lg mb-5">
                  <img 
                    src={committeeMembers[0].image} 
                    alt={committeeMembers[0].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-3 text-center">
                  {committeeMembers[0].name}
                </h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  {committeeMembers[0].description}
                </p>
              </div>
            </div>
          </div>

          {/* Two Cards - Second and Third Members */}
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {committeeMembers.slice(1, 3).map((member, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center p-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-100 shadow-lg mb-5">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-900 mb-3 text-center">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 text-center text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Four Cards - Remaining members */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {committeeMembers.slice(3, 7).map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center p-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-100 shadow-lg mb-5">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-900 mb-3 text-center">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

   
    </div>
  );
};

export default ExecutiveCommittee;