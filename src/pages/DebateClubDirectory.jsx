import React, { useState } from 'react';
import { FaSearch, FaUniversity, FaUserTie, FaUserGraduate, FaPhone, FaEnvelope, FaFilter, FaDownload, FaPrint, FaEye, FaMapMarkerAlt, FaFacebook } from 'react-icons/fa';

const DebateClubDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Debate club data with all required fields including Facebook
  const debateClubs = [
    {
      id: 1,
      clubName: "Dhaka University Debate Society",
      university: "University of Dhaka",
      president: "Ahmed Rahman",
      generalSecretary: "Fatima Khan",
      contact: "01719 142953",
      email: "duds@du.ac.bd",
      location: "Dhaka",
      established: "1995",
      members: "150",
      status: "Active",
      facebookId: "DU.Debate.Society",
      facebookUrl: "https://facebook.com/DUDebateSociety"
    },
    {
      id: 2,
      clubName: "BUET Oratory Club",
      university: "Bangladesh University of Engineering & Technology",
      president: "Rahim Islam",
      generalSecretary: "Tasnim Ahmed",
      contact: "01717 666166",
      email: "oratory@buet.ac.bd",
      location: "Dhaka",
      established: "2001",
      members: "120",
      status: "Active",
      facebookId: "BUET.Oratory.Club",
      facebookUrl: "https://facebook.com/BUETOratoryClub"
    },
    {
      id: 3,
      clubName: "Jahangirnagar Debating Club",
      university: "Jahangirnagar University",
      president: "Sadia Afrin",
      generalSecretary: "Kamal Hossain",
      contact: "01777 408630",
      email: "jdc@juniv.edu",
      location: "Savar, Dhaka",
      established: "1998",
      members: "90",
      status: "Active",
      facebookId: "JahangirnagarDebatingClub",
      facebookUrl: "https://facebook.com/JahangirnagarDebatingClub"
    },
    {
      id: 4,
      clubName: "Chittagong University Debate Forum",
      university: "University of Chittagong",
      president: "Nabil Hasan",
      generalSecretary: "Sumaiya Akter",
      contact: "01812 345678",
      email: "cudf@cu.ac.bd",
      location: "Chittagong",
      established: "2000",
      members: "110",
      status: "Active",
      facebookId: "CUDebateForum",
      facebookUrl: "https://facebook.com/CUDebateForum"
    },
    {
      id: 5,
      clubName: "North South University Debate Club",
      university: "North South University",
      president: "Zarin Tasnim",
      generalSecretary: "Rayhan Chowdhury",
      contact: "01987 654321",
      email: "debateclub@northsouth.edu",
      location: "Dhaka",
      established: "2005",
      members: "130",
      status: "Active",
      facebookId: "NSUDebateClub",
      facebookUrl: "https://facebook.com/NSUDebateClub"
    },
    {
      id: 6,
      clubName: "BRAC University Debate Society",
      university: "BRAC University",
      president: "Tahsin Alam",
      generalSecretary: "Nusrat Jahan",
      contact: "01678 912345",
      email: "brac.debate@bracu.ac.bd",
      location: "Dhaka",
      established: "2003",
      members: "100",
      status: "Active",
      facebookId: "BRACUDebate",
      facebookUrl: "https://facebook.com/BRACUDebate"
    },
    {
      id: 7,
      clubName: "Rajshahi University Debate Association",
      university: "University of Rajshahi",
      president: "Arif Hossain",
      generalSecretary: "Mina Begum",
      contact: "01755 112233",
      email: "ruda@ru.ac.bd",
      location: "Rajshahi",
      established: "1997",
      members: "85",
      status: "Active",
      facebookId: "RU.Debate.Association",
      facebookUrl: "https://facebook.com/RUDebateAssociation"
    },
    {
      id: 8,
      clubName: "Khulna University Debating Society",
      university: "Khulna University",
      president: "Sajjad Ahmed",
      generalSecretary: "Roksana Khatun",
      contact: "01766 998877",
      email: "kuds@ku.ac.bd",
      location: "Khulna",
      established: "2002",
      members: "75",
      status: "Active",
      facebookId: "KhulnaUniDebating",
      facebookUrl: "https://facebook.com/KhulnaUniDebating"
    },
    {
      id: 9,
      clubName: "Islamic University Debate Club",
      university: "Islamic University, Bangladesh",
      president: "Jamil Ahmed",
      generalSecretary: "Sabrina Islam",
      contact: "01733 445566",
      email: "iudc@iu.ac.bd",
      location: "Kushtia",
      established: "2004",
      members: "65",
      status: "Active",
      facebookId: "IUDebateClub",
      facebookUrl: "https://facebook.com/IUDebateClub"
    },
    {
      id: 10,
      clubName: "DUET Debate Forum",
      university: "Dhaka University of Engineering & Technology",
      president: "Kamrul Hasan",
      generalSecretary: "Naznin Sultana",
      contact: "01788 776655",
      email: "ddf@duet.ac.bd",
      location: "Gazipur",
      established: "2006",
      members: "70",
      status: "Active",
      facebookId: "DUETDebateForum",
      facebookUrl: "https://facebook.com/DUETDebateForum"
    },
    {
      id: 11,
      clubName: "MIST Debating Society",
      university: "Military Institute of Science & Technology",
      president: "Saifuddin Munna",
      generalSecretary: "Ayesha Siddiqa",
      contact: "01799 887766",
      email: "mds@mist.ac.bd",
      location: "Dhaka",
      established: "2008",
      members: "60",
      status: "Active",
      facebookId: "MIST.Debating.Society",
      facebookUrl: "https://facebook.com/MISTDebatingSociety"
    },
    {
      id: 12,
      clubName: "Comilla University Debate Circle",
      university: "Comilla University",
      president: "Farid Ahmed",
      generalSecretary: "Sharmin Akter",
      contact: "01744 556677",
      email: "cudc@cou.ac.bd",
      location: "Comilla",
      established: "2010",
      members: "55",
      status: "Active",
      facebookId: "ComillaUniversityDebate",
      facebookUrl: "https://facebook.com/ComillaUniversityDebate"
    }
  ];

  // Get unique universities for filter
  const universities = [...new Set(debateClubs.map(club => club.university))];
  const regions = [...new Set(debateClubs.map(club => club.location))];

  // Filter clubs based on search and filters
  const filteredClubs = debateClubs.filter(club => {
    const matchesSearch = 
      club.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.president.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.generalSecretary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.facebookId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesUniversity = selectedUniversity === 'all' || club.university === selectedUniversity;
    const matchesRegion = selectedRegion === 'all' || club.location === selectedRegion;
    
    return matchesSearch && matchesUniversity && matchesRegion;
  });

  // Function to download directory as CSV
  const downloadCSV = () => {
    const headers = ['Club Name', 'University', 'President', 'General Secretary', 'Contact', 'Email', 'Location', 'Established', 'Members', 'Facebook ID', 'Facebook URL'];
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
        `"${club.facebookId}"`,
        `"${club.facebookUrl}"`
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

  // Function to print directory
  const printDirectory = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-6 leading-tight text-justify">
              Debate Club Directory
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed text-justify">
              Find debate clubs from universities across Bangladesh. Connect with fellow debaters, 
              club presidents, and general secretaries to collaborate and participate in events.
            </p>
            <div className="flex flex-wrap gap-4 justify-start">
              <a 
                href="#search"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center border border-emerald-700 hover:shadow-xl hover:-translate-y-1"
              >
                <FaSearch className="mr-2" /> Search Clubs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section id="search" className="py-8 bg-white border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 mb-4 text-justify">
              Find Debate Clubs
            </h2>
            <p className="text-gray-600 text-justify">
              Search through our comprehensive directory of university debate clubs in Bangladesh
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by club name, university, president, general secretary or Facebook ID..."
                className="w-full pl-10 pr-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300 text-black placeholder:text-gray-500 text-justify"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-justify">
              <label className="block text-gray-700 font-medium mb-2">
                <FaUniversity className="inline mr-2 text-emerald-600" /> University
              </label>
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300 bg-white text-black"
              >
                <option value="all">All Universities</option>
                {universities.map((uni, index) => (
                  <option key={index} value={uni}>{uni}</option>
                ))}
              </select>
            </div>

            <div className="text-justify">
              <label className="block text-gray-700 font-medium mb-2">
                <FaMapMarkerAlt className="inline mr-2 text-emerald-600" /> Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300 bg-white text-black"
              >
                <option value="all">All Regions</option>
                {regions.map((region, index) => (
                  <option key={index} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end text-justify">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedUniversity('all');
                  setSelectedRegion('all');
                }}
                className="w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center border border-emerald-300"
              >
                <FaFilter className="mr-2" /> Clear Filters
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-600 text-justify">
              Found <span className="font-bold text-emerald-700">{filteredClubs.length}</span> debate clubs
            </div>
            <div className="flex gap-2">
              <button
                onClick={downloadCSV}
                className="bg-white hover:bg-emerald-50 text-emerald-700 font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center border border-emerald-300 hover:shadow-md text-sm"
                title="Download CSV"
              >
                <FaDownload className="mr-2" /> CSV
              </button>
              <button
                onClick={printDirectory}
                className="bg-white hover:bg-emerald-50 text-emerald-700 font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center border border-emerald-300 hover:shadow-md text-sm"
                title="Print Directory"
              >
                <FaPrint className="mr-2" /> Print
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Table Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredClubs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2 text-justify">No clubs found</h3>
              <p className="text-gray-600 mb-6 text-justify">Try adjusting your search criteria or filters</p>
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
                        <div className="flex items-center justify-start">
                          <FaUniversity className="mr-2" /> Club & University
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-emerald-900 uppercase tracking-wider">
                        <div className="flex items-center justify-start">
                          <FaUserTie className="mr-2" /> President
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-emerald-900 uppercase tracking-wider">
                        <div className="flex items-center justify-start">
                          <FaUserGraduate className="mr-2" /> General Secretary
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-emerald-900 uppercase tracking-wider">
                        <div className="flex items-center justify-start">
                          <FaPhone className="mr-2" /> Contact
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-emerald-900 uppercase tracking-wider">
                        <div className="flex items-center justify-start">
                          <FaEnvelope className="mr-2" /> Email
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-emerald-900 uppercase tracking-wider">
                        <div className="flex items-center justify-start">
                          <FaFacebook className="mr-2 text-blue-600" /> Facebook
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-100">
                    {filteredClubs.map((club) => (
                      <tr key={club.id} className="hover:bg-emerald-50 transition-colors duration-300">
                        <td className="px-6 py-4">
                          <div className="font-bold text-emerald-900 text-justify">{club.clubName}</div>
                          <div className="text-sm text-gray-600 mt-1 text-justify">{club.university}</div>
                          <div className="flex items-center mt-1 text-xs text-gray-500 justify-start">
                            <FaMapMarkerAlt className="mr-1" /> {club.location}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900 text-justify">{club.president}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900 text-justify">{club.generalSecretary}</div>
                        </td>
                        <td className="px-6 py-4">
                          <a href={`tel:${club.contact}`} className="text-emerald-600 hover:text-emerald-800 hover:underline font-medium text-justify">
                            {club.contact}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <a href={`mailto:${club.email}`} className="text-emerald-600 hover:text-emerald-800 hover:underline truncate block max-w-xs text-justify">
                            {club.email}
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <a 
                            href={club.facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center text-sm justify-start hover:underline"
                            title={`Visit ${club.facebookId} on Facebook`}
                          >
                            <FaFacebook className="mr-2" />
                            View Profile
                          </a>
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
                          <h3 className="font-bold text-emerald-900 text-justify">{club.clubName}</h3>
                          <p className="text-sm text-gray-600 text-justify">{club.university}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-4 justify-start">
                        <FaMapMarkerAlt className="mr-1" /> {club.location}
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center">
                        <div className="bg-emerald-50 p-2 rounded-lg mr-3">
                          <FaUserTie className="text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 text-justify">President</div>
                          <div className="font-medium text-gray-900 text-justify">{club.president}</div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-emerald-50 p-2 rounded-lg mr-3">
                          <FaUserGraduate className="text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 text-justify">General Secretary</div>
                          <div className="font-medium text-gray-900 text-justify">{club.generalSecretary}</div>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-emerald-50 p-2 rounded-lg mr-3">
                          <FaPhone className="text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 text-justify">Contact</div>
                          <a href={`tel:${club.contact}`} className="font-medium text-emerald-600 hover:text-emerald-800 hover:underline text-justify">
                            {club.contact}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-emerald-50 p-2 rounded-lg mr-3">
                          <FaEnvelope className="text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 text-justify">Email</div>
                          <a href={`mailto:${club.email}`} className="font-medium text-emerald-600 hover:text-emerald-800 hover:underline truncate block text-justify">
                            {club.email}
                          </a>
                        </div>
                      </div>

                      {/* Facebook Link for Mobile */}
                      <div className="flex items-center">
                        <div className="bg-emerald-50 p-2 rounded-lg mr-3">
                          <FaFacebook className="text-blue-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 text-justify">Facebook</div>
                          <a 
                            href={club.facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-blue-600 hover:text-blue-800 hover:underline text-justify"
                          >
                            @{club.facebookId}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-emerald-100 flex justify-between items-center">
                      <div className="text-xs text-gray-500 text-justify">
                        Est. {club.established} • {club.members} members
                      </div>
                      <a 
                        href={club.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center text-sm justify-start hover:underline"
                      >
                        <FaFacebook className="mr-1" />
                        Visit Facebook
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section
      <section className="py-12 md:py-16 lg:py-20 bg-white border-t border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaFacebook className="text-2xl text-blue-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-6 text-justify">
              Follow Your Favorite Debate Clubs
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed text-justify">
              Stay updated with events, tournaments, and activities by following your university's debate club on Facebook. 
              Click on any club's Facebook link to connect with them directly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
              >
                <FaFacebook className="mr-2" />
                Visit Facebook
              </a>
              <a 
                href="mailto:directory@debatefederation.org" 
                className="bg-white hover:bg-emerald-50 text-emerald-700 font-bold py-3 px-6 rounded-lg transition-all duration-300 border border-emerald-300 flex items-center justify-center"
              >
                <FaEnvelope className="mr-2" />
                Update Club Info
              </a>
            </div>
          </div>
        </div>
      </section> */}

      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          body {
            background: white !important;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
          }
          
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          
          th {
            background-color: #f0f9ff !important;
            -webkit-print-color-adjust: exact;
          }
          
          /* Hide Facebook column in print */
          th:nth-child(6), td:nth-child(6) {
            display: none;
          }
          
          /* Hide CTA section in print */
          section:last-child {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default DebateClubDirectory;