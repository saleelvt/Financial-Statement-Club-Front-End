// src/components/pages/Loading.tsx
import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-100 via-slate-400 to-blue-500">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-4 border-t-transparent border-black rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-100 text-lg font-bold">Loading, please wait...</p>
      </div>
    </div>
  );
};
