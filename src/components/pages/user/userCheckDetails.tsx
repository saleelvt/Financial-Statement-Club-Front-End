/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdminNavbar } from "../../Navbar/adminNavbar";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  DocumentSliceEn,
  DocumentSliceAr,
} from "../../../interfaces/admin/addDoument";
import { Loading } from "../Loading";
import { Error } from "../Error";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import "../../../css/YearSlider.css";

export const UserCompanyDetails = React.memo(() => {
  const [documents, setDocuments] = useState<(DocumentSliceEn | DocumentSliceAr)[]>([]);
  const location = useLocation();
  const { brandNickName, userLanguage } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [yearList, setYearList] = useState<string[]>([]);
  const [selectedPdfKey, setSelectedPdfKey] = useState<string | null>(null);
  const [selectedFilteredDocWithYear, setSelectedFilteredDocWithYear] = useState<(DocumentSliceEn | DocumentSliceAr)[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [visibleYears, setVisibleYears] = useState<number>(0);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string>("");

//   const years = ["1999", "1998", "1997", "1996", "1995", "1994"];
  const pdfKeys = ["Q1", "Q2", "Q3", "Q4", "S1", "Board", "Year"];

  const handleYearClick = (year: string) => {
    setSelectedYear(year);
    const filteredYears = documents
      .filter((doc) => doc.formData?.Year?.year === year)
      .filter(Boolean);
    setSelectedFilteredDocWithYear(filteredYears);
    setYearList(years);
  };

  const handlePdfButtonClick = (key: string) => {
    setSelectedPdfKey(key);
    if (selectedFilteredDocWithYear.length > 0) {
      const document = selectedFilteredDocWithYear[0]; // Assuming you use the first filtered document
      const fileUrl = document.formData[key]?.file; // Get the file URL
      if (fileUrl) {
        setSelectedPdfUrl(fileUrl);
      } else {
        alert(`No PDF available for ${key}`);
      }
    }
  };

  // Handle scrolling left
  const handleLeftClick = () => {
    if (visibleYears > 0) {
      setVisibleYears(visibleYears - 1);
    }
  };

  // Handle scrolling right
  const handleRightClick = () => {
    if (visibleYears < yearList.length - 1) {
      setVisibleYears(visibleYears + 1);
    }
  };

  const isDocumentEn = (
    document: DocumentSliceEn | DocumentSliceAr
  ): document is DocumentSliceEn => {
    return (document as DocumentSliceEn).fullNameEn !== undefined;
  };

  useEffect(() => {
    const TakeYears = () => {
      const years = documents
        .map((doc) => doc.formData?.Year?.year)
        .filter(Boolean);
      setYearList(years);
    };
    TakeYears();
  }, [documents]);



  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          brandNickName,
          userLanguage,
        }).toString();

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
  }, [brandNickName, userLanguage]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="container mx-auto p-6">
        <div className="flex items-center gap-2 mb-6">
          {/* Left Button */}
          <button
            onClick={handleLeftClick}
            className="text-md p-1 rounded-md hover:bg-gray-200 transition"
          >
            {"<"}
          </button>
          {/* Years Container */}
          <div className="flex gap-2 overflow-hidden">
            {yearList.slice(visibleYears, visibleYears + 5).map((year) => (
              <button
                key={year}
                onClick={() => handleYearClick(year)}
                className={`px-3 py-1 border rounded-md ${
                  selectedYear === year
                    ? "bg-blue-500 text-white border-blue-700"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                } transition`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={handleRightClick}
            className="text-md p-1 rounded-md hover:bg-gray-200 transition"
          >
            {">"}
          </button>
        </div>

        <div className="bg-white p-6  flexrounded-lg shadow-lg mb-6">
          {selectedFilteredDocWithYear.length > 0 ? (
            <>
              <div className="flex gap-2 flex-wrap mb-4">
                {pdfKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => handlePdfButtonClick(key)}
                    className={`px-4 py-2 rounded-md ${
                      selectedPdfKey === key
                        ? "bg-blue-500 text-white border-blue-700"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                    }   transition`}
                  >
                    {key}
                  </button>
                ))}
              </div>

              {selectedPdfUrl && (
                <iframe
                  src={`${selectedPdfUrl}#toolbar=0`}
                  className="w-full h-96 border rounded-lg"
                  title="PDF Viewer"
                ></iframe>
              )}
            </>
          ) : ( 
            <p className="text-center text-xl text-gray-700">
              Select the Valid Year for Show
            </p>
          )}
        </div>
      </div>
    </div>
  );
});
