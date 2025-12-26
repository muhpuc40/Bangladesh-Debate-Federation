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
  FaArrowRight,
  FaGoogle, // Gmail আইকোন
  FaFacebook, // Facebook আইকোন
} from 'react-icons/fa';

const ExecutiveCommittee = () => {
  // Committee members data with unique images and social links for each
  const committeeMembers = [
    {
      name: "Md Saifuddin Munna",
      position: "President",
      description: "",
      image: "https://admin.puc.ac.bd/ProfilePictures/Munna_eee_Saifuddin%20Munna.JPG",
      gmail: "munna.puc@gmail.com",
      facebook: "https://www.facebook.com/share/1K5Sydesw9/",
      linkedin: "https://www.linkedin.com/in/mohammed-saifuddin-munna-aab67a10a/"
    },
    {
      name: "Ms. Ayesha Rahman",
      position: "Vice President",
      description: "Experienced debate coach with 15+ years in competitive debating. Champion of National Debate Championship 2010.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      gmail: "ayesha.rahman@example.com",
      facebook: "https://facebook.com/ayesha.rahman",
      linkedin: "https://linkedin.com/in/ayesharahman"
    },
    {
      name: "Mr. Kamal Hossain",
      position: "Secretary General",
      description: "Oversees daily operations and national debate circuit. Former international debate judge with extensive tournament experience.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      gmail: "kamal.hossain@example.com",
      facebook: "https://facebook.com/kamal.hossain",
      linkedin: "https://linkedin.com/in/kamalhossain"
    },
    {
      name: "Ms. Fatima Akter",
      position: "Treasurer",
      description: "Financial management expert with background in nonprofit organizations. Ensures sustainable growth of debate initiatives.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b786d4b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      gmail: "fatima.akter@example.com",
      facebook: "https://facebook.com/fatima.akter",
      linkedin: "https://linkedin.com/in/fatimaakter"
    },
    {
      name: "Dr. Rahim Khan",
      position: "Academic Director",
      description: "Develops debate curriculum for schools and universities. PhD in Rhetoric and Communication.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      gmail: "rahim.khan@example.com",
      facebook: "https://facebook.com/rahim.khan",
      linkedin: "https://linkedin.com/in/drrahimkhan"
    },
    {
      name: "Ms. Nusrat Jahan",
      position: "International Affairs Director",
      description: "Manages international partnerships and exchange programs. Fluent in 4 languages with global debate network.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      gmail: "nusrat.jahan@example.com",
      facebook: "https://facebook.com/nusrat.jahan",
      linkedin: "https://linkedin.com/in/nusratjahan"
    },
    {
      name: "Mr. Arif Chowdhury",
      position: "Public Relations Director",
      description: "Former journalist overseeing public relations and media outreach. Expert in digital communication strategies.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      gmail: "arif.chowdhury@example.com",
      facebook: "https://facebook.com/arif.chowdhury",
      linkedin: "https://linkedin.com/in/arifchowdhury"
    }
  ];

  // Committee structure data
  // const committeeStructure = [
  //   {
  //     title: "Executive Board",
  //     description: "Overall governance and strategic direction of the federation",
  //     members: "7 members",
  //     icon: <FaUserTie className="text-emerald-600 text-2xl" />
  //   },
  //   {
  //     title: "Academic Committee",
  //     description: "Curriculum development, judge training, and educational standards",
  //     members: "12 members",
  //     icon: <FaAward className="text-emerald-600 text-2xl" />
  //   },
  //   {
  //     title: "Events & Tournament Committee",
  //     description: "Organizes national and regional debate tournaments",
  //     members: "15 members",
  //     icon: <FaCalendarAlt className="text-emerald-600 text-2xl" />
  //   },
  //   {
  //     title: "Finance & Resource Committee",
  //     description: "Financial oversight, fundraising, and resource management",
  //     members: "8 members",
  //     icon: <FaBuilding className="text-emerald-600 text-2xl" />
  //   }
  // ];

  // Social link component for member cards
  const SocialLinks = ({ gmail, facebook, linkedin }) => (
    <div className="flex justify-center space-x-3 mt-4 pt-4 border-t border-emerald-50">
      <a 
        href={`mailto:${gmail}`}
        className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full transition-all duration-300 hover:shadow-md"
        title="Send Email"
      >
        <FaGoogle className="text-sm" />
      </a>
      <a 
        href={facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full transition-all duration-300 hover:shadow-md"
        title="Facebook Profile"
      >
        <FaFacebook className="text-sm" />
      </a>
      <a 
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-2 rounded-full transition-all duration-300 hover:shadow-md"
        title="LinkedIn Profile"
      >
        <FaLinkedin className="text-sm" />
      </a>
    </div>
  );

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
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-emerald-900">
                    {committeeMembers[0].name}
                  </h3>
                  <p className="text-emerald-600 font-medium mt-1">
                    {committeeMembers[0].position}
                  </p>
                </div>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  {committeeMembers[0].description}
                </p>
                <SocialLinks 
                  gmail={committeeMembers[0].gmail}
                  facebook={committeeMembers[0].facebook}
                  linkedin={committeeMembers[0].linkedin}
                />
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
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-emerald-900">
                        {member.name}
                      </h3>
                      <p className="text-emerald-600 font-medium mt-1">
                        {member.position}
                      </p>
                    </div>
                    <p className="text-gray-600 text-center text-sm leading-relaxed">
                      {member.description}
                    </p>
                    <SocialLinks 
                      gmail={member.gmail}
                      facebook={member.facebook}
                      linkedin={member.linkedin}
                    />
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
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-emerald-900">
                      {member.name}
                    </h3>
                    <p className="text-emerald-600 font-medium mt-1">
                      {member.position}
                    </p>
                  </div>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    {member.description}
                  </p>
                  <SocialLinks 
                    gmail={member.gmail}
                    facebook={member.facebook}
                    linkedin={member.linkedin}
                  />
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