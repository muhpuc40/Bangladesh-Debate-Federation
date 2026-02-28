import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaClock,
  FaArrowRight,
  FaExclamationCircle,
  FaRegClock,
} from 'react-icons/fa';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        if (!foundEvent) throw new Error('Event not found');

        setEvent(foundEvent);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'An error occurred while fetching event details');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const otherEvents = allEvents.filter(e => String(e.id) !== String(id)).slice(0, 5);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not specified';
    try {
      return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch { return dateString; }
  };

  const formatShortDate = (dateString) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch { return dateString; }
  };

  const formatTime = (timeString) => {
    if (!timeString) return null;
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      return `${hour % 12 || 12}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
    } catch { return timeString; }
  };

  const getTypeColor = (type) => ({
    'upcoming':  'bg-emerald-100 text-emerald-800 border-emerald-200',
    'ongoing':   'bg-teal-100 text-teal-800 border-teal-200',
    'completed': 'bg-gray-100 text-gray-700 border-gray-200',
  }[type] || 'bg-emerald-100 text-emerald-800 border-emerald-200');

  const getCategoryLabel = (category) => ({
    'bdf':   'BDF Event',
    'other': 'Other Organization',
  }[category] || category);

  const getCategoryColor = (category) =>
    category === 'bdf' ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white';

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading event...</p>
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
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
              >
                Go Back
              </button>
              <Link
                to="/events"
                className="border border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold py-3 px-6 rounded-full transition-all duration-300"
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
      <section className="pt-24 pb-12 md:pt-28 md:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Badges + Title */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getTypeColor(event.type)}`}>
                {event.type}
              </span>
              {event.category && (
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${getCategoryColor(event.category)}`}>
                  {getCategoryLabel(event.category)}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 leading-tight">
              {event.title}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── Main Content ── */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-emerald-100 shadow-lg overflow-hidden">

                {/* Image */}
                <div className="p-6 pb-0">
                  <div className="rounded-xl overflow-hidden border border-emerald-100">
                    <img
                      src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'}
                      alt={event.title}
                      className="w-full h-[400px] object-cover"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'; }}
                    />
                  </div>
                </div>

                <div className="p-6">

                  {/* Description */}
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">{event.description}</p>

                  {/* Status — only shown if the field has a value */}
                  {event.status && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Status</p>
                      <p className="text-emerald-900 font-bold text-base">{event.status}</p>
                    </div>
                  )}

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                      <div className="flex items-center gap-3">
                        <div className="bg-emerald-600 text-white p-2 rounded-lg">
                          <FaCalendarAlt className="text-sm" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Start Date</p>
                          <p className="font-semibold text-emerald-900">{formatDate(event.start_date)}</p>
                        </div>
                      </div>
                    </div>

                    {event.end_date && (
                      <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                        <div className="flex items-center gap-3">
                          <div className="bg-emerald-600 text-white p-2 rounded-lg">
                            <FaCalendarAlt className="text-sm" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-0.5">End Date</p>
                            <p className="font-semibold text-emerald-900">{formatDate(event.end_date)}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {event.time && (
                      <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                        <div className="flex items-center gap-3">
                          <div className="bg-emerald-600 text-white p-2 rounded-lg">
                            <FaClock className="text-sm" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-0.5">Time</p>
                            <p className="font-semibold text-emerald-900">{formatTime(event.time)}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {event.location && (
                      <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                        <div className="flex items-center gap-3">
                          <div className="bg-emerald-600 text-white p-2 rounded-lg">
                            <FaMapMarkerAlt className="text-sm" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-0.5">Location</p>
                            <p className="font-semibold text-emerald-900">{event.location}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {event.participants && (
                      <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                        <div className="flex items-center gap-3">
                          <div className="bg-emerald-600 text-white p-2 rounded-lg">
                            <FaUsers className="text-sm" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-0.5">Participants</p>
                            <p className="font-semibold text-emerald-900">{event.participants}</p>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Registration Deadline */}
                  {event.registration_deadline && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <FaExclamationCircle className="text-amber-500 text-xl flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Registration Deadline</p>
                          <p className="font-bold text-amber-900">{formatDate(event.registration_deadline)}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Event Link */}
                  {event.event_link && (
                    <div className="mt-6 pt-6 border-t border-emerald-100">
                      <a
                        href={event.event_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-2.5 px-5 rounded-full transition-all duration-300"
                      >
                        Visit Event Page <FaArrowRight className="text-sm" />
                      </a>
                    </div>
                  )}

                </div>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="lg:col-span-1">
              {otherEvents.length > 0 && (
                <div className="bg-white rounded-xl border border-emerald-100 p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-emerald-900">Other Events</h3>
                    <Link to="/events" className="text-emerald-600 hover:text-emerald-800 text-sm font-medium flex items-center gap-1">
                      View All <FaArrowRight className="text-xs" />
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {otherEvents.map(otherEvent => (
                      <Link
                        key={otherEvent.id}
                        to={`/event/${otherEvent.id}`}
                        className="block p-3 border border-emerald-100 rounded-lg hover:shadow-md hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-emerald-100">
                            <img
                              src={otherEvent.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'}
                              alt={otherEvent.title}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'; }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-emerald-900 text-sm mb-1 line-clamp-2">{otherEvent.title}</h4>
                            <div className="flex items-center text-xs text-gray-500 mb-1.5">
                              <FaCalendarAlt className="mr-1 text-emerald-500 flex-shrink-0" />
                              <span>{formatShortDate(otherEvent.start_date)}</span>
                            </div>
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${getTypeColor(otherEvent.type)}`}>
                              {otherEvent.type}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetails;