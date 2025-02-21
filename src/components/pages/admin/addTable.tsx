/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { HiMinusSm } from "react-icons/hi";
import domtoimage from "dom-to-image";

interface PropertyRow {
  propertyName: string;
  notes: string;
  date1: number;
  date2: number;
}

interface SubSection {
  subName: string;
  subNameArabic: string;
  properties: PropertyRow[];
}

interface FormData {
  mainName: string;
  mainNameArabic: string;
  subSections: SubSection[];
}

const AddTable = () => {
  const [formData, setFormData] = useState<FormData>({
    mainName: '',
    mainNameArabic: '',
    subSections: [{
      subName: '',
      subNameArabic: '',
      properties: [
        {
          propertyName: '',
          notes: '',
          date1: 0,
          date2: 0
        }
      ]
    }]
  });


  const captureScreen = () => {
    const node = document.getElementById("capture-area");
    if (!node) return;
  
    domtoimage.toPng(node).then((dataUrl:any) => {
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "screenshot.png";
      link.click();
    });
  };

  const handleMainNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubSectionChange = (index: number, field: string, value: string) => {
    const newSubSections = [...formData.subSections];
    newSubSections[index] = {
      ...newSubSections[index],
      [field]: value
    };
    setFormData({
      ...formData,
      subSections: newSubSections
    });
  };

  const handlePropertyChange = (subIndex: number, propIndex: number, field: string, value: string | number) => {
    const newSubSections = [...formData.subSections];
    newSubSections[subIndex].properties[propIndex] = {
      ...newSubSections[subIndex].properties[propIndex],
      [field]: value
    };
    setFormData({
      ...formData,
      subSections: newSubSections
    });
  };

  const addProperty = (subIndex: number) => {
    const newSubSections = [...formData.subSections];
    newSubSections[subIndex].properties.push({
      propertyName: '',
      notes: '',
      date1: 0,
      date2: 0
    });
    setFormData({
      ...formData,
      subSections: newSubSections
    });
  };
  const removeProperty = (subIndex: number,propertyIndex: number) => {
    const newSubSections = [...formData.subSections];
    newSubSections[subIndex].properties.splice(propertyIndex, 1);

    setFormData({
      ...formData,
      subSections: formData.subSections
    });
  };
 

  const addSubSection = () => {
    setFormData({
      ...formData,
      subSections: [...formData.subSections, {
        subName: '',
        subNameArabic: '',
        properties: [{
          propertyName: '',
          notes: '',
          date1: 0,
          date2: 0
        }]
      }]
    });
  };
  const removeSubSection = () => {
    setFormData({
      ...formData,
      subSections: formData.subSections.slice(0, -1) // Creates new array without last element
    });
  };

  const calculateSubSectionTotal = (subIndex: number) => {
    return {
      date1: formData.subSections[subIndex].properties.reduce((acc, curr) => acc + curr.date1, 0),
      date2: formData.subSections[subIndex].properties.reduce((acc, curr) => acc + curr.date2, 0)
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log('Form Data:', formData);
      toast.success("Table successfully added");
    } catch (error: any) { 
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message,
        timer: 3000,
        toast: true,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div  id="capture-area" className="p-12 border border-black">
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded pb-8 w-full max-w-7xl">
      <div  className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 text-left"></th>
              <th className="border bg-slate-400 border-gray-300 p-2 text-center w-24">Notes</th>
              <th className="border bg-slate-400 border-gray-300 p-2 text-center w-40">Date 1</th>
              <th className="border bg-slate-400 border-gray-300 p-2 text-center w-40">Date 2</th>
            </tr>
          </thead>
          <tbody>
            {/* Main Name Row */}
            <tr className="bg-gray-50">
              <td className="border border-gray-300">
                <div className="flex justify-start items-center w-1/2 bg-blue-600 p-2">
                  <input 
                    type="text"
                    name="mainName"
                    value={formData.mainName}
                    onChange={handleMainNameChange}
                    className="text-sm px-4 py-1 border rounded"
                    placeholder="Main Name"
                  />
                  
                  <input
                    type="text"
                    name="mainNameArabic"
                    value={formData.mainNameArabic}
                    onChange={handleMainNameChange}
                    className="text-sm px-4 py-1 border rounded"
                    placeholder="Main Name Arabic"
                  />
                   <button type="button" onClick={addSubSection} className="ml-2 hover:bg-gray-300 text-bold text-lg">
                    <FaPlus />
                  </button> 
                  <button type="button"  onClick={removeSubSection} className="ml-2 hover:bg-gray-300 text-bold text-lg">
                    <HiMinusSm className='text-2xl' /> 
                  </button>
                  
                </div>  
              </td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300"></td>
            </tr>

            {/* Sub Sections */}
            {formData.subSections.map((subSection, subIndex) => (
              <React.Fragment key={subIndex}>
                {/* Sub Section Header */}
                <tr className="bg-gray-50">
                  <td className="border border-gray-300">
                    <div className="flex justify-between items-center w-1/2 bg-red-200 p-2">
                      <input
                        type="text"
                        value={subSection.subName}
                        onChange={(e) => handleSubSectionChange(subIndex, 'subName', e.target.value)}
                        className="text-sm px-4 py-1 border rounded"
                        placeholder="SubName"
                      />
                      <input
                        type="text"
                        value={subSection.subNameArabic}
                        onChange={(e) => handleSubSectionChange(subIndex, 'subNameArabic', e.target.value)}
                        className="text-sm px-4 py-1 border rounded"
                        placeholder="SubName Arabic"
                      />
                      <button type="button" onClick={() => addProperty(subIndex)} className="ml-2">
                        <FaPlus />
                      </button>
                       <button type="button"  onClick={()=>removeProperty(subIndex,subIndex)} className="ml-2 hover:bg-gray-300 ">
                    <HiMinusSm className='text-2xl' /> 
                  </button>
                    </div>
                  </td>
                  <td className="border border-gray-300"></td>
                  <td className="border border-gray-300"></td>
                  <td className="border border-gray-300"></td>
                </tr>

                {/* Properties */}
                {subSection.properties.map((property, propIndex) => (
                  <tr key={`${subIndex}-${propIndex}`}>
                    <td className="border border-gray-300 px-1">
                      <input
                        type="text"
                        value={property.propertyName}
                        onChange={(e) => handlePropertyChange(subIndex, propIndex, 'propertyName', e.target.value)}
                        className="px-4 text-sm border rounded"
                        placeholder="properties"
                      />
                    </td>
                    <td className="border border-gray-300">
                      <input
                        type="text"
                        value={property.notes}
                        onChange={(e) => handlePropertyChange(subIndex, propIndex, 'notes', e.target.value)}
                        className="w-full border rounded"
                        placeholder="Notes"
                      />
                    </td>
                    <td className="border border-gray-300">
                      <input
                        type="number"
                        value={property.date1}
                        onChange={(e) => handlePropertyChange(subIndex, propIndex, 'date1', Number(e.target.value))}
                        className="w-full p-1 border rounded"
                        placeholder="0"
                      />
                    </td>
                    <td className="border border-gray-300">
                      <input
                        type="number"
                        value={property.date2}
                        onChange={(e) => handlePropertyChange(subIndex, propIndex, 'date2', Number(e.target.value))}
                        className="w-full p-1 border rounded"
                        placeholder="0"
                      />
                    </td>
                  </tr>
                ))}

                {/* Sub Section Total */}
                <tr className="bg-gray-300">
                  <td className="border border-gray-300 p-2 pl-4 font-bold">
                    Total {subSection.subName}
                  </td>
                  <td className="border border-gray-300"></td>
                  <td className="border border-gray-300 p-2">
                    {calculateSubSectionTotal(subIndex).date1}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {calculateSubSectionTotal(subIndex).date2}
                  </td>
                </tr>
                <tr className="bg-gray-400">
                  <td className="border border-gray-300 p-2 pl-4 font-bold">
                    Total {formData.mainName}
                  </td>
                  <td className="border border-gray-300"></td>
                  <td className="border border-gray-300 p-2">
                    {calculateSubSectionTotal(subIndex).date1}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {calculateSubSectionTotal(subIndex).date2}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody> 
        </table>
      </div>
      <div className="mt-12 flex justify-end"> <button className="bg-red-400 rounded-xl p-2" onClick={captureScreen}>Capture</button></div>
     
    </form> 
    </div>
  );
};
 
export default AddTable;