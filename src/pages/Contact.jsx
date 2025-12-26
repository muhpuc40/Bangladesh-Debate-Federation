import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaPaperPlane,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCheckCircle,
  FaExclamationCircle,
  FaUniversity,
  FaUserTie,
  FaUserGraduate,
  FaIdCard
} from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: "Head Office",
      details: "House: 128, Road: 04\nMohammadia Housing Society\nMohammadpur, Dhaka",
      color: "bg-blue-100 text-blue-600"
    },
    // {
    //   icon: <FaPhone />,
    //   title: "Phone Numbers",
    //   details: "01719 142953\n 01717 666166\n 01777 408630",
    //   color: "bg-green-100 text-green-600"
    // },
    // {
    //   icon: <FaEnvelope />,
    //   title: "Email Addresses",
    //   details: "General: info@debatefederation.org\nEvents: events@debatefederation.org\nSupport: support@debatefederation.org",
    //   color: "bg-red-100 text-red-600"
    // },
    // {
    //   icon: <FaClock />,
    //   title: "Office Hours",
    //   details: "Sunday - Thursday: 9:00 AM - 5:00 PM\nFriday - Saturday: Closed",
    //   color: "bg-purple-100 text-purple-600"
    // }
  ];

  const departments = [
    {
      name: "Events & Competitions",
      email: "events@debatefederation.org",
      phone: "01719 142953 Ext. 101",
      description: "For event registration, scheduling, and competition inquiries"
    },
    {
      name: "Training & Development",
      email: "training@debatefederation.org",
      phone: "01719 142953 Ext. 102",
      description: "For workshop requests, training programs, and skill development"
    },
    {
      name: "Partnership & Sponsorship",
      email: "partnership@debatefederation.org",
      phone: "01719 142953 Ext. 103",
      description: "For corporate partnerships, sponsorships, and collaborations"
    },
    {
      name: "Media & Press",
      email: "media@debatefederation.org",
      phone: "01719 142953 Ext. 104",
      description: "For press inquiries, interviews, and media coverage"
    }
  ];

  // Debate Club Directory Data
  const debateClubs = [
    {
      clubName: "Dhaka University Debate Society",
      university: "University of Dhaka",
      president: "Ahmed Rahman",
      gs: "Fatima Khan",
      contact: "01719 142953",
      email: "duds@du.ac.bd"
    },
    {
      clubName: "BUET Oratory Club",
      university: "Bangladesh University of Engineering & Technology",
      president: "Rahim Islam",
      gs: "Tasnim Ahmed",
      contact: "01717 666166",
      email: "oratory@buet.ac.bd"
    },
    {
      clubName: "Jahangirnagar Debating Club",
      university: "Jahangirnagar University",
      president: "Sadia Afrin",
      gs: "Kamal Hossain",
      contact: "01777 408630",
      email: "jdc@juniv.edu"
    },
    {
      clubName: "Chittagong University Debate Forum",
      university: "University of Chittagong",
      president: "Nabil Hasan",
      gs: "Sumaiya Akter",
      contact: "01812 345678",
      email: "cudf@cu.ac.bd"
    },
    {
      clubName: "North South University Debate Club",
      university: "North South University",
      president: "Zarin Tasnim",
      gs: "Rayhan Chowdhury",
      contact: "01987 654321",
      email: "debateclub@northsouth.edu"
    },
    {
      clubName: "BRAC University Debate Society",
      university: "BRAC University",
      president: "Tahsin Alam",
      gs: "Nusrat Jahan",
      contact: "01678 912345",
      email: "brac.debate@bracu.ac.bd"
    }
  ];

  const socialMedia = [
    { platform: "Facebook", icon: <FaFacebook />, link: "https://facebook.com", color: "bg-blue-600 hover:bg-blue-700" },
    { platform: "Twitter", icon: <FaTwitter />, link: "https://twitter.com", color: "bg-sky-500 hover:bg-sky-600" },
    { platform: "Instagram", icon: <FaInstagram />, link: "https://instagram.com", color: "bg-pink-600 hover:bg-pink-700" },
    { platform: "YouTube", icon: <FaYoutube />, link: "https://youtube.com", color: "bg-red-600 hover:bg-red-700" }
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
              Get in touch with Bangladesh Debate Federation. Whether you have questions about 
              events, want to partner with us, or need support, we're here to help.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="mailto:info@debatefederation.org"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center border border-emerald-700 hover:shadow-xl hover:-translate-y-1"
              >
                <FaEnvelope className="mr-2" /> Email Us
              </a>
              <a 
                href="tel:01719142953"
                className="bg-white hover:bg-emerald-50 text-emerald-700 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center border border-emerald-300 hover:shadow-xl hover:-translate-y-1"
              >
                <FaPhone className="mr-2" /> Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-12 md:py-16 lg:py-20 bg-emerald-50 border-y border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-900 mb-6">
                Send Us a Message
              </h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center">
                    <FaCheckCircle className="text-green-600 text-2xl mr-3" />
                    <div>
                      <h3 className="text-green-800 font-bold text-lg">Message Sent Successfully!</h3>
                      <p className="text-green-700">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300 ${
                          errors.name ? 'border-red-300' : 'border-emerald-200'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-red-600 text-sm mt-1 flex items-center">
                          <FaExclamationCircle className="mr-1" /> {errors.name}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300 ${
                          errors.email ? 'border-red-300' : 'border-emerald-200'
                        }`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <p className="text-red-600 text-sm mt-1 flex items-center">
                          <FaExclamationCircle className="mr-1" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="subject">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300 ${
                          errors.subject ? 'border-red-300' : 'border-emerald-200'
                        }`}
                        placeholder="What is this regarding?"
                      />
                      {errors.subject && (
                        <p className="text-red-600 text-sm mt-1 flex items-center">
                          <FaExclamationCircle className="mr-1" /> {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="6"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-300 resize-none ${
                        errors.message ? 'border-red-300' : 'border-emerald-200'
                      }`}
                      placeholder="Please type your message here..."
                    ></textarea>
                    {errors.message && (
                      <p className="text-red-600 text-sm mt-1 flex items-center">
                        <FaExclamationCircle className="mr-1" /> {errors.message}
                      </p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center w-full border border-emerald-700 hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
            
            {/* Map and Social Media */}
            <div>
              {/* Google Maps Embed */}
              <div className="bg-white rounded-xl border border-emerald-100 overflow-hidden mb-8">
                <div className="h-64 md:h-96">
                  <iframe
                    title="Mohammadia Housing Society Location"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.900152110987!2d90.35597247605306!3d23.754855189034535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf4f2b9e4613%3A0x1c01e6f8e6f8e6f8!2sHouse%20128%2C%20Road%204%2C%20Mohammadia%20Housing%20Society%2C%20Mohammadpur%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1645587654321!5m2!1sen!2sbd"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-emerald-900 mb-2">
                    <FaMapMarkerAlt className="inline mr-2" />
                    Find Our Office
                  </h3>
                  <p className="text-gray-600 mb-3">
                    House: 128, Road: 04, Mohammadia Housing Society, Mohammadpur, Dhaka
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://maps.app.goo.gl/BHQCH371Ur6tSSAF7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center text-sm border border-emerald-700 hover:shadow-md"
                    >
                      <FaMapMarkerAlt className="mr-2" /> Get Directions
                    </a>
                    <a
                      href="tel:01719142953"
                      className="bg-white hover:bg-emerald-50 text-emerald-700 font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center text-sm border border-emerald-300 hover:shadow-md"
                    >
                      <FaPhone className="mr-2" /> Call for Directions
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Social Media - Commented out as per original */}
              {/* <div className="bg-white rounded-xl border border-emerald-100 p-6">
                <h3 className="text-lg font-bold text-emerald-900 mb-4">Connect With Us</h3>
                <p className="text-gray-600 mb-6">
                  Follow us on social media for the latest updates, event announcements, 
                  and debate tips.
                </p>
                <div className="flex flex-wrap gap-3">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} text-white w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110`}
                      title={social.platform}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Grid */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-xl border border-emerald-100 p-6 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <div className={`${info.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold text-emerald-900 mb-3">{info.title}</h3>
                <p className="text-gray-600 whitespace-pre-line">{info.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Debate Club Directory - Commented out as per original */}
      {/* <section className="py-12 md:py-16 lg:py-20 bg-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
              Debate Club Directory
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Connect with debate clubs from universities across Bangladesh
            </p>
          </div>
          
          <div className="overflow-x-auto rounded-xl border border-emerald-100 bg-white">
            <table className="min-w-full divide-y divide-emerald-100">
              <thead className="bg-emerald-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-emerald-900 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaIdCard className="mr-2" /> Club Name
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-emerald-900 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaUniversity className="mr-2" /> University
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
                  <th scope="col" className="px-6 py-4 text-left text-sm font-bold text-emerald-900 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaPhone className="mr-2" /> Contact
                    </div>
                  </th>
                  <th scope="col" className="px-6-8 py-4 text-left text-sm font-bold text-emerald-900 uppercase tracking-wider">
                    <div className="flex items-center">
                      <FaEnvelope className="mr-2" /> Email
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {debateClubs.map((club, index) => (
                  <tr key={index} className="hover:bg-emerald-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-emerald-900">{club.clubName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-700">{club.university}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-700">{club.president}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-700">{club.gs}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href={`tel:${club.contact}`} className="text-emerald-600 hover:text-emerald-800 hover:underline">
                        {club.contact}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href={`mailto:${club.email}`} className="text-emerald-600 hover:text-emerald-800 hover:underline truncate block max-w-xs">
                        {club.email}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section> */}

      {/* Department Contacts - Commented out as per original */}
      {/* <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4">
              Contact Specific Departments
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              For faster response, contact the appropriate department directly
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white rounded-xl border border-emerald-100 p-6 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <h3 className="text-xl font-bold text-emerald-900 mb-3">{dept.name}</h3>
                <p className="text-gray-600 mb-4">{dept.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <FaEnvelope className="text-emerald-600 mr-3" />
                    <a href={`mailto:${dept.email}`} className="hover:text-emerald-700 hover:underline">
                      {dept.email}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaPhone className="text-emerald-600 mr-3" />
                    <a href={`tel:${dept.phone.replace(/[^+\d]/g, '')}`} className="hover:text-emerald-700 hover:underline">
                      {dept.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Contact;