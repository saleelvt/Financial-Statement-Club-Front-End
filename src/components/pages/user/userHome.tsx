/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import "../../../global.css";
import { commonRequest } from "../../../config/api";
import { Loading } from "../Loading";
import { setArabicNames } from "../../../functions/setArabicNames";
import { setEnglishNames } from "../../../functions/setEnglishNames";

interface Document {
  id: string;
  companyNameAr: string;
  companyNameEn: string;
  fileAr: { data: any; contentType: string };
  fileEn: { data: any; contentType: string };
}

const UserHomePage: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [brandsEn, setBrandsEn] = useState<{ name: string }[]>([]);
  const [brandsAr, setBrandsAr] = useState<{ name: string }[]>([]);
  const [arabicFiles, setArabicFiles] = useState<any[]>([]);  // State to store Arabic files
  const [englishFiles, setEnglishFiles] = useState<any[]>([]);  // State to store English files
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const response = await commonRequest("GET", "/admin/getDocuments", {}, null);
        if (response.status === 200 && response.data?.data) {
          console.log("Fetched documents: ", response.data.data);
          setDocuments(response.data.data);
        } else {
          setError("Failed to fetch documents");
        }
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  
  // Set Arabic and English names and files
  useEffect(() => {
    if (documents.length > 0) {
      const { arabicNamesArray, arabicFiles } = setArabicNames(documents);
      setBrandsAr(arabicNamesArray);
      setArabicFiles(arabicFiles); // Set Arabic files

      const { englishNamesArray, englishFiles } = setEnglishNames(documents);
      setBrandsEn(englishNamesArray);
      setEnglishFiles(englishFiles); // Set English files
    }
  }, [documents]);

  const handleBrandClick = (brand: string) => {
    console.log(`Selected brand: ${brand}`);
  };

  const handleShowMore = () => setShowAll(true);
  const handleShowLess = () => setShowAll(false);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  console.log("this is my arabic files ",arabicFiles);
  console.log("this is my english files ",englishFiles);
  console.log("name off arabic ", brandsAr);
  
  
  
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
      {/* Header */}
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
      <div className="grid grid-cols-2 mx-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4 text-center mt-8">
        {brandsEn.slice(0, showAll ? brandsEn.length : 10).map((brand, index) => (
          <button
            key={index}
            onClick={() => handleBrandClick(brand.name)}
            className="text-xl hover:border focus:ring-2 transition duration-300 transform hover:scale-105 hover:border-gray-100 rounded-sm hover:text-gray-100"
          >
            {brand.name}
          </button>
        ))}
      </div>

      {/* Show More / Show Less Button */}
      <div className="mt-6">
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
            className="px-6 py-2 bg-gray-300 font-bold text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            Show Less...
          </button>
        )}
      </div>
    </div>
  );
};

export default UserHomePage;
