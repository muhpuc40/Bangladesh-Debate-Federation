import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaArrowRight,
  FaSearch,
  FaBookmark,
  FaEye,
  FaComment,
  FaNewspaper,
  FaBullhorn,
  FaExclamationTriangle,
  FaBell,
  FaRegClock,
  FaFire
} from 'react-icons/fa';

// News data in JSON format
const newsData = {
  "news": [
    {
      "id": 1,
      "title": "National Debate Festival 2024 Registration Opens",
      "excerpt": "Registration for the largest debate competition in Bangladesh is now open for universities and colleges nationwide.",
      "content": "Bangladesh Debate Federation officially announces the opening of registration for the National Debate Festival 2024. This year's festival promises to be the biggest yet with participants from all 64 districts. The competition will feature British Parliamentary and Asian Parliamentary formats with cash prizes totaling ৳500,000.",
      "category": "Announcement",
      "date": "March 18, 2024",
      "author": "BDF Press Office",
      "image": "https://i.ibb.co.com/HfwY09Kt/Gemini-Generated-Image-sozxjesozxjesozx.png",
      "views": 1245,
      "comments": 89,
      "readTime": "3 min read",
      "tags": ["competition", "registration", "national"],
      "featured": true
    },
    {
      "id": 2,
      "title": "Bangladesh Team Wins Asian Debate Championship 2024",
      "excerpt": "Team Bangladesh secures first position in the Asian Debate Championship held in Singapore.",
      "content": "In a historic victory, Bangladesh debate team comprising students from Dhaka University and BUET won the Asian Debate Championship 2024. The team competed against 32 countries and delivered outstanding performances in all rounds. This marks Bangladesh's third championship win in the last five years.",
      "category": "Achievement",
      "date": "March 15, 2024",
      "author": "International Desk",
      "image": "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "views": 2341,
      "comments": 156,
      "readTime": "4 min read",
      "tags": ["international", "victory", "asia"],
      
    },
    {
      "id": 3,
      "title": "New Debate Curriculum Launched for Schools",
      "excerpt": "BDF introduces comprehensive debate curriculum for secondary and higher secondary levels.",
      "content": "Bangladesh Debate Federation, in collaboration with the Ministry of Education, has launched a new debate curriculum for schools. The curriculum focuses on critical thinking, public speaking, and logical reasoning skills. It will be implemented in 5000 schools across the country starting next academic year.",
      "category": "Education",
      "date": "March 12, 2024",
      "author": "Education Desk",
      "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "views": 1876,
      "comments": 67,
      "readTime": "5 min read",
      "tags": ["curriculum", "education", "schools"]
    },
    {
      "id": 4,
      "title": "Free Online Debate Workshop Series Announced",
      "excerpt": "BDF to conduct free online debate workshops for students affected by pandemic disruptions.",
      "content": "To support students affected by educational disruptions, BDF announces a series of free online debate workshops. The 4-week program will cover debate fundamentals, argument construction, and public speaking techniques. Registration opens on March 25, 2024.",
      "category": "Workshop",
      "date": "March 10, 2024",
      "author": "Training Department",
      "image": "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "views": 1567,
      "comments": 45,
      "readTime": "2 min read",
      "tags": ["workshop", "online", "free"]
    },
    {
      "id": 5,
      "title": "Debate Scholarship Program for Underprivileged Students",
      "excerpt": "New scholarship program launched to support talented debaters from underprivileged backgrounds.",
      "content": "BDF announces a scholarship program that will provide full financial support to 100 underprivileged students for debate training and competition participation. The program aims to promote inclusivity and diversity in competitive debating.",
      "category": "Scholarship",
      "date": "March 8, 2024",
      "author": "Social Welfare Desk",
      "image": "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "views": 1987,
      "comments": 78,
      "readTime": "3 min read",
      "tags": ["scholarship", "inclusivity", "support"]
    },
    {
      "id": 6,
      "title": "International Judges Training Program",
      "excerpt": "BDF to host international adjudicator training program with world-renowned debate experts.",
      "content": "Bangladesh Debate Federation will host an international adjudicator training program in collaboration with World Debate Council. The program will feature experts from Oxford, Cambridge, and Harvard universities. Applications open on April 1, 2024.",
      "category": "Training",
      "date": "March 5, 2024",
      "author": "International Relations",
      "image": "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "views": 1456,
      "comments": 34,
      "readTime": "4 min read",
      "tags": ["training", "international", "judges"]
    },
    {
      "id": 7,
      "title": "Regional Debate Centers Established",
      "excerpt": "New debate training centers opened in all 8 divisions of Bangladesh.",
      "content": "To decentralize debate training facilities, BDF has established regional debate centers in all 8 divisions. These centers will provide regular training, resources, and competition opportunities for students across the country.",
      "category": "Infrastructure",
      "date": "March 3, 2024",
      "author": "Development Desk",
      "image": "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "views": 1324,
      "comments": 56,
      "readTime": "3 min read",
      "tags": ["centers", "regional", "development"]
    },
    {
      "id": 8,
      "title": "Bangla Debate Competition Results",
      "excerpt": "Results announced for the National Bangla Debate Competition 2024.",
      "content": "Chittagong University emerged as champion in the National Bangla Debate Competition 2024. The competition saw participation from 64 universities with debates conducted entirely in Bangla language, promoting mother tongue usage in academic discourse.",
      "category": "Results",
      "date": "March 1, 2024",
      "author": "Results Committee",
      "image": "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "views": 1765,
      "comments": 89,
      "readTime": "2 min read",
      "tags": ["results", "bangla", "competition"]
    }
  ],
  "metadata": {
    "total": 8,
    "featured": 2,
    "lastUpdated": "2024-03-18"
  }
};

// Announcement/Notices data
const announcementsData = [
  {
    id: 1,
    title: "Registration Deadline Extended",
    description: "Last date for National Debate Festival registration extended to March 25, 2024",
    time: "2 hours ago",
    type: "urgent",
    icon: <FaExclamationTriangle className="text-red-500" />,
    category: "Deadline"
  },
  {
    id: 2,
    title: "Server Maintenance",
    description: "BDF website will be temporarily unavailable on March 20, 2024 (10 PM - 2 AM)",
    time: "5 hours ago",
    type: "maintenance",
    icon: <FaBullhorn className="text-blue-500" />,
    category: "Technical"
  },
  {
    id: 3,
    title: "Workshop Venue Changed",
    description: "Free Online Workshop venue changed from Auditorium to Room 302",
    time: "1 day ago",
    type: "update",
    icon: <FaBell className="text-yellow-500" />,
    category: "Update"
  },
  {
    id: 4,
    title: "New Mobile App Launched",
    description: "Download the new BDF mobile app from Google Play Store and App Store",
    time: "2 days ago",
    type: "new",
    icon: <FaFire className="text-orange-500" />,
    category: "Technology"
  },
  {
    id: 5,
    title: "Scholarship Interview Schedule",
    description: "Interviews for Debate Scholarship Program scheduled for March 22-24, 2024",
    time: "3 days ago",
    type: "schedule",
    icon: <FaRegClock className="text-purple-500" />,
    category: "Schedule"
  },
  {
    id: 6,
    title: "Holiday Notice",
    description: "BDF office will remain closed on March 26, 2024 for Independence Day",
    time: "4 days ago",
    type: "holiday",
    icon: <FaBullhorn className="text-green-500" />,
    category: "Holiday"
  }
];

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const featuredScrollRef = useRef(null);
  const announcementScrollRef = useRef(null);

  // Extract data from JSON
  const news = newsData.news;
  const metadata = newsData.metadata;

  // Filter news based on search only
  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Get featured news
  const featuredNews = news.filter(item => item.featured);

  // Category colors
  const getCategoryColor = (category) => {
    const colors = {
      'Announcement': 'bg-blue-100 text-blue-800',
      'Achievement': 'bg-green-100 text-green-800',
      'Education': 'bg-purple-100 text-purple-800',
      'Workshop': 'bg-orange-100 text-orange-800',
      'Scholarship': 'bg-yellow-100 text-yellow-800',
      'Training': 'bg-indigo-100 text-indigo-800',
      'Infrastructure': 'bg-pink-100 text-pink-800',
      'Results': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  // Handle mouse wheel events separately for each scrollable area
  const handleFeaturedWheel = (e) => {
    if (featuredScrollRef.current) {
      const isAtTop = featuredScrollRef.current.scrollTop === 0;
      const isAtBottom = featuredScrollRef.current.scrollTop + featuredScrollRef.current.clientHeight >= 
                        featuredScrollRef.current.scrollHeight - 1;
      
      // If scrolling up at top, let the page scroll
      if (isAtTop && e.deltaY < 0) {
        return;
      }
      // If scrolling down at bottom, let the page scroll
      if (isAtBottom && e.deltaY > 0) {
        return;
      }
      
      // Otherwise, scroll the featured news container
      e.stopPropagation();
      featuredScrollRef.current.scrollTop += e.deltaY;
    }
  };

  const handleAnnouncementWheel = (e) => {
    if (announcementScrollRef.current) {
      const isAtTop = announcementScrollRef.current.scrollTop === 0;
      const isAtBottom = announcementScrollRef.current.scrollTop + announcementScrollRef.current.clientHeight >= 
                        announcementScrollRef.current.scrollHeight - 1;
      
      // If scrolling up at top, let the page scroll
      if (isAtTop && e.deltaY < 0) {
        return;
      }
      // If scrolling down at bottom, let the page scroll
      if (isAtBottom && e.deltaY > 0) {
        return;
      }
      
      // Otherwise, scroll the announcement container
      e.stopPropagation();
      announcementScrollRef.current.scrollTop += e.deltaY;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-16 md:pt-20 py-8 md:py-12 bg-white text-emerald-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight whitespace-normal sm:whitespace-nowrap">
              Debate News & Announcements
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
              Stay informed with the latest news, announcements, competition results, 
              training programs, and achievements from Bangladesh Debate Federation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content with Two Columns */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          
          {/* Left Column - News (2/3 width) */}
          <div className="lg:w-2/3">
            
            {/* Search Bar - ট্রান্সপারেন্ট ব্যাকগ্রাউন্ড */}
            <div className="sticky top-0 lg:top-4 z-30 py-4 md:py-5 mb-6 -mt-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400 text-lg md:text-xl" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search news by title, content, tags or author..."
                  className="w-full pl-12 pr-4 py-3 md:py-3.5 bg-white/95 backdrop-blur-sm border-2 border-emerald-200 rounded-xl focus:ring-4 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all duration-300 text-black placeholder:text-gray-500 text-sm md:text-base hover:border-emerald-300 shadow-lg"
                />
                {searchTerm && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="text-gray-500 hover:text-red-500 transition-colors duration-200 text-sm md:text-base"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Featured News Section */}
            {featuredNews.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-emerald-900 mb-4 md:mb-6 flex items-center">
                  <FaNewspaper className="mr-2 md:mr-3 text-emerald-600" />
                  Featured News
                </h2>
                <div className="bg-gradient-to-r from-emerald-50 to-white rounded-xl md:rounded-2xl p-4 md:p-6 border border-emerald-100">
                  <div 
                    ref={featuredScrollRef}
                    onWheel={handleFeaturedWheel}
                    className="max-h-[500px] md:max-h-[600px] overflow-y-auto pr-3 md:pr-4 scrollbar-thin scrollbar-thumb-emerald-300/80 scrollbar-track-emerald-100/50 hover:scrollbar-thumb-emerald-400 scroll-smooth"
                  >
                    {featuredNews.map(item => (
                      <div key={item.id} className="mb-4 md:mb-6 last:mb-0 p-3 md:p-4 hover:bg-emerald-50/50 rounded-lg transition-all duration-300">
                        <div className="flex items-start space-x-3 md:space-x-4">
                          {/* শুধুমাত্র মোবাইলে ইমেজ লুকানোর জন্য hidden sm:flex */}
                          <div className="flex-shrink-0 hidden sm:block">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover"
                            />
                          </div>
                          <div className={`${item.id === 1 ? 'w-full' : 'flex-1'}`}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${getCategoryColor(item.category)}`}>
                                {item.category}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center">
                                <FaCalendarAlt className="mr-1" /> {item.date}
                              </span>
                            </div>
                            <h3 className="text-base md:text-lg font-bold text-emerald-900 mb-1 md:mb-2 hover:text-emerald-700 transition-colors duration-300 line-clamp-2">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">
                              {item.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2 md:space-x-3 text-xs text-gray-500">
                                <span className="flex items-center">
                                  <FaEye className="mr-1" /> {item.views}
                                </span>
                                <span className="flex items-center">
                                  <FaComment className="mr-1" /> {item.comments}
                                </span>
                              </div>
                              <Link 
                                to={`/news/${item.id}`}
                                className="text-emerald-600 hover:text-emerald-800 font-bold text-xs md:text-sm flex items-center"
                              >
                                Read More <FaArrowRight className="ml-1 text-xs" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* All News Grid */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
                <h2 className="text-xl md:text-2xl font-bold text-emerald-900">
                  Latest News
                </h2>
                <div className="text-xs md:text-sm text-gray-600">
                  {searchTerm ? (
                    <span className="flex items-center">
                      <FaSearch className="mr-1 md:mr-2" />
                      {filteredNews.length} results for "{searchTerm}"
                    </span>
                  ) : (
                    <span>{metadata.total} articles</span>
                  )}
                </div>
              </div>

              {filteredNews.length === 0 ? (
                <div className="text-center py-8 md:py-12 bg-gray-50 rounded-xl">
                  <FaSearch className="text-3xl md:text-4xl text-gray-400 mx-auto mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-bold text-gray-700 mb-2">No news found</h3>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">
                    No articles match your search "{searchTerm}"
                  </p>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 md:px-6 rounded-lg transition-all duration-300 text-sm md:text-base"
                  >
                    Show All News
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {filteredNews.map(item => (
                    <div key={item.id} className="bg-white rounded-xl border border-emerald-100 overflow-hidden hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
                      <div className="relative h-40 md:h-48 overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${getCategoryColor(item.category)}`}>
                            {item.category}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <button className="bg-white/90 hover:bg-white text-gray-800 p-1.5 md:p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
                            <FaBookmark className="text-xs md:text-sm" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4 md:p-6">
                        <div className="flex items-center text-xs text-gray-600 mb-2 md:mb-3">
                          <FaCalendarAlt className="mr-1.5 text-emerald-600" />
                          <span>{item.date}</span>
                          <span className="mx-1.5 md:mx-2">•</span>
                          <FaUser className="mr-1.5 text-emerald-600" />
                          <span>{item.author}</span>
                        </div>
                        
                        <h3 className="text-base md:text-lg font-bold text-emerald-900 mb-2 md:mb-3 hover:text-emerald-700 transition-colors duration-300 line-clamp-2">
                          {item.title}
                        </h3>
                        
                        <p className="text-gray-600 text-xs md:text-sm mb-4 md:mb-6 line-clamp-3">
                          {item.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-emerald-50">
                          <Link 
                            to={`/news/${item.id}`}
                            className="text-emerald-600 hover:text-emerald-800 font-bold text-xs md:text-sm flex items-center"
                          >
                            Read More <FaArrowRight className="ml-1 md:ml-1.5 text-xs" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Announcements (1/3 width) */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-4 z-20">
              {/* Announcements Header */}
              <div className="bg-emerald-600 text-white rounded-t-xl p-4 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl md:text-2xl font-bold flex items-center">
                    <FaBullhorn className="mr-2 md:mr-3" />
                    Announcements
                  </h2>
                  <span className="bg-white/20 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                    {announcementsData.length} Active
                  </span>
                </div>
                <p className="text-emerald-100 text-xs md:text-sm">
                  Important notices and updates from BDF
                </p>
              </div>

              {/* Announcements List */}
              <div className="bg-white border border-emerald-100 rounded-b-xl overflow-hidden">
                <div 
                  ref={announcementScrollRef}
                  onWheel={handleAnnouncementWheel}
                  className="max-h-[400px] md:max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-emerald-300/80 scrollbar-track-emerald-100/50 hover:scrollbar-thumb-emerald-400 scroll-smooth"
                >
                  {announcementsData.map(announcement => (
                    <div 
                      key={announcement.id}
                      className="p-3 md:p-5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-start space-x-2 md:space-x-3">
                        <div className="flex-shrink-0 mt-0.5 md:mt-1">
                          {announcement.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                            <span className="px-2 py-0.5 bg-gray-100 text-xs font-bold text-gray-700 rounded w-fit">
                              {announcement.category}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center">
                              <FaRegClock className="mr-1" /> {announcement.time}
                            </span>
                          </div>
                          <h3 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">
                            {announcement.title}
                          </h3>
                          <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                            {announcement.description}
                          </p>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <span className={`text-xs px-2 py-1 rounded w-fit ${
                              announcement.type === 'urgent' ? 'bg-red-100 text-red-700' :
                              announcement.type === 'update' ? 'bg-yellow-100 text-yellow-700' :
                              announcement.type === 'new' ? 'bg-orange-100 text-orange-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
                            </span>
                            <button className="text-emerald-600 hover:text-emerald-800 text-xs md:text-sm font-medium flex items-center justify-end sm:justify-start">
                              Details <FaArrowRight className="ml-1 text-xs" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View All Button */}
                <div className="p-3 md:p-4 border-t border-gray-100 bg-gray-50">
                  <button className="w-full bg-white hover:bg-emerald-50 text-emerald-700 font-bold py-2.5 md:py-3 px-4 rounded-lg border border-emerald-200 hover:border-emerald-300 transition-all duration-300 flex items-center justify-center text-sm md:text-base">
                    <FaBullhorn className="mr-1.5 md:mr-2" />
                    View All Announcements
                    <FaArrowRight className="ml-1.5 md:ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom CSS for smooth scrolling */}
      <style jsx>{`
        /* Custom scrollbar styling for extra smoothness */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: rgba(209, 250, 229, 0.3);
          border-radius: 10px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.6);
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.8);
        }
        
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: rgba(16, 185, 129, 0.6) rgba(209, 250, 229, 0.3);
        }
        
        /* Mobile responsiveness */
        @media (max-width: 1024px) {
          .lg\:sticky {
            position: static;
          }
        }
      `}</style>
    </div>
  );
};

export default News;