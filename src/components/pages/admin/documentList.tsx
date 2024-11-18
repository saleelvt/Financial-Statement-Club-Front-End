/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { AdminNavbar } from "../../Navbar/adminNavbar";
import { ConfirmationModal } from "./ConfirmationModal";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { Loading } from "../Loading";
import { userLanguageChange } from "../../../reduxKit/actions/auth/authAction";
import { setArabicNames } from "../../../functions/setArabicNames";
import { setEnglishNames } from "../../../functions/setEnglishNames";

interface Document {
  _id: string;
  companyNameEn: string;
  yearOfReport: string;
}

export const DocumentList: React.FC = () => {
  const { userLanguage } = useSelector((state: RootState) => state.userLanguage);
  const [language, setLanguage] = useState<string>("عربي");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();  // Initialize useNavigate

  const toggleLanguage = async () => {
    const newLanguage = language === "English" ? "Arabic" : "English";
    setLanguage(newLanguage);
    await dispatch(userLanguageChange(newLanguage));
  };

  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [brandsEn, setBrandsEn] = useState<{ name: string; year: string }[]>([]);
  const [brandsAr, setBrandsAr] = useState<{ name: string; year: string }[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const response = await commonRequest("GET", "/admin/getDocuments", {}, null);
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
  }, []);

  useEffect(() => {
    if (documents.length > 0) {
      const { arabicNamesArray } = setArabicNames(documents);
      setBrandsAr(arabicNamesArray);

      const { englishNamesArray } = setEnglishNames(documents);
      setBrandsEn(englishNamesArray);
    }
  }, [documents]);

  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 10;
  const [modalOpen, setModalOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState<string | null>(null);

  const totalPages = Math.ceil(documents.length / documentsPerPage);
  const indexOfLastDoc = currentPage * documentsPerPage;
  const indexOfFirstDoc = indexOfLastDoc - documentsPerPage;
  const currentDocuments = documents.slice(indexOfFirstDoc, indexOfLastDoc);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const handleDelete = async () => {
    if (!docToDelete) return;
    try {
      await commonRequest("DELETE", `/admin/deleteDocument/${docToDelete}`, config);

        toast.success("Document Successfully Deleted");
        // Optionally update state to reflect changes
        setDocuments(prevDocuments => 
          prevDocuments.filter(doc => doc._id.toString() !== docToDelete)
        );
        // Reload the page to reflect changes
       
      
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
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="flex justify-center items-center py-10 px-4 sm:px-8 lg:px-12">
        <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 w-full max-w-4xl border border-gray-200">
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate("/adminHomepage")}  // Navigate back on click
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Back
            </button>
            <h1 className="text-1xl md:text-3xl font-bold text-center mb-6 text-gray-700">
              Document List
            </h1>
          </div>

          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-4 px-3 md:px-6 text-md md:text-lg font-medium text-gray-700">Brand Name</th>
                  <th className="py-4 px-3 md:px-6 text-md md:text-lg font-medium text-gray-700">Year of Statement</th>
                  <th className="py-4 px-3 md:px-6 text-md md:text-lg font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentDocuments.map((doc, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-100 transition-colors">
                    <td className="py-4 px-3 md:px-6 text-gray-700">{doc.companyNameEn}</td>
                    <td className="py-4 px-3 md:px-6 text-gray-700">{doc.yearOfReport}</td>
                    <td className="py-4 px-3 md:px-6 flex space-x-2">
                      <button
                        onClick={() => {
                          setDocToDelete(doc._id);
                          setModalOpen(true);
                        }}
                        className="px-3 py-1 bg-gray-600 text-white rounded-md font-semibold hover:bg-gray-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => paginate(currentPage - 1)}
              className={`px-3 py-2 ${currentPage === 1 ? "text-gray-400" : "text-gray-700 hover:text-gray-900"} rounded-md`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`mx-1 px-3 py-2 ${
                    currentPage === index + 1
                      ? "bg-gray-500  text-white"
                      : "text-gray-700 hover:bg-gray-300"
                  } rounded-md`}
                >

                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              className={`px-3 py-2 ${currentPage === totalPages ? "text-gray-400" : "text-gray-700 hover:text-gray-900"} rounded-md`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={modalOpen}
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
};
