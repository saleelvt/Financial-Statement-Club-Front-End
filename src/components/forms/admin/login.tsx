/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useFormik } from "formik";
import { ValidationLogin } from "../../../validation/admin/adminLogin";
import { IAdminLogin } from "../../../interfaces/admin/login";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { loginAdmin } from "../../../reduxKit/actions/auth/authAction";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";


export const AdminLogin = React.memo(() => {
  const dispatch=useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const {loading}=useSelector((state:RootState)=>state.auth)
  const initialValues: IAdminLogin = {
    email: "",
    password: "",
  };

  const [showPassword, setShowPassword] = useState(false);
//   const [typingEffectText, setTypingEffectText] = useState("");
 
  const formik = useFormik<IAdminLogin>({
    initialValues,
    validationSchema: ValidationLogin,
    onSubmit: async (values) => {
      try {

        console.log(values,"before going to salon home page ");
        await dispatch(loginAdmin(values)).unwrap()
        navigate("/home")
        
      } catch (error:any) {
        console.error("Login failed:", error);
        Swal.fire({
          icon: "error",
          
          title: "Error!",
          text: error.message,
          timer: 3000,
          toast: true,
          showConfirmButton: false,
          timerProgressBar: true,
          background: '#fff', // Light red background for an error message
          color: '#721c24', // Darker red text color for better readability
          iconColor: '#f44336', // Custom color for the icon
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer); // Pause timer on hover
            toast.addEventListener('mouseleave', Swal.resumeTimer); // Resume timer on mouse leave
          },
          showClass: {
            popup: 'animate__animated animate__fadeInDown' // Animation when the toast appears
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp' // Animation when the toast disappears
          }
        });
      }
    },
  });

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="flex flex-col items-center p-6 w-full max-w-lg shadow-lg  border border-gray-300 rounded-lg bg-white transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-serif mb-6 text-center text-gray-800 animate-pulse">
          LogIn Account
        </h2>
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...formik.getFieldProps("email")}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-500 focus:outline-none transition duration-300"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...formik.getFieldProps("password")}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-700 focus:outline-none transition duration-300"
            />
            <span
              className="absolute inset-y-0 mt-8 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223a11.055 11.055 0 00-1.66 3.656C2.453 12.11 4.825 16.5 12 16.5c2.245 0 4.09-.5 5.5-1.217M21 21l-1.682-1.682M3.98 8.223L21 21M9.878 9.878a3 3 0 014.244 4.244"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.432 5 12 5c3.87 0 7.07 2.43 8.542 5.458A10.97 10.97 0 0112 19.5a10.97 10.97 0 01-9.542-7.5z"
                  />
                </svg>
              )}
            </span>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>
          <div className="text-center mt-6">
  <button
    type="submit"
    className="relative overflow-hidden w-full p-3 rounded-lg mt-4 bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-gray-300 hover:text-white font-semibold focus:ring-2 focus:ring-gray-400 transition duration-300 transform hover:scale-105"
  >
    <span className="absolute inset-0 bg-gray-600 rounded-full transform scale-0 transition-transform duration-500 ease-in-out opacity-50 hover:scale-150"></span>
    <span className="relative">{loading ? "Loading..." : "Login"}</span>
  </button>
</div>

        </form>
      </div>
    </div>
  );
});
