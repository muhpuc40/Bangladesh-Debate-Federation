import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const HallOfFame = () => {
  const [committees, setCommittees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHallOfFame = async () => {
      try {
        setLoading(true);
        const data = await apiService.getHallOfFame();
        setCommittees(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching hall of fame:', err);
        setError('Failed to load hall of fame data. Please try again later.');
        setCommittees([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHallOfFame();
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <p className="text-gray-700 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 mt-0 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
            Hall of Fame
          </h1>
          <p className="text-gray-600 text-lg">
            Executive Committee Records
          </p>
        </div>

        {/* Committees List */}
        {committees.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📭</div>
            <p className="text-gray-500 text-lg">No hall of fame records found.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {committees.map((committee) => (
              <div
                key={committee.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left Side - Committee Info */}
                  <div className="md:w-1/2 p-8 bg-white">
                    <div className="h-full flex flex-col justify-center">
                      <div className="mb-6">
                        <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold mb-2">
                          Executive Committee
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                          {committee.name}
                        </h2>
                        {committee.ec && (
                          <p className="text-gray-600 mt-1">{committee.ec}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Images (50-50 split) */}
                  <div className="md:w-1/2 bg-gradient-to-r from-emerald-50 to-white p-8">
                    <div className="grid grid-cols-2 gap-6 h-full">
                      {/* President */}
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-full aspect-square max-w-[180px] mx-auto mb-4">
                          <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                            {committee.presidentImage ? (
                              <img
                                src={committee.presidentImage}
                                alt={committee.president}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://i.ibb.co.com/default-avatar.png";
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400 text-sm">No Image</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1 px-2">
                          {committee.president}
                        </h3>
                        <p className="text-emerald-600 font-medium text-sm md:text-base">
                          President
                        </p>
                      </div>

                      {/* Secretary */}
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-full aspect-square max-w-[180px] mx-auto mb-4">
                          <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                            {committee.secretaryImage ? (
                              <img
                                src={committee.secretaryImage}
                                alt={committee.secretary}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://i.ibb.co.com/default-avatar.png";
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-400 text-sm">No Image</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1 px-2">
                          {committee.secretary}
                        </h3>
                        <p className="text-emerald-600 font-medium text-sm md:text-base">
                          General Secretary
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HallOfFame;