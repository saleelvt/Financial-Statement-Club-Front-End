/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useDispatch } from "react-redux";
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
  const [file, setFile] = useState("");
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.value);
  };

  interface myObject {
    companyNameAr: string | null;
    companyNameEn: string | null;
    yearOfReport: string | null;
    file: any;
  }
  const myObject: myObject = {
    companyNameAr,
    companyNameEn,
    yearOfReport,
    file,
  };


  // Custom validation function
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!companyNameAr.trim()) {
      newErrors.companyNameAr = "Company Name (Arabic) is required.";
    }
    if (!companyNameEn.trim()) {
      newErrors.companyNameEn = "Company Name (English) is required.";
    }
    if (!yearOfReport.trim() || isNaN(Number(yearOfReport))) {
      newErrors.yearOfReport = "Please enter a valid Year of Report.";
    }
    if (!file.trim()) {
      newErrors.file = "PDF file is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the form before submitting
    if (!validateForm()) {
      return; // Don't proceed if there are validation errors
    }

    try {
      console.log("this is my object", myObject);
      await dispatch(addDocument(myObject)).unwrap();
      setCompanyNameAr('');
      setCompanyNameEn('');
      setYearOfReport("");
      setFile("");
      toast.success("Document successfully added");
    } catch (error: any) {
      console.error("Document Adding failed:", error);

      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "An unexpected error occurred OR Existed Already";
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: errorMessage,
        timer: 3000,
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
        background: "#fff",
        color: "#721c24",
        iconColor: "#f44336",
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
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
              <label
                className="block uppercase tracking-wide text-gray-700 font-bold mb-2"
                htmlFor="company-name-ar"
              >
                Company Name <span className="text-sm"> (Arabic)</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="company-name-ar"
                type="text"
                placeholder="شركة مثال"
                value={companyNameAr}
                onChange={handleCompanyNameArChange}
                required
              />
              {errors.companyNameAr && (
                <p className="text-red-500 text-xs">{errors.companyNameAr}</p>
              )}
            </div>
            <div className="w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 font-bold mb-2"
                htmlFor="company-name-en"
              >
                Company Name <span className="text-sm"> (English)</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="company-name-en"
                type="text"
                placeholder="Brand Name"
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
            <label
              className="block uppercase tracking-wide text-gray-700 font-bold mb-2"
              htmlFor="year-of-report"
            >
              Year of Report
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="year-of-report"
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

          <div className="mb-6">
            <label
              className="block uppercase tracking-wide text-gray-700 font-bold mb-2"
              htmlFor="text"
            >
              Add PDF
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="text"
              type="text"
              onChange={handleFileChange}
              required
            />
            {errors.file && <p className="text-red-500 text-xs">{errors.file}</p>}
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
              className="bg-gradient-to-b from-green-500 via-green-700 to-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:from-green-600 hover:via-green-800 hover:to-green-950"
              type="submit"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};