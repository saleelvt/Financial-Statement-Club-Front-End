import React, { useState } from "react";
import "../../../global.css";

const brands = [
  "Aljomaih Automotive",
  "Universal Motors Agencies",
  "Al Jabr Automotive",
  "Wallan Group",
  "Al-Futtaim Automotive",
  "Petromin Nissan",
  "Toyota Abdul Latif Jameel",
  "Almajdouie Motors",
  "Bin Dajem",
  "National Motor Company",
  "Mahara",
  "Juffali Automotive",
  "AJ Motors",
  "United Motors Company",
];

const UserHomePage: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const handleBrandClick = (brand: string) => {
    console.log(`Selected brand: ${brand}`);
  };

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  return (
    <div
      className="bg-gray-800 text-white min-h-screen flex flex-col items-center py-8"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dllmjze4p/image/upload/v1731560132/digital-art-dark-cosmic-night-sky_d9htus.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header with Overlay */}
      <div className="relative w-full flex flex-col items-center p-8 bg-opacity-50 text-center">
        <h1 className="text-6xl font-serif mb-6 animate-bounce text-gray-100">
          Financial Statement Club
        </h1>

        {/* Search Bar */}
        <div className="flex items-center w-full max-w-md bg-white rounded-full shadow-lg overflow-hidden mb-8">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-3 text-gray-700 focus:outline-none rounded-l-full border-2 border-gray-300 focus:border-gray-600 placeholder-gray-700 transition-all"
          />
          <button className="bg-gray-200 text-white p-3 rounded-r-full hover:bg-gray-500 focus:outline-none transition duration-300">
            🔍
          </button>
        </div>
      </div>

      {/* Brand Buttons */}
      <div
        className="grid grid-cols-2 mx-2 sm:grid-cols-3 mx-24 rounded-lg md:grid-cols-4 lg:grid-cols-6 gap-4 px-4 text-center mt-8"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dllmjze4p/image/upload/v1731560132/digital-art-dark-cosmic-night-sky_d9htus.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {brands.slice(0, showAll ? brands.length : 10).map((brand) => (
          <button
            key={brand}
            onClick={() => handleBrandClick(brand)}
            className="text-xl font-serif hover:shadow-lg hover:border focus:ring-2 transition duration-300 transform hover:scale-105 hover:border-gray-100 rounded-sm hover:text-gray-100"
          >
            {brand}
          </button>
        ))}
      </div>

      {/* Show More / Show Less Button */}
      <div className="mt-8">
        {!showAll ? (
          <button
            onClick={handleShowMore}
            className="px-6 py-2 bg-b-500 font-bold border border-gray-150 text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            Show More...
          </button>
        ) : (
          <button
            onClick={handleShowLess}
            className="px-6 py-2 bg-gray-300 font-bold  text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            Show Less...
          </button>
        )}
      </div>
    </div>
  );
};

export default UserHomePage;
