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

  if (members.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 mt-0 pt-8">
            <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
              Presidium Member
            </h1>
            <p className="text-gray-600 text-lg">
              Our respected presidium members
            </p>
          </div>

          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📭</div>
            <p className="text-gray-500 text-xl mb-4">Coming Soon</p>
            <p className="text-gray-400 max-w-md mx-auto">
              Presidium member details are currently being updated. Please visit again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 mt-0 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
            Presidium Member
          </h1>
          <p className="text-gray-600 text-lg">
            Our respected presidium members
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member) => (
            <div
              key={member.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6">
                {/* Image */}
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-emerald-900 shadow-lg group-hover:border-emerald-700 transition-colors duration-300">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D9488&color=fff&size=160`;
                          }}
                        />
                      ) : (
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D9488&color=fff&size=160`}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    {/* Optional: Add a small decorative element */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-emerald-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-900 transition-colors duration-300">
                    {member.name}
                  </h2>
                  <p className="text-emerald-900 font-medium mb-4">
                    {member.position}
                  </p>
                  {member.bio && (
                    <div className="relative">
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {member.bio}
                      </p>
                      {/* Optional: Gradient fade for longer bios */}
                      <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                    </div>
                  )}
                </div>

                {/* Optional: Add social links or contact info if available */}
                {(member.email || member.phone) && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    {member.email && (
                      <p className="text-xs text-gray-500 truncate">{member.email}</p>
                    )}
                    {member.phone && (
                      <p className="text-xs text-gray-500 truncate">{member.phone}</p>
                    )}
                  </div>
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