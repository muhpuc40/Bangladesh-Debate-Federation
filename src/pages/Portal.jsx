import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUserCircle, 
  FaCalendarAlt, 
  FaTrophy, 
  FaBook,
  FaCreditCard,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaChartLine,
  FaUsers,
  FaCertificate,
  FaArrowRight,
  FaEdit,
  FaHistory,
  FaFileAlt,
  FaQuestionCircle
} from 'react-icons/fa';

const Portal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState({
    name: "Tasnim Rahman",
    email: "tasnim@example.com",
    role: "Premium Member",
    institution: "Dhaka University",
    memberSince: "January 2022",
    points: 2450,
    level: "Gold",
    nextLevel: "Platinum",
    progress: 75
  });

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaChartLine /> },
    { id: 'events', label: 'My Events', icon: <FaCalendarAlt /> },
    { id: 'achievements', label: 'Achievements', icon: <FaTrophy /> },
    { id: 'resources', label: 'Resources', icon: <FaBook /> },
    { id: 'profile', label: 'Profile', icon: <FaUserCircle /> },
    { id: 'billing', label: 'Billing', icon: <FaCreditCard /> },
    { id: 'settings', label: 'Settings', icon: <FaCog /> }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "National Debate Festival 2024",
      date: "March 15-20, 2024",
      status: "Registered",
      type: "Competition",
      team: "Dhaka University A"
    },
    {
      id: 2,
      title: "Advanced Adjudication Workshop",
      date: "March 25, 2024",
      status: "Confirmed",
      type: "Training",
      location: "Online"
    },
    {
      id: 3,
      title: "Regional Qualifier Round",
      date: "April 5, 2024",
      status: "Pending Payment",
      type: "Competition",
      team: "Dhaka University A"
    }
  ];

  const achievements = [
    {
      title: "National Champion 2023",
      description: "Winner of National Debate Festival",
      date: "December 2023",
      icon: "🏆",
      color: "bg-yellow-100 text-yellow-800"
    },
    {
      title: "Best Speaker Award",
      description: "Top speaker in 5 consecutive tournaments",
      date: "November 2023",
      icon: "🎤",
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Certified Adjudicator",
      description: "Completed adjudicator certification program",
      date: "October 2023",
      icon: "⚖️",
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Community Leader",
      description: "Mentored 50+ beginner debaters",
      date: "September 2023",
      icon: "👥",
      color: "bg-purple-100 text-purple-800"
    }
  ];

  const stats = [
    { label: "Events Attended", value: "24", change: "+5", icon: <FaCalendarAlt /> },
    { label: "Wins", value: "18", change: "+3", icon: <FaTrophy /> },
    { label: "Debate Points", value: "2,450", change: "+150", icon: <FaChartLine /> },
    { label: "Team Members", value: "3", change: "", icon: <FaUsers /> }
  ];

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-justify">Welcome back, {user.name}!</h2>
            <p className="opacity-90 text-justify">Your debate journey continues. Check out your latest updates below.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center">
              <div className="bg-emerald-800 px-4 py-2 rounded-lg mr-4">
                <div className="text-sm opacity-90 text-justify">Current Level</div>
                <div className="text-xl font-bold text-justify">{user.level}</div>
              </div>
              <div>
                <div className="text-sm opacity-90 text-justify">Points</div>
                <div className="text-2xl font-bold text-justify">{user.points.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-emerald-100 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-100 text-emerald-600 p-3 rounded-lg">
                {stat.icon}
              </div>
              {stat.change && (
                <span className="text-green-600 font-bold text-sm text-justify">↑ {stat.change}</span>
              )}
            </div>
            <div className="text-3xl font-bold text-emerald-900 mb-1 text-justify">{stat.value}</div>
            <div className="text-gray-600 text-justify">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Progress to Next Level */}
      <div className="bg-white rounded-xl border border-emerald-100 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-emerald-900 text-justify">Progress to {user.nextLevel} Level</h3>
          <span className="text-emerald-600 font-bold text-justify">{user.progress}%</span>
        </div>
        <div className="w-full bg-emerald-100 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${user.progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span className="text-justify">{user.points} points</span>
          <span className="text-justify">3,000 points needed for {user.nextLevel}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Events */}
        <div className="bg-white rounded-xl border border-emerald-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-emerald-900 text-justify">Upcoming Events</h3>
            <Link to="/events" className="text-emerald-600 hover:text-emerald-800 font-bold text-sm flex items-center justify-start">
              <span className="text-justify">View All</span> <FaArrowRight className="ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {upcomingEvents.map(event => (
              <div key={event.id} className="flex items-center justify-between p-4 border border-emerald-100 rounded-lg hover:bg-emerald-50 transition-all duration-300">
                <div>
                  <div className="flex items-center mb-1">
                    <span className={`px-2 py-1 rounded text-xs font-bold mr-2 ${
                      event.status === 'Registered' ? 'bg-green-100 text-green-800' :
                      event.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      <span className="text-justify">{event.status}</span>
                    </span>
                    <span className="text-xs text-gray-500 text-justify">{event.type}</span>
                  </div>
                  <h4 className="font-bold text-emerald-900 text-justify">{event.title}</h4>
                  <div className="text-sm text-gray-600 text-justify">{event.date} • {event.team || event.location}</div>
                </div>
                <button className="text-emerald-600 hover:text-emerald-800">
                  <FaArrowRight />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-xl border border-emerald-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-emerald-900 text-justify">Recent Achievements</h3>
            <Link to="/achievements" className="text-emerald-600 hover:text-emerald-800 font-bold text-sm flex items-center justify-start">
              <span className="text-justify">View All</span> <FaArrowRight className="ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center p-4 border border-emerald-100 rounded-lg hover:bg-emerald-50 transition-all duration-300">
                <div className={`text-2xl w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${achievement.color}`}>
                  {achievement.icon}
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900 text-justify">{achievement.title}</h4>
                  <p className="text-sm text-gray-600 text-justify">{achievement.description}</p>
                  <div className="text-xs text-gray-500 mt-1 text-justify">{achievement.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-emerald-100 p-6">
        <h3 className="text-xl font-bold text-emerald-900 mb-6 text-justify">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Register for Event", icon: <FaCalendarAlt />, color: "bg-blue-100 text-blue-600", link: "/events" },
            { label: "Download Certificate", icon: <FaCertificate />, color: "bg-green-100 text-green-600", link: "/certificates" },
            { label: "View Resources", icon: <FaBook />, color: "bg-purple-100 text-purple-600", link: "/resources" },
            { label: "Update Profile", icon: <FaEdit />, color: "bg-orange-100 text-orange-600", link: "#profile" }
          ].map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className={`${action.color} rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center text-center`}
            >
              <div className="text-2xl mb-2">{action.icon}</div>
              <div className="font-bold text-justify">{action.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center">
          <div className="relative mb-6 md:mb-0 md:mr-8">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-emerald-800 hover:bg-emerald-900 text-white p-2 rounded-full border-2 border-white">
              <FaEdit />
            </button>
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2 text-justify">{user.name}</h2>
            <div className="flex items-center justify-center md:justify-start mb-4">
              <span className="bg-emerald-800 px-3 py-1 rounded-full text-sm mr-3 text-justify">{user.role}</span>
              <span className="bg-emerald-800 px-3 py-1 rounded-full text-sm text-justify">{user.level} Level</span>
            </div>
            <p className="opacity-90">
              <span className="block text-justify">📧 {user.email}</span>
              <span className="block text-justify">🏫 {user.institution}</span>
              <span className="block text-justify">📅 Member since {user.memberSince}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-emerald-100 p-6">
            <h3 className="text-xl font-bold text-emerald-900 mb-6 text-justify">Personal Information</h3>
            <div className="space-y-4">
              {[
                { label: "Full Name", value: user.name, editable: true },
                { label: "Email Address", value: user.email, editable: true },
                { label: "Phone Number", value: "+880 1XXX XXX XXX", editable: true },
                { label: "Date of Birth", value: "January 15, 2000", editable: true },
                { label: "Gender", value: "Female", editable: true }
              ].map((field, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-emerald-50">
                  <div>
                    <div className="text-sm text-gray-500 text-justify">{field.label}</div>
                    <div className="font-medium text-emerald-900 text-justify">{field.value}</div>
                  </div>
                  {field.editable && (
                    <button className="text-emerald-600 hover:text-emerald-800">
                      <FaEdit />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Debate Information */}
          <div className="bg-white rounded-xl border border-emerald-100 p-6">
            <h3 className="text-xl font-bold text-emerald-900 mb-6 text-justify">Debate Information</h3>
            <div className="space-y-4">
              {[
                { label: "Primary Debate Format", value: "British Parliamentary", editable: true },
                { label: "Preferred Role", value: "Speaker & Adjudicator", editable: true },
                { label: "Experience Level", value: "Advanced (5 years)", editable: false },
                { label: "Team Affiliation", value: user.institution + " Debate Club", editable: false },
                { label: "Specializations", value: "Policy, Economics, International Relations", editable: true }
              ].map((field, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-emerald-50">
                  <div>
                    <div className="text-sm text-gray-500 text-justify">{field.label}</div>
                    <div className="font-medium text-emerald-900 text-justify">{field.value}</div>
                  </div>
                  {field.editable && (
                    <button className="text-emerald-600 hover:text-emerald-800">
                      <FaEdit />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Membership Card */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-sm opacity-90 text-justify">Membership ID</div>
                <div className="text-xl font-bold text-justify">BDF-2022-0456</div>
              </div>
              <FaCertificate className="text-3xl opacity-80" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="opacity-90 text-justify">Level</span>
                <span className="font-bold text-justify">{user.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90 text-justify">Valid Until</span>
                <span className="font-bold text-justify">Dec 31, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-90 text-justify">Status</span>
                <span className="font-bold text-emerald-300 text-justify">Active</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-lg transition-all duration-300">
              <span className="text-justify">Renew Membership</span>
            </button>
          </div>

          {/* Badges */}
          <div className="bg-white rounded-xl border border-emerald-100 p-6">
            <h3 className="text-xl font-bold text-emerald-900 mb-6 text-justify">Badges</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { emoji: "🏆", label: "Champion" },
                { emoji: "🎤", label: "Speaker" },
                { emoji: "⚖️", label: "Judge" },
                { emoji: "👥", label: "Mentor" },
                { emoji: "📚", label: "Scholar" },
                { emoji: "🌟", label: "Star" }
              ].map((badge, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-1">{badge.emoji}</div>
                  <div className="text-xs text-gray-600 text-justify">{badge.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-emerald-900 text-justify">My Events</h2>
          <p className="text-gray-600 text-justify">Manage your event registrations and participation</p>
        </div>
        <Link 
          to="/events" 
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center"
        >
          <FaCalendarAlt className="mr-2" /> <span className="text-justify">Browse Events</span>
        </Link>
      </div>

      {/* Event Tabs */}
      <div className="flex border-b border-emerald-100">
        {['Upcoming', 'Past', 'Registered', 'Waitlisted'].map(tab => (
          <button
            key={tab}
            className={`px-6 py-4 font-medium transition-all duration-300 ${
              tab === 'Upcoming' 
                ? 'border-b-2 border-emerald-600 text-emerald-900' 
                : 'text-gray-600 hover:text-emerald-700'
            }`}
          >
            <span className="text-justify">{tab}</span>
          </button>
        ))}
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-xl border border-emerald-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-emerald-50">
              <tr>
                <th className="py-4 px-6 text-left font-bold text-emerald-900 text-justify">Event</th>
                <th className="py-4 px-6 text-left font-bold text-emerald-900 text-justify">Date</th>
                <th className="py-4 px-6 text-left font-bold text-emerald-900 text-justify">Type</th>
                <th className="py-4 px-6 text-left font-bold text-emerald-900 text-justify">Status</th>
                <th className="py-4 px-6 text-left font-bold text-emerald-900 text-justify">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                ...upcomingEvents,
                {
                  id: 4,
                  title: "Beginners Workshop",
                  date: "Feb 15, 2024",
                  status: "Completed",
                  type: "Training",
                  result: "Certificate Issued"
                },
                {
                  id: 5,
                  title: "Regional Championship",
                  date: "Jan 28, 2024",
                  status: "Completed",
                  type: "Competition",
                  result: "Runner-up"
                }
              ].map(event => (
                <tr key={event.id} className="border-b border-emerald-50 hover:bg-emerald-50 transition-colors duration-300">
                  <td className="py-4 px-6">
                    <div className="font-bold text-emerald-900 text-justify">{event.title}</div>
                    <div className="text-sm text-gray-600 text-justify">{event.team || event.result}</div>
                  </td>
                  <td className="py-4 px-6 text-justify">{event.date}</td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 text-justify">
                      {event.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      event.status === 'Registered' || event.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      event.status === 'Completed' ? 'bg-gray-100 text-gray-800' :
                      event.status === 'Pending Payment' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      <span className="text-justify">{event.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button className="text-emerald-600 hover:text-emerald-800" title="View Details">
                        <FaArrowRight />
                      </button>
                      {event.status === 'Pending Payment' && (
                        <button className="text-green-600 hover:text-green-800" title="Complete Payment">
                          <FaCreditCard />
                        </button>
                      )}
                      {event.status === 'Completed' && (
                        <button className="text-blue-600 hover:text-blue-800" title="Download Certificate">
                          <FaCertificate />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'profile': return renderProfile();
      case 'events': return renderEvents();
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-emerald-100 p-6 mb-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-emerald-900 text-justify">{user.name}</div>
                  <div className="text-sm text-emerald-600 text-justify">{user.role}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-emerald-50 text-emerald-900 font-bold'
                        : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    <span className="text-justify">{tab.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-emerald-100">
                <button className="w-full flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-300">
                  <FaSignOutAlt className="mr-3" />
                  <span className="text-justify">Logout</span>
                </button>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-6 text-white">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-justify">{user.points.toLocaleString()}</div>
                <div className="opacity-90 text-justify">Debate Points</div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-justify">Level</span>
                  <span className="font-bold text-justify">{user.level}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-justify">Rank</span>
                  <span className="font-bold text-justify">#42</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-justify">Events</span>
                  <span className="font-bold text-justify">24</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="bg-white rounded-xl border border-emerald-100 p-6 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-emerald-900 text-justify">
                    {tabs.find(t => t.id === activeTab)?.label || 'Dashboard'}
                  </h1>
                  <p className="text-gray-600 text-justify">
                    Welcome to your member portal
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="relative text-gray-600 hover:text-emerald-600">
                    <FaBell className="text-xl" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      3
                    </span>
                  </button>
                  <button className="text-emerald-600 hover:text-emerald-800 font-bold flex items-center">
                    <FaQuestionCircle className="mr-2" /> <span className="text-justify">Help</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Content Area */}
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portal;