/* eslint-disable @typescript-eslint/no-explicit-any */


import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { FaSignOutAlt, FaChevronDown } from "react-icons/fa";

import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AppDispatch, RootState } from "../../reduxKit/store";
import { adminLogout } from "../../reduxKit/actions/auth/authAction";


export const AdminNavbar: React.FC = () => {
  const { adminLanguage } = useSelector((state: RootState) => state.adminLanguage);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); 
  };

  const handleLogout = async () => {
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
      console.log(error);
    }
    setIsDropdownOpen(false); // Close dropdown after action
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Brand */}
          <div className="flex-shrink-0">
            <h1 className="font-bold text-lg sm:text-xl md:text-2xl text-gray-800">
              {adminLanguage === "Arabic" ? "نادي القوائم المالية" : "FinStatements Club"}
            </h1>
          </div>

          {/* Right side - Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
        
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-200 ease-in-out flex items-center hover:shadow-lg hover:scale-105"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>

          {/* Right side - Mobile Dropdown */}
          <div className="md:hidden relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200 ease-in-out flex items-center"
            >
              <HiOutlineMenuAlt3 className="text-xl" />
              <FaChevronDown className={`ml-1 text-sm transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Mobile Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="py-2">
                
                  
                  <div className="border-t border-gray-100 my-1"></div>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-1 text-left text-red-600 hover:bg-red-50 transition-colors duration-150 ease-in-out flex items-center"
                  >
                    <FaSignOutAlt className="text-lg mr-3" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};