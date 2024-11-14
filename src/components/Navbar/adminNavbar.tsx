/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Navbar.tsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../reduxKit/store";
import Swal from "sweetalert2";
// import "../../CSS/logoHeading.css";
import { FaSignOutAlt } from "react-icons/fa";
import { adminLogout } from "../../reduxKit/actions/auth/authAction";
import { useSelector } from 'react-redux';
import { RootState } from '../../reduxKit/store';

 export const AdminNavbar: React.FC = () => {
  const {role}=useSelector((state:RootState)=>state.auth)

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);


  console.log('this is my role  admin ',role);
  



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
        toast:true
      }).then(() => {
        navigate("/adminLogin");
      });
    } catch (error:any) {
      Swal.fire({
        icon: "error",
        title: "Logout failed!",
        showConfirmButton: true,
        text:error.data
      });
    }
  };

  return (
    <nav className=" p-6">
      <div className="container  mx-auto flex justify-between items-center">
        <div className=" text-4xl ">
      <h1 className=" font-semibold  ">Financial statment club </h1>
        </div>
        {/* <h1>{adminDetails}</h1> */}
        <div className="lg:hidden">
          <button className=" focus:outline-none" onClick={toggleMenu}>
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
          <Link
            to="/services"
            className="block font-semibold px-4 py-2 hover:bg-gradient-to-b from-green-500 via-green-700 to-green-900 mr-6 rounded"
          >
            Services
          </Link>

          <Link
            to="/about"
            className="block px-4 py-2 font-semibold hover:bg-gradient-to-b from-green-500 via-green-700 to-green-900 mr-6 rounded"
          >
            About
          </Link>
         <button
            onClick={handledata}
            className="bg-gradient-to-b from-green-500 via-green-700 to-green-900 text-white shadow-lg px-4 flex items-center py-2  rounded-md"
          >
                  <FaSignOutAlt className="mr-3" /> Logout
                  </button>
        </div>
      </div>
    </nav>
  );
};

