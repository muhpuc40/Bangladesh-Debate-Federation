import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import { FaGoogle, FaFacebook, FaLinkedin } from 'react-icons/fa';

const ExecutiveCommittee = () => {
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCommitteeData();
  }, []);

  const fetchCommitteeData = async () => {
    try {
      setLoading(true);
      const data = await apiService.getCommittees();
      setCommitteeMembers(data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching committee data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Social Links Component
  const SocialLinks = ({ gmail, facebook, linkedin }) => (
    <div className="flex justify-center space-x-4 mt-4 pt-4 border-t-2 border-emerald-100">
      {gmail && (
        <a
          href={`mailto:${gmail}`}
          className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full transition-all duration-300"
        >
          <FaGoogle />
        </a>
      )}
      {facebook && (
        <a
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full transition-all duration-300"
        >
          <FaFacebook />
        </a>
      )}
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-2 rounded-full transition-all duration-300"
        >
          <FaLinkedin />
        </a>
      )}
    </div>
  );

  // Member Card
  const MemberCard = ({ member }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <div className="flex flex-col items-center p-6 flex-grow">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-emerald-100 shadow-lg mb-6">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150?text=No+Image';
              }}
            />
          ) : (
            <div className="w-full h-full bg-emerald-100 flex items-center justify-center">
              <span className="text-emerald-600">No Image</span>
            </div>
          )}
        </div>

        <div className="text-center mb-4 flex-grow">
          <h3 className="text-xl font-bold text-emerald-900">
            {member.name}
          </h3>
          <p className="text-emerald-600 font-medium mt-2">
            {member.position}
          </p>
        </div>

        <SocialLinks
          gmail={member.gmail}
          facebook={member.facebook}
          linkedin={member.linkedin}
        />
      </div>
    </div>
  );

  // Loading
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

  // Error
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

  // Empty
  if (committeeMembers.length === 0) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <p className="text-gray-500">No committee members found.</p>
      </div>
    );
  }

  // Top 2 special design
  const topMembers = committeeMembers.slice(0, 2);

  // All remaining members (no limit)
  const otherMembers = committeeMembers.slice(2);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-16 md:pt-20 py-8 md:py-12 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-emerald-900 mb-4">
            Executive Committee
          </h1>
          <p className="text-lg text-gray-700">
            Meet the dedicated leaders steering Bangladesh Debate Federation.
          </p>
        </div>
      </section>

      {/* Members */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">

          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 text-center mb-8">
            Our Leadership Team
          </h2>

          {/* Top 2 Members */}
          {topMembers.length > 0 && (
            <div className="flex justify-center mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                {topMembers.map((member, index) => (
                  <MemberCard key={index} member={member} />
                ))}
              </div>
            </div>
          )}

          {/* All Remaining Members */}
          {otherMembers.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {otherMembers.map((member, index) => (
                <MemberCard key={index} member={member} />
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default ExecutiveCommittee;