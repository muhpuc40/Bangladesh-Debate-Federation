import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaClock,
  FaSearch,
  FaArrowRight,
  FaRegCalendarCheck,
  FaTrophy,
  FaFilter,
  FaMicrophone,
  FaUniversity
} from 'react-icons/fa';


const eventsData = {
  "events": [
    {
      "id": 1,
      "title": "National Debate Festival 2024",
      "description": "Bangladesh's largest debate competition with participants from all 64 districts",
      "date": "March 15-20, 2024",
      "time": "9:00 AM - 6:00 PM",
      "location": "Dhaka University Campus",
      "type": "upcoming",
      "category": "national",
      "participants": "5000+",
      "registrationDeadline": "March 10, 2024",
      "status": "Open for Registration",
      "image": "https://i.ibb.co.com/HfwY09Kt/Gemini-Generated-Image-sozxjesozxjesozx.png"
    },
    {
      "id": 2,
      "title": "Asian Parliamentary Debate Workshop",
      "description": "Intensive training on Asian Parliamentary format for college students",
      "date": "March 25-27, 2024",
      "time": "10:00 AM - 4:00 PM",
      "location": "Online (Zoom)",
      "type": "upcoming",
      "category": "training",
      "participants": "200",
      "registrationDeadline": "March 20, 2024",
      "status": "Open for Registration",
      "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": 3,
      "title": "Inter-University Debate Championship",
      "description": "Annual competition among universities across Bangladesh",
      "date": "February 10-15, 2024",
      "time": "9:00 AM - 8:00 PM",
      "location": "Rajshahi University",
      "type": "completed",
      "category": "national",
      "participants": "2000+",
      "winner": "Dhaka University",
      "status": "Completed",
      "image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": 4,
      "title": "Youth Parliament Session",
      "description": "Simulated parliamentary debate for school students",
      "date": "April 5-7, 2024",
      "time": "10:00 AM - 5:00 PM",
      "location": "Bangabandhu International Conference Center",
      "type": "upcoming",
      "category": "national",
      "participants": "1000",
      "registrationDeadline": "March 30, 2024",
      "status": "Open for Registration",
      "image": "https://images.unsplash.com/photo-1551135049-8a33b2fb2d5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": 5,
      "title": "International Debate Exchange Program",
      "description": "Cultural exchange and debate competition with international teams",
      "date": "May 20-25, 2024",
      "time": "All Day",
      "location": "Multiple Venues",
      "type": "upcoming",
      "category": "international",
      "participants": "300",
      "registrationDeadline": "April 30, 2024",
      "status": "Coming Soon",
      "image": "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": 6,
      "title": "Adjudicator Certification Program",
      "description": "Professional training for aspiring debate judges",
      "date": "January 15-20, 2024",
      "time": "9:00 AM - 5:00 PM",
      "location": "BDF Training Center, Dhaka",
      "type": "completed",
      "category": "training",
      "participants": "150",
      "certified": "120",
      "status": "Completed",
      "image": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ],
};

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCards, setVisibleCards] = useState([]);
  const eventsSectionRef = useRef(null);
  const observerRef = useRef(null);
  
  // Extract events array from eventsData object
  const events = eventsData.events;

  // ফিল্টার অপশনস
  const filterOptions = [
    { id: 'all', label: 'All Events' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'ongoing', label: 'Ongoing' },
    { id: 'completed', label: 'Completed' },
    { id: 'national', label: 'National' },
    { id: 'international', label: 'International' },
    { id: 'training', label: 'Training' }
  ];

  const filteredEvents = events.filter(event => {
    const matchesFilter = activeFilter === 'all' || 
                         event.type === activeFilter || 
                         event.category === activeFilter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Intersection Observer for card animations
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cardId = entry.target.dataset.cardId;
            setVisibleCards(prev => [...new Set([...prev, parseInt(cardId)])]);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    observerRef.current = observer;

    setTimeout(() => {
      const cards = document.querySelectorAll('.event-card');
      cards.forEach(card => {
        if (observerRef.current) {
          observerRef.current.observe(card);
        }
      });
    }, 100);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [filteredEvents]);

  // Function to get event status color
  const getStatusColor = (eventType) => {
    const colors = {
      'upcoming': 'bg-green-100 text-green-800',
      'ongoing': 'bg-blue-100 text-blue-800',
      'completed': 'bg-gray-100 text-gray-800'
    };
    return colors[eventType] || 'bg-gray-100 text-gray-800';
  };

  // Function to get category label
  const getCategoryLabel = (category) => {
    const labels = {
      'national': '🇧🇩 National',
      'international': '🌍 International',
      'training': '🎓 Training'
    };
    return labels[category] || category;
  };

  // Function to get filter button style (ক্যাপসুল/পিল আকৃতির জন্য)
  const getFilterButtonStyle = (filterId) => {
    const isActive = activeFilter === filterId;
    if (isActive) {
      return 'px-5 py-2.5 rounded-full text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-all duration-200';
    } else {
      return 'px-5 py-2.5 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-all duration-200';
    }
  };

  // Function to get card animation class
  const getCardAnimationClass = (cardId) => {
    const isVisible = visibleCards.includes(cardId);
    return `event-card bg-white rounded-xl border border-emerald-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform ${
      isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-4'
    } hover:-translate-y-2`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
              Events & Competitions
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
             Discover upcoming debate competitions, training, workshops organized by Bangladesh Debate Federation.
            </p>
            {/* <div className="flex flex-wrap gap-4">
              <Link 
                to="/registration" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center border border-emerald-700 hover:shadow-xl hover:-translate-y-1"
              >
                <FaRegCalendarCheck className="mr-2" /> Register for Events
              </Link>
              <button 
                onClick={() => setActiveFilter('upcoming')}
                className="bg-white hover:bg-emerald-50 text-emerald-700 font-bold py-3 px-6 rounded-full transition-all duration-300 flex items-center border border-emerald-300 hover:shadow-xl hover:-translate-y-1"
              >
                View Upcoming Events
              </button>
            </div> */}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search events by title, description, or location..."
                  className="w-full pl-10 pr-4 py-3 border border-emerald-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300 text-black"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchTerm('');
              }}
              className="px-4 py-3 border border-emerald-200 text-emerald-700 rounded-full hover:bg-emerald-50 transition-all duration-300 font-medium"
            >
              Clear Filters
            </button>
          </div>

          {/* Filter Section */}
          <div className="mt-6">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex items-center shrink-0">
                <FaFilter className="text-gray-600 mr-2" />
                <span className="text-gray-700 font-medium">Filter by:</span>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={getFilterButtonStyle(filter.id)}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">
              {activeFilter === 'all' ? 'All Events' : filterOptions.find(f => f.id === activeFilter)?.label}
              <span className="text-gray-500 text-lg ml-2">({filteredEvents.length})</span>
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-sm">
                <FaRegCalendarCheck className="inline mr-1" />
                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No events found</h3>
              <p className="text-gray-600 mb-6">Try changing your search or filter criteria</p>
              <button 
                onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
                className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-bold py-2 px-6 rounded-full transition-all duration-300"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <div 
                  key={event.id} 
                  data-card-id={event.id}
                  className={getCardAnimationClass(event.id)}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {/* Event Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(event.type)}`}>
                        {event.status}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                        {getCategoryLabel(event.category)}
                      </span>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-emerald-900 mb-3 hover:text-emerald-700 transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">{event.description}</p>
                    
                    {/* Event Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600 text-sm">
                        <FaCalendarAlt className="mr-3 text-emerald-600 flex-shrink-0" />
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <FaClock className="mr-3 text-emerald-600 flex-shrink-0" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <FaMapMarkerAlt className="mr-3 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <FaUsers className="mr-3 text-emerald-600 flex-shrink-0" />
                        <span>{event.participants} Participants</span>
                      </div>
                    </div>

                    {/* Event Specific Info */}
                    {event.type === 'upcoming' && event.registrationDeadline && (
                      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 mb-4">
                        <div className="flex items-center text-yellow-800 text-sm">
                          <FaClock className="mr-2 flex-shrink-0" />
                          <span className="font-bold">Registration Deadline:</span>
                          <span className="ml-2">{event.registrationDeadline}</span>
                        </div>
                      </div>
                    )}

                    {event.type === 'completed' && event.winner && (
                      <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 mb-4">
                        <div className="flex items-center text-emerald-800 text-sm">
                          <FaTrophy className="mr-2 flex-shrink-0" />
                          <span className="font-bold">Winner:</span>
                          <span className="ml-2">{event.winner}</span>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center">
                      <Link 
                        to={`/event/${event.id}`}
                        className="text-emerald-600 hover:text-emerald-800 font-bold flex items-center hover:underline text-sm"
                      >
                        View Details <FaArrowRight className="ml-2" />
                      </Link>
                      
                      {event.type === 'upcoming' && event.status === 'Open for Registration' && (
                        <Link 
                          to={`/registration/${event.id}`}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 text-sm"
                        >
                          Register Now
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>



     
    </div>
  );
};

export default Events;