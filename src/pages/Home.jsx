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
  FaChevronRight,
  FaCalendar,
  FaMapMarkerAlt,
  FaClock
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

  // About Us images (3 small images)
  const aboutImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "National Debate Competition"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "Debate Training Workshop"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      alt: "Debate Award Ceremony"
    }
  ];

  // Events data for the new Events section with images
  const events = [
    {
      id: 1,
      title: "National Youth Debate Championship 2024",
      description: "Open for all universities and colleges across Bangladesh. Showcase your debating skills at the national level.",
      date: "April 15-20, 2024",
      location: "Dhaka University Campus",
      time: "9:00 AM - 5:00 PM",
      category: "National Level",
      image: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "National Youth Debate Championship",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-800"
    },
    {
      id: 2,
      title: "Inter-School Debate Competition",
      description: "Exclusive for school students (Class 6-12). Nurturing young debaters with proper guidance and mentoring.",
      date: "May 5-10, 2024",
      location: "Virtual & On-site",
      time: "10:00 AM - 4:00 PM",
      category: "School Level",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Inter-School Debate Competition",
      bgColor: "bg-emerald-100",
      borderColor: "border-emerald-300",
      textColor: "text-emerald-900"
    },
    {
      id: 3,
      title: "Bangla Debate Workshop Series",
      description: "Learn the art of debating in Bangla language. Special focus on traditional and contemporary issues.",
      date: "June 1-30, 2024",
      location: "All Divisional Cities",
      time: "Flexible Schedule",
      category: "Training",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Bangla Debate Workshop",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-800"
    }
  ];

  // Advertisement logos for marquee with original colored logos
  const adLogos = [
    {
      id: 1,
      name: "Facebook",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png",
      alt: "Facebook"
    },
    {
      id: 2,
      name: "YouTube",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png",
      alt: "YouTube"
    },
    {
      id: 3,
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
      alt: "Google"
    },
    {
      id: 4,
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
      alt: "Amazon"
    },
    {
      id: 5,
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2560px-Microsoft_logo.svg.png",
      alt: "Microsoft"
    },
    {
      id: 6,
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/505px-Apple_logo_black.svg.png",
      alt: "Apple"
    },
    {
      id: 7,
      name: "Netflix",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
      alt: "Netflix"
    }
  ];

  // Partners data for marquee
  const partners = [
    { name: "Ministry of Education", logo: "🏛️", bg: "bg-emerald-50" },
    { name: "Youth Development", logo: "🌟", bg: "bg-emerald-50" },
    { name: "Bangladesh Bank", logo: "🏦", bg: "bg-emerald-50" },
    { name: "University Grants", logo: "🎓", bg: "bg-emerald-50" },
    { name: "Prothom Alo", logo: "📰", bg: "bg-emerald-50" },
    { name: "BTV", logo: "📺", bg: "bg-emerald-50" },
    { name: "Dhaka University", logo: "🎯", bg: "bg-emerald-50" },
    { name: "Bangladesh Army", logo: "⚔️", bg: "bg-emerald-50" }
  ];

  // News data with images
  const newsItems = [
    {
      category: "Announcement",
      date: "March 18, 2024",
      title: "National Fest Registration Deadline Extended",
      excerpt: "Registration extended until March 30, 2024 due to high demand from participants across all 64 districts.",
      color: "bg-emerald-100",
      textColor: "text-emerald-800",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Registration Announcement",
      readTime: "2 min read",
      viewers: "245+"
    },
    {
      category: "Results",
      date: "March 15, 2024",
      title: "Inter-University Debate Championship 2024 Results",
      excerpt: "Dhaka University Debate Club wins championship title for third consecutive year in a thrilling finale.",
      color: "bg-emerald-100",
      textColor: "text-emerald-800",
      image: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Championship Results",
      readTime: "3 min read",
      viewers: "318+"
    },
    {
      category: "Training",
      date: "March 12, 2024",
      title: "Free Online Adjudicator Workshop Series",
      excerpt: "4-week comprehensive training program for aspiring adjudicators starting from April 1st, 2024.",
      color: "bg-emerald-100",
      textColor: "text-emerald-800",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Workshop Training",
      readTime: "4 min read",
      viewers: "192+"
    }
  ];

  return (
    <div className="home-page bg-white">
      {/* Hero Banner with Background Swiper Slider */}
      <section className="relative overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
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
        <div className="relative z-10 py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
              {/* Left Content - Text */}
              <div className="text-white">
                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full mb-6 border border-white/30 hover:bg-white/30 transition-all duration-300">
                  <FaCalendarAlt className="mr-2 text-sm md:text-base" />
                  <span className="font-bold text-sm md:text-base lg:text-lg">March 15-20, 2024</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 lg:mb-8 leading-tight">
                  National Debate <span className="text-emerald-300">Festival</span> 2024
                </h1>
                <p className="text-white/90 mb-6 md:mb-8 lg:mb-10 text-base sm:text-lg md:text-xl leading-relaxed">
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
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">5,000+</div>
                    <div className="text-xs sm:text-sm md:text-base text-white/80">Participants</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">64</div>
                    <div className="text-xs sm:text-sm md:text-base text-white/80">Districts</div>
                  </div>
                  <div className="text-center bg-white/10 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">50 Lakh+</div>
                    <div className="text-xs sm:text-sm md:text-base text-white/80">Prize Pool</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section (Replaces Quick Links) */}
      <section className="py-12 md:py-16 lg:py-20 bg-white" id="about-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
            {/* Left Side - 3 Small Images Grid with Slide Up Animation on Scroll */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              {aboutImages.map((image, index) => (
                <div 
                  key={image.id} 
                  ref={el => {
                    // Intersection Observer for slide-up animation
                    if (el && typeof window !== 'undefined') {
                      // Create a unique observer for each element
                      const observer = new IntersectionObserver(
                        (entries) => {
                          entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                              // Add animation class when element is in view
                              entry.target.classList.add('animate-slide-up');
                              // Remove initial hidden styles
                              entry.target.style.opacity = '1';
                              entry.target.style.transform = 'translateY(0)';
                            }
                          });
                        },
                        {
                          threshold: 0.2, // Trigger when 20% of element is visible
                          rootMargin: '0px 0px -30px 0px' // Trigger slightly before entering viewport
                        }
                      );
                      
                      observer.observe(el);
                      
                      // Cleanup observer on component unmount
                      return () => observer.disconnect();
                    }
                  }}
                  className={`relative overflow-hidden rounded-lg md:rounded-xl border border-emerald-100 hover:border-emerald-300 transition-all duration-700 hover:shadow-xl hover:-translate-y-2 ${
                    index === 1 ? 'row-span-2' : 'row-span-1'
                  }`}
                  style={{ 
                    opacity: 0,
                    transform: 'translateY(30px)',
                    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
                  }}
                >
                  <div className={`aspect-square overflow-hidden ${index === 1 ? 'h-full' : ''}`}>
                    <img 
                      src={image.url} 
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
            
            {/* Right Side - About Us Content */}
            <div>
              <div className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm md:text-base font-bold mb-4 sm:mb-6 border border-emerald-200">
                ABOUT BDF
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-900 mb-4 sm:mb-6 leading-tight">
                Leading Debate Excellence in <span className="text-emerald-600">Bangladesh</span>
              </h2>
              <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                Established in 2010, Bangladesh Debate Federation (BDF) is the premier national body 
                dedicated to promoting competitive debating, critical thinking, and public speaking 
                across Bangladesh. We are committed to nurturing the next generation of leaders.
              </p>
              
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 md:mb-10">
                <div className="flex items-start">
                  <div className="bg-emerald-100 text-emerald-600 p-1.5 sm:p-2 rounded-full mr-3 sm:mr-4 mt-0.5 sm:mt-1">
                    <FaCheckCircle className="text-sm sm:text-base" />
                  </div>
                  <span className="text-gray-800 text-sm sm:text-base md:text-lg">
                    <span className="font-bold text-emerald-700">15,000+</span> Trained Debaters Nationwide
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="bg-emerald-100 text-emerald-600 p-1.5 sm:p-2 rounded-full mr-3 sm:mr-4 mt-0.5 sm:mt-1">
                    <FaCheckCircle className="text-sm sm:text-base" />
                  </div>
                  <span className="text-gray-800 text-sm sm:text-base md:text-lg">
                    <span className="font-bold text-emerald-700">250+</span> Events Organized Annually
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="bg-emerald-100 text-emerald-600 p-1.5 sm:p-2 rounded-full mr-3 sm:mr-4 mt-0.5 sm:mt-1">
                    <FaCheckCircle className="text-sm sm:text-base" />
                  </div>
                  <span className="text-gray-800 text-sm sm:text-base md:text-lg">
                    <span className="font-bold text-emerald-700">64</span> Districts Covered Across Bangladesh
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="bg-emerald-100 text-emerald-600 p-1.5 sm:p-2 rounded-full mr-3 sm:mr-4 mt-0.5 sm:mt-1">
                    <FaCheckCircle className="text-sm sm:text-base" />
                  </div>
                  <span className="text-gray-800 text-sm sm:text-base md:text-lg">
                    <span className="font-bold text-emerald-700">12</span> International Awards & Recognitions
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link 
                  to="/about" 
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg transition-all duration-300 flex items-center justify-center border border-emerald-700 hover:shadow-xl hover:-translate-y-1 text-sm sm:text-base md:text-lg"
                >
                  Know More <FaArrowRight className="ml-2 text-sm sm:text-base md:text-base" />
                </Link>
                <Link 
                  to="/events" 
                  className="bg-white hover:bg-emerald-50 text-emerald-700 font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg transition-all duration-300 flex items-center justify-center border border-emerald-300 hover:shadow-xl hover:-translate-y-1 text-sm sm:text-base md:text-lg"
                >
                  Upcoming Events
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* CSS for slide up animation */}
        <style>
          {`
            @keyframes slideUp {
              0% {
                opacity: 0;
                transform: translateY(30px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-slide-up {
              animation: slideUp 0.8s ease-out forwards;
            }
          `}
        </style>
      </section>

  {/* Partners with Marquee Cards - FIXED MOBILE VERSION - SINGLE LINE */}
<section className="py-8 md:py-12 lg:py-16 bg-white overflow-hidden">
  <div className="container mx-auto px-4">
    <div className="text-center mb-8 md:mb-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-900 mb-2">
        Our Esteemed Partners
      </h2>
      <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
        Collaborating with leading organizations to promote debate culture in Bangladesh
      </p>
    </div>
    
    {/* Marquee Container - SINGLE LINE */}
    <div className="relative w-full overflow-hidden py-4">
      {/* Single marquee row with duplicate content for seamless loop */}
      <div className="flex animate-marqueeSingle whitespace-nowrap">
        {/* First set of partners */}
        {partners.map((partner, idx) => (
          <div 
            key={`${idx}-1`} 
            className="inline-flex bg-emerald-50 p-3 sm:p-4 rounded-lg mx-2 sm:mx-3 md:mx-4 h-20 sm:h-24 w-28 sm:w-32 md:w-36 flex-shrink-0 flex-col items-center justify-center border border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            <div className="text-xl sm:text-2xl md:text-3xl mb-2">
              {partner.logo}
            </div>
            <div className="font-semibold text-center text-emerald-800 text-xs sm:text-sm px-1">
              {partner.name}
            </div>
          </div>
        ))}
        
        {/* Duplicate set for seamless loop */}
        {partners.map((partner, idx) => (
          <div 
            key={`${idx}-2`} 
            className="inline-flex bg-emerald-50 p-3 sm:p-4 rounded-lg mx-2 sm:mx-3 md:mx-4 h-20 sm:h-24 w-28 sm:w-32 md:w-36 flex-shrink-0 flex-col items-center justify-center border border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:scale-105 hover:shadow-md"
            aria-hidden="true"
          >
            <div className="text-xl sm:text-2xl md:text-3xl mb-2">
              {partner.logo}
            </div>
            <div className="font-semibold text-center text-emerald-800 text-xs sm:text-sm px-1">
              {partner.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  {/* Inline CSS for single line marquee animation */}
  <style>
    {`
      @keyframes marqueeSingle {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      
      .animate-marqueeSingle {
        animation: marqueeSingle 40s linear infinite;
        display: flex;
        width: max-content;
      }
      
      @media (max-width: 640px) {
        .animate-marqueeSingle {
          animation: marqueeSingle 35s linear infinite;
        }
      }
      
      .animate-marqueeSingle:hover {
        animation-play-state: paused;
      }
    `}
  </style>
</section>

      {/* NEW: Events Section with Perfectly Aligned Cards - COMPACT VERSION */}
      <section className="py-8 md:py-10 lg:py-12 bg-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with Arrow and Button - Compact */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 md:mb-8">
            {/* Left Side - Text Only */}
            <div className="mb-4 lg:mb-0">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-900 leading-tight">
                Join Our Next 
                <span className="relative inline-block ml-2">
                  <span className="text-emerald-600 relative">
                    Debate Events
                    {/* Animated underline */}
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 rounded-full animate-underline"></span>
                  </span>
                </span>
              </h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-xl mt-2">
                Participate in exciting debate competitions and workshops across Bangladesh
              </p>
            </div>
            
            {/* Right Side - Dynamic Browse All Events Button */}
            <div className="hidden lg:block">
              <Link 
                to="/events" 
                className="group relative inline-flex items-center overflow-hidden bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-emerald-600 shadow-md"
              >
                {/* Shine Effect */}
                <span className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-white/40 via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-all duration-1000"></span>
                
                {/* Button Content */}
                <span className="relative z-10 flex items-center">
                  <span className="mr-2 text-sm font-semibold tracking-wide">Browse All Events</span>
                  <div className="relative">
                    <FaArrowRight className="text-sm transform group-hover:translate-x-1 transition-transform duration-300" />
                    <FaArrowRight className="absolute top-0 left-0 text-sm opacity-0 group-hover:opacity-30 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                </span>
              </Link>
            </div>
          </div>
          
          {/* Grid container with equal height cards - Compact */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-stretch">
            {events.map((event, index) => (
              <div 
                key={event.id} 
                className={`group bg-white rounded-lg border ${event.borderColor} overflow-hidden hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${index === 1 ? 'lg:-translate-y-0' : ''} flex flex-col h-full`}
              >
                {/* Event Image - Fixed Height (Compact) */}
                <div className="relative h-40 sm:h-44 md:h-48 lg:h-52 overflow-hidden flex-shrink-0">
                  <img 
                    src={event.image} 
                    alt={event.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold border border-emerald-200 text-black">
                    {event.category}
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
                
                {/* Event Content - Flexible height with button at bottom */}
                <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-900 mb-2 sm:mb-3 line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-700 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 leading-relaxed line-clamp-3 flex-grow">
                    {event.description}
                  </p>
                  
                  {/* Event Details - Fixed content */}
                  <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 md:mb-6">
                    <div className="flex items-center">
                      <div className={`${event.bgColor} p-1.5 rounded-full mr-2 border ${event.borderColor} flex-shrink-0`}>
                        <FaCalendar className="text-emerald-600 text-xs" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 truncate">Date</p>
                        <p className="font-semibold text-emerald-800 text-sm truncate">{event.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`${event.bgColor} p-1.5 rounded-full mr-2 border ${event.borderColor} flex-shrink-0`}>
                        <FaMapMarkerAlt className="text-emerald-600 text-xs" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 truncate">Location</p>
                        <p className="font-semibold text-emerald-800 text-sm truncate">{event.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`${event.bgColor} p-1.5 rounded-full mr-2 border ${event.borderColor} flex-shrink-0`}>
                        <FaClock className="text-emerald-600 text-xs" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 truncate">Time</p>
                        <p className="font-semibold text-emerald-800 text-sm truncate">{event.time}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Button - Fixed at bottom */}
                  <div className="mt-auto pt-1">
                    <Link 
                      to={`/events/${event.id}`} 
                      className="group/btn inline-flex items-center justify-center w-full text-center bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 border border-emerald-600 hover:shadow-md hover:scale-[1.02] text-xs sm:text-sm"
                    >
                      <span className="mr-1">Know More</span>
                      <div className="relative">
                        <FaArrowRight className="text-xs transform group-hover/btn:translate-x-0.5 transition-transform duration-300" />
                        <FaArrowRight className="absolute top-0 left-0 text-xs opacity-0 group-hover/btn:opacity-30 group-hover/btn:translate-x-1 transition-all duration-300" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile & Tablet View - Dynamic Button (Center Aligned) */}
          <div className="text-center mt-8 md:mt-10 lg:hidden">
            <Link 
              to="/events" 
              className="group relative inline-flex items-center overflow-hidden bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-emerald-600 shadow-md mx-auto"
            >
              {/* Shine Effect */}
              <span className="absolute top-0 left-0 w-6 h-full bg-gradient-to-r from-white/40 via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-all duration-1000"></span>
              
              {/* Button Content */}
              <span className="relative z-10 flex items-center">
                <span className="mr-2 text-sm font-semibold tracking-wide">Browse All Events</span>
                <div className="relative">
                  <FaArrowRight className="text-sm transform group-hover:translate-x-1 transition-transform duration-300" />
                  <FaArrowRight className="absolute top-0 left-0 text-sm opacity-0 group-hover:opacity-30 group-hover:translate-x-2 transition-all duration-300" />
                </div>
              </span>
            </Link>
          </div>
        </div>
        
        {/* CSS for underline animation */}
        <style>
          {`
            @keyframes underline {
              0% {
                transform: scaleX(0);
                transform-origin: left;
              }
              50% {
                transform: scaleX(1);
                transform-origin: left;
              }
              51% {
                transform-origin: right;
              }
              100% {
                transform: scaleX(0);
                transform-origin: right;
              }
            }
            .animate-underline {
              animation: underline 2s ease-in-out infinite;
            }
          `}
        </style>
      </section>

      {/* Latest News - Updated with Images */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 md:mb-10">
            {/* Left Side - Text with Animation */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-900 mb-2">
                Latest News & 
                <span className="relative inline-block ml-2">
                  <span className="text-emerald-600 relative">
                    Announcements
                    {/* Animated underline - Same as Events section */}
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 rounded-full animate-underline"></span>
                  </span>
                </span>
              </h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-xl">
                Stay updated with the latest announcements, competition results and upcoming events
              </p>
            </div>
            
            {/* Right Side - Dynamic View All News Button (Desktop Only) */}
            <div className="hidden lg:block">
              <Link 
                to="/news" 
                className="group relative inline-flex items-center overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-emerald-600"
              >
                {/* Shine Effect */}
                <span className="absolute top-0 left-0 w-6 h-full bg-white/30 -skew-x-12 -translate-x-16 group-hover:translate-x-[calc(100%+16px)] transition-all duration-700"></span>
                
                {/* Button Content */}
                <span className="relative z-10 flex items-center">
                  <span className="mr-3 text-lg">View All News</span>
                  <div className="relative">
                    <FaArrowRight className="text-lg transform group-hover:translate-x-2 transition-transform duration-300" />
                    <FaArrowRight className="absolute top-0 left-0 text-lg opacity-0 group-hover:opacity-30 group-hover:translate-x-4 transition-all duration-300" />
                  </div>
                </span>
                
                {/* Corner Accents */}
                <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/30"></span>
                <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/30"></span>
              </Link>
            </div>
          </div>
          
          {/* News Cards Grid with Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {newsItems.map((news, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-xl border border-emerald-100 hover:border-emerald-300 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              >
                {/* News Image */}
                <div className="relative h-48 sm:h-56 md:h-60 lg:h-64 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Category Badge on Image */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs sm:text-sm font-bold border border-emerald-200 text-emerald-800">
                    {news.category}
                  </div>
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* News Content */}
                <div className="p-5 sm:p-6 md:p-7">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-500 text-xs sm:text-sm md:text-base flex items-center">
                      <FaCalendar className="mr-1.5 text-emerald-600" /> {news.date}
                    </span>
                    <span className="text-gray-400 text-xs sm:text-sm">{news.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-emerald-900 mb-3 sm:mb-4 hover:text-emerald-700 transition-colors duration-300 line-clamp-2">
                    {news.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-5 sm:mb-6 line-clamp-3">
                    {news.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-emerald-50">
                    <Link 
                      to={`/news/${index + 1}`}
                      className="inline-flex items-center text-emerald-600 font-semibold text-sm sm:text-base hover:text-emerald-800 transition-colors duration-300 group/readmore"
                    >
                      Read Full Story 
                      <FaArrowRight className="ml-2 text-sm sm:text-base group-hover/readmore:translate-x-2 transition-transform duration-300" />
                    </Link>
                    
                    <div className="flex items-center space-x-1">
                      <FaUsers className="text-gray-400 text-xs" />
                      <span className="text-gray-400 text-xs sm:text-sm">{news.viewers}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile & Tablet View - Dynamic Button (Center Aligned) */}
          <div className="text-center mt-10 md:mt-12 lg:hidden">
            <Link 
              to="/news" 
              className="group relative inline-flex items-center overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border border-emerald-600 mx-auto"
            >
              {/* Shine Effect */}
              <span className="absolute top-0 left-0 w-6 h-full bg-white/30 -skew-x-12 -translate-x-16 group-hover:translate-x-[calc(100%+16px)] transition-all duration-700"></span>
              
              {/* Button Content */}
              <span className="relative z-10 flex items-center">
                <span className="mr-3 text-lg">View All News</span>
                <div className="relative">
                  <FaArrowRight className="text-lg transform group-hover:translate-x-2 transition-transform duration-300" />
                  <FaArrowRight className="absolute top-0 left-0 text-lg opacity-0 group-hover:opacity-30 group-hover:translate-x-4 transition-all duration-300" />
                </div>
              </span>
              
              {/* Corner Accents */}
              <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/30"></span>
              <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/30"></span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;