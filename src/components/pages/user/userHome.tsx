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
import "../../../css/userHome.css";

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
  const [selectedPdfCompanyName, setSelectedPdfCompanyName] = useState<string | null>(null);
const [selectedPdfYear, setSelectedPdfYear] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState<string>("عربي");
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null); // State for selected PDF
  const dispatch = useDispatch<AppDispatch>();
  const { userLanguage } = useSelector((state: RootState) => state.userLanguage);

  const rowsPerPage = 7; // Number of rows per page
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleViewPdf = (file: { data: any; contentType: string },companyName:string,year:string) => {
    const blob = new Blob([Uint8Array.from(file.data.data)], { type: file.contentType });
    const url = URL.createObjectURL(blob);
    setSelectedPdfUrl(url); // Set the selected PDF URL
    setSelectedPdfCompanyName(companyName); // Set the selected PDF's company name
    setSelectedPdfYear(year); // Set the selected PDF's year
  };


  const currentBrands = userLanguage === "English" ? brandsEn : brandsAr;
  const currentFiles = userLanguage === "English" ? englishFiles : arabicFiles;
  const totalPages = Math.ceil(currentBrands.length / rowsPerPage);
  const paginatedData = currentBrands.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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
      <div className="relative w-full flex flex-col items-center p-8 bg-opacity-50 text-center">
        <h1 className="text-6xl font-serif mb-6 animate-bounce text-gray-100">
          {userLanguage==="English"?"Financial Statement Club":"نادي البيانات المالية"}
        </h1>
        <div className="flex items-center w-full max-w-md bg-white rounded-full shadow-lg overflow-hidden mb-8">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-3 text-gray-700 focus:outline-none rounded-l-full border-2 border-gray-300 focus:border-gray-600 placeholder-gray-700 transition-all"
          />
          <button
            style={{
              background: "linear-gradient(to right, rgba(96, 125, 139, 0.8), rgba(33, 150, 243, 0.8))",
            }}
            className="text-white p-3 rounded-r-full bg-opacity-70 hover:bg-gray-300 focus:outline-none transition duration-300"
          >
            🔍
          </button>
        </div>
      </div>

      {/* Brand Buttons */}
      <div
        className={`grid grid-cols-2 mx-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4 text-center mt-8 ${
          language === "Arabic" ? "text-right" : ""
        }`}
      >
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
              background: "linear-gradient(to right, rgba(96, 125, 139, 0.8), rgba(33, 150, 243, 0.8))",
            }}
            className="px-6 py-2 bg-b-500 font-bold border border-gray-150 text-white rounded-lg hover:bg-gray-700 transition-all"
          >
           {userLanguage==="English"?"Show more":"استعراض المزيد"}
          </button>
        ) : (
          <button
            onClick={handleShowLess}
            style={{
              background: "linear-gradient(to right, rgba(96, 125, 139, 0.8), rgba(33, 150, 243, 0.8))",
            }}
            className="px-6 py-2 bg-gray-300 font-bold text-white rounded-lg hover:bg-gray-700 transition-all"
          >
         {userLanguage==="English"?"Show Less":"عرض أقل"}
          </button>
        )}
      </div>

      {/* Language Toggle Button */}
      <div className="flex mt-12 justify-end w-1/2">
        <button
          onClick={toggleLanguage}
          style={{
            background: "linear-gradient(to right, rgba(96, 125, 139, 0.8), rgba(33, 150, 243, 0.8))",
          }}
          className="py-1 px-2 items-center bg-opacity-80 text-black text-2xl font-serif rounded-md hover:border hover:border-gray-300 hover:bg-slate-200"
        >
          {language === "English" ? "عربي" : "English"}
        </button>
      </div>

      {/* Table for Company Names, Year, and PDF Viewer with Pagination */}
      <div className="w-full max-w-4xl p-5">
        <table className="w-full bg-gray-900 bg-opacity-70 border rounded-lg border-gray-500 font-semibold text-white">
          <thead>
            <tr>
              <th className="p-4 border border-gray-500">Company Name</th>
              <th className="p-3 border border-gray-500">Year</th>
              <th className="p-3 border border-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((brand, index) => (
              <tr key={index}>
                <td className="p-3 border border-gray-500 text-center">{brand.name}</td>
                <td className="p-3 border border-gray-500 text-center">{brand.year}</td>
                <td className="p-3 border border-gray-500 text-center">
                  <button
                    onClick={() => handleViewPdf(currentFiles[index],brand.name,brand.year)}
                    className="px-2 py-1 lg:px-4 lg:py-2 text-white rounded transition-opacity duration-200 hover:scale-105 transition-transform duration-300 ease-in-out hover:opacity-90"
                    style={{
                      background: "linear-gradient(to right, rgba(96, 125, 139, 0.8), rgba(33, 150, 243, 0.8))",
                    }}
                  >
                    {language === "English" ? "View PDF" : "عرض PDF"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"} bg-gray-800 text-white`}
          >
            Previous
          </button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"} bg-gray-800 text-white`}
          >
            Next
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      {selectedPdfUrl && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-4/5 h-4/5">
          
            <button
              onClick={() => setSelectedPdfUrl(null)}
              className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-700 rounded-full p-2"
            >
              Close
            </button>

            <h2 className="text-2xl font-bold text-center mb-4 text-white">
            {selectedPdfCompanyName} - {selectedPdfYear}
          </h2>

            <iframe
            src={`${selectedPdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full border rounded-lg"
              title="PDF Viewer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHomePage;
