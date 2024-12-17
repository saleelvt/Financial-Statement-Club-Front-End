/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa"
import {
  DocumentSliceEn,
  DocumentSliceAr,
  FormDataState,
} from "../../../interfaces/admin/addDoument";
import { Loading } from "../Loading";
import { Error } from "../Error";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import "../../../css/YearSlider.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../reduxKit/store";
import { FaArrowCircleLeft } from "react-icons/fa";
export const UserCompanyDetails = React.memo(() => {
  const { userLanguage } = useSelector(
    (state: RootState) => state.userLanguage
  );
  const [documents, setDocuments] = useState<
    (DocumentSliceEn | DocumentSliceAr)[]
  >([]);
  const [pdfLoading, setPdfLoading] = useState(false);
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
  const [iframeSrc, setIframeSrc] = useState<string>("");
  const navigate = useNavigate();

  const pdfKeys: (keyof FormDataState)[] = [
    "Q1",
    "Q2",
    "Q3",
    "Q4",
    "S1",
    "Board",
    "Year",
  ];

  const handleYearClick = (year: string) => {
    setSelectedYear(year);
    const filteredYears = documents
      .filter((doc) => doc.formData?.Q1?.year === year)
      .filter(Boolean);
    setSelectedFilteredDocWithYear(filteredYears);
  };

  const handlePdfButtonClick = (key: string) => {
    setPdfLoading(true);
    setSelectedPdfKey(key);
    if (selectedFilteredDocWithYear.length > 0) {
      const document = selectedFilteredDocWithYear[0];
      const fileUrl =
        document.formData[key as keyof typeof document.formData]?.file;
      if (fileUrl) {
        if (typeof fileUrl === "string") {
          const encodedUrl = encodeURIComponent(fileUrl);
          const googleViewerUrl = `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true&toolbar=0&navigator=0&scrollbar=0`;
          setIframeSrc(`${googleViewerUrl}#toolbar=0`);
          setLoading(false);
        } else {
          console.error("fileUrl is not a valid string:", fileUrl);
        }
        // setSelectedPdfUrl(fileUrl);
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
        .map((doc) => doc.formData?.Q1?.year)
        .filter((year): year is string => year !== undefined).sort((a, b) => parseInt(a) - parseInt(b));
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
    <div
      dir={userLanguage === "English" ? "ltr" : "rtl"}
      className="min-h-96 text-2xl font-semibold flex flex-col lg:flex-row"
    >
      <div className="w-full  lg:w-[30%]">

        <div
          dir={userLanguage === "English" ? "ltr" : "rtl"}
          className="rounded-md flex xs:p-1 lg:p-2 mb-4"
        >
          <div className="flex items-center">
            <FaArrowCircleLeft
              className="text-3xl text-gray-600"
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>

          {document && (
            <div>
              <div className="flex flex-col sm:flex-row w-full items-start">
                <div className="ml-4">
                  <div className="flex gap-2 text-2xl font-semibold">
                    <h4 className="text-gray-800">
                      {isDocumentEn(document)
                        ? document.fullNameEn 
                        : document.fullNameAr}
                    </h4>
                    <h4 className="text-gray-800">
                      {"(" +
                        (isDocumentEn(document)
                          ? document.nickNameEn
                          : document.nickNameAr) +
                        ")"}
                    </h4>
                  </div>
                  <div className="flex gap-12 items-center mt-2">
                    <h4 className="text-2xl text-gray-800">
                      {isDocumentEn(document)
                        ? document.sector
                        : document.sector}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          dir={userLanguage === "English" ? "ltr" : "rtl"}
          className="flex justify-start gap-4 text-xs mt-4  ml-14"
        >
          <button
            onClick={handleLeftClick}
            className="  p-1 px-2 text-xs "
          >
            <FaArrowCircleLeft className="text-lg text-gray-600" />
          </button>
          <div className="flex overflow-x-auto gap-2">
            {yearList.slice(visibleYears, visibleYears + 5).map((year) => (
              <button
                key={year}
                onClick={() => handleYearClick(year)}
                className={`text-xs px-2 py-1 rounded-md ${
                  selectedYear === year
                    ? "bg-gray-600 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
          <button
            onClick={handleRightClick}
            className="p-1 "
          >
          <FaArrowCircleRight  className="text-lg text-gray-600"/>
          </button>
        </div>

        <div
          dir={userLanguage === "English" ? "ltr" : "rtl"}
          className="mt-4 ml-14 rounded-lg text-xs"
        >
          {selectedFilteredDocWithYear.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {pdfKeys.map((key) => {
                const isFileAvailable = documents.some(
                  (doc) => doc.formData[key].file !== null
                );

                return (
                  isFileAvailable && (
                    <button
                      key={key}
                      onClick={() => handlePdfButtonClick(key)}
                      className={`px-2 py-1 text-xs bg-gray-200 rounded-md ${
                        selectedPdfKey === key
                          ? "bg-gray-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {key}
                    </button>
                  )
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-600"></p>
          )}
        </div>
      </div>

      <div className="w-full lg:w-[65%]  mt-4 lg:mt-0">

        {iframeSrc ? (
          <div
            className="rounded-md "
            style={{
              position: "relative",
              width: "100%",
              height: "100vh", // Adjust height for mobile responsiveness
            }}
          >
            <iframe
              src={iframeSrc}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
              }}
              title="PDF Viewer"
              frameBorder="0"
            />
          </div>
        ) : (
          <div className="w-full h-96 flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-white rounded-lg">
            {pdfLoading && (
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
          </div>
        )}
      </div>
    </div>
  );
});
