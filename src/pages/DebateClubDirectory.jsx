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
          established: club.established,
          members: club.members,
          facebookUrl: club.facebook_url
        }));

        setDebateClubs(transformedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching directory:', err);
        setError('Failed to load directory data. Please try again later.');
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
      club.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.president.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.generalSecretary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesUniversity = selectedUniversity === 'all' || club.university === selectedUniversity;
    const matchesRegion = selectedRegion === 'all' || club.location === selectedRegion;

    return matchesSearch && matchesUniversity && matchesRegion;
  });

  // Function to download directory as CSV
  const downloadCSV = () => {
    const headers = ['Club Name', 'University', 'President', 'General Secretary', 'Contact', 'Email', 'Location', 'Established', 'Members', 'Facebook URL'];
    const csvContent = [
      headers.join(','),
      ...filteredClubs.map(club => [
        `"${club.clubName}"`,
        `"${club.university}"`,
        `"${club.president}"`,
        `"${club.generalSecretary}"`,
        `"${club.contact}"`,
        `"${club.email}"`,
        `"${club.location}"`,
        club.established,
        club.members,
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-24 py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
              Debate Club Directory
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Find debate clubs from Universities across Bangladesh...
            </p>
            <div className="flex flex-wrap gap-4 justify-start">
              <a
                href="#search"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center border border-emerald-700 hover:shadow-xl hover:-translate-y-1"
              >
                <FaSearch className="mr-2" /> Find Debate Clubs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section - NOT Sticky */}
      <section id="search" className="py-4 bg-white border-b border-emerald-100 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-emerald-900 mb-2">
              Search Debate Clubs
            </h2>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by club name, university, president, or general secretary..."
                className="w-full pl-10 pr-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300 text-black placeholder:text-gray-500 shadow-sm"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <FaUniversity className="inline mr-2 text-emerald-600" /> University
              </label>
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300 bg-white text-black shadow-sm"
              >
                <option value="all">All Universities</option>
                {universities.map((uni, index) => (
                  <option key={index} value={uni}>{uni}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <FaMapMarkerAlt className="inline mr-2 text-emerald-600" /> Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300 bg-white text-black shadow-sm"
              >
                <option value="all">All Regions</option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedUniversity('all');
                  setSelectedRegion('all');
                }}
                className="w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center border border-emerald-300 shadow-sm"
              >
                <FaFilter className="mr-2" /> Clear Filters
              </button>
            </div>
          </div>

          {/* Results Count and Actions */}
          <div className="flex justify-between items-center pt-2 border-t border-emerald-100">
            <div className="text-gray-600">
              Found <span className="font-bold text-emerald-700">{filteredClubs.length}</span> debate clubs
            </div>
            <div className="flex gap-2">
              <button
                onClick={downloadCSV}
                className="bg-white hover:bg-emerald-50 text-emerald-700 font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center border border-emerald-300 hover:shadow-md text-sm shadow-sm"
                title="Download CSV"
              >
                <FaDownload className="mr-2" /> CSV
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Table Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="min-h-screen bg-white flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">Error loading data</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300"
              >
                Retry
              </button>
            </div>
          ) : filteredClubs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No clubs found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria or filters</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedUniversity('all'); setSelectedRegion('all'); }}
                className="text-emerald-600 hover:text-emerald-800 font-bold"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto rounded-xl border border-emerald-100 bg-white shadow-lg">
                <table className="min-w-full divide-y divide-emerald-100">
                  <thead className="bg-emerald-50">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-emerald-900 uppercase tracking-wider">
                        <div className="flex items-center">
                          <FaUniversity className="mr-2" /> Club & University
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-emerald-900 uppercase tracking-wider">
                        <div className="flex items-center">
                          <FaUserTie className="mr-2" /> President
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-emerald-900 uppercase tracking-wider">
                        <div className="flex items-center">
                          <FaUserGraduate className="mr-2" /> General Secretary
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-emerald-900 uppercase tracking-wider whitespace-nowrap">
                        <div className="flex items-center">
                          <FaPhone className="mr-2" /> Contact
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-emerald-900 uppercase tracking-wider">
                        <div className="flex items-center">
                          <FaEnvelope className="mr-2" /> Email
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-emerald-900 uppercase tracking-wider">
                        <div className="flex items-center">
                          <FaLink className="mr-2" /> Link
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-100">
                    {filteredClubs.map((club) => (
                      <tr key={club.id} className="hover:bg-emerald-50 transition-colors duration-300">
                        <td className="px-6 py-4">
                          <div className="font-bold text-emerald-900">{club.clubName}</div>
                          <div className="text-sm text-gray-600 mt-1">{club.university}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{club.president}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{club.generalSecretary}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a href={`tel:${club.contact}`} className="text-emerald-600 hover:text-emerald-800 hover:underline font-medium">
                            {club.contact}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <a href={`mailto:${club.email}`} className="text-emerald-600 hover:text-emerald-800 hover:underline truncate block max-w-xs">
                            {club.email}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          {club.facebookUrl ? (
                            <a
                              href={club.facebookUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center text-lg"
                              title="Visit on Facebook"
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

              {/* Mobile Card View */}
              <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredClubs.map((club) => (
                  <div key={club.id} className="bg-white rounded-xl border border-emerald-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <div className="bg-emerald-100 text-emerald-600 p-2 rounded-lg mr-3">
                          <FaUniversity />
                        </div>
                        <div>
                          <h3 className="font-bold text-emerald-900">{club.clubName}</h3>
                          <p className="text-sm text-gray-600">{club.university}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <FaMapMarkerAlt className="mr-1" /> {club.location}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="bg-emerald-50 p-2 rounded-lg mr-3">
                          <FaUserTie className="text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">President</div>
                          <div className="font-medium text-gray-900">{club.president}</div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-emerald-50 p-2 rounded-lg mr-3">
                          <FaUserGraduate className="text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">General Secretary</div>
                          <div className="font-medium text-gray-900">{club.generalSecretary}</div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-emerald-50 p-2 rounded-lg mr-3">
                          <FaPhone className="text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Contact</div>
                          <a href={`tel:${club.contact}`} className="font-medium text-emerald-600 hover:text-emerald-800 hover:underline truncate block">
                            {club.contact}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-emerald-50 p-2 rounded-lg mr-3">
                          <FaEnvelope className="text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Email</div>
                          <a href={`mailto:${club.email}`} className="font-medium text-emerald-600 hover:text-emerald-800 hover:underline truncate block">
                            {club.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-emerald-50 p-2 rounded-lg mr-3">
                          <FaLink className="text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500">Link</div>
                          {club.facebookUrl ? (
                            <a
                              href={club.facebookUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-blue-600 hover:text-blue-800 hover:underline truncate block flex items-center"
                            >
                              <FaFacebook className="mr-1" /> Facebook
                            </a>
                          ) : (
                            <span className="text-gray-500">No link available</span>
                          )}
                        </div>
                      </div>
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