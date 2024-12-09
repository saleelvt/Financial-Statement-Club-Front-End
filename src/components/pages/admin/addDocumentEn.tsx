
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { addDocumentEnglish } from "../../../reduxKit/actions/admin/addDocumentAction";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { AdminNavbar } from "../../Navbar/adminNavbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddDocumentArabic } from "./addDocumentAr";
import { FieldKey } from "../../../interfaces/admin/addDoument";
import { FormField } from "../../../interfaces/admin/addDoument";
import { DocumentSliceEn } from "../../../interfaces/admin/addDoument";




export const AddDocument: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.adminEn);
  const [fullNameEn, setFullNameEn] = useState("");
  const [nickNameEn, setnickNameEn] = useState("");
  const [tadawalCode, setTadawalCode] = useState("");
  const [sector, setSector] = useState("");
  const [formData, setFormData] = useState<Record<FieldKey, FormField>>({
    Q1: { file: null, date: null, year: "" },
    Q2: { file: null, date: null, year: "" },
    Q3: { file: null, date: null, year: "" },
    Q4: { file: null, date: null, year: "" },
    S1: { file: null, date: null, year: "" },
    Board: { file: null, date: null, year: "" },
    Year: { file: null, date: null, year: "" },
  });


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
      <AdminNavbar />
      <div className="flex flex-col items-center lg:py-4 min-h-screen px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-2 pt-2 pb-8 w-full max-w-lg lg:max-w-4xl space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Upload Documents
          </h2>
          <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
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
                Nick Name <span className="text-xs font-mono"> (English)</span>
              </label>

              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Nick Name"
                value={nickNameEn}
                onChange={(e) => setnickNameEn(e.target.value)}
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

            <div className="space-y-2">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                Year
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
          </div>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                Tadawal Code
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Enter The Board"
                value={tadawalCode}
                required
                onChange={(e) => setTadawalCode(e.target.value)}
              />
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
          <div className="flex items-center justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>

        <AddDocumentArabic />
      </div>
    </div>
  );
});
