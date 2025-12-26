import React, { useState } from 'react';
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
  FaSeedling,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const galleryImages = [
    { 
      id: 1, 
      url: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      caption: "National Debate Championship 2023",
      description: "The grand finale of our annual national tournament featuring top debaters from across Bangladesh"
    },
    { 
      id: 2, 
      url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      caption: "Youth Debate Training Camp",
      description: "Week-long intensive training for young aspiring debaters from rural areas"
    },
    { 
      id: 3, 
      url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      caption: "International Debate Exchange",
      description: "Cultural exchange program with international debate teams from Asia-Pacific region"
    },
    { 
      id: 4, 
      url: "https://images.unsplash.com/photo-1551836026-d5c2c0b4d2f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      caption: "Rural Debate Initiative",
      description: "Bringing debate education to remote areas through mobile training units"
    },
    { 
      id: 5, 
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      caption: "University Debate League",
      description: "Inter-university championship with participants from 50+ institutions"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

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
            
            {/* Image Gallery Slider */}
            <div className="relative">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-emerald-900">Our Journey Gallery</h3>
              </div>
              
              {/* Slider Container */}
              <div className="relative h-[400px] w-full overflow-hidden rounded-xl border-2 border-emerald-200 shadow-xl">
                {/* Slides */}
                {galleryImages.map((image, index) => (
                  <div
                    key={image.id}
                    className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="relative h-full w-full">
                      <img
                        src={image.url}
                        alt={image.caption}
                        className="h-full w-full object-cover"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h4 className="text-2xl font-bold mb-2">{image.caption}</h4>
                          <p className="text-gray-200">{image.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Navigation Buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300"
                  aria-label="Previous slide"
                >
                  <FaChevronLeft className="text-xl" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-300"
                  aria-label="Next slide"
                >
                  <FaChevronRight className="text-xl" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-emerald-400 w-8' 
                          : 'bg-white/60 hover:bg-white'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Slide Counter */}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentSlide + 1} / {galleryImages.length}
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex justify-center mt-4 space-x-2">
                {galleryImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => goToSlide(index)}
                    className={`w-16 h-16 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                      index === currentSlide 
                        ? 'border-emerald-500 ring-2 ring-emerald-200' 
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Gallery Stats */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded-lg border border-emerald-100 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-xl font-bold text-emerald-700">15K+</div>
                  <div className="text-xs text-gray-600">Trained Debaters</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-100 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-xl font-bold text-emerald-700">64</div>
                  <div className="text-xs text-gray-600">Districts Covered</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-100 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-xl font-bold text-emerald-700">250+</div>
                  <div className="text-xs text-gray-600">Events Organized</div>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-100 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-xl font-bold text-emerald-700">500+</div>
                  <div className="text-xs text-gray-600">Institutions</div>
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
    </div>
  );
};

export default About;