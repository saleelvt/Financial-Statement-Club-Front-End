/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import axios from "axios";
import { URL } from "../../../config/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ValidationModal from "../validationModal";

export type FieldKey = "Q1" | "Q2" | "Q3" | "Q4" | "S1" | "Board" | "Year";
export const axiosIn = axios.create({
  baseURL: URL,
});
interface DocumentPayload {
  fullNameEn: string;
  nickNameEn: string;
  tadawalCode: string;
  sector: string;
  formData: Record<FieldKey, FormField>;
}


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FormField } from "../../../interfaces/admin/addDoument";
import { DocumentSliceEn } from "../../../interfaces/admin/addDoument";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";

interface AddDocumentEnglishProps {
  formDataEn: Record<FieldKey, FormField>;
  tadawalCodeEn: string;
}

export const AddDocument: React.FC<AddDocumentEnglishProps> = React.memo(
  ({ formDataEn, tadawalCodeEn }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading } = useSelector((state: RootState) => state.adminEn);
       const [showToast, setShowToast] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [fullNameEn, setFullNameEn] = useState("");
    const [nickNameEn, setnickNameEn] = useState("");
    const [tadawalCode, setTadawalCode] = useState<string>(tadawalCodeEn || "");
    const [sector, setSector] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<Record<FieldKey, FormField>>(
      () => {
        return {
          Q1: {
            file: null,
            date: formDataEn.Q1.date || null,
            year: formDataEn.Q1.year || "",
            createAt: "",
          },
          Q2: {
            file: null,
            date: formDataEn.Q2.date || null,
            year: formDataEn.Q2.year || "",
            createAt: "",
          },
          Q3: {
            file: null,
            date: formDataEn.Q3.date || null,
            year: formDataEn.Q3.year || "",
            createAt: "",
          },
          Q4: {
            file: null,
            date: formDataEn.Q4.date || null,
            year: formDataEn.Q4.year || "",
            createAt: "",
          },
          S1: {
            file: null,
            date: formDataEn.S1.date || null,
            year: formDataEn.S1.year || "",
            createAt: "",
          },
          Board: {
            file: null,
            date: formDataEn.Board.date || null,
            year: formDataEn.Board.year || "",
            createAt: "",
          },
          Year: {
            file: null,
            date: formDataEn.Year.date || null,
            year: formDataEn.Year.year || "",
            createAt: "",
          },
        };
      }
    );

    useEffect(() => {
      // console.log("my form data is from the english document  ", formDataEn);
      if (tadawalCodeEn !== undefined && tadawalCodeEn !== tadawalCode) {
        setTadawalCode(tadawalCodeEn || ""); // Only update if the value is different
      }
      setFormData((prev) => ({
        ...prev,
        Q1: {
          date: formDataEn?.Q1?.date || null, // Only update date
          year: formDataEn?.Q1?.year || "", // Only update year
          //  createAt: formDataEn?.Q1?.createAt || "",
        },
        Q2: {
          date: formDataEn?.Q2?.date || null, // Only update date
          year: formDataEn?.Q2?.year || "", // Only update year
        },
        Q3: {
          date: formDataEn?.Q3?.date || null, // Only update date
          year: formDataEn?.Q3?.year || "", // Only update year
        },
        Q4: {
          date: formDataEn?.Q4?.date || null, // Only update date
          year: formDataEn?.Q4?.year || "", // Only update year
        },
        S1: {
          date: formDataEn?.S1?.date || null, // Only update date
          year: formDataEn?.S1?.year || "", // Only update year
        },
        Board: {
          date: formDataEn?.Board?.date || null, // Only update date
          year: formDataEn?.Board?.year || "", // Only update year
        },
        Year: {
          date: formDataEn?.Year?.date || null, // Only update date
          year: formDataEn?.Year?.year || "", // Only update year
        },
      }));
    }, [formDataEn, tadawalCodeEn]);

    useEffect(() => {
      handleSuggestionClick(tadawalCodeEn);
    }, [tadawalCodeEn]);

    const handleInputChange = async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = e.target.value;
      setTadawalCode(value);
      if (value.length > 0) {
        // Fetch suggestions only if input has 3 or more characters
        setIsLoading(true);
        try {
          const adminLanguage = "English";
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
      setnickNameEn(mydata.nickNameEn);
      setFullNameEn(mydata.fullNameEn);
      setTadawalCode(suggestion);
      setSector(mydata.sector);
      setSuggestions([]); // Clear suggestions after selecting one
    };

    const handleFileChange = (field: FieldKey, file: File | null) => {
      setFormData((prev) => ({
        ...prev,
        [field]: { ...prev[field], file },
      }));
    };

    const handleDateChange = (field: FieldKey, selectedDate: Date | null) => {
      setFormData((prev) => ({
        ...prev,
        [field]: { ...prev[field], date: selectedDate },
      }));
    };

    // Handle Year Change
    const handleYearChange = (field: FieldKey, year: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: { ...prev[field], year },
      }));
    };

    const addDocumentEnglish = createAsyncThunk(
      "admin/addDocument",
      async (adminCredentials: DocumentPayload) => {
        try {
          const formDataf = adminCredentials.formData;
          const isAnyFieldValid = Object.values(formDataf).some(
            (field) => field.file && field.date && field.year
          );

          if (!isAnyFieldValid) {
            setErrorMessage(
              "At least one field (Q1, Q2, Q3, Q4, S1, Year, Board) must be fully filled with file, date, and year."
            );
            setIsModalOpen(true);
            return;
          }

          const formData = new FormData();
          for (const [key, value] of Object.entries(
            adminCredentials?.formData || {}
          )) {
            if (
              value &&
              typeof value === "object" &&
              "file" in value &&
              value.file
            ) {
              if (
                typeof value.file === "string" ||
                value.file instanceof File
              ) {
                formData.append(key, value.file);
              } else {
                console.warn(`Invalid file type for key: ${key}`);
              }
              if (value.date instanceof Date) {
                formData.append(`${key}Date`, value.date.toISOString());
              } else {
                console.warn(`Invalid or missing date for key: ${key}`);
              }
              if (typeof value.year === "string") {
                formData.append(`${key}Year`, value.year);
              } else {
                console.warn(`Invalid or missing year for key: ${key}`);
              }
            } else {
              console.warn(`Skipping key: ${key}, value is null or invalid`);
            }
          }
          // Append other data
          formData.append("fullNameEn", adminCredentials?.fullNameEn);
          formData.append("nickNameEn", adminCredentials?.nickNameEn);
          formData.append("tadawalCode", adminCredentials?.tadawalCode);
          formData.append("sector", adminCredentials?.sector); 

          console.log("FormData contents:");
          formData.forEach((value, key) => {
            console.log(key, value);
          });

          const response = await axiosIn.post(
            `/api/v1/admin/addDocumentEnglish`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          return response.data;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          setErrorMessage(
            error.response?.data?.message || "Api response error Please Match the data "
          );
          setIsModalOpen(true);
        }
      }
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const payloadData: DocumentSliceEn = {
          fullNameEn,
          nickNameEn,
          tadawalCode,
          sector,
          formData,
          createdAt: new Date().toISOString(), // Example value
        };

        const response = await dispatch(
          addDocumentEnglish(payloadData)
        ).unwrap();
        if (response.success) {
        setShowToast(true);
        setFormData({
    Q1: { file: null, date: null, year: "", createAt: "" },
    Q2: { file: null, date: null, year: "", createAt: "" },
    Q3: { file: null, date: null, year: "", createAt: "" },
    Q4: { file: null, date: null, year: "", createAt: "" },
    S1: { file: null, date: null, year: "", createAt: "" },
    Board: { file: null, date: null, year: "", createAt: "" },
    Year: { file: null, date: null, year: "", createAt: "" },
  });
        setTimeout(() => {
          setShowToast(false);
  
        }, 10000); // 30 seconds
      

          // Reset form data
          await setFormData(
            (prevFormData) =>
              Object.fromEntries(
                Object.entries(prevFormData).map(([key, value]) => [
                  key as keyof typeof prevFormData,
                  { ...value, file: null,year:"",date:null},
                ])
              ) as Record<FieldKey, FormField>
          );
        }
      } catch (error: any) {
       console.log(error);
       
      }
    };

    return (
      <div className="p-2 border-t   w-full">
        <div className="">
          <form onSubmit={handleSubmit} className="">
            <div className="flex items-center lg:w-1/2 mt-1">
              <div className="relative">
                <label className="block placeholder:text-xs uppercase tracking-wide text-xs text-gray-700 font-semibold">
                  Tadawul Code
                </label>
                <input
                  className="appearance-none placeholder:text-xs lg:w-36 xs:w-28 block text-xs p-1 bg-gray-200 text-gray-700 border rounded leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Tadawul Code "
                  value={tadawalCode}
                  required
                  onChange={handleInputChange}
                />

                {isLoading && (
                  <p className="text-sm font-serif text-gray-600 mt-1">
                    Loading suggestions...
                  </p>
                )}

                {suggestions.length > 0 && (
                  <ul className="absolute z-10 w-full border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto bg-white shadow">
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
              </div>
              <div className="w-full text-xs p-1">
                <label className="block uppercase tracking-wide text-gray-700 font-bold">
                  Full Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Full Name"
                  value={fullNameEn}
                  onChange={(e) => setFullNameEn(e.target.value)}
                />
              </div>
            </div>

            <div className="flex     text-xs mt-1 gap-1  lg:w-1/2 ">
              <div className="  lg:w-full w-full  ">
                <label className="block uppercase  tracking-wide text-gray-700 font-bold ">
                  Nick Name
                </label>
                <input
                  className="appearance-none block w-full  bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Nick Name"
                  value={nickNameEn}
                  onChange={(e) => setnickNameEn(e.target.value)}
                />
              </div>

              <div className=" w-full ">
                <label className="block uppercase tracking-wide text-gray-700 font-bold ">
                  Sector
                </label>
                <input
                  className="appearance-none block w-full  bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Enter The Sector"
                  required
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                />
              </div>
            </div>

            <div className="grid text-sm  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-1  gap-1  ">
              <div className="">
                <label className="block uppercase tracking-wide text-gray-700 font-semibold ">
                  Q1
                </label>

                <input
                  type="file"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  onChange={(e) =>
                    handleFileChange("Q1", e.target.files?.[0] || null)
                  }
                />
                <div className=" flex justify-start gap-1  ">
                  <DatePicker
                    selected={formData.Q1.date}
                    onChange={(date) => handleDateChange("Q1", date)}
                    className="appearance-none block lg:w-[170px] xs:w-[130px] bg-gray-200 mt-1 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                    placeholderText="Choose Date"
                    popperPlacement="bottom-start"
                    portalId="root-portal"
                      showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  />

                  <input
                    type="text"
                    className="appearance-none block w-full  mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                    placeholder="Enter Year"
                    value={formData.Q1.year}
                    onChange={(e) => handleYearChange("Q1", e.target.value)}
                  />
                </div>
              </div>

              <div className="">
                <label className="block uppercase tracking-wide text-gray-700 font-semibold">
                  Q2
                </label>
                <input
                  type="file"
                  className="appearance-none block w-full   bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  onChange={(e) =>
                    handleFileChange("Q2", e.target.files?.[0] || null)
                  }
                />
                <div className=" flex justify-start gap-1  ">
                  <DatePicker
                    selected={formData.Q2.date}
                    onChange={(date) => handleDateChange("Q2", date)}
                    className="appearance-none block lg:w-[170px] xs:w-[130px] bg-gray-200 mt-1 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                    placeholderText="Choose Date"
                    popperPlacement="bottom-start"
                    portalId="root-portal"
                      showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  />
                  <input
                    type="text"
                    className="appearance-none block w-full   mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                    placeholder="Enter Year"
                    value={formData.Q2.year}
                    onChange={(e) => handleYearChange("Q2", e.target.value)}
                  />
                </div>
              </div>

              <div className="">
                <label className="block uppercase tracking-wide text-gray-700 font-semibold">
                  Q3
                </label>
                <input
                  type="file"
                  className="appearance-none block  w-full  bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  onChange={(e) =>
                    handleFileChange("Q3", e.target.files?.[0] || null)
                  }
                />
                <div className=" flex justify-start gap-1  ">
                  <DatePicker
                    selected={formData.Q3.date}
                    onChange={(date) => handleDateChange("Q3", date)}
                    className="appearance-none block lg:w-[170px] xs:w-[130px] bg-gray-200 mt-1 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                    placeholderText="Choose Date"
                    popperPlacement="bottom-start"
                    portalId="root-portal"
                      showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  />
                  <input
                    type="text"
                    className="appearance-none block w-full  mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                    placeholder="Enter Year"
                    value={formData.Q3.year}
                    onChange={(e) => handleYearChange("Q3", e.target.value)}
                  />
                </div>
              </div>

              <div className="">
                <label className="block uppercase tracking-wide text-gray-700 font-semibold">
                  Q4
                </label>
                <input
                  type="file"
                  className="appearance-none block w-full   bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  onChange={(e) =>
                    handleFileChange("Q4", e.target.files?.[0] || null)
                  }
                />
                <div className=" flex justify-start gap-1  ">
                  <DatePicker
                    selected={formData.Q4.date}
                    onChange={(date) => handleDateChange("Q4", date)}
                    className="appearance-none block lg:w-[170px] xs:w-[130px] bg-gray-200 mt-1 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                    placeholderText="Choose Date"
                    popperPlacement="bottom-start"
                    portalId="root-portal"
                      showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  />
                  <input
                    type="text"
                    className="appearance-none block w-full  mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                    placeholder="Enter Year"
                    value={formData.Q4.year}
                    onChange={(e) => handleYearChange("Q4", e.target.value)}
                  />
                </div>
              </div>
              <div className="">
                <label className="block uppercase tracking-wide text-gray-700 font-semibold">
                  SA
                </label>
                <input
                  type="file"
                  className="appearance-none block w-full   bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  onChange={(e) =>
                    handleFileChange("S1", e.target.files?.[0] || null)
                  }
                />
                <div className=" flex justify-start gap-1  ">
                  <DatePicker
                    selected={formData.S1.date}
                    onChange={(date) => handleDateChange("S1", date)}
                    className="appearance-none block lg:w-[170px] xs:w-[130px] bg-gray-200 mt-1 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                    placeholderText="Choose Date"
                    popperPlacement="bottom-start"
                    portalId="root-portal"
                      showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  />
                  <input
                    type="text"
                    className="appearance-none block w-full  mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                    placeholder="Enter Year"
                    value={formData.S1.year}
                    onChange={(e) => handleYearChange("S1", e.target.value)}
                  />
                </div>
              </div>

              <div className="">
                <label className="block uppercase tracking-wide text-gray-700 font-semibold">
                  Annual
                </label>
                <input
                  type="file"
                  className="appearance-none block w-full   bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  onChange={(e) =>
                    handleFileChange("Year", e.target.files?.[0] || null)
                  }
                />
                <div className=" flex justify-start gap-1  ">
                  <DatePicker
                    selected={formData.Year.date}
                    onChange={(date) => handleDateChange("Year", date)}
                    className="appearance-none block lg:w-[170px] xs:w-[130px] bg-gray-200 mt-1 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                    placeholderText="Choose Date"
                    popperPlacement="bottom-start"
                    portalId="root-portal"
                      showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  />
                  <input
                    type="text"
                    className="appearance-none block w-full  mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                    placeholder="Enter Year"
                    value={formData.Year.year}
                    onChange={(e) => handleYearChange("Year", e.target.value)}
                  />
                </div>
              </div>

              <div className="">
                <label className="block uppercase tracking-wide  text-gray-700 font-semibold">
                  Board
                </label>
                <input
                  type="file"
                  className="appearance-none block w-full  bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  onChange={(e) =>
                    handleFileChange("Board", e.target.files?.[0] || null)
                  }
                />
                <div className=" flex justify-start gap-1  ">
                  <DatePicker
                    selected={formData.Board.date}
                    onChange={(date) => handleDateChange("Board", date)}
                    className="appearance-none  block lg:w-[170px] xs:w-[130px] bg-gray-200 mt-1 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                    placeholderText="Choose Date"
                    popperPlacement="bottom-start"
                    portalId="root-portal"
                      showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  />
                  <input
                    type="text"
                    className="appearance-none block w-full  mt-1  bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                    placeholder="Enter Year"
                    value={formData.Board.year}
                    onChange={(e) => handleYearChange("Board", e.target.value)}
                  />
                </div>
              </div>
            </div>

              <div className="flex justify-between mt-4">
            <div className="">
              {showToast && (
                <div className="absolute left-13 bg-green-100 border border-green-400 text-green-700 px-10  py-1 font-semibold rounded shadow">
                  Submited Successfully On :{" "}
                  {`${nickNameEn}-${tadawalCode}`}
                </div>
              )}
            </div>

            {loading ? (
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
                <span className="mt-4 text-gray-700 font-bold">
                  Submitting...
                </span>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-gradient-to-r mr-4 from-gray-500 via-gray-600 to-gray-700 text-white font-bold py-[3px] px-5 rounded focus:outline-none"
              >
                Submit
              </button>
            )}
          </div>
          </form>
          <ValidationModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            message={errorMessage}
          />
          {/* <AddDocumentArabic formDataEn={formData} tadawalCodeEn={tadawalCode}  /> */}
        </div>
      </div>
    );
  }
);
