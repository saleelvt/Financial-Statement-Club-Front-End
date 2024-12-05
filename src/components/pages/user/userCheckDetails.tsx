
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [documents, setDocuments] = useState<
    (DocumentSliceEn | DocumentSliceAr)[]
  >([]);
  const [document, setDocument] = useState<DocumentSliceEn | DocumentSliceAr>();
  const location = useLocation();
  const { brandNickName, language } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [yearList, setYearList] = useState<string[]>([]);
  const [selectedPdfKey, setSelectedPdfKey] = useState<string | null>(null);
  const [selectedFilteredDocWithYear, setSelectedFilteredDocWithYear] =
    useState<(DocumentSliceEn | DocumentSliceAr)[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [visibleYears, setVisibleYears] = useState<number>(0);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | File>("");
  const navigate = useNavigate();

  const pdfKeys = ["Q1", "Q2", "Q3", "Q4", "S1", "Board", "Year"];

  const handleYearClick = (year: string) => {
    setSelectedYear(year);
    const filteredYears = documents
      .filter((doc) => doc.formData?.Year?.year === year)
      .filter(Boolean);
    setSelectedFilteredDocWithYear(filteredYears);
  };

  const handlePdfButtonClick = (key: string) => {
    setSelectedPdfKey(key);
    if (selectedFilteredDocWithYear.length > 0) {
      const document = selectedFilteredDocWithYear[0];
      const fileUrl = document.formData[key as keyof typeof document.formData]
        ?.file;
      if (fileUrl) {
        setSelectedPdfUrl(fileUrl);
      } else {
        alert(`No PDF available for ${key}`);
      }
    }
  };

  const handleLeftClick = () => {
    if (visibleYears > 0) {
      setVisibleYears(visibleYears - 1);
    }
  };

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
    if (documents.length > 0) {
      setDocument(documents[0]);
    }
  }, [documents]);

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
  }, [brandNickName, language]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div className="min-h-96 lg:p-4  ">
      <div className=" m-4 xs:mx-auto">
        <div className="bg-blue-50 rounded-md xs:bg-slate-200 xs:p-1 lg:p-4 mb-6">
          {document && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
             
                <div>
                  <h1 className="text-2xl sm:text-4xl font-bold font-serif text-gray-800">
                    {isDocumentEn(document)
                      ? document.fullNameEn
                      : document.fullNameAr}
                  </h1>
                  <h2 className="text-md font-serif text-gray-600 mt-1">
                    {isDocumentEn(document)
                      ? document.nickNameEn
                      : document.nickNameAr}
                  </h2>
                  <div className=" flex gap-12 items-center mt-3">
                  <h1 className="text-xl font-bold text-gray-800">
                    {isDocumentEn(document) ? document.sector : document.sector}
                  </h1>
                  <button className="p-2 bg-blue-50">
                    {" "}
                    {isDocumentEn(document)
                      ? document.tadawalCode
                      : document.tadawalCode}
                  </button>
                </div>
                </div>

                
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-4 mb-4">
            
          <button
            onClick={handleLeftClick}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            {"<"}
          </button>
          <div className="flex overflow-x-auto gap-2">
            {yearList.slice(visibleYears, visibleYears + 5).map((year) => (
              <button
                key={year}
                onClick={() => handleYearClick(year)}
                className={`px-4 py-2 rounded-md ${
                  selectedYear === year
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
          <button
            onClick={handleRightClick}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            {">"}
          </button>
        </div>

        <div className="bg-white lg:p-6 rounded-lg shadow-lg">
          {selectedFilteredDocWithYear.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-2 mb-4">
              <button onClick={()=>{navigate('/')}} className="mt-4 sm:mt-0 px-4 py-2  hover:bg-gray-500  hover:border-gray-600 border bg-gray-300 rounded-md">
                  Back to Home
                </button>
                {pdfKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => handlePdfButtonClick(key)}
                    className={`px-4 py-2 rounded-md ${
                      selectedPdfKey === key
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
              {selectedPdfUrl && (
                <iframe
                  src={`${selectedPdfUrl}#toolbar=0`}
                  className="w-full h-96 rounded-lg border"
                  title="PDF Viewer"
                ></iframe>
              )}
            </>
          ) : (
            <p className="text-center text-gray-600">Select a valid year.</p>
          )}
        </div>
      </div>
    </div>
  );
});
