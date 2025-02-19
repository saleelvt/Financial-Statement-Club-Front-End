import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const AddTable: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen mt-12 px-4">
      <form className="bg-white shadow-md rounded px-4 pb-8 w-full max-w-lg lg:max-w-4xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
              Full Name <span className="font-mono text-xs">(English)</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div className="w-full">
            <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
              Nick Name <span className="text-xs font-mono">(English)</span>
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Nick Name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">Tadawul Code</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Enter The Tadawul"
            />
          </div>
          <div>
            <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">Sector</label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Enter The Sector"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">Q1</label>
            <input
              type="file"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
            />
            <DatePicker
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
              placeholderText="Choose Date"
            />
            <input
              type="text"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
              placeholder="Enter Year"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
