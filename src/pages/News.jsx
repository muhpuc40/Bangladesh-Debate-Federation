import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaCalendarAlt,
  FaUser,
  FaArrowRight,
  FaSearch,
  FaBookmark,
  FaEye,
  FaComment,
  FaNewspaper,
  FaBullhorn,
  FaExclamationTriangle,
  FaBell,
  FaRegClock,
  FaFire
} from 'react-icons/fa';
import apiService from '../services/apiService';

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [news, setNews] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const [error, setError] = useState(null);
  const announcementScrollRef = useRef(null);

  // Fetch news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoadingNews(true);
        setError(null);

        const result = await apiService.getNews();

        if (result && result.status === "success" && Array.isArray(result.data)) {
          setNews(result.data);
        } else if (Array.isArray(result)) {
          setNews(result);
        } else if (result && result.success && Array.isArray(result.data)) {
          setNews(result.data);
        } else {
          throw new Error('Invalid data format received from server');
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        if (err.message.includes('Failed to fetch') || err.message.includes('Network Error')) {
          setError('Unable to connect to server. Please check your connection.');
        } else {
          setError(err.message || 'An error occurred while fetching news');
        }
      } finally {
        setLoadingNews(false);
      }
    };

    fetchNews();
  }, []);

  // Fetch announcements from API
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoadingAnnouncements(true);

        const result = await apiService.getAnnouncements();

        if (result && result.status === "success" && Array.isArray(result.data)) {
          setAnnouncements(result.data);
        } else if (Array.isArray(result)) {
          setAnnouncements(result);
        } else if (result && result.success && Array.isArray(result.data)) {
          setAnnouncements(result.data);
        }
      } catch (err) {
        console.error('Error fetching announcements:', err);
      } finally {
        setLoadingAnnouncements(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Filter news based on search only
  const filteredNews = news.filter(item => {
    if (!item) return false;

    const searchLower = searchTerm.toLowerCase();
    const title = item.title ? item.title.toLowerCase() : '';
    const excerpt = item.excerpt ? item.excerpt.toLowerCase() : '';
    const content = item.content ? item.content.toLowerCase() : '';
    const tags = Array.isArray(item.tags) ? item.tags.map(tag => tag.toLowerCase()) : [];
    const category = item.category ? item.category.toLowerCase() : '';
    const author = item.author ? item.author.toLowerCase() : '';

    return title.includes(searchLower) ||
      excerpt.includes(searchLower) ||
      content.includes(searchLower) ||
      tags.some(tag => tag.includes(searchLower)) ||
      category.includes(searchLower) ||
      author.includes(searchLower);
  });

  // Category colors
  const getCategoryColor = (category) => {
    if (!category) return 'bg-gray-100 text-gray-800';

    const categoryLower = category.toLowerCase();
    const colors = {
      'announcement': 'bg-blue-100 text-blue-800',
      'achievement': 'bg-green-100 text-green-800',
      'education': 'bg-purple-100 text-purple-800',
      'workshop': 'bg-orange-100 text-orange-800',
      'scholarship': 'bg-yellow-100 text-yellow-800',
      'training': 'bg-indigo-100 text-indigo-800',
      'infrastructure': 'bg-pink-100 text-pink-800',
      'results': 'bg-red-100 text-red-800'
    };
    return colors[categoryLower] || 'bg-gray-100 text-gray-800';
  };

  // Get announcement icon based on type
  const getAnnouncementIcon = (type, iconClass) => {
    if (iconClass && iconClass.includes('fas')) {
      return <i className={iconClass}></i>;
    }

    switch (type) {
      case 'urgent':
      case 'warning':
        return <FaExclamationTriangle className="text-red-500" />;
      case 'maintenance':
        return <FaBullhorn className="text-blue-500" />;
      case 'update':
        return <FaBell className="text-yellow-500" />;
      case 'new':
        return <FaFire className="text-orange-500" />;
      case 'schedule':
        return <FaRegClock className="text-purple-500" />;
      default:
        return <FaBullhorn className="text-green-500" />;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
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

  const handleAnnouncementWheel = (e) => {
    if (announcementScrollRef.current) {
      const isAtTop = announcementScrollRef.current.scrollTop === 0;
      const isAtBottom = announcementScrollRef.current.scrollTop + announcementScrollRef.current.clientHeight >=
        announcementScrollRef.current.scrollHeight - 1;

      if (isAtTop && e.deltaY < 0) {
        return;
      }
      if (isAtBottom && e.deltaY > 0) {
        return;
      }

      e.stopPropagation();
      announcementScrollRef.current.scrollTop += e.deltaY;
    }
  };

  // Loading state for news
  if (loadingNews) {
    return (
      <div className="min-h-screen bg-white" style={{ '--navbar-height': '72px' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading news...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white" style={{ '--navbar-height': '72px' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Error loading news</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
              >
                Try Again
              </button>
              <Link
                to="/"
                className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-bold py-3 px-6 rounded-full transition-all duration-300"
              >
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-white"
      style={{ '--navbar-height': '72px' }}
    >

      {/* Hero Section - Moved further down */}
      <section className="relative bg-white text-emerald-900 pt-18 md:pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight whitespace-normal sm:whitespace-nowrap">
              Debate News & Announcements
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
              Stay informed with the latest news, announcements, competition results,
              training programs, and achievements from Bangladesh Debate Federation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content with Two Columns */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">

          {/* Left Column - News (2/3 width) */}
          <div className="lg:w-2/3">

            {/* Search Bar */}
            <div className="desktop-sticky z-30 bg-transparent mb-6" style={{ top: 'var(--navbar-height)' }}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400 text-lg md:text-xl" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search news by title, content, tags or author..."
                  className="w-full pl-12 pr-4 py-3 md:py-3.5 bg-white border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-300 text-black placeholder:text-gray-500 text-sm md:text-base hover:border-emerald-300 shadow"
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
            </div>

            {/* All News Grid */}
            <div className="mt-8 md:mt-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
                <h2 className="text-xl md:text-2xl font-bold text-emerald-900">
                  Latest News
                </h2>
                <div className="text-xs md:text-sm text-gray-600">
                  {searchTerm ? (
                    <span className="flex items-center">
                      <FaSearch className="mr-1 md:mr-2" />
                      {filteredNews.length} results for "{searchTerm}"
                    </span>
                  ) : (
                    <span>{news.length} articles</span>
                  )}
                </div>
              </div>

              {filteredNews.length === 0 ? (
                <div className="text-center py-8 md:py-12 bg-gray-50 rounded-xl">
                  <FaSearch className="text-3xl md:text-4xl text-gray-400 mx-auto mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-2">No news found</h3>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">
                    {searchTerm ? `No articles match your search "${searchTerm}"` : 'No articles available'}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 md:px-6 rounded-lg transition-all duration-300 text-sm md:text-base"
                    >
                      Show All News
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {filteredNews.map(item => (
                    <div key={item.id} className="bg-white rounded-xl border border-emerald-100 overflow-hidden hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
                      <div className="relative h-40 md:h-48 overflow-hidden">
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        {item.category && (
                          <div className="absolute top-3 left-3">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${getCategoryColor(item.category)}`}>
                              {item.category}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-4 md:p-6">
                        <div className="flex items-center text-xs text-gray-600 mb-2 md:mb-3">
                          <FaCalendarAlt className="mr-1.5 text-emerald-600" />
                          <span>{formatDate(item.date)}</span>
                          {item.author && (
                            <>
                              <span className="mx-1.5 md:mx-2">•</span>
                              <FaUser className="mr-1.5 text-emerald-600" />
                              <span>{item.author}</span>
                            </>
                          )}
                        </div>

                        <h3 className="text-base md:text-lg font-bold text-emerald-900 mb-2 md:mb-3 hover:text-emerald-700 transition-colors duration-300 line-clamp-2">
                          {item.title}
                        </h3>

                        <p className="text-gray-600 text-xs md:text-sm mb-4 md:mb-6 line-clamp-3">
                          {item.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-emerald-50">
                          <Link
                            to={`/news/${item.id}`}
                            className="text-emerald-600 hover:text-emerald-800 font-bold text-xs md:text-sm flex items-center"
                          >
                            Read More <FaArrowRight className="ml-1 md:ml-1.5 text-xs" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Announcements (1/3 width) - Moved further up */}
          <div className="lg:w-1/3">
            <div className="desktop-sticky z-20 bg-transparent" style={{ top: 'calc(var(--navbar-height) + 1px)' }}>
              {/* Announcements Header */}
              <div className="bg-emerald-600 text-white rounded-t-xl p-4 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl md:text-2xl font-bold flex items-center">
                    <FaBullhorn className="mr-2 md:mr-3" />
                    Announcements
                  </h2>
                  <span className="bg-white/20 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                    {announcements.length} Active
                  </span>
                </div>
                <p className="text-emerald-100 text-xs md:text-sm">
                  Important notices and updates from BDF
                </p>
              </div>

              {/* Announcements List */}
              <div className="bg-white border border-emerald-100 rounded-b-xl overflow-hidden">
                <div
                  ref={announcementScrollRef}
                  onWheel={handleAnnouncementWheel}
                  className="max-h-[400px] md:max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-300/80 scrollbar-track-emerald-100/50 hover:scrollbar-thumb-emerald-400 scroll-smooth"
                >
                  {loadingAnnouncements ? (
                    <div className="text-center py-4">
                      <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-emerald-600"></div>
                      <p className="mt-2 text-gray-600 text-sm">Loading announcements...</p>
                    </div>
                  ) : announcements.length === 0 ? (
                    <div className="text-center py-8">
                      <FaBullhorn className="text-2xl text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600 text-sm">No announcements available</p>
                    </div>
                  ) : (
                    announcements.map(announcement => (
                      <div
                        key={announcement.id}
                        className="p-3 md:p-5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="flex items-start space-x-2 md:space-x-3">
                          <div className="flex-shrink-0 mt-0.5 md:mt-1">
                            {getAnnouncementIcon(announcement.type, announcement.icon_class)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">
                              {announcement.title}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                              {announcement.description}
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <span className={`text-xs px-2 py-1 rounded w-fit ${announcement.type === 'urgent' || announcement.type === 'warning' ? 'bg-red-100 text-red-700' :
                                announcement.type === 'update' ? 'bg-yellow-100 text-yellow-700' :
                                  announcement.type === 'new' ? 'bg-orange-100 text-orange-700' :
                                    'bg-gray-100 text-gray-700'
                                }`}>
                                {announcement.type ? announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1) : 'Notice'}
                              </span>
                              <span className="text-xs text-gray-500">
                                {announcement.time_ago ? `${announcement.time_ago} hours ago` : ''}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* View All Button */}
                <div className="p-3 md:p-4 border-t border-gray-100 bg-gray-50">
                  <button className="w-full bg-white hover:bg-emerald-50 text-emerald-700 font-bold py-2.5 md:py-3 px-4 rounded-lg border border-emerald-200 hover:border-emerald-300 transition-all duration-300 flex items-center justify-center text-sm md:text-base">
                    <FaBullhorn className="mr-1.5 md:mr-2" />
                    View All Announcements
                    <FaArrowRight className="ml-1.5 md:ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom CSS for smooth scrolling */}
      <style jsx>{`
        /* ===== DESKTOP ONLY STICKY ===== */
        @media (min-width: 1024px) {
          .desktop-sticky {
            position: sticky;
            z-index: 30;
          }
        }

        /* ===== MOBILE / TABLET ===== */
        @media (max-width: 1023px) {
          .desktop-sticky {
            position: static !important;
            margin-top: 0 !important;
            margin-bottom: 1.5rem !important;
          }
        }

        /* Custom scrollbar styling */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(209, 250, 229, 0.3);
          border-radius: 10px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.6);
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.8);
        }
        
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: rgba(16, 185, 129, 0.6) rgba(209, 250, 229, 0.3);
        }
      `}</style>
    </div>
  );
};

export default News;