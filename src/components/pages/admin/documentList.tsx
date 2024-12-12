// /* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminNavbar } from "../../Navbar/adminNavbar";
import { ConfirmationModal } from "./ConfirmationModal";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import toast from "react-hot-toast";
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
  }, [adminLanguage]);
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 10;
  const [modalOpen, setModalOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState<any>(null);
  const totalPages = Math.ceil(documents.length / documentsPerPage);
  const indexOfLastDoc = currentPage * documentsPerPage;
  const indexOfFirstDoc = indexOfLastDoc - documentsPerPage;
  const currentDocuments = documents.slice(indexOfFirstDoc, indexOfLastDoc);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleDelete = async () => {
    if (!docToDelete) return;
    try {
      await commonRequest(
        "DELETE",
        `/admin/deleteDocument/${docToDelete}?language=${language}`,
        config
      );
      toast.success("Document Successfully Deleted");
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete document:", error);
    } finally {
      setModalOpen(false);
      setDocToDelete(null);
    }
  };
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const handleBrand = (doc: DocumentSliceAr | DocumentSliceEn) => {
    if (doc) {
      const brandNickName =
        "nickNameEn" in doc ? doc.nickNameEn : doc.nickNameAr;
      navigate("/documentDetails", { state: { brandNickName, language } });
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex justify-center items-center py-3 px-2 sm:px-18 lg:px-12">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-6xl border border-gray-300">
          <div className="flex flex-wrap justify-between items-center mb-6">
            <FaArrowCircleLeft className="text-3xl" onClick={() => navigate("/home")} />
            {/* <button
              onClick={() => navigate("/home")}
              className="px-2 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Back
            </button> */}

            <h4 className="text-2xl md:text-2xl font-bold text-gray-700">
              {language === "Arabic" ? "قائمة المستندات " : "Document List"}
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 text-left">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-xs sm:text-sm md:text-base">
                  <th className="py-2 px-2 sm:px-4 border border-gray-300">
                    {" "}
                    {language === "Arabic" ? "الاسم الكامل" : "Full Name"}
                  </th>
                  <th className="py-2 px-2 sm:px-4 border border-gray-300">
                    {language === "Arabic" ? " كنية" : "NickName"}
                  </th>
                  <th className="py-2 px-2 sm:px-4 border border-gray-300">
                    {language === "Arabic" ? "كود تداول" : "Tadawal Code"}
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
                      {(doc as DocumentSliceAr | DocumentSliceEn).tadawalCode}
                    </td>
                    <td className="px-1 sm:px-4 border border-gray-300">
                      {(doc as DocumentSliceAr | DocumentSliceEn).sector}
                    </td>

                    <td className="py-1  sm:px-4 border flex justify-center border-gray-300 flex space-x-4">
                      <button
                        onClick={() => {
                          setDocToDelete(doc._id);
                          setModalOpen(true);
                        }}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs sm:text-sm"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          handleBrand(doc);
                        }}
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-xs sm:text-sm"
                      >
                        {language === "Arabic"
                          ? " التفاصيل"
                          : "Details"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between mt-8">
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

      <ConfirmationModal
        isOpen={modalOpen}
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};
