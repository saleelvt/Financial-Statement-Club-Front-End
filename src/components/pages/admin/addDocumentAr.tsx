/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { AxiosProgressEvent } from "axios";

import LinearProgress from "@mui/joy/LinearProgress";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";

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
  useEffect(() => {
  console.log("current proggress : ", progress);
  
  }, [progress]);

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

  const addDocumentArabic = createAsyncThunk(
    "admin/addDocumentArabic",
    async (adminCredentials: DocumentPayload) => {
      try {
        // ✅ Validate input
        const isAnyFieldValid = Object.values(adminCredentials.formData).some(
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
  

        // ✅ Send POST with real upload progress tracking
        const response = await axios.post(
          "/api/v1/admin/addDocumentArabic",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (event: AxiosProgressEvent) => {
              const { loaded, total } = event;
              
              // Set a smaller chunk size to force more frequent updates
             
              if (total) {
                // Calculate progress based on loaded/total ratio
                const percentCompleted = Math.round((loaded / total) * 100);
                console.log("Upload Progress:", percentCompleted, "% | Loaded:", loaded, "| Total:", total);
                setProgress(percentCompleted);
              } else {
                // Fallback for when total is not available
                console.log("Loaded bytes:", loaded);
                // Use a progressive estimation approach here
              }
            },
          }
        );
  
 
  
        return response.data;
      } catch (error: any) {
        setErrorMessage(
          error.response?.data?.message || "Something went wrong!"
        );
        setIsModalOpen(true);
      }
    }
  );
  

  const handleSubmitArabicDoc = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setProgress(0); // Reset progress at start
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

        // Only set to 100% if not already there from the progress events
        // if (progress < 100) {
        //   setProgress(100);
        // }

        // Reset form data
        setFormData(
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
      console.log("Error submitting form:", error);
      toast.error("Failed to upload document");
      setProgress(0);
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
              className="text-3xl text-gray-600"
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

            <div className="flex xs:w-full    lg:w-1/2  justify-between ">
              <div className=" lg:w-full xs:w-full  p-1">
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
                  className="appearance-none block w-1/2 mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
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
                  className="appearance-none block w-1/2 p-1 mt-1 bg-gray-200 text-gray-700 border rounded leading-tight focus:outline-none focus:bg-white"
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
                  className="appearance-none block w-1/2 mt-1 bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
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
                  className="appearance-none block w-1/2 mt-1 bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
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
                  className="appearance-none block w-1/2 mt-1 bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
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
                  className="appearance-none block w-1/2 mt-1  bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
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
                  className="appearance-none block w-1/2 mt-1  bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
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
                <div className="w-4 h-4 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
                <span className="mt-4 text-gray-700 font-bold">{`جاري التحميل...`}</span>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-gradient-to-r mr-4 from-gray-500 via-gray-600 to-gray-700 text-white font-bold py-[1.5px] px-7 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                رفع
              </button>
            )}

            {progress > 0 && progress < 100 && (
              <Box sx={{ bgcolor: "white", width: "100%" }}>
                <LinearProgress
                  determinate
                  variant="outlined"
                  color="neutral"
                  size="sm"
                  thickness={32}
                  value={progress}
                  sx={{
                    "--LinearProgress-radius": "0px",
                    "--LinearProgress-progressThickness": "24px",
                    boxShadow: "sm",
                    borderColor: "neutral.500",
                  }}
                >
                  <Typography
                    level="body-xs"
                    textColor="common.white"
                    sx={{ fontWeight: "xl", mixBlendMode: "difference" }}
                  >
                    LOADING… {`${Math.round(progress)}%`}
                  </Typography>
                </LinearProgress>
              </Box>
            )}

            {progress > 0 && progress < 100 && (
              <p className="text-bold font-semibold mr-4">{progress}</p>
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
