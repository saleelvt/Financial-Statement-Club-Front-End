// src/components/pages/Loading.tsx
import React from 'react';

const SkeltonLoading: React.FC = React.memo(() => {
  const columns = 6; // Total columns like in the image
  const itemsPerColumn = 30; // Approximate number of items per column

  return (
    <div className="">



    <div className=" px-44 flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-300 via-gray-100 to-white ">
    
      <div className="grid mt-24 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-6 w-full max-w-7xl">
        {[...Array(columns)].map((_, colIndex) => (
          <div key={colIndex} className="flex p-1  flex-col gap-3">
            {[...Array(itemsPerColumn)].map((_, itemIndex) => (
              <div
                key={itemIndex}
                className="h-5 bg-gray-300 rounded w-3/4 animate-pulse"
              ></div>
            ))}
          </div>
        ))}
      </div>
          </div>
    </div>
  );
});

export default SkeltonLoading;
