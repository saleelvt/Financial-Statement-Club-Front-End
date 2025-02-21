
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {  useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { addDocumentEnglish } from "../../../reduxKit/actions/admin/addDocumentAction";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FieldKey } from "../../../interfaces/admin/addDoument";
import { FormField } from "../../../interfaces/admin/addDoument";
import { DocumentSliceEn } from "../../../interfaces/admin/addDoument";
import { commonRequest } from "../../../config/api";
import { config } from "../../../config/constants";



interface AddDocumentEnglishProps {
  formDataEn: Record<FieldKey, FormField>
  tadawalCodeEn: string 
};



export const AddDocument: React.FC<AddDocumentEnglishProps> = React.memo(({formDataEn,tadawalCodeEn}) => {

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.adminEn);
  const [fullNameEn, setFullNameEn] = useState("");
  const [nickNameEn, setnickNameEn] = useState("");
  const [tadawalCode, setTadawalCode] = useState<string>(tadawalCodeEn || "");
  const [sector, setSector] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Record<FieldKey, FormField>>(() => {



    return {
      Q1: {
        file: null,
        date: formDataEn.Q1.date || null,
        year: formDataEn.Q1.year || "",
      },
      Q2: {
        file: null,
        date: formDataEn.Q2.date || null,
        year: formDataEn.Q2.year || "",
      },
      Q3: {
        file: null,
        date: formDataEn.Q3.date || null,
        year: formDataEn.Q3.year || "",
      },
      Q4: {
        file: null,
        date: formDataEn.Q4.date || null,
        year: formDataEn.Q4.year || "",
      },
      S1: {
        file: null,
        date: formDataEn.S1.date || null,
        year: formDataEn.S1.year || "",
      },
      Board: {
        file: null,
        date: formDataEn.Board.date || null,
        year: formDataEn.Board.year || "",
      },
      Year: {
        file: null,
        date: formDataEn.Year.date || null,
        year: formDataEn.Year.year || "",
      },
    };
  })

  useEffect(()=>{

    console.log("my form data is from the english document  ", formDataEn);

    if (tadawalCodeEn !== undefined && tadawalCodeEn !== tadawalCode) {
      setTadawalCode(tadawalCodeEn || ""); // Only update if the value is different
    }
    setFormData((prev) => ({
      ...prev,
      Q1: {
        date: formDataEn?.Q1?.date || null,  // Only update date
        year: formDataEn?.Q1?.year || "",    // Only update year
      },
      Q2: {
        date: formDataEn?.Q2?.date || null,  // Only update date
        year: formDataEn?.Q2?.year || "",    // Only update year
      },
      Q3: {
        date: formDataEn?.Q3?.date || null,  // Only update date
        year: formDataEn?.Q3?.year || "",    // Only update year
      },
      Q4: {
        date: formDataEn?.Q4?.date || null,  // Only update date
        year: formDataEn?.Q4?.year || "",    // Only update year
      },
      S1: {
        date: formDataEn?.S1?.date || null,  // Only update date
        year: formDataEn?.S1?.year || "",    // Only update year
      },
      Board: {
        date: formDataEn?.Board?.date || null,  // Only update date
        year: formDataEn?.Board?.year || "",    // Only update year
      },
      Year: {
        date: formDataEn?.Year?.date || null,  // Only update date
        year: formDataEn?.Year?.year || "",    // Only update year
      },
    }));
    

  }, [formDataEn,tadawalCodeEn])



   useEffect(()=>{

     handleSuggestionClick(tadawalCodeEn)

   },[tadawalCodeEn])



  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTadawalCode(value);
    if (value.length > 0) { // Fetch suggestions only if input has 3 or more characters
      setIsLoading(true);
      try {
        const adminLanguage = "English";
        const response = await commonRequest("GET",`/api/v1/admin/tadawalCodeSuggestions?name=${value}&language=${adminLanguage}`,config,{});
        setSuggestions(response.data.suggestions || []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };



  const handleSuggestionClick = async (suggestion: string) => {
    const adminLanguage = "English";
    const response = await commonRequest("GET",`/api/v1/admin/getDataWithSuggestions?name=${suggestion}&language=${adminLanguage}`,config,{});
    console.log('data with the suggetin __________',response.data.data);
    const mydata= response.data.data
    setnickNameEn(mydata.nickNameEn);
    setFullNameEn(mydata.fullNameEn);
    setTadawalCode(suggestion)
    setSector(mydata.sector)
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
      const payloadData:DocumentSliceEn ={
        fullNameEn,
        nickNameEn,
        tadawalCode,
        sector,
        formData
      }
      
     await dispatch(addDocumentEnglish(payloadData)).unwrap();
      toast.success("Document successfully added");
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
    <div className="">
      <div className="flex flex-col items-center  min-h-screen px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-2  pb-8 w-full max-w-lg lg:max-w-4xl space-y-4"
        >
        
          <div className="flex flex-col m lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
            <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                Full Name <span className="font-mono text-xs"> (English)</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Full Name"
                value={fullNameEn}
                onChange={(e) => setFullNameEn(e.target.value)}
              />
            </div>

            <div className="w-full">
      <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
        Nick Name <span className="text-xs font-mono">(English)</span>
      </label>
      <input
        className="appearance-none block w-1/2 bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
        type="text"
        placeholder="Nick Name"
        value={nickNameEn}
        onChange={(e) => setnickNameEn(e.target.value)}
      />
     
    </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                Tadawul Code
              </label>
              <input
                className="appearance-none block w-1/2 bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Enter The Tadawul"
                value={tadawalCode}
                required
                onChange={handleInputChange}
              />

{isLoading && <p className="text-sm font-serif text-gray-600 mt-1">Loading suggestions...</p>}
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
                Sector
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Enter The Sector"
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
                placeholderText="Choose Date"
              />

              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="Enter Year"
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
                placeholderText="Choose Date"
              />
              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="Enter Year"
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
                placeholderText="Choose Date"
              />
              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="Enter Year"
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
                placeholderText="Choose Date"
              />
              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="Enter Year"
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
                placeholderText="Choose Date"
              />
              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="Enter Year"
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
                placeholderText="Choose Date"
              />
              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="Enter Year"
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
                placeholderText="Choose Date"
              />
              <input
                type="text"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="Enter Year"
                value={formData.Board.year}
                onChange={(e) => handleYearChange("Board", e.target.value)}
              />
            </div>
           
          </div>


         
          <div className="flex justify-end   mt-4">
            
            <button
              type="submit"
              className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              {loading ? "Submiting..." : "Submit"}
            </button>
          </div>
        </form>
        {/* <AddDocumentArabic formDataEn={formData} tadawalCodeEn={tadawalCode}  /> */}
      </div>
    </div>
  );
});
