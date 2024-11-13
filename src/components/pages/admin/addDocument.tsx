import React, { useState } from 'react';

export const AddDocument: React.FC = () => {
  const [companyNameAr, setCompanyNameAr] = useState('');
  const [companyNameEn, setCompanyNameEn] = useState('');
  const [yearOfReport, setYearOfReport] = useState('');
  const [file, setFile] = useState<File | null>(null);

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
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform document upload logic here
    console.log('Company Name (Arabic):', companyNameAr);
    console.log('Company Name (English):', companyNameEn);
    console.log('Year of Report:', yearOfReport);
    console.log('File:', file);
  };

  return (
    <div className="flex justify-center items-center h-screen">

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <div className="flex -mx-3">
          <div className="w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="company-name-ar">
              Company Name (Arabic)
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
          <div className="w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="company-name-en">
              Company Name (English)
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="company-name-en"
              type="text"
              placeholder="Example Company"
              value={companyNameEn}
              onChange={handleCompanyNameEnChange}
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="year-of-report">
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
          <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2" htmlFor="file">
            Add PDF
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="file"
            type="file"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-gradient-to-b from-green-500 via-green-700 to-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};