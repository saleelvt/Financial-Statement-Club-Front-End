/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FieldKey } from "../../../interfaces/admin/addDoument";
import { FormField } from "../../../interfaces/admin/addDoument"; 
// import { addDocumentArabic } from "../../../reduxKit/actions/admin/addDocumentArabicAction";
import { DocumentSliceAr } from "../../../interfaces/admin/addDoument";
import { commonRequest } from "../../../config/api";
import { config, URL } from "../../../config/constants";
import { FaArrowCircleRight } from "react-icons/fa";
import ValidationModal from "../validationModal";
import { AddDocument } from "./addDocumentEn";
import { createAsyncThunk } from "@reduxjs/toolkit"; 
import Swal from "sweetalert2";

interface DocumentPayload {
  fullNameAr: string;
  nickNameAr: string;
  tadawalCode: string;
  sector: string;
  formData: Record<FieldKey, FormField>;
}
export const axiosIn = axios.create({
  baseURL: URL,
});

const AddDocumentArabic: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.adminAr);
  const [fullNameAr, setFullNameAr] = useState("");
  const [nickNameAr, setnickNameAr] = useState("");
  const [tadawalCode, setTadawalCode] = useState("");
  const [sector, setSector] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<Record<FieldKey, FormField>>({
    Q1: { file: null, date: null, year: "", createAt: "" },
    Q2: { file: null, date: null, year: "", createAt: "" },
    Q3: { file: null, date: null, year: "", createAt: "" },
    Q4: { file: null, date: null, year: "", createAt: "" },
    S1: { file: null, date: null, year: "", createAt: "" },
    Board: { file: null, date: null, year: "", createAt: "" },
    Year: { file: null, date: null, year: "", createAt: "" },
  });

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const adminLanguage = "Arabic";
    const response = await commonRequest(
      "GET",
      `/api/v1/admin/getDataWithSuggestions?name=${suggestion}&language=${adminLanguage}`,
      config,
      {}
    );
    const mydata = response.data.data;
    setnickNameAr(mydata.nickNameAr);
    setFullNameAr(mydata.fullNameAr);

    setTadawalCode(mydata.tadawalCode);
    setSector(mydata.sector);
    setSuggestions([]); // Clear suggestions after selecting one
  };

  const handleFileChange = (field: FieldKey, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], file },
    }));
  };

  const handleDateChange = (field: FieldKey, date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        date,
      },
    }));
  }; 

  const handleYearChange = (field: FieldKey, year: string) => {
    setFormData((prev) => {
      // If Q1 is being updated, update all fields
      if (field === "Q1") {
        const updated = Object.fromEntries(
          Object.entries(prev).map(([key, value]) => [key, { ...value, year }])
        ) as Record<FieldKey, FormField>;
        return updated;
      }

      // Otherwise, only update the specific field
      return {
        ...prev,
        [field]: { ...prev[field], year },
      };
    });
  };

  
  // Your Redux thunk - with minimal changes
  const addDocumentArabic = createAsyncThunk(
    "admin/addDocumentArabic",
    async (adminCredentials: DocumentPayload) => {
      try {
        // ✅ Validate input
        const formDataf = adminCredentials.formData;
        // Check if at least one field is fully filled
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
  
        // ✅ Create FormData
        const formData = new FormData();
        for (const [key, value] of Object.entries(adminCredentials.formData)) {
          if (value.file) formData.append(key, value.file);
          if (value.date instanceof Date)
            formData.append(`${key}Date`, value.date.toISOString());
          if (value.year) formData.append(`${key}Year`, value.year);
        }
        formData.append("fullNameAr", adminCredentials.fullNameAr);
        formData.append("nickNameAr", adminCredentials.nickNameAr);
        formData.append("tadawalCode", adminCredentials.tadawalCode);
        formData.append("sector", adminCredentials.sector);
  
        console.log("FormData contents:");
        formData.forEach((value, key) => {
          console.log("my key of the arabic aned : ", key, "some data of the tree: ", value);
        });
  
        // Reset progress to 0 before starting
   
  
        const response = await axiosIn.post("/api/v1/admin/addDocumentArabic",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
      
          }
        );
        // Always set progress to 100% on successful completio
        return response.data;
      } catch (error: any) {
        // Reset progress on error
     
        
        setErrorMessage(
          error.response?.data?.message || "Something went s wrong!"
        );
        setIsModalOpen(true);
        throw error; // Re-throw to be caught by the component
      }
    }
  );
  
  // Your component submit handler with minimal changes
  const handleSubmitArabicDoc = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      


      
      const payloadData: DocumentSliceAr = {
        fullNameAr,
        nickNameAr,
        tadawalCode,
        sector,
        formData,
        createdAt: new Date().toISOString(),
      };
      
      const response = await dispatch(addDocumentArabic(payloadData)).unwrap();
  
      if (response && response.success) {
        toast.success(response.message);
  
        // Reset form data
        await setFormData(
          (prevFormData) =>
            Object.fromEntries(
              Object.entries(prevFormData).map(([key, value]) => [
                key as keyof typeof prevFormData,
                { ...value, file: null },
              ])
            ) as Record<FieldKey, FormField>
        );
      } 
    } catch (error: any) {
      console.error("Submit error:", error);
      
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message || "Something went wrong!",
        timer: 3000,
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }
  };
  return (
    <div className="lg:mx-10 m ">
      <div className="flex flex-col items-center min-h-screen ">
        <form
          onSubmit={handleSubmitArabicDoc}
          className="bg-white      w-full p-2 "
          dir="rtl"
        >
          <div className="flex xs:gap-2   ">
            <FaArrowCircleRight
              className="text-3xl text-gray-500"
              onClick={() => navigate("/home")}
            />
            <h2 className="text-lg lg:mr-2 font-bold text-center text-gray-700">
              إضافة تقرير (بالعربي){" "}
            </h2>
          </div>

          <div className="">
            <div className="flex   items-center  lg:w-1/2 mt-1  ">
              <div className="  ">
                <label className="block uppercase  tracking-wide text-sm text-gray-700 font-semibold ">
                  رمز تداول
                </label>
                <input
                  className="appearance-none xs:w-24 block  text-sm p-1 bg-gray-200 text-gray-700 border rounded  leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="أدخل رمز تداول"
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
                  <ul className="border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto bg-white">
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

              <div className="p-1 w-full   ">
                <label className="block uppercase   font-semibold text-sm tracking-wide text-gray-700 ">
                  الاسم الكامل{" "}
                  {/* <span className="font-mono text-xs"> (بالعربية)</span> */}
                </label>
                <input
                  className="appearance-none w-full p-1 block text-sm bg-gray-200 text-gray-700 border rounded  leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="الاسم الكامل"
                  value={fullNameAr}
                  onChange={(e) => setFullNameAr(e.target.value)}
                />
              </div>
            </div>

            <div className="flex xs:w-full   lg:w-1/2  ">
              <div className=" lg:w-full  xs:w-64  p-1"> 
                <label className="block uppercase tracking-wide text-gray-700 font-semibold text-sm ">
                  الاسم المختصر{" "}
                </label>
                <input
                  className="appearance-none block w-full text-sm  p-1 bg-gray-200 text-gray-700 border rounded  leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="الاسم المختصر"
                  value={nickNameAr}
                  onChange={(e) => setnickNameAr(e.target.value)}
                />
              </div>

              <div className="   p-1  ">
                <label className="block uppercase text-sm tracking-wide text-gray-700 font-semibold ">
                  القطاع
                </label>
                <input
                  className="appearance-none block lg:w-72 bg-gray-200 text-gray-700 border rounded  p-1 text-sm leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="أدخل القطاع"
                  required
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2  md:grid-cols-2 lg:grid-cols-4  gap-2 text-sm ">
            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold">
                ر 1
              </label>
              <input
                type="file"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                onChange={(e) =>
                  handleFileChange("Q1", e.target.files?.[0] || null)
                }
              />
              <div className=" flex justify-start gap-1 ">
                <DatePicker
                  selected={formData.Q1.date}
                  onChange={(date) => handleDateChange("Q1", date)}
                  className="appearance-none block lg:w-[170px] xs:w-[130px] text-sm bg-gray-200 mt-1 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  calendarClassName="custom-datepicker"
                  placeholderText="اختر التاريخ"
                />

                <input
                  type="text"
                  className="appearance-none block w-full  mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                  placeholder="أدخل السنة"
                  value={formData.Q1.year}
                  onChange={(e) => handleYearChange("Q1", e.target.value)}
                />
              </div>
            </div>

            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold">
                ر2
              </label>
              <input
                type="file"
                className="appearance-none block  w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                onChange={(e) =>
                  handleFileChange("Q2", e.target.files?.[0] || null)
                }
              />
              <div className=" flex justify-start gap-1  ">
                <DatePicker
                  selected={formData.Q2.date}
                  onChange={(date) => handleDateChange("Q2", date)}
                  className="appearance-none block lg:w-[170px] xs:w-[130px]  p-1 mt-1 bg-gray-200 text-gray-700 border rounded  leading-tight focus:outline-none focus:bg-white"
                  placeholderText="اختر التاريخ"
                />
                <input
                  type="text"
                  className="appearance-none block w-full  p-1 mt-1 bg-gray-200 text-gray-700 border rounded leading-tight focus:outline-none focus:bg-white"
                  placeholder="أدخل السنة"
                  value={formData.Q2.year}
                  onChange={(e) => handleYearChange("Q2", e.target.value)}
                />
              </div>
            </div>
            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold">
                ر3
              </label>
              <input
                type="file"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                onChange={(e) =>
                  handleFileChange("Q3", e.target.files?.[0] || null)
                }
              />
              <div className=" flex justify-start gap-1  ">
                <DatePicker
                  selected={formData.Q3.date}
                  onChange={(date) => handleDateChange("Q3", date)}
                  className="appearance-none block  mt-1 lg:w-[170px] xs:w-[130px] bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholderText="اختر التاريخ"
                />
                <input
                  type="text"
                  className="appearance-none block w-full  mt-1 bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholder="أدخل السنة"
                  value={formData.Q3.year}
                  onChange={(e) => handleYearChange("Q3", e.target.value)}
                />
              </div>
            </div>
            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold">
                ر4
              </label>
              <input
                type="file"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                onChange={(e) =>
                  handleFileChange("Q4", e.target.files?.[0] || null)
                }
              />
              <div className=" flex justify-start gap-1  ">
                <DatePicker
                  selected={formData.Q4.date}
                  onChange={(date) => handleDateChange("Q4", date)}
                  className="appearance-none block lg:w-[170px] xs:w-[130px] mt-1 bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholderText="اختر التاريخ"
                />
                <input
                  type="text"
                  className="appearance-none block w-full  mt-1 bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholder="أدخل السنة"
                  value={formData.Q4.year}
                  onChange={(e) => handleYearChange("Q4", e.target.value)}
                />
              </div>
            </div>
            <div className=" ">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold">
                ن.س
              </label>
              <input
                type="file"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                onChange={(e) =>
                  handleFileChange("S1", e.target.files?.[0] || null)
                }
              />
              <div className=" flex justify-start gap-1  ">
                <DatePicker
                  selected={formData.S1.date}
                  onChange={(date) => handleDateChange("S1", date)}
                  className="appearance-none block lg:w-[170px] xs:w-[130px] mt-1 bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholderText="اختر التاريخ"
                />
                <input
                  type="text"
                  className="appearance-none block w-full  mt-1 bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholder="أدخل السنة"
                  value={formData.S1.year}
                  onChange={(e) => handleYearChange("S1", e.target.value)}
                />
              </div>
            </div>
            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold">
                السنوي
              </label>
              <input
                type="file"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                onChange={(e) =>
                  handleFileChange("Year", e.target.files?.[0] || null)
                }
              />
              <div className=" flex justify-start gap-1  ">
                <DatePicker
                  selected={formData.Year.date}
                  onChange={(date) => handleDateChange("Year", date)}
                  className="appearance-none block lg:w-[170px] xs:w-[130px] mt-1 bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholderText="اختر التاريخ"
                />
                <input
                  type="text"
                  className="appearance-none block w-full  mt-1  bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholder="أدخل السنة"
                  value={formData.Year.year}
                  onChange={(e) => handleYearChange("Year", e.target.value)}
                />
              </div>
            </div>

            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold">
                المجلس
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
                  className="appearance-none block lg:w-[170px] xs:w-[130px]  mt-1 bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholderText="اختر التاريخ"
                />
                <input
                  type="text"
                  className="appearance-none block  w-full mt-1  bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholder="أدخل السنة"
                  value={formData.Board.year}
                  onChange={(e) => handleYearChange("Board", e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex  justify-end items-center mt-4 w-full h-12 relative">
            {loading ? (
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
                <span className="mt-4 text-gray-700 font-bold">{`جاري التحميل...`}</span>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-gradient-to-r mr-4 from-gray-500 via-gray-600 to-gray-700 text-white font-bold py-[1.5px] px-9 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                رفع
              </button>
            )}

          
          </div>
        </form>
        <ValidationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message={errorMessage}
        />

        <AddDocument formDataEn={formData} tadawalCodeEn={tadawalCode} />
      </div>
    </div>
  );
});

export default AddDocumentArabic;
