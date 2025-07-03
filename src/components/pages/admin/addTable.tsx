/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";

import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AdminAddTableAction } from "../../../reduxKit/actions/admin/addTableAction";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";


import { ITable } from "./Tables/BalanceSheet/interface";
import BalaceSheet from "./Tables/BalanceSheet/balanceSheet";
import BalaceSheetFormAr from "./Tables/BalanceSheet/balanceSheetAr";
import BalanceSheetFormUser from "../user/Tables/balanceSheet";
import BalanceSheetFormUserArabic from "../user/Tables/balanceSheetAr";
import BalaceSheetUpdateFormArabic from "../admin/Tables/BalanceSheetUpdate/balanceSheetUpdateAr";
import BalaceSheetUpdateFormEnglish from "../admin/Tables/BalanceSheetUpdate/balanceSheetUpdateEn";

import CashFlowUserArabic from "../user/Tables/cashFlow/cashFlowAr";
import CashFlowUserEnglish from "../user/Tables/cashFlow/cashFlowEn";
import CashFlowFormEn from "./Tables/cashFlow/cashFlowEn";
import CashFlowFormAr from "./Tables/cashFlow/cashFlowAr";
import CashFlowUpdateFormAr from "./Tables/updateCashFlow/updateCashFlowAr";
import CashFlowUpdateFormEn from "./Tables/updateCashFlow/updateCashFlowEn";



import ProfitLossFormEn from "./Tables/ProfitLoss/addProfitLossEn";
import ProfitLossFormAr from "./Tables/ProfitLoss/addProfitLossAr";
import ProfitLossUserArabic from "../user/Tables/cashFlow/cashFlowAr";
import ProfitLossUserEnglish from "../user/Tables/cashFlow/cashFlowEn";
import ProfitLossUpdateFormAr from "./Tables/updateProfitLoss/updateProfitLossAr";
import ProfitLossUpdateFormEn from "./Tables/updateProfitLoss/updateProfitLossEn";

import { ConfirmationModalTable } from "./modals/ConfirmationModalTable";
import { ConfirmationUpdateModalTable } from "./modals/updateConfirmationModalTable";
import ValidationModal from "./modals/validationModal";

const AddNewTable = React.memo(() => {
  const preferredOrder = ["Board", "Year", "S1", "Q4", "Q3", "Q2", "Q1"];
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const TableTypeArr = ["BalanceSheet", "ProfitLoss", "CashFlow"];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedTableType, setTableType] = useState("");

  const [tadawalCode, setTadawalCode] = useState("");
  const [nickName, setNickName] = useState("");
  const [fullName, setFullName] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [tableDataAr, setTableDataAr] = useState<ITable>();
  const [tableData, setTableData] = useState<ITable>();

  const [tableEn, setTableEn] = useState<any>(null);
  const [tableAr, setTableAr] = useState<any>(null);
  const [tableCashFlowEn, setTableCashFlowEn] = useState<any>(null);
  const [tableCashFlowAr, setTableCashFlowAr] = useState<any>(null);
  const [tableProfitLossEn, setTableProfitLossEn] = useState<any>(null);
  const [tableProfitLossAr, setTableProfitLossAr] = useState<any>(null);


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
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showToastAr, setShowToastAr] = useState<boolean>(false);
  //  const [showUpdateToast, setShowUpdateToast] = useState<boolean>(false);
  //   const [showUpdateToastAr, setShowUpdateToastAr] = useState<boolean>(false);
  const [showDeleteToast, setShowDeleteToast] = useState<boolean>(false);
  const [showDeleteToastAr, setShowDeleteToastAr] = useState<boolean>(false);

  const [updateActiveAr, setUpdateAr] = useState<boolean>(false);
  const [updateActiveEn, setUpdateEn] = useState<boolean>(false);
  
  const { data } = useSelector((state: RootState) => state.table);
  const { dataAr } = useSelector((state: RootState) => state.tableAr);
  const { cashFlowDataEn } = useSelector( (state: RootState) => state.cashFlowEn);
  const { cashFlowDataAr } = useSelector(  (state: RootState) => state.cashFlowAr );
  const {ProfitLossDataEn}=useSelector((state:RootState)=>state.profitLossEn)
  const {ProfitLossDataAr}=useSelector((state:RootState)=>state.profitLossAr)

  const dropdownRef = useRef<HTMLDivElement>(null);



    useEffect(()=>{
      console.log("the English active botton oned : ",updateActiveEn);
    },[updateActiveEn])
    useEffect(()=>{
      console.log("the ARabic  active bottonAr oned : ",updateActiveAr);
    },[updateActiveAr])



  // Update tableIframeSrc when selectedTableType or tableData changes
  useEffect(() => {
    console.log("The Latest Data set of the Data: English : +++:", data);
    console.log(" The Latest Data set of the Data: Arabic : &&&:", dataAr);
  }, [data, dataAr]);
  useEffect(() => {
    console.log("The Latest Cash Flow English ", cashFlowDataEn);
    console.log(" The Latest Cash Flow Arabic", cashFlowDataAr);
  }, [cashFlowDataEn, cashFlowDataAr]);


  useEffect(() => {
    if (selectedTableType === "BalanceSheet") {
      const arTable = tableDataAr?.[selectedTableType as keyof ITable];
      const enTable = tableData?.[selectedTableType as keyof ITable];
      const isEmptyDeep = (obj: any): boolean => {
        if (!obj || typeof obj !== "object") return true;
        if (Array.isArray(obj)) return obj.length === 0;
        return Object.values(obj).every((value) => isEmptyDeep(value));
      };
      const isValidTable = (table: any) => {
        return table && typeof table === "object" && !isEmptyDeep(table);
      };
      setTableAr(isValidTable(arTable) ? arTable : null);
      setTableEn(isValidTable(enTable) ? enTable : null);
    } else {
      setTableAr(null);
      setTableEn(null);
    }
    if (selectedTableType === "CashFlow") {
      const arTableCashFlow = tableDataAr?.[selectedTableType as keyof ITable];
      const enTableCashFlow = tableData?.[selectedTableType as keyof ITable];

      const isEmptyDeep = (obj: any): boolean => {
        if (!obj || typeof obj !== "object") return true;
        if (Array.isArray(obj)) return obj.length === 0;

        return Object.values(obj).every((value) => isEmptyDeep(value));
      };
      const isValidTable = (table: any) => {
        return table && typeof table === "object" && !isEmptyDeep(table);
      };
      setTableCashFlowAr(
        isValidTable(arTableCashFlow) ? arTableCashFlow : null
      );
      setTableCashFlowEn(
        isValidTable(enTableCashFlow) ? enTableCashFlow : null
      );
    } else {
      setTableCashFlowAr(null);
      setTableCashFlowEn(null);
    }
     if (selectedTableType === "ProfitLoss") {
      const arTableProfitLoss = tableDataAr?.[selectedTableType as keyof ITable];
      const enTableProfitLoss = tableData?.[selectedTableType as keyof ITable];

      const isEmptyDeep = (obj: any): boolean => {
        if (!obj || typeof obj !== "object") return true;
        if (Array.isArray(obj)) return obj.length === 0;

        return Object.values(obj).every((value) => isEmptyDeep(value));
      };
      const isValidTable = (table: any) => {
        return table && typeof table === "object" && !isEmptyDeep(table);
      };
      setTableProfitLossAr(
        isValidTable(arTableProfitLoss) ? arTableProfitLoss : null
      );
      setTableProfitLossEn(
        isValidTable(enTableProfitLoss) ? enTableProfitLoss : null
      );
    } else {
      setTableProfitLossAr(null);
      setTableProfitLossEn(null);
    }
  }, [selectedTableType, tableData, tableDataAr]);
const handleClickEnglish = async () => {
  try {
    const Language = "English";

    if (
      !Language ||
      !tadawalCode ||
      !quarterYear ||
      !selectedTableType ||
      !selectedYear
    ) {
      setErrorMessage(
        "Required Fields are Missing : You Must Have Select : TadawulCode,Report,TableType,Year"
      );
      setIsModalOpen(true);
      setModalOpen(false);
      return;
    }

    setTakeShot(true);

    // Determine the correct data based on selectedTableType
    let selectedData;
    if (selectedTableType === "BalanceSheet") {
      selectedData = data;
    } else if (selectedTableType === "ProfitLoss") {
      selectedData = ProfitLossDataEn;
    } else if (selectedTableType === "CashFlow") {
      selectedData = cashFlowDataEn;
    } else {
      setErrorMessage("Invalid Table Type Selected");
      setIsModalOpen(true);
      setTakeShot(false);
      return;
    }

    const dataforUpload = {
      tadawalCode: tadawalCode,
      language: Language,
      data: selectedData,
      selectedYear: selectedYear,
      quarterYear: quarterYear,
      selectedTableType: selectedTableType,
    };

    const response = await dispatch(AdminAddTableAction(dataforUpload));
    console.log(" submiting : ", response);

    if (response.payload.success) {
      setShowToast(true);
      setTakeShot(false);

      if (updateActiveEn) {
        fetchData();
      }

      setUpdateEn(false);
      setTimeout(() => {
        setShowToast(false);
      }, 30000);
    }
  } catch (error) {
    console.log("the table adding error is : ", error);
  }
};

const handleClickArabic = async () => {
  try {
    const Language = "Arabic";

    if (
      !Language ||
      !tadawalCode ||
      !quarterYear ||
      !selectedTableType ||
      !selectedYear
    ) {
      setErrorMessage(
        "Required Fields are Missing : You Must Have Select : TadawulCode,Report,TableType,Year"
      );
      setIsModalOpen(true);
      setModalOpen(false);
      return;
    }

    setTakeShot(true);

    // Determine correct Arabic table data based on selectedTableType
    let selectedDataAr;
    if (selectedTableType === "BalanceSheet") {
      selectedDataAr = dataAr;
    } else if (selectedTableType === "ProfitLoss") {
      selectedDataAr = ProfitLossDataAr;
    } else if (selectedTableType === "CashFlow") {
      selectedDataAr = cashFlowDataAr;
    } else {
      setErrorMessage("Invalid Table Type Selected");
      setIsModalOpen(true);
      setTakeShot(false);
      return;
    }

    const dataforUpload = {
      tadawalCode: tadawalCode,
      language: Language,
      data: selectedDataAr,
      selectedYear: selectedYear,
      quarterYear: quarterYear,
      selectedTableType: selectedTableType,
    };

    const response = await dispatch(AdminAddTableAction(dataforUpload));
    console.log("the Arabic after submitted Response: ", response);

    if (response.payload.success) {
      setShowToastAr(true);
      setTakeShot(false);

      if (updateActiveAr) {
        fetchData();
      }

      setUpdateAr(false);

      setTimeout(() => {
        setShowToastAr(false); // Hide toast after 3 seconds
      }, 30000);
    }
  } catch (error) {
    console.log("the table adding error is : ", error);
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

  // 1. Define fetchData outside useEffect
  const fetchData = async () => {
    try {
      const response = await commonRequest(
        "GET",
        `/api/v1/admin/getDataWithYear/Quarter/tadawalCodeForTableView?year=${selectedYear}&quarterYear=${quarterYear}&tadawulCode=${tadawalCode}`,
        config,
        {}
      );
      console.log("English Table Response:", response.data.englishTable);
      console.log("Arabic Table Response:", response.data.arabicTable);
      setTableDataAr(response.data.arabicTable);
      setTableData(response.data.englishTable);
    } catch (error) {
      console.log(error);
    }
  };

  // 2. useEffect still uses fetchData
  useEffect(() => {
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
      setErrorMessage(
        "Required Fields are Missing : You Must Have Select : TadawulCode,Report,TableType,Year"
      );
      setIsModalOpen(true);
      setModalOpen(false);
      return;
    }
    try {
      const response = await commonRequest(
        "DELETE",
        `/api/v1/admin/deleteTable/${tadawalCode}?language=${wlanguage}&quarterYear=${quarterYear}&selectedTableType=${selectedTableType}&selectedYear=${selectedYear}`,
        config
      );
      console.log("resppos da : ", response);

      if (response.data.success) {
        if (wlanguage === "English") {
          setUpdateEn(false);
          setTableEn(null);
          setShowDeleteToast(true);
          setTimeout(() => {
            setShowDeleteToast(false);
          }, 30000); // 30 seconds
        } else {
          setUpdateAr(false);
          setTableAr(null);
          setShowDeleteToastAr(true);
          setTimeout(() => {
            setShowDeleteToastAr(false);
          }, 30000); // 30 seconds
        }
      }
    } catch (error) {
      console.error("Failed to delete document:", error);
    } finally {
      setModalOpen(false);
    }
  };



const handleUpdateTable = async (wlanguage: string | null) => {
  if (
    !wlanguage ||
    !tadawalCode ||
    !quarterYear ||
    !selectedTableType ||
    !selectedYear
  ) {
    setErrorMessage(
      "Required Fields are Missing : You Must Have Select : TadawulCode,Report,TableType,Year"
    );
    setModalOpen(false);
    return;
  }
  setUpdateModalOpen(false);
  try {
    
    if (wlanguage === "English" && (tableEn || tableCashFlowEn)) {
      setUpdateEn(true);
      setUpdateAr(false); // Ensure Arabic is false when English is selected
    } else if (wlanguage === "Arabic" && (tableAr || tableCashFlowAr)) {
      setUpdateAr(true);
      setUpdateEn(false); // Ensure English is false when Arabic is selected
    } else {
      // Neither condition met - reset both
      setUpdateEn(false);
      setUpdateAr(false);
    }
    return;
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
        <div className="flex flex-col lg:flex-row mb-8 w-screen  lg:justify-center ">
          <div className="">
            {updateActiveEn && tableEn ? (
              <BalaceSheetUpdateFormEnglish TableDataEn={tableEn} />
            ) : (
              <BalanceSheetFormUser Tabledata={tableEn} />
            )}

            <div className="flex justify-between">
              <div className="items-start">
                <div className="items-start">
                  {showDeleteToast && (
                    <div className="absolute left-13 text-xs bg-green-100 border border-green-400 text-green-700 px-10  py-1 font-semibold rounded shadow">
                      Delete Successfully :{" "}
                      {`${nickName},${selectedYear},${quarterYear},${selectedTableType}`}
                    </div>
                  )}
                  {showToast && (
                    <div className="absolute left-13 text-xs bg-green-100 border border-green-400 text-green-700 px-10  py-1 font-semibold rounded shadow">
                      Updated Successfully :{" "}
                      {`${nickName},${selectedYear},${quarterYear},${selectedTableType}`}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                {updateActiveEn && tableEn ? (
                  <button
                    className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                    onClick={handleClickEnglish}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "Submitting..." : "Submit"}
                  </button>
                ) : !showToast ? (
                  <>
                    <button
                      className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                      onClick={() => {
                        setLanguage("English");
                        setUpdateModalOpen(true);
                      }}
                      disabled={takeShot}
                      type="button"
                    >
                      {takeShot ? "Editing..." : "Edit"}
                    </button>
                    <button
                      className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                      onClick={() => {
                        setLanguage("English");
                        setModalOpen(true);
                      }}
                      disabled={takeShot}
                      type="button"
                    >
                      {takeShot ? "Deleting..." : "Delete"}
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <div className="  ">
            {updateActiveAr && tableAr ? (
              <BalaceSheetUpdateFormArabic TableDataAr={tableAr} />
            ) : (
              <BalanceSheetFormUserArabic Tabledata={tableAr} />
            )}
            <div className="">
              {updateActiveAr && tableAr ? (
                <button
                  className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                  onClick={handleClickArabic}
                  disabled={takeShot}
                  type="button"
                >
                  {takeShot ? "   رفع..." : " رفع"}
                </button>
              ) : (
                <>
                  <div className="   flex justify-end ">
                    {showToastAr && (
                      <div className="absolute text-xs  bg-green-100 border border-green-400 text-green-700 px-12 py-1 font-semibold rounded shadow">
                        {`${nickName},${selectedYear},${quarterYear},${selectedTableType} : `}
                        تم تحديث بنجاح
                      </div>
                    )}
                    {showDeleteToastAr && (
                      <div className="absolute text-xs  bg-green-100 border border-green-400 text-green-700 px-12 py-1 font-semibold rounded shadow">
                        {`${nickName},${selectedYear},${quarterYear},${selectedTableType} : `}
                        تم الحذف بنجاح{" "}
                      </div>
                    )}
                  </div>
                  <button
                    className="bg-slate-300 rounded text-black py-1 px-9 font-semibold mx-2 font-serif text-sm"
                    onClick={() => {
                      setLanguage("Arabic");
                      setModalOpen(true);
                    }}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "   حذف..." : "حذف"}
                  </button>

                  <button
                    className="bg-slate-300 rounded text-black py-1 px-9 font-semibold mx-2 font-serif text-sm"
                    onClick={() => {
                      setLanguage("Arabic");
                      setUpdateModalOpen(true);
                    }}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "تعديل..." : "تعديل"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Case 2: Only English table exists
    else if (tableEn && !tableAr) {
      return (
        <div className="flex mb-8  flex-col lg:flex-row lg:justify-center  ">
          <div className="">
            {updateActiveEn && tableEn ? (
              <BalaceSheetUpdateFormEnglish TableDataEn={tableEn} />
            ) : (
              <BalanceSheetFormUser Tabledata={tableEn} />
            )}

            <div className="flex justify-between">
              <div className="items-start">
                <div className="items-start">
                  {showDeleteToast && (
                    <div className="absolute left-13 text-xs bg-green-100 border border-green-400 text-green-700 px-10  py-1 font-semibold rounded shadow">
                      Delete Successfully :{" "}
                      {`${nickName},${selectedYear},${quarterYear},${selectedTableType}`}
                    </div>
                  )}
                  {showToast && (
                    <div className="absolute left-13 text-xs bg-green-100 border border-green-400 text-green-700 px-10  py-1 font-semibold rounded shadow">
                      Updated Successfully :{" "}
                      {`${nickName},${selectedYear},${quarterYear},${selectedTableType}`}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                {updateActiveEn && tableEn ? (
                  <button
                    className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                    onClick={handleClickEnglish}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "Submitting..." : "Submit"}
                  </button>
                ) : !showToast ? (
                  <>
                    <button
                      className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                      onClick={() => {
                        setLanguage("English");
                        setUpdateModalOpen(true);
                      }}
                      disabled={takeShot}
                      type="button"
                    >
                      {takeShot ? "Editing..." : "Edit"}
                    </button>
                    <button
                      className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                      onClick={() => {
                        setLanguage("English");
                        setModalOpen(true);
                      }}
                      disabled={takeShot}
                      type="button"
                    >
                      {takeShot ? "Deleting..." : "Delete"}
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          {/* Right side - Arabic form */}
          <div className=" overflow-x-auto">
            <form>
              <div className="">
                <div className="">
                  <BalaceSheetFormAr TakingShort={takeShot} />
                </div>
                <div className=" flex justify-between">
                  <button
                    className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                    onClick={handleClickArabic}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "   رفع..." : " رفع"}

                    <div className="items-end ">
                      {showToastAr && (
                        <div className="absolute right-14 text-xs bg-green-100 border border-green-400 text-green-700 px-12 py-1 font-semibold rounded shadow">
                          {`${nickName},${selectedYear},${quarterYear},${selectedTableType} : `}
                          تم الرفع بنجاح
                        </div>
                      )}
                    </div>
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
        <div className="flex mb-8   flex-col lg:flex-row lg:justify-center ">
          <div className="w-screen">
            <form>
              <BalaceSheet TakingShort={takeShot} />

              <div className=" flex justify-between">
                <div className="items-start">
                  {showToast && (
                    <div className="absolute left-13 text-xs bg-green-100 border border-green-400 text-green-700 px-10  py-1 font-semibold rounded shadow">
                      Submitted Successfully :{" "}
                      {`${nickName},${selectedYear},${quarterYear},${selectedTableType}`}
                    </div>
                  )}
                </div>
                <button
                  className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                  onClick={handleClickEnglish}
                  disabled={takeShot}
                  type="button"
                >
                  {takeShot ? "Submiting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>

          <div className="w-screen  ">
            {updateActiveAr && tableAr ? (
              <BalaceSheetUpdateFormArabic TableDataAr={tableAr} />
            ) : (
              <BalanceSheetFormUserArabic Tabledata={tableAr} />
            )}
            <div className="">
              {updateActiveAr && tableAr ? (
                <button
                  className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                  onClick={handleClickArabic}
                  disabled={takeShot}
                  type="button"
                >
                  {takeShot ? "   رفع..." : " رفع"}
                </button>
              ) : (
                <>
                  <div className="items-end ">
                    {showToastAr && (
                      <div className="absolute right-14 bg-green-100 border border-green-400 text-green-700 px-12 py-1 font-semibold rounded shadow">
                        {`${nickName},${selectedYear},${quarterYear},${selectedTableType} : `}
                        تم تحديث بنجاح
                      </div>
                    )}
                    {showDeleteToastAr && (
                      <div className="absolute right-14 text-xs bg-green-100 border border-green-400 text-green-700 px-12 py-1 font-semibold rounded shadow">
                        {`${nickName},${selectedYear},${quarterYear},${selectedTableType} : `}
                        تم الحذف بنجاح{" "}
                      </div>
                    )}
                  </div>
                  <button
                    className="bg-slate-300 rounded text-black py-1 px-9 font-semibold mx-2 font-serif text-sm"
                    onClick={() => {
                      setLanguage("Arabic");
                      setModalOpen(true);
                    }}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "   حذف..." : "حذف"}
                  </button>

                  <button
                    className="bg-slate-300 rounded text-black py-1 px-9 font-semibold mx-2 font-serif text-sm"
                    onClick={() => {
                      setLanguage("Arabic");
                      setUpdateModalOpen(true);
                    }}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "تعديل..." : "تعديل"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center     flex-col lg:flex-row  gap-1   ">
          {/* Arabic Form */}

          <div className="w-screen">
            <form>
              <div className="">
                <BalaceSheet TakingShort={takeShot} />

                <div className="relative flex justify-between    ">
                  <div className="items-start">
                    {showToast && (
                      <div className="absolute left-13 text-xs bg-green-100 border border-green-400 text-green-700 px-10  py-1 font-semibold rounded shadow">
                        Submitted Successfully :{" "}
                        {`${nickName},${selectedYear},${quarterYear},${selectedTableType}`}
                      </div>
                    )}
                  </div>

                  {tableEn ? (
                    <button
                      className="bg-slate-300 rounded text-black py-1 px-5  font-semibold mx-2 font-serif text-sm"
                      onClick={() => {
                        setLanguage("English");
                        setModalOpen(true);
                      }}
                      disabled={takeShot}
                      type="button"
                    >
                      {takeShot ? "Deleting..." : "Delete"}
                    </button>
                  ) : (
                    <button
                      className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                      onClick={handleClickEnglish}
                      disabled={takeShot}
                      type="button"
                    >
                      {takeShot ? "Submitting..." : "Submit"}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* English Form */}
          <div className="w-screen">
            <form>
              <div className=" pb-8">
                <div className="  ">
                  <BalaceSheetFormAr TakingShort={takeShot} />

                  <div className=" flex justify-between ">
                    {tableAr ? (
                      <button
                        className="bg-slate-300 rounded text-black py-1 px-9  font-semibold mx-2 font-serif text-sm"
                        onClick={() => {
                          setLanguage("Arabic");
                          setModalOpen(true);
                        }}
                        disabled={takeShot}
                        type="button"
                      >
                        {takeShot ? "   حذف..." : "حذف"}
                      </button>
                    ) : (
                      <button
                        className="bg-slate-300 rounded text-black py-1 px-9  font-semibold mx-2 font-serif text-sm"
                        onClick={handleClickArabic}
                        disabled={takeShot}
                        type="button"
                      >
                        {takeShot ? "   رفع..." : "رفع"}
                      </button> 
                    )}

                    <div className="relative flex justify-between ">

                    <div className="items-start">
                      {showToastAr && (
                        <div className=" text-xs right-14 bg-green-100 border border-green-400 text-green-700 px-12 py-1 font-semibold rounded shadow">
                          {`${nickName},${selectedYear},${quarterYear},${selectedTableType} : `}
                          تم الرفع بنجاح
                        </div>
                      )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }
  };



















  







  
  const renderTableContentCashFlow = () => {
    // Case 1: Both English and Arabic tables exist
    if (tableCashFlowEn && tableCashFlowAr) {
      return (
        <div className="flex flex-col  lg:flex-row mb-4 w-screen  lg:justify-center ">
          <div className="">
            {updateActiveEn && tableCashFlowEn ? (
              // <h1>saleetyl</h1>
              <CashFlowUpdateFormEn TableDataEn={tableCashFlowEn} />
            ) : (
              <CashFlowUserEnglish Tabledata={tableCashFlowEn} />
            )}

            <div className="flex justify-between">
              <div className="items-start">
                <div className="items-start">
                  {showDeleteToast && (
                    <div className="absolute left-13 text-xs bg-green-100 border border-green-400 text-green-700 px-10  py-1 font-semibold rounded shadow">
                      Delete Successfully :{" "}
                      {`${nickName},${selectedYear},${quarterYear},${selectedTableType}`}
                    </div>
                  )}
                  {showToast && (
                    <div className="absolute left-13 text-xs bg-green-100 border border-green-400 text-green-700 px-10  py-1 font-semibold rounded shadow">
                      Updated Successfully :{" "}
                      {`${nickName},${selectedYear},${quarterYear},${selectedTableType}`}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                {updateActiveEn && tableCashFlowEn ? (
                  <button
                    className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                    onClick={handleClickEnglish}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "Submitting..." : "Submit"}
                  </button>
                ) : !showToast ? (
                  <>
                    <button
                      className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                      onClick={ async() => {
                        await setLanguage("English");
                        setUpdateModalOpen(true);
                      }}
                      disabled={takeShot}
                      type="button"
                    >
                      {takeShot ? "Editing..." : "Edit"}
                    </button>
                    <button
                      className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                      onClick={() => { 
                        setLanguage("English");
                        setModalOpen(true);
                      }}
                      disabled={takeShot}
                      type="button"
                    >
                      {takeShot ? "Deleting..." : "Delete"}
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <div className="  ">
            {updateActiveAr && tableCashFlowAr ? (
              <CashFlowUpdateFormAr TableDataAr={tableCashFlowAr} />
            ) : (
              <CashFlowUserArabic Tabledata={tableCashFlowAr} />
            )}
            <div className="">
              {updateActiveAr && tableCashFlowAr ? (
                <button
                  className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                  onClick={handleClickArabic}
                  disabled={takeShot}
                  type="button"
                >
                  {takeShot ? "   رفع..." : " رفع"}
                </button>
              ) : (
                <>
                  <div className="   flex justify-end ">
                    {showToastAr && (
                      <div className="absolute text-xs  bg-green-100 border border-green-400 text-green-700 px-12 py-1 font-semibold rounded shadow">
                        {`${nickName},${selectedYear},${quarterYear},${selectedTableType} : `}
                        تم تحديث بنجاح
                      </div>
                    )}
                    {showDeleteToastAr && (
                      <div className="absolute text-xs  bg-green-100 border border-green-400 text-green-700 px-12 py-1 font-semibold rounded shadow">
                        {`${nickName},${selectedYear},${quarterYear},${selectedTableType} : `}
                        تم الحذف بنجاح{" "}
                      </div>
                    )}
                  </div>
                  <button
                    className="bg-slate-300 rounded text-black py-1 px-9 font-semibold mx-2 font-serif text-sm"
                    onClick={() => {
                      setLanguage("Arabic");
                      setModalOpen(true);
                    }}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "   حذف..." : "حذف"}
                  </button>

                  <button
                    className="bg-slate-300 rounded text-black py-1 px-9 font-semibold mx-2 font-serif text-sm"
                    onClick={() => {
                      setLanguage("Arabic");
                      setUpdateModalOpen(true);
                    }}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "تعديل..." : "تعديل"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Case 2: Only English table exists
    else if (tableCashFlowEn && !tableCashFlowAr) {
      return (
        <div className="flex mb-8  flex-col lg:flex-row lg:justify-center  ">
          <div className="">
            {updateActiveEn && tableCashFlowEn ? (
              <CashFlowUpdateFormEn TableDataEn={tableCashFlowEn} />
            ) : (
              <CashFlowUserEnglish Tabledata={tableCashFlowEn} />
            )}

            <div className="flex justify-between">
              <div className="items-start">
                <div className="items-start">
                  {showDeleteToast && (
                    <div className="absolute left-13 text-xs bg-green-100 border border-green-400 text-green-700 px-10  py-1 font-semibold rounded shadow">
                      Delete Successfully :{" "}
                      {`${nickName},${selectedYear},${quarterYear},${selectedTableType}`}
                    </div>
                  )}
                  {showToast && (
                    <div className="absolute left-13 text-xs bg-green-100 border border-green-400 text-green-700 px-10  py-1 font-semibold rounded shadow">
                      Updated Successfully :{" "}
                      {`${nickName},${selectedYear},${quarterYear},${selectedTableType}`}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                {updateActiveEn && tableCashFlowEn ? (
                  <button
                    className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                    onClick={handleClickEnglish}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "Submitting..." : "Submit"}
                  </button>
                ) : !showToast ? (
                  <>
                    <button
                      className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                      onClick={() => {
                        setLanguage("English");
                        setUpdateModalOpen(true);
                      }}
                      disabled={takeShot}
                      type="button"
                    >
                      {takeShot ? "Editing..." : "Edit"}
                    </button>
                    <button
                      className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                      onClick={() => {
                        setLanguage("English");
                        setModalOpen(true);
                      }}
                      disabled={takeShot}
                      type="button"
                    >
                      {takeShot ? "Deleting..." : "Delete"}
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          {/* Right side - Arabic form */}
          <div className=" overflow-x-auto">
            <form>
              <div className="">
                <div className="">
                  <CashFlowFormAr TakingShort={takeShot} />
                </div>
                <div className=" flex justify-between">
                  <button
                    className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                    onClick={handleClickArabic}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "   رفع..." : " رفع"}

                    <div className="items-end ">
                      {showToastAr && (
                        <div className="absolute right-14 text-xs bg-green-100 border border-green-400 text-green-700 px-12 py-1 font-semibold rounded shadow">
                          {`${nickName},${selectedYear},${quarterYear},${selectedTableType} : `}
                          تم الرفع بنجاح
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }

    // Case 3: Only Arabic table exists
    else if (!tableCashFlowEn && tableCashFlowAr) {
      return (
        <div className="flex mb-8   flex-col lg:flex-row lg:justify-center ">
          <div className="w-screen">
            <form>
              <CashFlowFormEn TakingShort={takeShot} />

              <div className=" flex justify-between">
                <div className="items-start">
                  {showToast && (
                    <div className="absolute left-13 text-xs bg-green-100 border border-green-400 text-green-700 px-10  py-1 font-semibold rounded shadow">
                      Submitted Successfully :{" "}
                      {`${nickName},${selectedYear},${quarterYear},${selectedTableType}`}
                    </div>
                  )}
                </div>
                <button
                  className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                  onClick={handleClickEnglish}
                  disabled={takeShot}
                  type="button"
                >
                  {takeShot ? "Submiting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>

          <div className="w-screen  ">
            {updateActiveAr && tableCashFlowAr ? (
              <CashFlowUpdateFormAr TableDataAr={tableCashFlowAr} />
            ) : (
              <CashFlowUserArabic Tabledata={tableCashFlowAr} />
            )}
            <div className="">
              {updateActiveAr && tableCashFlowAr ? (
                <button
                  className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                  onClick={handleClickArabic}
                  disabled={takeShot}
                  type="button"
                >
                  {takeShot ? "   رفع..." : " رفع"}
                </button>
              ) : (
                <>
                  <div className="items-end ">
                    {showToastAr && (
                      <div className="absolute right-14 bg-green-100 border border-green-400 text-green-700 px-12 py-1 font-semibold rounded shadow">
                        {`${nickName},${selectedYear},${quarterYear},${selectedTableType} : `}
                        تم تحديث بنجاح
                      </div>
                    )}
                    {showDeleteToastAr && (
                      <div className="absolute right-14 text-xs bg-green-100 border border-green-400 text-green-700 px-12 py-1 font-semibold rounded shadow">
                        {`${nickName},${selectedYear},${quarterYear},${selectedTableType} : `}
                        تم الحذف بنجاح{" "}
                      </div>
                    )}
                  </div>
                  <button
                    className="bg-slate-300 rounded text-black py-1 px-9 font-semibold mx-2 font-serif text-sm"
                    onClick={() => {
                      setLanguage("Arabic");
                      setModalOpen(true);
                    }}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "   حذف..." : "حذف"}
                  </button>

                  <button
                    className="bg-slate-300 rounded text-black py-1 px-9 font-semibold mx-2 font-serif text-sm"
                    onClick={() => {
                      setLanguage("Arabic");
                      setUpdateModalOpen(true);
                    }}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "تعديل..." : "تعديل"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center     flex-col lg:flex-row  gap-1   ">
          <div className="w-screen">
            <form>
              <div className="">
                <CashFlowFormEn TakingShort={takeShot} />
                <div className="relative flex justify-between    ">
                  <div className="items-start">
                    {showToast && (
                      <div className="absolute left-13 text-xs bg-green-100 border border-green-400 text-green-700 px-10  py-1 font-semibold rounded shadow">
                        Submitted Successfully :{" "}
                        {`${nickName},${selectedYear},${quarterYear},${selectedTableType}`}
                      </div>
                    )}
                  </div>
                  {tableCashFlowEn ? (
                    <button
                      className="bg-slate-300 rounded text-black py-1 px-5  font-semibold mx-2 font-serif text-sm"
                      onClick={() => {
                        setLanguage("English");
                        setModalOpen(true);
                      }}
                      disabled={takeShot}
                      type="button"
                    >
                      {takeShot ? "Deleting..." : "Delete"}
                    </button>
                  ) : (
                    <button
                      className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                      onClick={handleClickEnglish}
                      disabled={takeShot}
                      type="button"
                    >
                      {takeShot ? "Submitting..." : "Submit"}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* English Form */}
          <div className="w-screen">
            <form>
              <div className=" pb-8">
                <div className="  ">
                  <CashFlowFormAr TakingShort={takeShot} />

                  <div className=" flex justify-between ">
                    {tableCashFlowAr ? (
                      <button
                        className="bg-slate-300 rounded text-black py-1 px-9  font-semibold mx-2 font-serif text-sm"
                        onClick={() => {
                          setLanguage("Arabic");
                          setModalOpen(true);
                        }}
                        disabled={takeShot}
                        type="button"
                      >
                        {takeShot ? "   حذف..." : "حذف"}
                      </button>
                    ) : (
                      <button
                        className="bg-slate-300 rounded text-black py-1 px-9  font-semibold mx-2 font-serif text-sm"
                        onClick={handleClickArabic}
                        disabled={takeShot}
                        type="button"
                      >
                        {takeShot ? "   رفع..." : "رفع"}
                      </button>
                    )}
                 <div className="relative flex justify-between ">
                    <div className=" items-start  ">
                      {showToastAr && (
                        <div className="  text-xs   bg-green-100 border border-green-400 text-green-700 px-12 py-1 font-semibold rounded shadow">
                          {`${nickName},${selectedYear},${quarterYear},${selectedTableType} : `}
                          تم الرفع بنجاح
                        </div>
                   )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }
  };






















  
  const renderTableContentProfitLoss = () => {
    // Case 1: Both English and Arabic tables exist
    if (tableProfitLossEn && tableProfitLossAr) {
      return (
        <div className="flex flex-col  lg:flex-row mb-4 w-screen  lg:justify-center ">
          <div className="">
            {updateActiveEn && tableCashFlowEn ? (
              // <h1>saleetyl</h1>
              <ProfitLossUpdateFormEn TableDataEn={tableProfitLossEn} />
            ) : (
              <ProfitLossUserEnglish Tabledata={tableProfitLossEn} />
            )}
            <div className="flex justify-between">
              <div className="items-start">
                <div className="items-start">
                  {showDeleteToast && (
                    <div className="absolute left-13 text-xs bg-green-100 border border-green-400 text-green-700 px-10  py-1 font-semibold rounded shadow">
                      Delete Successfully :{" "}
                      {`${nickName},${selectedYear},${quarterYear},${selectedTableType}`}
                    </div>
                  )}
                  {showToast && (
                    <div className="absolute left-13 text-xs bg-green-100 border border-green-400 text-green-700 px-10  py-1 font-semibold rounded shadow">
                      Updated Successfully :{" "}
                      {`${nickName},${selectedYear},${quarterYear},${selectedTableType}`}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                {updateActiveEn && tableProfitLossEn ? (
                  <button
                    className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                    onClick={handleClickEnglish}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "Submitting..." : "Submit"}
                  </button>
                ) : !showToast ? (
                  <>
                    <button
                      className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                      onClick={ async() => {
                        await setLanguage("English");
                        setUpdateModalOpen(true);
                      }}
                      disabled={takeShot}
                      type="button"
                    >
                      {takeShot ? "Editing..." : "Edit"}
                    </button>
                    <button
                      className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                      onClick={() => { 
                        setLanguage("English");
                        setModalOpen(true);
                      }}
                      disabled={takeShot}
                      type="button"
                    >
                      {takeShot ? "Deleting..." : "Delete"}
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <div className="  ">
            {updateActiveAr && tableProfitLossAr ? (
              <ProfitLossUpdateFormAr TableDataAr={tableProfitLossAr} />
            ) : (
              <ProfitLossUserArabic Tabledata={tableProfitLossAr} />
            )}
            <div className="">
              {updateActiveAr && tableProfitLossAr ? (
                <button
                  className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                  onClick={handleClickArabic}
                  disabled={takeShot}
                  type="button"
                >
                  {takeShot ? "   رفع..." : " رفع"}
                </button>
              ) : (
                <>
                  <div className="   flex justify-end ">
                    {showToastAr && (
                      <div className="absolute text-xs  bg-green-100 border border-green-400 text-green-700 px-12 py-1 font-semibold rounded shadow">
                        {`${nickName},${selectedYear},${quarterYear},${selectedTableType} : `}
                        تم تحديث بنجاح
                      </div>
                    )}
                    {showDeleteToastAr && (
                      <div className="absolute text-xs  bg-green-100 border border-green-400 text-green-700 px-12 py-1 font-semibold rounded shadow">
                        {`${nickName},${selectedYear},${quarterYear},${selectedTableType} : `}
                        تم الحذف بنجاح{" "}
                      </div>
                    )}
                  </div>
                  <button
                    className="bg-slate-300 rounded text-black py-1 px-9 font-semibold mx-2 font-serif text-sm"
                    onClick={() => {
                      setLanguage("Arabic");
                      setModalOpen(true);
                    }}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "   حذف..." : "حذف"}
                  </button>

                  <button
                    className="bg-slate-300 rounded text-black py-1 px-9 font-semibold mx-2 font-serif text-sm"
                    onClick={() => {
                      setLanguage("Arabic");
                      setUpdateModalOpen(true);
                    }}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "تعديل..." : "تعديل"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Case 2: Only English table exists
    else if (tableProfitLossEn && !tableProfitLossAr) {
      return (
        <div className="flex mb-8  flex-col lg:flex-row lg:justify-center  ">
          <div className="">
            {updateActiveEn && tableProfitLossEn ? (
              <ProfitLossUpdateFormEn TableDataEn={tableProfitLossEn} />
            ) : (
              <ProfitLossUserEnglish Tabledata={tableProfitLossEn} />
            )}

            <div className="flex justify-between">
              <div className="items-start">
                <div className="items-start">
                  {showDeleteToast && (
                    <div className="absolute left-13 text-xs bg-green-100 border border-green-400 text-green-700 px-10  py-1 font-semibold rounded shadow">
                      Delete Successfully :{" "}
                      {`${nickName},${selectedYear},${quarterYear},${selectedTableType}`}
                    </div>
                  )}
                  {showToast && (
                    <div className="absolute left-13 text-xs bg-green-100 border border-green-400 text-green-700 px-10  py-1 font-semibold rounded shadow">
                      Updated Successfully :{" "}
                      {`${nickName},${selectedYear},${quarterYear},${selectedTableType}`}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                {updateActiveEn && tableProfitLossEn ? (
                  <button
                    className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                    onClick={handleClickEnglish}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "Submitting..." : "Submit"}
                  </button>
                ) : !showToast ? (
                  <>
                    <button
                      className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                      onClick={() => {
                        setLanguage("English");
                        setUpdateModalOpen(true);
                      }}
                      disabled={takeShot}
                      type="button"
                    >
                      {takeShot ? "Editing..." : "Edit"}
                    </button>
                    <button
                      className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                      onClick={() => {
                        setLanguage("English");
                        setModalOpen(true);
                      }}
                      disabled={takeShot}
                      type="button"
                    >
                      {takeShot ? "Deleting..." : "Delete"}
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          {/* Right side - Arabic form */}
          <div className=" overflow-x-auto">
            <form>
              <div className="">
                <div className="">
                  <ProfitLossFormAr TakingShort={takeShot} />
                </div>
                <div className=" flex justify-between">
                  <button
                    className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                    onClick={handleClickArabic}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "   رفع..." : " رفع"}

                    <div className="items-end ">
                      {showToastAr && (
                        <div className="absolute right-14 text-xs bg-green-100 border border-green-400 text-green-700 px-12 py-1 font-semibold rounded shadow">
                          {`${nickName},${selectedYear},${quarterYear},${selectedTableType} : `}
                          تم الرفع بنجاح
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }

    // Case 3: Only Arabic table exists
    else if (!tableProfitLossEn && tableProfitLossAr) {
      return (
        <div className="flex mb-8   flex-col lg:flex-row lg:justify-center ">
          <div className="w-screen">
            <form>
              <ProfitLossFormEn TakingShort={takeShot} />

              <div className=" flex justify-between">
                <div className="items-start">
                  {showToast && (
                    <div className="absolute left-13 text-xs bg-green-100 border border-green-400 text-green-700 px-10  py-1 font-semibold rounded shadow">
                      Submitted Successfully :{" "}
                      {`${nickName},${selectedYear},${quarterYear},${selectedTableType}`}
                    </div>
                  )}
                </div>
                <button
                  className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                  onClick={handleClickEnglish}
                  disabled={takeShot}
                  type="button"
                >
                  {takeShot ? "Submiting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>

          <div className="w-screen  ">
            {updateActiveAr && tableProfitLossAr ? (
              <ProfitLossUpdateFormAr TableDataAr={tableProfitLossAr} />
            ) : (
              <ProfitLossUserArabic Tabledata={tableProfitLossAr} />
            )}
            <div className="">
              {updateActiveAr && tableProfitLossAr ? (
                <button
                  className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                  onClick={handleClickArabic}
                  disabled={takeShot}
                  type="button"
                >
                  {takeShot ? "   رفع..." : " رفع"}
                </button>
              ) : (
                <>
                  <div className="items-end ">
                    {showToastAr && (
                      <div className="absolute right-14 bg-green-100 border border-green-400 text-green-700 px-12 py-1 font-semibold rounded shadow">
                        {`${nickName},${selectedYear},${quarterYear},${selectedTableType} : `}
                        تم تحديث بنجاح
                      </div>
                    )}
                    {showDeleteToastAr && (
                      <div className="absolute right-14 text-xs bg-green-100 border border-green-400 text-green-700 px-12 py-1 font-semibold rounded shadow">
                        {`${nickName},${selectedYear},${quarterYear},${selectedTableType} : `}
                        تم الحذف بنجاح{" "}
                      </div>
                    )}
                  </div>
                  <button
                    className="bg-slate-300 rounded text-black py-1 px-9 font-semibold mx-2 font-serif text-sm"
                    onClick={() => {
                      setLanguage("Arabic");
                      setModalOpen(true);
                    }}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "   حذف..." : "حذف"}
                  </button>

                  <button
                    className="bg-slate-300 rounded text-black py-1 px-9 font-semibold mx-2 font-serif text-sm"
                    onClick={() => {
                      setLanguage("Arabic");
                      setUpdateModalOpen(true);
                    }}
                    disabled={takeShot}
                    type="button"
                  >
                    {takeShot ? "تعديل..." : "تعديل"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center     flex-col lg:flex-row  gap-1   ">
          <div className="w-screen">
            <form>
              <div className="">
                <ProfitLossFormEn TakingShort={takeShot} />
                <div className="relative flex justify-between    ">
                  <div className="items-start">
                    {showToast && (
                      <div className="absolute left-13 text-xs bg-green-100 border border-green-400 text-green-700 px-10  py-1 font-semibold rounded shadow">
                        Submitted Successfully :{" "}
                        {`${nickName},${selectedYear},${quarterYear},${selectedTableType}`}
                      </div>
                    )}
                  </div>
                  {tableProfitLossEn ? (
                    <button
                      className="bg-slate-300 rounded text-black py-1 px-5  font-semibold mx-2 font-serif text-sm"
                      onClick={() => {
                        setLanguage("English");
                        setModalOpen(true);
                      }}
                      disabled={takeShot}
                      type="button"
                    >
                      {takeShot ? "Deleting..." : "Delete"}
                    </button>
                  ) : (
                    <button
                      className="bg-slate-300 rounded text-black py-1 px-5 font-semibold mx-2 font-serif text-sm"
                      onClick={handleClickEnglish}
                      disabled={takeShot}
                      type="button"
                    >
                      {takeShot ? "Submitting..." : "Submit"}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* English Form */}
          <div className="w-screen">
            <form>
              <div className=" pb-8">
                <div className="  ">
                  <ProfitLossFormAr TakingShort={takeShot} />
                  <div className=" flex justify-between ">
                    {tableProfitLossAr ? (
                      <button
                        className="bg-slate-300 rounded text-black py-1 px-9  font-semibold mx-2 font-serif text-sm"
                        onClick={() => {
                          setLanguage("Arabic");
                          setModalOpen(true);
                        }}
                        disabled={takeShot}
                        type="button"
                      >
                        {takeShot ? "   حذف..." : "حذف"}
                      </button>
                    ) : (
                      <button
                        className="bg-slate-300 rounded text-black py-1 px-9  font-semibold mx-2 font-serif text-sm"
                        onClick={handleClickArabic}
                        disabled={takeShot}
                        type="button"
                      >
                        {takeShot ? "   رفع..." : "رفع"}
                      </button>
                    )}
                 <div className="relative flex justify-between ">
                    <div className=" items-start  ">
                      {showToastAr && (
                        <div className="  text-xs   bg-green-100 border border-green-400 text-green-700 px-12 py-1 font-semibold rounded shadow">
                          {`${nickName},${selectedYear},${quarterYear},${selectedTableType} : `}
                          تم الرفع بنجاح
                        </div>
                   )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }
  };
















  return (
    <div className="p-1  ">
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
          <h4 className="text-2xl md:text-2xl font-bold text-gray-700">
            {language === "Arabic"
              ? "تقرير القوائم المالية"
              : "Financial Statement Report"}
          </h4>
        </div>
      </div>
      <div className="flex flex-wrap  items-start mt-1 mb-1 gap-4  text-sm text-gray-700 font-semibold">
        <div className="relative ">
          <label className="block mb-1">Tadawul Code</label>
          <input
            className="p-1 w-28 placeholder:text-xs bg-gray-100 text-black border rounded focus:outline-none focus:bg-white"
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
            <ul className="absolute z-10 w-10/12 mt-1 border border-gray-300 bg-white rounded max-h-40 overflow-y-auto">
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
                <option key={item?.quarter} value={item?.quarter}>
                  {item?.quarter}
                </option>
              ))} 
            </select>
          </div>
        )}

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
      </div>
      <ConfirmationModalTable
        isOpen={modalOpen}
        onConfirm={async () => await handleDeleteTable(language)}
        onCancel={() => setModalOpen(false)}
      />
      <ConfirmationUpdateModalTable
        isOpen={updateModalOpen}
        onConfirm={async () => await handleUpdateTable(language)}
        onCancel={() => setUpdateModalOpen(false)}
      />
      <ValidationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={errorMessage}
      />

      {(() => {
        if (selectedTableType === "BalanceSheet") {
          return renderTableContent();
        } else if (selectedTableType === "CashFlow") {
          return renderTableContentCashFlow();
        }
        else if (selectedTableType === "ProfitLoss") {
          return renderTableContentProfitLoss();
        }
        return renderTableContent();
      })()}
    </div>
  );
});

export default AddNewTable;
