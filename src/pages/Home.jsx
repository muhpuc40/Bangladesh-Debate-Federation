import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaUsers, 
  FaTrophy, 
  FaBook, 
  FaArrowRight,
  FaPlayCircle,
  FaMicrophone,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

const Home = () => {
  // Background images for hero slider
  const heroBackgrounds = [
    {
      id: 1,
      url: "https://i.ibb.co.com/HfwY09Kt/Gemini-Generated-Image-sozxjesozxjesozx.png",
      alt: "Bangladesh Debate Competition"
    },
    {
      id: 2,
      url: "https://i.ibb.co.com/VcCwCB4f/pexels-rushow-122107.jpg",
      alt: "Debate Training Session"
    },
    {
      id: 3,
      url: "https://i.ibb.co.com/Myj4n25c/pexels-md-towhidul-islam-175863-3013018.jpg",
      alt: "Youth Debate Competition"
    }
  ];

  return (
    <div className="home-page bg-white">
      {/* Hero Banner with Background Swiper Slider */}
      <section className="relative overflow-hidden min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px]">
        {/* Background Swiper Slider */}
        <div className="absolute inset-0 z-0">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: '.hero-bg-slider-next',
              prevEl: '.hero-bg-slider-prev',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={800}
            className="hero-bg-slider h-full"
          >
            {heroBackgrounds.map((bg) => (
              <SwiperSlide key={bg.id} className="h-full">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${bg.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Gradient overlay for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 py-12 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
              {/* Left Content - Text */}
              <div className="text-white">
                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full mb-6 border border-white/30 hover:bg-white/30 transition-all duration-300">
                  <FaCalendarAlt className="mr-2 text-sm md:text-base" />
                  <span className="font-bold text-sm md:text-base lg:text-lg">March 15-20, 2024</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 lg:mb-8 leading-tight">
                  National Debate <span className="text-emerald-300">Festival</span> 2024
                </h1>
                <p className="text-white/90 mb-6 md:mb-8 lg:mb-10 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed">
                  Participate in Bangladesh's largest debate competition. 
                  Participants from all 64 districts, world-class judging panel, and attractive prizes.
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-5">
                  <Link 
                    to="/registration" 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 md:py-4 md:px-8 lg:py-5 lg:px-10 rounded-lg transition-all duration-300 flex items-center border border-emerald-700 hover:shadow-xl hover:-translate-y-1 text-sm sm:text-base md:text-lg"
                  >
                    <FaPlayCircle className="mr-2 text-base md:text-lg" /> Register Now
                  </Link>
                  <Link 
                    to="/events" 
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-3 px-6 md:py-4 md:px-8 lg:py-5 lg:px-10 rounded-lg transition-all duration-300 flex items-center border border-white/30 hover:shadow-xl hover:-translate-y-1 text-sm sm:text-base md:text-lg"
                  >
                    Learn More <FaArrowRight className="ml-2 text-base md:text-lg" />
                  </Link>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12 lg:mt-16">
                  <div className="text-center bg-white/10 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">5,000+</div>
                    <div className="text-xs sm:text-sm md:text-base text-white/80">Participants</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">64</div>
                    <div className="text-xs sm:text-sm md:text-base text-white/80">Districts</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">50 Lakh+</div>
                    <div className="text-xs sm:text-sm md:text-base text-white/80">Prize Pool</div>
                  </div>
                </div>
              </div>
              
              {/* Right Side - Champion Card */}
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="flex items-center mb-4 md:mb-6">
                    <div className="bg-emerald-500/20 p-2 sm:p-3 rounded-full mr-3 sm:mr-4">
                      <FaTrophy className="text-emerald-300 text-lg sm:text-xl md:text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg sm:text-xl md:text-2xl">2023 National Champions</h4>
                      <p className="text-white/80 text-sm sm:text-base md:text-lg">Dhaka University Debate Club</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                    <div className="text-center p-3 sm:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
                      <div className="text-base sm:text-lg md:text-xl font-bold text-white">Tasnim Rahman</div>
                      <div className="text-xs sm:text-sm md:text-base text-emerald-300">Best Speaker</div>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
                      <div className="text-base sm:text-lg md:text-xl font-bold text-white">Rahim Khan</div>
                      <div className="text-xs sm:text-sm md:text-base text-emerald-300">Top Adjudicator</div>
                    </div>
                  </div>
                  <Link 
                    to="/champions" 
                    className="mt-4 md:mt-6 inline-flex items-center justify-center w-full text-center text-emerald-300 hover:text-emerald-200 font-semibold text-sm sm:text-base py-2 sm:py-3 border border-emerald-300/30 rounded-lg hover:bg-emerald-300/10 transition-all duration-300 hover:scale-[1.02]"
                  >
                    Meet All Champions <FaArrowRight className="ml-2 text-sm sm:text-base" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-3 md:mb-4 lg:mb-6">
              Get Started with BDF
            </h2>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl lg:max-w-3xl mx-auto">
              Everything you need to begin your debate journey with Bangladesh Debate Federation
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {[
              {
                icon: <FaCalendarAlt className="text-xl sm:text-2xl md:text-3xl" />,
                title: "Upcoming Events",
                desc: "View competition schedule",
                color: "bg-emerald-100",
                iconColor: "text-emerald-600",
                link: "/events"
              },
              {
                icon: <FaBook className="text-xl sm:text-2xl md:text-3xl" />,
                title: "Learn Formats",
                desc: "BP, AP, Asian Parliamentary",
                color: "bg-emerald-100",
                iconColor: "text-emerald-600",
                link: "/rules"
              },
              {
                icon: <FaUsers className="text-xl sm:text-2xl md:text-3xl" />,
                title: "Join Community",
                desc: "Connect with debaters",
                color: "bg-emerald-100",
                iconColor: "text-emerald-600",
                link: "/membership"
              },
              {
                icon: <FaTrophy className="text-xl sm:text-2xl md:text-3xl" />,
                title: "View Results",
                desc: "Latest competition results",
                color: "bg-emerald-100",
                iconColor: "text-emerald-600",
                link: "/results"
              }
            ].map((item, index) => (
              <Link 
                key={index} 
                to={item.link}
                className="group bg-white rounded-xl border border-emerald-100 hover:border-emerald-300 p-4 sm:p-5 md:p-6 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className={`${item.color} ${item.iconColor} w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-5 border border-emerald-200 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-emerald-900 mb-1 sm:mb-2 group-hover:text-emerald-700 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-3 sm:mb-4">{item.desc}</p>
                <div className="text-emerald-600 font-semibold inline-flex items-center text-xs sm:text-sm md:text-base group-hover:translate-x-2 transition-transform duration-300">
                  Explore <FaArrowRight className="ml-2 text-xs sm:text-sm md:text-base" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About BDF */}
      <section className="py-12 md:py-16 lg:py-20 xl:py-24 bg-emerald-50 border-y border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
            <div>
              <div className="inline-block bg-emerald-100 text-emerald-800 px-4 py-1 sm:py-1.5 rounded-full text-sm sm:text-base md:text-lg font-bold mb-4 md:mb-6 border border-emerald-200">
                🇧🇩 Bangladesh Debate Federation
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-4 md:mb-6 lg:mb-8">
                Leading the <span className="text-emerald-600">Debate Culture</span> in Bangladesh
              </h2>
              <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-6 md:mb-8 lg:mb-10 leading-relaxed">
                Established in 2010, Bangladesh Debate Federation is the official governing body 
                for competitive debating in Bangladesh. We organize national tournaments, provide 
                training programs, and represent Bangladesh in international debate forums.
              </p>
              
              <div className="space-y-3 sm:space-y-4 md:space-y-5 mb-8 md:mb-10 lg:mb-12">
                {[
                  "National Debate Fest - Largest debate competition in South Asia",
                  "Youth Parliament Initiative - Training future leaders",
                  "Regional Training Camps across all 8 divisions",
                  "International Representation - World Universities Debating Championship"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-emerald-100 text-emerald-600 p-1.5 sm:p-2 md:p-2.5 rounded-full mr-3 sm:mr-4 mt-0.5 sm:mt-1 border border-emerald-200 group-hover:scale-110 transition-transform duration-300">
                      <FaCheckCircle className="text-sm sm:text-base md:text-lg" />
                    </div>
                    <span className="text-gray-800 text-sm sm:text-base md:text-lg">{item}</span>
                  </div>
                ))}
              </div>
              
              <Link 
                to="/about" 
                className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 md:py-4 md:px-8 lg:py-5 lg:px-10 rounded-lg transition-all duration-300 border border-emerald-700 hover:shadow-xl hover:-translate-y-1 text-sm sm:text-base md:text-lg"
              >
                Our Story <FaArrowRight className="ml-2 text-base md:text-lg" />
              </Link>
            </div>
            
            {/* Achievement Stats */}
            <div className="bg-white rounded-xl border border-emerald-100 p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-900 mb-6 md:mb-8 text-center">
                Our Achievements
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
                {[
                  { number: "15K+", label: "Trained Debaters", color: "text-emerald-700" },
                  { number: "250+", label: "Events Organized", color: "text-emerald-700" },
                  { number: "100+", label: "Institutional Partners", color: "text-emerald-700" },
                  { number: "12", label: "International Awards", color: "text-emerald-700" }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-3 sm:p-4 md:p-5 bg-emerald-50 rounded-lg border border-emerald-100 hover:bg-emerald-100 hover:scale-105 transition-all duration-300">
                    <div className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${stat.color} mb-1 sm:mb-2`}>
                      {stat.number}
                    </div>
                    <div className="text-gray-700 text-xs sm:text-sm md:text-base">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 md:mb-10 lg:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-3 md:mb-4">
                Latest News & Announcements
              </h2>
              <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl lg:max-w-3xl">
                Stay updated with the latest announcements, competition results and upcoming events
              </p>
            </div>
            <Link 
              to="/news" 
              className="text-emerald-600 hover:text-emerald-800 font-bold inline-flex items-center mt-4 lg:mt-0 hover:underline text-base sm:text-lg md:text-xl group"
            >
              View All News <FaArrowRight className="ml-2 text-base md:text-lg group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {[
              {
                category: "Announcement",
                date: "March 18, 2024",
                title: "National Fest Registration Deadline Extended",
                excerpt: "Registration extended until March 30, 2024 due to high demand.",
                color: "bg-emerald-100",
                textColor: "text-emerald-800"
              },
              {
                category: "Results",
                date: "March 15, 2024",
                title: "Inter-University Debate Championship 2024 Results",
                excerpt: "Dhaka University wins championship title for third consecutive year.",
                color: "bg-emerald-100",
                textColor: "text-emerald-800"
              },
              {
                category: "Training",
                date: "March 12, 2024",
                title: "Free Online Adjudicator Workshop Series",
                excerpt: "4-week comprehensive training program for aspiring adjudicators.",
                color: "bg-emerald-100",
                textColor: "text-emerald-800"
              }
            ].map((news, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-emerald-100 hover:border-emerald-300 p-4 sm:p-5 md:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className={`${news.color} ${news.textColor} px-3 py-1 rounded-full text-xs sm:text-sm font-bold border border-emerald-200`}>
                    {news.category}
                  </span>
                  <span className="text-gray-500 text-xs sm:text-sm md:text-base">{news.date}</span>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-900 mb-2 sm:mb-3 hover:text-emerald-700 transition-colors duration-300">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6">{news.excerpt}</p>
                <div className="flex items-center text-emerald-600 font-semibold text-sm sm:text-base md:text-lg hover:text-emerald-800 transition-colors duration-300 group">
                  Read Full Story <FaArrowRight className="ml-2 text-sm sm:text-base group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Debaters */}
      <section className="py-12 md:py-16 lg:py-20 xl:py-24 bg-emerald-50 border-y border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-3 md:mb-4 lg:mb-6">
              Our Star Debaters
            </h2>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl lg:max-w-3xl mx-auto">
              Meet the exceptional talents who have represented Bangladesh on national and international stages
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {[
              {
                name: "Tasnim Rahman",
                title: "National Champion 2023",
                achievement: "Best Speaker, Asian Debate Championship",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                category: "University"
              },
              {
                name: "Rahim Khan",
                title: "Top Adjudicator",
                achievement: "Perfect Score in National Finals",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                category: "Open Category"
              },
              {
                name: "Sarah Ahmed",
                title: "Youth Ambassador",
                achievement: "Winner, International Peace Debate",
                image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                category: "College"
              }
            ].map((debaters, index) => (
              <div key={index} className="bg-white rounded-xl border border-emerald-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
                  <img 
                    src={debaters.image} 
                    alt={debaters.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs sm:text-sm font-bold border border-emerald-200">
                    {debaters.category}
                  </div>
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-900 mb-1 sm:mb-2 hover:text-emerald-700 transition-colors duration-300">
                    {debaters.name}
                  </h3>
                  <p className="text-emerald-600 font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2">
                    {debaters.title}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-3 sm:mb-4">
                    {debaters.achievement}
                  </p>
                  <div className="flex items-center text-emerald-600 font-semibold text-sm sm:text-base md:text-lg hover:text-emerald-800 transition-colors duration-300 group">
                    View Profile <FaArrowRight className="ml-2 text-sm sm:text-base group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 md:py-16 lg:py-20 xl:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-3 md:mb-4 lg:mb-6">
              Our Esteemed Partners
            </h2>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl lg:max-w-3xl mx-auto">
              Collaborating with leading organizations to promote debate culture in Bangladesh
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 lg:gap-6 items-center justify-items-center mb-8 md:mb-10 lg:mb-12">
            {[
              { name: "Ministry of Education", logo: "🏛️", bg: "bg-emerald-50" },
              { name: "Youth Development", logo: "🌟", bg: "bg-emerald-50" },
              { name: "Bangladesh Bank", logo: "🏦", bg: "bg-emerald-50" },
              { name: "University Grants", logo: "🎓", bg: "bg-emerald-50" },
              { name: "Prothom Alo", logo: "📰", bg: "bg-emerald-50" },
              { name: "BTV", logo: "📺", bg: "bg-emerald-50" }
            ].map((partner, index) => (
              <div 
                key={index} 
                className={`${partner.bg} p-3 sm:p-4 md:p-5 lg:p-6 rounded-xl w-full h-20 sm:h-24 md:h-28 lg:h-32 flex flex-col items-center justify-center border border-emerald-100 hover:border-emerald-300 hover:shadow-lg hover:scale-105 transition-all duration-300`}
              >
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2">{partner.logo}</div>
                <div className="font-semibold text-center text-emerald-800 text-xs sm:text-sm md:text-base">
                  {partner.name}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              to="/partners" 
              className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 md:py-4 md:px-8 lg:py-5 lg:px-10 rounded-lg transition-all duration-300 border border-emerald-700 hover:shadow-xl hover:-translate-y-1 text-sm sm:text-base md:text-lg"
            >
              Become a Partner <FaArrowRight className="ml-2 text-base md:text-lg group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-16 lg:py-20 xl:py-24 bg-emerald-50 border-t border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl border border-emerald-100 max-w-3xl lg:max-w-4xl mx-auto shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="bg-emerald-100 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 border border-emerald-200 group-hover:scale-110 transition-transform duration-500">
              <FaMicrophone className="text-2xl sm:text-3xl md:text-4xl text-emerald-600" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-900 mb-4 sm:mb-6 md:mb-8">
              Ready to Start Your Debate Journey?
            </h2>
            <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 md:mb-10 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
              Join thousands of debaters across Bangladesh. Register now for upcoming events, 
              access free resources, and become part of our growing community.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-5">
              <Link 
                to="/registration" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 md:py-4 md:px-8 lg:py-5 lg:px-10 rounded-lg transition-all duration-300 border border-emerald-700 hover:shadow-xl hover:-translate-y-1 text-sm sm:text-base md:text-lg"
              >
                Register for Competition
              </Link>
              <Link 
                to="/membership" 
                className="bg-white hover:bg-emerald-50 text-emerald-700 font-bold py-3 px-6 md:py-4 md:px-8 lg:py-5 lg:px-10 rounded-lg transition-all duration-300 border border-emerald-300 hover:shadow-xl hover:-translate-y-1 text-sm sm:text-base md:text-lg"
              >
                Join as Member
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;