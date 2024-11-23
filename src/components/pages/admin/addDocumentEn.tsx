/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { addDocument } from "../../../reduxKit/actions/admin/addDocumentAction";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { AdminNavbar } from "../../Navbar/adminNavbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export const AddDocument: React.FC = () => {

  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [companyNameAr, setCompanyNameAr] = useState("");
  const [companyNameEn, setCompanyNameEn] = useState("");
  const [yearOfReport, setYearOfReport] = useState("");
  const [fileAr, setFileAr] = useState<File | null>(null);
  const [fileEn, setFileEn] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { loading } = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch<AppDispatch>();

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

 

  const handleCompanyNameArChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompanyNameAr(e.target.value);
  };

  const handleCompanyNameEnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompanyNameEn(e.target.value);
  };



  

  const handleFileEnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFileEn(e.target.files[0]);
  };
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!companyNameAr.trim())
      newErrors.companyNameAr = "Company Name (Arabic) is required.";
    if (!companyNameEn.trim())
      newErrors.companyNameEn = "Company Name (English) is required.";
    if (!yearOfReport.trim() || isNaN(Number(yearOfReport))) {
      newErrors.yearOfReport = "Please enter a valid Year of Report.";
    }
    if (!fileAr) newErrors.fileAr = "Arabic PDF file is required.";
    if (!fileEn) newErrors.fileEn = "English PDF file is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {



    e.preventDefault();
    if (!validateForm()) return;
    const formData = new FormData();
    formData.append("companyNameAr", companyNameAr);
    formData.append("companyNameEn", companyNameEn);
    formData.append("yearOfReport", yearOfReport);
    if (fileAr) formData.append("fileAr", fileAr); // Attach the file
    if (fileEn) formData.append("fileEn", fileEn); // Attach the file

    try {


      await dispatch(addDocument(formData)).unwrap();
      setCompanyNameAr("");
      setCompanyNameEn("");
      setYearOfReport("");
      setFileAr(null);
      setFileEn(null);
      toast.success("Document successfully added");
      window.location.reload();
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
      <div className="flex flex-col items-center lg:py-4  min-h-screen px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-2 pt-2 pb-8 w-full max-w-lg lg:max-w-4xl space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Add Document
          </h2>

          <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
            <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                Full Name <span className="font-mono text-xs"> (Arabic)</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Full Name"
                value={companyNameAr}
                onChange={handleCompanyNameArChange}
                required
              />
              {errors.companyNameAr && (
                <p className="text-red-500 text-xs">{errors.companyNameAr}</p>
              )}
            </div>
            <div className="w-full">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                Nick Name <span className="text-xs font-mono"> (English)</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Nick Name"
                value={companyNameEn}
                onChange={handleCompanyNameEnChange}
                required
              />
              {errors.companyNameEn && (
                <p className="text-red-500 text-xs">{errors.companyNameEn}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["Q1", "Q2", "Q3", "Q4", "S1", "Board", "Year"].map(
              (label, index) => (
                <div key={index}>
                  <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                    {label}
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                    type="file"
                    name="fileEn"
                    onChange={handleFileEnChange}
                    required
                  />
                  {errors.fileEn && (
                    <p className="text-red-500 text-xs">{errors.fileEn}</p>
                  )}
                </div>
              )
            )}
          </div>

          <div className="w-full">
        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
          اختر التاريخ والوقت
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange} // Date change handler
          timeIntervals={15}
         
          dateFormat="MMMM d, yyyy"
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
          placeholderText="اختر التاريخ والوقت"
        />
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
                required
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
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate("/adminHomepage")}
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




























        <form
  onSubmit={handleSubmit}
  className="bg-white shadow-md rounded px-2 pt-2 pb-8 w-full mt-8 max-w-lg lg:max-w-4xl space-y-4"
>
  <h2 className="text-2xl font-bold text-center text-gray-700">
    إضافة مستند
  </h2>
  <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
    <div className="w-full">
      <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
        الاسم الكامل 
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
        type="text"
        placeholder="الاسم الكامل"
        value={companyNameAr}
        onChange={handleCompanyNameArChange}
        required
      />
      {errors.companyNameAr && (
        <p className="text-red-500 text-xs">{errors.companyNameAr}</p>
      )}
    </div>
    <div className="w-full">
      <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
        الاسم المستعار 
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
        type="text"
        placeholder="اسم الشهرة"
        value={companyNameEn}
        onChange={handleCompanyNameEnChange}
        required
      />
      {errors.companyNameEn && (
        <p className="text-red-500 text-xs">{errors.companyNameEn}</p>
      )}
    </div>
  </div>


  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {["Q1", "Q2", "Q3", "Q4", "S1", "Board", "Year"].map(
      (label, index) => (
        <div key={index}>
          <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
            {label}
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
            type="file"
            name="fileEn"
            placeholder={`إرفاق ملف ${label}`}
            onChange={handleFileEnChange}
            required
          />
          {errors.fileEn && (
            <p className="text-red-500 text-xs">{errors.fileEn}</p>
          )}
        </div>
      )
    )}
  </div>
  <div className="w-full">
        <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
          اختر التاريخ والوقت
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange} // Date change handler
          timeIntervals={15}
         
          dateFormat="MMMM d, yyyy"
          className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
          placeholderText="اختر التاريخ والوقت"
        />
      </div>





  <div className="flex flex-wrap gap-4">
    <div className="flex-1">
      <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
        رمز تداول
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
        type="text"
        placeholder="أدخل رمز تداول"
        required
      />
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
      />
    </div>
  </div>

  <div className="flex items-center justify-between mt-4">
    <button
      type="button"
      onClick={() => navigate("/adminHomepage")}
      className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition-transform duration-300 ease-in-out"
    >
      رجوع
    </button>
    
    <button
      type="submit"
      className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition-transform duration-300 ease-in-out"
    >
      {loading ? "جارٍ التحميل..." : "رفع"}
    </button>
  </div>
</form>

      </div>
    </div>
  );
};
