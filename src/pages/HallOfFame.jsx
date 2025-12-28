import React from 'react';

const HallOfFame = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <img 
            src="https://i.ibb.co.com/KqB2VjLx/hall-of-fame-icon.png" 
            alt="Hall of Fame Icon" 
            className="w-24 h-24 mx-auto"
          />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
          Hall of Fame
        </h1>
        <p className="text-2xl md:text-3xl text-gray-600 mb-6">
          Coming Soon
        </p>
        <p className="text-gray-500 max-w-md mx-auto">
          Our Hall of Fame section is under construction. Stay tuned!
        </p>
      </div>
    </div>
  );
};

export default HallOfFame;