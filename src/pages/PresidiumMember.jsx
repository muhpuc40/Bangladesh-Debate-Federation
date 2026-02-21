import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

const PresidiumMember = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchPresidium = async () => {
      try {
        const result = await apiService.getPresidium();
        setMembers(result.data || result);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch presidium members:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPresidium();
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
          <p className="text-red-600 mb-4 font-semibold">Error!</p>
          <p className="text-gray-600 mb-4">{error}</p>

          <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left">
            <p className="text-sm font-semibold mb-2">🔍 Please check:</p>
            <ol className="text-xs text-gray-600 list-decimal pl-4">
              <li className="mb-1">Your Laravel backend is running: <strong>php artisan serve</strong></li>
              <li className="mb-1">Check in browser: <strong>http://localhost:8000/api/presidium-members</strong></li>
              <li className="mb-1">Your route name in <strong>routes/api.php</strong></li>
              <li className="mb-1">Network tab in browser console (F12) for more details</li>
            </ol>
          </div>

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

  if (members.length === 0) {
    return (
      <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center pt-16 md:pt-20 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
              Presidium Member
            </h1>
          </div>

          <div className="text-center py-12">
            <div className="mb-4">
              <img
                src="https://i.ibb.co.com/S0tX2qF/presidium-icon.png"
                alt="Presidium Member Icon"
                className="w-24 h-24 mx-auto opacity-50"
              />
            </div>
            <p className="text-2xl md:text-3xl text-gray-400 mb-4">
              Coming Soon
            </p>
            <p className="text-gray-500 max-w-md mx-auto">
              Presidium member details are currently being updated. Please visit again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">

        <div className="text-center pt-16 md:pt-10 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
            Presidium Member
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-xs mx-auto w-full"
            >
              <div className="p-6">
                <div className="mb-6 flex justify-center">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-48 h-48 rounded-full object-cover border-4 border-emerald-900"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D9488&color=fff&size=160`;
                      }}
                    />
                  ) : (
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D9488&color=fff&size=160`}
                      alt={member.name}
                      className="w-48 h-48 rounded-full border-4 border-emerald-900"
                    />
                  )}
                </div>
                <h2 className="text-xl font-semibold text-center text-gray-900 mb-2">
                  {member.name}
                </h2>
                <p className="text-center text-emerald-900 font-medium mb-4">
                  {member.position}
                </p>
                {member.bio && (
                  <p className="text-gray-600 text-sm text-center line-clamp-3">
                    {member.bio}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PresidiumMember;