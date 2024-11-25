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
  const [brandsEn, setBrandsEn] = useState<{ name: string; year: string }[]>(
    []
  );
  const [brandsAr, setBrandsAr] = useState<{ name: string; year: string }[]>(
    []
  );
  // const [arabicFiles, setArabicFiles] = useState<any[]>([]);
  // const [englishFiles, setEnglishFiles] = useState<any[]>([]);
  // const [selectedPdfCompanyName, setSelectedPdfCompanyName] = useState<
  //   string | null
  // >(null);
  // const [selectedPdfYear, setSelectedPdfYear] = useState<string | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState<string>("عربي");
  // const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { userLanguage } = useSelector(
    (state: RootState) => state.userLanguage
  );

  // const rowsPerPage = 7;
  // const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    console.log("This is the useEffect ", userLanguage);
  }, [userLanguage]);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const response = await commonRequest(
          "GET",
          "/admin/getDocuments",
          {},
          null
        );
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
      const { arabicNamesArray } = setArabicNames(documents);
      setBrandsAr(arabicNamesArray);

      const { englishNamesArray } = setEnglishNames(documents);
      setBrandsEn(englishNamesArray);
    }
  }, [documents]);

  const handleBrandClick = (brand: string) => {
    console.log(`Selected brand: ${brand}`);
    setSelectedBrand(brand);
    setSearchTerm("");
  };

  const handleShowMore = () => setShowAll(true);
  const handleShowLess = () => setShowAll(false);

  const toggleLanguage = async () => {
    const newLanguage = language === "English" ? "Arabic" : "English";
    setLanguage(newLanguage);
    await dispatch(userLanguageChange(newLanguage));
  };



  // const handleViewPdf = (
  //   file: { data: any; contentType: string },
  //   companyName: string,
  //   year: string
  // ) => {
  //   const blob = new Blob([Uint8Array.from(file.data.data)], {
  //     type: file.contentType,
  //   });
  //   const url = URL.createObjectURL(blob);
  //   setSelectedPdfUrl(url);
  //   setSelectedPdfCompanyName(companyName);
  //   setSelectedPdfYear(year);
  // };

  const arrays = userLanguage === "English" ? brandsEn : brandsAr;
  const currentBrands = arrays.filter(
    (item, index, self) => index === self.findIndex((t) => t.name === item.name)
  );





  // const currentFiles = userLanguage === "English" ? englishFiles : arabicFiles;

  // Add this new function to get the correct file index
  // const getFileIndex = (brand: { name: string; year: string }) => {
  //   return arrays.findIndex(
  //     (item) => item.name === brand.name && item.year === brand.year
  //   );
  // };

  // Updated filtering logic to include brand selection
  // const filteredBrands = arrays.filter(
  //   (brand) =>
  //     (selectedBrand ? brand.name === selectedBrand : true) &&
  //     brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const totalPages = Math.ceil(filteredBrands.length / rowsPerPage);
  // const paginatedData = filteredBrands.slice(
  //   (currentPage - 1) * rowsPerPage,
  //   currentPage * rowsPerPage
  // );

  useEffect(() => {
    // setCurrentPage(1);
  }, [searchTerm, selectedBrand]);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  return (
    <div
      style={{ backgroundColor: "#444444" }}
      className=" text-white min-h-screen flex flex-col items-center p-4"
    >
      <div className="flex mt-12 justify-end w-3/4">
        <button
          onClick={toggleLanguage}
          style={{
            background:
              "linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(128, 128, 128, 0.8))",
          }}
          className="py-1 px-2 items-center bg-opacity-80 text-black text-xl font- rounded-md hover:border hover:border-gray-300 hover:bg-slate-200"
        >
          {userLanguage === "English" ? "عربي" : "English"}
        </button>
      </div>

      <div
        className={`grid grid-cols-2 px-12  shadow-sm  p-12  shadow-gray-50 border rounded-lg   sm:grid-cols-3 mt-12  md:grid-cols-4 lg:grid-cols-6 gap-4  text-center ${
          language === "Arabic" ? "text-right" : ""
        }`}
      >
        {currentBrands
          .slice(0, showAll ? currentBrands.length : 10)
          .map((brand, index) => (
            <button
              key={index}
              onClick={() => handleBrandClick(brand.name)}
              className={` font-bold hover:border focus:ring-2 transition duration-300 transform hover:scale-105 hover:border-gray-200 hover:bg-gray-300 hover:text-black rounded-sm ${
                selectedBrand === brand.name
                  ? "bg-gray-200 text-black font-medium"
                  : ""
              } ${language === "Arabic" ? "p-1" : ""}`}
            >
              {brand.name}
            </button>
          ))}
      </div>

      <div className="mt-6" hidden={currentBrands.length < 10}>
        {!showAll ? (
          <button
            onClick={handleShowMore}
            style={{
              background:
                "linear-gradient(to right, rgba(96, 125, 139, 0.8), rgba(33, 150, 243, 0.8))",
            }}
            className="px-6 py-2 bg-b-500 font-bold border border-gray-150 text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            {userLanguage === "English" ? "Show more" : "استعراض المزيد"}
          </button>
        ) : (
          <button
            onClick={handleShowLess}
            style={{
              background:
                "linear-gradient(to right, rgba(96, 125, 139, 0.8), rgba(33, 150, 243, 0.8))",
            }}
            className="px-6 py-2 bg-gray-300 font-bold text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            {userLanguage === "English" ? "Show Less" : "عرض أقل"}
          </button>
        )}
      </div>

      {/* Header */}
      <div className="relative w-full flex flex-col items-center p-8 bg-opacity-50 text-center">
        {/* <h1 className="text-6xl font-serif mb-6 animate-bounce text-gray-100">
          {userLanguage === "English"
            ? "Financial Statement Club"
            : "نادي البيانات المالية"}
        </h1> */}
        {/* <div className="flex items-center w-full max-w-md bg-white rounded-full shadow-lg overflow-hidden mb-8">
          <input
            type="text"
            placeholder={userLanguage === "English" ? "Search..." : "بحث..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 text-gray-700 focus:outline-none rounded-l-full border-2 border-gray-300 focus:border-gray-600 placeholder-gray-700 transition-all"
          />
          <button
            style={{
              background:
                "linear-gradient(to right, rgba(96, 125, 139, 0.8), rgba(33, 150, 243, 0.8))",
            }}
            className="text-white p-3 rounded-r-full bg-opacity-70 hover:bg-gray-300 focus:outline-none transition duration-300"
          >
            🔍
          </button>
        </div> */}
      </div>

      {/* <div className="w-full max-w-4xl p-4">
        {selectedBrand && (
          <div className="mb-4">
            <button
              onClick={() => setSelectedBrand(null)}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
            >
              {userLanguage === "English" ? "Clear Filter" : "مسح التصفية"}
            </button>
          </div>
        )}

        <table className="w-full bg-gray-900 bg-opacity-60 border rounded-lg border-gray-200 font- text-white">
          <thead>
            <tr>
              <th className="p-2 border bg-slate-400 text-black border-gray-500">
                {userLanguage === "English" ? "Company Name" : "اسم الشركة"}
              </th>
              <th className="p-2 border border-gray-500 bg-slate-400 text-black">
                {userLanguage === "English" ? "Year" : "سنة"}
              </th>
              <th className="p-2 border border-gray-500 bg-slate-400 text-black">
                {userLanguage === "English" ? "Actions" : "الاجراءات"}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((brand) => {
              const fileIndex = getFileIndex(brand);
              return (
                <tr key={`${brand.name}-${brand.year}`}>
                  <td className="border border-gray-500 text-center">
                    {brand.name}
                  </td>
                  <td className="border border-gray-500 text-center">
                    {brand.year}
                  </td>
                  <td className="border border-gray-500 text-center">
                    <button
                      onClick={() =>
                        handleViewPdf(
                          currentFiles[fileIndex],
                          brand.name,
                          brand.year
                        )
                      }
                      className="lg:px-4 py-1 m-2 text-white rounded transition-opacity duration-200 hover:scale-105 transition-transform duration-300 ease-in-out hover:opacity-90"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(96, 125, 139, 0.8), rgba(33, 150, 243, 0.8))",
                      }}
                    >
                      {userLanguage === "English" ? "View PDF" : "عرض PDF"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-700"
            } bg-gray-800 text-white`}
          >
            {userLanguage === "English" ? "Previous" : "سابق"}
          </button>
          <span className="text-white">
            {userLanguage === "English" ? "Page" : "صفحة"} {currentPage}/
            {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-700"
            } bg-gray-800 text-white`}
          >
            {userLanguage === "English" ? "Next" : "مقبل"}
          </button>
        </div>
      </div> */}

      {/* PDF Viewer */}
      {/* {selectedPdfUrl && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-4/5 h-4/5">
            <button
              onClick={() => setSelectedPdfUrl(null)}
              className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-700 rounded-full p-2"
            >
              {userLanguage === "English" ? "Close" : "يغلق"}
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
      )} */}
    </div>
  );
};

export default UserHomePage;
