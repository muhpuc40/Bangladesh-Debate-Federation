import React, { useState, useEffect } from 'react';
import { FaSearch, FaUniversity, FaUserTie, FaUserGraduate, FaPhone, FaEnvelope, FaFilter, FaDownload, FaMapMarkerAlt, FaFacebook, FaLink } from 'react-icons/fa';
import apiService from '../services/apiService';

const DebateClubDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [debateClubs, setDebateClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch directory data from API
  useEffect(() => {
    const fetchDirectory = async () => {
      try {
        setLoading(true);
        const data = await apiService.getDirectory();

        const transformedData = data.map(club => ({
          id: club.id,
          clubName: club.club_name || club.clubName,
          university: club.university,
          president: club.president,
          generalSecretary: club.general_secretary || club.generalSecretary,
          contact: club.contact,
          email: club.email,
          location: club.location,
          facebookUrl: club.facebook_url
        }));

        setDebateClubs(transformedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching directory:', err);
        setError(err.message || 'Failed to load directory data');
      } finally {
        setLoading(false);
      }
    };

    fetchDirectory();
  }, []);

  // Get unique universities for filter
  const universities = [...new Set(debateClubs.map(club => club.university))];
  const regions = [...new Set(debateClubs.map(club => club.location))];

  // Filter clubs based on search and filters
  const filteredClubs = debateClubs.filter(club => {
    const matchesSearch =
      club.clubName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.university?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.president?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.generalSecretary?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesUniversity = selectedUniversity === 'all' || club.university === selectedUniversity;
    const matchesRegion = selectedRegion === 'all' || club.location === selectedRegion;

    return matchesSearch && matchesUniversity && matchesRegion;
  });

  // Function to download directory as CSV
  const downloadCSV = () => {
    const headers = ['Club Name', 'University', 'President', 'General Secretary', 'Contact', 'Email', 'Location', 'Facebook URL'];
    const csvContent = [
      headers.join(','),
      ...filteredClubs.map(club => [
        `"${club.clubName || ''}"`,
        `"${club.university || ''}"`,
        `"${club.president || ''}"`,
        `"${club.generalSecretary || ''}"`,
        `"${club.contact || ''}"`,
        `"${club.email || ''}"`,
        `"${club.location || ''}"`,
        `"${club.facebookUrl || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'debate-club-directory.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Loading spinner
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

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#e8f1ee] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-6">
            Error Loading Data
          </h3>
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
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="pt-16 md:pt-20 py-8 md:py-10 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-900 mb-4 leading-tight">
              Debate Club Directory
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Find debate clubs from Institutes across Bangladesh...
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section — hidden when no clubs loaded */}
      {debateClubs.length > 0 && (
      <section id="search" className="py-3 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-3">
            <h2 className="text-xl font-bold text-emerald-900">
              Search Debate Clubs
            </h2>
          </div>

          {/* Search Bar */}
          <div className="mb-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by club name, university, president, or general secretary..."
                className="w-full pl-10 pr-4 py-2.5 border border-emerald-200 rounded-lg focus:border-emerald-400 outline-none transition-all duration-300 text-black placeholder:text-gray-500 shadow-sm"
              />
            </div>
          </div>

          {/* Filters row — Institute + Region + Clear + CSV all in one row */}
          <div className="flex flex-wrap gap-3 items-end">

            {/* Institute filter */}
            <div className="flex-1 min-w-[160px]">
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                <FaUniversity className="inline mr-1 text-emerald-600" /> Institute
              </label>
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="w-full px-3 py-2.5 border border-emerald-200 rounded-lg focus:border-emerald-400 outline-none bg-white text-gray-900 shadow-sm text-sm"
              >
                <option value="all">All Institutes</option>
                {universities.map((uni, index) => (
                  <option key={index} value={uni}>{uni}</option>
                ))}
              </select>
            </div>

            {/* Region filter */}
            <div className="flex-1 min-w-[140px]">
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                <FaMapMarkerAlt className="inline mr-1 text-emerald-600" /> Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-2.5 border border-emerald-200 rounded-lg focus:border-emerald-400 outline-none bg-white text-gray-900 shadow-sm text-sm"
              >
                <option value="all">All Regions</option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>{region}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters button */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedUniversity('all');
                  setSelectedRegion('all');
                }}
                className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-bold py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center border border-emerald-300 shadow-sm text-sm whitespace-nowrap"
              >
                <FaFilter className="mr-1.5" /> Clear
              </button>
            </div>

            {/* CSV Download button */}
            <div className="flex items-end">
              <button
                onClick={downloadCSV}
                className="bg-white hover:bg-emerald-50 text-emerald-700 font-medium py-2.5 px-4 rounded-lg transition-all duration-300 flex items-center border border-emerald-300 hover:shadow text-sm whitespace-nowrap"
              >
                <FaDownload className="mr-1.5" /> CSV
              </button>
            </div>

          </div>
        </div>
      </section>
      )}

      {/* Directory Section */}
      <section className="py-6 md:py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredClubs.length === 0 ? (
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-6">
                No Data Found
              </h3>
              <button
                onClick={() => window.location.reload()}
                className="bg-emerald-900 text-white px-6 py-2 rounded-lg hover:bg-emerald-800 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto rounded-xl border border-emerald-100 bg-white shadow">
                <table className="min-w-full divide-y divide-emerald-100">
                  <thead className="bg-emerald-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-bold text-emerald-900">
                        <FaUniversity className="inline mr-2" /> Club & Institutes
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-emerald-900">
                        <FaUserTie className="inline mr-2" /> President
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-emerald-900">
                        <FaUserGraduate className="inline mr-2" /> General Secretary
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-emerald-900">
                        <FaPhone className="inline mr-2" /> Contact
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-emerald-900">
                        <FaEnvelope className="inline mr-2" /> Email
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-bold text-emerald-900">
                        <FaLink className="inline mr-2" /> Link
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-emerald-100">
                    {filteredClubs.map((club) => (
                      <tr key={club.id} className="hover:bg-emerald-50 transition">
                        <td className="px-6 py-3">
                          <div className="font-bold text-emerald-900">{club.clubName}</div>
                          <div className="text-sm text-gray-600">{club.university}</div>
                        </td>
                        {/* President — explicit text-gray-800 so it's always visible */}
                        <td className="px-6 py-3 text-gray-800">{club.president}</td>
                        {/* General Secretary — explicit text-gray-800 */}
                        <td className="px-6 py-3 text-gray-800">{club.generalSecretary}</td>

                        <td className="px-6 py-3 whitespace-nowrap">
                          <a href={`tel:${club.contact}`} className="text-emerald-600 hover:underline">
                            {club.contact}
                          </a>
                        </td>

                        <td className="px-6 py-3">
                          <a href={`mailto:${club.email}`} className="text-emerald-600 hover:underline">
                            {club.email}
                          </a>
                        </td>

                        <td className="px-6 py-3">
                          {club.facebookUrl ? (
                            <a
                              href={club.facebookUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-lg"
                            >
                              <FaFacebook />
                            </a>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredClubs.map((club) => (
                  <div key={club.id} className="bg-white rounded-xl border border-emerald-100 p-5 hover:shadow transition">
                    <h3 className="font-bold text-emerald-900">{club.clubName}</h3>
                    <p className="text-sm text-gray-600 mb-3">{club.university}</p>

                    <div className="space-y-2 text-sm text-gray-800">
                      <div><span className="font-semibold text-gray-700">President:</span> {club.president}</div>
                      <div><span className="font-semibold text-gray-700">General Secretary:</span> {club.generalSecretary}</div>
                      <div>
                        <span className="font-semibold text-gray-700">Contact:</span>{' '}
                        <a href={`tel:${club.contact}`} className="text-emerald-600 hover:underline">
                          {club.contact}
                        </a>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Email:</span>{' '}
                        <a href={`mailto:${club.email}`} className="text-emerald-600 hover:underline">
                          {club.email}
                        </a>
                      </div>
                      {club.facebookUrl && (
                        <div>
                          <a
                            href={club.facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <FaFacebook /> Facebook
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default DebateClubDirectory;