import React from 'react';

const Gallery = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <img 
            src="https://i.ibb.co.com/gFMzPHTV/gallery-icon.png" 
            alt="Gallery Icon" 
            className="w-24 h-24 mx-auto"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
          Gallery
        </h1>
        <p className="text-2xl md:text-3xl text-gray-600 mb-6">
          Coming Soon
        </p>
        <p className="text-gray-500 max-w-md mx-auto">
          We're currently working on an amazing gallery experience. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default Gallery;