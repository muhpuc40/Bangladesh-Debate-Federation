import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBook, 
  FaVideo, 
  FaFilePdf, 
  FaDownload, 
  FaSearch,
  FaFilter,
  FaPlayCircle,
  FaBookOpen,
  FaGraduationCap,
  FaGlobe,
  FaArrowRight,
  FaExternalLinkAlt
} from 'react-icons/fa';

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Resources', icon: <FaBook /> },
    { id: 'tutorials', label: 'Video Tutorials', icon: <FaVideo /> },
    { id: 'formats', label: 'Debate Formats', icon: <FaBookOpen /> },
    { id: 'motions', label: 'Sample Motions', icon: <FaFilePdf /> },
    { id: 'training', label: 'Training Materials', icon: <FaGraduationCap /> },
    { id: 'glossary', label: 'Debate Glossary', icon: <FaGlobe /> }
  ];

  const resources = [
    {
      id: 1,
      title: "Complete Guide to British Parliamentary Debate",
      description: "A comprehensive guide covering rules, strategies, and best practices for BP debate format",
      type: "formats",
      format: "PDF Guide",
      size: "2.4 MB",
      downloads: "1,245",
      level: "Beginner to Advanced",
      link: "#",
      icon: <FaBookOpen />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      title: "Asian Parliamentary Debate Video Series",
      description: "12-part video series explaining Asian Parliamentary format with example debates",
      type: "tutorials",
      format: "Video Series",
      duration: "4.5 hours",
      views: "3,456",
      level: "Intermediate",
      link: "#",
      icon: <FaVideo />,
      color: "bg-red-100 text-red-600"
    },
    {
      id: 3,
      title: "500+ Sample Debate Motions",
      description: "Collection of debate motions categorized by difficulty and topic area",
      type: "motions",
      format: "PDF Collection",
      size: "1.8 MB",
      downloads: "2,100",
      level: "All Levels",
      link: "#",
      icon: <FaFilePdf />,
      color: "bg-green-100 text-green-600"
    },
    {
      id: 4,
      title: "Argument Construction Workshop",
      description: "Step-by-step guide to building strong arguments and rebuttals",
      type: "training",
      format: "Interactive Course",
      modules: "8 modules",
      duration: "6 hours",
      level: "Beginner",
      link: "#",
      icon: <FaGraduationCap />,
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: 5,
      title: "Complete Debate Glossary",
      description: "Definitions of 200+ debate terms and concepts with examples",
      type: "glossary",
      format: "Web Resource",
      terms: "200+ terms",
      updated: "March 2024",
      level: "All Levels",
      link: "#",
      icon: <FaGlobe />,
      color: "bg-orange-100 text-orange-600"
    },
    {
      id: 6,
      title: "Judging & Adjudication Handbook",
      description: "Official guide for debate judges with scoring rubrics and guidelines",
      type: "training",
      format: "PDF Handbook",
      size: "3.1 MB",
      downloads: "890",
      level: "Advanced",
      link: "#",
      icon: <FaGraduationCap />,
      color: "bg-purple-100 text-purple-600"
    },
    {
      id: 7,
      title: "World Schools Format Explained",
      description: "Detailed explanation of World Schools debate format with practice rounds",
      type: "formats",
      format: "Video Tutorial",
      duration: "45 minutes",
      views: "1,567",
      level: "Intermediate",
      link: "#",
      icon: <FaBookOpen />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 8,
      title: "Research Skills for Debaters",
      description: "Guide to effective research methods and evidence collection",
      type: "training",
      format: "E-book",
      pages: "120 pages",
      size: "5.2 MB",
      level: "Intermediate",
      link: "#",
      icon: <FaGraduationCap />,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.type === activeCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
              Debate Resources
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Access comprehensive learning materials, guides, and tools to enhance your 
              debate skills. From beginner tutorials to advanced strategies, we've got 
              everything you need to excel in competitive debating.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="#featured" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center border border-emerald-700 hover:shadow-xl hover:-translate-y-1"
              >
                <FaPlayCircle className="mr-2" /> Start Learning
              </Link>
              <button 
                onClick={() => setActiveCategory('tutorials')}
                className="bg-white hover:bg-emerald-50 text-emerald-700 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center border border-emerald-300 hover:shadow-xl hover:-translate-y-1"
              >
                <FaVideo className="mr-2" /> Watch Tutorials
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
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
                  placeholder="Search resources by title, description, or keyword..."
                  className="w-full pl-10 pr-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center ${
                  activeCategory === category.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section id="featured" className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-emerald-900">
                {activeCategory === 'all' ? 'All Resources' : categories.find(c => c.id === activeCategory)?.label}
                <span className="text-gray-500 text-lg ml-2">({filteredResources.length})</span>
              </h2>
              <p className="text-gray-600 mt-2">
                Free resources to help you improve your debate skills
              </p>
            </div>
            <div className="hidden md:block">
              <span className="text-gray-600">
                Sort by: <button className="text-emerald-600 hover:text-emerald-800 font-medium">Most Popular</button>
              </span>
            </div>
          </div>

          {filteredResources.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No resources found</h3>
              <p className="text-gray-600 mb-6">Try changing your search or filter criteria</p>
              <button 
                onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
                className="text-emerald-600 hover:text-emerald-800 font-bold"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map(resource => (
                <div key={resource.id} className="bg-white rounded-xl border border-emerald-100 hover:border-emerald-300 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  {/* Resource Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`${resource.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                      {resource.icon}
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      {resource.level}
                    </span>
                  </div>

                  {/* Resource Content */}
                  <h3 className="text-xl font-bold text-emerald-900 mb-3 hover:text-emerald-700 transition-colors duration-300">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>

                  {/* Resource Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-600 text-sm">
                      <span className="font-medium mr-2">Format:</span>
                      <span>{resource.format}</span>
                    </div>
                    {'size' in resource && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <span className="font-medium mr-2">Size:</span>
                        <span>{resource.size}</span>
                      </div>
                    )}
                    {'duration' in resource && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <span className="font-medium mr-2">Duration:</span>
                        <span>{resource.duration}</span>
                      </div>
                    )}
                    {'downloads' in resource && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <span className="font-medium mr-2">Downloads:</span>
                        <span>{resource.downloads}</span>
                      </div>
                    )}
                    {'views' in resource && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <span className="font-medium mr-2">Views:</span>
                        <span>{resource.views}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center">
                    <a 
                      href={resource.link}
                      className="text-emerald-600 hover:text-emerald-800 font-bold flex items-center hover:underline"
                    >
                      Access Resource <FaArrowRight className="ml-2" />
                    </a>
                    
                    <button className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                      <FaDownload className="mr-2" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-12 md:py-16 lg:py-20 bg-emerald-50 border-y border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
              Structured Learning Paths
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Follow these curated paths to systematically improve your debate skills
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Beginner's Journey",
                description: "Start from scratch and build fundamental debate skills",
                steps: ["Basic Concepts", "Format Introduction", "First Practice Debate"],
                duration: "4 weeks",
                icon: "👶",
                color: "bg-blue-50 border-blue-100"
              },
              {
                title: "Competition Ready",
                description: "Prepare for national and international competitions",
                steps: ["Advanced Strategies", "Case Construction", "Judging Criteria"],
                duration: "8 weeks",
                icon: "🏆",
                color: "bg-green-50 border-green-100"
              },
              {
                title: "Master Adjudicator",
                description: "Become a certified debate judge and trainer",
                steps: ["Scoring Rubrics", "Feedback Techniques", "Ethics & Standards"],
                duration: "6 weeks",
                icon: "⚖️",
                color: "bg-purple-50 border-purple-100"
              }
            ].map((path, index) => (
              <div key={index} className={`${path.color} rounded-xl border p-6 hover:shadow-lg transition-all duration-300`}>
                <div className="text-4xl mb-4">{path.icon}</div>
                <h3 className="text-xl font-bold text-emerald-900 mb-2">{path.title}</h3>
                <p className="text-gray-600 mb-4">{path.description}</p>
                <div className="mb-4">
                  <h4 className="font-bold text-gray-700 mb-2">Learning Path:</h4>
                  <ul className="space-y-1">
                    {path.steps.map((step, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{path.duration}</span>
                  <button className="text-emerald-600 hover:text-emerald-800 font-bold flex items-center">
                    Start Path <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* External Resources */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
              External Learning Platforms
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore additional resources from our partner organizations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                platform: "Debate Association",
                description: "International debate resources and competition announcements",
                link: "https://example.com",
                icon: "🌐"
              },
              {
                platform: "Debate Training Institute",
                description: "Professional debate coaching and certification programs",
                link: "https://example.com",
                icon: "🎓"
              },
              {
                platform: "Online Debate Library",
                description: "Archive of recorded debates from around the world",
                link: "https://example.com",
                icon: "📚"
              },
              {
                platform: "Research Database",
                description: "Academic papers and research on debate pedagogy",
                link: "https://example.com",
                icon: "🔍"
              }
            ].map((platform, index) => (
              <a 
                key={index}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl border border-emerald-100 p-6 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex items-start"
              >
                <div className="text-3xl mr-4">{platform.icon}</div>
                <div>
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-bold text-emerald-900">{platform.platform}</h3>
                    <FaExternalLinkAlt className="ml-2 text-gray-400 text-sm" />
                  </div>
                  <p className="text-gray-600 mb-3">{platform.description}</p>
                  <span className="text-emerald-600 hover:text-emerald-800 font-bold text-sm">
                    Visit Platform
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 md:py-16 lg:py-20 bg-emerald-50 border-t border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-6">
              Get New Resources Delivered
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Subscribe to our newsletter and be the first to access new learning materials, 
              tutorials, and debate resources.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300"
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                Subscribe
              </button>
            </form>
            <p className="text-gray-500 text-sm mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;