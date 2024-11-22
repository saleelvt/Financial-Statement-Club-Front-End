/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { addDocument } from "../../../reduxKit/actions/admin/addDocumentAction";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { AdminNavbar } from "../../Navbar/adminNavbar";

export const AddDocument: React.FC = () => {
  const navigate = useNavigate();
  const [companyNameAr, setCompanyNameAr] = useState("");
  const [companyNameEn, setCompanyNameEn] = useState("");
  const [yearOfReport, setYearOfReport] = useState("");
  const [fileAr, setFileAr] = useState<File | null>(null);
  const [fileEn, setFileEn] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { loading } = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch<AppDispatch>();


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

  const handleYearOfReportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYearOfReport(e.target.value);
  };

  const handleFileArChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFileAr(e.target.files[0]);
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
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
        >
          <div className="flex -mx-3">
            <div className="w-1/2 px-3 mb-6 md:mb-3">
              <label className="block uppercase tracking-wide  text-gray-700 font-bold mb-2">
                Full Name <span className="font-mono text-xs"> (English)</span>
              </label>
              <input
                className="appearance-none block w-full text-sm bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
            <div className="w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide  text-gray-700 font-bold mb-2">
                Nick Name <span className="text-xs font-mono"> (English)</span>
              </label>
              <input
                className="appearance-none text-sm block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
          <div className="flex -mx-3">
            <div className="w-1/2 px-3 mb-6 md:mb-3">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                الاسم الكامل <span className="font-mono text-xs"> (عربي)</span>
              </label>
              <input
                className="appearance-none block text-x text-sm w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="أدخل الاسم الكامل"
                value={companyNameAr}
                onChange={handleCompanyNameArChange}
                required
              />
              {errors.companyNameAr && (
                <p className="text-red-500 text-xs">{errors.companyNameAr}</p>
              )}
            </div>
            <div className="w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                اسم المستعار <span className="text-xs font-mono"> (عربي)</span>
              </label>
              <input
                className="appearance-none block w-full text-sm bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder=" أدخل الاسم المستعار"
                value={companyNameEn}
                onChange={handleCompanyNameEnChange}
                required
              />
              {errors.companyNameEn && (
                <p className="text-red-500 text-xs">{errors.companyNameEn}</p>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
              Year of Report
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="2023"
              value={yearOfReport}
              onChange={handleYearOfReportChange}
              required
            />
            {errors.yearOfReport && (
              <p className="text-red-500 text-xs">{errors.yearOfReport}</p>
            )}
          </div>
          <div className="">
            <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
              Add PDF (Arabic)
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="file"
              name="fileAr"
              onChange={handleFileArChange}
              required
            />
            {errors.fileAr && (
              <p className="text-red-500 text-xs">{errors.fileAr}</p>
            )}
          </div>
          <div className="mb-6">
            <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
              Add PDF (English)
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="file"
              name="fileEn"
              onChange={handleFileEnChange}
              required
            />
            {errors.fileEn && (
              <p className="text-red-500 text-xs">{errors.fileEn}</p>
            )}
          </div>

          <div className="flex  flex-col  pb-4 px-2 gap-1">
            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
               Q1
              </label>
              <input
                className="appearance-none block   bg-gray-200 text-gray-700 border rounded  leading-tight focus:outline-none focus:bg-white"
                type="file"
                name="fileEn"
                onChange={handleFileEnChange}
                required
              />
              {errors.fileEn && (
                <p className="text-red-500 text-xs">{errors.fileEn}</p>
              )}
            </div>
            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
              Q2
              </label>
              <input
                className="appearance-none block  bg-gray-200 text-gray-700 border rounded leading-tight focus:outline-none focus:bg-white"
                type="file"
                name="fileEn"
                onChange={handleFileEnChange}
                required
              />
              {errors.fileEn && (
                <p className="text-red-500 text-xs">{errors.fileEn}</p>
              )}
            </div>
            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                Q3
              </label>
              <input
                className="appearance-none block  bg-gray-200 text-gray-700 border rounded   leading-tight focus:outline-none focus:bg-white"
                type="file"
                name="fileEn"
                onChange={handleFileEnChange}
                required
              />
              {errors.fileEn && (
                <p className="text-red-500 text-xs">{errors.fileEn}</p>
              )}
            </div>


            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
             Q4
              </label>
              <input
                className="appearance-none block bg-gray-200 text-gray-700 border rounded leading-tight focus:outline-none focus:bg-white"
                type="file"
                name="fileEn"
                onChange={handleFileEnChange}
                required
              />
              {errors.fileEn && (
                <p className="text-red-500 text-xs">{errors.fileEn}</p>
              )}
            </div>

            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
             S1
              </label>
              <input
                className="appearance-none block bg-gray-200 text-gray-700 border rounded leading-tight focus:outline-none focus:bg-white"
                type="file"
                name="fileEn"
                onChange={handleFileEnChange}
                required
              />
              {errors.fileEn && (
                <p className="text-red-500 text-xs">{errors.fileEn}</p>
              )}
            </div>
            <div className="">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
              Board
              </label>
              <input
                className="appearance-none block bg-gray-200 text-gray-700 border rounded leading-tight focus:outline-none focus:bg-white"
                type="file"
                name="fileEn"
                onChange={handleFileEnChange}
                required
              />
              {errors.fileEn && (
                <p className="text-red-500 text-xs">{errors.fileEn}</p>
              )}
            </div>
          

           
            <div className="mt-8">
              <label className="block uppercase tracking-wide p-1 text-gray-700 font-bold mb-2">
              Tadawal Code
              </label>
              <input
                className="appearance-none block bg-gray-200 p-2 text-gray-700 border rounded leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Enter The Board"
                name="fileEn"
                required
              />
              {errors.fileEn && (
                <p className="text-red-500 text-xs">{errors.fileEn}</p>
              )}
            </div>
            <div className="mt-2">
              <label className="block uppercase tracking-wide p-1 text-gray-700 font-bold mb-2">
              Sector
              </label>
              <input
                className="appearance-none block bg-gray-200 p-2 text-gray-700 border rounded leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Enter The Board"
                name="fileEn"
                required
              />
              {errors.fileEn && (
                <p className="text-red-500 text-xs">{errors.fileEn}</p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate("/adminHomepage")}
              className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-105   transition-transform duration-300 ease-in-out "
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-105   transition-transform duration-300 ease-in-out"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
