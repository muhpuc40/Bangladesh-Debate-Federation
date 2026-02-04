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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 mb-4"></div>
          <p className="text-gray-600">Loading Hall of Fame...</p>
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
                <div className="md:flex">
                  {/* Left Side - Committee Info */}
                  <div className="md:w-3/5 p-8">
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

                  {/* Right Side - Images */}
                  <div className="md:w-2/5 bg-gradient-to-r from-emerald-50 to-white p-8 flex flex-col justify-center">
                    <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                      {/* President */}
                      <div className="text-center">
                        <div className="w-36 h-36 md:w-40 md:h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
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
                              <span className="text-gray-400">No Image</span>
                            </div>
                          )}
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          {committee.president}
                        </h3>
                        <p className="text-emerald-600 font-medium">President</p>
                      </div>

                      {/* Secretary */}
                      <div className="text-center">
                        <div className="w-36 h-36 md:w-40 md:h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
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
                              <span className="text-gray-400">No Image</span>
                            </div>
                          )}
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          {committee.secretary}
                        </h3>
                        <p className="text-emerald-600 font-medium">General Secretary</p>
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