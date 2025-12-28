import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaUser, 
  FaTag, 
  FaArrowRight,
  FaSearch,
  FaFilter,
  FaShareAlt,
  FaBookmark,
  FaEye,
  FaComment,
  FaNewspaper
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
      "featured": true
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
  "categories": [
    { "id": "all", "label": "All News", "count": 8 },
    { "id": "announcement", "label": "Announcements", "count": 1 },
    { "id": "achievement", "label": "Achievements", "count": 1 },
    { "id": "education", "label": "Education", "count": 1 },
    { "id": "workshop", "label": "Workshops", "count": 1 },
    { "id": "scholarship", "label": "Scholarships", "count": 1 },
    { "id": "training", "label": "Training", "count": 1 },
    { "id": "results", "label": "Results", "count": 1 }
  ],
  "metadata": {
    "total": 8,
    "featured": 2,
    "lastUpdated": "2024-03-18"
  }
};

const News = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract data from JSON
  const news = newsData.news;
  const categories = newsData.categories;
  const metadata = newsData.metadata;

  // Filter news based on category and search
  const filteredNews = news.filter(item => {
    const matchesCategory = activeCategory === 'all' || 
                           item.category.toLowerCase() === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - White Background */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-white text-emerald-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-emerald-200">
              <FaNewspaper className="mr-2" /> Latest Updates
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-justify">
              Debate News & Updates
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed text-justify">
              Stay informed with the latest announcements, competition results, 
              training programs, and achievements from Bangladesh Debate Federation.
            </p>
            <div className="flex flex-wrap gap-4 justify-start">
              <Link 
                to="/events" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center border border-emerald-600 hover:shadow-xl hover:-translate-y-1"
              >
                <span className="text-justify">View Events</span> <FaArrowRight className="ml-2" />
              </Link>
              <button 
                onClick={() => setActiveCategory('announcement')}
                className="bg-white hover:bg-emerald-50 text-emerald-600 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center border border-emerald-300 hover:shadow-xl hover:-translate-y-1"
              >
                <span className="text-justify">Announcements</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search news by title, content, or tags..."
                  className="w-full pl-10 pr-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300 text-black placeholder:text-gray-500 text-justify"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex overflow-x-auto lg:overflow-visible">
              <div className="flex gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                      activeCategory === cat.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                    }`}
                  >
                    <span className="text-justify">{cat.label}</span>
                    <span className="ml-1 text-xs opacity-80">({cat.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews.length > 0 && (
        <section className="py-12 bg-emerald-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">
                <span className="flex items-center">
                  <FaNewspaper className="mr-3 text-emerald-600" />
                  <span className="text-justify">Featured News</span>
                </span>
              </h2>
              <div className="text-sm text-gray-600 text-justify">
                Last Updated: {metadata.lastUpdated}
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map(item => (
                <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(item.category)}`}>
                        <span className="text-justify">{item.category}</span>
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-sm text-emerald-800 text-justify">
                        Featured
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center text-sm text-gray-600 mb-4 justify-start">
                      <FaCalendarAlt className="mr-2 text-emerald-600" />
                      <span className="mr-4 text-justify">{item.date}</span>
                      <FaUser className="mr-2 text-emerald-600" />
                      <span className="text-justify">{item.author}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-emerald-900 mb-4 hover:text-emerald-700 transition-colors duration-300 text-justify">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-700 mb-6 leading-relaxed text-justify">
                      {item.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center text-justify">
                          <FaEye className="mr-1" /> {item.views}
                        </span>
                        <span className="flex items-center text-justify">
                          <FaComment className="mr-1" /> {item.comments}
                        </span>
                        <span className="text-justify">{item.readTime}</span>
                      </div>
                      
                      <Link 
                        to={`/news/${item.id}`}
                        className="text-emerald-600 hover:text-emerald-800 font-bold flex items-center hover:underline justify-start"
                      >
                        <span className="text-justify">Read Full Story</span> <FaArrowRight className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All News Grid */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-900 text-justify">
                Latest News
              </h2>
              <p className="text-gray-600 mt-2 text-justify">
                Showing {filteredNews.length} of {metadata.total} news items
              </p>
            </div>
          </div>

          {filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📰</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2 text-justify">No news found</h3>
              <p className="text-gray-600 mb-6 text-justify">Try changing your search or category filter</p>
              <button 
                onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
                className="text-emerald-600 hover:text-emerald-800 font-bold"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              {/* News Grid - এখন সব news একসাথে দেখাবে */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.map(item => (
                  <div key={item.id} className="group bg-white rounded-xl border border-emerald-100 overflow-hidden hover:border-emerald-300 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    {/* News Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(item.category)}`}>
                          <span className="text-justify">{item.category}</span>
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex space-x-2">
                          <button className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
                            <FaBookmark className="text-sm" />
                          </button>
                          <button className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
                            <FaShareAlt className="text-sm" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* News Content */}
                    <div className="p-6">
                      <div className="flex items-center text-xs text-gray-600 mb-3 justify-start">
                        <FaCalendarAlt className="mr-1.5 text-emerald-600" />
                        <span className="text-justify">{item.date}</span>
                        <span className="mx-2">•</span>
                        <FaUser className="mr-1.5 text-emerald-600" />
                        <span className="text-justify">{item.author}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-emerald-900 mb-3 hover:text-emerald-700 transition-colors duration-300 line-clamp-2 text-justify">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 text-justify">
                        {item.excerpt}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded text-justify">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-emerald-50">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center text-justify">
                            <FaEye className="mr-1" /> {item.views}
                          </span>
                          <span className="flex items-center text-justify">
                            <FaComment className="mr-1" /> {item.comments}
                          </span>
                          <span className="text-justify">{item.readTime}</span>
                        </div>
                        
                        <Link 
                          to={`/news/${item.id}`}
                          className="text-emerald-600 hover:text-emerald-800 font-bold text-sm flex items-center hover:underline justify-start"
                        >
                          <span className="text-justify">Read More</span> <FaArrowRight className="ml-1.5 text-xs" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-900 to-emerald-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30">
              <FaNewspaper className="text-2xl text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-justify">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-lg text-white/90 mb-8 leading-relaxed text-justify">
              Get the latest debate news, competition updates, and training opportunities 
              delivered directly to your inbox. No spam, unsubscribe anytime.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all duration-300 text-black placeholder:text-gray-500 text-justify"
              />
              <button className="bg-white hover:bg-gray-100 text-emerald-700 font-bold py-3 px-6 rounded-lg transition-all duration-300 border border-white hover:shadow-xl hover:-translate-y-1 whitespace-nowrap">
                <span className="text-justify">Subscribe Now</span>
              </button>
            </form>
            <p className="text-white/70 text-sm mt-4 text-justify">
              Join 15,000+ subscribers who receive our weekly newsletter
            </p>
          </div>
        </div>
      </section>

      {/* Archive Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4 text-justify">
              News Archive
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto text-justify">
              Browse news from previous years and months
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { year: "2024", count: "8 articles", color: "bg-emerald-100" },
              { year: "2023", count: "42 articles", color: "bg-blue-100" },
              { year: "2022", count: "38 articles", color: "bg-purple-100" }
            ].map((archive, index) => (
              <div key={index} className={`${archive.color} rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-2`}>
                <div className="text-4xl font-bold text-emerald-900 mb-2 text-justify">{archive.year}</div>
                <div className="text-gray-700 mb-4 text-justify">{archive.count}</div>
                <button className="text-emerald-600 hover:text-emerald-800 font-bold text-sm flex items-center justify-start">
                  <span className="text-justify">Browse Archive</span> <FaArrowRight className="ml-2" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;