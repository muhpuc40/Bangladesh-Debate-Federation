import React, { useState, useEffect } from 'react';
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-4">
            <svg className="w-16 h-16 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p className="text-red-600 mb-4 font-semibold">Error Loading Advisors</p>
          <p className="text-gray-600 mb-4">Failed to connect to backend</p>

          <p className="text-sm text-gray-500 mb-4">
            Please make sure your Laravel backend is running on port 8000
          </p>

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
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="text-center pt-16 md:pt-10 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
            Advisor Panel
          </h1>
          {/* <p className="text-xl text-gray-600">
            Meet our experienced advisors
          </p> */}
        </div>

        {advisors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No advisors found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advisors.map((advisor) => (
              <div
                key={advisor.id || advisor._id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-xs mx-auto w-full"
              >
                <div className="p-6">
                  <div className="mb-6 flex justify-center">
                    {advisor.image || advisor.avatar ? (
                      <img
                        src={advisor.image || advisor.avatar}
                        alt={advisor.name}
                        className="w-48 h-48 rounded-full object-cover border-4 border-emerald-900"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(advisor.name)}&background=0D9488&color=fff&size=160`;
                        }}
                      />
                    ) : (
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(advisor.name)}&background=0D9488&color=fff&size=160`}
                        alt={advisor.name}
                        className="w-48 h-48 rounded-full border-4 border-emerald-900"
                      />
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-center text-gray-900 mb-2">
                    {advisor.name}
                  </h2>
                  <p className="text-center text-emerald-900 font-medium mb-4">
                    {advisor.position || advisor.designation || advisor.role || 'Advisor'}
                  </p>
                  {advisor.bio && (
                    <p className="text-gray-600 text-sm text-center line-clamp-3">
                      {advisor.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvisorPanel;