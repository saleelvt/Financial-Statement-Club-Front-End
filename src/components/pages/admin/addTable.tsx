/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";

import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import toast from "react-hot-toast";
import { AdminAddTableAction } from "../../../reduxKit/actions/admin/addTableAction";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import BalaceSheet from "./Tables/BalanceSheet/balanceSheet";
import BalanceSheetFormUser from "../user/Tables/balanceSheet"
import BalanceSheetFormUserArabic from "../user/Tables/balanceSheetAr"


import BalaceSheetFormAr from "./Tables/BalanceSheet/balanceSheetAr";
import { ITable } from "./Tables/BalanceSheet/interface";
import { FaTrash } from "react-icons/fa";
import { ConfirmationModalTable } from "./Tables/ConfirmationModalTable";
// import { DocumentSliceAr, DocumentSliceEn } from "../../../interfaces/admin/addDoument";

const AddNewTable = React.memo(() => {
  const preferredOrder = ["Board", "Year", "S1", "Q4", "Q3", "Q2", "Q1"];
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const TableTypeArr = ["BalanceSheet", "ProfitLoss", "CashFlow"];
  const { adminLanguage } = useSelector(  (state: RootState) => state.adminLanguage);
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
  const [tableEn, setTableEn] = useState<any>(null); 
  const [tableAr, setTableAr] = useState<any>(null);

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
  const {data}=useSelector((state:RootState)=>state.table)
  const {dataAr}=useSelector((state:RootState)=>state.tableAr)

  
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Update tableIframeSrc when selectedTableType or tableData changes
  useEffect(() => {
    if (selectedTableType) {
      const arTable = tableDataAr?.[selectedTableType as keyof ITable] ;
      const enTable = tableData?.[selectedTableType as keyof ITable] ;
      setTableAr(arTable);
      setTableEn(enTable);
    } else {
      setTableAr(null);
      setTableEn(null);
    }
  }, [selectedTableType, tableData, tableDataAr]);



  useEffect(()=>{
    console.log("the tables : in frontend :",tableAr,"then the console data is the data : ",tableEn);
    

  },[tableEn,tableAr])



  const handleClickEnglish= async()=>{

    try {
      setTakeShot(true )
        const Language = "English";
    // create data object
    const dataforUpload = {
      tadawalCode:tadawalCode, // replace with actual value
      language: Language,
      data: data, // replace with actual data
      selectedYear:selectedYear,
      quarterYear: quarterYear,
      selectedTableType: selectedTableType,
    };
     console.log("MY utherPradhesh Data id 66^^^^^^^^^^^^^^^^^^^^^: ",data);
     
      const response = await dispatch(AdminAddTableAction(dataforUpload))
      console.log("the english data the Values are  submiting : ", response);
        setTakeShot(false )
      
    } catch (error) {
      console.log("the table adding error is : ", error );
      
    }


  }


  const handleClickArabic= async()=>{

    try {
      setTakeShot(true )
        const Language = "Arabic";
    // create data object
    const dataforUpload = {
      tadawalCode:tadawalCode, // replace with actual value
      language: Language,
      data: dataAr, // replace with actual data
      selectedYear:selectedYear,
      quarterYear: quarterYear,
      selectedTableType: selectedTableType,
    };
     console.log("MY Saudi Arabic Data",dataAr);
      const response = await dispatch(AdminAddTableAction(dataforUpload))
      console.log("the Arabic after   submited Response : ", response);
        setTakeShot(false )
      
    } catch (error) {
      console.log("the table adding error is : ", error );
      
    }


  }

 
























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
    const selectedData = preferredOrder .map((priority) => datanew.find((x) => x.quarter === priority)) .find(Boolean); // returns the first non-undefined match
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
    if (tableEn && tableAr) {
      return (
        <div className="flex flex-col lg:flex-row lg:justify-start ">
          {/* Left side - English table */}
          <div className="w-1/2">
               <BalanceSheetFormUser Tabledata={tableEn} />

          </div>
          {/* Right side - Arabic table */}
          <div className="w-1/2">
             <BalanceSheetFormUserArabic Tabledata={tableAr} />
          </div>
        </div>
      );
    }
    // Case 2: Only English table exists
    else if (tableEn && !tableAr) {
      return (
        <div className="flex flex-col lg:flex-row lg:justify-center  ">
      
          <div className="w-full lg:w-1/2 overflow-x-auto">
            {/* <div className="pointer-events-none">
              <img
                src={tableIframeSrc} 
                alt="English Table"
                style={{ width: "100%", height: "auto" }}
                className="select-none"
              />
            </div> */}

            <BalanceSheetFormUser Tabledata={tableEn} />

          </div>
          {/* Right side - Arabic form */}
          <div className="w-full lg:w-1/2 overflow-x-auto">
            <form>
              <div className="">
                <div className="">
                  <BalaceSheetFormAr TakingShort={takeShot} />
                </div>
                <div className=" flex justify-start">
                  <button
                    className="bg-slate-300 rounded text-black py-1 px-5 hover:bg-slate-400 font-semibold mx-2 font-serif text-sm"
                   
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
    else if (!tableEn && tableAr) {
      return (
        <div className="flex flex-col lg:flex-row lg:justify-center ">
          <div className="w-full lg:w-1/2">
            <form>
              <div id="capture-area" className="">  
                <BalaceSheet TakingShort={takeShot} />
              </div>
              <div className=" flex justify-end">
                <button
                  className="bg-slate-300 rounded text-black py-1 px-5 hover:bg-slate-400 font-semibold mx-2 font-serif text-sm"
                
                  disabled={takeShot}
                  type="button"
                >
                  {takeShot ? "Submiting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
          <div className="w-1/2">
        <BalanceSheetFormUserArabic Tabledata={tableAr} />
            {/* <div className="pointer-events-none">
              <img
                src={tableIframeSrcAr}
                alt="Arabic Table"
                style={{ width: "100%", height: "auto" }}
                className="select-none"
              />
            </div> */}
          </div>
        </div>
      );
    }
  












































    else {
      return (
        <div className="flex justify-center  bg-yellow-100  flex-col lg:flex-row  gap-1   ">
          {/* Arabic Form */}

          <div className="">
            <form>
              <div className="">
                <BalaceSheet TakingShort={takeShot} />
              </div>
              <div className=" flex justify-end">
                <button
                  className="bg-slate-300 rounded text-black py-1 px-5 hover:bg-slate-400 font-semibold mx-2 font-serif text-sm"
                  onClick={handleClickEnglish}
                  disabled={takeShot}
                  type="button"
                >
                  {takeShot ? "Submiting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
          {/* English Form */}
          <div className="">
            <form>
              <div className="">
                <div  className="">
                  <BalaceSheetFormAr TakingShort={takeShot} />
                </div>
                <div className=" flex justify-start">
                  <button
                    className="bg-slate-300 rounded text-black py-1 px-9  hover:bg-slate-400 font-semibold mx-2 font-serif text-sm"
              onClick={handleClickArabic}
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
