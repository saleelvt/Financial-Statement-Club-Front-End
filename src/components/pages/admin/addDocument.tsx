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

  const handleCompanyNameArChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyNameAr(e.target.value);
  };

  const handleCompanyNameEnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (!companyNameAr.trim()) newErrors.companyNameAr = "Company Name (Arabic) is required.";
    if (!companyNameEn.trim()) newErrors.companyNameEn = "Company Name (English) is required.";
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
    if (fileAr) formData.append("fileAr", fileAr);
    if (fileEn) formData.append("fileEn", fileEn);

    try {
      await dispatch(addDocument(formData)).unwrap();
      setCompanyNameAr("");
      setCompanyNameEn("");
      setYearOfReport("");
      setFileAr(null);
      setFileEn(null);
      toast.success("Document successfully added");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "An unexpected error occurred",
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
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                Company Name <span className="text-sm"> (Arabic)</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="شركة مثال"
                value={companyNameAr}
                onChange={handleCompanyNameArChange}
                required
              />
              {errors.companyNameAr && <p className="text-red-500 text-xs">{errors.companyNameAr}</p>}
            </div>
            <div className="w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
                Company Name <span className="text-sm"> (English)</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Brand Name"
                value={companyNameEn}
                onChange={handleCompanyNameEnChange}
                required
              />
              {errors.companyNameEn && <p className="text-red-500 text-xs">{errors.companyNameEn}</p>}
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
            {errors.yearOfReport && <p className="text-red-500 text-xs">{errors.yearOfReport}</p>}
          </div>

          <div className="mb-6">
            <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
              Add PDF (Arabic)
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="file"
              onChange={handleFileArChange}
              required
            />
            {errors.fileAr && <p className="text-red-500 text-xs">{errors.fileAr}</p>}
          </div>

          <div className="mb-6">
            <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
              Add PDF (English)
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="file"
              onChange={handleFileEnChange}
              required
            />
            {errors.fileEn && <p className="text-red-500 text-xs">{errors.fileEn}</p>}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gradient-to-b from-green-500 via-green-700 to-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:from-green-600 hover:via-green-800 hover:to-green-950"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-gradient-to-b from-green-500 via-green-700 to-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:from-green-600 hover:via-green-800 hover:to-green-950"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
