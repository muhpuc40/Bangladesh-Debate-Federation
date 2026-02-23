// NewsDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import {
  FaCalendarAlt,
  FaUser,
  FaArrowLeft,
  FaPrint,
  FaDownload,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaEye,
  FaComment,
  FaTag,
  FaNewspaper,
  FaArrowRight,
  FaSpinner,
  FaExclamationCircle
} from 'react-icons/fa';

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await apiService.getNews();

        let newsArray = [];
        if (result && result.status === "success" && Array.isArray(result.data)) {
          newsArray = result.data;
        } else if (Array.isArray(result)) {
          newsArray = result;
        } else if (result && result.success && Array.isArray(result.data)) {
          newsArray = result.data;
        } else {
          throw new Error('Invalid data format received from server');
        }

        setAllNews(newsArray);

        const foundNews = newsArray.find(n => String(n.id) === String(id));

        if (!foundNews) {
          throw new Error('News not found');
        }

        setNews(foundNews);

      } catch (err) {
        console.error('Error fetching news:', err);
        if (err.message.includes('Failed to fetch') || err.message.includes('Network Error')) {
          setError('Unable to connect to server. Please check your connection.');
        } else {
          setError(err.message || 'An error occurred while fetching news details');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const otherNews = allNews.filter(n => String(n.id) !== String(id)).slice(0, 5);

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
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

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
    return colors[categoryLower] || 'bg-emerald-100 text-emerald-800';
  };



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

  if (error || !news) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">News not found</h3>
            <p className="text-gray-600 mb-6">{error || 'The news article you are looking for does not exist.'}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate(-1)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300"
              >
                Go Back
              </button>
              <Link
                to="/news"
                className="border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-bold py-3 px-6 rounded-full transition-all duration-300"
              >
                Browse News
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <section className="pt-24 pb-8 md:pt-28 md:pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-emerald-600 hover:text-emerald-800 font-medium transition-colors duration-300"
            >
              <FaArrowLeft className="mr-2 text-sm" />
              Back to News
            </button>
          </div>

          {/* Card Header with Tags */}
          <div className="mb-6">
            {/* Category and Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {news.category && (
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${getCategoryColor(news.category)}`}>
                  {news.category}
                </span>
              )}
              {/* Additional Tags */}
              {news.tags && news.tags.map((tag, index) => (
                <span key={index} className="px-4 py-1.5 rounded-full text-sm font-bold bg-purple-100 text-purple-800 border border-purple-200">
                  <FaTag className="inline mr-1 text-xs" />
                  {tag}
                </span>
              ))}
            </div>

            {/* News Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-2">
              {news.title}
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main News Content (2/3 width) */}
            <div className="lg:col-span-2">
              {/* Single Card */}
              <div className="bg-white rounded-xl border border-emerald-100 shadow-lg overflow-hidden">
                {/* News Image */}
                <div className="p-6">
                  <div className="rounded-xl overflow-hidden border border-emerald-100">
                    <img
                      src={news.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'}
                      alt={news.title}
                      className="w-full h-[400px] object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                  </div>
                </div>

                {/* News Details */}
                <div className="p-6 pt-0">
                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600 border-b border-emerald-100 pb-4">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-emerald-600" />
                      <span>{formatDate(news.date)}</span>
                    </div>
                    {news.author && (
                      <div className="flex items-center">
                        <FaUser className="mr-2 text-emerald-600" />
                        <span>By {news.author}</span>
                      </div>
                    )}
                    {news.views && (
                      <div className="flex items-center">
                        <FaEye className="mr-2 text-emerald-600" />
                        <span>{news.views} views</span>
                      </div>
                    )}
                    {news.comments && (
                      <div className="flex items-center">
                        <FaComment className="mr-2 text-emerald-600" />
                        <span>{news.comments} comments</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="prose max-w-none text-gray-700">
                    {news.excerpt && (
                      <div className="text-lg font-medium text-emerald-800 mb-4 italic border-l-4 border-emerald-600 pl-4">
                        {news.excerpt}
                      </div>
                    )}

                    <div className="mt-4 space-y-4">
                      <p className="text-lg">{news.content}</p>

                      {news.details && (
                        <div className="mt-6">
                          <p>{news.details}</p>
                        </div>
                      )}
                    </div>

                    {/* Additional Content Sections */}
                    {news.sections && news.sections.map((section, index) => (
                      <div key={index} className="mt-8">
                        {section.title && (
                          <h2 className="text-2xl font-bold text-emerald-800 mb-3">{section.title}</h2>
                        )}
                        <p>{section.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* Source/Reference */}
                  {news.source && (
                    <div className="mt-8 pt-6 border-t border-emerald-100">
                      <p className="text-sm text-gray-600">
                        Source: <a href={news.source.url} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-800 hover:underline">
                          {news.source.name || news.source.url}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar (1/3 width) */}
            <div className="lg:col-span-1">
              {/* Other News Section */}
              {otherNews.length > 0 && (
                <div className="bg-white rounded-xl border border-emerald-100 p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-emerald-900 flex items-center">
                      <FaNewspaper className="mr-2" />
                      More News
                    </h3>
                    <Link
                      to="/news"
                      className="text-emerald-600 hover:text-emerald-800 text-sm font-medium flex items-center"
                    >
                      View All <FaArrowRight className="ml-1 text-xs" />
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {otherNews.map(otherItem => (
                      <Link
                        key={otherItem.id}
                        to={`/news/${otherItem.id}`}
                        className="block p-3 border border-emerald-100 rounded-lg transition-all duration-300 hover:shadow-md hover:border-emerald-300 hover:bg-emerald-50"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-emerald-200">
                            <img
                              src={otherItem.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'}
                              alt={otherItem.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-emerald-900 text-sm mb-1 line-clamp-2 hover:text-emerald-700">
                              {otherItem.title}
                            </h4>
                            <div className="flex items-center text-xs text-gray-600 mb-1">
                              <FaCalendarAlt className="mr-1 text-emerald-600 flex-shrink-0" />
                              <span className="truncate">{formatShortDate(otherItem.date)}</span>
                            </div>
                            <div>
                              <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${getCategoryColor(otherItem.category)}`}>
                                {otherItem.category || 'News'}
                              </span>
                            </div>
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

      <style jsx>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
        }
        
        /* Rich text content styling */
        .prose h2 {
          color: #065f46;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }
        
        .prose h3 {
          color: #047857;
          margin-top: 1.25rem;
          margin-bottom: 0.75rem;
        }
        
        .prose ul, .prose ol {
          margin-top: 0.5rem;
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        
        .prose li {
          margin-bottom: 0.25rem;
        }
        
        .prose a {
          color: #059669;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 2px;
        }
        
        .prose a:hover {
          color: #047857;
          text-decoration-thickness: 2px;
        }
        
        .prose blockquote {
          border-left-color: #059669;
          background-color: #f0fdf4;
          padding: 1rem;
          border-radius: 0.5rem;
          font-style: italic;
          margin: 1rem 0;
        }
        
        .prose img {
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
        
        .prose table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        
        .prose th {
          background-color: #f0fdf4;
          font-weight: 600;
          padding: 0.5rem;
          border: 1px solid #d1fae5;
        }
        
        .prose td {
          padding: 0.5rem;
          border: 1px solid #d1fae5;
        }
      `}</style>
    </div>
  );
};

export default NewsDetails;