import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
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
  FaTimes,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCards, setVisibleCards] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [selectedDayEvents, setSelectedDayEvents] = useState(null);
  const observerRef = useRef(null);
  const calendarRef = useRef(null);
  const navigate = useNavigate();

  // Fetch events from API using apiService
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await apiService.getEvents();
        
        // Handle the API response format properly
        if (result && result.status === "success" && Array.isArray(result.data)) {
          setEvents(result.data);
        } else if (Array.isArray(result)) {
          setEvents(result);
        } else if (result && result.success && Array.isArray(result.data)) {
          setEvents(result.data);
        } else {
          throw new Error('Invalid data format received from server');
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.message || 'An error occurred while fetching events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // When calendar opens, jump to the month of the first upcoming event
  useEffect(() => {
    if (showCalendar) {
      const upcomingEvents = events
        .filter(e => e.type === 'upcoming' && e.date)
        .map(e => ({ ...e, parsedDate: new Date(e.date) }))
        .filter(e => !isNaN(e.parsedDate))
        .sort((a, b) => a.parsedDate - b.parsedDate);

      if (upcomingEvents.length > 0) {
        const firstDate = upcomingEvents[0].parsedDate;
        setCalendarMonth(new Date(firstDate.getFullYear(), firstDate.getMonth(), 1));
      } else {
        setCalendarMonth(new Date());
      }
      setSelectedDayEvents(null);
    }
  }, [showCalendar, events]);

  // Close calendar on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
        setSelectedDayEvents(null);
      }
    };
    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCalendar]);

  // ফিল্টার অপশনস
  const filterOptions = [
    { id: 'all', label: 'All Events' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' },
    { id: 'training', label: 'Training' }
  ];

  const filteredEvents = events.filter(event => {
    const matchesFilter = activeFilter === 'all' ||
      (event.type && event.type === activeFilter) ||
      (event.category && event.category === activeFilter);

    const matchesSearch = (
      (event.title && event.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (event.location && event.location.toLowerCase().includes(searchTerm.toLowerCase()))
    );

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

  // Get all upcoming events mapped by dateString
  const getUpcomingEventsByDate = () => {
    const map = {};
    events
      .filter(e => e.type === 'upcoming' && e.date)
      .forEach(e => {
        try {
          const key = new Date(e.date).toDateString();
          if (!map[key]) map[key] = [];
          map[key].push(e);
        } catch (error) {
          console.error('Error processing event date:', e, error);
        }
      });
    return map;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth, year, month };
  };

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
      'national': 'National',
      'international': 'International',
      'training': 'Training'
    };
    return labels[category] || category;
  };

  // Function to format date from API
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not specified';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Function to format time from API
  const formatTime = (timeString) => {
    if (!timeString) return 'Time not specified';
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${ampm}`;
    } catch {
      return timeString;
    }
  };

  // Function to get filter button style
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
    return `event-card bg-white rounded-xl border border-emerald-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform ${isVisible
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-4'
      } hover:-translate-y-2`;
  };

  // Handle day click — navigate if single event, show list if multiple
  const handleDayClick = (dayEvents) => {
    if (dayEvents.length === 1) {
      setShowCalendar(false);
      setSelectedDayEvents(null);
      navigate(`/event/${dayEvents[0].id}`);
    } else if (dayEvents.length > 1) {
      setSelectedDayEvents(dayEvents);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Error loading data</h3>
          <button
            onClick={() => window.location.reload()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const upcomingEventsByDate = getUpcomingEventsByDate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-24 py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
              Events & Competitions
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Discover upcoming debate competitions, training, workshops organized by Bangladesh Debate Federation.
            </p>
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

            {/* Upcoming Calendar Button + Dropdown */}
            <div className="relative" ref={calendarRef}>
              <button
                onClick={() => setShowCalendar(prev => !prev)}
                className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-semibold rounded-full shadow-md transition-all duration-200"
              >
                <FaRegCalendarCheck className="text-base" />
                Upcoming Calendar
              </button>

              {/* Calendar Dropdown */}
              {showCalendar && (
                <div
                  className="absolute right-0 top-12 z-50 bg-white border border-emerald-100 rounded-2xl shadow-2xl overflow-hidden animate-fade-in"
                  style={{ width: '360px' }}
                >
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between px-5 py-4 bg-emerald-600">
                    <button
                      onClick={() => {
                        setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
                        setSelectedDayEvents(null);
                      }}
                      className="text-white hover:bg-emerald-500 p-1.5 rounded-full transition-colors"
                    >
                      <FaChevronLeft className="text-sm" />
                    </button>
                    <span className="text-white font-bold text-base tracking-wide">
                      {calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <button
                      onClick={() => {
                        setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
                        setSelectedDayEvents(null);
                      }}
                      className="text-white hover:bg-emerald-500 p-1.5 rounded-full transition-colors"
                    >
                      <FaChevronRight className="text-sm" />
                    </button>
                  </div>

                  {/* Day Labels */}
                  <div className="grid grid-cols-7 bg-emerald-50 border-b border-emerald-100">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                      <div key={d} className="text-center text-xs text-emerald-700 font-semibold py-2">{d}</div>
                    ))}
                  </div>

                  {/* Day Grid */}
                  <div className="grid grid-cols-7 p-3 gap-1">
                    {(() => {
                      const { firstDay, daysInMonth, year, month } = getDaysInMonth(calendarMonth);
                      const today = new Date().toDateString();
                      const cells = [];

                      // Empty cells before first day
                      for (let i = 0; i < firstDay; i++) {
                        cells.push(<div key={`empty-${i}`} />);
                      }

                      // Day cells
                      for (let day = 1; day <= daysInMonth; day++) {
                        const thisDate = new Date(year, month, day).toDateString();
                        const isToday = thisDate === today;
                        const dayEvents = upcomingEventsByDate[thisDate] || [];
                        const hasEvent = dayEvents.length > 0;

                        cells.push(
                          <div
                            key={day}
                            onClick={() => hasEvent && handleDayClick(dayEvents)}
                            className={`
                              relative flex flex-col items-center justify-start pt-1 pb-1 rounded-xl min-h-[44px] transition-all duration-150
                              ${hasEvent ? 'cursor-pointer hover:bg-emerald-50' : 'cursor-default'}
                              ${isToday && !hasEvent ? 'bg-emerald-50' : ''}
                            `}
                          >
                            <span className={`
                              w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold
                              ${hasEvent
                                ? 'bg-emerald-500 text-white shadow-sm'
                                : isToday
                                ? 'bg-emerald-200 text-emerald-900'
                                : 'text-gray-600'
                              }
                            `}>
                              {day}
                            </span>
                            {hasEvent && (
                              <div className="flex gap-0.5 mt-0.5 flex-wrap justify-center">
                                {dayEvents.slice(0, 3).map((_, i) => (
                                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                ))}
                                {dayEvents.length > 3 && (
                                  <span className="text-emerald-600 text-xs leading-none">+{dayEvents.length - 3}</span>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      }
                      return cells;
                    })()}
                  </div>

                  {/* Selected Day Events List (multiple events on same day) */}
                  {selectedDayEvents && (
                    <div className="border-t border-emerald-100 px-4 py-3 bg-emerald-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                          {new Date(selectedDayEvents[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                        </span>
                        <button
                          onClick={() => setSelectedDayEvents(null)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      </div>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {selectedDayEvents.map(event => (
                          <div
                            key={event.id}
                            onClick={() => {
                              setShowCalendar(false);
                              setSelectedDayEvents(null);
                              navigate(`/event/${event.id}`);
                            }}
                            className="flex items-center gap-2 p-2 bg-white rounded-lg border border-emerald-100 cursor-pointer hover:border-emerald-400 hover:shadow-sm transition-all duration-150 group"
                          >
                            <div className="w-1 h-8 rounded-full bg-emerald-500 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-emerald-900 truncate">{event.title}</p>
                              {event.location && (
                                <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-0.5">
                                  <FaMapMarkerAlt className="text-emerald-400 flex-shrink-0 text-xs" />
                                  {event.location}
                                </p>
                              )}
                            </div>
                            <FaArrowRight className="text-emerald-400 text-xs flex-shrink-0 group-hover:text-emerald-600 transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Legend */}
                  <div className="flex items-center gap-4 px-4 py-3 border-t border-emerald-100 bg-white">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-xs text-gray-500">Upcoming Event</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-emerald-200" />
                      <span className="text-xs text-gray-500">Today</span>
                    </div>
                    <span className="text-xs text-gray-400 ml-auto italic">Click to open</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                {events.length === 0 ? 'No events available' : 'No events found'}
              </h3>
              <p className="text-gray-600 mb-6">
                {events.length === 0
                  ? 'Check back later for upcoming events.'
                  : 'Try changing your search or filter criteria'}
              </p>
              {events.length > 0 && (
                <button
                  onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
                  className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-bold py-2 px-6 rounded-full transition-all duration-300"
                >
                  Reset Filters
                </button>
              )}
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
                      src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(event.type)}`}>
                        {event.status || event.type}
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
                        <span className="font-medium">{formatDate(event.date)}</span>
                      </div>
                      {event.time && (
                        <div className="flex items-center text-gray-600 text-sm">
                          <FaClock className="mr-3 text-emerald-600 flex-shrink-0" />
                          <span>{formatTime(event.time)}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center text-gray-600 text-sm">
                          <FaMapMarkerAlt className="mr-3 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                      {event.participants && (
                        <div className="flex items-center text-gray-600 text-sm">
                          <FaUsers className="mr-3 text-emerald-600 flex-shrink-0" />
                          <span>{event.participants} Participants</span>
                        </div>
                      )}
                    </div>

                    {/* Event Specific Info */}
                    {event.type === 'upcoming' && event.registration_deadline && (
                      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 mb-4">
                        <div className="flex items-center text-yellow-800 text-sm">
                          <FaClock className="mr-2 flex-shrink-0" />
                          <span className="font-bold">Registration Deadline:</span>
                          <span className="ml-2">{formatDate(event.registration_deadline)}</span>
                        </div>
                      </div>
                    )}

                    {event.type === 'completed' && (
                      <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 mb-4">
                        <div className="flex items-center text-emerald-800 text-sm">
                          <FaTrophy className="mr-2 flex-shrink-0" />
                          <span className="font-bold">Status:</span>
                          <span className="ml-2">{event.status}</span>
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

                      {event.type === 'upcoming' && event.status && event.status.toLowerCase() === 'open' && (
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