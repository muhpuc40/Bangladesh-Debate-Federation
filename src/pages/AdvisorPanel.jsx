import React, { useState, useEffect } from 'react';
import { FaUserTie, FaEnvelope, FaPhone, FaMapMarkerAlt, FaQuoteRight } from 'react-icons/fa';
import apiService from '../services/apiService';

const AdvisorPanel = () => {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const result = await apiService.getAdvisors();
        setAdvisors(result.data || result);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch advisors:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAdvisors();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-emerald-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4 py-12">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">Error loading data</h3>
          <button
            onClick={() => window.location.reload()}
            className="bg-emerald-900 text-white px-6 py-2 rounded-lg hover:bg-emerald-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-50 py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
            Advisor Panel
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our experienced advisors who guide and support our community with their expertise
          </p>
        </div>

        {advisors.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No advisors found</h3>
            <p className="text-gray-600">Check back later for updates</p>
          </div>
        ) : (
          <>
            {/* Desktop Grid View */}
            <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advisors.map((advisor) => (
                <div
                  key={advisor.id || advisor._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-emerald-100"
                >
                  <div className="p-6">
                    {/* Profile Image */}
                    <div className="mb-6 flex justify-center">
                      <div className="relative">
                        {advisor.image || advisor.avatar ? (
                          <img
                            src={advisor.image || advisor.avatar}
                            alt={advisor.name}
                            className="w-32 h-32 rounded-full object-cover border-4 border-emerald-900"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(advisor.name)}&background=0D9488&color=fff&size=128`;
                            }}
                          />
                        ) : (
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(advisor.name)}&background=0D9488&color=fff&size=128`}
                            alt={advisor.name}
                            className="w-32 h-32 rounded-full border-4 border-emerald-900"
                          />
                        )}
                      </div>
                    </div>

                    {/* Advisor Info */}
                    <div className="text-center">
                      <h2 className="text-xl font-bold text-emerald-900 mb-1">
                        {advisor.name}
                      </h2>
                      <p className="text-emerald-700 font-medium mb-3">
                        {advisor.position || advisor.designation || advisor.role || 'Advisor'}
                      </p>
                      
                      {/* Quote/Bio */}
                      {advisor.bio && (
                        <div className="relative mt-4 pt-4 border-t border-emerald-100">
                          <FaQuoteRight className="absolute top-2 right-2 text-emerald-200 text-xl" />
                          <p className="text-gray-600 text-sm line-clamp-3 italic">
                            "{advisor.bio}"
                          </p>
                        </div>
                      )}

                      {/* Contact Info (if available) */}
                      {(advisor.email || advisor.phone) && (
                        <div className="mt-4 space-y-2 text-sm">
                          {advisor.email && (
                            <a href={`mailto:${advisor.email}`} className="flex items-center justify-center text-gray-600 hover:text-emerald-900 transition-colors">
                              <FaEnvelope className="mr-2 text-emerald-600" /> {advisor.email}
                            </a>
                          )}
                          {advisor.phone && (
                            <a href={`tel:${advisor.phone}`} className="flex items-center justify-center text-gray-600 hover:text-emerald-900 transition-colors">
                              <FaPhone className="mr-2 text-emerald-600" /> {advisor.phone}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
              {advisors.map((advisor) => (
                <div
                  key={advisor.id || advisor._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-emerald-100"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {/* Profile Image */}
                      <div className="flex-shrink-0 mr-4">
                        {advisor.image || advisor.avatar ? (
                          <img
                            src={advisor.image || advisor.avatar}
                            alt={advisor.name}
                            className="w-20 h-20 rounded-full object-cover border-3 border-emerald-900"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(advisor.name)}&background=0D9488&color=fff&size=80`;
                            }}
                          />
                        ) : (
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(advisor.name)}&background=0D9488&color=fff&size=80`}
                            alt={advisor.name}
                            className="w-20 h-20 rounded-full border-3 border-emerald-900"
                          />
                        )}
                      </div>

                      {/* Basic Info */}
                      <div>
                        <h2 className="text-lg font-bold text-emerald-900">
                          {advisor.name}
                        </h2>
                        <p className="text-emerald-700 font-medium text-sm">
                          {advisor.position || advisor.designation || advisor.role || 'Advisor'}
                        </p>
                      </div>
                    </div>

                    {/* Bio */}
                    {advisor.bio && (
                      <div className="bg-emerald-50 p-3 rounded-lg mb-4">
                        <p className="text-gray-700 text-sm italic">
                          "{advisor.bio}"
                        </p>
                      </div>
                    )}

                    {/* Contact Details */}
                    {(advisor.email || advisor.phone) && (
                      <div className="space-y-2 border-t border-emerald-100 pt-4">
                        {advisor.email && (
                          <a href={`mailto:${advisor.email}`} className="flex items-center text-gray-600 hover:text-emerald-900 transition-colors text-sm">
                            <FaEnvelope className="mr-2 text-emerald-600 flex-shrink-0" />
                            <span className="truncate">{advisor.email}</span>
                          </a>
                        )}
                        {advisor.phone && (
                          <a href={`tel:${advisor.phone}`} className="flex items-center text-gray-600 hover:text-emerald-900 transition-colors text-sm">
                            <FaPhone className="mr-2 text-emerald-600 flex-shrink-0" />
                            <span>{advisor.phone}</span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdvisorPanel;