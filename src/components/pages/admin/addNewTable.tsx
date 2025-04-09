/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiMinusSm } from "react-icons/hi";
import domtoimage from "dom-to-image";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { GrLanguage } from "react-icons/gr";
import { useSelector } from "react-redux";
import { AdminLanguageChange } from "../../../reduxKit/actions/admin/adminLanguage";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { AdminAddTableAction } from "../../../reduxKit/actions/admin/addTableAction";
import { commonRequest } from "../../../config/api";
import { config } from "process";

interface IsubPropertieSum {
  SubpropertyName: string;
  notes: string;
  date1: number | null;
  date2: number | null;
}

interface PropertyRow {
  propertyName: string;
  notes: string;
  date1: number | null;
  date2: number | null;
}

interface SubSection {
  subName: string;
  subNameArabic: string;
  properties: PropertyRow[];
  subPropertieSum1: IsubPropertieSum[];
  subPropertieSum: IsubPropertieSum[];
}

interface MainSection {
  mainName: string;
  mainNameArabic: string;
  subSections: SubSection[];
}

interface FormDataStructure {
  mainSections: MainSection[];
}

const AddNewTable = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const TableTypeArr = ["BalanceSheet", "ProfitLoss", "CashFlow"];
  const { adminLanguage } = useSelector(
    (state: RootState) => state.adminLanguage
  );
  const [language, setLanguage] = useState<string>("Arabic");
  const [selectedTableType, setTableType] = useState("");
  const [takeShotForProfitLoss, setTakeShotForProfitLoss] =
    useState<boolean>(false);
  const [takeShotForCashFlow, setTakeShotForCashFlow] =
    useState<boolean>(false);
  const [tadawalCode, setTadawalCode] = useState("");
  const [nickName, setNickName] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]); // List of years
  const [selectedYear, setSelectedYear] = useState("");
  const [quarterYear, setQuarterYear] = useState("");
  const [quarters, setQuarters] = useState<{
    [key: string]: Array<{ quarter: string; date: string }>;
  }>({}); // Quarters and their dates for each year
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState<boolean>(false); // Manage year dropdown visibility
  const [isLoading, setIsLoading] = useState(false);
  const [takeShot, setTakeShot] = useState<boolean>(false);

  const toggleLanguage = async () => {
    const newLanguage = adminLanguage === "English" ? "Arabic" : "English";
    await dispatch(AdminLanguageChange(newLanguage));
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormDataStructure>({
    mainSections: [
      {
        mainName: "",
        mainNameArabic: "",
        subSections: [
          {
            subName: "",
            subNameArabic: "",
            subPropertieSum1: [
              { SubpropertyName: "", notes: "", date1: null, date2: null },
            ],
            properties: [
              {
                propertyName: "",
                notes: "",
                date1: null,
                date2: null,
              },
            ],
            subPropertieSum: [
              { SubpropertyName: "", notes: "", date1: null, date2: null },
            ],
          },
        ],
      },
    ],
  });

  const captureScreen = async () => {
    const node = document.getElementById("capture-area");
    if (!node) return;
    if (selectedTableType === "ProfitLoss") {
      setTakeShotForProfitLoss(true); // Hide UI elements while capturing
    }
    if (selectedTableType === "CashFlow") {
      setTakeShotForCashFlow(true); // Hide UI elements while capturing
    }
    setTakeShot(true); // Hide UI elements while capturing
    console.log("Taking Screenshot...");
    node.classList.add("no-scrollbar");
    const childElements = node.querySelectorAll("*");
    childElements.forEach((element) => element.classList.add("no-scrollbar"));

    try {
      const dataUrl = await domtoimage.toPng(node);
      if (adminLanguage) setLanguage(adminLanguage);
      // Convert the base64 image to a File object
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const screenshotFile = new File([blob], "screenshot.png", {
        type: "image/png",
      });

      const downloadLink = document.createElement("a");
      downloadLink.href = dataUrl;
      downloadLink.download = "screenshot.png";
      downloadLink.click(); // Triggers download

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
      console.log("the console log of response ADDTABLE ; ", responseTow);

      if (responseTow.payload?.success === true) {
        toast.success(responseTow.payload.message);
      }
      setTakeShot(false);
      setTakeShotForProfitLoss(false);
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    } finally {
      // Remove the class to restore the scrollbar on the parent and child elements
      node.classList.remove("no-scrollbar");
      const childElements = node.querySelectorAll("*");
      childElements.forEach((element) =>
        element.classList.remove("no-scrollbar")
      );
      setTimeout(() => setTakeShot(false), 100); // Restore UI
    }
  };

  // Calculate the total for a specific main section
  const calculateMainTotal = (mainIndex: number) => {
    let totalDate1 = 0;
    let totalDate2 = 0;

    formData.mainSections[mainIndex].subSections.forEach((subSection) => {
      const subTotal = calculateSubSectionTotal(
        mainIndex,
        formData.mainSections[mainIndex].subSections.indexOf(subSection)
      );
      totalDate1 += subTotal.date1;
      totalDate2 += subTotal.date2;
    });

    return { totalDate1, totalDate2 };
  };

  const handleYearSelect = (year: string) => {
    setSelectedYear(year);
    console.log("Selected Year:", year);
    // setIsYearDropdownOpen(false);

    // Close the year dropdown after selection
  };

  const handleQuarterYear = async (quarter: string) => {
    await setQuarterYear(quarter);
    console.log("Selected Quarter", quarter);
  };

  // Calculate the grand total across all main sections
  const calculateGrandTotal = () => {
    let grandTotalDate1 = 0;
    let grandTotalDate2 = 0;

    formData.mainSections.forEach((mainSection, index) => {
      const mainTotal = calculateMainTotal(index);
      grandTotalDate1 += mainTotal.totalDate1;
      grandTotalDate2 += mainTotal.totalDate2;
    });

    return { grandTotalDate1, grandTotalDate2 };
  };

  // Calculate total for a specific subsection
  const calculateSubSectionTotal = (mainIndex: number, subIndex: number) => {
    let date1Total = 0;
    let date2Total = 0;

    if (takeShotForProfitLoss || takeShotForCashFlow) {
      // Accumulate all previous subsection totals within the current main section
      for (let i = 0; i <= subIndex; i++) {
        date1Total += formData.mainSections[mainIndex].subSections[
          i
        ].properties.reduce((acc, curr) => acc + (curr.date1 ?? 0), 0);
        date2Total += formData.mainSections[mainIndex].subSections[
          i
        ].properties.reduce((acc, curr) => acc + (curr.date2 ?? 0), 0);
      }
    } else {
      // Get only the current subsection total
      date1Total = formData.mainSections[mainIndex].subSections[
        subIndex
      ].properties.reduce((acc, curr) => acc + (curr.date1 ?? 0), 0);
      date2Total = formData.mainSections[mainIndex].subSections[
        subIndex
      ].properties.reduce((acc, curr) => acc + (curr.date2 ?? 0), 0);
    }

    // Log the result
    console.log(
      `Main ${mainIndex}, Subsection ${subIndex} Total -> Date1: ${date1Total}, Date2: ${date2Total}`
    );

    return {
      date1: date1Total,
      date2: date2Total,
    };
  };

  // Handle changes to main section name
  const handleMainNameChange = (
    mainIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newMainSections = [...formData.mainSections];
    newMainSections[mainIndex] = {
      ...newMainSections[mainIndex],
      [e.target.name]: e.target.value,
    };

    setFormData({
      ...formData,
      mainSections: newMainSections,
    });
  };

  // Handle changes to subsection fields
  const handleSubSectionChange = (
    mainIndex: number,
    subIndex: number,
    field: string,
    value: string
  ) => {
    const newMainSections = [...formData.mainSections];
    newMainSections[mainIndex].subSections[subIndex] = {
      ...newMainSections[mainIndex].subSections[subIndex],
      [field]: value,
    };

    setFormData({
      ...formData,
      mainSections: newMainSections,
    });
  };

  // Handle changes to property fields
  const handlePropertyChange = (
    mainIndex: number,
    subIndex: number,
    propIndex: number,
    field: string,
    value: string | number
  ) => {
    const newMainSections = [...formData.mainSections];
    newMainSections[mainIndex].subSections[subIndex].properties[propIndex] = {
      ...newMainSections[mainIndex].subSections[subIndex].properties[propIndex],
      [field]: value,
    };

    setFormData({
      ...formData,
      mainSections: newMainSections,
    });
  };

  // Add a new property to a subsection
  const addProperty = (mainIndex: number, subIndex: number) => {
    const newMainSections = [...formData.mainSections];
    newMainSections[mainIndex].subSections[subIndex].properties.push({
      propertyName: "",
      notes: "",
      date1: null,
      date2: null,
    });

    setFormData({
      ...formData,
      mainSections: newMainSections,
    });
  };

  // Remove the last property from a subsection
  const removeProperty = (mainIndex: number, subIndex: number) => {
    const newMainSections = [...formData.mainSections];

    if (
      newMainSections[mainIndex].subSections[subIndex].properties.length > 0
    ) {
      newMainSections[mainIndex].subSections[subIndex] = {
        ...newMainSections[mainIndex].subSections[subIndex],
        properties: newMainSections[mainIndex].subSections[
          subIndex
        ].properties.slice(0, -1),
      };

      setFormData({
        ...formData,
        mainSections: newMainSections,
      });
    }
  };

  // Add a new subsection to a main section
  const addSubSection = (mainIndex: number) => {
    const newMainSections = [...formData.mainSections];
    newMainSections[mainIndex].subSections.push({
      subName: "",
      subNameArabic: "",
      subPropertieSum1: [],
      properties: [
        {
          propertyName: "",
          notes: "",
          date1: null,
          date2: null,
        },
      ],
      subPropertieSum: [], // Initialize with an empty array or with a default item
    });

    setFormData({
      ...formData,
      mainSections: newMainSections,
    });
  };

  // Remove the last subsection from a main section
  const removeSubSection = (mainIndex: number) => {
    const newMainSections = [...formData.mainSections];

    if (newMainSections[mainIndex].subSections.length > 0) {
      newMainSections[mainIndex] = {
        ...newMainSections[mainIndex],
        subSections: newMainSections[mainIndex].subSections.slice(0, -1),
      };

      setFormData({
        ...formData,
        mainSections: newMainSections,
      });
    }
  };






  const handleSubPropertySum1Change = (
    mainIndex: number,
    subIndex: number,
    subPropIndex: number,
    field: string,
    value: string | number
  ) => {
    const newMainSections = [...formData.mainSections];
    
    newMainSections[mainIndex].subSections[subIndex].subPropertieSum1[subPropIndex] = {
      ...newMainSections[mainIndex].subSections[subIndex].subPropertieSum1[subPropIndex],
      [field]: value,
    };
  
    setFormData({
      ...formData,
      mainSections: newMainSections,
    });
  };







  // Add an item to subPropertieSum1 (before properties)
const addSubPropertySum1 = (mainIndex: number, subIndex: number) => {
    if (mainIndex === undefined || subIndex === undefined) return;
  
    const newMainSections = [...formData.mainSections];
    
    if (!newMainSections[mainIndex]?.subSections[subIndex]) return;
    
    newMainSections[mainIndex].subSections[subIndex].subPropertieSum1.push({
      SubpropertyName: "",
      notes: "",
      date1: null,
      date2: null,
    });
  
    setFormData({
      ...formData,
      mainSections: newMainSections,
    });
  };
  
  // Remove the last item from subPropertieSum1 (before properties)
  const removeSubPropertySum1 = (mainIndex: number, subIndex: number) => {
    const newMainSections = [...formData.mainSections];
  
    if (newMainSections[mainIndex].subSections[subIndex].subPropertieSum1.length > 0) {
      newMainSections[mainIndex].subSections[subIndex] = {
        ...newMainSections[mainIndex].subSections[subIndex],
        subPropertieSum1: newMainSections[mainIndex].subSections[subIndex].subPropertieSum1.slice(0, -1),
      };
  
      setFormData({
        ...formData,
        mainSections: newMainSections,
      });
    }
  };

  const addSubPropertySum = (mainIndex: number, subIndex: number) => {
    if (mainIndex === undefined || subIndex === undefined) return;
  
    const newMainSections = [...formData.mainSections];
    
    if (!newMainSections[mainIndex]?.subSections[subIndex]) return;
    
    newMainSections[mainIndex].subSections[subIndex].subPropertieSum.push({
      SubpropertyName: "",
      notes: "",
      date1: null,
      date2: null,
    });
  
    setFormData({
      ...formData,
      mainSections: newMainSections,
    });
  };
  
  // Remove the last item from subPropertieSum (after properties)
  const removeSubPropertySum = (mainIndex: number, subIndex: number) => {
    const newMainSections = [...formData.mainSections];
  
    if (newMainSections[mainIndex].subSections[subIndex].subPropertieSum.length > 0) {
      newMainSections[mainIndex].subSections[subIndex] = {
        ...newMainSections[mainIndex].subSections[subIndex],
        subPropertieSum: newMainSections[mainIndex].subSections[subIndex].subPropertieSum.slice(0, -1),
      };
  
      setFormData({
        ...formData,
        mainSections: newMainSections,
      });
    }
  };

  const handleSubPropertySumChange = (
    mainIndex: number,
    subIndex: number,
    subPropIndex: number,
    field: string,
    value: string | number
  ) => {
    const newMainSections = [...formData.mainSections];
    newMainSections[mainIndex].subSections[subIndex].subPropertieSum[
      subPropIndex
    ] = {
      ...newMainSections[mainIndex].subSections[subIndex].subPropertieSum[
        subPropIndex
      ],
      [field]: value,
    };

    setFormData({
      ...formData,
      mainSections: newMainSections,
    });
  };

  // const addMainSection = () => {
  //   setFormData({
  //     ...formData,
  //     mainSections: [
  //       ...formData.mainSections,
  //       {
  //         mainName: "",
  //         mainNameArabic: "",
  //         subSections: [
  //           {
  //             subName: "",
  //             subNameArabic: "",
  //             subPropertieSum1: [],
  //             properties: [
  //               {
  //                 propertyName: "",
  //                 notes: "",
  //                 date1: null,
  //                 date2: null,
  //               },
  //             ],
  //             subPropertieSum: [], // Add this line to include the subPropertieSum array
  //           },
  //         ],
  //       },
  //     ],
  //   });
  // };
  // // Remove the last main section
  // const removeMainSection = () => {
  //   if (formData.mainSections.length > 1) {
  //     setFormData({
  //       ...formData,
  //       mainSections: formData.mainSections.slice(0, -1),
  //     });
  //   }
  // };

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

    setTadawalCode(mydata[0].tadawalCode);
    setNickName(mydata[0].nickNameEn);
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

    setYears(Array.from(yearsSet));
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

  return (
    <div className="p-4">
      <div className="p-2">
        <div className="flex flex-wrap justify-between items-center">
          <FaArrowCircleLeft
            className="text-3xl text-gray-700"
            onClick={() => navigate("/home")}
          />

          <div className="flex gap-4 items-center ">
            <button
              onClick={toggleLanguage}
              className="py-1 px-2 hover:scale-105   transition-transform duration-300 ease-in-out  items-center text-2xl hover:   bg-opacity-80"
            >
              <GrLanguage className=" text-gray-700" />
            </button>
            {/* </button> */}
            <h4 className="text-2xl md:text-2xl font-bold text-gray-700">
              {language === "Arabic" ? "قسم الجدول" : "Table Section"}
            </h4>
          </div>
        </div>

        {/* Main Section Controls */}
        {/* <div className="mb-4 flex items-center">
          <button
            type="button"
            onClick={addMainSection}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded-md mr-2 flex items-center"
          >
            <FaPlus className="mr-1" /> Add Main Section
          </button>
          <button
            type="button"
            onClick={removeMainSection}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-1 px-3 rounded-md flex items-center"
            disabled={formData.mainSections.length <= 1}
          >
            <HiMinusSm className="mr-1" /> Remove Main Section
          </button>
        </div> */}
        <div className="flex-1">
          <input
            className="appearance-none block w-1/4 bg-gray-100 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white m-1"
            type="text"
            placeholder="Tadawal Code"
            value={tadawalCode}
            required
            name="nickName"
            onChange={handleNickNameChanges}
          />

          {isLoading && (
            <p className="text-sm font-serif text-gray-600 mt-1">
              Loading suggestions...
            </p>
          )}

          {suggestions.length > 0 && (
            <ul className="border border-gray-300 w-1/2 rounded mt-1 max-h-40 overflow-y-auto bg-white">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-2 text-sm font-semibold py-1 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}

          {years.length > 0 && (
            <div ref={dropdownRef} className="relative mt-2">
              <label className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <div
                className="mt-1 block w-1/4 p-2 border border-gray-300 rounded-md shadow-sm cursor-pointer"
                onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
              >
                {selectedYear || "Select a year"}
              </div>

              {isYearDropdownOpen && (
                <div className="absolute z-10 mt-1 w-1/4 bg-white border border-gray-300 rounded-md shadow-lg">
                  {years.map((year) => (
                    <div
                      key={year}
                      className="relative p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleYearSelect(year)}
                    >
                      {year}
                      {(quarterYear === year || selectedYear === year) &&
                        quarters[year] && (
                          <div className="absolute left-full ml-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                            <div className="py-1">
                              {quarters[year].map((item) => (
                                <div
                                  key={item.quarter}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() =>
                                    handleQuarterYear(item.quarter)
                                  }
                                >
                                  <div>{item.quarter}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {selectedYear && (
            <div className="p-2 w-44 mt-3 flex justify-center rounded-sm border border-gray-300 bg-slate-200">
              <select
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
        <div className="flex justify-center p-1  ">
          <h1 className="text-lg text-black font-bold">
            {" "}
            {`${nickName} ${selectedYear} ${quarterYear} ${selectedTableType}`}{" "}
          </h1>
        </div>




        <form className="bg-white shadow-md  rounded pb-2 w-full max-w-5xl">
          <div id="capture-area" className="overflow-x-auto ">
            <div className=" w-full border-collapse border border-gray-300">
              <tr className="w-full flex">
                <th className="border text-[14px]  bg-slate-300 border-white px-10  py-[2px] text-left w-full"></th>

                <th className="border bg-slate-300   text-center">
                  <input
                    type="text"
                    name="date1"
                    className="border bg-slate-300 w-[165px] text-center"
                    placeholder="Date 1"
                  />
                </th>
                <th className="border bg-slate-300 text-center">
                  <input
                    type="text"
                    name="date2"
                    className="border bg-slate-300 w-[165px] text-center"
                    placeholder="Date 2"
                  />
                </th>
              </tr>
            </div>

            {formData.mainSections.map((mainSection, mainIndex) => (
              <div key={mainIndex} className="mb-2  ">
                <table className="w-full border-collapse border border-gray-300">
                  <tbody>
                    {!(takeShotForProfitLoss || takeShotForCashFlow) && ( // Hide buttons while taking a screenshot
                      <>
                        {/* Main Name Row */}
                        <tr className="">
                          <td className="">
                            <div className="flex h-7">
                              <input
                                type="text"
                                name="mainName"
                                value={mainSection.mainName}
                                onChange={(e) =>
                                  handleMainNameChange(mainIndex, e)
                                }
                                className="text-sm px-4 w-[450px] font-bold  border border-gray-200"
                                placeholder="Main Name"
                              />
                              {!takeShot && ( // Hide buttons while taking a screenshot
                                <>
                                  <button
                                    type="button"
                                    onClick={() => addSubSection(mainIndex)}
                                    className="ml-2 hover:bg-gray-100 p-1 rounded-full font-semibold text-[14px]"
                                  >
                                    <FaPlus />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => removeSubSection(mainIndex)}
                                    className="ml-2 hover:bg-gray-100 p-1 rounded-full font-semibold text-[14px]"
                                  >
                                    <HiMinusSm className="text-2xl" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="border border-gray-300"></td>
                          <td className="border border-gray-300"></td>
                          <td className="border border-gray-300"></td>
                        </tr>
                      </>
                    )}

                    {/* Sub Sections */}
                    {mainSection.subSections.map((subSection, subIndex) => (
                      <React.Fragment key={`sub-${mainIndex}-${subIndex}`}>
                        {/* Sub Section Header */}

                        {!takeShotForProfitLoss && ( // Hide buttons while taking a screenshot
                          <>
                            <tr className="">
                              <td className="">
                                <div className="flex w-full">
                                  <input
                                    type="text"
                                    value={subSection.subName}
                                    onChange={(e) =>
                                      handleSubSectionChange(
                                        mainIndex,
                                        subIndex,
                                        "subName",
                                        e.target.value
                                      )
                                    }
                                    className="text-sm px-4 w-[450px] font-medium  border border-gray-200"
                                    placeholder="SubName"
                                  />
                                  {!takeShot && ( // Hide buttons while taking a screenshot
                                    <>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          addProperty(mainIndex, subIndex)
                                        }
                                        className="hover:bg-gray-100 p-2 rounded-full font-semibold text-[14px]"
                                      >
                                        <FaPlus />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeProperty(mainIndex, subIndex)
                                        }
                                        className="ml-2 hover:bg-gray-100   p-1 rounded-full font-semibold text-[14px]"
                                      >
                                        <HiMinusSm className="text-2xl" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                              <td className="border border-gray-300"></td>
                              <td className="border border-gray-300"></td>
                              <td className="border border-gray-300"></td>
                            </tr>
                          </>
                        )}

                        {!takeShot && (
                          <tr>
                            <td  className="border border-gray-300">
                              <div className="flex  justify-end p-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    addSubPropertySum1(mainIndex, subIndex)
                                  }
                                  className="hover:bg-gray-200  rounded font-semibold text-[10px] mr-2"
                                >
                                  <FaPlus className="text-xs inline mr-1" /> Add
                          
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeSubPropertySum1(mainIndex, subIndex)
                                  }
                                  className="hover:bg-gray-200  rounded font-semibold text-[10px] mr-2"
                                  >
                                
                                  <HiMinusSm className="text-xs inline mr-1" />{" "}
                                Rem
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}

                        {/* SubPropertieSum - will appear when added */}
                        {subSection.subPropertieSum1?.map(
                          (subProp, subPropIndex) => (
                            <tr
                              key={`subprop-${mainIndex}-${subIndex}-${subPropIndex}`}
                            >
                              <td className="border h-7">
                                <input
                                  type="text"
                                  value={subProp.SubpropertyName}
                                  onChange={(e) =>
                                    handleSubPropertySum1Change(
                                      mainIndex,
                                      subIndex,
                                      subPropIndex,
                                      "SubpropertyName",
                                      e.target.value
                                    )
                                  }
                                  className="px-4 text-sm font-semibold w-[550px] border-l border-r border-gray-200"
                                  placeholder="Sub Property Sum"
                                />
                              </td>
                              <td className=" border-gray-300">
                                <input
                                  type="text"
                                  value={subProp.notes}
                                  onChange={(e) =>
                                    handleSubPropertySumChange(
                                      mainIndex,
                                      subIndex,
                                      subPropIndex,
                                      "notes",
                                      e.target.value
                                    )
                                  }
                                  className="w-full border font-semibold border-transparent px-1"
                                  placeholder=""
                                />
                              </td>

                              <td className=" border-gray-300">
                                <input
                                  type="number"
                                  onChange={(e) =>
                                    handleSubPropertySumChange(
                                      mainIndex,
                                      subIndex,
                                      subPropIndex,
                                      "date1",
                                      Number(e.target.value)
                                    )
                                  }
                                  className="border font-semibold border-transparent w-full pl-2"
                                  placeholder=""
                                />
                              </td>
                              <td className=" border-gray-300">
                                <input
                                  type="number"
                                  onChange={(e) =>
                                    handleSubPropertySumChange(
                                      mainIndex,
                                      subIndex,
                                      subPropIndex,
                                      "date2",
                                      Number(e.target.value)
                                    )
                                  }
                                  className="border font-semibold border-transparent w-full pl-2"
                                  placeholder=""
                                />
                              </td>
                            </tr>
                          )
                        )}

                        {/* Properties */}
                        {subSection.properties.map((property, propIndex) => (
                          <tr
                            key={`prop-${mainIndex}-${subIndex}-${propIndex}`}
                          >
                            <td className="border h-7">
                              <input
                                type="text"
                                value={property.propertyName}
                                onChange={(e) =>
                                  handlePropertyChange(
                                    mainIndex,
                                    subIndex,
                                    propIndex,
                                    "propertyName",
                                    e.target.value
                                  )
                                }
                                className="px-4 text-sm w-[550px] border-l  border-r border-gray-200"
                                placeholder="properties"
                              />
                            </td>
                            <td className="border border-gray-300">
                              <input
                                type="text"
                                value={property.notes}
                                onChange={(e) =>
                                  handlePropertyChange(
                                    mainIndex,
                                    subIndex,
                                    propIndex,
                                    "notes",
                                    e.target.value
                                  )
                                }
                                className="w-full  border-transparent px-1"
                                placeholder=""
                              />
                            </td>
                            <td className="border border-gray-300">
                              <input
                                type="number"
                                value={property.date1 ?? ''}
                                onChange={(e) =>
                                  handlePropertyChange(
                                    mainIndex,
                                    subIndex,
                                    propIndex,
                                    "date1",
                                    Number(e.target.value)
                                  )
                                } 
                                className="border border-transparent w-full pl-2"
                                placeholder=""
                              />
                            </td>
                            <td className="border border-gray-300">
                              <input
                                type="number"
                                value={property.date2 ?? ''}
                                onChange={(e) =>
                                  handlePropertyChange(
                                    mainIndex,
                                    subIndex,
                                    propIndex,
                                    "date2",
                                    Number(e.target.value)
                                  )
                                }
                                className="border border-transparent w-full pl-2"
                                placeholder=""
                              />
                            </td>
                          </tr>
                        ))}

                        {/* SubPropertieSum - will appear when added */}
                        {subSection.subPropertieSum?.map(
                          (subProp, subPropIndex) => (
                            <tr
                              key={`subprop-${mainIndex}-${subIndex}-${subPropIndex}`}
                            >
                              <td className="border h-7">
                                <input
                                  type="text"
                                  value={subProp.SubpropertyName}
                                  onChange={(e) =>
                                    handleSubPropertySumChange(
                                      mainIndex,
                                      subIndex,
                                      subPropIndex,
                                      "SubpropertyName",
                                      e.target.value
                                    )
                                  }
                                  className="px-4 text-sm font-semibold w-[550px] border-l border-r border-gray-200"
                                  placeholder="Sub Property Sum"
                                />
                              </td>
                              <td className=" border-gray-300">
                                <input
                                  type="text"
                                  value={subProp.notes}
                                  onChange={(e) =>
                                    handleSubPropertySumChange(
                                      mainIndex,
                                      subIndex,
                                      subPropIndex,
                                      "notes",
                                      e.target.value
                                    )
                                  }
                                  className="w-full border font-semibold border-transparent px-1"
                                  placeholder=""
                                />
                              </td>

                              <td className=" border-gray-300">
                                <input
                                  type="number"
                                  onChange={(e) =>
                                    handleSubPropertySumChange(
                                      mainIndex,
                                      subIndex,
                                      subPropIndex,
                                      "date1",
                                      Number(e.target.value)
                                    )
                                  }
                                  className="border font-semibold border-transparent w-full pl-2"
                                  placeholder=""
                                />
                              </td>
                              <td className=" border-gray-300">
                                <input
                                  type="number"
                                  onChange={(e) =>
                                    handleSubPropertySumChange(
                                      mainIndex,
                                      subIndex,
                                      subPropIndex,
                                      "date2",
                                      Number(e.target.value)
                                    )
                                  }
                                  className="border font-semibold border-transparent w-full pl-2"
                                  placeholder=""
                                />
                              </td>
                            </tr>
                          )
                        )}

                        {!takeShot && (
                          <tr>
                            <td className="border border-gray-300">
                              <div className="flex justify-end pr-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    addSubPropertySum(mainIndex, subIndex)
                                  }
                                  className="hover:bg-gray-400 p-1 text-xs bg-slate-200 rounded-full font-semibold "
                                >
                                  <FaPlus className="text-xs" /> Add
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeSubPropertySum(mainIndex, subIndex)
                                  }
                                  className="ml-2 hover:bg-gray-400 p-1 text-xs bg-slate-200  rounded-full font-semibold"
                                >
                                  <HiMinusSm className="text-xs" /> rem
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}

                        {/* Sub Section Total */}
                        <tr className="bg-slate-300">
                          <td className="border border-gray-300 px-2 pl-4 text-[14px] font-semibold">
                            <input
                              type="text"
                              name="totalof the data"
                              className=" bg-slate-300 w-full"
                            />
                          </td>
                          <td className="border border-gray-300"></td>
                          <td className="border border-gray-300 pl-2">
                            {
                              calculateSubSectionTotal(mainIndex, subIndex)
                                .date1
                            }
                          </td>
                          <td className="border border-gray-300 pl-2">
                            {
                              calculateSubSectionTotal(mainIndex, subIndex)
                                .date2
                            }
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}

                    {/* Main Section Total Row */}
                    <tr className="bg-gray-350">
                      <td className="border   text-[14px] border-gray-300 px-2 pl-4 font-bold">
                        <input type="text" name="" className="w-full" />
                      </td>
                      <td className="border border-gray-300"></td>
                      <td className="border border-gray-300 text-lg font-bold px-2">
                        {calculateMainTotal(mainIndex).totalDate1}
                      </td>
                      <td className="border border-gray-300 text-lg font-bold px-2">
                        {calculateMainTotal(mainIndex).totalDate2}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}

            {/* Grand Total Row */}
            {formData.mainSections.length > 1 && (
              <div className="mt-4">
                <table className="w-full border-collapse border border-gray-300">
                  <tbody>
                    <tr className="bg-gray-400">
                      <td className="border text-[16px] border-gray-300 px-2 pl-4 font-bold py-2 w-[450px]">
                        GRAND TOTAL
                      </td>
                      <td className="border border-gray-300"></td>
                      <td className="border border-gray-300 text-lg font-bold px-2">
                        {calculateGrandTotal().grandTotalDate1}
                      </td>
                      <td className="border border-gray-300 text-lg font-bold px-2">
                        {calculateGrandTotal().grandTotalDate2}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="mt-2 flex justify-end">
            {" "}
            <button
              className="bg-slate-300  text-black  px-3 py-2 hover:bg-slate-400  font-semibold mx-2 font-serif text-sm"
              onClick={captureScreen}
              disabled={takeShot}
            >
              {takeShot ? "Processing..." : "Capture & Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default AddNewTable;
