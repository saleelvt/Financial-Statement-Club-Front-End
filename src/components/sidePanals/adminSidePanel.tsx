import {  useState } from "react";
import { NavLink } from "react-router-dom";

import "chart.js/auto";
import {
  FaBars,
  FaHome,
  FaListAlt,
  FaUser,
  FaCog,
  FaTimes,
  FaFileAlt,
} from "react-icons/fa";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const arabicDocuments = new Array(932).fill("Arabic Doc"); // Replace with real data
  const englishDocuments = new Array(934).fill("English Doc"); // Replace with real data
  const totalTables = 10; // Dummy table count

  // Dummy Graph Data
  // const chartData = {
  //   labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //   datasets: [
  //     {
  //       label: "New Documents",
  //       data: [5, 12, 8, 15, 10, 6, 9],
  //       backgroundColor: "#D1D5DB", // Gray-300
  //       borderColor: "#6B7280", // Gray-500
  //       borderWidth: 1.5,
  //       borderRadius: 8,
  //     },
  //     {
  //       label: "Traffic",
  //       data: [20, 30, 25, 40, 35, 50, 45],
  //       backgroundColor: "#9CA3AF", // Gray-400
  //       borderColor: "#374151", // Gray-700
  //       borderWidth: 1.5,
  //       borderRadius: 8, 
  //     },
  //   ],
  // };

  const navLinks = [
    { to: "/home", icon: FaHome, label: "Dashboard" },
    { to: "/addDocument", icon: FaFileAlt, label: "Add Document" },

    { to: "/addNewTable", icon: FaFileAlt, label: "Add New Table" },
    { to: "/documentList", icon: FaListAlt, label: "Document List" },
    { to: "/admin/profile", icon: FaUser, label: "Profile" },
    { to: "/admin/settings", icon: FaCog, label: "Settings" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar - Fixed on the screen */}
      <aside
        className={`bg-white fixed lg:static h-screen shadow-lg transition-all duration-300 z-20
          ${isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full lg:w-64 lg:translate-x-0"}
        `}
      >
        <button
          onClick={toggleSidebar}
          className={`absolute -right-10 top-4 p-2 bg-white rounded-tr-lg rounded-br-lg shadow-lg lg:hidden ${!isOpen && "hidden"}`}
        >
          <FaTimes className="h-6 w-6 text-gray-600" />
        </button>

        {/* Profile Section */}
        <div className={`p-4 ${!isOpen && "lg:block hidden"}`}>
          <div className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-gray-300 hover:text-white font-semibold focus:ring-2 focus:ring-gray-400 transition duration-300 transform hover:scale-105 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 p-1 flex items-center justify-center">
                <FaUser className="text-white rounded-full" />
              </div>
              <div className="text-white">
                <h2 className="font-medium">Mr: Ahmad (KSA)</h2>
                <p className="text-sm opacity-80">techno12.ab@outlook.com</p>
              </div>
            </div>
          </div>
        </div>

        <nav className={`px-3 ${!isOpen && "lg:block hidden"}`}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-4 rounded-lg mb-1 transition-colors duration-200 ${
                  isActive ? "bg-gray-200 text-black" : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <link.icon />
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Backdrop for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/20 lg:hidden z-10" onClick={toggleSidebar} />}

      {/* Scrollable Content Area */}
      <main className="flex-1 h-screen overflow-y-auto">
        {/* Navbar */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex items-center">
            <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 lg:hidden">
              <FaBars className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </header>

        {/* Scrollable Section - Add overflow here */}
        <div className="p-2 lg:w-12/12 bg-gray-50 min-h-screen overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Welcome to Admin Dashboard
            </h2>
            <p className="text-gray-600 mb-6">
              Here you can manage and track your application's data.
            </p>

            {/* Stats Cards */}
            <div className="grid lg:grid-cols-5 xs:grid-cols-2 text-sm font-semibold flex justify-between md:grid-cols-3 gap-3 mb-4">
              <div className="bg-gray-300 p-6 rounded-lg text-center shadow">
                <h3 className="text-gray-700">Arabic Documents</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {arabicDocuments.length}
                </p>
              </div>
              <div className="bg-gray-300 p-6 rounded-lg text-center shadow">
                <h3 className="text-gray-700">English Documents</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {englishDocuments.length}
                </p>
              </div>
              <div className="bg-gray-300 p-6 rounded-lg text-center shadow">
                <h3 className="text-gray-700">Total Tables</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {totalTables}
                </p>
              </div>
              <div className="bg-gray-300 p-6 rounded-lg text-center shadow">
                <h3 className=" text-gray-700">Logical Data Size </h3>
                <p className="text-2xl font-bold text-gray-900">1.02MB</p>
              </div>
              <div className="bg-gray-300 p-6 rounded-lg text-center shadow">
                <h3 className=" text-gray-700">Indexes Total Size </h3>
                <p className="text-2xl font-bold text-gray-900"> 60KB</p>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Document Growth & Traffic
              </h3>
              {/* <Bar data={chartData} /> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSidebar;
