/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation, useNavigate } from "react-router-dom";
import { AdminNavbar } from "../../Navbar/adminNavbar";
import { useEffect, useState } from "react";
import { Error } from "../Error";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import { Loading } from "../Loading";
import React from "react";
import { DocumentSliceEn, DocumentSliceAr,} from "../../../interfaces/admin/addDoument";
import { FormDataState } from "../../../interfaces/admin/addDoument";
export const CheckDocumentDetails = () => {
  const [documents, setDocuments] = useState<(DocumentSliceEn | DocumentSliceAr)[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const { brandNickName, language } = location.state || {};
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState(""); // state for search term
  const navigate=useNavigate();

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



  // Filter documents based on search term
  const filteredDocuments = documents.filter((doc) => {
    return ["Board", "Q1", "Q2", "Q3", "Q4", "S1", "Year"].some((key) => {
      const year = (doc.formData[key as keyof FormDataState])?.year;
      return year ? year.toString().includes(searchTerm) : false;// check if searchTerm is included in year
    });
  });

  const handleViewPdf = (file: any) => {
    setSelectedPdf(file);
  };

  const formatDate = (dateString: Date | null | undefined): string => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB").format(date); // Formats as DD/MM/YYYY
  };



  const handleUpdateDocument= async (id:any) => {
    try {
      console.log('id for updaq', id );
      if(id){
        if(language==="English"){
          navigate("/updateDocument", { state: { id,language  } });
        }else if(language==="Arabic"){ 
          navigate("/updateDocumentAr", { state: { id,language  } });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen">
      {/* <AdminNavbar /> */}
      <div className="p-7">
        <div className="bg-gray-640 shadow-lg rounded-lg p-2">
          <div className="flex flex-wrap justify-between items-center">
            <button
              onClick={() => {
                navigate("/documentList");
              }}
              className="bg-gray-400 rounded-md p-2 mb-4 lg:mb-0"
            >
              Back 
            </button>
            <h1 className="text-4xl text-black font-semibold text-center mb-4 lg:mb-0">
              Document Details
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex justify-end lg:mr-8 mb-4">
            <div className="m-2 w-full sm:w-1/2 lg:w-1/3">
              <input
                type="text"
                placeholder="Search by Year"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border bg-slate-50 border-black rounded-lg"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto  ">
            <table className="w-full text-black border-collapse  ">
              <thead>
                <tr>
                  <th className="p-2 border border-gray-600 bg-gray-300 text-left">Nickname</th>
                  <th className="p-2 border border-gray-600 bg-gray-300 text-left">Tadaval Code</th>
                  <th className="p-2 border  border-gray-600 bg-gray-300 text-left">Action</th>
                  <th className="p-2 border border-gray-600 bg-gray-300 text-left">Property</th>
                  <th className="p-2 border border-gray-600 bg-gray-300 text-left">Year</th>
                  <th className="p-2 border border-gray-600 bg-gray-300 text-left">Date</th>
                  <th className="p-2 border border-gray-600 bg-gray-300 text-left">View PDF</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((doc, docIndex) => (
                  <React.Fragment key={doc._id}>
                    {["Board", "Q1", "Q2", "Q3", "Q4", "S1", "Year"].map((key, index) => (
                      <tr
                        key={`${docIndex}-${index}`}
                        className="hover:bg-gray-200 items-center  text-black font-medium transition duration-300"
                      >
                        {key === "Board" && (
                          <>
                            <td
                              rowSpan={7}
                              className="p-1 text-lg font-bold border border-gray-600 bg-gray-200"
                            >
                              {language === "Arabic"
                                ? (doc as DocumentSliceAr).nickNameAr
                                : (doc as DocumentSliceEn).nickNameEn}
                            </td>
                            <td
                              rowSpan={7}
                              className="p-2 border text-lg font-bold border-gray-600 bg-gray-200"
                            >
                              {doc.tadawalCode}
                            </td>
                            <td
                              rowSpan={7}
                              className="p-2 border text-lg font-bold border-gray-600 bg-gray-200"
                            >
                               <button onClick={()=>{handleUpdateDocument(doc?._id)}} className="bg-gray-400 border border-gray-600 hover:bg-gray-800 text-white px-4 py-1 rounded-lg shadow transition duration-300">Update</button>
                            </td>
                          </>
                        )}
                        <td className="p-1 border border-gray-600">{key}</td>
                        <td className="p-1 border border-gray-600">
                          { (doc.formData[key as keyof FormDataState])?.year ??  "N/A"}
                        </td>
                        <td className="p-1 border border-gray-600">
                          {formatDate((doc.formData[key as keyof FormDataState])?.date)}
                        </td>
                        <td className="p-1 border border-gray-200">
                          <button
                            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 rounded-lg shadow transition duration-300"
                            onClick={() => handleViewPdf((doc.formData[key as keyof FormDataState])?.file)}
                          >
                            View PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PDF Viewer */}
        {selectedPdf ? (
  <div className="mt-6 p-1 bg-gray-200 shadow-lg rounded-lg">
   <div className=" flex justify-between"> <h2 className="text-lg font-semibold  mb-4">PDF Viewer</h2>
   <button onClick={()=>{setSelectedPdf(null)}} className="bg-red-600 px-2 m-2 py-0.5 rounded-md text-xs lg:mr-3 text-white">Close</button>
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
   
    <p className="text-gray-700 text-lg font-semibold">Select Pdf ...</p>
  </div>
)}

      </div>
    </div>
  );
};
