
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, lazy } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { FormField } from "../../../interfaces/admin/addDoument";
import { FieldKey } from "../../../interfaces/admin/addDoument";
import {
  DocumentSliceEn,
  DocumentSliceAr,
  FormDataState,
} from "../../../interfaces/admin/addDoument";
const Loading = lazy(() => import("../Loading"));
import { Error } from "../Error";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import "../../../css/YearSlider.css";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../reduxKit/store";

const UserCompanyDetails = React.memo(() => {
  const { userLanguage } = useSelector(
    (state: RootState) => state.userLanguage
  );
  const [documents, setDocuments] = useState<
    (DocumentSliceEn | DocumentSliceAr)[]
  >([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [document, setDocument] = useState<DocumentSliceEn | DocumentSliceAr>();
  const tadawalCode = queryParams.get("tadawalCode") || "";
  const language = queryParams.get("language") || "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [yearList, setYearList] = useState<string[]>([]);
  const [selectedPdfKey, setSelectedPdfKey] = useState<FieldKey | null>(null);
  type TableKey = keyof NonNullable<FormField["table"]>; // "BalanceSheet" | "CashFlow" | "ProfitLoss"
  const [selectedTableKey, setSelectedTableKey] = useState<TableKey | null>(
    null
  );
  const navigate = useNavigate();
  const [selectedFilteredDocWithYear, setSelectedFilteredDocWithYear] = useState<(DocumentSliceEn | DocumentSliceAr)[]>([]);
  const [selectedYear, setSelectedYear] = useState<any>("");
  const [visibleYears, setVisibleYears] = useState<number>(0);

  const [iframeSrc, setIframeSrc] = useState<any>("");
  const [tableIframeSrc, setTableIframeSrc] = useState<string>("");

  const pdfKeys: (keyof FormDataState)[] = [ 
    "Q1",
    "Q2",
    "Q3",
    "Q4",
    "S1",
    "Year",
    "Board",
  ];
  const tableKeys: (keyof NonNullable<FormField["table"]>)[] = [
    "BalanceSheet",
    "ProfitLoss",
    "CashFlow",
  ];

  const handleYearClick = async (year: string) => {
    setSelectedYear(year);
    setSelectedFilteredDocWithYear([]); // Clear previously filtered documents
    setSelectedPdfKey(null); // Reset the selected PDF key
    setIframeSrc(""); // Reset the iframe source
    const filteredYears = documents
      .filter((doc) => doc.formData?.Q1?.year === year)
      .filter(Boolean);
      console.log('keeeesha finded ;',filteredYears);
      
    await setSelectedFilteredDocWithYear(filteredYears);
  };

  const handlePdfButtonClick = async (key: FieldKey) => {
    await setTableIframeSrc("")
    await setSelectedTableKey(null);
    await setSelectedPdfKey(key);
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

  const handleTableViewButtonClick = (tableKey: TableKey) => {
    setSelectedTableKey(tableKey);

    if (selectedFilteredDocWithYear.length > 0) {
      const document = selectedFilteredDocWithYear[0];
      const screenshotUrl =
        document.formData?.[selectedPdfKey as FieldKey]?.table?.[tableKey];

      console.log("the screen short for the user  url is : ", screenshotUrl);
      if (screenshotUrl && typeof screenshotUrl === "string") {
        setTableIframeSrc(screenshotUrl);
      } else {
        alert(`No screenshot available for ${tableKey}`);
      }
    }
  };

  useEffect(() => {
    const formDataforLatest = selectedFilteredDocWithYear?.[0]?.formData;
    console.log("The form data for latest file:", formDataforLatest);
  
    if (selectedFilteredDocWithYear.length > 0 && selectedFilteredDocWithYear[0]?.formData) {

      const latestFileEntry = Object.entries(selectedFilteredDocWithYear[0].formData)
        .filter(([, entry]) => entry.file !== null && entry.file !== undefined) // Exclude null/undefined files
        .sort((a, b) => {
          const dateA = a[1].date ? new Date(a[1].date).getTime() : 0; // Convert to timestamp or default to 0
          const dateB = b[1].date ? new Date(b[1].date).getTime() : 0;
          return dateB - dateA; // Sort by latest date
        })[0]; // Get the latest entry
  
      if (latestFileEntry) {
        const [latestKey, latestData] = latestFileEntry as [FieldKey, FormField];
        console.log("Latest FieldKey:", latestKey);
        console.log("Latest File:", latestData.file);
        setSelectedPdfKey(latestKey);
        if (latestData.file) {
          if (typeof latestData.file === "string") {
            const encodedUrl = encodeURIComponent(latestData.file);
            const googleViewerUrl = `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true&toolbar=0&navigator=0&scrollbar=0`;
            setIframeSrc(`${googleViewerUrl}#toolbar=0`);
            setLoading(false);
          } else {
            console.error("fileUrl is not a valid string:", latestData.file);
          }
      } 
    }
  }
  }, [selectedYear, selectedFilteredDocWithYear])
  

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
    const TakeYears = async() => {
      const years: string[] = documents
        .map((doc) => {
          return (
            doc.formData?.Q1?.year ||
            doc.formData?.Q2?.year ||
            doc.formData?.Q3?.year ||
            doc.formData?.Q4?.year ||
            doc.formData?.S1?.year ||
            doc.formData?.Board?.year ||
            doc.formData?.Year?.year
          );
        })
        .filter((year): year is string => !!year) // Ensure the year is not null or undefined
        .sort((a, b) => parseInt(a) - parseInt(b)); // Sort numerically
      setYearList(years);

      const latestDocument = [...documents].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];
  
      if (latestDocument) {
        // Find the first available year from the latest document's formData
        const latestYear =
          latestDocument.formData?.Q1?.year ||
          latestDocument.formData?.Q2?.year ||
          latestDocument.formData?.Q3?.year ||
          latestDocument.formData?.Q4?.year ||
          latestDocument.formData?.S1?.year ||
          latestDocument.formData?.Board?.year ||
          latestDocument.formData?.Year?.year;
  
        console.log("Latest Year from Latest Document:", latestYear);
        setSelectedYear(latestYear)
        const data=[latestDocument]
      await  setSelectedFilteredDocWithYear(data)
      }

    };
    TakeYears();
  }, [documents]);

  useEffect(() => {
    if (documents.length > 0) {
      console.log('kaalan documents : ',documents );
      
      setDocument(documents[0]);
    }
  }, [documents]);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          language,
          tadawalCode,
        }).toString();

        const response = await commonRequest(
          "GET",
          `/api/v1/admin/getDocumetnBytadawalCode?${params}`,
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
  }, [language]);
  if (document) {
    console.log("the document:", document);
  }
  if (tableIframeSrc) {
    console.log("the tableIframeSrc:", tableIframeSrc);
  }
  if (selectedFilteredDocWithYear) {
    console.log(
      "the selectedFilteredDocWithYear:",
      selectedFilteredDocWithYear
    );
  }
  if (selectedPdfKey) {
    console.log("the selectedPdfKey:", selectedPdfKey);
  }
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div
      dir={userLanguage === "English" ? "ltr" : "rtl"}
      className="min-h-96 text-2xl font-semibold    flex flex-col lg:flex-row"
    >
      <div className="w-full  lg:w-[40%]">
        <div
          dir={userLanguage === "English" ? "ltr" : "rtl"}
          className="rounded-md   xs:p-1 lg:p-2 mb-4 "
        >
          {document && (
            <div>
              <div className="flex lg;flex-col flex-row lg:justify-start sm:justify-center  md:justify-center xs:justify-center   sm:flex-row w-full items-start">
                <div className="flex   mt-3  mr-4  ">
                  {userLanguage === "Arabic" ? (
                    <FaArrowCircleRight
                      className="text-3xl  ml-4  xs:hidden sm:hidden md:hidden lg:block text-gray-600"
                      onClick={() => {
                        navigate("/");
                      }}
                    />
                  ) : (
                    <FaArrowCircleLeft
                      className="text-3xl xs:hidden sm:hidden md:hidden lg:block text-gray-600"
                      onClick={() => {
                        navigate("/");
                      }}
                    />
                  )}
                </div>
                <div className="  flex  flex-col justify-center    ">
                  <div className="flex  text-[14px] font-serif     justify-center lg:justify-start ">
                    <h3 className="text-gray-800  text-center ">
                      {isDocumentEn(document)
                        ? document.nickNameEn
                        : document.nickNameAr}
                    </h3>
                  </div>
                  <div className="flex flex-col md:flex-row  text-[14px] font-serif    justify-center lg:justify-start ">
                    <h3 className="text-gray-800 text-center ">
                      {isDocumentEn(document)
                        ? document.fullNameEn
                        : document.fullNameAr}
                    </h3>
                  </div>
                  <div className="flex    justify-center lg:justify-start items-center ">
                    <h3 className=" text-[14px] font-serif  text-gray-800">
                      {isDocumentEn(document)
                        ? document.sector
                        : document.sector}
                    </h3>
                  </div>
                  <div className="">
                    <div
                      dir={userLanguage === "English" ? "ltr" : "rtl"}
                      className="flex justify-start gap-[6px]  text-xs justify-center lg:justify-start "
                    >
                      <div className="flex  items-center ">
                        <button
                          onClick={handleRightClick}
                          className="text-gray-600 flex  items-center   justify-center text-[16px] px-2 py-1   bg-gray-200 rounded-md     "
                        >
                          {" "}
                          {"<"}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-4 py-1 items-center justify-center lg:justify-start ">
                        {yearList
                          .slice(visibleYears, visibleYears + 5)
                          .map((year) => (
                            <button
                              key={year}
                              onClick={() => handleYearClick(year)}
                              className={`px-2  py-1 rounded-md ${
                                selectedYear === year
                                  ? "bg-gray-600 text-white"
                                  : "bg-gray-200 text-gray-700 "
                              }`}
                            >
                              {year}
                            </button>
                          ))}
                      </div>
                      <div className="flex items-center ">
                        <button
                          onClick={handleLeftClick}
                          className="text-gray-600 flex  items-center justify-center text-[16px] px-2 py-1   bg-gray-200 rounded-md   "
                        >
                          {" "}
                          {">"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    dir={userLanguage === "English" ? "ltr" : "rtl"}
                    className="mt-2  flex justify-center  lg:justify-start rounded-lg text-xs"
                  >
                    {selectedFilteredDocWithYear.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        <button className="text-white flex text-xs   items-center   justify-center text-[16px] px-2 py-1   bg-gray-600 rounded-md     ">
                          {" "}
                          {"PDF"}
                        </button>
                        {pdfKeys.map((key) => {
                          const isFileAvailable =
                            selectedFilteredDocWithYear.some(
                              (doc) => doc.formData[key].file !== null
                            );
                          return (
                            isFileAvailable && (
                              <button
                                key={key}
                                onClick={() =>
                                  handlePdfButtonClick(key as FieldKey)
                                }
                                className={`px-2 py-1 lg:ml-2 text-xs bg-gray-200 rounded-md ${
                                  selectedPdfKey === key
                                    ? "bg-gray-500 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-300"
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

                  {selectedPdfKey &&
                    pdfKeys.includes(selectedPdfKey as keyof FormDataState) && (
                      <div
                        dir={userLanguage === "English" ? "ltr" : "rtl"}
                        className="mt-2 flex justify-center lg:justify-start rounded-lg text-xs"
                      >
                        {selectedFilteredDocWithYear.length > 0 ? (
                          <div className="flex flex-wrap gap-3">
                            <button className="text-white flex text-xs items-center justify-center text-[16px] px-2 py-1 bg-gray-600 rounded-md">
                              Table
                            </button>
                            {tableKeys
                              .filter((key) =>
                                selectedFilteredDocWithYear.some(
                                  (doc) =>
                                    doc.formData[
                                      selectedPdfKey as keyof FormDataState
                                    ]?.table?.[key] !== null &&
                                    doc.formData[
                                      selectedPdfKey as keyof FormDataState
                                    ]?.table?.[key] !== undefined
                                )
                              )
                              .map((key) => (
                                <button
                                  key={key}
                                  onClick={() =>
                                    handleTableViewButtonClick(key)
                                  }
                                  className={`px-2 py-1 text-xs bg-gray-200 rounded-md ${
                                    selectedTableKey === key
                                      ? "bg-gray-500 text-white"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                                  }`}
                                >
                                  {key}
                                </button>
                              ))}
                          </div>
                        ) : (
                          <p className="text-center text-gray-600">
                            No Data Available
                          </p>
                        )}
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="lg:w-[70%] mt-2">
        {tableIframeSrc ? (
          // Show Image in PhotoProvider with Zoom
          <PhotoProvider>
            <PhotoView src={tableIframeSrc}>
              <img
                src={tableIframeSrc}
                alt="S3 Image"
                style={{ width: "100%", height: "auto", cursor: "zoom-in" }}
              />
            </PhotoView>
          </PhotoProvider>
        ) : iframeSrc ? (
          // Show PDF in an iframe
          <div
            className="rounded-md"
            style={{
              position: "relative",
              width: "100%",
              height: "100vh",
              overflow: "hidden",
            }}
          >
            <iframe
              src={iframeSrc}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                overflow: "auto",
                display: "block",
                objectFit: "contain",
              }}
              title="PDF Viewer"
            />
          </div>
        ) : (
          // Fallback UI when both sources are missing
          <div className="w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-white rounded-lg">
            <p className="text-gray-500">No content available</p>
          </div>
        )}
      </div>
    </div>
  );
});

export default UserCompanyDetails;
