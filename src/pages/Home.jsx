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

// Import Stack component
import Stack from './Stack';

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
      url: "https://i.ibb.co.com/MkTLQsv1/Whats-App-Image-2025-12-28-at-11-14-00-AM.jpg",
      alt: "Debate Training Session"
    },
    {
      id: 3,
      url: "https://i.ibb.co.com/rRqqC8v7/590229201-1406347054631792-9028344179879825090-n.jpg",
      alt: "Youth Debate Competition"
    }
  ];

  // About Us images (3 small images) for Stack component
  const aboutImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      // alt: "National Debate Competition"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      // alt: "Debate Training Workshop"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      // alt: "Debate Award Ceremony"
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
                  {/* Gradient overlay removed for clear image view */}
                  {/* <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div> */}
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
                {/* Content removed for cleaner hero section */}
                <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-5">
                  {/* Empty for now */}
                </div>
                
                {/* Stats - সংখ্যাগুলো কমেন্ট করে রাখা হয়েছে */}
             
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section with Stack Component */}
      <section className="py-12 md:py-16 lg:py-20 bg-white" id="about-section">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-center">
            
            {/* Mobile Order: First show "ABOUT BDF" label */}
            <div className="lg:hidden w-full">
              <div className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm md:text-base font-bold mb-4 sm:mb-6 border border-emerald-200 text-justify">
                ABOUT BDF
              </div>
            </div>
            
            {/* Left Side - Stack Component (Mobile: Show after label, Desktop: Show as left column) */}
            <div className="w-full order-2 lg:order-1">
              <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96">
                <Stack
                  randomRotation={true}
                  sensitivity={180}
                  sendToBackOnClick={true}
                  autoplay={true}
                  autoplayDelay={3000}
                  pauseOnHover={true}
                  mobileClickOnly={true}
                  cards={aboutImages.map((image, i) => (
                    <div 
                      key={image.id}
                      className="relative w-full h-full rounded-lg md:rounded-xl overflow-hidden border border-emerald-200 shadow-lg"
                    >
                      <img 
                        src={image.url} 
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 md:p-4">
                        <p className="text-white font-medium text-sm md:text-base">
                          {image.alt}
                        </p>
                      </div>
                    </div>
                  ))}
                />
              </div>
            </div>
            
            {/* Right Side - About Us Content (Mobile: Show after images, Desktop: Show as right column) */}
            <div className="w-full order-3 lg:order-2">
              {/* Desktop: Show "ABOUT BDF" label */}
              <div className="hidden lg:block">
                <div className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm md:text-base font-bold mb-4 sm:mb-6 border border-emerald-200 text-justify">
                  ABOUT BDF
                </div>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-900 mb-4 sm:mb-6 leading-tight text-justify">
                Leading Debate Excellence in <span className="text-emerald-600">Bangladesh</span>
              </h2>
              <p className="text-gray-700 text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8 leading-relaxed text-justify">
                Bangladesh Debate Federation (BDF) started its journey on the first quarter of the last decade of the previous century when democracy just appeared to the country as the form of government. Through a long period, BDF could able to build a generation who can lead, who can speak and who can represent. Since 1992 Bangladesh Debate Federation (BDF) is the central debate platform in the debating arena of Bangladesh. With a view to explore democracy in every sphere of the country, accessible to the mass people and increases the boundary of debate beyond the Dhaka city few legends of the debating arena has started there journey through debate. Birupakkha Pal, Dr. Niamot Elahi, Dr. Abdun Nur Tushar were the gypsy of that caravan. Since its launching BDF is organizing National Debate Festival in every two year regularly as well as training workshops, several competitions, mini-fests, Inter University debate championships, national school debate championship etc. Recently BDF has started to give debate award for performing and organizing debate activities.
              </p>
              
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
      </section>

      {/* Partners with Marquee Cards - LOGOS ONLY, NO TEXT, COLORFUL */}
      <section className="py-8 md:py-12 lg:py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Section Header - CENTER ALIGNED */}
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-900 mb-2">
              Our Esteemed Partners
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
              Collaborating with leading organizations to promote debate culture in Bangladesh
            </p>
          </div>
          
          {/* Marquee Container - LOGOS ONLY */}
          <div className="relative w-full overflow-hidden py-4">
            {/* Single marquee row with duplicate content for seamless loop */}
            <div className="flex animate-marqueeSingle whitespace-nowrap">
              {/* First set of logos */}
              {[
                {
                  name: "USAID",
                  logo: "https://i.ibb.co.com/pBXmCwrK/USAID-Identity.png",
                  alt: "USAID Logo"
                },
                {
                  name: "Bangladesh National Museum",
                  logo: "https://i.ibb.co.com/zhcJgRGF/bangladesh-national-museum-logo.png",
                  alt: "Bangladesh National Museum Logo"
                },
                {
                  name: "ICYF",
                  logo: "https://i.ibb.co.com/GQnWXcV9/download-1.png",
                  alt: "ICYF Logo"
                },
                {
                  name: "Ministry of Cultural Affairs",
                  logo: "https://i.ibb.co.com/DP928RvR/Ministry-of-Cultural-Affairs.jpg",
                  alt: "Ministry of Cultural Affairs Logo"
                },
                {
                  name: "Organisation of Islamic Cooperation",
                  logo: "https://i.ibb.co.com/1GTdXj11/Organisation-of-Islamic-Cooperation-Logo.png",
                  alt: "OIC Logo"
                },
                {
                  name: "UNDP",
                  logo: "https://i.ibb.co.com/VWxTZ5yp/UNDP-logo.png",
                  alt: "UNDP Logo"
                },
                {
                  name: "Ministry of Foreign Affairs",
                  logo: "https://i.ibb.co.com/XxjwCmnR/Government-Seal-of-Bangladesh-svg.png",
                  alt: "Ministry of Foreign Affairs Logo"
                },
                {
                  name: "ILO",
                  logo: "https://i.ibb.co.com/sdbM8qxH/ilo.png",
                  alt: "ILO Logo"
                }
              ].map((partner, idx) => (
                <div 
                  key={`${idx}-1`} 
                  className="inline-flex bg-emerald-50 p-4 sm:p-5 rounded-lg mx-2 sm:mx-3 md:mx-4 h-28 sm:h-32 md:h-36 w-28 sm:w-32 md:w-36 flex-shrink-0 items-center justify-center border border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:scale-105 hover:shadow-md"
                >
                  {/* Logo Container Only - No Text, Colorful Logos */}
                  <div className="h-full w-full flex items-center justify-center p-3">
                    <img 
                      src={partner.logo} 
                      alt={partner.alt}
                      className="max-h-full max-w-full object-contain opacity-80 hover:opacity-100 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {[
                {
                  name: "USAID",
                  logo: "https://i.ibb.co.com/pBXmCwrK/USAID-Identity.png",
                  alt: "USAID Logo"
                },
                {
                  name: "Bangladesh National Museum",
                  logo: "https://i.ibb.co.com/zhcJgRGF/bangladesh-national-museum-logo.png",
                  alt: "Bangladesh National Museum Logo"
                },
                {
                  name: "ICYF",
                  logo: "https://i.ibb.co.com/GQnWXcV9/download-1.png",
                  alt: "ICYF Logo"
                },
                {
                  name: "Ministry of Cultural Affairs",
                  logo: "https://i.ibb.co.com/DP928RvR/Ministry-of-Cultural-Affairs.jpg",
                  alt: "Ministry of Cultural Affairs Logo"
                },
                {
                  name: "Organisation of Islamic Cooperation",
                  logo: "https://i.ibb.co.com/1GTdXj11/Organisation-of-Islamic-Cooperation-Logo.png",
                  alt: "OIC Logo"
                },
                {
                  name: "UNDP",
                  logo: "https://i.ibb.co.com/VWxTZ5yp/UNDP-logo.png",
                  alt: "UNDP Logo"
                },
                {
                  name: "Ministry of Foreign Affairs",
                  logo: "https://i.ibb.co.com/XxjwCmnR/Government-Seal-of-Bangladesh-svg.png",
                  alt: "Ministry of Foreign Affairs Logo"
                },
                {
                  name: "ILO",
                  logo: "https://i.ibb.co.com/sdbM8qxH/ilo.png",
                  alt: "ILO Logo"
                }
              ].map((partner, idx) => (
                <div 
                  key={`${idx}-2`} 
                  className="inline-flex bg-emerald-50 p-4 sm:p-5 rounded-lg mx-2 sm:mx-3 md:mx-4 h-28 sm:h-32 md:h-36 w-28 sm:w-32 md:w-36 flex-shrink-0 items-center justify-center border border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:scale-105 hover:shadow-md"
                  aria-hidden="true"
                >
                  {/* Logo Container Only - No Text, Colorful Logos */}
                  <div className="h-full w-full flex items-center justify-center p-3">
                    <img 
                      src={partner.logo} 
                      alt={partner.alt}
                      className="max-h-full max-w-full object-contain opacity-80 hover:opacity-100 transition-all duration-300"
                      loading="lazy"
                    />
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
                animation: marqueeSingle 30s linear infinite;
              }
            }
            
            .animate-marqueeSingle:hover {
              animation-play-state: paused;
            }
          `}
        </style>
      </section>

     {/* Events Section with Perfectly Aligned Cards - COMPACT VERSION */}
<section className="py-8 md:py-10 lg:py-12 bg-emerald-50">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header with Arrow and Button - Compact */}
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 md:mb-8">
      {/* Left Side - Text Only */}
      <div className="mb-4 lg:mb-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-900 leading-tight text-left">
          Join Our Next 
          <span className="relative inline-block ml-2">
            <span className="text-emerald-600 relative text-left">
              Debate Events
              {/* Animated underline */}
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 rounded-full animate-underline"></span>
            </span>
          </span>
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mt-2 text-left">
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
            <span className="mr-2 text-sm font-semibold tracking-wide text-left">Browse All Events</span>
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
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold border border-emerald-200 text-black text-left">
              {event.category}
            </div>
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>
          
          {/* Event Content - Flexible height with button at bottom */}
          <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
            {/* FIXED: Title with proper spacing - Completely custom CSS */}
            <h3 className="event-title text-lg sm:text-xl md:text-2xl font-bold text-emerald-900 mb-2 sm:mb-3">
              {event.title}
            </h3>
            
            <p className="text-gray-700 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 leading-relaxed line-clamp-3 flex-grow text-left">
              {event.description}
            </p>
            
            {/* Event Details - Fixed content */}
            <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 md:mb-6">
              <div className="flex items-center">
                <div className={`${event.bgColor} p-1.5 rounded-full mr-2 border ${event.borderColor} flex-shrink-0`}>
                  <FaCalendar className="text-emerald-600 text-xs" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 truncate text-left">Date</p>
                  <p className="font-semibold text-emerald-800 text-sm truncate text-left">{event.date}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className={`${event.bgColor} p-1.5 rounded-full mr-2 border ${event.borderColor} flex-shrink-0`}>
                  <FaMapMarkerAlt className="text-emerald-600 text-xs" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 truncate text-left">Location</p>
                  <p className="font-semibold text-emerald-800 text-sm truncate text-left">{event.location}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className={`${event.bgColor} p-1.5 rounded-full mr-2 border ${event.borderColor} flex-shrink-0`}>
                  <FaClock className="text-emerald-600 text-xs" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 truncate text-left">Time</p>
                  <p className="font-semibold text-emerald-800 text-sm truncate text-left">{event.time}</p>
                </div>
              </div>
            </div>
            
            {/* Button - Fixed at bottom */}
            <div className="mt-auto pt-1">
              <Link 
                to={`/events/${event.id}`} 
                className="group/btn inline-flex items-center justify-center w-full text-center bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 border border-emerald-600 hover:shadow-md hover:scale-[1.02] text-xs sm:text-sm"
              >
                <span className="mr-1 text-left">Know More</span>
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
          <span className="mr-2 text-sm font-semibold tracking-wide text-left">Browse All Events</span>
          <div className="relative">
            <FaArrowRight className="text-sm transform group-hover:translate-x-1 transition-transform duration-300" />
            <FaArrowRight className="absolute top-0 left-0 text-sm opacity-0 group-hover:opacity-30 group-hover:translate-x-2 transition-all duration-300" />
          </div>
        </span>
      </Link>
    </div>
  </div>
  
  {/* Custom CSS for event title */}
  <style>
    {`
      .event-title {
        text-align: left;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-wrap: break-word;
        word-break: break-word;
        line-height: 1.3;
      }
      
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

      {/* Latest News - Compact Version */}
<section className="py-8 md:py-12 lg:py-16 bg-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    {/* Compact Header Section */}
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 md:mb-8">
      {/* Left Side - Text with Animation (Compact) */}
      <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-900 mb-2 text-left">
          Latest News & 
          <span className="relative inline-block ml-2">
            <span className="text-emerald-600 relative text-left">
              Announcements
              {/* Animated underline - Same as Events section */}
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 rounded-full animate-underline"></span>
            </span>
          </span>
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl text-left">
          Stay updated with the latest announcements, competition results and upcoming events
        </p>
      </div>
      
      {/* Right Side - Dynamic View All News Button (Desktop Only) - Compact */}
      <div className="hidden lg:block">
        <Link 
          to="/news" 
          className="group relative inline-flex items-center overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-emerald-600"
        >
          {/* Shine Effect */}
          <span className="absolute top-0 left-0 w-6 h-full bg-white/30 -skew-x-12 -translate-x-16 group-hover:translate-x-[calc(100%+16px)] transition-all duration-700"></span>
          
          {/* Button Content - Compact */}
          <span className="relative z-10 flex items-center">
            <span className="mr-2 text-sm text-left">View All News</span>
            <div className="relative">
              <FaArrowRight className="text-sm transform group-hover:translate-x-1 transition-transform duration-300" />
              <FaArrowRight className="absolute top-0 left-0 text-sm opacity-0 group-hover:opacity-30 group-hover:translate-x-2 transition-all duration-300" />
            </div>
          </span>
        </Link>
      </div>
    </div>
    
    {/* News Cards Grid with Images - Compact */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      {newsItems.map((news, index) => (
        <div 
          key={index} 
          className="group bg-white rounded-lg border border-emerald-100 hover:border-emerald-300 overflow-hidden transition-all duration-500 hover:shadow-lg hover:-translate-y-1"
        >
          {/* News Image - Compact */}
          <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
            <img 
              src={news.image} 
              alt={news.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Category Badge on Image - Compact */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold border border-emerald-200 text-emerald-800 text-left">
              {news.category}
            </div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* News Content - Compact */}
          <div className="p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-xs flex items-center text-left">
                <FaCalendar className="mr-1.5 text-emerald-600 text-xs" /> {news.date}
              </span>
              <span className="text-gray-400 text-xs text-left">{news.readTime}</span>
            </div>
            
            {/* FIXED: News title with custom class */}
            <h3 className="news-title text-lg sm:text-xl font-bold text-emerald-900 mb-2 sm:mb-3 hover:text-emerald-700 transition-colors duration-300">
              {news.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3 text-left">
              {news.excerpt}
            </p>
            
            <div className="flex items-center justify-between pt-3 border-t border-emerald-50">
              <Link 
                to={`/news/${index + 1}`}
                className="inline-flex items-center text-emerald-600 font-semibold text-sm hover:text-emerald-800 transition-colors duration-300 group/readmore"
              >
                <span className="text-left">Read Full Story</span>
                <FaArrowRight className="ml-1.5 text-xs group-hover/readmore:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <div className="flex items-center space-x-1">
                <FaUsers className="text-gray-400 text-xs" />
                <span className="text-gray-400 text-xs text-left">{news.viewers}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    {/* Mobile & Tablet View - Dynamic Button (Center Aligned) - Compact */}
    <div className="text-center mt-8 md:mt-10 lg:hidden">
      <Link 
        to="/news" 
        className="group relative inline-flex items-center overflow-hidden bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-emerald-600 mx-auto"
      >
        {/* Shine Effect */}
        <span className="absolute top-0 left-0 w-6 h-full bg-white/30 -skew-x-12 -translate-x-16 group-hover:translate-x-[calc(100%+16px)] transition-all duration-700"></span>
        
        {/* Button Content */}
        <span className="relative z-10 flex items-center">
          <span className="mr-2 text-sm text-left">View All News</span>
          <div className="relative">
            <FaArrowRight className="text-sm transform group-hover:translate-x-1 transition-transform duration-300" />
            <FaArrowRight className="absolute top-0 left-0 text-sm opacity-0 group-hover:opacity-30 group-hover:translate-x-2 transition-all duration-300" />
          </div>
        </span>
      </Link>
    </div>
  </div>
  
  {/* Custom CSS for news title */}
  <style>
    {`
      .news-title {
        text-align: left;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-wrap: break-word;
        word-break: break-word;
        line-height: 1.3;
      }
    `}
  </style>
</section>
    </div>
  );
};

export default Home;