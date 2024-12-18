// /* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import { TbListDetails } from "react-icons/tb";
import { useSelector } from "react-redux";
import { RootState } from "../../../reduxKit/store";
import { Loading } from "../Loading";
import { Error } from "../Error";
import { FaArrowCircleLeft } from "react-icons/fa";
import {
  DocumentSliceAr,
  DocumentSliceEn,
} from "../../../interfaces/admin/addDoument";

export const DocumentList: React.FC = () => {
  const { adminLanguage } = useSelector(
    (state: RootState) => state.adminLanguage
  );
  const [language, setLanguage] = useState<string>("Arabic");
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<
    (DocumentSliceAr | DocumentSliceEn)[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [uniqeDocument, setUniqueDocument] = useState<
    (DocumentSliceAr | DocumentSliceEn)[]
  >([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        if (adminLanguage) setLanguage(adminLanguage);

        const endpoint =
          adminLanguage === "English"
            ? "/admin/getDocuments"
            : "/admin/getArabicDocuments";
        const response = await commonRequest("GET", endpoint, config, null);

        if (response.status === 200 && response.data?.data) {
          const fetchedDocuments = response.data.data;

          // Filter unique documents based on nickNameEn or nickNameAr
          const uniqueDocs = fetchedDocuments.filter(
            (
              doc: DocumentSliceAr | DocumentSliceEn,
              index: number,
              self: any[]
            ) => {
              const nickname =
                "nickNameEn" in doc ? doc.nickNameEn : doc.nickNameAr;
              return (
                index ===
                self.findIndex((d) =>
                  "nickNameEn" in d
                    ? d.nickNameEn === nickname
                    : d.nickNameAr === nickname
                )
              );
            }
          );

          setDocuments(fetchedDocuments);
          setUniqueDocument(uniqueDocs);
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
  }, [adminLanguage]);

  // const toggleLanguage = async () => {
  //     const newLanguage = adminLanguage === "English" ? "Arabic" : "English";
  //    await dispatch(AdminLanguageChange(newLanguage));
  //   };

  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 10;

  const totalPages = Math.ceil(documents.length / documentsPerPage);
  const indexOfLastDoc = currentPage * documentsPerPage;
  const indexOfFirstDoc = indexOfLastDoc - documentsPerPage;
  const currentDocuments = uniqeDocument.slice(indexOfFirstDoc, indexOfLastDoc);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const handleBrand = (doc: DocumentSliceAr | DocumentSliceEn) => {
    if (doc) {
      const tadawalCode ="tadawalCode" in doc ? doc.tadawalCode : "" ;
      navigate("/documentDetails", { state: { tadawalCode, language } });
    }
  };

  return (
    <div className="min-h-screen  bg-gray-100">
      <div className="flex justify-center items-center py-3 px-2 sm:px-18 lg:px-12">
        <div className="bg-white shadow-md rounded-lg p-6 w-full  border border-gray-300">
          <div className="flex flex-wrap justify-between items-center ">
            <FaArrowCircleLeft
              className="text-3xl  text-gray-500"
              onClick={() => navigate("/home")}
            />  

            <div className="flex gap-4 items-center ">
              {/* <div className="flex items-center  bg-white rounded-full shadow-lg overflow-hidden ">
                <input
                  dir={adminLanguage === "English" ? "ltr" : "rtl"}
                  type="text"
                  placeholder={
                    adminLanguage === "English" ? "Search..." : "بحث..."
                  }
                  // value={searchTerm}
                  // onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-1 text-gray-700 focus:outline-none text-xs rounded-l-full border-2 border-gray-300 focus:border-gray-600 placeholder-gray-700 transition-all"
                />
                <button
                  style={{
                    background:
                      "linear-gradient(to right, rgba(96, 125, 139, 0.8), rgba(33, 150, 243, 0.8))",
                  }}
                  className="text-white p-1 rounded-r-full border-2 border-gray-300 focus:border-gray-600 bg-opacity-70 hover:bg-gray-300 focus:outline-none transition duration-300"
                >
                  🔍
                </button>
              </div> */}
              <h4 className="text-2xl md:text-2xl font-bold text-gray-700">
                {language === "Arabic" ? "قائمة المستندات " : "Document List"}
              </h4>
            </div>

          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 text-left">
              <thead>
                <tr className="bg-gray-300 text-gray-700 text-xs sm:text-sm md:text-base">
                  <th className="py-2 px-2 sm:px-4 border border-gray-300">
                    {language === "Arabic" ? "كود تداول" : "Tadawul Code"}
                  </th>
                  <th className="py-2 px-2 sm:px-4 border border-gray-300">
                    {" "}
                    {language === "Arabic" ? "الاسم الكامل" : "Full Name"}
                  </th>
                  <th className="py-2 px-2 sm:px-4 border border-gray-300">
                    {language === "Arabic" ? " كنية" : "NickName"}
                  </th>
                  <th className="py-2 px-2 sm:px-4 border border-gray-300">
                    {language === "Arabic" ? " قطاع" : "Sector"}
                  </th>
                  <th className="py-2 px-2 sm:px-4 border border-gray-300">
                    {language === "Arabic" ? "الإجراءات" : "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs xs:text-sm">
                {currentDocuments.map((doc, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <td className="px-1 sm:px-4 border border-gray-300">
                      {(doc as DocumentSliceAr | DocumentSliceEn).tadawalCode}
                    </td>
                    <td className="px-1 sm:px-4 border border-gray-300">
                      {language === "Arabic"
                        ? (doc as DocumentSliceAr).fullNameAr
                        : (doc as DocumentSliceEn).fullNameEn}
                    </td>
                    <td className="px-1 sm:px-4 border border-gray-300">
                      {language === "Arabic"
                        ? (doc as DocumentSliceAr).nickNameAr
                        : (doc as DocumentSliceEn).nickNameEn}
                    </td>

                    <td className="px-1 sm:px-4 border border-gray-300">
                      {(doc as DocumentSliceAr | DocumentSliceEn).sector}
                    </td>

                    <td className="py-1  sm:px-4 border flex justify-center border-gray-300 flex space-x-4">
                     
                      {/* <button
                        onClick={() => {
                          handleBrand(doc);
                        }}
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-xs sm:text-sm"
                      >
                        {language === "Arabic" ? " التفاصيل" : "Details"}
                      </button> */}
                      <TbListDetails  onClick={() => {
                          handleBrand(doc);
                        }} className="text-3xl text-gray-600"/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between lg:hidden mt-8 md:hidden sm:hidden xs:hidden">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gray-500 text-white hover:bg-gray-600"
              }`}
            >
              Previous
            </button>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === index + 1
                      ? "bg-gray-500 text-white"
                      : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gray-500 text-white hover:bg-gray-600"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
