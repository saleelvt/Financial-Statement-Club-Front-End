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
  const [progress, setProgress] = useState<number>(0);
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
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], year },
    }));
  };

  const addDocumentArabic = createAsyncThunk(
    "admin/addDocumentArabic",
    async (
      adminCredentials: DocumentPayload,
      {  dispatch }
    ) => {
      try {
        console.log("Submitting Arabic document: ", adminCredentials);

        // Validate at least one field
        const isAnyFieldValid = Object.values(adminCredentials.formData).some(
          (field) => field.file && field.date && field.year
        );
        if (!isAnyFieldValid) {
          setErrorMessage(
            "At least one field (Q1, Q2, Q3, Q4, S1, Year, Board) must be fully filled with file, date, and year."
          );
          setIsModalOpen(true); // Open the modal
          return;
        }
        setProgress(0);
        // Create FormData
        const formData = new FormData();
        for (const [key, value] of Object.entries(adminCredentials.formData)) {
          if (value.file) formData.append(key, value.file);
          if (value.date instanceof Date)
            formData.append(`${key}Date`, value.date.toISOString());
          if (value.year) formData.append(`${key}Year`, value.year);
        }

        // Append other fields
        formData.append("fullNameAr", adminCredentials.fullNameAr);
        formData.append("nickNameAr", adminCredentials.nickNameAr);
        formData.append("tadawalCode", adminCredentials.tadawalCode);
        formData.append("sector", adminCredentials.sector);

        // Dispatch Upload Started Action
        dispatch({ type: "UPLOAD_STARTED" });

        // Send API request with upload progress
        const response = await axiosIn.post(
          `/api/v1/admin/addDocumentArabic`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
              if (progressEvent.total) {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                setProgress(percentCompleted);
              }
            },
          }
        );

        return response.data;
      } catch (error: any) {
        setErrorMessage(error.response?.data?.message || "Something went wrong!");
      setIsModalOpen(true); // Open the modal on error
      }
    }
  );

  const handleSubmitArabicDoc = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const payloadData: DocumentSliceAr = {
        fullNameAr,
        nickNameAr,
        tadawalCode,
        sector,
        formData,
        createdAt: new Date().toISOString(), // Example value
      };

      const response = await dispatch(addDocumentArabic(payloadData)).unwrap();
      if(response.success){
        console.log("my file pload response , ", response, progress);

        toast.success("Document successfully added");
        setFormData(
          (prevFormData) =>
            Object.fromEntries(
              Object.entries(prevFormData).map(([key, value]) => [
                key as keyof typeof prevFormData, // Explicitly assert key type
                { ...value, file: null },
              ])
            ) as Record<FieldKey, FormField>
        );
      }
    
    } catch (error: any) {
     console.log("erorr",error);
     
    }
  };
  return (
    <div className=" mt-4">
      <div className="flex flex-col items-center lg:py-4 min-h-screen px-4 ">
        <form
          onSubmit={handleSubmitArabicDoc}
          className="bg-white shadow-md rounded px-2 pt-2 pb-8 w-full max-w-lg lg:max-w-4xl space-y-4"
          dir="rtl"
        >
          <div className="flex   ">
            <FaArrowCircleRight
              className="text-3xl text-gray-600"
              onClick={() => navigate(-1)}
            />
            <h2 className="text-2xl lg:mr-12 font-bold text-center text-gray-700">
              إضافة مستند
            </h2>
          </div>
          <div className="flex gap-3 flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
            <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                الاسم الكامل{" "}
                <span className="font-mono text-xs"> (بالعربية)</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="الاسم الكامل"
                value={fullNameAr}
                onChange={(e) => setFullNameAr(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                الاسم المختصر{" "}
                <span className="text-xs font-mono"> (بالعربية)</span>
              </label>
              <input
                className="appearance-none block w-1/2 bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="الاسم المختصر"
                value={nickNameAr}
                onChange={(e) => setnickNameAr(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                كود التداول
              </label>
              <input
                className="appearance-none block w-1/2 bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="أدخل كود التداول"
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

            <div className="flex-1">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                القطاع
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="أدخل القطاع"
                required
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                Q1
              </label>
              <input
                type="file"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                onChange={(e) =>
                  handleFileChange("Q1", e.target.files?.[0] || null)
                }
              />

              <DatePicker
                selected={formData.Q1.date}
                onChange={(date) => handleDateChange("Q1", date)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholderText="اختر التاريخ"
              />
              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="أدخل السنة"
                value={formData.Q1.year}
                onChange={(e) => handleYearChange("Q1", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                Q2
              </label>
              <input
                type="file"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                onChange={(e) =>
                  handleFileChange("Q2", e.target.files?.[0] || null)
                }
              />
              <DatePicker
                selected={formData.Q2.date}
                onChange={(date) => handleDateChange("Q2", date)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholderText="اختر التاريخ"
              />
              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="أدخل السنة"
                value={formData.Q2.year}
                onChange={(e) => handleYearChange("Q2", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                Q3
              </label>
              <input
                type="file"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                onChange={(e) =>
                  handleFileChange("Q3", e.target.files?.[0] || null)
                }
              />
              <DatePicker
                selected={formData.Q3.date}
                onChange={(date) => handleDateChange("Q3", date)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholderText="اختر التاريخ"
              />
              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="أدخل السنة"
                value={formData.Q3.year}
                onChange={(e) => handleYearChange("Q3", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                Q4
              </label>
              <input
                type="file"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                onChange={(e) =>
                  handleFileChange("Q4", e.target.files?.[0] || null)
                }
              />
              <DatePicker
                selected={formData.Q4.date}
                onChange={(date) => handleDateChange("Q4", date)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholderText="اختر التاريخ"
              />
              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="أدخل السنة"
                value={formData.Q4.year}
                onChange={(e) => handleYearChange("Q4", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                S1
              </label>
              <input
                type="file"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                onChange={(e) =>
                  handleFileChange("S1", e.target.files?.[0] || null)
                }
              />
              <DatePicker
                selected={formData.S1.date}
                onChange={(date) => handleDateChange("S1", date)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholderText="اختر التاريخ"
              />
              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="أدخل السنة"
                value={formData.S1.year}
                onChange={(e) => handleYearChange("S1", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                Annual
              </label>
              <input
                type="file"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                onChange={(e) =>
                  handleFileChange("Year", e.target.files?.[0] || null)
                }
              />
              <DatePicker
                selected={formData.Year.date}
                onChange={(date) => handleDateChange("Year", date)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholderText="اختر التاريخ"
              />
              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="أدخل السنة"
                value={formData.Year.year}
                onChange={(e) => handleYearChange("Year", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                Board
              </label>
              <input
                type="file"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                onChange={(e) =>
                  handleFileChange("Board", e.target.files?.[0] || null)
                }
              />
              <DatePicker
                selected={formData.Board.date}
                onChange={(date) => handleDateChange("Board", date)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholderText="اختر التاريخ"
              />
              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="أدخل السنة"
                value={formData.Board.year}
                onChange={(e) => handleYearChange("Board", e.target.value)}
              />
            </div>
          </div>

          <div className="flex  justify-start items-center mt-4 w-full h-40 relative">
            {loading ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
                <span className="mt-4 text-gray-700 font-bold">{`جاري التحميل...`}</span>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-gradient-to-r mr-4 from-gray-500 via-gray-600 to-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                يُقدِّم
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
