// /* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, lazy,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { commonRequest } from "../../../config/api";
import { configWithToken } from "../../../config/constants";
import { TbListDetails } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
const Loading = lazy(() => import("../Loading"));
import { Error } from "../Error";
import { FaArrowCircleLeft } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import {
  DocumentSliceAr,
  DocumentSliceEn,
} from "../../../interfaces/admin/addDoument";
import { AdminLanguageChange } from "../../../reduxKit/actions/admin/adminLanguage";

const DocumentList: React.FC = React.memo(() => {
    const skipRef = useRef(0);
    const hasMoreRef = useRef(true);
  const { adminLanguage } = useSelector(
    (state: RootState) => state.adminLanguage
  );
  const [language, setLanguage] = useState<string>("Arabic");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState< (DocumentSliceAr | DocumentSliceEn)[] >([]);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [uniqeDocument, setUniqueDocument] = useState<
    (DocumentSliceAr | DocumentSliceEn)[]
  >([]);
  const BATCH_SIZE = 200;
const INTERVAL_MS = 1000; // 1 second


  
useEffect(() => {
  const fetchBatch = async (isInitial = false) => {
    try {
      if (adminLanguage) setLanguage(adminLanguage);

      const endpoint =
        adminLanguage === "English"
          ? `/api/v1/admin/getDocuments?skip=${skipRef.current}&limit=${BATCH_SIZE}`
          : `/api/v1/admin/getArabicDocuments?skip=${skipRef.current}&limit=${BATCH_SIZE}`;

      const response = await commonRequest("GET", endpoint, configWithToken(), null);

      if (response.status === 200 && response.data?.data?.length > 0) {
        const newDocs = response.data.data;

        const filteredNewDocs = newDocs.filter(
          (doc: DocumentSliceAr | DocumentSliceEn, index: number, self: any[]) => {
            const nickname = "nickNameEn" in doc ? doc.nickNameEn : doc.nickNameAr;
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

        if (isInitial) {
          setDocuments(newDocs);
          setUniqueDocument(filteredNewDocs);
        } else {
          setDocuments((prev) => [...prev, ...newDocs]);

          setUniqueDocument((prev) => {
            const combined = [...prev, ...filteredNewDocs];
            return combined.filter(
              (doc, index, self) => {
                const nickname = "nickNameEn" in doc ? doc.nickNameEn : doc.nickNameAr;
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
          });
        }

        skipRef.current += BATCH_SIZE;

        if (newDocs.length < BATCH_SIZE) {
          hasMoreRef.current = false;
        }
      } else {
        hasMoreRef.current = false;
      }
    } catch (err: any) {
      setError(err.message || "Failed to load documents");
      hasMoreRef.current = false;
    } finally {
      if (isInitial) {
        setLoadingInitial(false); // 👈 only for first batch
      }
    }
  };

  // Initial setup
  setDocuments([]);
  setUniqueDocument([]);
  skipRef.current = 0;
  hasMoreRef.current = true;
  setError("");
  setLoadingInitial(true); // 👈 set before initial fetch

  fetchBatch(true); // First load

  const intervalId = setInterval(() => {
    if (hasMoreRef.current) {
      fetchBatch();
    } else {
      clearInterval(intervalId);
    }
  }, INTERVAL_MS);

  return () => clearInterval(intervalId);
}, [adminLanguage]);


  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 10;

  const totalPages = Math.ceil(documents.length / documentsPerPage);
  // const indexOfLastDoc = currentPage * documentsPerPage;
  // const indexOfFirstDoc = indexOfLastDoc - documentsPerPage;
  // const currentDocuments = uniqeDocument.slice(indexOfFirstDoc, indexOfLastDoc);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loadingInitial) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const handleBrand = (doc: DocumentSliceAr | DocumentSliceEn) => {
    if (doc) {
      const tadawalCode = "tadawalCode" in doc ? doc.tadawalCode : "";
      navigate(
        `/documentDetails?tadawalCode=${tadawalCode}&language=${language}`
      );
    }
  };
  const toggleLanguage = async () => {
    const newLanguage = adminLanguage === "English" ? "Arabic" : "English";
    await dispatch(AdminLanguageChange(newLanguage));
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
              {/* <button
                        onClick={toggleLanguage}
                        style={{
                          background:
                            "linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(128, 128, 128, 0.8))",
                        }}
                        className="py-1  px-2 items-center bg-opacity-80 text-black text-xl  rounded-md "
                      > */}
              <button
                onClick={toggleLanguage}
                className="py-1 px-2 hover:scale-105   transition-transform duration-300 ease-in-out  items-center text-2xl hover:   bg-opacity-80"
              >
                <GrLanguage className=" text-gray-600" />
              </button>
              {/* </button> */}
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
                    {language === "Arabic" ? "رمز تداول" : "Tadawul Code"}
                  </th>
                  <th className="py-2 px-2 sm:px-4 border border-gray-300">
                    {" "}
                    {language === "Arabic" ? "اسم الشركة" : "Full Name"}
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
                {uniqeDocument.map((doc, index) => (
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
                      <TbListDetails
                        onClick={() => {
                          handleBrand(doc);
                        }}
                        className="text-3xl text-gray-600"
                      />
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
});

export default DocumentList;
