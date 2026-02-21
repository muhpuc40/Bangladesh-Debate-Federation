import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaClock, 
  FaArrowLeft,
  FaShare,
  FaPrint,
  FaDownload,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaRegClock,
  FaUserTie,
  FaPhone,
  FaGlobe,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
  FaArrowRight
} from 'react-icons/fa';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await apiService.getEvents();

        let eventsArray = [];
        if (result && result.status === "success" && Array.isArray(result.data)) {
          eventsArray = result.data;
        } else if (Array.isArray(result)) {
          eventsArray = result;
        } else if (result && result.success && Array.isArray(result.data)) {
          eventsArray = result.data;
        } else {
          throw new Error('Invalid data format received from server');
        }

        setAllEvents(eventsArray);

        const foundEvent = eventsArray.find(e => String(e.id) === String(id));

        if (!foundEvent) {
          throw new Error('Event not found');
        }

        setEvent(foundEvent);

      } catch (err) {
        console.error('Error fetching data:', err);
        if (err.message.includes('Failed to fetch') || err.message.includes('Network Error')) {
          setError('Unable to connect to server. Please check your connection.');
        } else {
          setError(err.message || 'An error occurred while fetching event details');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const otherEvents = allEvents.filter(e => String(e.id) !== String(id)).slice(0, 5);

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

  const formatShortDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

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

  const getStatusColor = (status) => {
    const colors = {
      'upcoming': 'bg-green-100 text-green-800 border-green-200',
      'ongoing': 'bg-blue-100 text-blue-800 border-blue-200',
      'completed': 'bg-gray-100 text-gray-800 border-gray-200',
      'cancelled': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status?.toLowerCase()] || 'bg-emerald-100 text-emerald-800 border-emerald-200';
  };

  // Share functions
  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${event?.title}&url=${window.location.href}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${event?.title}%20${window.location.href}`, '_blank');
  };

  const shareByEmail = () => {
    window.location.href = `mailto:?subject=${event?.title}&body=Check out this event: ${window.location.href}`;
  };

  const printPage = () => {
    window.print();
  };

  const downloadAsPDF = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-emerald-600 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading event details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Event not found</h3>
            <p className="text-gray-600 mb-6">{error || 'The event you are looking for does not exist.'}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
              >
                Go Back
              </button>
              <Link
                to="/events"
                className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-bold py-3 px-6 rounded-full transition-all duration-300"
              >
                Browse Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Back and Share Buttons */}
      <div className="bg-white border-b border-emerald-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-emerald-700 hover:text-emerald-900 font-medium transition-colors"
            >
              <FaArrowLeft className="mr-2" /> Back
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center text-emerald-700 hover:text-emerald-900 font-medium transition-colors"
              >
                <FaShare className="mr-2" /> Share
              </button>
              
              {showShareMenu && (
                <div className="absolute top-10 right-0 bg-white rounded-lg shadow-xl border border-emerald-100 p-2 z-50 w-48">
                  <button onClick={shareOnFacebook} className="w-full text-left px-4 py-2 hover:bg-blue-50 rounded-lg flex items-center text-gray-700">
                    <FaFacebook className="mr-2 text-blue-600" /> Facebook
                  </button>
                  <button onClick={shareOnTwitter} className="w-full text-left px-4 py-2 hover:bg-blue-50 rounded-lg flex items-center text-gray-700">
                    <FaTwitter className="mr-2 text-blue-400" /> Twitter
                  </button>
                  <button onClick={shareOnLinkedIn} className="w-full text-left px-4 py-2 hover:bg-blue-50 rounded-lg flex items-center text-gray-700">
                    <FaLinkedin className="mr-2 text-blue-700" /> LinkedIn
                  </button>
                  <button onClick={shareOnWhatsApp} className="w-full text-left px-4 py-2 hover:bg-green-50 rounded-lg flex items-center text-gray-700">
                    <FaWhatsapp className="mr-2 text-green-600" /> WhatsApp
                  </button>
                  <button onClick={shareByEmail} className="w-full text-left px-4 py-2 hover:bg-red-50 rounded-lg flex items-center text-gray-700">
                    <FaEnvelope className="mr-2 text-red-600" /> Email
                  </button>
                  <div className="border-t border-gray-200 my-2"></div>
                  <button onClick={printPage} className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg flex items-center text-gray-700">
                    <FaPrint className="mr-2 text-gray-600" /> Print
                  </button>
                  <button onClick={downloadAsPDF} className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg flex items-center text-gray-700">
                    <FaDownload className="mr-2 text-gray-600" /> Download PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Event Content (2/3 width) */}
            <div className="lg:col-span-2">
              {/* Heading */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(event.status || event.type)}`}>
                    {event.status || event.type}
                  </span>
                  {event.category && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white">
                      {event.category}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">{event.title}</h1>
              </div>

              {/* Event Image */}
              <div className="mb-8 rounded-xl overflow-hidden border border-emerald-100 shadow-lg">
                <img
                  src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'}
                  alt={event.title}
                  className="w-full h-[400px] object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
                  }}
                />
              </div>

              {/* Event Description */}
              <div className="bg-white rounded-xl border border-emerald-100 p-6">
                <h2 className="text-2xl font-bold text-emerald-900 mb-4">About the Event</h2>
                <div className="prose max-w-none text-gray-700">
                  <p className="mb-4 text-lg">{event.description}</p>
                  {event.details && (
                    <div className="mt-6">
                      <p>{event.details}</p>
                    </div>
                  )}
                </div>

                {/* Event Info Cards - Below Description */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                    <div className="flex items-center">
                      <div className="bg-emerald-600 text-white p-2 rounded-lg mr-3">
                        <FaCalendarAlt className="text-sm" />
                      </div>
                      <div>
                        <h3 className="text-xs text-gray-600">Date</h3>
                        <p className="font-semibold text-emerald-900">{formatDate(event.date)}</p>
                      </div>
                    </div>
                  </div>

                  {event.time && (
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                      <div className="flex items-center">
                        <div className="bg-emerald-600 text-white p-2 rounded-lg mr-3">
                          <FaClock className="text-sm" />
                        </div>
                        <div>
                          <h3 className="text-xs text-gray-600">Time</h3>
                          <p className="font-semibold text-emerald-900">{formatTime(event.time)}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {event.location && (
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                      <div className="flex items-center">
                        <div className="bg-emerald-600 text-white p-2 rounded-lg mr-3">
                          <FaMapMarkerAlt className="text-sm" />
                        </div>
                        <div>
                          <h3 className="text-xs text-gray-600">Location</h3>
                          <p className="font-semibold text-emerald-900">{event.location}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {event.participants && (
                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                      <div className="flex items-center">
                        <div className="bg-emerald-600 text-white p-2 rounded-lg mr-3">
                          <FaUsers className="text-sm" />
                        </div>
                        <div>
                          <h3 className="text-xs text-gray-600">Participants</h3>
                          <p className="font-semibold text-emerald-900">{event.participants}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Registration Deadline Alert */}
                {event.type === 'upcoming' && event.registration_deadline && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-6">
                    <div className="flex items-start">
                      <FaExclamationCircle className="text-yellow-600 text-xl mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-yellow-800 mb-1">Registration Deadline</h3>
                        <p className="text-yellow-700 text-sm mb-2">
                          Registrations close on {formatDate(event.registration_deadline)}
                        </p>
                        <div className="flex items-center text-sm">
                          <FaRegClock className="mr-2 text-yellow-600" />
                          <span className="text-yellow-700 font-medium">
                            {new Date(event.registration_deadline) > new Date() ? 'Open' : 'Closed'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Organizer Info */}
                {event.organizer && (
                  <div className="mt-6 pt-6 border-t border-emerald-100">
                    <h3 className="text-lg font-bold text-emerald-900 mb-4">Organizer</h3>
                    <div className="flex items-start">
                      <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg mr-3">
                        <FaUserTie className="text-lg" />
                      </div>
                      <div>
                        <h4 className="font-bold text-emerald-900">{event.organizer.name}</h4>
                        {event.organizer.email && (
                          <p className="flex items-center text-sm text-gray-600 mt-1">
                            <FaEnvelope className="mr-2 text-emerald-600 text-xs" />
                            <a href={`mailto:${event.organizer.email}`} className="hover:text-emerald-700">
                              {event.organizer.email}
                            </a>
                          </p>
                        )}
                        {event.organizer.phone && (
                          <p className="flex items-center text-sm text-gray-600 mt-1">
                            <FaPhone className="mr-2 text-emerald-600 text-xs" />
                            <a href={`tel:${event.organizer.phone}`} className="hover:text-emerald-700">
                              {event.organizer.phone}
                            </a>
                          </p>
                        )}
                        {event.organizer.website && (
                          <p className="flex items-center text-sm text-gray-600 mt-1">
                            <FaGlobe className="mr-2 text-emerald-600 text-xs" />
                            <a href={event.organizer.website} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-700">
                              {event.organizer.website}
                            </a>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Sidebar (1/3 width) */}
            <div className="lg:col-span-1">
              {/* Other Events Section */}
              {otherEvents.length > 0 && (
                <div className="bg-white rounded-xl border border-emerald-100 p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-emerald-900">Other Events</h3>
                    <Link 
                      to="/events" 
                      className="text-emerald-600 hover:text-emerald-800 text-sm font-medium flex items-center"
                    >
                      View All <FaArrowRight className="ml-1 text-xs" />
                    </Link>
                  </div>
                  
                  <div className="space-y-3">
                    {otherEvents.map(otherEvent => (
                      <Link
                        key={otherEvent.id}
                        to={`/event/${otherEvent.id}`}
                        className="block p-3 border border-emerald-100 rounded-lg transition-all duration-300 hover:shadow-md hover:border-emerald-300 hover:bg-emerald-50"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-emerald-200">
                            <img
                              src={otherEvent.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'}
                              alt={otherEvent.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-emerald-900 text-sm mb-1 line-clamp-2 hover:text-emerald-700">
                              {otherEvent.title}
                            </h4>
                            <div className="flex items-center text-xs text-gray-600 mb-1">
                              <FaCalendarAlt className="mr-1 text-emerald-600 flex-shrink-0" />
                              <span className="truncate">{formatShortDate(otherEvent.date)}</span>
                            </div>
                            <div>
                              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                otherEvent.type === 'upcoming' ? 'bg-green-100 text-green-800' :
                                otherEvent.type === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                                otherEvent.type === 'completed' ? 'bg-gray-100 text-gray-800' :
                                'bg-emerald-100 text-emerald-800'
                              }`}>
                                {otherEvent.status || otherEvent.type || 'Event'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-emerald-100">
                    <Link
                      to="/events"
                      className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center text-sm"
                    >
                      Browse All Events
                      <FaArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
        }
      `}</style>
    </div>
  );
};

export default EventDetails;