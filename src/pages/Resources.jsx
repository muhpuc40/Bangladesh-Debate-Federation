import React from 'react';

const Resources = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">

                {/* Icon */}
                <div className="text-5xl mb-4">🚀</div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Coming Soon
                </h1>

                {/* Subtitle */}
                <p className="text-gray-600 mb-6">
                    We're working hard to bring you amazing resources.
                    Stay tuned for updates!
                </p>

            </div>
        </div>
    );
};

export default Resources;