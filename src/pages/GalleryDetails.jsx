import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiService from '../services/apiService';

const GalleryDetails = () => {
  const { id } = useParams();
  const [gallery, setGallery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    fetchGalleryDetails();
  }, [id]);

  const fetchGalleryDetails = async () => {
    try {
      setLoading(true);
      const response = await apiService.getGalleryById(id);
      if (response.success) {
        setGallery(response.data);
      }
    } catch (err) {
      setError('Failed to load gallery details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goPrev = (e) => {
    e.stopPropagation();
    setSelectedIndex(
      (prev) => (prev - 1 + gallery.images.length) % gallery.images.length
    );
  };

  const goNext = (e) => {
    e.stopPropagation();
    setSelectedIndex(
      (prev) => (prev + 1) % gallery.images.length
    );
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null || !gallery) return;

      if (e.key === 'ArrowLeft') {
        setSelectedIndex(
          (prev) => (prev - 1 + gallery.images.length) % gallery.images.length
        );
      }
      if (e.key === 'ArrowRight') {
        setSelectedIndex(
          (prev) => (prev + 1) % gallery.images.length
        );
      }
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIndex, gallery]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Error
  if (error || !gallery) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">
            {error || 'Gallery not found'}
          </p>
          <Link
            to="/gallery"
            className="px-6 py-2 bg-emerald-900 text-white rounded hover:bg-emerald-800"
          >
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8 md:pt-10">
          <Link
            to="/gallery"
            className="inline-flex items-center text-emerald-700 hover:text-emerald-900 mb-4"
          >
            ← Back to Gallery
          </Link>

          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {gallery.event_name}
          </h1>
          <p className="text-xl text-gray-600">
            {formatDate(gallery.event_date)}
          </p>
        </div>

        {/* Image Grid */}
        {gallery.images && gallery.images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.images.map((image, index) => (
              <div
                key={image.id}
                onClick={() => openLightbox(index)}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition"
              >
                <img
                  src={image.image_url}
                  alt={`${gallery.event_name}-${index}`}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Light hover overlay (no dark issue) */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 text-lg font-semibold">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No images in this gallery.
          </div>
        )}

        {/* Lightbox */}
        {selectedIndex !== null && (
          <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-white text-3xl"
            >
              ✕
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
              {selectedIndex + 1} / {gallery.images.length}
            </div>

            {/* Prev */}
            {gallery.images.length > 1 && (
              <button
                onClick={goPrev}
                className="absolute left-5 text-white text-3xl bg-black/40 hover:bg-black/70 rounded-full px-3 py-1"
              >
                ‹
              </button>
            )}

            {/* Image */}
            <img
              src={gallery.images[selectedIndex].image_url}
              alt="Gallery"
              className="max-w-full max-h-full object-contain bg-white rounded shadow-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            {gallery.images.length > 1 && (
              <button
                onClick={goNext}
                className="absolute right-5 text-white text-3xl bg-black/40 hover:bg-black/70 rounded-full px-3 py-1"
              >
                ›
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryDetails;