import React, { useState } from 'react';
import { 
  FaImages, 
  FaVideo, 
  FaNewspaper, 
  FaDownload,
  FaPlayCircle,
  FaSearch,
  FaFilter,
  FaArrowRight,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaShare,
  FaExpand
} from 'react-icons/fa';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('photos');
  const [selectedImage, setSelectedImage] = useState(null);

  const tabs = [
    { id: 'photos', label: 'Photos', icon: <FaImages />, count: 245 },
    { id: 'videos', label: 'Videos', icon: <FaVideo />, count: 89 },
    { id: 'press', label: 'Press', icon: <FaNewspaper />, count: 156 }
  ];

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'competitions', label: 'Competitions' },
    { id: 'workshops', label: 'Workshops' },
    { id: 'awards', label: 'Award Ceremonies' },
    { id: 'teams', label: 'Team Photos' },
    { id: 'international', label: 'International Events' }
  ];

  const photos = [
    {
      id: 1,
      title: "National Debate Festival 2023 Final Round",
      description: "Exciting final round between Dhaka University and BUET",
      category: "competitions",
      date: "March 20, 2023",
      location: "Dhaka University",
      image: "https://i.ibb.co.com/HfwY09Kt/Gemini-Generated-Image-sozxjesozxjesozx.png",
      likes: 245,
      downloads: 89
    },
    {
      id: 2,
      title: "Asian Debate Championship Team Bangladesh",
      description: "National team preparation session before international competition",
      category: "international",
      date: "February 15, 2024",
      location: "BDF Training Center",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 189,
      downloads: 67
    },
    {
      id: 3,
      title: "Youth Parliament Inauguration",
      description: "Chief Guest addressing young debaters at Youth Parliament",
      category: "workshops",
      date: "January 10, 2024",
      location: "Bangabandhu ICC",
      image: "https://images.unsplash.com/photo-1551135049-8a33b2fb2d5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 312,
      downloads: 112
    },
    {
      id: 4,
      title: "Best Speaker Award Ceremony",
      description: "Tasnim Rahman receiving Best Speaker award 2023",
      category: "awards",
      date: "December 5, 2023",
      location: "Radisson Blu",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 456,
      downloads: 134
    },
    {
      id: 5,
      title: "Debate Workshop for Schools",
      description: "Interactive session with high school students",
      category: "workshops",
      date: "November 22, 2023",
      location: "Chittagong Division",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 178,
      downloads: 78
    },
    {
      id: 6,
      title: "International Judges Panel",
      description: "International adjudicators at World Schools Debate",
      category: "international",
      date: "October 30, 2023",
      location: "Kuala Lumpur, Malaysia",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 234,
      downloads: 92
    },
    {
      id: 7,
      title: "University Debate Club Leaders",
      description: "Annual meeting of university debate club presidents",
      category: "teams",
      date: "September 15, 2023",
      location: "BDF Head Office",
      image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 167,
      downloads: 56
    },
    {
      id: 8,
      title: "National Champion Team 2023",
      description: "Dhaka University Debate Club celebrating victory",
      category: "competitions",
      date: "August 20, 2023",
      location: "Dhaka University",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      likes: 289,
      downloads: 101
    }
  ];

  const videos = [
    {
      id: 1,
      title: "National Debate Festival 2023 Highlights",
      duration: "4:32",
      views: "15.2K",
      thumbnail: "https://i.ibb.co.com/HfwY09Kt/Gemini-Generated-Image-sozxjesozxjesozx.png"
    },
    {
      id: 2,
      title: "Asian Parliamentary Debate Tutorial",
      duration: "12:45",
      views: "8.7K",
      thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Interview with Best Speaker 2023",
      duration: "8:21",
      views: "6.3K",
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const handleImageClick = (photo) => {
    setSelectedImage(photo);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
              Media Gallery
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Explore our collection of photos, videos, and press coverage from debate 
              competitions, workshops, and events across Bangladesh and beyond.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setActiveTab('photos')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center border border-emerald-700 hover:shadow-xl hover:-translate-y-1"
              >
                <FaImages className="mr-2" /> View Photos
              </button>
              <button 
                onClick={() => setActiveTab('videos')}
                className="bg-white hover:bg-emerald-50 text-emerald-700 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center border border-emerald-300 hover:shadow-xl hover:-translate-y-1"
              >
                <FaVideo className="mr-2" /> Watch Videos
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="sticky top-0 z-10 bg-white border-b border-emerald-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 border-b-2 font-bold transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-emerald-600 text-emerald-900 bg-emerald-50'
                    : 'border-transparent text-gray-600 hover:text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
                <span className="ml-2 bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search gallery by title, description, or event..."
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
                className="px-4 py-2 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all duration-300"
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photos Gallery */}
      {activeTab === 'photos' && (
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {photos.map(photo => (
                <div 
                  key={photo.id}
                  className="group relative overflow-hidden rounded-xl border border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
                  onClick={() => handleImageClick(photo)}
                >
                  {/* Image */}
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={photo.image} 
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-lg mb-2">{photo.title}</h3>
                    <p className="text-white/80 text-sm mb-3">{photo.description}</p>
                    <div className="flex items-center justify-between text-white/60 text-xs">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        {photo.date}
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-1" />
                        {photo.location}
                      </div>
                    </div>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      {photo.category}
                    </span>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
                      <FaExpand className="text-sm" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center mx-auto border border-emerald-700 hover:shadow-xl hover:-translate-y-1">
                Load More Photos
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Videos Gallery */}
      {activeTab === 'videos' && (
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videos.map(video => (
                <div key={video.id} className="group">
                  {/* Video Thumbnail */}
                  <div className="relative rounded-xl overflow-hidden border border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-emerald-600 hover:bg-emerald-700 text-white w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                        <FaPlayCircle className="text-2xl" />
                      </button>
                    </div>
                    
                    {/* Duration */}
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-emerald-900 mb-2">{video.title}</h3>
                    <div className="flex items-center justify-between text-gray-600">
                      <div className="flex items-center">
                        <FaVideo className="mr-2 text-sm" />
                        <span>{video.views} views</span>
                      </div>
                      <button className="text-emerald-600 hover:text-emerald-800 font-bold flex items-center text-sm">
                        Watch Now <FaArrowRight className="ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* YouTube Channel Link */}
            <div className="text-center mt-12">
              <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-emerald-900 mb-4">
                  Subscribe to Our YouTube Channel
                </h3>
                <p className="text-gray-600 mb-6">
                  Get notified when we upload new debate tutorials, competition highlights, 
                  and interviews with champion debaters.
                </p>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center mx-auto border border-emerald-700 hover:shadow-xl hover:-translate-y-1">
                  <FaPlayCircle className="mr-2" /> Visit YouTube Channel
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Press Gallery */}
      {activeTab === 'press' && (
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  outlet: "The Daily Star",
                  title: "Bangladesh Debate Federation Hosts Record-breaking Competition",
                  date: "March 21, 2024",
                  excerpt: "Over 5,000 participants from across the country gathered for the National Debate Festival...",
                  link: "#"
                },
                {
                  outlet: "Prothom Alo",
                  title: "Youth Empowerment Through Debate",
                  date: "February 15, 2024",
                  excerpt: "BDF's initiative to train 10,000 young debaters shows promising results in critical thinking development...",
                  link: "#"
                },
                {
                  outlet: "Dhaka Tribune",
                  title: "Bangladesh Team Shines at Asian Debate Championship",
                  date: "January 30, 2024",
                  excerpt: "Team Bangladesh secured 3rd position in the Asian Debate Championship held in Singapore...",
                  link: "#"
                },
                {
                  outlet: "BBC Bangla",
                  title: "Debate Culture Growing in Bangladesh",
                  date: "December 10, 2023",
                  excerpt: "Interview with BDF Chairperson about the growing popularity of competitive debating...",
                  link: "#"
                }
              ].map((article, index) => (
                <div key={index} className="bg-white rounded-xl border border-emerald-100 p-6 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="flex items-center mb-4">
                    <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg font-bold">
                      {article.outlet}
                    </div>
                    <span className="text-gray-500 text-sm ml-auto">{article.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-emerald-900 mb-3">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <a href={article.link} className="text-emerald-600 hover:text-emerald-800 font-bold flex items-center">
                      Read Full Article <FaArrowRight className="ml-2" />
                    </a>
                    <button className="text-gray-500 hover:text-emerald-600">
                      <FaShare />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Download Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-emerald-50 border-t border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
              Download Media Assets
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              High-resolution photos and media kits for press and publications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Press Kit",
                description: "Logo, brand guidelines, and organization info",
                size: "25 MB",
                format: "ZIP File",
                icon: <FaDownload />
              },
              {
                title: "Event Photos",
                description: "High-resolution photos from major events",
                size: "150 MB",
                format: "ZIP File",
                icon: <FaImages />
              },
              {
                title: "B-roll Footage",
                description: "Video footage for media use",
                size: "500 MB",
                format: "MP4 Files",
                icon: <FaVideo />
              }
            ].map((asset, index) => (
              <div key={index} className="bg-white rounded-xl border border-emerald-100 p-6 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-lg flex items-center justify-center">
                    {asset.icon}
                  </div>
                  <span className="text-sm text-gray-500">{asset.format}</span>
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-2">{asset.title}</h3>
                <p className="text-gray-600 mb-4">{asset.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{asset.size}</span>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                    <FaDownload className="mr-2" /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-[90vh]">
            <button 
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-emerald-300 text-2xl"
            >
              ✕
            </button>
            
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title}
              className="max-h-[80vh] rounded-lg"
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 rounded-b-lg">
              <h3 className="text-white text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-white/80 mb-3">{selectedImage.description}</p>
              <div className="flex items-center justify-between text-white/60 text-sm">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  {selectedImage.date}
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  {selectedImage.location}
                </div>
                <div className="flex items-center">
                  <span className="mr-4">❤️ {selectedImage.likes}</span>
                  <span>📥 {selectedImage.downloads}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;