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

const ExecutiveCommittee = () => {
  // Executive Committee Members
  const executiveCommittee = [
    {
      id: 1,
      name: "Dr. Ayesha Rahman",
      position: "Chairperson",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      institution: "Professor, University of Dhaka",
      tenure: "2022-2024",
      email: "chairperson@debatefederation.org",
      phone: "+880 2 1234 5678",
      bio: "Over 15 years of experience in debate education. Former national champion and international adjudicator.",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 2,
      name: "Mr. Kabir Ahmed",
      position: "Executive Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      institution: "Former Director, Ministry of Education",
      tenure: "2021-2025",
      email: "director@debatefederation.org",
      phone: "+880 2 1234 5679",
      bio: "Spearheaded national debate curriculum development. 20+ years in educational leadership.",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 3,
      name: "Ms. Sabrina Khan",
      position: "Training Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      institution: "Debate Coach, North South University",
      tenure: "2023-2025",
      email: "training@debatefederation.org",
      phone: "+880 2 1234 5680",
      bio: "International debate champion. Trained 5000+ debaters across Bangladesh.",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 4,
      name: "Mr. Rahim Chowdhury",
      position: "Events Coordinator",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      institution: "Event Management Specialist",
      tenure: "2022-2024",
      email: "events@debatefederation.org",
      phone: "+880 2 1234 5681",
      bio: "Organized 100+ national and international debate events. Logistics expert.",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 5,
      name: "Dr. Fatima Begum",
      position: "Academic Advisor",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      institution: "Professor, Bangladesh University",
      tenure: "2020-2024",
      email: "academic@debatefederation.org",
      phone: "+880 2 1234 5682",
      bio: "PhD in Communication Studies. Author of 3 books on debate pedagogy.",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 6,
      name: "Mr. Shahriar Alam",
      position: "Finance Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      institution: "Chartered Accountant",
      tenure: "2023-2026",
      email: "finance@debatefederation.org",
      phone: "+880 2 1234 5683",
      bio: "Financial management expert. 10+ years in non-profit finance.",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 7,
      name: "Ms. Nusrat Jahan",
      position: "International Relations",
      image: "https://images.unsplash.com/photo-1551836026-d5c2c76705e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      institution: "Former Diplomat",
      tenure: "2022-2025",
      email: "international@debatefederation.org",
      phone: "+880 2 1234 5684",
      bio: "Former cultural attaché. Established partnerships with 20+ countries.",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 8,
      name: "Mr. Tariqul Islam",
      position: "Media & Communications",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      institution: "Journalist, The Daily Star",
      tenure: "2023-2025",
      email: "media@debatefederation.org",
      phone: "+880 2 1234 5685",
      bio: "Award-winning journalist. Media strategy expert for youth organizations.",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  // Committee Structure
  const committees = [
    {
      name: "Executive Committee",
      description: "Overall governance and strategic direction",
      members: 8,
      meetings: "Monthly",
      chair: "Dr. Ayesha Rahman"
    },
    {
      name: "Academic Council",
      description: "Curriculum development and training standards",
      members: 12,
      meetings: "Quarterly",
      chair: "Dr. Fatima Begum"
    },
    {
      name: "Events Committee",
      description: "Planning and execution of all debate events",
      members: 15,
      meetings: "Monthly",
      chair: "Mr. Rahim Chowdhury"
    },
    {
      name: "Finance Committee",
      description: "Budget oversight and financial management",
      members: 5,
      meetings: "Quarterly",
      chair: "Mr. Shahriar Alam"
    },
    {
      name: "International Committee",
      description: "Global partnerships and exchange programs",
      members: 7,
      meetings: "Quarterly",
      chair: "Ms. Nusrat Jahan"
    },
    {
      name: "Media & Outreach",
      description: "Public relations and communications",
      members: 8,
      meetings: "Monthly",
      chair: "Mr. Tariqul Islam"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
              Executive Committee
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Meet the dedicated leaders steering Bangladesh Debate Federation. 
              Our committee comprises experts in education, debate, finance, and 
              international relations working together to promote debate culture nationwide.
            </p>
            <div className="flex flex-wrap gap-4">
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

      {/* Leadership Introduction */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-emerald-200">
                <FaUserTie className="mr-2" /> Leadership
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-900 mb-6">
                Guiding Excellence in Debate Education
              </h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Our Executive Committee brings together diverse expertise to drive 
                Bangladesh Debate Federation's vision forward. Each member contributes 
                unique skills and experience to advance debate education across the nation.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <div className="text-3xl font-bold text-emerald-700 mb-2">8</div>
                  <div className="text-gray-700 font-medium">Executive Members</div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <div className="text-3xl font-bold text-emerald-700 mb-2">6</div>
                  <div className="text-gray-700 font-medium">Committees</div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <div className="text-3xl font-bold text-emerald-700 mb-2">4</div>
                  <div className="text-gray-700 font-medium">Year Term</div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <div className="text-3xl font-bold text-emerald-700 mb-2">100+</div>
                  <div className="text-gray-700 font-medium">Years Combined Experience</div>
                </div>
              </div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
              <div className="flex items-center mb-6">
                <div className="bg-emerald-600 text-white p-3 rounded-full mr-4">
                  <FaAward className="text-xl" />
                </div>
                <h3 className="text-xl font-bold text-emerald-900">Election Process</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-white text-emerald-600 p-2 rounded-full mr-4 mt-1">
                    <FaCalendarAlt />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">Biennial Elections</h4>
                    <p className="text-gray-600">Committee members are elected every 2 years through a democratic process</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white text-emerald-600 p-2 rounded-full mr-4 mt-1">
                    <FaUsers />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">Member Representation</h4>
                    <p className="text-gray-600">Includes representatives from all 8 divisions of Bangladesh</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white text-emerald-600 p-2 rounded-full mr-4 mt-1">
                    <FaBuilding />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-900 mb-1">Transparent Governance</h4>
                    <p className="text-gray-600">Regular meetings, published minutes, and annual reports</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Members Grid */}
      <section id="members" className="py-12 md:py-16 lg:py-20 bg-emerald-50 border-y border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-4">
              Executive Committee Members
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
              Our dedicated leaders working to advance debate education in Bangladesh
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {executiveCommittee.map((member) => (
              <div 
                key={member.id} 
                className="bg-white rounded-xl border border-emerald-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                {/* Member Image */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-emerald-800 border border-emerald-200">
                    {member.tenure}
                  </div>
                </div>
                
                {/* Member Info */}
                <div className="p-6">
                  <div className="mb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-emerald-900 mb-1 group-hover:text-emerald-700 transition-colors duration-300">
                          {member.name}
                        </h3>
                        <p className="text-emerald-600 font-bold">{member.position}</p>
                      </div>
                      <div className="flex space-x-2">
                        <a href={`mailto:${member.email}`} className="text-gray-500 hover:text-emerald-600 transition-colors duration-300" title="Email">
                          <FaEnvelope />
                        </a>
                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors duration-300" title="LinkedIn">
                          <FaLinkedin />
                        </a>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{member.institution}</p>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{member.bio}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <a href={`tel:${member.phone}`} className="text-emerald-600 hover:text-emerald-800 font-medium flex items-center">
                      <FaPhone className="mr-1" /> {member.phone}
                    </a>
                    <button className="text-emerald-600 hover:text-emerald-800 font-bold flex items-center">
                      Full Profile <FaArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee Structure */}
      <section id="committees" className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-4">
              Committee Structure
            </h2>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
              Specialized committees working under the Executive Committee
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {committees.map((committee, index) => (
              <div key={index} className="bg-white rounded-xl border border-emerald-100 p-6 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center mb-4">
                  <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <FaUsers />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-emerald-900">{committee.name}</h3>
                    <div className="text-sm text-emerald-600">{committee.members} members</div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{committee.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-700">
                    <FaCalendarAlt className="mr-3 text-emerald-600" />
                    <span className="font-medium">Meetings:</span>
                    <span className="ml-2">{committee.meetings}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaUserTie className="mr-3 text-emerald-600" />
                    <span className="font-medium">Chair:</span>
                    <span className="ml-2">{committee.chair}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meeting Schedule */}
      <section className="py-12 md:py-16 lg:py-20 bg-emerald-50 border-y border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
              Meeting Schedule 2024
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Upcoming Executive Committee meetings and public sessions
            </p>
          </div>
          
          <div className="bg-white rounded-xl border border-emerald-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-emerald-50">
                  <tr>
                    <th className="py-4 px-6 text-left font-bold text-emerald-900">Date</th>
                    <th className="py-4 px-6 text-left font-bold text-emerald-900">Meeting Type</th>
                    <th className="py-4 px-6 text-left font-bold text-emerald-900">Agenda</th>
                    <th className="py-4 px-6 text-left font-bold text-emerald-900">Venue</th>
                    <th className="py-4 px-6 text-left font-bold text-emerald-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      date: "April 15, 2024",
                      type: "Executive Committee",
                      agenda: "Annual budget approval, event calendar finalization",
                      venue: "BDF Head Office",
                      status: "Upcoming"
                    },
                    {
                      date: "May 20, 2024",
                      type: "Public Consultation",
                      agenda: "Member feedback session, policy review",
                      venue: "Online (Zoom)",
                      status: "Upcoming"
                    },
                    {
                      date: "March 10, 2024",
                      type: "Executive Committee",
                      agenda: "Quarterly review, partnership proposals",
                      venue: "BDF Head Office",
                      status: "Completed"
                    },
                    {
                      date: "February 25, 2024",
                      type: "Joint Committee",
                      agenda: "Inter-committee coordination",
                      venue: "Hybrid",
                      status: "Completed"
                    }
                  ].map((meeting, index) => (
                    <tr key={index} className="border-b border-emerald-50 hover:bg-emerald-50 transition-colors duration-300">
                      <td className="py-4 px-6">
                        <div className="font-medium text-emerald-900">{meeting.date}</div>
                        <div className="text-sm text-gray-600">2:00 PM - 5:00 PM</div>
                      </td>
                      <td className="py-4 px-6">{meeting.type}</td>
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-700">{meeting.agenda}</div>
                      </td>
                      <td className="py-4 px-6">{meeting.venue}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          meeting.status === 'Upcoming' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {meeting.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Meeting minutes and reports are published quarterly
            </p>
            <button className="text-emerald-600 hover:text-emerald-800 font-bold flex items-center justify-center mx-auto">
              Download Annual Report <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Committee */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaEnvelope className="text-2xl text-emerald-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-6">
              Contact the Executive Committee
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Have questions, suggestions, or feedback for our leadership team? 
              We welcome your input and engagement.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/contact" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Send Message
              </Link>
              <a 
                href="mailto:executive@debatefederation.org"
                className="bg-white hover:bg-emerald-50 text-emerald-700 font-bold py-3 px-6 rounded-lg transition-all duration-300 border border-emerald-300"
              >
                executive@debatefederation.org
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExecutiveCommittee;