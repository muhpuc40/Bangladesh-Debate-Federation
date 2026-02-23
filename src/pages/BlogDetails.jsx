import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FaUserCircle, FaClock, FaArrowLeft, FaShareAlt,
  FaEnvelope, FaCalendarAlt, FaUniversity, FaNewspaper,
  FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaCopy
} from 'react-icons/fa';
import apiService from '../services/apiService';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareMenuRef = useRef(null);

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target)) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchBlogDetails = async () => {
    try {
      setLoading(true);
      const data = await apiService.getBlogById(id);
      setBlogData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching blog details:', err);
      setError('Failed to load blog. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareMenu(!showShareMenu);
  };

const shareToSocial = async (platform) => {
    const url = window.location.href;
    const title = encodeURIComponent(blogData.blog.title);

    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${title}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${title}%20${encodeURIComponent(url)}`;
        break;
      case 'copy':
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(url);
          } else {
            // Fallback method
            const textArea = document.createElement("textarea");
            textArea.value = url;
            textArea.style.position = "fixed"; // Avoid scrolling to bottom
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
          }

         
        } catch (err) {
          console.error("Copy failed", err);
          alert("Failed to copy link.");
        }

        setShowShareMenu(false);
        return;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-emerald-600 border-r-transparent"></div>
          <p className="mt-4 text-emerald-800 font-medium">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (error || !blogData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-md max-w-md">
          <div className="text-red-500 text-5xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Blog Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The blog you\'re looking for doesn\'t exist.'}</p>
          <button
            onClick={() => navigate('/all-blogs')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  const { blog, author, more_from_author } = blogData;

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/all-blogs')}
          className="flex items-center text-emerald-600 hover:text-emerald-700 mb-4 md:mb-6 transition-colors pt-2 md:pt-10"
        >
          <FaArrowLeft className="mr-2" /> Back to All Blogs
        </button>

        {/* Main Content with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Blog Content */}
          <div className="lg:w-2/3">
            <article className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Blog Header */}
              <div className="p-4 md:p-8">
                <div className="flex items-start justify-between mb-4 md:mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                      <FaUserCircle className="w-8 h-8 md:w-10 md:h-10" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-base md:text-lg">{blog.author}</h3>
                      <div className="flex items-center text-xs md:text-sm text-gray-500">
                        <FaClock className="mr-1 text-xs" />
                        <span>{formatDate(blog.created_at)}</span>
                        <span className="mx-2">•</span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          Published
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Share Button with Dropdown */}
                  <div className="relative" ref={shareMenuRef}>
                    <button
                      onClick={handleShare}
                      className="text-gray-400 hover:text-emerald-600 transition-colors p-2 hover:bg-gray-100 rounded-full focus:outline-none"
                      title="Share"
                      type="button"
                    >
                      <FaShareAlt className="text-lg md:text-xl" />
                    </button>

                    {/* Share Dropdown */}
                    {showShareMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
                        <div className="py-2">
                          <button
                            onClick={() => shareToSocial('facebook')}
                            className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center space-x-3 focus:outline-none"
                            type="button"
                          >
                            <FaFacebook className="text-blue-600 text-lg" />
                            <span className="text-sm text-gray-700">Facebook</span>
                          </button>
                          <button
                            onClick={() => shareToSocial('twitter')}
                            className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center space-x-3 focus:outline-none"
                            type="button"
                          >
                            <FaTwitter className="text-sky-500 text-lg" />
                            <span className="text-sm text-gray-700">Twitter</span>
                          </button>
                          <button
                            onClick={() => shareToSocial('linkedin')}
                            className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center space-x-3 focus:outline-none"
                            type="button"
                          >
                            <FaLinkedin className="text-blue-700 text-lg" />
                            <span className="text-sm text-gray-700">LinkedIn</span>
                          </button>
                          <button
                            onClick={() => shareToSocial('whatsapp')}
                            className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center space-x-3 focus:outline-none"
                            type="button"
                          >
                            <FaWhatsapp className="text-green-500 text-lg" />
                            <span className="text-sm text-gray-700">WhatsApp</span>
                          </button>
                          <div className="border-t border-gray-100 my-1"></div>
                          <button
                            onClick={() => shareToSocial('copy')}
                            className="w-full px-4 py-2.5 text-left hover:bg-gray-50 flex items-center space-x-3 focus:outline-none"
                            type="button"
                          >
                            <FaCopy className="text-gray-600 text-lg" />
                            <span className="text-sm text-gray-700">Copy Link</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Blog Title */}
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                  {blog.title}
                </h1>

                {/* Blog Image */}
                {blog.image && (
                  <div className="mb-6 md:mb-8 rounded-lg overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full max-h-96 object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Available';
                      }}
                    />
                  </div>
                )}

                {/* Blog Content */}
                <div className="prose prose-sm md:prose-lg max-w-none mb-6 md:mb-8">
                  {blog.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          </div>

          {/* Right Column - Author Info Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24 space-y-6">
              {/* Author Card */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    About the Author
                  </h3>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                      <FaUserCircle className="w-12 h-12" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{author.full_name}</h4>
                      <p className="text-sm text-gray-500">Blog Author</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <FaEnvelope className="mr-3 text-emerald-600 shrink-0" />
                      <span className="text-sm truncate">{author.email}</span>
                    </div>

                    {author.institution && (
                      <div className="flex items-center text-gray-600">
                        <FaUniversity className="mr-3 text-emerald-600 shrink-0" />
                        <span className="text-sm">{author.institution}</span>
                      </div>
                    )}

                    <div className="flex items-center text-gray-600">
                      <FaNewspaper className="mr-3 text-emerald-600 shrink-0" />
                      <span className="text-sm">Total Blogs: {author.total_blogs}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <FaCalendarAlt className="mr-3 text-emerald-600 shrink-0" />
                      <span className="text-sm">Member since {new Date().getFullYear()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* More from this author */}
              {more_from_author && more_from_author.length > 0 && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4">
                    <h3 className="text-lg font-semibold text-white">
                      More from {author.full_name.split(' ')[0]}
                    </h3>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      {more_from_author.map((otherBlog) => (
                        <Link
                          key={otherBlog.id}
                          to={`/blog-details/${otherBlog.id}`}
                          className="block group"
                        >
                          <div className="flex gap-3 border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                            {/* Mini Image */}
                            <div className="shrink-0">
                              {otherBlog.image ? (
                                <img
                                  src={otherBlog.image}
                                  alt={otherBlog.title}
                                  className="w-16 h-16 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                                  }}
                                />
                              ) : (
                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                  <FaNewspaper className="text-gray-400 text-2xl" />
                                </div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2 text-sm mb-1">
                                {otherBlog.title}
                              </h4>
                              <div className="flex items-center text-xs text-gray-500">
                                <FaClock className="mr-1 shrink-0" />
                                <span className="truncate">{formatDate(otherBlog.created_at)}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {author.total_blogs > 5 && (
                      <Link
                        to={`/author/${author.id}/blogs`}
                        className="block text-center mt-4 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        View all {author.total_blogs} blogs →
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;