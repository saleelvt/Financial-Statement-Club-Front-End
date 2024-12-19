/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Navbar.tsx


import React from "react";
import { useNavigate } from "react-router-dom";
// import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../reduxKit/store";
import Swal from "sweetalert2";
// import "../../CSS/logoHeading.css";
import { FaSignOutAlt } from "react-icons/fa";
import { adminLogout } from "../../reduxKit/actions/auth/authAction";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxKit/store";
import { AdminLanguageChange } from "../../reduxKit/actions/admin/adminLanguage";
import { GrLanguage } from "react-icons/gr";
import { MdMiscellaneousServices } from "react-icons/md";

<GrLanguage />
export const AdminNavbar: React.FC = () => {
  const { adminLanguage } = useSelector( (state: RootState) => state.adminLanguage
  );
  const { role } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log("this is my role  admin ", role);

  const toggleLanguage = async () => {
    const newLanguage = adminLanguage === "English" ? "Arabic" : "English";
    await dispatch(AdminLanguageChange(newLanguage));
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handledata = async () => {
    try {
      await dispatch(adminLogout()).unwrap();
      Swal.fire({
        icon: "success",
        title: "Logged out successfully!",
        showConfirmButton: false,
        timer: 1000,
        toast: true,
      }).then(() => {
        navigate("/login");
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Logout failed!",
        showConfirmButton: true,
        text: error.data,
      });
    }
  };
  return (
    <nav className="p-3">
      <div className="container py-2 mx-auto gap-3 flex justify-between items-center">
        <div className="w-full flex items-center justify-between ">
          <h4 className=" font-semibold xs:font-semibold  lg:text-2xl md:text-2xl sm:1xl xs:text-xl ">
       {adminLanguage ==="Arabic" ?"نادي القوائم المالية ":"FinStatements Club"}
          </h4>
          <button
          onClick={toggleLanguage}
          
          className="py-1 px-2 hover:scale-105   transition-transform duration-300 ease-in-out  items-center text-2xl hover:   bg-opacity-80"
        >
         <GrLanguage className=" text-gray-600" />
        </button>
        </div>
        <div className="lg:hidden">
       
          <button className=" focus:outline-none " onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >


              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
        <div
          className={`lg:flex lg:items-center ${isOpen ? "block" : "hidden"}`}
        >
         <MdMiscellaneousServices  className="text-gray-600 mr-8 text-2xl"/>    
   
          <button
            onClick={handledata}
            className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline hover:scale-105   transition-transform duration-300 ease-in-out text-white shadow-lg  flex items-center  rounded-md"
          >
            <FaSignOutAlt className="mr-2 text-white"  /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
