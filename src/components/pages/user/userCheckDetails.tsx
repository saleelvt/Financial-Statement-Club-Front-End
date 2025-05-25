/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, lazy } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
// import { ITable } from "../admin/Tables/BalanceSheet/interface";
const BalaceSheetFormUser = lazy(() => import("./Tables/balanceSheet"));
const BalanceSheetFormUserArabic = lazy(
  () => import("./Tables/balanceSheetAr")
);

const UserCompanyDetails = React.memo(() => {
  const { userLanguage } = useSelector(
    (state: RootState) => state.userLanguage
  );
  const [documents, setDocuments] = useState<
    (DocumentSliceEn | DocumentSliceAr)[]
  >([]);
  // const [tableButtonDisable, setTableButtonDisable] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [document, setDocument] = useState<DocumentSliceEn | DocumentSliceAr>();
  const tadawalCode = queryParams.get("tadawalCode") || "";
  const language = queryParams.get("language") || "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [yearList, setYearList] = useState<string[]>([]);
  type TableKey = keyof NonNullable<FormField["table"]>; // "BalanceSheet" | "CashFlow" | "ProfitLoss"
  const [selectedPdfKey, setSelectedPdfKey] = useState<FieldKey | null>(null);
  const [selectedTableKey, setSelectedTableKey] = useState<TableKey | null>(
    null
  );
  const [tableButtonOn, setTableButton] = useState(false);
  const [validTableKeys, setValidTableKeys] = useState<typeof tableKeys>([]);
  const navigate = useNavigate();
  const [selectedFilteredDocWithYear, setSelectedFilteredDocWithYear] =
    useState<(DocumentSliceEn | DocumentSliceAr)[]>([]);
  const [selectedYear, setSelectedYear] = useState<any>("");
  const [visibleYears, setVisibleYears] = useState<number>(0);

  const [iframeSrc, setIframeSrc] = useState<string>("");
  const [table, setTableData] = useState<any>(null);

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
  const isEmptyDeep = (obj: any): boolean => {
    if (!obj || typeof obj !== "object") return true;
    if (Array.isArray(obj)) return obj.length === 0;
    return Object.values(obj).every((value) => isEmptyDeep(value));
  };

  const isValidTable = (table: any) => {
    return table && typeof table === "object" && !isEmptyDeep(table);
  };

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
    setSelectedPdfKey(key);
    setTableData(null);
    setSelectedTableKey(null);
    // Reset iframe
    setIframeSrc("");

    // Load PDF
    const document = selectedFilteredDocWithYear[0];
    const fileUrl =
      document.formData[key as keyof typeof document.formData]?.file;

    if (fileUrl && typeof fileUrl === "string") {
      const encodedUrl = encodeURIComponent(fileUrl);
      const googleViewerUrl = `https://docs.google.com/viewer?url=${encodedUrl}&embedded=true&toolbar=0&navigator=0&scrollbar=0`;
      setIframeSrc(`${googleViewerUrl}#toolbar=0`);
    }
    if (document.formData[key as keyof typeof document.formData]?.table) {
      const currentTable =
        document.formData[key as keyof typeof document.formData]?.table;

      const validKeys: typeof tableKeys = [];

      if (currentTable) {
        tableKeys.forEach((tableKey) => {
          const data = currentTable[tableKey];
          if (isValidTable(data)) {
            validKeys.push(tableKey);
          }
        });
      }
      setTableButton(true);
      setValidTableKeys(validKeys);
    }
  };

  useEffect(() => {}, [selectedPdfKey]);

  const handleTableViewButtonClick = (tableKey: TableKey) => {
    setSelectedTableKey(tableKey);

    if (selectedFilteredDocWithYear.length > 0) {
      const document = selectedFilteredDocWithYear[0];
      const filteredData =
        document.formData?.[selectedPdfKey as FieldKey]?.table?.[tableKey];
      console.log("the balancesheet data : ", filteredData, "key: ", tableKey);

      const isEmptyDeep = (obj: any): boolean => {
        if (!obj || typeof obj !== "object") return true;
        if (Array.isArray(obj)) return obj.length === 0;

        return Object.values(obj).every((value) => isEmptyDeep(value));
      };

      const isValidTable = (table: any) => {
        return table && typeof table === "object" && !isEmptyDeep(table);
      };

      setTableData(isValidTable(filteredData) ? filteredData : null);
    }
  };

  const handlePDF = () => {
    setTableButton(false)
    setTableData(null);
    setSelectedTableKey(null); // reset tableKey
  };

  const handleTABLE = () => {
    setIframeSrc(""); // hide PDF
  };

  useEffect(() => {
    const formDataforLatest = selectedFilteredDocWithYear?.[0]?.formData;
    console.log("The form data for latest file:", formDataforLatest);

    if (
      selectedFilteredDocWithYear.length > 0 &&
      selectedFilteredDocWithYear[0]?.formData
    ) {
      const latestFileEntry = Object.entries(
        selectedFilteredDocWithYear[0].formData
      )
        .filter(([, entry]) => entry.file !== null && entry.file !== undefined) // Exclude null/undefined files
        .sort((a, b) => {
          const dateA = a[1].date ? new Date(a[1].date).getTime() : 0; // Convert to timestamp or default to 0
          const dateB = b[1].date ? new Date(b[1].date).getTime() : 0;
          return dateB - dateA; // Sort by latest date
        })[0]; // Get the latest entry

      if (latestFileEntry) {
        const [latestKey, latestData] = latestFileEntry as [
          FieldKey,
          FormField
        ];
        console.log("Latest FieldKey:", latestKey);
        console.log("Latest File:", latestData.file);
        setSelectedPdfKey(latestKey);
        handlePdfButtonClick(latestKey)
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
      console.log(" documents : ", documents);
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

  if (selectedFilteredDocWithYear) {
    console.log(
      "the selectedFilteredDocWithYear this is Importent data :",
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
                <div className="flex   mt-3  mr-4">
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

                <div className="flex  flex-col justify-center">
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
                    className="mt-2  flex justify-center  lg:justify-start rounded-lg text-xs"
                  >
                    {selectedFilteredDocWithYear.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={handlePDF}
                          className={`flex text-xs items-center justify-center text-[16px] px-2 py-1 rounded-md
                       ${
                         selectedTableKey
                           ? "bg-gray-200 text-black"
                           : selectedPdfKey
                           ? "bg-gray-600 text-white"
                           : "bg-gray-600 text-white"
                       }`}
                        >
                          PDF
                        </button>

                        {pdfKeys
                          .filter((key) =>
                            selectedFilteredDocWithYear.some(
                              (doc) => doc.formData[key]?.file // This checks for existence (not null/undefined/empty)
                            )
                          )
                          .map((key) => (
                            <div key={key} className="relative group">
                              <button
                                onClick={() =>
                                  handlePdfButtonClick(key as FieldKey)
                                }
                                className={`px-2 py-1 text-xs rounded-md transition-all duration-300 ${
                                  selectedPdfKey === key
                                    ? "bg-gray-600 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                                }`}
                              >
                                {userLanguage === "Arabic"
                                  ? keyTranslations[key].ar
                                  : keyTranslations[key].en}
                              </button>

                              {/* Tooltip */}
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
                  {selectedPdfKey &&
                    pdfKeys.includes(selectedPdfKey as keyof FormDataState) &&
                    selectedFilteredDocWithYear.some(
                      (doc) =>
                        doc.formData[selectedPdfKey as keyof FormDataState]
                          ?.table &&
                        Object.values(
                          doc.formData[selectedPdfKey as keyof FormDataState]
                            ?.table || {}
                        ).some(Boolean)
                    ) && (
                      <div
                        dir={userLanguage === "English" ? "ltr" : "rtl"}
                        className="mt-2 flex justify-center lg:justify-start rounded-lg text-xs"
                      >
                        {selectedFilteredDocWithYear.length > 0 && validTableKeys.length>0 &&tableButtonOn ? (
                          <div className="flex flex-wrap gap-2">
                            {/* Only shown if at least one valid table exists */}
                            <button
                              onClick={handleTABLE}
                              className={`flex text-xs items-center justify-center text-[16px] px-2 py-1 rounded-md
                                     ${
                                       selectedTableKey
                                         ? "bg-gray-600 text-white"
                                         : selectedPdfKey
                                         ? "bg-gray-300 text-gray-800"
                                         : "bg-gray-600 text-white"
                                     }`}
                            >
                              Table
                            </button>

                            {/* Table subkeys */}
                            {validTableKeys
                              .map((key) => (
                                <button
                                  key={key}
                                  onClick={() =>
                                    handleTableViewButtonClick(key)
                                  }
                                  className={`px-2 py-1 text-xs rounded-md ${
                                    selectedTableKey === key
                                      ? "bg-gray-600 text-white"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-300"
                                  }`}
                                >
                                  {key}
                                </button>
                              ))}
                          </div>
                        ) : (
                          <p className="text-center text-gray-600"></p>
                        )}
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="lg:w-[65%]">
        {table && selectedTableKey ? (
          <div
            className="h-[90vh] w-full overflow-y-auto pr-2"
            // You can adjust height as per layout needs
          >
            {language === "English" ? (
              <BalaceSheetFormUser Tabledata={table} />
            ) : (
              <BalanceSheetFormUserArabic Tabledata={table} />
            )}
          </div>
        ) : iframeSrc ? (
          <div
            className=""
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
          <div className="w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-white "></div>
        )}
      </div>
    </div>
  );
});

export default UserCompanyDetails;
