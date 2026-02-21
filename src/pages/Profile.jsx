import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaUserCircle, FaEnvelope, FaPhone,
  FaUniversity, FaShieldAlt, FaPen, FaSignOutAlt
} from 'react-icons/fa';

const Profile = () => {
  const { user, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  if (!user) return null;

  const statusColor = {
    active:   'bg-emerald-100 text-emerald-700',
    pending:  'bg-yellow-100  text-yellow-700',
    rejected: 'bg-red-100     text-red-700',
    banned:   'bg-gray-100    text-gray-500',
  }[user.status] ?? 'bg-gray-100 text-gray-500';

  const fields = [
    { icon: <FaUserCircle />, label: 'Full Name',   value: user.full_name },
    { icon: <FaEnvelope   />, label: 'Email',       value: user.email },
    { icon: <FaPhone      />, label: 'Phone',       value: user.phone       ?? '—' },
    { icon: <FaUniversity />, label: 'Institution', value: user.institution ?? '—' },
  ];

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">

        {/* ── Left Sidebar ── */}
        <aside className="w-full md:w-60 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Avatar block */}
            <div className="bg-emerald-600 px-6 py-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-3">
                <FaUserCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-white font-bold text-sm leading-tight">{user.full_name}</h2>
              <p className="text-emerald-100 text-xs mt-1 truncate">{user.email}</p>
              <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColor}`}>
                {user.status}
              </span>
            </div>

            {/* Nav links */}
            <nav className="p-3 space-y-1">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <FaUserCircle className="w-4 h-4 flex-shrink-0" />
                My Profile
              </NavLink>

              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <FaPen className="w-4 h-4 flex-shrink-0" />
                Write Blog
              </NavLink>
            </nav>

            {/* Logout */}
            <div className="p-3 border-t border-gray-100">
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <FaSignOutAlt className="w-4 h-4 flex-shrink-0" />
                {loggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>

          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">

            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-50">
              <h1 className="text-base font-bold text-gray-900">Profile Information</h1>
              <p className="text-xs text-gray-400 mt-0.5">Your personal details</p>
            </div>

            {/* Fields */}
            <div className="divide-y divide-gray-50">
              {fields.map(({ icon, label, value, capitalize }) => (
                <div key={label} className="flex items-center gap-4 px-6 py-4">
                  <span className="text-emerald-500 flex-shrink-0 w-4">{icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className={`text-sm font-medium text-gray-800 truncate mt-0.5 ${capitalize ? 'capitalize' : ''}`}>
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>

      </div>
    </div>
  );
};

export default Profile;