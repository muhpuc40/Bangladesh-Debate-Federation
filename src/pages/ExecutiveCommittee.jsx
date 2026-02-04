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
      setCommitteeMembers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching committee data:', err);
    } finally {
      setLoading(false);
    }
  };

  const SocialLinks = ({ gmail, facebook, linkedin }) => (
    <div className="flex justify-center space-x-4 mt-4 pt-4 border-t-2 border-emerald-100">
      {gmail && (
        <a
          href={`mailto:${gmail}`}
          className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full transition-all duration-300 hover:shadow-md"
          title="Send Email"
        >
          <FaGoogle className="text-base" />
        </a>
      )}
      {facebook && (
        <a
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full transition-all duration-300 hover:shadow-md"
          title="Facebook Profile"
        >
          <FaFacebook className="text-base" />
        </a>
      )}
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-2 rounded-full transition-all duration-300 hover:shadow-md"
          title="LinkedIn Profile"
        >
          <FaLinkedin className="text-base" />
        </a>
      )}
    </div>
  );

  // Render member card
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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <section className="relative pt-20 md:pt-24 py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
                Executive Committee
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                Loading committee members...
              </p>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <section className="relative pt-20 md:pt-24 py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
                Executive Committee
              </h1>
              <p className="text-lg md:text-xl text-red-600 mb-8 leading-relaxed">
                Error loading committee data. Please try again later.
              </p>
              <button
                onClick={fetchCommitteeData}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
              >
                Retry
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Empty state
  if (committeeMembers.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <section className="relative pt-20 md:pt-24 py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
                Executive Committee
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                No committee members found. Please add members through the admin panel.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }
  const topMembers = committeeMembers.slice(0, 2);
  const otherMembers = committeeMembers.slice(2, 6);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Reduced padding */}
      <section className="relative pt-16 md:pt-20 py-8 md:py-12 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-900 mb-4 leading-tight">
              Executive Committee
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
              Meet the dedicated leaders steering Bangladesh Debate Federation.
            </p>
          </div>
        </div>
      </section>

      {/* Committee Members Section - Reduced space between sections */}
      <section id="members" className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 text-center mb-8">
            Our Leadership Team
          </h2>

          {/* Top 2 Cards - Reduced margin */}
          {topMembers.length > 0 && (
            <div className="flex justify-center mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
                {topMembers.map((member, index) => (
                  <MemberCard key={index} member={member} />
                ))}
              </div>
            </div>
          )}

          {/* Bottom 4 Cards - Reduced gap */}
          {otherMembers.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {otherMembers.map((member, index) => (
                <MemberCard key={index} member={member} />
              ))}
            </div>
          )}

          {/* Show more members - Reduced margin */}
          {committeeMembers.length > 6 && (
            <div className="text-center mt-8">
              <p className="text-gray-600 text-sm">
                And {committeeMembers.length - 6} more committee members...
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ExecutiveCommittee;