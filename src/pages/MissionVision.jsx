import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaTrophy, 
  FaCalendarAlt,
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

// Stack Component with Navigation
const Stack = ({ cards, randomRotation = true, sensitivity = 180, sendToBackOnClick = true }) => {
  const [zIndices, setZIndices] = useState(cards.map((_, i) => i));
  const [activeCard, setActiveCard] = useState(0);

  const handleMouseMove = (e, cardIndex) => {
    if (!randomRotation) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateY = (mouseX / (rect.width / 2)) * 10;
    const rotateX = -(mouseY / (rect.height / 2)) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e) => {
    if (!randomRotation) return;
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  };

  const handleCardClick = (index) => {
    if (sendToBackOnClick) {
      const newZIndices = [...zIndices];
      const currentZIndex = newZIndices[index];
      
      // Move clicked card to the back
      newZIndices[index] = 0;
      
      // Update other cards' z-indices
      newZIndices.forEach((z, i) => {
        if (i !== index && z > currentZIndex) {
          newZIndices[i] = z - 1;
        }
      });
      
      setZIndices(newZIndices);
      setActiveCard(index);
    }
  };

  const handlePrevCard = () => {
    const newIndex = (activeCard - 1 + cards.length) % cards.length;
    bringCardToFront(newIndex);
  };

  const handleNextCard = () => {
    const newIndex = (activeCard + 1) % cards.length;
    bringCardToFront(newIndex);
  };

  const bringCardToFront = (index) => {
    const newZIndices = [...zIndices];
    const currentZIndex = newZIndices[index];
    const maxZIndex = Math.max(...newZIndices);
    
    // Bring clicked card to front
    newZIndices[index] = maxZIndex + 1;
    
    // Update other cards' z-indices
    newZIndices.forEach((z, i) => {
      if (i !== index && z > currentZIndex) {
        newZIndices[i] = z - 1;
      }
    });
    
    setZIndices(newZIndices);
    setActiveCard(index);
  };

  const generateRandomRotation = () => {
    if (!randomRotation) return { transform: 'none' };
    
    const angle = Math.random() * 10 - 5; // -5 to 5 degrees
    return {
      transform: `rotate(${angle}deg)`
    };
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%',
      perspective: '1000px'
    }}>
      {cards.map((card, index) => {
        const baseRotation = generateRandomRotation();
        const zIndex = zIndices[index];
        
        return (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex,
              transition: 'transform 0.3s ease, z-index 0.3s ease',
              cursor: 'pointer',
              ...baseRotation
            }}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleCardClick(index)}
            className={`${activeCard === index ? 'ring-2 ring-emerald-400' : ''}`}
          >
            {card}
          </div>
        );
      })}
      
      {/* Navigation Buttons */}
      <button
        onClick={handlePrevCard}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full z-50 transition-all duration-300 hover:scale-110"
        aria-label="Previous image"
      >
        <FaChevronLeft className="text-lg md:text-xl" />
      </button>
      
      <button
        onClick={handleNextCard}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full z-50 transition-all duration-300 hover:scale-110"
        aria-label="Next image"
      >
        <FaChevronRight className="text-lg md:text-xl" />
      </button>
      
      {/* Thumbnail Navigation */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => bringCardToFront(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeCard === index 
                ? 'bg-emerald-600 w-8' 
                : 'bg-gray-300 hover:bg-emerald-400'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Main MissionVision Component
const MissionVision = () => {
  const galleryImages = [
    { 
      id: 1, 
      url: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      // caption: "National Debate Championship 2023",
      // description: "The grand finale of our annual national tournament featuring top debaters from across Bangladesh"
    },
    { 
      id: 2, 
      url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      // caption: "Youth Debate Training Camp",
      // description: "Week-long intensive training for young aspiring debaters from rural areas"
    },
    { 
      id: 3, 
      url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      // caption: "International Debate Exchange",
      // description: "Cultural exchange program with international debate teams from Asia-Pacific region"
    },
    { 
      id: 4, 
      url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      // caption: "University Debate League",
      // description: "Inter-university championship with participants from 50+ institutions"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-24 py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-center">
            <div>
              <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-emerald-200">
                <FaHeart className="mr-2" /> Our Story
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
                About Bangladesh Debate Federation
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed text-justify">
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
            
            {/* Stack Image Gallery with Navigation */}
            <div className="relative">
              <div className="w-[300px] h-[400px] md:w-[350px] md:h-[450px] lg:w-[400px] lg:h-[500px] mx-auto">
                <Stack
                  randomRotation={true}
                  sensitivity={180}
                  sendToBackOnClick={true}
                  cards={galleryImages.map((image, i) => (
                    <div 
                      key={image.id}
                      className="relative w-full h-full rounded-xl overflow-hidden border-2 border-emerald-200 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-emerald-300"
                    >
                      <img 
                        src={image.url} 
                        alt={image.caption} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 md:p-5">
                        <h3 className="text-white font-bold text-lg md:text-xl mb-1 md:mb-2">{image.caption}</h3>
                        <p className="text-white/90 text-sm md:text-base">{image.description}</p>
                      </div>
                      <div className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {i + 1}/{galleryImages.length}
                      </div>
                    </div>
                  ))}
                />
              </div>
              
              {/* Image Navigation Instructions */}
              <div className="mt-20 text-center">
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            <div className="bg-emerald-50 rounded-xl p-6 md:p-8 border border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-emerald-600 text-white p-3 rounded-full mr-4">
                  <FaBullhorn className="text-xl" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed text-justify">
                Bangladesh Debate Federation (BDF) works to develop skills in debate, public speaking, 
                logical reasoning, and critical thinking across all segments of society. Through partnerships 
                with educational institutions, private sector actors, civil society organizations, and 
                development partners, we promote social awareness, ethical communication, and constructive 
                exchange of ideas throughout Bangladesh and beyond.
              </p>
            </div>
            
            <div className="bg-emerald-50 rounded-xl p-6 md:p-8 border border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center mb-6">
                <div className="bg-emerald-600 text-white p-3 rounded-full mr-4">
                  <FaGlobeAsia className="text-xl" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed text-justify">
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
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 border border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg group cursor-pointer"
              >
                <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-3 text-center group-hover:text-emerald-700 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-center group-hover:text-gray-800 transition-colors duration-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MissionVision;