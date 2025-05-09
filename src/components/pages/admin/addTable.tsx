/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";

import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toPng } from 'html-to-image-no-fonts';
import toast from "react-hot-toast";
import { AdminAddTableAction } from "../../../reduxKit/actions/admin/addTableAction";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";

import BalaceSheet from "./Tables/BalanceSheet/balanceSheetAr";
import BalaceSheetFormAr from "./Tables/BalanceSheet/balanceSheet";
import { ITable } from "./Tables/BalanceSheet/interface";
import { FaTrash } from "react-icons/fa";

import { ConfirmationModalTable } from "./Tables/ConfirmationModalTable";
// import { DocumentSliceAr, DocumentSliceEn } from "../../../interfaces/admin/addDoument";

const AddNewTable = React.memo(() => {
  const preferredOrder = ["Board", "Year", "S1", "Q4", "Q3", "Q2", "Q1"];
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const TableTypeArr = ["BalanceSheet", "ProfitLoss", "CashFlow"];
  const { adminLanguage } = useSelector(
    (state: RootState) => state.adminLanguage
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTableType, setTableType] = useState("");
  // const [takeShotForProfitLoss, setTakeShotForProfitLoss] = useState<boolean>(false);
  // const [takeShotForCashFlow, setTakeShotForCashFlow] = useState<boolean>(false);
  const [tadawalCode, setTadawalCode] = useState("");
  const [nickName, setNickName] = useState("");
  const [fullName, setFullName] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [tableDataAr, setTableDataAr] = useState<ITable>();
  const [tableData, setTableData] = useState<ITable>();
  const [tableIframeSrc, setTableIframeSrc] = useState<string>("");
  const [tableIframeSrcAr, setTableIframeSrcAr] = useState<string>("");

  //   const [FormDocument, setDocument] = useState<DocumentSliceEn[] | DocumentSliceAr[]>();
  // const []=useState<>(null)
  const [years, setYears] = useState<string[]>([]); // List of years
  const [selectedYear, setSelectedYear] = useState("");
  const [quarterYear, setQuarterYear] = useState("");
  const [language, setLanguage] = useState<string | null>(null);
  const [quarters, setQuarters] = useState<{
    [key: string]: Array<{ quarter: string; date: string }>;
  }>({}); // Quarters and their dates for each year
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState<boolean>(false); // Manage year dropdown visibility
  const [isLoading, setIsLoading] = useState(false);
  const [takeShot, setTakeShot] = useState<boolean>(false);


  // const toggleLanguage = async () => {
  //   const newLanguage = adminLanguage === "English" ? "Arabic" : "English";
  //   await dispatch(AdminLanguageChange(newLanguage));
  // };

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update tableIframeSrc when selectedTableType or tableData changes
  useEffect(() => {
    if (selectedTableType) {
      const arSrc = tableDataAr?.[selectedTableType as keyof ITable] || "";
      const enSrc = tableData?.[selectedTableType as keyof ITable] || "";

      setTableIframeSrcAr(arSrc);
      setTableIframeSrc(enSrc);
    } else {
      setTableIframeSrcAr("");
      setTableIframeSrc("");
    }
  }, [selectedTableType, tableData, tableDataAr]);

  const captureData = async (language: string): Promise<void> => {
    if (language) {
      setLanguage(language);
    }
  
    const node =
      language === "Arabic"
        ? document.getElementById("capture-areaAr")
        : document.getElementById("capture-area");
  
    if (!node) return;
  
    setTakeShot(true);
  
    interface ElementStyleBackup {
      element: HTMLElement;
      overflow: string;
      height: string;
      maxHeight: string;
    }
  
    interface NodeStyleBackup {
      overflow: string;
      height: string;
      maxHeight: string;
      position: string;
      display: string;
    }
  
    const elementsToRestore: ElementStyleBackup[] = [];
    node.querySelectorAll("*").forEach((el: Element) => {
      const htmlEl = el as HTMLElement;
      elementsToRestore.push({
        element: htmlEl,
        overflow: htmlEl.style.overflow,
        height: htmlEl.style.height,
        maxHeight: htmlEl.style.maxHeight,
      });
  
      htmlEl.style.overflow = "visible";
      htmlEl.style.height = "auto";
      htmlEl.style.maxHeight = "none";
    });
  
    const originalNodeStyles: NodeStyleBackup = {
      overflow: node.style.overflow,
      height: node.style.height,
      maxHeight: node.style.maxHeight,
      position: node.style.position,
      display: node.style.display,
    };
  
    node.style.overflow = "visible";
    node.style.height = "auto";
    node.style.maxHeight = "none";
    node.style.position = "relative";
    node.style.display = "inline-block";
  
    try {
      // Wait for fonts to fully load
      await document.fonts.ready;
  
      // Allow styles to apply and force repaint
      await new Promise((resolve) => setTimeout(resolve, 500));
      window.dispatchEvent(new Event("resize"));
  
      const nodeRect = node.getBoundingClientRect();
  
      const dataUrl: string = await toPng(node, {
        height: Math.max(node.scrollHeight, nodeRect.height),
        width: Math.max(node.scrollWidth, nodeRect.width),
        quality: 1.0,
        cacheBust: true,
        skipAutoScale: true,
        style: {
          transform: "none",
        },
        filter: (node: Node): boolean => {
          return !(
            node instanceof HTMLElement &&
            node.classList?.contains("no-capture")
          );
        },
        pixelRatio: 2,
      } as any);
      
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const screenshotFile = new File([blob], "screenshot.png", {
        type: "image/png",
      });
  
      const responseTow = await dispatch(
        AdminAddTableAction({
          tadawalCode,
          screenshotFile,
          selectedYear,
          quarterYear,
          selectedTableType,
          language,
        })
      );
  
      console.log("Response from ADDTABLE:", responseTow);
  
      if (responseTow.payload?.success === true) {
        toast.success(responseTow.payload.message);
  
        if (language === "Arabic" && tableDataAr) {
          setTableDataAr({
            ...tableDataAr,
            [selectedTableType]: responseTow.payload.url || "",
          });
        } else if (language === "English" && tableData) {
          setTableData({
            ...tableData,
            [selectedTableType]: responseTow.payload.url || "",
          });
        }
      }
  
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      elementsToRestore.forEach((item) => {
        item.element.style.overflow = item.overflow;
        item.element.style.height = item.height;
        item.element.style.maxHeight = item.maxHeight;
      });
  
      node.style.overflow = originalNodeStyles.overflow;
      node.style.height = originalNodeStyles.height;
      node.style.maxHeight = originalNodeStyles.maxHeight;
      node.style.position = originalNodeStyles.position;
      node.style.display = originalNodeStyles.display;
  
      setTimeout(() => setTakeShot(false), 200);
    }
  };
  
  
  const handleYearSelect = (year: string) => {
    setSelectedYear(year);
    console.log("Selected Year:", year);
  };

  const handleQuarterYear = async (quarter: string) => {
    await setQuarterYear(quarter);
    console.log("Selected Quarter", quarter);
  };

  const handleNickNameChanges = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setTadawalCode(value);

    if (value.length > 0) {
      // Fetch suggestions only if input has 3 or more characters
      setIsLoading(true);
      try {
        const adminLanguage = "Arabic";
        const response = await commonRequest(
          "GET",
          `/api/v1/admin/tadawalCodeSuggestions?name=${value}&language=${adminLanguage}`,
          config,
          {}
        );
        setSuggestions(response.data.suggestions || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = async (suggestion: string) => {
    const adminLanguage = "English";
    const response = await commonRequest(
      "GET",
      `/api/v1/admin/getDataWithSuggestionsForTable?name=${suggestion}&language=${adminLanguage}`,
      config,
      {}
    );
    const mydata = response.data.data;
    console.log("Tadawal code response:", mydata);
    // setDocument(mydata)
    setTadawalCode(mydata[0].tadawalCode);
    setNickName(mydata[0].nickNameEn);
    setFullName(mydata[0].fullNameEn);
    setSuggestions([]); // Clear suggestions after selecting one

    // Extract years and quarters from formData
    const yearsSet = new Set<string>();
    const quartersMap: {
      [key: string]: Array<{ quarter: string; date: string }>;
    } = {};

    mydata.forEach((doc: any) => {
      const formData = doc.formData;
      Object.keys(formData).forEach((key) => {
        if (formData[key].year) {
          yearsSet.add(formData[key].year);
          if (!quartersMap[formData[key].year]) {
            quartersMap[formData[key].year] = [];
          }
          if (formData[key].date) {
            quartersMap[formData[key].year].push({
              quarter: key,
              date: new Date(formData[key].date).toLocaleDateString(), // Format date
            });
          }
        }
      });
    });

    const dataArray = Array.from(yearsSet);
    let largestYear = dataArray[0];

    for (const x of dataArray) {
      if (x > largestYear) {
        largestYear = x;
      }
    }

    setSelectedYear(largestYear);

    setYears(dataArray);

    const datanew = quartersMap[largestYear];
    const selectedData = preferredOrder
      .map((priority) => datanew.find((x) => x.quarter === priority))
      .find(Boolean); // returns the first non-undefined match

    console.log("Selected data:", selectedData);
    // console.log("the quater sist the data : ",quartersMap,datanew);
    if (selectedData) {
      setQuarterYear(selectedData.quarter);
      setTableType("BalanceSheet");
    }

    // if(tableIframeSrc||tableIframeSrcAr){}

    setQuarters(quartersMap);
    // setIsDropdownOpen(true); // Open the year dropdown
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsYearDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (adminLanguage) setLanguage(adminLanguage);
  }, [adminLanguage]);

  // useEffect(() => {
  //   console.log("kunana data ", tableDataAr, "dkjfjfjfjfjfjfjfjfjfjfjfjfjfjfjfjfjfjfjfjfjfjfjf", tableData);
  // }, [tableData, tableDataAr]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await commonRequest(
          "GET",
          `/api/v1/admin/getDataWithYear/Quarter/tadawalCodeForTableView?year=${selectedYear}&quarterYear=${quarterYear}&tadawulCode=${tadawalCode}`,
          config,
          {}
        );
        setTableDataAr(response.data.arabicTable);
        setTableData(response.data.englishTable);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedYear, quarterYear, tadawalCode]);

  const handleDeleteTable = async (wlanguage: string | null) => {
    if (
      !wlanguage ||
      !tadawalCode ||
      !quarterYear ||
      !selectedTableType ||
      !selectedYear
    ) {
      console.log(
        "my Kunna Delete  : ",
        wlanguage,
        tadawalCode,
        quarterYear,
        selectedTableType,
        selectedYear
      );
      toast.error(
        "Required Fields are Missing : You Must Have Select : TadawulCode,Report,TableType,Year"
      );
      setModalOpen(false);
      return;
    }
    console.log("the delete language now : ", wlanguage);
    
    
    try {
      await commonRequest(
        "DELETE",
        `/api/v1/admin/deleteTable/${tadawalCode}?language=${wlanguage}&quarterYear=${quarterYear}&selectedTableType=${selectedTableType}&selectedYear=${selectedYear}`,
        config
      );

      toast.success("Document Successfully Deleted");
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete document:", error);
    } finally {
      setModalOpen(false);
    }
  };

  const renderTableContent = () => {
    // Case 1: Both English and Arabic tables exist
    if (tableIframeSrc && tableIframeSrcAr) {
      return (
        <div className="flex flex-col lg:flex-row lg:justify-start ">
          {/* Left side - English table */}
          <div className="w-1/2">
            <div className="pointer-events-none">
              <img
                src={tableIframeSrc}
                alt="English Table"
                style={{ width: "100%", height: "auto" }}
                className="select-none"
              />
            </div>
          </div>
          {/* Right side - Arabic table */}
          <div className="w-1/2">
            <div className="pointer-events-none">
              <img
                src={tableIframeSrcAr}
                alt="Arabic Table"
                style={{ width: "100%", height: "auto" }}
                className="select-none"
              />
            </div>
          </div>
        </div>
      );
    }
    // Case 2: Only English table exists
    else if (tableIframeSrc && !tableIframeSrcAr) {
      return (
        <div className="flex flex-col lg:flex-row lg:justify-center  ">
      
          <div className="w-full lg:w-1/2 overflow-x-auto">
            <div className="pointer-events-none">
              <img
                src={tableIframeSrc} 
                alt="English Table"
                style={{ width: "100%", height: "auto" }}
                className="select-none"
              />
            </div>
          </div>
          {/* Right side - Arabic form */}
          <div className="w-full lg:w-1/2 overflow-x-auto">
            <form>
              <div className="">
                <div id="capture-areaAr" className="">
                  <BalaceSheet TakingShort={takeShot} />
                </div>
                <div className=" flex justify-start">
                  <button
                    className="bg-slate-300 rounded text-black py-1 px-5 hover:bg-slate-400 font-semibold mx-2 font-serif text-sm"
                    onClick={() => captureData("Arabic")}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "   رفع..." : " رفع"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }





















    // Case 3: Only Arabic table exists
    else if (!tableIframeSrc && tableIframeSrcAr) {
      return (
        <div className="flex flex-col lg:flex-row lg:justify-center ">
          {/* Left side - English form */}
          <div className="w-full lg:w-1/2">
            <form>
              <div id="capture-area" className="">
                <BalaceSheetFormAr TakingShort={takeShot} />
              </div>
              <div className=" flex justify-end">
                <button
                  className="bg-slate-300 rounded text-black py-1 px-5 hover:bg-slate-400 font-semibold mx-2 font-serif text-sm"
                  onClick={() => captureData("English")}
                  disabled={takeShot}
                  type="button"
                >
                  {takeShot ? "Submiting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
          {/* Right side - Arabic table */}
          <div className="w-1/2">
            <div className="pointer-events-none">
              <img
                src={tableIframeSrcAr}
                alt="Arabic Table"
                style={{ width: "100%", height: "auto" }}
                className="select-none"
              />
            </div>
          </div>
        </div>
      );
    }
  























    else {
      return (
        <div className="flex justify-center flex-col lg:flex-row  gap-1   ">
          {/* Arabic Form */}

          <div className=" ">
            <form>
              <div id="capture-area" className="">
                <BalaceSheetFormAr TakingShort={takeShot} />
              </div>
              <div className=" flex justify-end">
                <button
                  className="bg-slate-300 rounded text-black py-1 px-5 hover:bg-slate-400 font-semibold mx-2 font-serif text-sm"
                  onClick={() => captureData("English")}
                  disabled={takeShot}
                  type="button"
                >
                  {takeShot ? "Submiting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>





          {/* English Form */}
          <div className="  ">
            <form>
              <div className="">
                <div id="capture-areaAr" className="">
                  <BalaceSheet TakingShort={takeShot} />
                </div>
                <div className=" flex justify-start">
                  <button
                    className="bg-slate-300 rounded text-black py-1 px-9  hover:bg-slate-400 font-semibold mx-2 font-serif text-sm"
                    onClick={() => captureData("Arabic")}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "   رفع..." : " رفع"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }
  };
 









  return (
    <div className="p-1">
      <div className="flex flex-wrap justify-between items-center">
        <FaArrowCircleLeft
          className="text-3xl text-gray-500"
          onClick={() => navigate("/home")}
        />
        <h1 className="text-lg font-bold text-black">
          {fullName}
          {nickName && (
            <span className="text-sm font-medium text-gray-600 ml-1">
              ({nickName})
            </span>
          )}
        </h1>

        <div className="flex gap-3 items-center ">
          {/* <button
            onClick={toggleLanguage}
            className=" hover:scale-105   transition-transform duration-300 ease-in-out  items-center text-2xl hover:   bg-opacity-80"
          >
            <GrLanguage className=" text-gray-700" />
          </button> */}
          {/* </button> */}
          <h4 className="text-2xl md:text-2xl font-bold text-gray-700">
            {language === "Arabic"
              ? "تقرير القوائم المالية"
              : "Financial Statement Report"}
          </h4>
        </div>
      </div>

      {/* Main Section Controls */}

      <div className="flex flex-wrap items-start mt-1 gap-4 text-sm text-gray-700 font-semibold">
        {/* Tadawal Code Input + Suggestions */}
        <div className="relative  ">
          <label className="block mb-1">Tadawul Code</label>
          <input
            className="p-1 w-44 bg-gray-100 text-black border rounded focus:outline-none focus:bg-white"
            type="text"
            placeholder="Tadawul Code"
            value={tadawalCode}
            required
            name="nickName"
            onChange={handleNickNameChanges}
          />

          {/* Loading */}
          {isLoading && (
            <p className="flex items-center text-xs font-serif text-gray-600 mt-1">
              <svg
                className="animate-spin h-4 w-4 mr-2 text-gray-500"
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
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              Loading suggestions...
            </p>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-44 mt-1 border border-gray-300 bg-white rounded max-h-40 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-1 text-xs cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    handleSuggestionClick(suggestion);
                    setSuggestions([]); // Hide suggestions after selection
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Year Dropdown */}
        {years.length > 0 && (
          <div className="relative" ref={dropdownRef}>
            <label className="block mb-1">Year</label>
            <div
              className="p-1 w-44 border bg-white text-black border-gray-300 rounded shadow-sm cursor-pointer"
              onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
            >
              {selectedYear || "Select a year"}
            </div>

            {isYearDropdownOpen && (
              <div className="absolute z-10 mt-1 w-44 bg-white border border-gray-300 rounded-md shadow-lg">
                {years.map((year) => (
                  <div
                    key={year}
                    className="p-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      handleYearSelect(year);
                      setIsYearDropdownOpen(false); // Close after select
                    }}
                  >
                    {year}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quarter Section */}
        {selectedYear && quarters[selectedYear] && (
          <div>
            <label className="block mb-1">Report</label>
            <select
              className="p-1 w-44 border border-gray-300 bg-white text-black rounded"
              value={quarterYear || ""}
              onChange={(e) => {
                handleQuarterYear(e.target.value);
              }}
            >
              <option value="" disabled>
                Select Quarter
              </option>
              {quarters[selectedYear].map((item) => (
                <option key={item.quarter} value={item.quarter}>
                  {item.quarter}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Table Type Dropdown */}
        {selectedYear && (
          <div>
            <label className="block mb-1">Table Type</label>
            <select
              className="p-1 w-44 border border-gray-300 bg-slate-200 text-black rounded"
              id="tableType"
              value={selectedTableType || ""}
              onChange={(e) => setTableType(e.target.value)}
            >
              <option value="" disabled>
                Select Table Type
              </option>
              {TableTypeArr.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}
         <div className="flex gap-3 place-items-center justify-end p-1 mt-5 ">
        {" "}
        <div className="">
          {" "}
          <FaTrash
            onClick={() => {
              setLanguage("English");
              setModalOpen(true);
            }}
            className="text-xl  text-gray-600"
          />
        </div>
        <div className="">
          {" "}
          <FaTrash
            onClick={() => {
              setLanguage("Arabic");
              setModalOpen(true);
            }}
            className="text-xl  text-gray-600"
          />
         
        </div>{" "}
      </div>
      </div>
     
      <ConfirmationModalTable
        isOpen={modalOpen}
        onConfirm={async () => await handleDeleteTable(language)}
        onCancel={() => setModalOpen(false)}
      />
      {renderTableContent()}
    </div>
  );
});

export default AddNewTable;
