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
  FaHeart,
  FaBrain,
  FaEye,
  FaHandsHelping,
  FaSeedling
} from 'react-icons/fa';

const About = () => {
  const milestones = [
    { year: "2010", title: "Foundation", description: "Bangladesh Debate Federation established as a non-profit voluntary organization" },
    { year: "2012", title: "First National", description: "Organized first national debate competition with 50 teams" },
    { year: "2015", title: "International Debut", description: "First participation in World Universities Debating Championship" },
    { year: "2018", title: "Grassroots Expansion", description: "Launched programs reaching educational institutions at all levels" },
    { year: "2020", title: "Digital Shift", description: "Pioneered online debating and remote training during pandemic" },
    { year: "2023", title: "National Reach", description: "15,000+ trained debaters, programs in all 64 districts" }
  ];

  const teamMembers = [
    { name: "Dr. Ayesha Rahman", role: "Chairperson", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Mr. Kabir Ahmed", role: "Executive Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Ms. Sabrina Khan", role: "Training Director", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
    { name: "Mr. Rahim Chowdhury", role: "Partnership Coordinator", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" }
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
                Bangladesh Debate Federation (BDF) is a non-profit voluntary organization dedicated to spreading 
                the art of debate and the power of public speaking to every corner of our nation. Founded in 2010, 
                we work to bring logical reasoning and critical thinking to all age groups—from students to 
                professionals—ensuring that clear discourse becomes a core part of our national identity.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/events" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center border border-emerald-700 hover:shadow-xl hover:-translate-y-1"
                >
                  Upcoming Events <FaArrowRight className="ml-2" />
                </Link>
              
              </div>
            </div>
            {/* <div className="relative">
              <div className="bg-emerald-100 rounded-xl p-6 border border-emerald-200 shadow-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-emerald-100 text-center">
                    <div className="text-3xl font-bold text-emerald-700 mb-2">15K+</div>
                    <div className="text-gray-600">Trained Debaters</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-emerald-100 text-center">
                    <div className="text-3xl font-bold text-emerald-700 mb-2">64</div>
                    <div className="text-gray-600">Districts Covered</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-emerald-100 text-center">
                    <div className="text-3xl font-bold text-emerald-700 mb-2">250+</div>
                    <div className="text-gray-600">Events Organized</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-emerald-100 text-center">
                    <div className="text-3xl font-bold text-emerald-700 mb-2">500+</div>
                    <div className="text-gray-600">Institutions Reached</div>
                  </div>
                </div>
              </div>
            </div> */}
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
                Bangladesh Debate Federation (BDF) works to develop skills in debate, public speaking, 
                logical reasoning, and critical thinking across all segments of society. Through partnerships 
                with educational institutions, private sector actors, civil society organizations, and 
                development partners, we promote social awareness, ethical communication, and constructive 
                exchange of ideas throughout Bangladesh and beyond.
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
                To cultivate a society where ideas are examined through logic, dialogue is guided by reason, 
                and public narratives are shaped with integrity. We envision a just and informed Bangladesh 
                where every individual develops the skills to solve problems, understand one another, and 
                contribute meaningfully to conversations that extend beyond our boundaries.
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
              The pillars that guide our work and define our identity
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <FaBrain />, title: "Logical & Critical Thinking", description: "Promoting reasoned analysis and evidence-based discourse in all conversations" },
              { icon: <FaUsers />, title: "Inclusiveness", description: "Ensuring equal access and participation for people from all backgrounds and regions" },
              { icon: <FaEye />, title: "Social Awareness", description: "Fostering understanding of societal issues and encouraging ethical communication" },
              { icon: <FaHandsHelping />, title: "Leadership & Responsibility", description: "Developing individuals who lead with integrity and contribute positively to society" }
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
  


    
    
    </div>
  );
};

export default About;