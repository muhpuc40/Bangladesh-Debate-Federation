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
  FaTrophy,
  FaFilter,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaUpload,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa';

const Events = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCards, setVisibleCards] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [selectedDayEvents, setSelectedDayEvents] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const observerRef = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    time: '',
    location: '',
    type: 'upcoming',
    participants: '',
    registration_deadline: '',
    event_link: '',
    status: '',
    name: '',
    email: '',
    phone: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const fileInputRef = useRef(null);

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

  // Lock/unlock body scroll when modal opens/closes
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isModalOpen]);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiService.getEvents();
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

  // Set calendar to first upcoming event month
  useEffect(() => {
    const upcoming = events
      .filter(e => e.type === 'upcoming' && e.start_date)
      .map(e => ({ ...e, parsedDate: new Date(e.start_date) }))
      .filter(e => !isNaN(e.parsedDate))
      .sort((a, b) => a.parsedDate - b.parsedDate);
    if (upcoming.length > 0) {
      const d = upcoming[0].parsedDate;
      setCalendarMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    } else {
      setCalendarMonth(new Date());
    }
    setSelectedDayEvents(null);
  }, [events]);

  // Intersection observer for card fade-in animations
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cardId = entry.target.dataset.cardId;
            setVisibleCards(prev => [...new Set([...prev, parseInt(cardId)])]);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );
    observerRef.current = observer;
    setTimeout(() => {
      document.querySelectorAll('.event-card').forEach(card => {
        if (observerRef.current) observerRef.current.observe(card);
      });
    }, 100);
    return () => { if (observerRef.current) observerRef.current.disconnect(); };
  }, [filteredEvents]);

  // Build map: dateString -> [events]
  const getEventsByDate = () => {
    const map = {};
    events
      .filter(e => e.type === 'upcoming' && e.start_date)
      .forEach(e => {
        try {
          const key = new Date(e.start_date).toDateString();
          if (!map[key]) map[key] = [];
          map[key].push(e);
        } catch (err) {
          console.error('Date error:', err);
        }
      });
    return map;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return {
      firstDay: new Date(year, month, 1).getDay(),
      daysInMonth: new Date(year, month + 1, 0).getDate(),
      year,
      month
    };
  };

  const getStatusColor = (eventType) => ({
    'upcoming': 'bg-emerald-100 text-emerald-800',
    'ongoing': 'bg-teal-100 text-teal-800',
    'completed': 'bg-gray-100 text-gray-700'
  }[eventType] || 'bg-gray-100 text-gray-700');

  const getCategoryLabel = (category) => ({
    'bdf': 'BDF Event',
    'other': 'Other Organization',
    'national': 'National',
    'international': 'International',
    'training': 'Training'
  }[category] || category);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not specified';
    try { return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); }
    catch { return dateString; }
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      return `${hour % 12 || 12}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
    } catch { return timeString; }
  };

  const getCardAnimationClass = (cardId) => {
    const visible = visibleCards.includes(cardId);
    return `event-card bg-white rounded-xl border border-emerald-100 overflow-hidden hover:border-emerald-300 hover:shadow-lg transition-all duration-300 ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`;
  };

  const handleDayClick = (dayEvents) => {
    if (dayEvents.length === 1) {
      setSelectedDayEvents(null);
      navigate(`/event/${dayEvents[0].id}`);
    } else {
      setSelectedDayEvents(dayEvents);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (validationErrors[name]) setValidationErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { setModalError('Image size must be less than 2MB'); return; }
    if (!['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.type)) { setModalError('Only JPG, PNG, and GIF images are allowed'); return; }
    setImageFile(file);
    setModalError(null);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalLoading(true);
    setModalError(null);
    setValidationErrors({});
    const submitData = new FormData();
    Object.keys(formData).forEach(key => { if (formData[key]) submitData.append(key, formData[key]); });
    if (imageFile) submitData.append('image', imageFile);
    try {
      const response = await apiService.submitEventRequest(submitData);
      if (response.success) {
        setModalSuccess(true);
        setTimeout(() => {
          resetForm();
          setIsModalOpen(false);
          apiService.getEvents().then(result => {
            if (result?.status === "success" && Array.isArray(result.data)) setEvents(result.data);
          });
        }, 3000);
      } else {
        setModalError(response.message || 'Failed to submit event request');
      }
    } catch (err) {
      console.error('Submit error:', err);
      if (err.response?.data?.errors) {
        setValidationErrors(err.response.data.errors);
        setModalError('Please fix the validation errors below');
      } else {
        setModalError(err.response?.data?.message || 'An error occurred while submitting your request');
      }
    } finally {
      setModalLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', start_date: '', end_date: '', time: '', location: '', type: 'upcoming', participants: '', registration_deadline: '', event_link: '', status: '', name: '', email: '', phone: '' });
    clearImage();
    setValidationErrors({});
    setModalSuccess(false);
    setModalError(null);
  };

  const handleModalClose = () => { resetForm(); setIsModalOpen(false); };

  const eventsByDate = getEventsByDate();

  const inputClass = (field) =>
    `w-full px-4 py-2.5 border rounded-lg text-gray-900 placeholder-gray-400 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 ${
      validationErrors[field] ? 'border-red-400 bg-red-50' : 'border-emerald-200'
    }`;
  const selectClass = `w-full px-4 py-2.5 border border-emerald-200 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-200 cursor-pointer`;

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

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section — same as News */}
      <section className="relative bg-white text-emerald-900 pt-18 md:pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Events & Competitions
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
              Discover upcoming debate competitions, training programs, and workshops
              organized by Bangladesh Debate Federation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content with Two Columns — same as News */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">

          {/* Left Column — Events (2/3 width) — same as News left column */}
          <div className="lg:w-2/3">

            {/* Search + Filter + Submit — lg:sticky */}
            {/* Fine-tune: adjust top-[72px] if navbar height changes */}
            <div className="lg:sticky top-[72px] z-30 bg-white mb-6 pb-4"> {/* pb-4 = extra bottom padding below filter row when sticky */}
              {/* Search bar — no focus ring/outline, only border color change on focus */}
              <div className="relative mb-3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400 text-lg md:text-xl" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search events by title, description or location..."
                  className="w-full pl-12 pr-4 py-3 md:py-3.5 bg-white border-2 border-emerald-200 rounded-xl focus:border-emerald-400 outline-none transition-all duration-300 text-black placeholder:text-gray-500 text-sm md:text-base hover:border-emerald-300 shadow"
                />
                {searchTerm && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-gray-500 hover:text-red-500 transition-colors duration-200 text-sm md:text-base"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              {/* Filter + Submit */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center shrink-0">
                  <FaFilter className="text-emerald-600 mr-2 text-sm" />
                  <span className="text-gray-700 font-semibold text-sm">Filter:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.map(f => (
                    <button
                      key={f.id}
                      onClick={() => setActiveFilter(f.id)}
                      className={
                        activeFilter === f.id
                          ? 'px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-700 text-white shadow-md transition-all duration-200'
                          : 'px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-all duration-200'
                      }
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-full shadow-md transition-all duration-200 whitespace-nowrap ml-auto"
                >
                  <FaPlus className="text-xs" />
                  Submit Event
                </button>
              </div>
            </div>

            {/* Events Grid */}
            <div className="mt-8 md:mt-10">
              {/* Fine-tune: title left, count right — always same line on all screen sizes */}
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-emerald-900">
                  {activeFilter === 'all' ? 'All Events' : filterOptions.find(f => f.id === activeFilter)?.label}
                </h2>
                <div className="text-xs md:text-sm text-gray-600">
                  {searchTerm ? (
                    <span className="flex items-center">
                      <FaSearch className="mr-1 md:mr-2" />
                      {filteredEvents.length} results
                    </span>
                  ) : (
                    <span>{filteredEvents.length} Events</span>
                  )}
                </div>
              </div>

              {filteredEvents.length === 0 ? (
                <div className="text-center py-8 md:py-12 bg-gray-50 rounded-xl">
                  <FaSearch className="text-3xl md:text-4xl text-gray-400 mx-auto mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-2">No events found</h3>
                  {(searchTerm || activeFilter !== 'all') && (
                    <button
                      onClick={() => { setSearchTerm(''); setActiveFilter('all'); }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 md:px-6 rounded-lg transition-all duration-300 text-sm md:text-base"
                    >
                      Show All Events
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {filteredEvents.map((event, index) => (
                    <div
                      key={event.id}
                      data-card-id={event.id}
                      className={getCardAnimationClass(event.id)}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      {/* Image — same as News card */}
                      <div className="relative h-40 md:h-48 overflow-hidden">
                        <img
                          src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'; }}
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(event.type)}`}>
                            {event.status || event.type}
                          </span>
                        </div>
                        {event.category && (
                          <div className="absolute top-3 right-3">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${event.category === 'bdf' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                              {getCategoryLabel(event.category)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-4 md:p-6">
                        {/* Date — same as News */}
                        <div className="flex items-center text-xs text-gray-600 mb-2 md:mb-3">
                          <FaCalendarAlt className="mr-1.5 text-emerald-600" />
                          <span>{formatDate(event.start_date)}</span>
                        </div>

                        {/* Title — same as News */}
                        <h3 className="text-base md:text-lg font-bold text-emerald-900 mb-2 md:mb-3 hover:text-emerald-700 transition-colors duration-300 line-clamp-2">
                          {event.title}
                        </h3>

                        {/* Description — same as News */}
                        <p className="text-gray-600 text-xs md:text-sm mb-3 line-clamp-3">
                          {event.description}
                        </p>

                        {/* Extra meta */}
                        <div className="space-y-1 mb-3">
                          {event.time && (
                            <div className="flex items-center text-gray-600 text-xs">
                              <FaClock className="mr-1.5 text-emerald-600 flex-shrink-0" />
                              <span>{formatTime(event.time)}</span>
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center text-gray-600 text-xs">
                              <FaMapMarkerAlt className="mr-1.5 text-emerald-600 flex-shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          )}
                          {event.participants && (
                            <div className="flex items-center text-gray-600 text-xs">
                              <FaUsers className="mr-1.5 text-emerald-600 flex-shrink-0" />
                              <span>{event.participants} Participants</span>
                            </div>
                          )}
                        </div>

                        {event.type === 'upcoming' && event.registration_deadline && (
                          <div className="bg-amber-50 border border-amber-100 rounded-lg p-2.5 mb-3">
                            <div className="flex items-center text-amber-800 text-xs">
                              <FaClock className="mr-1.5 flex-shrink-0" />
                              <span className="font-bold">Deadline:</span>
                              <span className="ml-1">{formatDate(event.registration_deadline)}</span>
                            </div>
                          </div>
                        )}

                        {event.type === 'completed' && (
                          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-2.5 mb-3">
                            <div className="flex items-center text-emerald-800 text-xs">
                              <FaTrophy className="mr-1.5 flex-shrink-0" />
                              <span className="font-bold">Status:</span>
                              <span className="ml-1">{event.status || 'Completed'}</span>
                            </div>
                          </div>
                        )}

                        {/* Footer — same as News card */}
                        <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-emerald-50">
                          <Link
                            to={`/event/${event.id}`}
                            className="text-emerald-600 hover:text-emerald-800 font-bold text-xs md:text-sm flex items-center"
                          >
                            View Details <FaArrowRight className="ml-1 md:ml-1.5 text-xs" />
                          </Link>
                          {event.type === 'upcoming' && event.status?.toLowerCase() === 'open' && (
                            <Link
                              to={`/registration/${event.id}`}
                              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-1.5 px-3 rounded-full transition-all duration-300 text-xs"
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
          </div>

          {/* Right Column — Calendar (1/3 width) — same structure as News Announcements */}
          <div className="lg:w-1/3">
            <div className="lg:sticky top-[72px] z-20">

              {/* Calendar Header — same as Announcements header */}
              <div className="bg-emerald-600 text-white rounded-t-xl p-4 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl md:text-2xl font-bold flex items-center">
                    <FaCalendarAlt className="mr-2 md:mr-3" />
                    Event Calendar
                  </h2>
                  <span className="bg-white/20 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                    {events.filter(e => e.type === 'upcoming').length} Upcoming
                  </span>
                </div>
                <p className="text-emerald-100 text-xs md:text-sm">
                  Upcoming events from Bangladesh Debate Federation
                </p>
              </div>

              {/* Calendar Body — same as Announcements list wrapper */}
              <div className="bg-white border border-emerald-100 rounded-b-xl overflow-hidden">

                {/* Month navigation */}
                <div className="flex items-center justify-between px-3 py-2 bg-emerald-50 border-b border-emerald-100">
                  <button
                    onClick={() => { setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)); setSelectedDayEvents(null); }}
                    className="text-emerald-700 hover:bg-emerald-100 p-1.5 rounded-full transition-colors"
                  >
                    <FaChevronLeft className="text-xs" />
                  </button>
                  <span className="text-emerald-900 font-bold text-sm">
                    {calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <button
                    onClick={() => { setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)); setSelectedDayEvents(null); }}
                    className="text-emerald-700 hover:bg-emerald-100 p-1.5 rounded-full transition-colors"
                  >
                    <FaChevronRight className="text-xs" />
                  </button>
                </div>

                {/* Day labels */}
                <div className="grid grid-cols-7 border-b border-emerald-50 px-2 pt-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                    <div key={d} className="text-center text-xs text-emerald-600 font-semibold py-1">{d}</div>
                  ))}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7 p-2 gap-0.5">
                  {(() => {
                    const { firstDay, daysInMonth, year, month } = getDaysInMonth(calendarMonth);
                    const today = new Date().toDateString();
                    const cells = [];

                    for (let i = 0; i < firstDay; i++)
                      cells.push(<div key={`e${i}`} className="h-8" />);

                    for (let day = 1; day <= daysInMonth; day++) {
                      const thisDate = new Date(year, month, day).toDateString();
                      const isToday = thisDate === today;
                      const dayEvents = eventsByDate[thisDate] || [];
                      const hasBdf = dayEvents.some(e => e.category === 'bdf');
                      const hasOther = dayEvents.some(e => e.category === 'other');
                      const hasEvent = dayEvents.length > 0;

                      let circleCls = 'text-gray-600';
                      if (hasBdf && hasOther) circleCls = 'bg-gradient-to-br from-emerald-500 to-amber-500 text-white shadow-sm';
                      else if (hasBdf) circleCls = 'bg-emerald-600 text-white shadow-sm';
                      else if (hasOther) circleCls = 'bg-amber-500 text-white shadow-sm';
                      else if (isToday) circleCls = 'bg-emerald-200 text-emerald-900';

                      cells.push(
                        <div
                          key={day}
                          onClick={() => hasEvent && handleDayClick(dayEvents)}
                          className={`flex flex-col items-center justify-start pt-1 pb-1 rounded-lg min-h-[40px] transition-all duration-150 ${hasEvent ? 'cursor-pointer hover:bg-emerald-50' : 'cursor-default'} ${isToday && !hasEvent ? 'bg-emerald-50' : ''}`}
                        >
                          <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold ${circleCls}`}>
                            {day}
                          </span>
                          {hasEvent && (
                            <div className="flex gap-0.5 mt-0.5 justify-center">
                              {hasBdf && <span className="w-1 h-1 rounded-full bg-emerald-500" />}
                              {hasOther && <span className="w-1 h-1 rounded-full bg-amber-500" />}
                            </div>
                          )}
                        </div>
                      );
                    }
                    return cells;
                  })()}
                </div>

                {/* Selected day events list */}
                {selectedDayEvents && (
                  <div className="border-t border-emerald-100 px-3 py-2 bg-emerald-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                        {new Date(selectedDayEvents[0].start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <button onClick={() => setSelectedDayEvents(null)} className="text-gray-400 hover:text-gray-600">
                        <FaTimes className="text-xs" />
                      </button>
                    </div>
                    <div className="space-y-1.5 max-h-32 overflow-y-auto">
                      {selectedDayEvents.map(event => (
                        <div
                          key={event.id}
                          onClick={() => { setSelectedDayEvents(null); navigate(`/event/${event.id}`); }}
                          className="flex items-center gap-1.5 p-1.5 bg-white rounded border border-emerald-100 cursor-pointer hover:border-emerald-400 hover:shadow-sm transition-all duration-150 group"
                        >
                          <div className={`w-0.5 h-6 rounded-full flex-shrink-0 ${event.category === 'bdf' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-emerald-900 truncate">{event.title}</p>
                          </div>
                          <FaArrowRight className="text-emerald-400 text-xs flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Legend */}
                <div className="flex items-center gap-3 px-3 py-2.5 border-t border-emerald-100 bg-white flex-wrap">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-xs text-gray-600">BDF Event</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-xs text-gray-600">Other Org</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-200" />
                    <span className="text-xs text-gray-500">Today</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleModalClose} />
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-emerald-100 w-full max-w-4xl max-h-[70vh] md:max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex-shrink-0 bg-emerald-700 text-white px-6 py-4 rounded-t-2xl flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Submit Event Request</h2>
                <p className="text-emerald-200 text-xs mt-0.5">Your submission will be reviewed by admins before going live</p>
              </div>
              <button onClick={handleModalClose} className="text-white hover:bg-emerald-600 p-2 rounded-full transition-colors" aria-label="Close">
                <FaTimes />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 overscroll-contain">
              {modalSuccess && (
                <div className="mx-6 mt-5 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
                  <FaCheckCircle className="text-emerald-600 text-xl flex-shrink-0" />
                  <div>
                    <p className="text-emerald-800 font-semibold">Event submitted successfully!</p>
                    <p className="text-emerald-600 text-sm">Your request has been received and will be reviewed shortly.</p>
                  </div>
                </div>
              )}
              {modalError && (
                <div className="mx-6 mt-5 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                  <FaExclamationCircle className="text-red-500 text-xl flex-shrink-0" />
                  <div>
                    <p className="text-red-700 font-semibold">Submission failed</p>
                    <p className="text-red-600 text-sm">{modalError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="p-6 space-y-8">
                {/* Event Information */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-1 h-5 rounded-full bg-emerald-600" />
                    <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-widest">Event Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Event Title <span className="text-red-500">*</span></label>
                      <input type="text" name="title" value={formData.title} onChange={handleChange} className={inputClass('title')} placeholder="Enter event title" required />
                      {validationErrors.title && <p className="mt-1 text-xs text-red-500">{validationErrors.title[0]}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description <span className="text-red-500">*</span></label>
                      <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className={`${inputClass('description')} resize-none`} placeholder="Describe the event in detail" required />
                      {validationErrors.description && <p className="mt-1 text-xs text-red-500">{validationErrors.description[0]}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start Date <span className="text-red-500">*</span></label>
                      <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} className={inputClass('start_date')} required />
                      {validationErrors.start_date && <p className="mt-1 text-xs text-red-500">{validationErrors.start_date[0]}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">End Date</label>
                      <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} min={formData.start_date} className={inputClass('end_date')} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Time</label>
                      <input type="time" name="time" value={formData.time} onChange={handleChange} className={inputClass('time')} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location <span className="text-red-500">*</span></label>
                      <input type="text" name="location" value={formData.location} onChange={handleChange} className={inputClass('location')} placeholder="Event venue or city" required />
                      {validationErrors.location && <p className="mt-1 text-xs text-red-500">{validationErrors.location[0]}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Event Type <span className="text-red-500">*</span></label>
                      <select name="type" value={formData.type} onChange={handleChange} className={selectClass} required>
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Participants</label>
                      <input type="text" name="participants" value={formData.participants} onChange={handleChange} className={inputClass('participants')} placeholder="e.g., 500+ ( If Event is Completed)" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Registration Deadline</label>
                      <input type="date" name="registration_deadline" value={formData.registration_deadline} onChange={handleChange} min={new Date().toISOString().split('T')[0]} className={inputClass('registration_deadline')} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Event Link</label>
                      <input type="url" name="event_link" value={formData.event_link} onChange={handleChange} className={inputClass('event_link')} placeholder="https://facebook.com/event" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status Text</label>
                      <input type="text" name="status" value={formData.status} onChange={handleChange} className={inputClass('status')} placeholder="e.g., Open for Registration" />
                    </div>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-1 h-5 rounded-full bg-emerald-600" />
                    <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-widest">
                      Event Image <span className="text-red-500 normal-case font-normal">*</span>
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {imagePreview && (
                      <div className="relative w-48 h-36 border-2 border-emerald-200 rounded-xl overflow-hidden shadow-sm">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <button type="button" onClick={clearImage} className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full transition-colors shadow">
                          <FaTimes size={10} />
                        </button>
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/jpeg,image/png,image/jpg,image/gif" className="hidden" id="event-image" />
                      <label htmlFor="event-image" className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 border border-emerald-300 text-emerald-700 rounded-lg hover:bg-emerald-100 cursor-pointer transition-colors font-semibold text-sm">
                        <FaUpload className="text-emerald-600" />
                        Choose Image
                      </label>
                      {imageFile && <span className="text-sm text-gray-700 font-medium truncate max-w-xs">{imageFile.name}</span>}
                    </div>
                    <p className="text-xs text-gray-500">Maximum 2MB · Accepted: JPG, PNG, GIF</p>
                    {validationErrors.image && <p className="text-xs text-red-500">{validationErrors.image[0]}</p>}
                  </div>
                </div>

                {/* Your Information */}
                <div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-1 h-5 rounded-full bg-emerald-600" />
                    <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-widest">Your Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name <span className="text-red-500">*</span></label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass('name')} placeholder="Enter your full name" required />
                      {validationErrors.name && <p className="mt-1 text-xs text-red-500">{validationErrors.name[0]}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass('email')} placeholder="your@email.com" required />
                      {validationErrors.email && <p className="mt-1 text-xs text-red-500">{validationErrors.email[0]}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass('phone')} placeholder="+8801XXXXXXXXX" required />
                      {validationErrors.phone && <p className="mt-1 text-xs text-red-500">{validationErrors.phone[0]}</p>}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-emerald-100">
                  <button type="button" onClick={handleModalClose} disabled={modalLoading} className="px-6 py-2.5 border border-emerald-200 rounded-lg text-emerald-700 font-semibold hover:bg-emerald-50 transition-colors disabled:opacity-50">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={modalLoading || modalSuccess}
                    className="px-7 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
                  >
                    {modalLoading ? (
                      <><FaSpinner className="animate-spin" /> Submitting...</>
                    ) : modalSuccess ? (
                      <><FaCheckCircle /> Submitted!</>
                    ) : 'Submit Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Events;