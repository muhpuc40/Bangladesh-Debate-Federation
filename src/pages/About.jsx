import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaTrophy, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaCheckCircle,
  FaArrowRight,
  FaHandshake,
  FaGlobeAsia,
  FaUniversity,
  FaBullhorn,
  FaHeart
} from 'react-icons/fa';

const About = () => {
  const milestones = [
    { year: "2010", title: "Foundation", description: "Bangladesh Debate Federation established with 10 founding members" },
    { year: "2012", title: "First National", description: "Organized first national debate competition with 50 teams" },
    { year: "2015", title: "International Debut", description: "First participation in World Universities Debating Championship" },
    { year: "2018", title: "Expansion", description: "Launched divisional chapters across all 8 divisions" },
    { year: "2020", title: "Digital Shift", description: "Pioneered online debating during pandemic" },
    { year: "2023", title: "Record Growth", description: "15,000+ trained debaters, 250+ events organized" }
  ];

  const teamMembers = [
    { name: "Dr. Ayesha Rahman", role: "Chairperson", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Mr. Kabir Ahmed", role: "Executive Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Ms. Sabrina Khan", role: "Training Director", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Mr. Rahim Chowdhury", role: "Events Coordinator", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
            <div>
              <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-emerald-200">
                <FaHeart className="mr-2" /> Our Story
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
                About Bangladesh Debate Federation
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                Founded in 2010, Bangladesh Debate Federation (BDF) is the premier national body 
                dedicated to promoting competitive debating, critical thinking, and public speaking 
                across Bangladesh. We are committed to nurturing the next generation of leaders.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/events" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center border border-emerald-700 hover:shadow-xl hover:-translate-y-1"
                >
                  Upcoming Events <FaArrowRight className="ml-2" />
                </Link>
                <Link 
                  to="/contact" 
                  className="bg-white hover:bg-emerald-50 text-emerald-700 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center border border-emerald-300 hover:shadow-xl hover:-translate-y-1"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-emerald-100 rounded-xl p-6 border border-emerald-200 shadow-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-emerald-100 text-center">
                    <div className="text-3xl font-bold text-emerald-700 mb-2">15K+</div>
                    <div className="text-gray-600">Trained Debaters</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-emerald-100 text-center">
                    <div className="text-3xl font-bold text-emerald-700 mb-2">250+</div>
                    <div className="text-gray-600">Events Organized</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-emerald-100 text-center">
                    <div className="text-3xl font-bold text-emerald-700 mb-2">64</div>
                    <div className="text-gray-600">Districts Covered</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-emerald-100 text-center">
                    <div className="text-3xl font-bold text-emerald-700 mb-2">12</div>
                    <div className="text-gray-600">International Awards</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            <div className="bg-emerald-50 rounded-xl p-6 md:p-8 border border-emerald-100">
              <div className="flex items-center mb-6">
                <div className="bg-emerald-600 text-white p-3 rounded-full mr-4">
                  <FaBullhorn className="text-xl" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To democratize access to debate education, foster critical thinking skills, and 
                empower youth to become articulate, informed, and engaged citizens who can 
                contribute meaningfully to society and participate effectively in democratic processes.
              </p>
            </div>
            
            <div className="bg-emerald-50 rounded-xl p-6 md:p-8 border border-emerald-100">
              <div className="flex items-center mb-6">
                <div className="bg-emerald-600 text-white p-3 rounded-full mr-4">
                  <FaGlobeAsia className="text-xl" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To establish Bangladesh as a global hub for competitive debating by creating 
                a sustainable ecosystem where every young person has the opportunity to develop 
                their voice, confidence, and leadership abilities through structured debate programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 md:py-16 lg:py-20 bg-emerald-50 border-y border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
              The principles that guide everything we do at Bangladesh Debate Federation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FaCheckCircle />, title: "Excellence", description: "Striving for the highest standards in all our programs and competitions" },
              { icon: <FaUsers />, title: "Inclusion", description: "Ensuring equal opportunities for participants from all backgrounds" },
              { icon: <FaHandshake />, title: "Integrity", description: "Maintaining transparency and ethical standards in all operations" },
              { icon: <FaUniversity />, title: "Innovation", description: "Continuously evolving our programs to meet changing needs" }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg">
                <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-3 text-center">{value.title}</h3>
                <p className="text-gray-600 text-center">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-4">
              Our Journey
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
              Key milestones in our journey of promoting debate culture in Bangladesh
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-emerald-200"></div>
            
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 md:px-8 mb-4 md:mb-0">
                  <div className={`bg-white p-6 rounded-xl border border-emerald-100 shadow-sm hover:shadow-lg transition-all duration-300 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-bold mb-3">
                      <FaCalendarAlt className="mr-2" /> {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold text-emerald-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="flex justify-center md:justify-center md:w-8 relative z-10">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 border-4 border-white shadow-lg flex items-center justify-center">
                    <FaCheckCircle className="text-white text-sm" />
                  </div>
                </div>
                
                <div className="md:w-1/2 md:px-8 text-center md:text-left">
                  <div className="text-3xl font-bold text-emerald-700 mb-2">{milestone.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-12 md:py-16 lg:py-20 bg-emerald-50 border-y border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
              Meet the dedicated individuals steering the Bangladesh Debate Federation
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-emerald-900 mb-1">{member.name}</h3>
                  <p className="text-emerald-600 font-bold mb-4">{member.role}</p>
                  <div className="flex justify-center space-x-3">
                    <button className="text-emerald-600 hover:text-emerald-800 transition-colors duration-300">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-6">
              Join Our Movement
            </h2>
            <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
              Whether you're a student looking to develop your skills, an educator wanting to 
              start a debate club, or an organization interested in partnership, we have 
              opportunities for everyone to get involved.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/membership" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 border border-emerald-700 hover:shadow-xl hover:-translate-y-1"
              >
                Become a Member
              </Link>
              <Link 
                to="/contact" 
                className="bg-white hover:bg-emerald-50 text-emerald-700 font-bold py-3 px-6 rounded-lg transition-all duration-300 border border-emerald-300 hover:shadow-xl hover:-translate-y-1"
              >
                Partner With Us
              </Link>
              <Link 
                to="/events" 
                className="bg-white hover:bg-emerald-50 text-emerald-700 font-bold py-3 px-6 rounded-lg transition-all duration-300 border border-emerald-300 hover:shadow-xl hover:-translate-y-1"
              >
                Volunteer Opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;