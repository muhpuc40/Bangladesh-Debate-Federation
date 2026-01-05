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
  FaFilter
} from 'react-icons/fa';

// Events data in JSON format
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
      "title": "Asian Parliamentary Debate",
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
      "title": "Inter-University Debate",
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
      "title": "International Youth Debate Championship",
      "description": "Global debate competition for youth aged 16-25",
      "date": "April 5-10, 2024",
      "time": "10:00 AM - 8:00 PM",
      "location": "Virtual International",
      "type": "upcoming",
      "category": "international",
      "participants": "3000+",
      "registrationDeadline": "March 30, 2024",
      "status": "Open for Registration",
      "image": "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": 5,
      "title": "High School Debate Workshop",
      "description": "Basic debate skills workshop for high school students",
      "date": "March 18-20, 2024",
      "time": "2:00 PM - 5:00 PM",
      "location": "Online (Google Meet)",
      "type": "ongoing",
      "category": "training",
      "participants": "150",
      "registrationDeadline": "March 15, 2024",
      "status": "Registration Closed",
      "image": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      "id": 6,
      "title": "South Asian Debate Championship 2023",
      "description": "Regional debate competition for South Asian countries",
      "date": "December 5-10, 2023",
      "time": "9:00 AM - 7:00 PM",
      "location": "Kathmandu, Nepal",
      "type": "completed",
      "category": "international",
      "participants": "1200+",
      "winner": "Team India",
      "status": "Completed",
      "image": "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
    { id: 'all', label: 'All Events', count: events.length },
    { id: 'upcoming', label: 'Upcoming', count: events.filter(e => e.type === 'upcoming').length },
    { id: 'ongoing', label: 'Ongoing', count: events.filter(e => e.type === 'ongoing').length },
    { id: 'completed', label: 'Completed', count: events.filter(e => e.type === 'completed').length },
    { id: 'national', label: 'National', count: events.filter(e => e.category === 'national').length },
    { id: 'international', label: 'International', count: events.filter(e => e.category === 'international').length },
    { id: 'training', label: 'Training', count: events.filter(e => e.category === 'training').length },
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

  // Function to get filter button style
  const getFilterButtonStyle = (filterId) => {
    const isActive = activeFilter === filterId;
    return `px-2 py-1 text-sm border-b-2 transition-all duration-200 ${
      isActive 
        ? 'border-emerald-600 text-emerald-700 font-semibold' 
        : 'border-transparent text-gray-600 hover:text-emerald-600 hover:border-emerald-300'
    }`;
  };

  // Function to get card animation class
  const getCardAnimationClass = (cardId) => {
    const isVisible = visibleCards.includes(cardId);
    return `event-card bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 transform ${
      isVisible 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-4'
    } hover:-translate-y-1`;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-16 py-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Events & Competitions
            </h1>
            <p className="text-gray-700 mb-6">
              Discover upcoming debate competitions, training, workshops organized by Bangladesh Debate Federation.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400 text-sm" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search events..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm text-black placeholder:text-gray-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 text-sm"
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
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all text-sm"
            >
              Clear Filters
            </button>
          </div>

          {/* Filter Section */}
          <div className="mt-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex items-center shrink-0">
                <FaFilter className="text-gray-600 mr-2 text-sm" />
                <span className="text-gray-700 font-medium text-sm">Filter by:</span>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={getFilterButtonStyle(filter.id)}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium">{filter.label}</span>
                        <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${
                          activeFilter === filter.id 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {filter.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {activeFilter !== 'all' && (
            <div className="mt-3 flex items-center">
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 flex items-center text-sm">
                <span className="text-gray-700 mr-2">Active filter:</span>
                <span className="font-bold text-gray-800">
                  {filterOptions.find(f => f.id === activeFilter)?.label}
                </span>
                <button
                  onClick={() => setActiveFilter('all')}
                  className="ml-2 text-gray-600 hover:text-gray-800 text-sm"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Events Grid */}
      <section 
        ref={eventsSectionRef}
        className="py-8"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {activeFilter === 'all' ? 'All Events' : filterOptions.find(f => f.id === activeFilter)?.label}
                <span className="text-gray-500 text-sm ml-2">({filteredEvents.length})</span>
              </h2>
              {searchTerm && (
                <p className="text-gray-600 text-sm mt-1">
                  Search results for: "<span className="font-medium text-emerald-700">{searchTerm}</span>"
                </p>
              )}
            </div>
            <div className="flex items-center">
              <div className="flex items-center text-gray-600 text-sm">
                <FaRegCalendarCheck className="mr-1" />
                <span>Total: {events.length}</span>
              </div>
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">📅</div>
              <h3 className="text-lg font-bold text-gray-700 mb-2">No events found</h3>
              <p className="text-gray-600 mb-4 text-sm">Try changing your search or filter criteria</p>
              <button 
                onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
                className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-medium py-2 px-4 rounded-lg transition-all text-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEvents.map((event, index) => (
                <div 
                  key={event.id} 
                  data-card-id={event.id}
                  className={getCardAnimationClass(event.id)}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute top-2 left-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(event.type)}`}>
                        {event.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-2">{event.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600 text-sm">
                        <FaCalendarAlt className="mr-2 text-gray-500 flex-shrink-0" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <FaMapMarkerAlt className="mr-2 text-gray-500 flex-shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm">
                        <FaUsers className="mr-2 text-gray-500 flex-shrink-0" />
                        <span>{event.participants} Participants</span>
                      </div>
                    </div>

                    {event.type === 'upcoming' && event.registrationDeadline && (
                      <div className="border border-yellow-200 rounded p-2 mb-3 text-sm">
                        <div className="flex items-center text-yellow-800">
                          <FaClock className="mr-1 flex-shrink-0" />
                          <span className="font-medium">Deadline:</span>
                          <span className="ml-1">{event.registrationDeadline}</span>
                        </div>
                      </div>
                    )}

                    {event.type === 'completed' && event.winner && (
                      <div className="border border-emerald-200 rounded p-2 mb-3 text-sm">
                        <div className="flex items-center text-emerald-800">
                          <FaTrophy className="mr-1 flex-shrink-0" />
                          <span className="font-medium">Winner:</span>
                          <span className="ml-1">{event.winner}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <Link 
                        to={`/event/${event.id}`}
                        className="text-emerald-600 hover:text-emerald-800 font-medium flex items-center text-sm"
                      >
                        View Details
                        <FaArrowRight className="ml-1" />
                      </Link>
                      
                      {event.type === 'upcoming' && event.status === 'Open for Registration' && (
                        <Link 
                          to={`/registration/${event.id}`}
                          className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-medium py-1.5 px-3 rounded text-sm transition-all"
                        >
                          Register
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