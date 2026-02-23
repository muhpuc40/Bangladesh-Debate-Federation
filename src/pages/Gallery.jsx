import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/apiService';

const GalleryCardSlider = ({ images, eventName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">No image</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((img, index) => (
        <img
          key={index}
          src={img.image_url}
          alt={`${eventName} - ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
          style={{
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
          }}
        />
      ))}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
          {images.map((_, index) => (
            <span
              key={index}
              className={`block rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'bg-white w-4 h-1.5'
                  : 'bg-white bg-opacity-50 w-1.5 h-1.5'
                }`}
            />
          ))}
        </div>
      )}

      {/* Image count badge */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-lg text-sm z-10">
          {currentIndex + 1}/{images.length}
        </div>
      )}
    </div>
  );
};

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const response = await apiService.getGalleries();
      if (response.success) {
        setGalleries(response.data);
      }
    } catch (err) {
      setError('Failed to load galleries');
      console.error('Error fetching galleries:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-xl">{error}</p>
          <button
            onClick={fetchGalleries}
            className="mt-4 px-4 py-2 bg-emerald-900 text-white rounded hover:bg-emerald-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center md:pt-10 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
            Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Capturing memories and moments from our events and activities
          </p>
        </div>

        {galleries.length === 0 ? (
          <div className="text-center py-16">
            <img
              src="https://i.ibb.co.com/gFMzPHTV/gallery-icon.png"
              alt="Gallery Icon"
              className="w-24 h-24 mx-auto mb-4 opacity-50"
            />
            <p className="text-gray-500 text-lg">No galleries available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleries.map((gallery) => (
              <Link
                key={gallery.id}
                to={`/gallery/${gallery.id}`}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Cover Image with Slider */}
                <div className="relative h-48 overflow-hidden">
                  <GalleryCardSlider images={gallery.images} eventName={gallery.event_name} />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors">
                    {gallery.event_name}
                  </h3>
                  <p className="text-gray-600 flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {formatDate(gallery.event_date)}
                  </p>
                  <div className="mt-4 flex items-center text-emerald-700 font-medium">
                    <span>View Gallery</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;