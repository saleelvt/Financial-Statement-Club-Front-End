/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import { AdminNavbar } from "../../Navbar/adminNavbar";
import { useEffect, useState } from "react";
import { Error } from "../Error";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import { Loading } from "../Loading";
import {
  DocumentSliceEn,
  DocumentSliceAr,
} from "../../../interfaces/admin/addDoument";

export const CheckDocumentDetails = () => {
  const [documents, setDocuments] = useState<
    (DocumentSliceEn | DocumentSliceAr)[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const { brandNickName, adminLanguage } = location.state || {};
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          brandNickName,
          adminLanguage,
        }).toString();

        console.log("before going to backend ",brandNickName,adminLanguage);
        

        const response = await commonRequest(
          "GET",
          `/admin/getDocumetnByNickName?${params}`,
          config
        );
        if (response.status === 200 && response.data?.data) {
          await setDocuments(response.data.data);
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
  }, [brandNickName, adminLanguage]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  if(documents){
    console.log("meeeeeeeeeeeeeeeassssssssss))))))))***********",documents);
    
  }
  //   if (!doc) {
  //     return <div className="text-center text-lg text-gray-700">No document data available</div>;
  //   }

//   const handleViewPdf = (file: any) => {
//     setSelectedPdf(file);
//   };

//   const formatDate = (dateString: string | undefined): string => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat("en-GB").format(date); // Formats as DD/MM/YYYY
//   };

  return (
    <div className="min-h-screen ">
      <AdminNavbar />
      <div className="p-7">
        <div className="bg-gray-640 shadow-lg rounded-lg p-2 ">
          <div className="flex justify-between ">
            <button
              onClick={() => {
                navigate("/adminDocumentList");
              }}
              className="bg-gray-400 rounded-md p-2 "
            >
              Back
            </button>
            <h1 className="text-4xl  text-black font-semibold text-center">
              Document Details
            </h1>
          </div>

          {/* <table className="w-full text-black  border-collapse mt-2">
            <thead>
              <tr>
                <th className="p-4 border border-gray-600 bg-gray-300 text-left">
                  Nickname
                </th>
                <th className="p-4 border border-gray-600 bg-gray-300 text-left">
                  Tadaval Code
                </th>
                <th className="p-4 border border-gray-600 bg-gray-300 text-left">
                  Property
                </th>
                <th className="p-4 border border-gray-600 bg-gray-300 text-left">
                  Year
                </th>
                <th className="p-4 border border-gray-600 bg-gray-300 text-left">
                  Date
                </th>
                <th className="p-4 border border-gray-600 bg-gray-300 text-left">
                  View PDF
                </th>
              </tr>
            </thead>
            <tbody>
              {["Board", "Q1", "Q2", "Q3", "Q4", "S1", "Year"].map(
                (key, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-200 items-center  text-black font-medium transition duration-300"
                  >
                    {key === "Board" && (
                      <>
                        <td
                          rowSpan={7}
                          className="p-2  text-lg font-bold  border  border-gray-600 bg-gray-200"
                        >
                          {doc.nickNameEn}
                        </td>
                        <td
                          rowSpan={7}
                          className="p-2 border text-lg font-bold border-gray-600 bg-gray-200"
                        >
                          {doc.tadawalCode}
                        </td>
                      </>
                    )}
                    <td className="p-2 border border-gray-600">{key}</td>
                    <td className="p-2 border border-gray-600">
                      {doc.formData[key]?.year || "N/A"}
                    </td>
                    <td className="p-4 border border-gray-600">
                      {formatDate(doc.formData[key]?.date)}
                    </td>
                    <td className="p-4 border border-gray-200">
                      <button
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 rounded-lg shadow transition duration-300"
                        onClick={() => handleViewPdf(doc.formData[key]?.file)}
                      >
                        View PDF
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table> */}
        </div>
        {selectedPdf && (
          <div className="mt-6 p-6 bg-gray-200 shadow-lg rounded-lg">
            <h2 className="text-lg font-semibold mb-4">PDF Viewer</h2>
            <iframe
              src={`${selectedPdf}#toolbar=0`}
              title="Document PDF"
              width="100%"
              height="500px"
              className="rounded-lg shadow-lg"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};
