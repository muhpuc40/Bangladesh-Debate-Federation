import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUserCircle, FaClock, FaShareAlt, FaEye,
  FaFacebook, FaLinkedin, FaWhatsapp, FaCopy
} from 'react-icons/fa';
import apiService from '../services/apiService';

// ── Session-based view tracking helpers ──────────────────────────────────────
const SESSION_KEY = 'viewed_blog_ids';

const getViewedBlogs = () => {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || '[]');
  } catch {
    return [];
  }
};

const markBlogViewed = (blogId) => {
  try {
    const viewed = getViewedBlogs();
    if (!viewed.includes(blogId)) {
      viewed.push(blogId);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(viewed));
    }
  } catch {
    // sessionStorage unavailable — silently ignore
  }
};

const hasBlogBeenViewed = (blogId) => {
  return getViewedBlogs().includes(blogId);
};
// ─────────────────────────────────────────────────────────────────────────────

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shareOpen, setShareOpen] = useState(null);
  const shareRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => { fetchBlogs(); }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (shareOpen !== null) {
        const ref = shareRefs.current[shareOpen];
        if (ref && !ref.contains(e.target)) setShareOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [shareOpen]);

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

    const now = Date.now();
    const diff = Math.floor((now - date.getTime()) / 1000);

    if (diff < 30) return 'Just now';
    if (diff < 60) return `${diff} seconds ago`;

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

  // ── Track view then navigate ────────────────────────────────────────────────
  const handleReadArticle = async (e, blog) => {
    e.preventDefault();

    if (hasBlogBeenViewed(blog.id)) {
      navigate(`/blog-details/${blog.id}`);
      return;
    }

    try {
      await apiService.trackBlogView(blog.id);
      markBlogViewed(blog.id);
    } catch {
      markBlogViewed(blog.id);
    }

    navigate(`/blog-details/${blog.id}`);
  };
  // ───────────────────────────────────────────────────────────────────────────

  const handleShare = (blogId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setShareOpen(shareOpen === blogId ? null : blogId);
  };

  const shareToSocial = async (platform, blog, e) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/blog-details/${blog.id}`;
    const title = encodeURIComponent(blog.title);
    let shareUrl = '';
    setShareOpen(null);

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${title}%20${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank', 'width=600,height=400');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
        } catch {
          const textArea = document.createElement('textarea');
          textArea.value = url;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          try {
            document.execCommand('copy');
          } catch (fallbackErr) {
            console.error('Copy failed', fallbackErr);
            alert('Failed to copy link. Please copy manually.');
          }
          document.body.removeChild(textArea);
        }
        return;
      default:
        return;
    }
  };

  const shareItems = [
    { key: 'facebook', Icon: FaFacebook, iconClass: 'text-blue-600', label: 'Facebook' },
    { key: 'linkedin', Icon: FaLinkedin, iconClass: 'text-blue-700', label: 'LinkedIn' },
    { key: 'whatsapp', Icon: FaWhatsapp, iconClass: 'text-green-500', label: 'WhatsApp' },
    { key: 'copy', Icon: FaCopy, iconClass: 'text-gray-600', label: 'Copy Link' },
  ];

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
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100"
          style={{ overflow: 'visible' }}
        >
          <div className="flex flex-col md:flex-row">
            {/* Left side - Content */}
            <div className="flex-1 p-6 flex flex-col h-full">
              {/* Author row */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <FaUserCircle className="w-10 h-10 text-emerald-600 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{blog.author}</h3>
                    <div className="text-sm text-gray-500 flex items-center gap-1 flex-wrap">
                      <FaClock className="text-xs" />
                      <span>{getRelativeTime(blog.created_at)}</span>
                      <span className="mx-1">•</span>
                      <span className="flex items-center gap-1">
                        <FaEye className="text-xs" />
                        <span>{(blog.views || 0).toLocaleString()} views</span>
                      </span>
                      <span className="mx-1">•</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Published
                      </span>
                    </div>
                  </div>
                </div>

                {/* Share button */}
                <div className="relative shrink-0" ref={(el) => (shareRefs.current[blog.id] = el)}>
                  <button
                    onClick={(e) => handleShare(blog.id, e)}
                    className="p-2 text-gray-400 hover:text-emerald-600 transition-colors focus:outline-none"
                    title="Share"
                    type="button"
                  >
                    <FaShareAlt className="text-lg" />
                  </button>

                  {shareOpen === blog.id && (
                    <div
                      className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden"
                      style={{ zIndex: 9999 }}
                    >
                      {shareItems.map(({ key, Icon, iconClass, label }) => (
                        <button
                          key={key}
                          Icon={Icon}
                          onClick={(e) => shareToSocial(key, blog, e)}
                          className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-gray-100 transition-colors focus:outline-none"
                          type="button"
                        >
                          <Icon className={`${iconClass} text-lg shrink-0`} />
                          <span className="text-gray-900 font-medium text-sm">{label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Blog title */}
              <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-emerald-700 transition-colors">
                <a href={`/blog-details/${blog.id}`} onClick={(e) => handleReadArticle(e, blog)}>
                  {blog.title}
                </a>
              </h2>

              {/* Content preview */}
              <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                {blog.content.replace(/<[^>]*>/g, '').substring(0, 180)}...
              </p>

              {/* Read more */}
              <div className="mt-auto">
                <a
                  href={`/blog-details/${blog.id}`}
                  onClick={(e) => handleReadArticle(e, blog)}
                  className="text-emerald-600 hover:text-emerald-700 font-medium inline-block"
                >
                  Read full article →
                </a>
              </div>
            </div>

            {/* Right side - Image */}
            {blog.image && (
              <div className="md:w-64 lg:w-80 shrink-0 rounded-b-xl md:rounded-b-none md:rounded-r-xl overflow-hidden">
                <a
                  href={`/blog-details/${blog.id}`}
                  onClick={(e) => handleReadArticle(e, blog)}
                  className="block w-full h-full"
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full md:h-64 object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Available';
                    }}
                  />
                </a>
              </div>
            )}
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
          <button
            onClick={fetchBlogs}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
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
          <Link
            to="/blog"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition-colors inline-block"
          >
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

      {/* RIGHT — scrollable blog feed */}
      <div className="flex-1 py-10 pl-8 pr-4 min-h-screen" style={{ width: '66.666%' }}>

        {/* Mobile header */}
        <div className="lg:hidden flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-emerald-900">All Blogs</h1>
          <Link
            to="/blog"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Write a Blog
          </Link>
        </div>

        <div className="w-full max-w-4xl">
          <BlogList />
        </div>
      </div>

    </div>
  );
};

export default AllBlogs;