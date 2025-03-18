import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiMinusSm } from 'react-icons/hi';

// Define the data structure
interface PropertyItem {
  propertyName: string;
  notes: string;
  date1: number | null;
  date2: number | null;
}

interface SubPropertySumItem {
  SubpropertyName: string;
  notes: string;
  date1: number | null;
  date2: number | null;
}

interface SubSection {
  subName: string;
  subNameArabic: string;
  properties: PropertyItem[];
  subPropertieSum: SubPropertySumItem[];
}

interface MainSection {
  mainName: string;
  mainNameArabic: string;
  subSections: SubSection[];
}

interface FormDataStructure {
  mainSections: MainSection[];
}

const FinancialForm: React.FC = () => {
  const [takeShot, setTakeShot] = useState(false);
  const [takeShotForProfitLoss, setTakeShotForProfitLoss] = useState(false);
  const [takeShotForCashFlow, setTakeShotForCashFlow] = useState(false);

  const [formData, setFormData] = useState<FormDataStructure>({
    mainSections: [
      {
        mainName: "",
        mainNameArabic: "",
        subSections: [
          {
            subName: "",
            subNameArabic: "",
            properties: [
              {
                propertyName: "",
                notes: "",
                date1: null,
                date2: null,
              },
            ],
            subPropertieSum: [
              {
                SubpropertyName: "",
                notes: "",
                date1: null,
                date2: null
              }
            ]
          },
        ],
      },
    ],
  });

  // Handle main name change
  const handleMainNameChange = (mainIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newMainSections = [...formData.mainSections];
    newMainSections[mainIndex].mainName = e.target.value;
    setFormData({
      ...formData,
      mainSections: newMainSections,
    });
  };

  // Add a subsection
  const addSubSection = (mainIndex: number) => {
    const newMainSections = [...formData.mainSections];
    newMainSections[mainIndex].subSections.push({
      subName: "",
      subNameArabic: "",
      properties: [
        {
          propertyName: "",
          notes: "",
          date1: null,
          date2: null,
        },
      ],
      subPropertieSum: []
    });
    setFormData({
      ...formData,
      mainSections: newMainSections,
    });
  };

  // Remove a subsection
  const removeSubSection = (mainIndex: number) => {
    const newMainSections = [...formData.mainSections];
    if (newMainSections[mainIndex].subSections.length > 1) {
      newMainSections[mainIndex].subSections.pop();
      setFormData({
        ...formData,
        mainSections: newMainSections,
      });
    }
  };

  // Handle subsection changes
  const handleSubSectionChange = (
    mainIndex: number,
    subIndex: number,
    field: string,
    value: string
  ) => {
    const newMainSections = [...formData.mainSections];
    newMainSections[mainIndex].subSections[subIndex][field as keyof SubSection] = value as any;
    setFormData({
      ...formData,
      mainSections: newMainSections,
    });
  };

  // Add a property
  const addProperty = (mainIndex: number, subIndex: number) => {
    const newMainSections = [...formData.mainSections];
    newMainSections[mainIndex].subSections[subIndex].properties.push({
      propertyName: "",
      notes: "",
      date1: null,
      date2: null,
    });
    setFormData({
      ...formData,
      mainSections: newMainSections,
    });
  };

  // Remove a property
  const removeProperty = (mainIndex: number, subIndex: number) => {
    const newMainSections = [...formData.mainSections];
    if (newMainSections[mainIndex].subSections[subIndex].properties.length > 1) {
      newMainSections[mainIndex].subSections[subIndex].properties.pop();
      setFormData({
        ...formData,
        mainSections: newMainSections,
      });
    }
  };

  // Handle property changes
  const handlePropertyChange = (
    mainIndex: number,
    subIndex: number,
    propIndex: number,
    field: string,
    value: string | number
  ) => {
    const newMainSections = [...formData.mainSections];
    newMainSections[mainIndex].subSections[subIndex].properties[propIndex][field as keyof PropertyItem] = value as any;
    setFormData({
      ...formData,
      mainSections: newMainSections,
    });
  };

  // Handle subPropertySum changes
  const handleSubPropertySumChange = (
    mainIndex: number,
    subIndex: number,
    subPropIndex: number,
    field: string,
    value: string | number
  ) => {
    const newMainSections = [...formData.mainSections];
    if (!newMainSections[mainIndex]?.subSections[subIndex]?.subPropertieSum[subPropIndex]) {
      return;
    }
    newMainSections[mainIndex].subSections[subIndex].subPropertieSum[subPropIndex][field as keyof SubPropertySumItem] = value as any;
    setFormData({
      ...formData,
      mainSections: newMainSections,
    });
  };

  // Enhanced addSubPropertySum function
  const addSubPropertySum = (
    mainIndex: number,
    subIndex: number,
    propertyIndex: number = 0,
    position: 'before' | 'after' = 'after'
  ) => {
    const newMainSections = [...formData.mainSections];
    
    if (!newMainSections[mainIndex]?.subSections[subIndex]) return;
    
    const newSubPropertySumItem = {
      SubpropertyName: "",
      notes: "",
      date1: null,
      date2: null,
    };
    
    // Initialize subPropertieSum array if it doesn't exist
    if (!newMainSections[mainIndex].subSections[subIndex].subPropertieSum) {
      newMainSections[mainIndex].subSections[subIndex].subPropertieSum = [];
    }
    
    // Get current subPropertieSum array
    const currentSubPropertieSum = newMainSections[mainIndex].subSections[subIndex].subPropertieSum;
    
    // Find the correct index for inserting subPropertieSum relative to the propertyIndex
    let insertIndex = propertyIndex;
    if (position === 'after') {
      insertIndex += 1;
    }
    
    // Insert at the calculated position
    currentSubPropertieSum.splice(insertIndex, 0, newSubPropertySumItem);
    
    // Update the sub-section structure
    newMainSections[mainIndex].subSections[subIndex].subPropertieSum = [...currentSubPropertieSum];
    
    setFormData({
      ...formData,
      mainSections: newMainSections,
    });
  };

  // Calculate subsection totals
  const calculateSubSectionTotal = (mainIndex: number, subIndex: number) => {
    const subSection = formData.mainSections[mainIndex]?.subSections[subIndex];
    if (!subSection) return { date1: 0, date2: 0 };
  
    let totalDate1 = 0;
    let totalDate2 = 0;
  
    // Sum property values
    subSection.properties.forEach(prop => {
      totalDate1 += prop.date1 || 0;
      totalDate2 += prop.date2 || 0;
    });
  
    // Sum subPropertySum values
    if (subSection.subPropertieSum) {
      subSection.subPropertieSum.forEach(subProp => {
        totalDate1 += subProp.date1 || 0;
        totalDate2 += subProp.date2 || 0;
      });
    }
  
    return { date1: totalDate1, date2: totalDate2 };
  };

  // Calculate main section totals
  const calculateMainTotal = (mainIndex: number) => {
    const mainSection = formData.mainSections[mainIndex];
    if (!mainSection) return { totalDate1: 0, totalDate2: 0 };
  
    let totalDate1 = 0;
    let totalDate2 = 0;
  
    mainSection.subSections.forEach((subSection, subIndex) => {
      const subTotal = calculateSubSectionTotal(mainIndex, subIndex);
      totalDate1 += subTotal.date1;
      totalDate2 += subTotal.date2;
    });
  
    return { totalDate1, totalDate2 };
  };

  return (
    <div className="container mx-auto p-4">
      <form>
        {formData.mainSections.map((mainSection, mainIndex) => (
          <div key={mainIndex} className="mb-2">
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                {!(takeShotForProfitLoss || takeShotForCashFlow) && (
                  <>
                    {/* Main Name Row */}
                    <tr className="">
                      <td className="">
                        <div className="flex h-7">
                          <input
                            type="text"
                            name="mainName"
                            value={mainSection.mainName}
                            onChange={(e) =>
                              handleMainNameChange(mainIndex, e)
                            }
                            className="text-sm px-4 w-[450px] font-bold border border-gray-200"
                            placeholder="Main Name"
                          />
                          {!takeShot && (
                            <>
                              <button
                                type="button"
                                onClick={() => addSubSection(mainIndex)}
                                className="ml-2 hover:bg-gray-100 p-1 rounded-full font-semibold text-[14px]"
                              >
                                <FaPlus />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeSubSection(mainIndex)}
                                className="ml-2 hover:bg-gray-100 p-1 rounded-full font-semibold text-[14px]"
                              >
                                <HiMinusSm className="text-2xl" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-300"></td>
                      <td className="border border-gray-300"></td>
                      <td className="border border-gray-300"></td>
                    </tr>
                  </>
                )}

                {/* Sub Sections */}
                {mainSection.subSections.map((subSection, subIndex) => (
                  <React.Fragment key={`sub-${mainIndex}-${subIndex}`}>
                    {/* Sub Section Header */}
                    {!takeShotForProfitLoss && (
                      <>
                        <tr className="">
                          <td className="">
                            <div className="flex w-full">
                              <input
                                type="text"
                                value={subSection.subName}
                                onChange={(e) =>
                                  handleSubSectionChange(
                                    mainIndex,
                                    subIndex,
                                    "subName",
                                    e.target.value
                                  )
                                }
                                className="text-sm px-4 w-[450px] font-medium border border-gray-200"
                                placeholder="SubName"
                              />
                              {!takeShot && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      addProperty(mainIndex, subIndex)
                                    }
                                    className="hover:bg-gray-100 p-2 rounded-full font-semibold text-[14px]"
                                  >
                                    <FaPlus />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeProperty(mainIndex, subIndex)
                                    }
                                    className="ml-2 hover:bg-gray-100 p-1 rounded-full font-semibold text-[14px]"
                                  >
                                    <HiMinusSm className="text-2xl" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="border border-gray-300"></td>
                          <td className="border border-gray-300"></td>
                          <td className="border border-gray-300"></td>
                        </tr>
                      </>
                    )}

                    {/* SubPropertieSum BEFORE First Property */}
                    {!takeShot && (
                      <tr>
                        <td className="border border-gray-300">
                          <div className="flex justify-start p-2">
                            <button
                              type="button"
                              onClick={() =>
                                addSubPropertySum(
                                  mainIndex,
                                  subIndex,
                                  0,
                                  'before'
                                )
                              }
                              className="hover:bg-gray-100 p-1 rounded font-semibold text-[14px] mr-2"
                            >
                              <FaPlus className="text-sm inline mr-1" /> Add
                              Sub Property Before First Property
                            </button>
                          </div>
                        </td>
                        <td className="border border-gray-300"></td>
                        <td className="border border-gray-300"></td>
                        <td className="border border-gray-300"></td>
                      </tr>
                    )}

                    {/* Display SubPropertieSum items that should be BEFORE properties */}
                    {subSection.subPropertieSum?.map((subProp, subPropIndex) => {
                      // Only render subPropertieSum items that should appear before properties
                      if (subPropIndex < 1) {
                        return (
                          <tr
                            key={`subprop-before-${mainIndex}-${subIndex}-${subPropIndex}`}
                          >
                            <td className="border h-7">
                              <input
                                type="text"
                                value={subProp.SubpropertyName}
                                onChange={(e) =>
                                  handleSubPropertySumChange(
                                    mainIndex,
                                    subIndex,
                                    subPropIndex,
                                    "SubpropertyName",
                                    e.target.value
                                  )
                                }
                                className="px-4 text-sm font-semibold w-[550px] border-l border-r border-gray-200"
                                placeholder="Sub Property Sum"
                              />
                            </td>
                            <td className="border border-gray-300">
                              <input
                                type="text"
                                value={subProp.notes}
                                onChange={(e) =>
                                  handleSubPropertySumChange(
                                    mainIndex,
                                    subIndex,
                                    subPropIndex,
                                    "notes",
                                    e.target.value
                                  )
                                }
                                className="w-full border font-semibold border-transparent px-1"
                                placeholder=""
                              />
                            </td>
                            <td className="border border-gray-300">
                              <input
                                type="number"
                                value={subProp.date1 ?? 0}
                                onChange={(e) =>
                                  handleSubPropertySumChange(
                                    mainIndex,
                                    subIndex,
                                    subPropIndex,
                                    "date1",
                                    Number(e.target.value)
                                  )
                                }
                                className="border font-semibold border-transparent w-full pl-2"
                                placeholder=""
                              />
                            </td>
                            <td className="border border-gray-300">
                              <input
                                type="number"
                                value={subProp.date2 ?? 0}
                                onChange={(e) =>
                                  handleSubPropertySumChange(
                                    mainIndex,
                                    subIndex,
                                    subPropIndex,
                                    "date2",
                                    Number(e.target.value)
                                  )
                                }
                                className="border font-semibold border-transparent w-full pl-2"
                                placeholder=""
                              />
                            </td>
                          </tr>
                        );
                      }
                      return null;
                    })}

                    {/* Properties */}
                    {subSection.properties.map((property, propIndex) => (
                      <React.Fragment key={`prop-${mainIndex}-${subIndex}-${propIndex}`}>
                        <tr>
                          <td className="border h-7">
                            <input
                              type="text"
                              value={property.propertyName}
                              onChange={(e) =>
                                handlePropertyChange(
                                  mainIndex,
                                  subIndex,
                                  propIndex,
                                  "propertyName",
                                  e.target.value
                                )
                              }
                              className="px-4 text-sm w-[550px] border-l border-r border-gray-200"
                              placeholder="properties"
                            />
                          </td>
                          <td className="border border-gray-300">
                            <input
                              type="text"
                              value={property.notes}
                              onChange={(e) =>
                                handlePropertyChange(
                                  mainIndex,
                                  subIndex,
                                  propIndex,
                                  "notes",
                                  e.target.value
                                )
                              }
                              className="w-full border border-transparent px-1"
                              placeholder=""
                            />
                          </td>
                          <td className="border border-gray-300">
                            <input
                              type="number"
                              value={property.date1 ?? 0}
                              onChange={(e) =>
                                handlePropertyChange(
                                  mainIndex,
                                  subIndex,
                                  propIndex,
                                  "date1",
                                  Number(e.target.value)
                                )
                              }
                              className="border border-transparent w-full pl-2"
                              placeholder=""
                            />
                          </td>
                          <td className="border border-gray-300">
                            <input
                              type="number"
                              value={property.date2 ?? 0}
                              onChange={(e) =>
                                handlePropertyChange(
                                  mainIndex,
                                  subIndex,
                                  propIndex,
                                  "date2",
                                  Number(e.target.value)
                                )
                              }
                              className="border border-transparent w-full pl-2"
                              placeholder=""
                            />
                          </td>
                        </tr>

                        {/* Add after each property button */}
                        {!takeShot && (
                          <tr>
                            <td className="border border-gray-300">
                              <div className="flex justify-start p-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    addSubPropertySum(
                                      mainIndex,
                                      subIndex,
                                      propIndex + 1,
                                      'after'
                                    )
                                  }
                                  className="hover:bg-gray-100 p-1 rounded font-semibold text-[14px] mr-2"
                                >
                                  <FaPlus className="text-sm inline mr-1" /> Add
                                  Sub Property After This Property
                                </button>
                              </div>
                            </td>
                            <td className="border border-gray-300"></td>
                            <td className="border border-gray-300"></td>
                            <td className="border border-gray-300"></td>
                          </tr>
                        )}

                        {/* Display SubPropertieSum items that should be AFTER this property */}
                        {subSection.subPropertieSum?.map((subProp, subPropIndex) => {
                          // Only render subPropertieSum items that should appear after this property
                          // This is simplified logic - in a real app you'd need a more robust way to track positions
                          if (subPropIndex > 0 && subPropIndex <= propIndex + 1) {
                            return (
                              <tr
                                key={`subprop-after-${mainIndex}-${subIndex}-${propIndex}-${subPropIndex}`}
                              >
                                <td className="border h-7">
                                  <input
                                    type="text"
                                    value={subProp.SubpropertyName}
                                    onChange={(e) =>
                                      handleSubPropertySumChange(
                                        mainIndex,
                                        subIndex,
                                        subPropIndex,
                                        "SubpropertyName",
                                        e.target.value
                                      )
                                    }
                                    className="px-4 text-sm font-semibold w-[550px] border-l border-r border-gray-200"
                                    placeholder="Sub Property Sum"
                                  />
                                </td>
                                <td className="border border-gray-300">
                                  <input
                                    type="text"
                                    value={subProp.notes}
                                    onChange={(e) =>
                                      handleSubPropertySumChange(
                                        mainIndex,
                                        subIndex,
                                        subPropIndex,
                                        "notes",
                                        e.target.value
                                      )
                                    }
                                    className="w-full border font-semibold border-transparent px-1"
                                    placeholder=""
                                  />
                                </td>
                                <td className="border border-gray-300">
                                  <input
                                    type="number"
                                    value={subProp.date1 ?? 0}
                                    onChange={(e) =>
                                      handleSubPropertySumChange(
                                        mainIndex,
                                        subIndex,
                                        subPropIndex,
                                        "date1",
                                        Number(e.target.value)
                                      )
                                    }
                                    className="border font-semibold border-transparent w-full pl-2"
                                    placeholder=""
                                  />
                                </td>
                                <td className="border border-gray-300">
                                  <input
                                    type="number"
                                    value={subProp.date2 ?? 0}
                                    onChange={(e) =>
                                      handleSubPropertySumChange(
                                        mainIndex,
                                        subIndex,
                                        subPropIndex,
                                        "date2",
                                        Number(e.target.value)
                                      )
                                    }
                                    className="border font-semibold border-transparent w-full pl-2"
                                    placeholder=""
                                  />
                                </td>
                              </tr>
                            );
                          }
                          return null;
                        })}
                      </React.Fragment>
                    ))}

                    {/* Add button for subPropertieSum after all properties */}
                    {!takeShot && (
                      <tr>
                        <td className="border border-gray-300">
                          <div className="flex justify-start p-2">
                            <button
                              type="button"
                              onClick={() =>
                                addSubPropertySum(
                                  mainIndex, 
                                  subIndex,
                                  subSection.properties.length,
                                  'after'
                                )
                              }
                              className="hover:bg-gray-100 p-1 rounded font-semibold text-[14px] mr-2"
                            >
                              <FaPlus className="text-sm inline mr-1" /> Add
                              Sub Property After Last Property
                            </button>
                          </div>
                        </td>
                        <td className="border border-gray-300"></td>
                        <td className="border border-gray-300"></td>
                        <td className="border border-gray-300"></td>
                      </tr>
                    )}

                    {/* Display remaining SubPropertieSum items */}
                    {subSection.subPropertieSum?.map((subProp, subPropIndex) => {
                      // Only render subPropertieSum items that should appear after all properties
                      if (subPropIndex > subSection.properties.length) {
                        return (
                          <tr
                            key={`subprop-last-${mainIndex}-${subIndex}-${subPropIndex}`}
                          >
                            <td className="border h-7">
                              <input
                                type="text"
                                value={subProp.SubpropertyName}
                                onChange={(e) =>
                                  handleSubPropertySumChange(
                                    mainIndex,
                                    subIndex,
                                    subPropIndex,
                                    "SubpropertyName",
                                    e.target.value
                                  )
                                }
                                className="px-4 text-sm font-semibold w-[550px] border-l border-r border-gray-200"
                                placeholder="Sub Property Sum"
                              />
                            </td>
                            <td className="border border-gray-300">
                              <input
                                type="text"
                                value={subProp.notes}
                                onChange={(e) =>
                                  handleSubPropertySumChange(
                                    mainIndex,
                                    subIndex,
                                    subPropIndex,
                                    "notes",
                                    e.target.value
                                  )
                                }
                                className="w-full border font-semibold border-transparent px-1"
                                placeholder=""
                              />
                            </td>
                            <td className="border border-gray-300">
                              <input
                                type="number"
                                value={subProp.date1 ?? 0}
                                onChange={(e) =>
                                  handleSubPropertySumChange(
                                    mainIndex,
                                    subIndex,
                                    subPropIndex,
                                    "date1",
                                    Number(e.target.value)
                                  )
                                }
                                className="border font-semibold border-transparent w-full pl-2"
                                placeholder=""
                              />
                            </td>
                            <td className="border border-gray-300">
                              <input
                                type="number"
                                value={subProp.date2 ?? 0}
                                onChange={(e) =>
                                  handleSubPropertySumChange(
                                    mainIndex,
                                    subIndex,
                                    subPropIndex,
                                    "date2",
                                    Number(e.target.value)
                                  )
                                }
                                className="border font-semibold border-transparent w-full pl-2"
                                placeholder=""
                              />
                            </td>
                          </tr>
                        );
                      }
                      return null;
                    })}

                    {/* Sub Section Total */}
                    <tr className="bg-slate-300">
                      <td className="border border-gray-300 px-2 pl-4 text-[14px] font-semibold">
                        <input
                          type="text"
                          name="totalof the data"
                          className="bg-slate-300"
                          placeholder="Total"
                        />
                      </td>
                      <td className="border border-gray-300"></td>
                      <td className="border border-gray-300 pl-2">
                        {calculateSubSectionTotal(mainIndex, subIndex).date1}
                      </td>
                      <td className="border border-gray-300 pl-2">
                        {calculateSubSectionTotal(mainIndex, subIndex).date2}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}

                {/* Main Section Total Row */}
                <tr className="bg-gray-350">
                  <td className="border text-[14px] border-gray-300 px-2 pl-4 font-bold">
                    <input
                      type="text"
                      name="totalof the data"
                      className="w-full"
                      placeholder="Grand Total"
                    />
                  </td>
                  <td className="border border-gray-300"></td>
                  <td className="border border-gray-300 text-lg font-bold px-2">
                    {calculateMainTotal(mainIndex).totalDate1}
                  </td>
                  <td className="border border-gray-300 text-lg font-bold px-2">
                    {calculateMainTotal(mainIndex).totalDate2}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </form>
    </div>
  );
};

export default FinancialForm;