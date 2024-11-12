
import React from "react"
import NavImage from "../../assets/images/WhatsApp_Image_2024-11-06_at_11.10.44_60081502-removebg-preview.png"
export const AdminNavbar= React.memo(()=>{

    return (
        <section>
<nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between ">
          {/* Logo and Brand */}
          <div className=" flex-shrink-0 flex items-center">
            <img
              src={NavImage}
              alt="Nour Al Safwa Logo"
              className="h-10 w-auto"
            />
            <span className="ml-2 text-xl font-serif text-4xl  text-gray-800">Nour Al Safwa</span>
          </div>

          {/* Navbar Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-gray-800 hover:text-yellow-500">
              Viasas
            </a>
            <a href="#" className="text-gray-800 hover:text-yellow-500">
              Fligts
            </a>
            <a href="#" className="text-gray-800 hover:text-yellow-500">
              Services
            </a>
            <a href="#" className="text-gray-800 hover:text-yellow-500">
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-800 hover:text-yellow-500 focus:outline-none focus:text-yellow-500"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>


      {/* Mobile Menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a href="#" className="block text-gray-800 hover:text-yellow-500">
            VISAS
          </a>
          <a href="#" className="block text-gray-800 hover:text-yellow-500">
            HOTELS
          </a>
          <a href="#" className="block text-gray-800 hover:text-yellow-500">
            FLIGHTS
          </a>
          <a href="#" className="block text-gray-800 hover:text-yellow-500">
            SCHOOLS
          </a>
          <a href="#" className="block text-gray-800 hover:text-yellow-500">
            PACKAGES
          </a>
        </div>
      </div>
    </nav>
        </section>
    )


})

