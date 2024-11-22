// src/components/pages/Loading.tsx
import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-300 via-gray-100 to-white">
    <div className=" flex items-center flex-col">
      <div className="w-12 h-12 border-5 border-t-4 border-t-blue-600 border-gray-400 rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-700 text-lg font-semibold tracking-wide">
        Loading<span className="text-blue-700">...</span>
      </p>
      <p className="text-sm text-gray-500 mt-2 italic">
        Please wait, your content is on the way.
      </p>
    </div>
  </div>
  );
};
