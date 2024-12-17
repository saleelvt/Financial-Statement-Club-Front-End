/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { Error } from "../Error";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { Loading } from "../Loading";
import React from "react";
import { ConfirmationModal } from "./ConfirmationModal";
import { FaArrowCircleLeft } from "react-icons/fa";
import {
  DocumentSliceEn,
  DocumentSliceAr,
} from "../../../interfaces/admin/addDoument";
import { GrUpdate } from "react-icons/gr";
import { FormDataState } from "../../../interfaces/admin/addDoument";
import { useSelector } from "react-redux";
import { RootState } from "../../../reduxKit/store";
import { FaTrash } from "react-icons/fa";
import { boolean } from "yup";
import toast from "react-hot-toast";

export const CheckDocumentDetails = () => {
  const [showEye, setShowEye] = useState(false);
  const [documents, setDocuments] = useState<
    (DocumentSliceEn | DocumentSliceAr)[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const { brandNickName, language } = location.state || {};
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const { adminLanguage } = useSelector(
    (state: RootState) => state.adminLanguage
  );
  const [docToDelete, setDocToDelete] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState(""); // state for search term
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          brandNickName,
          language,
        }).toString();

        const response = await commonRequest(
          "GET",
          `/admin/getDocumetnByNickName?${params}`,
          config
        );
        if (response.status === 200 && response.data?.data) {
          setDocuments(response.data.data);
        } else {
          setError("Failed to fetch documents");
        }
      } catch (err: any) {
        console.error("API Error:", err);
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, [brandNickName, language]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

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

  // Filter documents based on search term
  const filteredDocuments = documents.filter((doc) => {
    return ["Board", "Q1", "Q2", "Q3", "Q4", "S1", "Year"].some((key) => {
      const year = doc.formData[key as keyof FormDataState]?.year;
      return year ? year.toString().includes(searchTerm) : false; // check if searchTerm is included in year
    });
  });

  const handleViewPdf = (file: any) => {
    setShowEye(true);
    setSelectedPdf(file);
  };

  const formatDate = (dateString: Date | null | undefined): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB").format(date); // Formats as DD/MM/YYYY
  };

  const handleUpdateDocument = async (id: any) => {
    try {
      console.log("id for updaq", id);
      if (id) {
        if (language === "English") {
          navigate("/updateDocument", { state: { id, language } });
        } else if (language === "Arabic") {
          navigate("/updateDocumentAr", { state: { id, language } });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleViewCondition = () => {
    handleViewPdf(null);
  };

  return (
    <div className="min-h-screen">
      <div className="p-2">
        <div className=" shadow-sm rounded-lg  ">
          <div className="flex justify-between items-center">
            <FaArrowCircleLeft
              className="text-3xl text-gray-600"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-3xl text-black font-semibold text-center">
              {adminLanguage === "Arabic"
                ? "تفاصيل الوثيقة"
                : "Document Details"}
            </h1>
            <div className="flex justify-end lg:mr-8 mb-4">
              <div className="flex items-center   bg-white rounded-full shadow-lg overflow-hidden">
                <input
                  type="text"
                  dir={adminLanguage === "English" ? "ltr" : "rtl"}
                  placeholder={
                    adminLanguage === "English" ? "Search..." : "بحث..."
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-1 text-gray-700 focus:outline-none rounded-l-full border-2 border-gray-300 focus:border-gray-600 placeholder-gray-700 transition-all"
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
              </div>
            </div>
          </div>

          {/* Table */}
          <div className=" ">
            <table className="w-full text-black  border-collapse  ">
              <thead>
                <tr>
                  <th className="p-1 border border-gray-600 bg-gray-300 ">
                    Tadaval Code
                  </th>
                  <th className="p-1 border border-gray-600 bg-gray-300 ">
                    Nickname
                  </th>
                  <th className="p-1 border border-gray-600 bg-gray-300 ">
                    Categories
                  </th>
                  <th className="p-1 border border-gray-600 bg-gray-300 ">
                    Year
                  </th>
                  <th className="p-1 border border-gray-600 bg-gray-300 ">
                    Date
                  </th>
                  <th className="p-1 border border-gray-600 bg-gray-300 ">
                    View{" "}
                  </th>
                  <th className="p-1 border  border-gray-600 bg-gray-300 ">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {filteredDocuments.map((doc, docIndex) => (
                  <React.Fragment key={doc._id}>
                    {["Board", "Q1", "Q2", "Q3", "Q4", "S1", "Year"].map(
                      (key, index) => (
                        <tr
                          key={`${docIndex}-${index}`}
                          className="hover:bg-gray-200 text-center      text-black font-medium transition duration-300"
                        >
                          {key === "Board" && (
                            <>
                              <td
                                rowSpan={7}
                                className="border place-items-center  font-semibold border-gray-600 bg-gray-200"
                              >
                                {doc.tadawalCode}
                              </td>
                              <td
                                rowSpan={7}
                                className="  font-semibold border border-gray-600 bg-gray-200"
                              >
                                {language === "Arabic"
                                  ? (doc as DocumentSliceAr).nickNameAr
                                  : (doc as DocumentSliceEn).nickNameEn}
                              </td>
                            </>
                          )}

                          <td className="border border-gray-600">{key}</td>
                          <td className=" border border-gray-600">
                            {doc.formData[key as keyof FormDataState]?.year ??
                              "N/A"}
                          </td>
                          <td className=" border border-gray-600">
                            {formatDate(
                              doc.formData[key as keyof FormDataState]?.date
                            )}
                          </td>

                          <td className=" border   border-gray-200">
                            {/* <button
                            className="bg-blue-600 hover:bg-blue-500 text-white text-xs p-1 rounded-lg shadow transition duration-300"
                            onClick={() => handleViewPdf((doc.formData[key as keyof FormDataState])?.file)}
                          >
                            View 
                          </button> */}
                            <IoEyeSharp
                              className="text-2xl   text-center text-gray-600"
                              onClick={() =>
                                handleViewPdf(
                                  doc.formData[key as keyof FormDataState]?.file
                                )
                              }
                            />
                          </td>
                          {key === "Board" && (
                            <>
                              <td
                                rowSpan={7}
                                className=" flex place-content-center justify-between border  font-semibold border-gray-300 bg-gray-200"
                              >
                                {/* <button className="bg-gray-400 border border-gray-600 hover:bg-gray-800 text-white text-sm  rounded-lg shadow transition duration-300">Update</button> */}
                                <FaTrash
                                  onClick={() => {
                                    setDocToDelete(doc._id);
                                    setModalOpen(true);
                                  }}
                                  className="text-2xl text-gray-600"
                                />
                                <GrUpdate
                                  onClick={() => {
                                    handleUpdateDocument(doc?._id);
                                  }}
                                  className="text-2xl text-gray-600"
                                />
                                {/* <button onClick={()=>{handleUpdateDocument(doc?._id)}} className="bg-gray-400 border border-gray-600 hover:bg-gray-800 text-white px-4 py-1 rounded-lg shadow transition duration-300">Update</button> */}
                              </td>
                            </>
                          )}
                        </tr>
                      )
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PDF Viewer */}
        {/* PDF Viewer */}
        {selectedPdf ? (
          <div className="mt-6 p-1 bg-gray-200 shadow-lg rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold mb-4">PDF Viewer</h2>
              <FaEyeSlash
                onClick={handleViewCondition}
                className="text-2xl text-red-600 cursor-pointer"
                title="Close PDF"
              />
            </div>
            <iframe
              src={`${selectedPdf}#toolbar=0`}
              title="Document PDF"
              width="100%"
              height="500px"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        ) : (
          <div className="mt-6 p-1 bg-gray-200 shadow-lg rounded-lg flex flex-col items-center justify-center h-[500px]">
            <IoEyeSharp
              onClick={() => alert("Select a document to view.")}
              className="text-3xl text-gray-600 cursor-pointer"
              title="No PDF Selected"
            />
            <p className="text-gray-700 text-lg font-semibold mt-2">
              Select PDF ...
            </p>
          </div>
        )}
      </div>
       <ConfirmationModal
              isOpen={modalOpen}
              onConfirm={handleDelete}
              onCancel={() => setModalOpen(false)}
            />
    </div>
  );
};
