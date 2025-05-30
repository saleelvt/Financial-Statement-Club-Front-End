/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../reduxKit/store";
import { UpdateDocumentArabic } from "../../../../reduxKit/actions/admin/updateArabicDocument";
import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FieldKey } from "../../../../interfaces/admin/addDoument";
import { FormField } from "../../../../interfaces/admin/addDoument";
import { DocumentSliceAr } from "../../../../interfaces/admin/addDoument";
import { FaArrowCircleRight } from "react-icons/fa";
import ValidationModal from "../../validationModal";
import { config } from "../../../../config/constants";
import { commonRequest } from "../../../../config/api";
interface UpdateDocumentArProps {
  DocData: DocumentSliceAr | null | undefined;
}
const SubUpdateDocumentAr: React.FC<UpdateDocumentArProps> = React.memo(({DocData}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");
  const [loading,setLoading]=useState(false)
  const [fullNameAr, setFullNameAr] = useState("");
  const [nickNameAr, setnickNameAr] = useState("");
  const [tadawalCode, setTadawalCode] = useState("");
  const [sector, setSector] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState<  DocumentSliceAr | null | undefined>();
    const [showToastAr, setShowToastAr] = useState<boolean>(false);


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

     const id=DocData?._id
 const language="English"
    


  useEffect(() => {
    if (document) {
      setFullNameAr(document.fullNameAr || "");
      setnickNameAr(document.nickNameAr || "");
      setTadawalCode(document.tadawalCode || "");
      setSector(document.sector || "");

      // Merge incoming partial data with defaults
      const mergedFormData = {
        ...formData,
        ...document.formData, // document.formData may contain Q1, Q2 only
      };
      setFormData(mergedFormData);
    }
  }, [document]);



  useEffect(()=>{
setDocument(DocData)
  },[DocData])



  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setnickNameAr(value);

    if (value.length > 0) {
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
    setnickNameAr(suggestion);
    setFullNameAr(mydata.fullNameEn);
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
      const adminCredentials: DocumentSliceAr = {
        fullNameAr,
        nickNameAr,
        tadawalCode,
        sector,
        formData,
        createdAt: new Date().toISOString(), // Example value
      };
      console.log("my data is", adminCredentials);
      setLoading(true)
      const response = await dispatch(
        UpdateDocumentArabic({ id, language, adminCredentials })
      ).unwrap();
if(response.success){
  setShowToastAr(true)
  setLoading(false)

    Object.keys(fileInputRefs).forEach((key) => {
    if (fileInputRefs[key as keyof typeof fileInputRefs].current) {
      fileInputRefs[key as keyof typeof fileInputRefs].current!.value = "";
    }
  });

   setTimeout(()=>{
 
    setShowToastAr(false)
   },30000)
}      
    } catch (error: any) {
       setLoading(false)
        setIsModalOpen(true)
        setErrorMessage(error.message)
     console.log("erorr ",error);
     
    }
  };

  return (
    <div className="lg:mx-6">
      <div className="flex flex-col items-center min-h-screen  ">
        <form
          dir="rtl"
          onSubmit={handleSubmit}
          className="bg-white     w-full p-2 "
        >
          <div className="flex justify-between">
            <FaArrowCircleRight
              className="text-3xl text-gray-500"
              onClick={() => navigate(-1)}
            />
          </div>
          <div className="flex   items-center  lg:w-1/2 mt-1">
            <div className=" ">
              <label className="block uppercase  tracking-wide text-sm text-gray-700 font-semibold">
                رمز تداول
              </label>
              <input
                className="appearance-none xs:w-24 block  text-sm p-1 bg-gray-200 text-gray-700 border rounded  leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="التداول"
                value={tadawalCode}
                required
                onChange={(e) => setTadawalCode(e.target.value)}
              />
            </div>

            <div className=" p-1   w-full">
              <label className="block uppercase   font-semibold text-sm tracking-wide text-gray-700">
                الاسم الكامل
                <span className="font-mono text-xs"> (بالعربية)</span>
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

          <div className="flex xs:w-full    lg:w-1/2  justify-between">
            <div className="lg:w-full xs:w-full  p-1">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold text-sm">
                الاسم المختصر
                <span className="text-xs font-mono">(بالعربية)</span>
              </label>
              <input
                className="appearance-none block w-full text-sm  p-1 bg-gray-200 text-gray-700 border rounded  leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="الاسم المختصر"
                value={nickNameAr}
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
                      className="px-2 py-1 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="p-1 ">
              <label className="block uppercase text-sm tracking-wide text-gray-700 font-semibold ">
                القطاع
              </label>
              <input
                className="appearance-none block lg:w-72 bg-gray-200 text-gray-700 border rounded  p-1 text-sm leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="القطاع"
                required
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              />
            </div>
          </div>










          <div className="grid grid-cols-2  md:grid-cols-2 lg:grid-cols-4  gap-2 text-sm  ">
            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold">
                ر1
              </label>

              <div className="relative">
                <input
                  type="file"
                         ref={fileInputRefs.Q1}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white file:mr-2"
                  onChange={(e) =>
                    handleFileChange("Q1", e.target.files?.[0] || null)
                  }
                />


              </div>

              <div className="flex justify-start gap-1 mt-1">
                <DatePicker
                  selected={formData?.Q1?.date}
                  onChange={(date) => handleDateChange("Q1", date)}
                  className="appearance-none block lg:w-[170px] xs:w-[130px] bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholderText="Choose Date"
                  popperPlacement="bottom-start"
                    portalId="root-portal"
                      showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
                <input
                  type="text"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Year"
                  value={formData?.Q1?.year || ""}
                  onChange={(e) => handleYearChange("Q1", e.target.value)}
                />
              </div>
            </div>

            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold">
                ر2
              </label>

              <div className="relative">
                <input
                  type="file"
                         ref={fileInputRefs.Q2}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white file:mr-2"
                  onChange={(e) =>
                    handleFileChange("Q2", e.target.files?.[0] || null)
                  }
                />


              </div>

              <div className="flex justify-start gap-1 mt-1">
                <DatePicker
                  selected={formData?.Q2?.date}
                  onChange={(date) => handleDateChange("Q2", date)}
                  className="appearance-none block lg:w-[170px] xs:w-[130px] bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholderText="Choose Date"
                  popperPlacement="bottom-start"
                    portalId="root-portal"
                      showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
                <input
                  type="text"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Year"
                  value={formData?.Q2?.year || ""}
                  onChange={(e) => handleYearChange("Q2", e.target.value)}
                />
              </div>
            </div>

            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold">
                ر3
              </label>

              <div className="relative">
                <input
                  type="file"
                         ref={fileInputRefs.Q3}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white file:mr-2"
                  onChange={(e) =>
                    handleFileChange("Q3", e.target.files?.[0] || null)
                  }
                />

             
              </div>

              <div className="flex justify-start gap-1 mt-1">
                <DatePicker
                  selected={formData?.Q3?.date}
                  onChange={(date) => handleDateChange("Q3", date)}
                  className="appearance-none block lg:w-[170px] xs:w-[130px] bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholderText="Choose Date"
                  popperPlacement="bottom-start"
                    portalId="root-portal"
                      showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />

                <input
                  type="text"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 mt- leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Year"
                  value={formData?.Q3?.year || ""}
                  onChange={(e) => handleYearChange("Q3", e.target.value)}
                />
              </div>
            </div>

            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold">
                ر4
              </label>

              <div className="relative">
                <input
                  type="file"
                         ref={fileInputRefs.Q4}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white file:mr-2"
                  onChange={(e) =>
                    handleFileChange("Q4", e.target.files?.[0] || null)
                  }
                />

             
              </div>

              <div className="flex justify-start gap-1 mt-1">
                <DatePicker
                  selected={formData?.Q4?.date}
                  onChange={(date) => handleDateChange("Q4", date)}
                  className="appearance-none block lg:w-[170px] xs:w-[130px] bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholderText="Choose Date"
                  popperPlacement="bottom-start"
                    portalId="root-portal"
                      showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
                <input
                  type="text"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Year"
                  value={formData?.Q4?.year || ""}
                  onChange={(e) => handleYearChange("Q4", e.target.value)}
                />
              </div>
            </div>

            {/* ----------- S1 ------------ */}
            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold">
                س1
              </label>

              <div className="relative">
                <input
                  type="file"
                         ref={fileInputRefs.S1}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white file:mr-2"
                  onChange={(e) =>
                    handleFileChange("S1", e.target.files?.[0] || null)
                  }
                />


              </div>

              <div className="flex justify-start gap-1 mt-1">
                <DatePicker
                  selected={formData?.S1?.date}
                  onChange={(date) => handleDateChange("S1", date)}
                  className="appearance-none block lg:w-[170px] xs:w-[130px] bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholderText="Choose Date"
                  popperPlacement="bottom-start"
                    portalId="root-portal"
                      showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />

                <input
                  type="text"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Year"
                  value={formData?.S1?.year || ""}
                  onChange={(e) => handleYearChange("S1", e.target.value)}
                />
              </div>
            </div>

            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold">
                السنوي
              </label>

              <div className="relative">
                <input
                  type="file"
                         ref={fileInputRefs.Year}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white file:mr-2"
                  onChange={(e) =>
                    handleFileChange("Year", e.target.files?.[0] || null)
                  }
                />

             
              </div>

              <div className="flex justify-start gap-1 mt-1">
                <DatePicker
                  selected={formData?.Year?.date}
                  onChange={(date) => handleDateChange("Year", date)}
                  className="appearance-none block lg:w-[170px] xs:w-[130px] bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholderText="Choose Date"
                  popperPlacement="bottom-start"
                    portalId="root-portal"
                      showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />

                <input
                  type="text"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Year"
                  value={formData?.Year?.year || ""}
                  onChange={(e) => handleYearChange("Year", e.target.value)}
                />
              </div>
            </div>

            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-semibold">
                المجلس
              </label>

              <div className="relative">
                <input
                  type="file"
                         ref={fileInputRefs.Board}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white file:mr-2"
                  onChange={(e) =>
                    handleFileChange("Board", e.target.files?.[0] || null)
                  }
                /> 

               
              </div>
 
              <div className="flex justify-start gap-1 mt-1">
                <DatePicker
                  selected={formData?.Board?.date}
                  onChange={(date) => handleDateChange("Board", date)}
                  className="appearance-none block lg:w-[170px] xs:w-[130px] bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholderText="Choose Date"
                  popperPlacement="bottom-start"
                    portalId="root-portal"
                      showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
                <input
                  type="text"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded p-1 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Enter Year"
                  value={formData?.Board?.year || ""}
                  onChange={(e) => handleYearChange("Board", e.target.value)}
                />
              </div>
            </div>
          </div>










         <div className="flex  justify-end items-center mt-4 w-full h-12 relative">
 {showToastAr && (
                        <div className="absolute right-14 bg-green-100 border border-green-400 text-green-700 px-12 py-1 font-semibold rounded shadow">
                          تم الرفع بنجاح  :  {`${nickNameAr},${tadawalCode},${language}`}
                       
                        </div>
                       )} 

            {loading ? (
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
                <span className="mt-4 text-gray-700 font-bold">{`جاري التحميل...`}</span>
              </div>
            ) : (
              <button
                type="submit"
                className="bg-gradient-to-r mr-4 from-gray-500 via-gray-600 to-gray-700 text-white font-bold py-[1.5px] px-9 rounded "
              >
                رفع
              </button>
            )}
          </div>
        </form>

            {/* <UpdateDocument  DocData={documentEn}/> */}

        <ValidationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message={errorMessage}
        />
      </div>
    </div>
  );
});
export default SubUpdateDocumentAr;
