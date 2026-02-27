import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiService from '../services/apiService';
import {
  FaUserCircle, FaPen, FaSignOutAlt,
  FaImage, FaTimes, FaTrash, FaCalendar,
  FaEdit, FaCheck, FaEyeSlash, FaClock,
  FaPlus, FaBlog, FaSync, FaExclamationTriangle
} from 'react-icons/fa';

// ── Sidebar ────────────────────────────────────────────────────────────────────
const Sidebar = ({ user, onLogout, loggingOut }) => {
  const statusColor = {
    active: 'bg-emerald-100 text-emerald-700',
    pending: 'bg-yellow-100  text-yellow-700',
    rejected: 'bg-red-100     text-red-700',
    banned: 'bg-gray-100    text-gray-500',
  }[user?.status] ?? 'bg-gray-100 text-gray-500';

  return (
    <aside className="w-full md:w-60 flex-shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-emerald-600 px-6 py-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-3">
            <FaUserCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-white font-bold text-sm leading-tight">{user?.full_name}</h2>
          <p className="text-emerald-100 text-xs mt-1 truncate">{user?.email}</p>
          <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColor}`}>
            {user?.status}
          </span>
        </div>
        <nav className="p-3 space-y-1">
          <NavLink to="/profile"
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
            }
          >
            <FaUserCircle className="w-4 h-4 flex-shrink-0" /> Profile
          </NavLink>
          <NavLink to="/blog"
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
            }
          >
            <FaPen className="w-4 h-4 flex-shrink-0" /> Blog
          </NavLink>
        </nav>
        <div className="p-3 border-t border-gray-100">
          <button onClick={onLogout} disabled={loggingOut}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            <FaSignOutAlt className="w-4 h-4 flex-shrink-0" />
            {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
    </aside>
  );
};

// ── Status badge ───────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    accepted: { label: 'Accepted', icon: <FaCheck className="w-2.5 h-2.5" />, cls: 'bg-emerald-100 text-emerald-700' },
    pending: { label: 'Pending', icon: <FaClock className="w-2.5 h-2.5" />, cls: 'bg-yellow-100 text-yellow-700' },
    rejected: { label: 'Rejected', icon: <FaEyeSlash className="w-2.5 h-2.5" />, cls: 'bg-red-100 text-red-700' },
  };
  const s = map[status] ?? map.pending;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${s.cls}`}>
      {s.icon} {s.label}
    </span>
  );
};

// ── Delete Confirm Modal ───────────────────────────────────────────────────────
const DeleteModal = ({ blog, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    {/* Backdrop */}
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
    {/* Card */}
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
      {/* Red icon circle */}
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mx-auto mb-4">
        <FaExclamationTriangle className="w-7 h-7 text-red-500" />
      </div>

      <h3 className="text-center text-lg font-bold text-gray-900 mb-1">Delete Post?</h3>
      <p className="text-center text-sm text-gray-500 mb-1">You're about to permanently delete</p>
      <p className="text-center text-sm font-semibold text-gray-800 mb-2 px-4 line-clamp-2">
        "{blog?.title}"
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 active:bg-red-700 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-200"
        >
          <FaTrash className="w-3.5 h-3.5" /> Yes, Delete
        </button>
      </div>
    </div>
  </div>
);

// ── Edit Modal ─────────────────────────────────────────────────────────────────
const EditModal = ({
  editForm, editErrors, editImagePreview, editSubmitting,
  editFileRef, onFormChange, onImageChange, onRemoveImage,
  onSubmit, onCancel
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    {/* Backdrop */}
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
    {/* Card */}
    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 rounded-t-2xl flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-900 flex items-center justify-center shadow-md shadow-blue-200">
            <FaEdit className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">Edit Post</h3>
            <p className="text-xs text-gray-400">Changes will require re-approval</p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <FaTimes className="w-3.5 h-3.5 text-gray-500" />
        </button>
      </div>

      {/* Form body */}
      <form onSubmit={onSubmit} className="p-6 space-y-4">
        {editErrors.general && (
          <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-red-600 text-xs">{editErrors.general}</p>
          </div>
        )}

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
          <input
            name="title" type="text" value={editForm.title}
            onChange={onFormChange} placeholder="Post title..."
            className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all text-gray-900 ${editErrors.title
              ? 'border-red-300 focus:ring-red-100'
              : 'border-gray-200 focus:ring-blue-100 focus:border-blue-400'
              }`}
          />
          {editErrors.title && <p className="mt-1 text-xs text-red-500">{editErrors.title}</p>}
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Content</label>
          <textarea
            name="content" value={editForm.content}
            onChange={onFormChange} rows={5}
            placeholder="Write your content..."
            className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all text-gray-900 resize-none ${editErrors.content
              ? 'border-red-300 focus:ring-red-100'
              : 'border-gray-200 focus:ring-blue-100 focus:border-blue-400'
              }`}
          />
          {editErrors.content && <p className="mt-1 text-xs text-red-500">{editErrors.content}</p>}
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Image <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          {editImagePreview ? (
            <div className="relative inline-block w-full max-w-xs">
              <img src={editImagePreview} alt="Preview"
                className="w-full h-36 object-cover rounded-xl border border-gray-200" />
              <button type="button" onClick={onRemoveImage}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <FaTimes className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => editFileRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50 transition-all w-full justify-center">
              <FaImage className="w-4 h-4" /> Upload new image
            </button>
          )}
          <input ref={editFileRef} type="file"
            accept="image/jpg,image/jpeg,image/png,image/webp"
            onChange={onImageChange} className="hidden" />
        </div>

        {/* Warning notice */}
        <div className="flex items-start gap-2.5 px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl">
          <FaExclamationTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            Saving changes will reset this post to <span className="font-semibold">pending review</span>. It won't be publicly visible until approved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button type="button" onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={editSubmitting}
            className="flex-1 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 disabled:bg-blue-300 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
            {editSubmitting
              ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving...</>
              : <><FaCheck className="w-3.5 h-3.5" /> Save Changes</>}
          </button>
        </div>
      </form>
    </div>
  </div>
);

// ── Main ───────────────────────────────────────────────────────────────────────
const Blog = () => {
  const { user, logout } = useAuth();

  const [loggingOut, setLoggingOut] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Create form
  const [form, setForm] = useState({ title: '', content: '' });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileRef = useRef();

  // Edit modal
  const [editingBlog, setEditingBlog] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', content: '' });
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [editSubmitting, setEditSubmitting] = useState(false);
  const [editErrors, setEditErrors] = useState({});
  const editFileRef = useRef();

  // Delete modal
  const [deletingBlog, setDeletingBlog] = useState(null);

  useEffect(() => { fetchMyBlogs(); }, []);

  const fetchMyBlogs = async (showRefreshing = false) => {
    showRefreshing ? setRefreshing(true) : setLoading(true);
    try {
      const myBlogs = await apiService.getMyBlogs();
      setBlogs((myBlogs || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (error) {
      console.error('Error fetching my blogs:', error);
      setErrors({ general: 'Failed to load your blogs.' });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  // ── Create handlers ──
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };
  const removeImage = () => {
    setImageFile(null); setImagePreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };
  const resetCreateForm = () => {
    setForm({ title: '', content: '' }); removeImage(); setErrors({});
  };
  const toggleCreateForm = () => {
    if (showCreateForm) resetCreateForm();
    setShowCreateForm(!showCreateForm);
  };
  const validateCreate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.content.trim()) e.content = 'Content is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCreate()) return;
    setSubmitting(true); setSuccessMsg('');
    try {
      const payload = new FormData();
      payload.append('title', form.title);
      payload.append('content', form.content);
      if (imageFile) payload.append('image', imageFile);
      const response = await apiService.createBlog(payload);
      setBlogs(prev => [response.blog || response, ...prev]);
      resetCreateForm(); setShowCreateForm(false);
      setSuccessMsg('Blog submitted successfully! It will appear after admin approval.');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setErrors({ general: err.response?.data?.message || 'Failed to post blog.' });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Edit modal handlers ──
  const openEditModal = (blog) => {
    setEditingBlog(blog);
    setEditForm({ title: blog.title, content: blog.content });
    setEditImageFile(null);
    setEditImagePreview(blog.image || null);
    setEditErrors({});
  };
  const closeEditModal = () => {
    setEditingBlog(null);
    setEditForm({ title: '', content: '' });
    setEditImageFile(null); setEditImagePreview(null); setEditErrors({});
    if (editFileRef.current) editFileRef.current.value = '';
  };
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
    if (editErrors[name]) setEditErrors(prev => ({ ...prev, [name]: '' }));
  };
  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setEditImageFile(file);
    setEditImagePreview(URL.createObjectURL(file));
  };
  const removeEditImage = () => {
    setEditImageFile(null); setEditImagePreview(null);
    if (editFileRef.current) editFileRef.current.value = '';
  };
  const validateEdit = () => {
    const e = {};
    if (!editForm.title.trim()) e.title = 'Title is required';
    if (!editForm.content.trim()) e.content = 'Content is required';
    setEditErrors(e);
    return Object.keys(e).length === 0;
  };
  // const handleEditSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateEdit()) return;
  //   setEditSubmitting(true);
  //   try {
  //     const payload = new FormData();
  //     payload.append('title', editForm.title);
  //     payload.append('content', editForm.content);
  //     if (editImageFile) payload.append('image', editImageFile);
  //     payload.append('_method', 'PUT');
  //     const response = await apiService.updateBlog(editingBlog.id, payload);
  //     const updatedBlog = response.blog || response;
  //     setBlogs(prev => prev.map(b => b.id === editingBlog.id ? updatedBlog : b));
  //     closeEditModal();
  //     setSuccessMsg('Blog updated successfully! It will need admin re-approval.');
  //     setTimeout(() => setSuccessMsg(''), 4000);
  //   } catch (err) {
  //     setEditErrors({ general: err.response?.data?.message || 'Failed to update blog.' });
  //   } finally {
  //     setEditSubmitting(false);
  //   }
  // };

  // ── Delete modal handlers ──

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!validateEdit()) return;
    setEditSubmitting(true);
    try {
      const payload = new FormData();
      payload.append('title', editForm.title);
      payload.append('content', editForm.content);
      payload.append('_method', 'PUT');

      if (editImageFile) {
        // New image uploaded
        payload.append('image', editImageFile);
      } else if (!editImagePreview && editingBlog.image) {
        // Image was removed (had one before, now preview is null)
        payload.append('remove_image', '1');
      }

      const response = await apiService.updateBlog(editingBlog.id, payload);
      const updatedBlog = response.blog || response;
      setBlogs(prev => prev.map(b => b.id === editingBlog.id ? updatedBlog : b));
      closeEditModal();
      setSuccessMsg('Blog updated successfully! It will need admin re-approval.');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setEditErrors({ general: err.response?.data?.message || 'Failed to update blog.' });
    } finally {
      setEditSubmitting(false);
    }
  };


  const openDeleteModal = (blog) => setDeletingBlog(blog);
  const closeDeleteModal = () => setDeletingBlog(null);
  const confirmDelete = async () => {
    if (!deletingBlog) return;
    try {
      await apiService.deleteBlog(deletingBlog.id);
      setBlogs(prev => prev.filter(b => b.id !== deletingBlog.id));
      closeDeleteModal();
      setSuccessMsg('Blog deleted successfully.');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch {
      closeDeleteModal();
      alert('Could not delete. Please try again.');
    }
  };

  const handleLogout = async () => { setLoggingOut(true); await logout(); };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">

        <Sidebar user={user} onLogout={handleLogout} loggingOut={loggingOut} />

        <main className="flex-1 space-y-6">

          {/* ── Global messages ── */}
          {successMsg && (
            <div className="px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl">
              <p className="text-emerald-600 text-sm flex items-center gap-2">
                <FaCheck className="w-4 h-4" /> {successMsg}
              </p>
            </div>
          )}
          {errors.general && !showCreateForm && (
            <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}

          {/* ── Header ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div>
                  <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    <FaBlog className="w-4 h-4 text-emerald-600" /> My Blog Posts
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {blogs.length} post{blogs.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                <button onClick={() => fetchMyBlogs(true)} disabled={refreshing}
                  className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Refresh">
                  <FaSync className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <button onClick={toggleCreateForm}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors">
                <FaPlus className="w-3.5 h-3.5" />
                {showCreateForm ? 'Cancel' : 'New Post'}
              </button>
            </div>
          </div>

          {/* ── Create form ── */}
          {showCreateForm && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="px-6 py-5 border-b border-gray-50">
                <h1 className="text-base font-bold text-gray-900">Create New Blog Post</h1>
                <p className="text-xs text-gray-400 mt-0.5">Posts are reviewed before going public</p>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {errors.general && (
                  <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
                    <p className="text-red-600 text-sm">{errors.general}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                  <input name="title" type="text" value={form.title} onChange={handleFormChange}
                    placeholder="Enter blog title..."
                    className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all text-gray-900 placeholder-gray-400 ${errors.title ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-emerald-100 focus:border-emerald-400'}`}
                  />
                  {errors.title && <p className="mt-1.5 text-xs text-red-500">{errors.title}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Content</label>
                  <textarea name="content" value={form.content} onChange={handleFormChange}
                    rows={5} placeholder="Write your blog content here..."
                    className={`w-full px-4 py-2.5 text-sm rounded-xl border bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all text-gray-900 placeholder-gray-400 resize-none ${errors.content ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-emerald-100 focus:border-emerald-400'}`}
                  />
                  {errors.content && <p className="mt-1.5 text-xs text-red-500">{errors.content}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Image <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  {imagePreview ? (
                    <div className="relative inline-block w-full max-w-xs">
                      <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-xl border border-gray-200" />
                      <button type="button" onClick={removeImage}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                        <FaTimes className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => fileRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50 transition-all w-full justify-center">
                      <FaImage className="w-4 h-4" /> Click to upload image
                    </button>
                  )}
                  <input ref={fileRef} type="file" accept="image/jpg,image/jpeg,image/png,image/webp" onChange={handleImageChange} className="hidden" />
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                  {submitting
                    ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Posting...</>
                    : <><FaPen className="w-3.5 h-3.5" /> Publish Post</>}
                </button>
              </form>
            </div>
          )}

          {/* ── Blog list ── */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : blogs.length === 0 ? (
              <div className="py-16 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
                  <FaPen className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">You haven't created any blog posts yet.</p>
              </div>
            ) : (
              <div className="divide-y-2 divide-gray-200">
                {blogs.map(blog => (
                  <div key={blog.id} className="p-6">
                    {blog.image && (
                      <img src={blog.image} alt={blog.title}
                        className="w-full h-48 object-cover rounded-xl mb-4 border border-gray-100" />
                    )}

                    {/* Title row */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-gray-900 leading-tight">{blog.title}</h3>
                        <StatusBadge status={blog.status} />
                      </div>

                      {/* Edit & Delete buttons */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => openEditModal(blog)}
                          className="p-1.5 text-blue-900 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FaEdit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(blog)}
                          className="p-1.5 text-gray-900 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <FaTrash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <FaCalendar className="w-3 h-3" /> {formatDate(blog.created_at)}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                      {blog.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </main>
      </div>

      {/* ── Delete Modal ── */}
      {deletingBlog && (
        <DeleteModal
          blog={deletingBlog}
          onConfirm={confirmDelete}
          onCancel={closeDeleteModal}
        />
      )}

      {/* ── Edit Modal ── */}
      {editingBlog && (
        <EditModal
          editForm={editForm}
          editErrors={editErrors}
          editImagePreview={editImagePreview}
          editSubmitting={editSubmitting}
          editFileRef={editFileRef}
          onFormChange={handleEditFormChange}
          onImageChange={handleEditImageChange}
          onRemoveImage={removeEditImage}
          onSubmit={handleEditSubmit}
          onCancel={closeEditModal}
        />
      )}
    </div>
  );
};

export default Blog;