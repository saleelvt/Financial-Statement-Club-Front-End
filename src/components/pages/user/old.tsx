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

 export const UserCompanyDetailsNew = React.memo(() => {
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
  const [selectedFilteredDocWithYear, setSelectedFilteredDocWithYear] =
    useState<(DocumentSliceEn | DocumentSliceAr)[]>([]);
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
  const keyTranslations: Record<
    string,
    { en: string; fullEn: string; ar: string; fullAr: string }
  > = {
    Q1: {
      en: "Q1",
      fullEn: "First Quarter Report",
      ar: "ر1",
      fullAr: "تقرير الربع الأول",
    },
    Q2: {
      en: "Q2",
      fullEn: "Second Quarter Report",
      ar: "ر2",
      fullAr: "تقرير الربع الثاني",
    },
    Q3: {
      en: "Q3",
      fullEn: "Third Quarter Report",
      ar: "ر3",
      fullAr: "تقرير الربع الثالث",
    },
    Q4: {
      en: "Q4",
      fullEn: "Forth Quarter Report",
      ar: "ر4",
      fullAr: "تقرير الربع الرابع",
    },
    S1: {
      en: "SA",
      fullEn: "Semi-Annual Report",
      ar: "ن.س",
      fullAr: "التقرير النصف سنوي",
    },
    Year: {
      en: "Annual",
      fullEn: "Annual Report",
      ar: "سنوي",
      fullAr: "التقرير السنوي",
    },
    Board: {
      en: "Board",
      fullEn: "Board Report",
      ar: "المجلس",
      fullAr: "تقرير مجلس الإدارة",
    },
  };

  const tableKeys: (keyof NonNullable<FormField["table"]>)[] = [
    "BalanceSheet",
    "ProfitLoss",
    "CashFlow",
  ];

  const handleYearClick = async (year: string) => {
    setSelectedYear(year);
    setSelectedFilteredDocWithYear([]); // Clear previous filtered documents
    setSelectedPdfKey(null); // Reset selected PDF key
    setIframeSrc(""); // Reset iframe source

    const filteredYears = documents.filter((doc) =>
      pdfKeys.some((key) => doc.formData?.[key]?.year === year)
    );

    console.log("Filtered Documents:", filteredYears);
    await setSelectedFilteredDocWithYear(filteredYears);
  };

  const handlePdfButtonClick = async (key: FieldKey) => {
    await setTableIframeSrc("");
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
    if (
      !selectedFilteredDocWithYear ||
      selectedFilteredDocWithYear.length === 0
    )
      return;

    const formDataForLatest = selectedFilteredDocWithYear[0]?.formData;
    console.log("The form data for latest file:", formDataForLatest);

    if (!formDataForLatest) return;

    // Define priority order for field selection
    const priorityOrder: FieldKey[] = [
      "Board",
      "Year",
      "S1",
      "Q4",
      "Q3",
      "Q2",
      "Q1",
    ];

    let selectedKey: FieldKey | null = null;
    let selectedData: FormField | null = null;

    // Check each field in priority order and find the first one with a valid file
    for (const key of priorityOrder) {
      if (formDataForLatest[key]?.file) {
        selectedKey = key;
        selectedData = formDataForLatest[key];
        break;
      }
    }

    if (selectedKey && selectedData) {
      console.log("Latest FieldKey:", selectedKey);
      console.log("Latest File:", selectedData.file);

      setSelectedPdfKey(selectedKey);

      if (typeof selectedData.file === "string") {
        const encodedUrl = encodeURIComponent(selectedData.file);
        const googleViewerUrl = `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true&toolbar=0&navigator=0&scrollbar=0`;
        setIframeSrc(`${googleViewerUrl}#toolbar=0`);
        setLoading(false);
      } else {
        console.error("fileUrl is not a valid string:", selectedData.file);
      }
    }
  }, [selectedYear, selectedFilteredDocWithYear]);

  const handleRightClick = () => {
    if (visibleYears > 0) {
      setVisibleYears(visibleYears - 1);
    }
  };

  const handleLeftClick = () => {
    if (visibleYears > 5) {
      setVisibleYears(visibleYears + 1);
    }
  };

  const isDocumentEn = (
    document: DocumentSliceEn | DocumentSliceAr
  ): document is DocumentSliceEn => {
    return (document as DocumentSliceEn).fullNameEn !== undefined;
  };

  useEffect(() => {
    const TakeYears = async () => {
      // Extract all years from documents
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
        .filter((year): year is string => !!year) // Remove null/undefined values
        .sort((a, b) => parseInt(a) - parseInt(b)); // Sort in descending order to get the largest first

      if (years.length > 0) {
        const latestYear = years[years.length - 1]; // Get the biggest year
        console.log("Latest (Biggest) Year:", latestYear);
        setSelectedYear(latestYear);

        // Filter documents that have this latest year
        const latestYearDocs = documents.filter(
          (doc) =>
            doc.formData?.Q1?.year === latestYear ||
            doc.formData?.Q2?.year === latestYear ||
            doc.formData?.Q3?.year === latestYear ||
            doc.formData?.Q4?.year === latestYear ||
            doc.formData?.S1?.year === latestYear ||
            doc.formData?.Board?.year === latestYear ||
            doc.formData?.Year?.year === latestYear
        );

        await setSelectedFilteredDocWithYear(latestYearDocs);
      }

      setYearList(years);
    };

    TakeYears();
  }, [documents]);

  useEffect(() => {
    if (documents.length > 0) {
      console.log("kaalan documents : ", documents);
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
  //   console.log("the document:", document);
  // if (document) {
  // }
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
                  <div className="flex  text-[14px] font-serif  h-6   justify-center lg:justify-start ">
                    <h3 className="text-gray-800  text-center ">
                      {isDocumentEn(document)
                        ? document.nickNameEn
                        : document.nickNameAr}
                    </h3>
                  </div>
                  <div className="flex flex-col md:flex-row h-7  text-[14px] font-serif    justify-center lg:justify-start ">
                    <h3 className="text-gray-800 text-center ">
                      {isDocumentEn(document)
                        ? document.fullNameEn
                        : document.fullNameAr}
                    </h3>
                  </div>
                  <div className="flex h-6   justify-center lg:justify-start items-center ">
                    <h3 className=" text-[14px]   text-gray-800">
                      {isDocumentEn(document)
                        ? document.sector
                        : document.sector}
                    </h3>
                  </div>
                  <div className="mt-4">
                    <div
                      dir={userLanguage === "English" ? "ltr" : "rtl"}
                      className="flex justify-start gap-[6px]  text-xs justify-center lg:justify-start "
                    >
                      <div className="flex  items-center ">
                        <button
                          onClick={handleLeftClick}
                          className="text-gray-600 flex   items-center    justify-center text-[16px] px-2 py-1   bg-gray-200 rounded-md     "
                        >
                          {" "}
                          {"<"}
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 py-1  items-center justify-center lg:justify-start ">
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
                          onClick={handleRightClick}
                          className="text-gray-600 flex    items-center justify-center text-[16px] px-2 py-1   bg-gray-200 rounded-md   "
                        >
                          {" "}
                          {">"}
                        </button>
                      </div>
                    </div>
                  </div>




                  <div
                    dir={userLanguage === "English" ? "ltr" : "rtl"}
                    className="mt-2 flex lg:justify-start rounded-lg text-xs"
                  >
                    {selectedFilteredDocWithYear.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                         <button className="text-white flex text-xs   items-center   justify-center text-[16px] px-2 py-1   bg-gray-600 rounded-md     ">
                          {" "}
                          {"PDF"}
                        </button>
                        {pdfKeys
                          .filter((key) =>
                            selectedFilteredDocWithYear.some(
                              (doc) => doc.formData[key]?.file !== null
                            )
                          ) // ✅ Ensure only keys with available files are shown
                          .map((key) => (
                            <div key={key} className="relative group">
                              <button
                                onClick={() =>
                                  handlePdfButtonClick(key as FieldKey)
                                }
                                className={`px-2 py-1 text-xs bg-gray-200 rounded-md transition-all duration-300 ${
                                  selectedPdfKey === key
                                    ? "bg-gray-700 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                                }`}
                              >
                                {userLanguage === "Arabic"
                                  ? keyTranslations[key].ar
                                  : keyTranslations[key].en}
                              </button>

                              {/* Tooltip (Shows based on the selected language) */}
                              <span className="tooltip group-hover:opacity-90 absolute bottom-full mb-1 left-1/2 transform -translate-x-2/4 whitespace-nowrap bg-gray-800 text-white text-[10px] px-[2px] py-[2px] rounded-md opacity-0 pointer-events-none">
                                {userLanguage === "Arabic"
                                  ? keyTranslations[key].fullAr
                                  : keyTranslations[key].fullEn}
                              </span>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-600"></p>
                    )}
                  </div>

                  <div className=" ">
                    {selectedPdfKey &&
                      pdfKeys.includes(
                        selectedPdfKey as keyof FormDataState
                      ) && (
                        <div
                          dir={userLanguage === "English" ? "ltr" : "rtl"}
                          className="mt-2 flex justify-center lg:justify-start rounded-lg text-xs"
                        >
                          {selectedFilteredDocWithYear.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
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
            </div>
          )}
        </div>
      </div>
      <div className="lg:w-[65%] ">
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
            className=" "
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
          <div className="w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-white ">
            <p className="text-gray-500">No content available</p>
          </div>
        )}
      </div>
    </div>
  );
});


