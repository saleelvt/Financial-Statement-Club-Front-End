/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../reduxKit/store";
import { UpdateDocumentEnglish } from "../../../../reduxKit/actions/admin/updateEnglishDocument";


// import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {FieldKey } from "../../../../interfaces/admin/addDoument";
import { FormField } from "../../../../interfaces/admin/addDoument";
import { DocumentSliceEn } from "../../../../interfaces/admin/addDoument";
import { commonRequest } from "../../../../config/api";
import { config } from "../../../../config/constants";

import ValidationModal from "../modals/validationModal";


interface UpdateDocumentEnProps {
  DocData: DocumentSliceEn | null | undefined;
}

const SubUpdateDocumentEn: React.FC<UpdateDocumentEnProps> = React.memo(({DocData}) => {

  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [fullNameEn, setFullNameEn] = useState("");
  const [nickNameEn, setnickNameEn] = useState("");
  const [tadawalCode, setTadawalCode] = useState("");
  // const [updaidteId,setUpdateId]=useState<any>("")
  // const [updateLanguage,setUpdateLnag]=useState<any>("")
  const [sector, setSector] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  const [document, setDocument] = useState< DocumentSliceEn | null | undefined   >();


 const id=DocData?._id
 const language="English"
  // Initialize formData with default structure
  const [formData, setFormData] = useState<Record<FieldKey, FormField>>({
    Q1: { file: null, date: null, year: "", createAt: "" },
    Q2: { file: null, date: null, year: "", createAt: "" },
    Q3: { file: null, date: null, year: "", createAt: "" },
    Q4: { file: null, date: null, year: "", createAt: "" },
    S1: { file: null, date: null, year: "", createAt: "" },
    Board: { file: null, date: null, year: "", createAt: "" },
    Year: { file: null, date: null, year: "", createAt: "" },
  });
    const fileInputRefs = {
    Q1: useRef<HTMLInputElement>(null),
    Q2: useRef<HTMLInputElement>(null),
    Q3: useRef<HTMLInputElement>(null),
    Q4: useRef<HTMLInputElement>(null),
    S1: useRef<HTMLInputElement>(null),
    Board: useRef<HTMLInputElement>(null),
    Year: useRef<HTMLInputElement>(null),
  };

  useEffect(()=>{
console.log("the id of the update : ",DocData);

    setDocument(DocData)

  },[DocData])
  
  

 
  useEffect(() => {
    if (document) {
      setFullNameEn(document.fullNameEn || "");
      setnickNameEn(document.nickNameEn || "");
      setTadawalCode(document.tadawalCode || "");
      setSector(document.sector || "");

      // Safely merge the existing formData with document.formData
      if (document.formData) {
        setFormData((prevFormData) => {
          const newFormData = { ...prevFormData };
          // Iterate through each field and safely set the values
          Object.keys(newFormData).forEach((key) => {
            const fieldKey = key as FieldKey;
            if (document.formData[fieldKey]) {
              newFormData[fieldKey] = {
                file: document.formData[fieldKey].file || null,
                date: document.formData[fieldKey].date
                  ? new Date(document.formData[fieldKey].date)
                  : null,
                year: document.formData[fieldKey].year || "",
                createAt: document.formData[fieldKey].createAt || "",
              };
            }
          });

          return newFormData;
        });
      }
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
      setLoading(true);
      const adminCredentials: DocumentSliceEn = {
        fullNameEn,
        nickNameEn,
        tadawalCode,
        sector,
        formData,
        createdAt: new Date().toISOString(), // Example value
      };

      const response = await dispatch(  UpdateDocumentEnglish({ id , language, adminCredentials })
      ).unwrap();
      if (response.success) {
        setShowToast(true);
        setLoading(false);

    Object.keys(fileInputRefs).forEach((key) => {
    if (fileInputRefs[key as keyof typeof fileInputRefs].current) {
      fileInputRefs[key as keyof typeof fileInputRefs].current!.value = "";
    }
  });


        setTimeout(() => {
          setShowToast(false);
        }, 30000); // 30 seconds
      }
    } catch (error: any) {
         console.log("thrinooti engins",error);
        setLoading(false);
      setIsModalOpen(true)
        setErrorMessage(error.message)
    
    }
  };

  return (
    <div className="p-1 border-t  mb-4   w-full">
      <div className="">
        <form onSubmit={handleSubmit} className="">
          {/* <div className="flex justify-between ">
            <FaArrowCircleLeft
              className="text-3xl text-gray-500"
              onClick={() => navigate(-1)}
            />
          </div> */}

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

            <div className="lg:w-1/2 w-full">
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
              <label className="block uppercase tracking-wide text-gray-700 font-semibold">
                Q1
              </label>
              <div className="relative">
                <input
                  ref={fileInputRefs.Q1}
                  type="file"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  onChange={(e) =>
                    handleFileChange("Q1", e.target.files?.[0] || null)
                  }
                />
               
              </div>

              <div className="flex justify-start gap-1">
                <DatePicker
                  selected={formData?.Q1?.date || null}
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
                  className="appearance-none block w-full mt-1 bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Year"
                  value={formData?.Q1?.year || ""}
                  onChange={(e) => handleYearChange("Q1", e.target.value)}
                />
              </div>
            </div>

            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold ">
                Q2
              </label>
              <div className="relative">
                <input
                  type="file"
                    ref={fileInputRefs.Q2}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  onChange={(e) =>
                    handleFileChange("Q2", e.target.files?.[0] || null)
                  }
                />

              </div>
              <div className=" flex justify-start gap-1">
                <DatePicker
                  selected={formData?.Q2?.date || null}
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
                  className="appearance-none block w-full mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Year"
                  value={formData?.Q2?.year || ""}
                  onChange={(e) => handleYearChange("Q2", e.target.value)}
                />
              </div>
            </div>

            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold ">
                Q3
              </label>
              <div className="relative">
                <input
                  type="file"
                    ref={fileInputRefs.Q3}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  onChange={(e) =>
                    handleFileChange("Q3", e.target.files?.[0] || null)
                  }
                />
             
              </div>
              <div className=" flex justify-start gap-1  ">
                <DatePicker
                  selected={formData?.Q3?.date || null}
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
                  className="appearance-none block w-full mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Year"
                  value={formData?.Q3?.year || ""}
                  onChange={(e) => handleYearChange("Q3", e.target.value)}
                />
              </div>
            </div>

            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold ">
                Q4
              </label>
              <div className="relative">
                <input
                  type="file"
                    ref={fileInputRefs.Q4}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  onChange={(e) =>
                    handleFileChange("Q4", e.target.files?.[0] || null)
                  }
                />
             
              </div>
              <div className=" flex justify-start gap-1  ">
                <DatePicker
                  selected={formData?.Q4?.date || null}
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
                  className="appearance-none block w-full mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Year"
                  value={formData?.Q4?.year || ""}
                  onChange={(e) => handleYearChange("Q4", e.target.value)}
                />
              </div>
            </div>

            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold ">
                SA
              </label>
              <div className="relative">
                <input
                  type="file"
                    ref={fileInputRefs.S1}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  onChange={(e) =>
                    handleFileChange("S1", e.target.files?.[0] || null)
                  }
                />

              </div>
              <div className=" flex justify-start gap-1  ">
                <DatePicker
                  selected={formData?.S1?.date || null}
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
                  className="appearance-none block w-full mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Year"
                  value={formData?.S1?.year || ""}
                  onChange={(e) => handleYearChange("S1", e.target.value)}
                />
              </div>
            </div>

            {formData?.Year && (
              <div className="">
                <label className="block uppercase tracking-wide text-gray-700 font-semibold ">
                  Annual
                </label>
                <div className="relative">
                  <input
                    type="file"
                      ref={fileInputRefs.Year}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                    onChange={(e) =>
                      handleFileChange("Year", e.target.files?.[0] || null)
                    }
                  />
                
                </div>
                <div className=" flex justify-start gap-1  ">
                  <DatePicker
                    selected={formData?.Year?.date || null}
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
                    className="appearance-none block w-full mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                    placeholder="Enter Year"
                    value={formData?.Year?.year || ""}
                    onChange={(e) => handleYearChange("Year", e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold ">
                Board
              </label>

              <div className="relative">
                <input
                  type="file"
                    ref={fileInputRefs.Board}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  onChange={(e) =>
                    handleFileChange("Board", e.target.files?.[0] || null)
                  }
                />
                
              </div>
              <div className=" flex justify-start gap-1  ">
                <DatePicker
                  selected={formData?.Board?.date || null}
                  onChange={(date) => handleDateChange("Board", date)}
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
                  className="appearance-none block w-full mt-1 bg-gray-200 text-gray-700 border rounded p-1  leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Year"
                  value={formData?.Board?.year || ""}
                  onChange={(e) => handleYearChange("Board", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <div className="">
              {showToast && (
                <div className="absolute left-13 text-xs bg-green-100 border border-green-400 text-green-700 px-10  py-1 font-semibold rounded shadow">
                  Updated Successfully On :{" "}
                  {`${nickNameEn}-${tadawalCode}-${language}`}
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
      </div>
    </div>
  );
});

export default SubUpdateDocumentEn;
