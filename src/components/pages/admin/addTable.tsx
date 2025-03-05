/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiMinusSm } from "react-icons/hi";
import domtoimage from "dom-to-image";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import { AdminAddTableAction } from "../../../reduxKit/actions/admin/addTableAction";
import { useDispatch } from "react-redux";
 
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { GrLanguage } from "react-icons/gr";
import { useSelector } from "react-redux";
import { AdminLanguageChange } from "../../../reduxKit/actions/admin/adminLanguage";

interface PropertyRow {
  propertyName: string;
  notes: string;
  date1: number;
  date2: number;
}

interface SubSection {
  subName: string;
  subNameArabic: string;
  properties: PropertyRow[];
}

interface FormData {
  mainName: string;
  mainNameArabic: string;
  subSections: SubSection[];
}

const AddTable = React.memo(() => {
  const { adminLanguage } = useSelector(
    (state: RootState) => state.adminLanguage
  );
  const [language, setLanguage] = useState<string>("Arabic");

  const [tadawalCode, setTadawalCode] = useState("");
  const [documents, setDocuments] = useState();
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
  const dispatch = useDispatch<AppDispatch>();
  const [takeShot, setTakeShot] = useState<boolean>(false);
  const navigate = useNavigate();
  const [selectedTableType, setTableType] = useState("");
  const TableTypeArr = ["BalanceSheet", "ProfitLoss", "CashFlow"];
  const [formData, setFormData] = useState<FormData>({
    mainName: "",
    mainNameArabic: "",
    subSections: [
      {
        subName: "",
        subNameArabic: "",
        properties: [
          {
            propertyName: "",
            notes: "",
            date1: 0,
            date2: 0,
          },
        ],
      },
    ],
  });

 
  const toggleLanguage = async () => {
    const newLanguage = adminLanguage === "English" ? "Arabic" : "English";
    await dispatch(AdminLanguageChange(newLanguage));
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  const calculateMainTotal = () => {
    let totalDate1 = 0;
    let totalDate2 = 0;
    formData.subSections.forEach((subSection) => {
      const subTotal = calculateSubSectionTotal(
        formData.subSections.indexOf(subSection)
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

  const captureScreen = async () => {
    const node = document.getElementById("capture-area");
    if (!node) return;

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

      // Step 1: **Download Screenshot Before Uploading**
      const downloadLink = document.createElement("a");
      downloadLink.href = dataUrl;
      downloadLink.download = "screenshot.png";
      downloadLink.click(); // Triggers download

      const responseTow = await dispatch( AdminAddTableAction({
          tadawalCode,
          screenshotFile,
          selectedYear,
          quarterYear,
          selectedTableType,
          language,
        })
      );
      if (responseTow.payload?.success === true) {
        toast.success(responseTow.payload.message);
      }
      setTakeShot(false);
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

  const handleMainNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubSectionChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newSubSections = [...formData.subSections];
    newSubSections[index] = {
      ...newSubSections[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      subSections: newSubSections,
    });
  };

  const handlePropertyChange = (
    subIndex: number,
    propIndex: number,
    field: string,
    value: string | number
  ) => {
    const newSubSections = [...formData.subSections];
    newSubSections[subIndex].properties[propIndex] = {
      ...newSubSections[subIndex].properties[propIndex],
      [field]: value,
    };
    setFormData({
      ...formData,
      subSections: newSubSections,
    });
  };

  const addProperty = (subIndex: number) => {
    const newSubSections = [...formData.subSections];
    newSubSections[subIndex].properties.push({
      propertyName: "",
      notes: "",
      date1: 0,
      date2: 0,
    });
    setFormData({
      ...formData,
      subSections: newSubSections,
    });
  };
  const removeProperty = (subIndex: number, propertyIndex: number) => {
    const newSubSections = [...formData.subSections];
    newSubSections[subIndex].properties.splice(propertyIndex, 1);

    setFormData({
      ...formData,
      subSections: formData.subSections,
    });
  };

  const addSubSection = () => {
    setFormData({
      ...formData,
      subSections: [
        ...formData.subSections,
        {
          subName: "",
          subNameArabic: "",
          properties: [
            {
              propertyName: "",
              notes: "",
              date1: 0,
              date2: 0,
            },
          ],
        },
      ],
    });
  };
  const removeSubSection = () => {
    setFormData({
      ...formData,
      subSections: formData.subSections.slice(0, -1), // Creates new array without last element
    });
  };

  const calculateSubSectionTotal = (subIndex: number) => {
    return {
      date1: formData.subSections[subIndex].properties.reduce(
        (acc, curr) => acc + curr.date1,
        0
      ),
      date2: formData.subSections[subIndex].properties.reduce(
        (acc, curr) => acc + curr.date2,
        0
      ),
    };
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
 
    setTadawalCode(mydata[0].tadawalCode);
    setNickName(mydata[0].nickNameEn);
    setDocuments(mydata);
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

  if (documents) {
    console.log("keeekooooooooooooooooooo: ", documents);
  }

 
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
 
  useEffect(()=>{
    if (adminLanguage) setLanguage(adminLanguage);
  },[adminLanguage])
 

  return (
    <div className="p-4">
      <div className="p-2">
        <div className="flex flex-wrap justify-between items-center ">
                   <FaArrowCircleLeft
                     className="text-3xl  text-gray-700"
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
                     {language === "Arabic" ? "قسم الجدول"  : "Table Section"}
                     </h4>
                   </div>
                 </div>

 
 
        <div className="border mt-3 p-1 no-scrollbar">
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

          <form className="bg-white shadow-md rounded pb-4 w-full max-w-2xl">
            <div className="overflow-x-auto">
              <table
                id="capture-area"
                className="w-full border-collapse border border-gray-300"
              >
                <thead>
                  <tr>
                    <th className="border text-[14px] bg-slate-300 border-white px-4 py-[2px] text-left">
                      Contents
                    </th>
                    <th className="border  text-[14px] bg-slate-300 border-white px-[6px] py-[2px] text-center  ">
                      Notes
                    </th>
                    <th className="border  text-[14px] bg-slate-300 border-white px-[6px] py-[2px] text-center  ">
                      Date 1
                    </th>
                    <th className="border  text-[14px] bg-slate-300 border-white px-[6px] py-[2px] text-center ">
                      Date 2
                    </th>
                  </tr>
                </thead>
                

                <tbody>
                  {/* Main Name Row */}
                  <tr className=" ">
                    <td className="">
                      <div className="flex  h-7  ">
                        <input
                          type="text"
                          name="mainName"
                          value={formData.mainName}
                          onChange={handleMainNameChange}
                          className="text-sm px-4   border border-gray-200"
                          placeholder="Main Name"
                        />

                        <input
                          type="text"
                          name="mainNameArabic"
                          value={formData.mainNameArabic}
                          onChange={handleMainNameChange}
                          className="text-sm px-4   border border-gray-200"
                          placeholder="Main Name Arabic"
                        />
                        {!takeShot && ( // Hide buttons while taking a screenshot
                          <>
                            <button
                              type="button"
                              onClick={addSubSection}
                              className="ml-2 hover:bg-gray-100 p-1 rounded-full font-semibold text-[14px]"
                            >
                              <FaPlus />
                            </button>
                            <button
                              type="button"
                              onClick={removeSubSection}
                              className="ml-2  hover:bg-gray-100 p-1 rounded-full font-semibold text-[14px]"
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

                  {/* Sub Sections */}
                  {formData.subSections.map((subSection, subIndex) => (
                    <React.Fragment key={subIndex}>
                      {/* Sub Section Header */}
                      <tr className="  ">
                        <td className=" ">
                          <div className="flex h-7">
                            <input
                              type="text"
                              value={subSection.subName}
                              onChange={(e) =>
                                handleSubSectionChange(
                                  subIndex,
                                  "subName",
                                  e.target.value
                                )
                              }
                              className="text-sm px-4     border border-gray-200"
                              placeholder="SubName"
                            />
                            <input
                              type="text"
                              value={subSection.subNameArabic}
                              onChange={(e) =>
                                handleSubSectionChange(
                                  subIndex,
                                  "subNameArabic",
                                  e.target.value
                                )
                              }
                              className="text-sm px-4     border border-gray-200"
                              placeholder="SubName Arabic"
                            />
                            {!takeShot && ( // Hide buttons while taking a screenshot
                              <>
                                <button
                                  type="button"
                                  onClick={() => addProperty(subIndex)}
                                  className="ml-1 hover:bg-gray-100 p-2 rounded-full font-semibold text-[14px]"
                                >
                                  <FaPlus />
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeProperty(subIndex, subIndex)
                                  }
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

                      {/* Properties */}
                      {subSection.properties.map((property, propIndex) => (
                        <tr key={`${subIndex}-${propIndex}`}>
                          <td className="border  h-7 ">
                            <input
                              type="text"
                              value={property.propertyName}
                              onChange={(e) =>
                                handlePropertyChange(
                                  subIndex,
                                  propIndex,
                                  "propertyName",
                                  e.target.value
                                )
                              }
                              className="px-4 text-sm       border-l border-r  border-gray-200"
                              placeholder="properties"
                            />
                          </td>
                          <td className="border border-gray-300">
                            <input
                              type="text"
                              value={property.notes}
                              onChange={(e) =>
                                handlePropertyChange(
                                  subIndex,
                                  propIndex,
                                  "notes",
                                  e.target.value
                                )
                              }
                              className="w-full border border-transparent px-1"
                              placeholder="Notes"
                            />
                          </td>
                          <td className="border border-gray-300">
                            <input
                              type="number"
                              value={property.date1}
                              onChange={(e) =>
                                handlePropertyChange(
                                  subIndex,
                                  propIndex,
                                  "date1",
                                  Number(e.target.value)
                                )
                              }
                              className="    border  border-transparent w-full   pl-2"
                              placeholder="0"
                            />
                          </td>
                          <td className="border border-gray-300">
                            <input
                              type="number"
                              value={property.date2}
                              onChange={(e) =>
                                handlePropertyChange(
                                  subIndex,
                                  propIndex,
                                  "date2",
                                  Number(e.target.value)
                                )
                              }
                              className=" border  border-transparent w-full    pl-2"
                              placeholder="0"
                            />
                          </td>
                        </tr>
                      ))}

                      {/* Sub Section Total */}
                      <tr className="bg-slate-300 ">
                        <td className="border border-gray-300 px-2   pl-4  text-[14px] font-semibold">
                          Total {subSection.subName}
                        </td>
                        <td className="border border-gray-300"></td>
                        <td className="border border-gray-300 pl-2 ">
                          {calculateSubSectionTotal(subIndex).date1}
                        </td>
                        <td className="border border-gray-300 pl-2 ">
                          {calculateSubSectionTotal(subIndex).date2}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}

                  {/* Main Total Row */}
                  <tr className="bg-gray-350">
                    <td className="border text-[14px] border-gray-300   px-2 pl-4 font-bold">
                      Total {formData.mainName}
                    </td>
                    <td className="border border-gray-300"></td>
                    <td className="border border-gray-300 text-lg font-bold   px-2 ">
                      {calculateMainTotal().totalDate1}
                    </td>
                    <td className="border border-gray-300  text-lg font-bold   px-2 ">
                      {calculateMainTotal().totalDate2}
                    </td>
                  </tr>
                </tbody>
              </table>
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
    </div>
  );
});

export default AddTable;
