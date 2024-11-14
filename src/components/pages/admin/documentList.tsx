import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AdminNavbar } from "../../Navbar/adminNavbar";
import { ConfirmationModal } from "./ConfirmationModal";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import toast from "react-hot-toast";

export const DocumentList: React.FC = () => {
  const documents=[
    { _id: "1", companyNameEn: "Saleels", yearOfReport: "2022" },
    { _id: "2", companyNameEn: "Saleels", yearOfReport: "2021" },
    { _id: "3", companyNameEn: "Saleels", yearOfReport: "2020" },
    { _id: "4", companyNameEn: "Saleels", yearOfReport: "2019" },
    { _id: "5", companyNameEn: "Saleels", yearOfReport: "2018" },
    { _id: "6", companyNameEn: "Saleels", yearOfReport: "2017" },
    { _id: "7", companyNameEn: "Saleels", yearOfReport: "2016" },
    { _id: "8", companyNameEn: "Saleels", yearOfReport: "2015" },
    { _id: "9", companyNameEn: "Saleels", yearOfReport: "2014" },
    { _id: "10", companyNameEn: "Saleels", yearOfReport: "2013" },
    { _id: "11", companyNameEn: "Saleels", yearOfReport: "2012" },
    { _id: "12", companyNameEn: "Saleels", yearOfReport: "2011" },
  ]
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
      const response= await commonRequest("DELETE", `/admin/deleteDocument/${docToDelete}`, config);
      if(response.success===true){
        toast.success("Document Successfully Deleted")
      }
      
    } catch (error) {
      console.error("Failed to delete document:", error);
    } finally {
      setModalOpen(false);
      setDocToDelete(null);
    }
  };

  return (
    <div className="min-h-screen">
      <AdminNavbar />
      <div className="flex justify-center items-center py-10">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl border border-gray-300">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Document List</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="py-4 px-6 text-lg font-medium text-gray-700">Brand Name</th>
                  <th className="py-4 px-6 text-lg font-medium text-gray-700">Year of Statement</th>
                  <th className="py-4 px-6 text-lg font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentDocuments.map((doc) => (
                  <tr key={doc._id} className="hover:bg-gray-100 transition-colors">
                    <td className="py-4 px-6 border-b text-gray-700">{doc.companyNameEn}</td>
                    <td className="py-4 px-6 border-b text-gray-700">{doc.yearOfReport}</td>
                    <td className="py-4 px-6 border-b flex space-x-2">
                      <Link
                        to={`/view-document/${doc._id}`}
                        className="text-gray-700 hover:text-gray-900 px-3 py-1 rounded-md border border-gray-300 bg-gray-300 hover:bg-slate-400 font-semibold"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => {
                          setDocToDelete(doc._id);
                          setModalOpen(true);
                        }}
                        className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md font-semibold"
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
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-300"
                  } rounded-md`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              className={`px-3 py-2 ${
                currentPage === totalPages ? "text-gray-400" : "text-gray-700 hover:text-gray-900"
              } rounded-md`}
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





