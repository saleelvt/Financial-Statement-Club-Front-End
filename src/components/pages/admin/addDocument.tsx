/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useDispatch } from "react-redux";
import { addDocument } from "../../../reduxKit/actions/admin/addDocumentAction";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { AdminNavbar } from "../../Navbar/adminNavbar";

export const AddDocument: React.FC = () => {
  const [companyNameAr, setCompanyNameAr] = useState("");
  const [companyNameEn, setCompanyNameEn] = useState("");
  const [yearOfReport, setYearOfReport] = useState("");
  //   const [file, setFile] = useState<file|null>(null);
  const [file, setFile] = useState("");

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (e.target.files && e.target.files.length > 0) {
    //   setFile(e.target.files[0]);
    // }
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      console.log("this is my obje", myObject);

      await dispatch(addDocument(myObject)).unwrap();
      setCompanyNameAr('')
      setCompanyNameEn('')
      setYearOfReport("")
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
        background: "#fff", // Light red background for an error message
        color: "#721c24", // Darker red text color for better readability
        iconColor: "#f44336", // Custom color for the icon
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer); // Pause timer on hover
          toast.addEventListener("mouseleave", Swal.resumeTimer); // Resume timer on mouse leave
        },
        showClass: {
          popup: "animate__animated animate__fadeInDown", // Animation when the toast appears
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp", // Animation when the toast disappears
        },
      });
    }
  };

  return (
    <div className="">
      <AdminNavbar />
      <div className="flex justify-center items-center  ">
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
            </div>
            <div className="w-1/2 px-3 mb-6 md:mb-0 ">
              <label
                className="block uppercase tracking-wide text-gray-700 font-bold mb-2"
                htmlFor="company-name-en"
              >
                Company Name <span className="text-sm"> (English)</span>
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-00 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="company-name-en"
                type="text"
                placeholder="Brand Name"
                value={companyNameEn}
                onChange={handleCompanyNameEnChange}
                required
              />
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
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-gradient-to-b from-green-500 via-green-700 to-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loading ? "Uploding.." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
