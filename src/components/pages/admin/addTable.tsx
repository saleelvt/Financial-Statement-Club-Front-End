/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiMinusSm } from "react-icons/hi";
import domtoimage from "dom-to-image";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import { AdminAddTableAction } from "../../../reduxKit/actions/admin/addTableAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reduxKit/store";

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

const AddTable = () => {
  const [tadawalCode, setTadawalCode] = useState("");
  const [nickName, setNickName] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [takeShot, setTakeShot] = useState<boolean>(false);

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

  const calculateMainTotal = () => {
    let totalDate1 = 0;
    let totalDate2 = 0;

    formData.subSections.forEach((subSection) => {
      const subTotal = calculateSubSectionTotal(formData.subSections.indexOf(subSection));
      totalDate1 += subTotal.date1;
      totalDate2 += subTotal.date2;
    });

    return { totalDate1, totalDate2 };
  };

  const captureScreen = async () => {
    const node = document.getElementById("capture-area");
    if (!node) return;
  
    setTakeShot(true); // Hide UI elements while capturing
    console.log("Taking Screenshot...");
  
    // Add the class to hide the scrollbar on the parent and child elements
    node.classList.add("no-scrollbar");
    const childElements = node.querySelectorAll("*");
    childElements.forEach((element) => element.classList.add("no-scrollbar"));
  
    try {
      const dataUrl = await domtoimage.toPng(node);
  
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
      // Dispatch action with tadawalCode, nickName, and the screenshot file
      await dispatch(
        AdminAddTableAction({ tadawalCode, nickName, screenshotFile })
      );
  
      console.log("Screenshot captured and passed to Redux action.");
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    } finally {
      // Remove the class to restore the scrollbar on the parent and child elements
      node.classList.remove("no-scrollbar");
      const childElements = node.querySelectorAll("*");
      childElements.forEach((element) => element.classList.remove("no-scrollbar"));
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
      `/api/v1/admin/getDataWithSuggestions?name=${suggestion}&language=${adminLanguage}`,
      config,
      {}
    );
    const mydata = response.data.data;
    console.log("tawadal code response : now ", response);

    setTadawalCode(mydata.tadawalCode);
    setNickName(mydata.nickNameEn);

    setSuggestions([]); // Clear suggestions after selecting one
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     console.log("Form Data:", formData);
  //     toast.success("Table successfully added");
  //   } catch (error: any) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error!",
  //       text: error.message,
  //       timer: 3000,
  //       toast: true,
  //       showConfirmButton: false,
  //       timerProgressBar: true,
  //     });
  //   }
  // };

  return (
    <div className="p-4">
    <div className="p-2">
      <Link to="/home" className="flex items-center">
        <FaArrowCircleLeft className="text-gray-600 text-3xl" />
      </Link>

      <div id="capture-area" className="border mt-3 p-1 no-scrollbar">
        <div className="flex-1">
          <input
            className="appearance-none block w-1/4 bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
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
                  className="px-2 text-sm font-semibold  py-1 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-center p-1 bg-yellow-50">
          <h1 className="text-lg text-black font-bold">{nickName}</h1>
        </div>

        <form className="bg-white shadow-md rounded pb-8 w-full max-w-7xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 text-left"></th>
                  <th className="border bg-slate-400 border-gray-300 p-2 text-center w-24">
                    Notes
                  </th>
                  <th className="border bg-slate-400 border-gray-300 p-2 text-center w-40">
                    Date 1
                  </th>
                  <th className="border bg-slate-400 border-gray-300 p-2 text-center w-40">
                    Date 2
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* Main Name Row */}
                <tr className="bg-gray-50">
                  <td className="border border-gray-300">
                    <div className="flex justify-start items-center w-1/2 bg-blue-600 p-2">
                      <input
                        type="text"
                        name="mainName"
                        value={formData.mainName}
                        onChange={handleMainNameChange}
                        className="text-sm px-4 py-1 border rounded"
                        placeholder="Main Name"
                      />

                      <input
                        type="text"
                        name="mainNameArabic"
                        value={formData.mainNameArabic}
                        onChange={handleMainNameChange}
                        className="text-sm px-4 py-1 border rounded"
                        placeholder="Main Name Arabic"
                      />
                      {!takeShot && ( // Hide buttons while taking a screenshot
                        <>
                          <button
                            type="button"
                            onClick={addSubSection}
                            className="ml-2 hover:bg-gray-300 font-bold text-lg"
                          >
                            <FaPlus />
                          </button>
                          <button
                            type="button"
                            onClick={removeSubSection}
                            className="ml-2 hover:bg-gray-300 font-bold text-lg"
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
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300">
                        <div className="flex justify-between items-center w-1/2 bg-red-200 p-2">
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
                            className="text-sm px-4 py-1 border rounded"
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
                            className="text-sm px-4 py-1 border rounded"
                            placeholder="SubName Arabic"
                          />
                          {!takeShot && ( // Hide buttons while taking a screenshot
                            <>
                              <button
                                type="button"
                                onClick={() => addProperty(subIndex)}
                                className="ml-2"
                              >
                                <FaPlus />
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  removeProperty(subIndex, subIndex)
                                }
                                className="ml-2 hover:bg-gray-300"
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
                        <td className="border border-gray-300 px-1">
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
                            className="px-4 text-sm border rounded"
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
                            className="w-full border rounded"
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
                            className="w-full p-1 border rounded"
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
                            className="w-full p-1 border rounded"
                            placeholder="0"
                          />
                        </td>
                      </tr>
                    ))}

                    {/* Sub Section Total */}
                    <tr className="bg-gray-300">
                      <td className="border border-gray-300 p-2 pl-4  text-md font-semibold">
                        Total {subSection.subName}
                      </td>
                      <td className="border border-gray-300"></td>
                      <td className="border border-gray-300 p-2">
                        {calculateSubSectionTotal(subIndex).date1}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {calculateSubSectionTotal(subIndex).date2}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}

                {/* Main Total Row */}
                <tr className="bg-gray-350">
                  <td className="border text-lg border-gray-300 p-2 pl-4 font-bold">
                    Total {formData.mainName}
                  </td>
                  <td className="border border-gray-300"></td>
                  <td className="border border-gray-300 text-lg font-bold p-2">
                    {calculateMainTotal().totalDate1}
                  </td>
                  <td className="border border-gray-300  text-lg font-bold p-2">
                    {calculateMainTotal().totalDate2}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-12 flex justify-end">
            {" "}
            <button
              className="bg-gray-600  text-white p-2 rounded-lg font-serif text-sm"
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
};

export default AddTable;
