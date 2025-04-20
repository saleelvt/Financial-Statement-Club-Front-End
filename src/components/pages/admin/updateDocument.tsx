/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { UpdateDocumentEnglish } from "../../../reduxKit/actions/admin/updateEnglishDocument";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FieldKey } from "../../../interfaces/admin/addDoument";
import { FormField } from "../../../interfaces/admin/addDoument";
import { DocumentSliceEn } from "../../../interfaces/admin/addDoument";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";
import { FaArrowCircleLeft } from "react-icons/fa";

const UpdateDocument: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.adminEn);
  const [fullNameEn, setFullNameEn] = useState("");
  const [nickNameEn, setnickNameEn] = useState("");
  const [tadawalCode, setTadawalCode] = useState("");
  const [sector, setSector] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState<
    DocumentSliceEn | null | undefined
  >();
  const location = useLocation();
  const { id, language } = location.state || {};
  const [formData, setFormData] = useState<Record<FieldKey, FormField>>({
    Q1: { file: null, date: null, year: "", createAt: "" },
    Q2: { file: null, date: null, year: "", createAt: "" },
    Q3: { file: null, date: null, year: "", createAt: "" },
    Q4: { file: null, date: null, year: "", createAt: "" },
    S1: { file: null, date: null, year: "", createAt: "" },
    Board: { file: null, date: null, year: "", createAt: "" },
    Year: { file: null, date: null, year: "", createAt: "" },
  });

  useEffect(() => {
    // Fetch document details by ID and Language
    const fetchDocument = async () => {
      try {
        const response = await commonRequest(
          "GET",
          `/api/v1/admin/getDocumentById/${id}?language=${language}`, // Include language as a query parameter
          config,
          {}
        );
        const data = response.data.data[0];
        console.log("...................................", data);
        setDocument(data); // Ensure you have the latest value for document
      } catch (error) {
        console.error("Error fetching document details:", error);
      }
    };

    if (id && language) fetchDocument(); // Ensure both `id` and `language` are present
  }, [id, language]);

  useEffect(() => {
    if (document) {
      setFullNameEn(document.fullNameEn);
      setnickNameEn(document.nickNameEn);
      setTadawalCode(document.tadawalCode);
      setSector(document.sector);
      setFormData(document.formData);
    }
  }, [document]);



  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setnickNameEn(value);

    if (value.length > 0) {
      // Fetch suggestions only if input has 3 or more characters
      setIsLoading(true);
      try {
        const adminLanguage = "English";
        const response = await commonRequest(
          "GET",
          `/api/v1/admin/nicknamesSuggestions?name=${value}&language=${adminLanguage}`,
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
    setnickNameEn(suggestion);
    setFullNameEn(mydata.fullNameEn);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const adminCredentials: DocumentSliceEn = {
        fullNameEn,
        nickNameEn,
        tadawalCode,
        sector,
        formData,
        createdAt: new Date().toISOString(), // Example value
      };

     
      await dispatch(
        UpdateDocumentEnglish({ id, language, adminCredentials })
      ).unwrap();
    
      toast.success("Document updated successfully");
      navigate(-1);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message,
        timer: 3000,
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="p-1 lg:px-8 border   w-full">
      <div className="">
        <form onSubmit={handleSubmit} className="">
          <div className="flex justify-between ">
            <FaArrowCircleLeft
              className="text-3xl text-gray-500"
              onClick={() => navigate(-1)}
            />
          </div>

          <div className="flex   items-center  lg:w-1/2 mt-1 ">
            <div className="">
            <label className="block placeholder:text-xs  uppercase tracking-wide text-xs text-gray-700 font-semibold">
                  Tadawul Code
                </label>
              <input
                className="appearance-none placeholder:text-xs  lg:w-36 xs:w-28  block  text-xs p-1 bg-gray-200 text-gray-700 border rounded  leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder=" Tadawul Code "
                value={tadawalCode}
                required
                onChange={(e) => setTadawalCode(e.target.value)}
              />
            </div>

            <div className="w-full text-xs  p-1 ">
              <label className="block uppercase tracking-wide text-gray-700 font-bold ">
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
          <div className="flex xs:w-full   text-xs mt-2  bg-pur gap-1  lg:w-1/2  ">
            <div className="xs:w-64 lg:w-1/2">
              <label className="block uppercase  tracking-wide text-gray-700 font-bold">
                Nick Name
              </label>
              <input
                className="appearance-none block w-full  bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Nick Name"
                value={nickNameEn}
                onChange={handleInputChange}
              />
              {isLoading && (
                <p className="text-sm text-gray-500 mt-1">
                  Loading suggestions...
                </p>
              )}
              {suggestions.length > 0 && (
                <ul className="border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto bg-white">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="lg:w-1/2">
              <label className="block uppercase tracking-wide text-gray-700 font-bold">
                Sector
              </label>
              <input
                className="appearance-none block w-full  bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Enter The Sector"
                required
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              />
            </div>
          </div>

          <div className="grid text-xs  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-1  gap-1  ">
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
                />

                <input
                  type="text"
                  className="appearance-none block w-1/2 mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Year"
                  value={formData.Q1.year}
                  onChange={(e) => handleYearChange("Q1", e.target.value)}
                />
              </div>
            </div>

            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold ">
                Q2
              </label>
              <input
                type="file"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                onChange={(e) =>
                  handleFileChange("Q2", e.target.files?.[0] || null)
                }
              />
              <div className=" flex justify-start gap-1">
                <DatePicker
                  selected={formData.Q2.date}
                  onChange={(date) => handleDateChange("Q2", date)}
                  className="appearance-none block lg:w-[170px] xs:w-[130px] bg-gray-200 mt-1 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholderText="Choose Date"
                />
                <input
                  type="text"
                  className="appearance-none block w-1/2 mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Year"
                  value={formData.Q2.year}
                  onChange={(e) => handleYearChange("Q2", e.target.value)}
                />
              </div>
            </div>

            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold ">
                Q3
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
                  className="appearance-none block lg:w-[170px] xs:w-[130px] bg-gray-200 mt-1 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholderText="Choose Date"
                />
                <input
                  type="text"
                  className="appearance-none block w-1/2 mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Year"
                  value={formData.Q3.year}
                  onChange={(e) => handleYearChange("Q3", e.target.value)}
                />
              </div>
            </div>

            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold ">
                Q4
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
                  className="appearance-none block lg:w-[170px] xs:w-[130px] bg-gray-200 mt-1 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholderText="Choose Date"
                />
                <input
                  type="text"
                  className="appearance-none block w-1/2 mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Year"
                  value={formData.Q4.year}
                  onChange={(e) => handleYearChange("Q4", e.target.value)}
                />
              </div>
            </div>

            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold ">
                SA
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
                  className="appearance-none block lg:w-[170px] xs:w-[130px] bg-gray-200 mt-1 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholderText="Choose Date"
                />
                <input
                  type="text"
                  className="appearance-none block w-1/2 mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Year"
                  value={formData.S1.year}
                  onChange={(e) => handleYearChange("S1", e.target.value)}
                />
              </div>
            </div>

            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold ">
                Annual
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
                  className="appearance-none block lg:w-[170px] xs:w-[130px] bg-gray-200 mt-1 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholderText="Choose Date"
                />
                <input
                  type="text"
                  className="appearance-none block w-1/2 mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Year"
                  value={formData.Year.year}
                  onChange={(e) => handleYearChange("Year", e.target.value)}
                />
              </div>
            </div>

            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold ">
                Board
              </label>
              <input
                type="file"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                onChange={(e) =>
                  handleFileChange("Board", e.target.files?.[0] || null)
                }
              />
              <div className=" flex justify-start gap-1  ">
                <DatePicker
                  selected={formData.Board.date}
                  onChange={(date) => handleDateChange("Board", date)}
                  className="appearance-none block lg:w-[170px] xs:w-[130px] bg-gray-200 mt-1 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholderText="Choose Date"
                />
                <input
                  type="text"
                  className="appearance-none block w-1/2 mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Year"
                  value={formData.Board.year}
                  onChange={(e) => handleYearChange("Board", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-white font-bold py-1 px-5 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              {loading ? "Submiting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default UpdateDocument;
