import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUserCircle, FaClock
} from 'react-icons/fa';
import apiService from '../services/apiService';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await apiService.getBlogs();
      setBlogs(data);
      setError(null);
    } catch {
      setError('Failed to load blogs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getRelativeTime = (dateString) => {
    if (!dateString) return 'Recently';

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return 'Recently';

    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 0) return 'Just now';
    if (diff < 5) return 'Just now';
    if (diff < 60) return `${diff} second${diff === 1 ? '' : 's'} ago`;

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;

    const hours = Math.floor(diff / 3600);
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

    const days = Math.floor(diff / 86400);
    if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;

    const months = Math.floor(diff / 2592000);
    if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;

    const years = Math.floor(diff / 31536000);
    return `${years} year${years === 1 ? '' : 's'} ago`;
  };

  /* ── LEFT PANEL ── */
  const LeftPanel = () => (
    <div
      className="hidden lg:flex flex-col items-center justify-center border-r border-gray-200 bg-gray-50 shrink-0"
      style={{ width: '33.333%', position: 'sticky', top: 0, alignSelf: 'flex-start', height: '100vh' }}
    >
      <h1 className="text-4xl font-bold text-emerald-900 whitespace-nowrap select-none">
        All Blogs
      </h1>
      <div className="mt-6">
        <Link
          to="/blog"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Write a Blog
        </Link>
      </div>
    </div>
  );

  /* ── BLOG CARDS ── */
  const BlogList = () => (
    <div className="space-y-6 md:pt-10">
      {blogs.map((blog) => (
        <article
          key={blog.id}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
        >
          <div className="p-6">

            {/* Author row */}
            <div className="flex items-center space-x-3 mb-4">
              <FaUserCircle className="w-10 h-10 text-emerald-600 shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">{blog.author}</h3>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <FaClock className="text-xs" />
                  <span>{getRelativeTime(blog.created_at)}</span>
                  <span className="mx-1">•</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Published
                  </span>
                </div>
              </div>
            </div>

            {/* Blog title */}
            <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-emerald-700 transition-colors">
              <Link to={`/blog-details/${blog.id}`}>{blog.title}</Link>
            </h2>

            {/* Content preview */}
            <p className="text-gray-600 mb-4 line-clamp-3">
              {blog.content.replace(/<[^>]*>/g, '').substring(0, 180)}...
            </p>

            {/* Image */}
            {blog.image && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Available'; }}
                />
              </div>
            )}

            {/* Read more */}
            <div className="text-right">
              <Link to={`/blog-details/${blog.id}`} className="text-emerald-600 hover:text-emerald-700 font-medium">
                Read full article →
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );

  /* ── LOADING ── */
  if (loading) return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
  );

  /* ── ERROR ── */
  if (error) return (
    <div className="flex min-h-screen bg-gray-50">
      <LeftPanel />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md">
          <div className="text-red-500 text-5xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={fetchBlogs} className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
            Try Again
          </button>
        </div>
      </div>
    </div>
  );

  /* ── EMPTY ── */
  if (blogs.length === 0) return (
    <div className="flex min-h-screen bg-gray-50">
      <LeftPanel />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-emerald-900 mb-2">No Blogs Yet</h2>
          <p className="text-gray-600 mb-6">Be the first to share your thoughts!</p>
          <Link to="/blog" className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition-colors inline-block">
            Create Blog
          </Link>
        </div>
      </div>
    </div>
  );

  /* ── MAIN LAYOUT ── */
  return (
    <div className="flex items-start bg-gray-50">

      {/* LEFT — sticky, col-4 */}
      <LeftPanel />

      {/* RIGHT — scrollable blog feed, col-8, cards aligned to left */}
      <div className="flex-1 py-10 pl-8 pr-4 min-h-screen" style={{ width: '66.666%' }}>

        {/* Mobile header */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-emerald-900">All Blogs</h1>
          <Link to="/blog" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Write a Blog
          </Link>
        </div>

        {/* Blog list - left aligned with reduced width */}
        <div className="w-full max-w-xl">
          <BlogList />
        </div>
      </div>

    </div>
  );
};

export default AllBlogs;