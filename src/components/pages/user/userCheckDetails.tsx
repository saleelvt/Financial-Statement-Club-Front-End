/* eslint-disable @typescript-eslint/no-explicit-any */
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
  // const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | File>("");
  const [iframeSrc, setIframeSrc] = useState<string>("");

  const pdfKeys = ["Q1", "Q2", "Q3", "Q4", "S1", "Board", "Year"];

  const handleYearClick = (year: string) => {
    setSelectedYear(year);
    const filteredYears = documents
      .filter((doc) => doc.formData?.Year?.year === year)
      .filter(Boolean);
    setSelectedFilteredDocWithYear(filteredYears);
  };

  const handlePdfButtonClick = (key: string) => {
    setLoading(true);
    setSelectedPdfKey(key);

    if (selectedFilteredDocWithYear.length > 0) {
      const document = selectedFilteredDocWithYear[0];
      const fileUrl =
        document.formData[key as keyof typeof document.formData]?.file;
      if (fileUrl) {
        // setSelectedPdfUrl(fileUrl);
        setIframeSrc(`${fileUrl}#toolbar=0`);
        setLoading(false);
      } else {
        setLoading(false);
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
      const years: string[] = documents
        .map((doc) => doc.formData?.Year?.year)
        .filter((year): year is string => year !== undefined);
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
    <div className="min-h-96   px-4 ">
      <div className=" m-1 xs:mx-auto">
        <div className=" rounded-md border xs:p-1 lg:p-2 mb-6">
          {document && (
            <div>
              <div className="flex  sm:flex-row justify-between items-start xs:items-center sm:items-center">
               
                <div className=" ">
                  <h1 className="  text-2xl font-normal text-gray-800">
                    {isDocumentEn(document)
                      ? document.fullNameEn
                      : document.fullNameAr}
                  </h1>
                  <h2 className=" text-2xl font-normal text-gray-800 ">
                    {isDocumentEn(document)
                      ? document.nickNameEn
                      : document.nickNameAr}
                  </h2>
                  <div className=" flex gap-12 items-center ">
                    <h1 className="text-xl font-normal text-gray-800">
                      {isDocumentEn(document)
                        ? document.sector
                        : document.sector}
                    </h1>
                  </div>
                </div>
                <button className="bg-gray-500 xs:hidden text-white px-4 rounded-md py-2 ">Back</button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-start gap-4 mb-4">
          <button
            onClick={handleLeftClick}
            className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            {"<"}
          </button>
          <div className="flex overflow-x-auto gap-2">
            {yearList.slice(visibleYears, visibleYears + 5).map((year) => (
              <button
                key={year}
                onClick={() => handleYearClick(year)}
                className={` text-xs px-2 -1 rounded-md  ${
                  selectedYear === year
                    ? "bg-gray-600 text-white text-black"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
          <button
            onClick={handleRightClick}
            className="p-1 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            {">"}
          </button>
        </div>

        <div className="bg-white lg:p-6 rounded-lg shadow-lg">
          {selectedFilteredDocWithYear.length > 0 ? (
            <>
              <div className="flex flex-wrap gap-1 mb-4">
                {pdfKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => handlePdfButtonClick(key)}
                    className={`px-2 py-1 bg-gray-200 rounded-md ${
                      selectedPdfKey === key
                        ? "bg-gray-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
              {iframeSrc ? (
                <>
                  {loading && (
                    <div className="w-full h-96 flex items-center justify-center bg-gradient-to-r from-blue-200 via-gray-200 to-white rounded-lg">
                      <svg
                        className="animate-spin h-8 w-8 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </div>
                  )}
                  <iframe
                    src={iframeSrc}
                    className={`w-full h-96 rounded-lg border ${
                      loading ? "hidden" : ""
                    }`}
                    title="PDF Viewer"
                    onLoad={() => setLoading(false)} // Stop loading once iframe is loaded
                    onLoadStart={() => setLoading(true)} // Start loading when iframe starts to load
                    style={{ display: iframeSrc ? "block" : "none" }}
                  ></iframe>
                </>
              ) : (
                <div className="w-full h-96 flex flex-col items-center justify-center  via-gray-200 to-white rounded-lg">
                  {loading && (
                    <svg
                      className="animate-spin h-8 w-8 text-blue-500 mb-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  <p className="text-gray-700 text-lg font-semibold">
                    SELECT PDF
                  </p>
                </div>
              )
              }
            </>
          ) : (
            <p className="text-center text-gray-600">Select a valid year.</p>
          )}
        </div>
      </div>
    </div>
  );
});
