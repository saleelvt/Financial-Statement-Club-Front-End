/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import "../../../global.css";
import { commonRequest } from "../../../config/api";
import { Loading } from "../Loading";
import { setArabicNames } from "../../../functions/setArabicNames";
import { setEnglishNames } from "../../../functions/setEnglishNames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { userLanguageChange } from "../../../reduxKit/actions/auth/authAction";

interface Document {
  id: string;
  companyNameAr: string;
  companyNameEn: string;
  fileAr: { data: any; contentType: string };
  fileEn: { data: any; contentType: string };
}

const UserHomePage: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const [brandsEn, setBrandsEn] = useState<{ name: string; year: string }[]>([]);
  const [brandsAr, setBrandsAr] = useState<{ name: string; year: string }[]>([]);
  const [arabicFiles, setArabicFiles] = useState<any[]>([]);
  const [englishFiles, setEnglishFiles] = useState<any[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState<string>("عربي");
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null); // State for selected PDF
  const dispatch = useDispatch<AppDispatch>();
  const { userLanguage } = useSelector((state: RootState) => state.userLanguage);


  useEffect(() => {
    console.log("This is the useEffect ", userLanguage);
  }, [userLanguage]);

  

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

  useEffect(() => {
    if (documents.length > 0) {
      const { arabicNamesArray, arabicFiles } = setArabicNames(documents);
      setBrandsAr(arabicNamesArray);
      setArabicFiles(arabicFiles);

      const { englishNamesArray, englishFiles } = setEnglishNames(documents);
      setBrandsEn(englishNamesArray);
      setEnglishFiles(englishFiles);
    }
  }, [documents]);

  const handleBrandClick = (brand: string) => {
    console.log(`Selected brand: ${brand}`);
  };

  const handleShowMore = () => setShowAll(true);
  const handleShowLess = () => setShowAll(false);

  const toggleLanguage = async () => {
    const newLanguage = language === "English" ? "Arabic" : "English";
    setLanguage(newLanguage);
    await dispatch(userLanguageChange(newLanguage));
  };

  const handleViewPdf = (file: { data: any; contentType: string }) => {
    const blob = new Blob([Uint8Array.from(file.data.data)], { type: file.contentType });
    const url = URL.createObjectURL(blob);
    setSelectedPdfUrl(url); // Set the selected PDF URL
  };


  const currentBrands = userLanguage === "English" ? brandsEn : brandsAr;
  const currentFiles = userLanguage === "English" ? englishFiles : arabicFiles;

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

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
      <div  className="relative w-full flex flex-col items-center p-8 bg-opacity-50 text-center">
        <h1 className="text-6xl font-serif mb-6 animate-bounce text-gray-100">
          Financial Statement Club
        </h1>
        <div 
         className="flex items-center w-full max-w-md bg-white rounded-full shadow-lg overflow-hidden mb-8">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-3 text-gray-700 focus:outline-none rounded-l-full border-2 border-gray-300 focus:border-gray-600 placeholder-gray-700 transition-all"
          />
          <button  style={{
    background: 'linear-gradient(to right, rgba(96, 125, 139, 0.8), rgba(33, 150, 243, 0.8))'
  }} className=" text-white p-3 rounded-r-full  bg-opacity-70 hover:bg-gray-300 focus:outline-none transition duration-300">
            🔍
          </button>
        </div>
      </div>

      {/* Brand Buttons */}
      <div className="grid grid-cols-2 mx-4  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4 text-center mt-8">
        {currentBrands.slice(0, showAll ? currentBrands.length : 10).map((brand, index) => (
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
      <div className="mt-6" hidden={currentBrands.length < 10}>
        {!showAll ? (
          <button
            onClick={handleShowMore}
            style={{
              background: 'linear-gradient(to right, rgba(96, 125, 139, 0.8), rgba(33, 150, 243, 0.8))'
            }}

            className="px-6 py-2 bg-b-500 font-bold border border-gray-150 text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            Show More...
          </button>
        ) : (
          <button
            onClick={handleShowLess}
            style={{
              background: 'linear-gradient(to right, rgba(96, 125, 139, 0.8), rgba(33, 150, 243, 0.8))'
            }}
            className="px-6 py-2 bg-gray-300 font-bold text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            Show Less...
          </button>
        )}
      </div>

      {/* Language Toggle Button */}
      <div className="flex justify-end w-1/2">
        <button
          onClick={toggleLanguage}
          style={{
            background: 'linear-gradient(to right, rgba(96, 125, 139, 0.8), rgba(33, 150, 243, 0.8))'
          }}
          className="py-1 px-2 items-center bg-opacity-80  text-black text-2xl font-serif rounded-md hover:border hover:border-gray-300 hover:bg-slate-200"
        >
          {language === "English" ? "عربي" : "English"}
        </button>
      </div>

      {/* Table for Company Names, Year, and PDF Viewer */}
      <div className="w-full max-w-4xl p-5">
        <table className="w-full bg-gray-900  bg-opacity-70 border rounded-lg  border-gray-500 font-semibold text-white">
          <thead>
            <tr>
              <th  className="p-4 border  border-gray-500">Company Name</th>
              <th className="p-3 border border-gray-500">Year</th>
              <th className="p-3 border border-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBrands.map((brand, index) => (
              <tr key={index}>
                <td className="p-3 border border-gray-500 text-center">{brand.name}</td>
                <td className="p-3 border border-gray-500 text-center">{brand.year}</td>
                <td className="p-3 border border-gray-500 text-center">
                <button
  onClick={() => handleViewPdf(currentFiles[index])}
  
  className="px-2  py-1 lg:px-4 lg:py-2 text-white rounded transition-opacity duration-200 hover:scale-105 transition-transform duration-300 ease-in-out  hover:opacity-90"
  style={{
    background: 'linear-gradient(to right, rgba(96, 125, 139, 0.8), rgba(33, 150, 243, 0.8))'
  }}
>
                    {language === "English" ? "View PDF" : "عرض PDF"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* PDF Viewer */}
      {selectedPdfUrl && (
  <div className="w-full max-w-4xl bg-gray-900  bg-opacity-70 p-5 mt-8 rounded">
    <h2 className="text-xl font-bold text-gray-100 ">PDF Viewer</h2>
    <iframe
      src={`${selectedPdfUrl}#toolbar=0`}
      title="PDF Viewer"
      className="w-full h-96  border-none p-2" // Added padding for internal margin
      style={{ margin: '10px' }} // Adds margin inside the iframe
    />
    <button
      style={{
        background: 'linear-gradient(to right, rgba(96, 125, 139, 0.8), rgba(33, 150, 243, 0.8))'
      }}
      onClick={() => setSelectedPdfUrl(null)} // Clear the PDF viewer
      className="mt-4 px-4 py-2 rounded transition-opacity duration-200 hover:scale-105 transition-transform duration-300 ease-in-out hover:opacity-90 text-white rounded"
    >
      Close PDF
    </button>
  </div>
)}

    </div>
  );
};
export default UserHomePage;
