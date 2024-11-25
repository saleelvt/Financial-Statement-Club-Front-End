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

interface FileDetails {
  file: File | null;
  date: Date | null;
  year: string;
}

export const AddDocument: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.admin);

  const [companyNameAr, setCompanyNameAr] = useState("");
  const [companyNameEn, setCompanyNameEn] = useState("");
  const [fileDetails, setFileDetails] = useState<FileDetails[]>(
    Array(7).fill({ file: null, date: null, year: "" })
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleFileChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFileDetails = [...fileDetails];
    newFileDetails[index].file = e.target.files ? e.target.files[0] : null;
    setFileDetails(newFileDetails);
  };

  const handleDateChange = (index: number, date: Date | null) => {
    const newFileDetails = [...fileDetails];
    newFileDetails[index].date = date;
    setFileDetails(newFileDetails);
  };

  const handleYearChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFileDetails = [...fileDetails];
    newFileDetails[index].year = e.target.value;
    setFileDetails(newFileDetails);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!companyNameAr.trim())
      newErrors.companyNameAr = "Company Name (Arabic) is required.";
    if (!companyNameEn.trim())
      newErrors.companyNameEn = "Company Name (English) is required.";

    fileDetails.forEach((details, index) => {
      if (!details.file)
        newErrors[`file${index}`] = `File ${index + 1} is required.`;
      if (!details.date)
        newErrors[`date${index}`] = `Date ${index + 1} is required.`;
      if (!details.year || isNaN(Number(details.year)))
        newErrors[`year${index}`] = `Valid year ${index + 1} is required.`;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("companyNameAr", companyNameAr);
    formData.append("companyNameEn", companyNameEn);

    fileDetails.forEach((details, index) => {
      if (details.file) formData.append(`file${index}`, details.file);
      if (details.date)
        formData.append(`date${index}`, details.date.toISOString());
      formData.append(`year${index}`, details.year);
    });

    try {
      await dispatch(addDocument(formData)).unwrap();
      setCompanyNameAr("");
      setCompanyNameEn("");
      setFileDetails(Array(7).fill({ file: null, date: null, year: "" }));
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
      <div className="flex flex-col items-center lg:py-4 min-h-screen px-4">

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
                Full Name <span className="font-mono text-xs"> (English)</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Full Name"
                value={companyNameAr}
                onChange={(e) => setCompanyNameAr(e.target.value)}
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
                onChange={(e) => setCompanyNameEn(e.target.value)}
              />
              {errors.companyNameEn && (
                <p className="text-red-500 text-xs">{errors.companyNameEn}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["Q1", "Q2", "Q3", "Q4", "S1", "Board", "Year"].map(
              (label, index) => (
                <div key={index} className="space-y-2">
                  <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                    {label}
                  </label>
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                    type="file"
                    onChange={(e) => handleFileChange(index, e)}
                  />
                  {errors[`file${index}`] && (
                    <p className="text-red-500 text-xs">
                      {errors[`file${index}`]}
                    </p>
                  )}
                  <DatePicker
                    selected={fileDetails[index]?.date || null}
                    onChange={(date) => handleDateChange(index, date)}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                    placeholderText="Choose Date"
                  />
                  {errors[`date${index}`] && (
                    <p className="text-red-500 text-xs">
                      {errors[`date${index}`]}
                    </p>
                  )}
                  <input
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder="Enter Year"
                    value={fileDetails[index]?.year || ""}
                    onChange={(e) => handleYearChange(index, e)}
                  />
                  {errors[`year${index}`] && (
                    <p className="text-red-500 text-xs">
                      {errors[`year${index}`]}
                    </p>
                  )}
                </div>
              )
            )}
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
  className="bg-white shadow-md rounded px-2 mt-24 pt-2 pb-8 w-full max-w-lg lg:max-w-4xl space-y-4"
  dir="rtl"
>
  <h2 className="text-2xl font-bold text-center text-gray-700">
    إضافة مستند
  </h2>

  <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
    <div className="w-full">
      <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
        الاسم الكامل <span className="font-mono text-xs"> (بالعربية)</span>
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
        type="text"
        placeholder="الاسم الكامل"
        value={companyNameAr}
        onChange={(e) => setCompanyNameAr(e.target.value)}
      />
      {errors.companyNameAr && (
        <p className="text-red-500 text-xs">{errors.companyNameAr}</p>
      )}
    </div>
    <div className="w-full">
      <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
        الاسم المختصر <span className="text-xs font-mono"> (بالعربية)</span>
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
        type="text"
        placeholder="الاسم المختصر"
        value={companyNameEn}
        onChange={(e) => setCompanyNameEn(e.target.value)}
      />
      {errors.companyNameEn && (
        <p className="text-red-500 text-xs">{errors.companyNameEn}</p>
      )}
    </div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {["الربع الأول", "الربع الثاني", "الربع الثالث", "الربع الرابع", "نصف السنة", "مجلس الإدارة", "السنة"].map(
      (label, index) => (
        <div key={index} className="space-y-2">
          <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
            {label}
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
            type="file"
            onChange={(e) => handleFileChange(index, e)}
          />
          {errors[`file${index}`] && (
            <p className="text-red-500 text-xs">
              {errors[`file${index}`]}
            </p>
          )}
          <DatePicker
            selected={fileDetails[index]?.date || null}
            onChange={(date) => handleDateChange(index, date)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
            placeholderText="اختر التاريخ"
          />
          {errors[`date${index}`] && (
            <p className="text-red-500 text-xs">
              {errors[`date${index}`]}
            </p>
          )}
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="أدخل السنة"
            value={fileDetails[index]?.year || ""}
            onChange={(e) => handleYearChange(index, e)}
          />
          {errors[`year${index}`] && (
            <p className="text-red-500 text-xs">
              {errors[`year${index}`]}
            </p>
          )}
        </div>
      )
    )}
  </div>

  <div className="flex flex-wrap gap-4">
    <div className="flex-1">
      <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
        كود التداول
      </label>
      <input
        className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
        type="text"
        placeholder="أدخل كود التداول"
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
      {loading ? "جاري التحميل..." : "رفع"}
    </button>
  </div>
</form>


      </div>
    </div>
  );
};
