import React, { useState } from "react";

const AssetForm = () => {
  const [nonCurrentAssets, setNonCurrentAssets] = useState<number[]>(Array(12).fill(0));
  const [nonCurrentSubAssets, setNonCurrentSubAssets] = useState<number[]>(Array(3).fill(0));
  const [currentAssets, setCurrentAssets] = useState<number[]>(Array(12).fill(0));
  const [currentSubAssets, setCurrentSubAssets] = useState<number[]>(Array(3).fill(0));
  
  // New state for Date 2 columns
  const [nonCurrentAssetsDate2, setNonCurrentAssetsDate2] = useState<number[]>(Array(12).fill(0));
  const [nonCurrentSubAssetsDate2, setNonCurrentSubAssetsDate2] = useState<number[]>(Array(3).fill(0));
  const [currentAssetsDate2, setCurrentAssetsDate2] = useState<number[]>(Array(12).fill(0));
  const [currentSubAssetsDate2, setCurrentSubAssetsDate2] = useState<number[]>(Array(3).fill(0));
  
  // New state for labels
  const [nonCurrentLabels, setNonCurrentLabels] = useState<string[]>(Array(12).fill(""));
  const [nonCurrentSubLabels, setNonCurrentSubLabels] = useState<string[]>(Array(3).fill(""));
  const [currentLabels, setCurrentLabels] = useState<string[]>(Array(12).fill(""));
  const [currentSubLabels, setCurrentSubLabels] = useState<string[]>(Array(3).fill(""));
  
  // States for equity and liabilities
  const [equityItems, setEquityItems] = useState<number[]>(Array(12).fill(0));
  const [equityItemsDate2, setEquityItemsDate2] = useState<number[]>(Array(12).fill(0));
  const [equityLabels, setEquityLabels] = useState<string[]>(Array(12).fill(""));
  
  const [equitySubItems, setEquitySubItems] = useState<number[]>(Array(3).fill(0));
  const [equitySubItemsDate2, setEquitySubItemsDate2] = useState<number[]>(Array(3).fill(0));
  const [equitySubLabels, setEquitySubLabels] = useState<string[]>(Array(3).fill(""));
  
  const [nonCurrentLiabilities, setNonCurrentLiabilities] = useState<number[]>(Array(12).fill(0));
  const [nonCurrentLiabilitiesDate2, setNonCurrentLiabilitiesDate2] = useState<number[]>(Array(12).fill(0));
  const [nonCurrentLiabilitiesLabels, setNonCurrentLiabilitiesLabels] = useState<string[]>(Array(12).fill(""));
  
  const [nonCurrentSubLiabilities, setNonCurrentSubLiabilities] = useState<number[]>(Array(3).fill(0));
  const [nonCurrentSubLiabilitiesDate2, setNonCurrentSubLiabilitiesDate2] = useState<number[]>(Array(3).fill(0));
  const [nonCurrentSubLiabilitiesLabels, setNonCurrentSubLiabilitiesLabels] = useState<string[]>(Array(3).fill(""));
  
  const [currentLiabilities, setCurrentLiabilities] = useState<number[]>(Array(12).fill(0));
  const [currentLiabilitiesDate2, setCurrentLiabilitiesDate2] = useState<number[]>(Array(12).fill(0));
  const [currentLiabilitiesLabels, setCurrentLiabilitiesLabels] = useState<string[]>(Array(12).fill(""));
  
  const [currentSubLiabilities, setCurrentSubLiabilities] = useState<number[]>(Array(3).fill(0));
  const [currentSubLiabilitiesDate2, setCurrentSubLiabilitiesDate2] = useState<number[]>(Array(3).fill(0));
  const [currentSubLiabilitiesLabels, setCurrentSubLiabilitiesLabels] = useState<string[]>(Array(3).fill(""));

//   equitySubItems
// nonCurrentSubLiabilities
  
  const handleChange = (
    index: number,
    value: string,
    type: string,
    column: "date1" | "date2" | "label" = "date1"
  ) => {
    if (column === "label") {
      const textValue = value;
      
      if (type === "nonCurrentLabel") {
        const updated = [...nonCurrentLabels];
        updated[index] = textValue;
        setNonCurrentLabels(updated);
      } else if (type === "nonCurrentSubLabel") {
        const updated = [...nonCurrentSubLabels];
        updated[index] = textValue;
        setNonCurrentSubLabels(updated);
      } else if (type === "currentLabel") {
        const updated = [...currentLabels];
        updated[index] = textValue;
        setCurrentLabels(updated);
      } else if (type === "currentSubLabel") {
        const updated = [...currentSubLabels];
        updated[index] = textValue;
        setCurrentSubLabels(updated);
      } else if (type === "equityLabel") {
        const updated = [...equityLabels];
        updated[index] = textValue;
        setEquityLabels(updated);
      } else if (type === "equitySubLabel") {
        const updated = [...equitySubLabels];
        updated[index] = textValue;
        setEquitySubLabels(updated);
      } else if (type === "nonCurrentLiabilityLabel") {
        const updated = [...nonCurrentLiabilitiesLabels];
        updated[index] = textValue;
        setNonCurrentLiabilitiesLabels(updated);
      } else if (type === "nonCurrentSubLiabilityLabel") {
        const updated = [...nonCurrentSubLiabilitiesLabels];
        updated[index] = textValue;
        setNonCurrentSubLiabilitiesLabels(updated);
      } else if (type === "currentLiabilityLabel") {
        const updated = [...currentLiabilitiesLabels];
        updated[index] = textValue;
        setCurrentLiabilitiesLabels(updated);
      } else if (type === "currentSubLiabilityLabel") {
        const updated = [...currentSubLiabilitiesLabels];
        updated[index] = textValue;
        setCurrentSubLiabilitiesLabels(updated);
      }
      
      return;
    }
    
    const numericValue = parseFloat(value) || 0;
    
    if (column === "date1") {
      if (type === "nonCurrent") {
        const updated = [...nonCurrentAssets];
        updated[index] = numericValue;
        setNonCurrentAssets(updated);
      } else if (type === "nonCurrentSub") {
        const updated = [...nonCurrentSubAssets];
        updated[index] = numericValue;
        setNonCurrentSubAssets(updated);
      } else if (type === "current") {
        const updated = [...currentAssets];
        updated[index] = numericValue;
        setCurrentAssets(updated);
      } else if (type === "currentSub") {
        const updated = [...currentSubAssets];
        updated[index] = numericValue;
        setCurrentSubAssets(updated);
      } else if (type === "equity") {
        const updated = [...equityItems];
        updated[index] = numericValue;
        setEquityItems(updated);
      } else if (type === "equitySub") {
        const updated = [...equitySubItems];
        updated[index] = numericValue;
        setEquitySubItems(updated);
      } else if (type === "nonCurrentLiability") {
        const updated = [...nonCurrentLiabilities];
        updated[index] = numericValue;
        setNonCurrentLiabilities(updated);
      } else if (type === "nonCurrentSubLiability") {
        const updated = [...nonCurrentSubLiabilities];
        updated[index] = numericValue;
        setNonCurrentSubLiabilities(updated);
      } else if (type === "currentLiability") {
        const updated = [...currentLiabilities];
        updated[index] = numericValue;
        setCurrentLiabilities(updated);
      } else if (type === "currentSubLiability") {
        const updated = [...currentSubLiabilities];
        updated[index] = numericValue;
        setCurrentSubLiabilities(updated);
      }
    } else if (column === "date2") {
      if (type === "nonCurrent") {
        const updated = [...nonCurrentAssetsDate2];
        updated[index] = numericValue;
        setNonCurrentAssetsDate2(updated);
      } else if (type === "nonCurrentSub") {
        const updated = [...nonCurrentSubAssetsDate2];
        updated[index] = numericValue;
        setNonCurrentSubAssetsDate2(updated);
      } else if (type === "current") {
        const updated = [...currentAssetsDate2];
        updated[index] = numericValue;
        setCurrentAssetsDate2(updated);
      } else if (type === "currentSub") {
        const updated = [...currentSubAssetsDate2];
        updated[index] = numericValue;
        setCurrentSubAssetsDate2(updated);
      } else if (type === "equity") {
        const updated = [...equityItemsDate2];
        updated[index] = numericValue;
        setEquityItemsDate2(updated);
      } else if (type === "equitySub") {
        const updated = [...equitySubItemsDate2];
        updated[index] = numericValue;
        setEquitySubItemsDate2(updated);
      } else if (type === "nonCurrentLiability") {
        const updated = [...nonCurrentLiabilitiesDate2];
        updated[index] = numericValue;
        setNonCurrentLiabilitiesDate2(updated);
      } else if (type === "nonCurrentSubLiability") {
        const updated = [...nonCurrentSubLiabilitiesDate2];
        updated[index] = numericValue;
        setNonCurrentSubLiabilitiesDate2(updated);
      } else if (type === "currentLiability") {
        const updated = [...currentLiabilitiesDate2];
        updated[index] = numericValue;
        setCurrentLiabilitiesDate2(updated);
      } else if (type === "currentSubLiability") {
        const updated = [...currentSubLiabilitiesDate2];
        updated[index] = numericValue;
        setCurrentSubLiabilitiesDate2(updated);
      }
    }
  };

  // Calculate totals for Assets
  const firstTotalNonCurrent = nonCurrentAssets.reduce((sum, val) => sum + val, 0);
  const secondTotalNonCurrent = firstTotalNonCurrent + nonCurrentSubAssets.reduce((sum, val) => sum + val, 0);
  const firstTotalCurrent = currentAssets.reduce((sum, val) => sum + val, 0);
  const secondTotalCurrent = firstTotalCurrent + currentSubAssets.reduce((sum, val) => sum + val, 0);
  const totalAssets = secondTotalNonCurrent + secondTotalCurrent;
  
  // Calculate totals for Date 2
  const firstTotalNonCurrentDate2 = nonCurrentAssetsDate2.reduce((sum, val) => sum + val, 0);
  const secondTotalNonCurrentDate2 = firstTotalNonCurrentDate2 + nonCurrentSubAssetsDate2.reduce((sum, val) => sum + val, 0);
  const firstTotalCurrentDate2 = currentAssetsDate2.reduce((sum, val) => sum + val, 0);
  const secondTotalCurrentDate2 = firstTotalCurrentDate2 + currentSubAssetsDate2.reduce((sum, val) => sum + val, 0);
  const totalAssetsDate2 = secondTotalNonCurrentDate2 + secondTotalCurrentDate2;
  
  // Calculate totals for Equity
  const firstTotalEquity = equityItems.reduce((sum, val) => sum + val, 0);
  const totalEquity = firstTotalEquity + equitySubItems.reduce((sum, val) => sum + val, 0);
  
  const firstTotalEquityDate2 = equityItemsDate2.reduce((sum, val) => sum + val, 0);
  const totalEquityDate2 = firstTotalEquityDate2 + equitySubItemsDate2.reduce((sum, val) => sum + val, 0);
  
  // Calculate totals for Non-Current Liabilities
  const firstTotalNonCurrentLiabilities = nonCurrentLiabilities.reduce((sum, val) => sum + val, 0);
  const totalNonCurrentLiabilities = firstTotalNonCurrentLiabilities + nonCurrentSubLiabilities.reduce((sum, val) => sum + val, 0);
  
  const firstTotalNonCurrentLiabilitiesDate2 = nonCurrentLiabilitiesDate2.reduce((sum, val) => sum + val, 0);
  const totalNonCurrentLiabilitiesDate2 = firstTotalNonCurrentLiabilitiesDate2 + nonCurrentSubLiabilitiesDate2.reduce((sum, val) => sum + val, 0);
  
  // Calculate totals for Current Liabilities
  const firstTotalCurrentLiabilities = currentLiabilities.reduce((sum, val) => sum + val, 0);
  const totalCurrentLiabilities = firstTotalCurrentLiabilities + currentSubLiabilities.reduce((sum, val) => sum + val, 0);
  
  const firstTotalCurrentLiabilitiesDate2 = currentLiabilitiesDate2.reduce((sum, val) => sum + val, 0);
  const totalCurrentLiabilitiesDate2 = firstTotalCurrentLiabilitiesDate2 + currentSubLiabilitiesDate2.reduce((sum, val) => sum + val, 0);
  
  // Calculate Total Liabilities
  const totalLiabilities = totalNonCurrentLiabilities + totalCurrentLiabilities;
  const totalLiabilitiesDate2 = totalNonCurrentLiabilitiesDate2 + totalCurrentLiabilitiesDate2;
  
  // Calculate Total Shareholder's Equity and Liabilities
  const totalEquityAndLiabilities = totalEquity + totalLiabilities;
  const totalEquityAndLiabilitiesDate2 = totalEquityDate2 + totalLiabilitiesDate2;

  return (
    <div className="flex justify-center  my-2 text-black">
      <table className="border border-gray-300 text-xs">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-100 w-96"></th>
            <th className="border border-gray-100 w-16">Notes</th>
            <th className="border border-gray-100 w-28">Date 1</th>
            <th className="border border-gray-100 w-28">Date 2</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-300 font-semibold">
            <td colSpan={4} className="p-1">Assets</td>
          </tr>
          <tr className="bg-gray-200 font-medium">
            <td colSpan={4} className="p-1">Non-current assets</td>
          </tr>
          {nonCurrentAssets.map((val, idx) => (
            <tr key={`non-current-${idx}`} className="bg-gray-100">
              <td className="border border-gray-300">
                <input
                  type="text"
                  className="w-full bg-gray-100 text-black p-1"
                  value={nonCurrentLabels[idx]}
                  placeholder={`${idx + 1}`}
                  onChange={(e) => handleChange(idx, e.target.value, "nonCurrentLabel", "label")}
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="text"
                  className="w-full bg-gray-100 text-black p-1"
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="number"
                  className="w-full bg-gray-100 text-black p-1"
                  value={val}
                  onChange={(e) => handleChange(idx, e.target.value, "nonCurrent")}
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="number"
                  className="w-full bg-gray-100 text-black p-1"
                  value={nonCurrentAssetsDate2[idx]}
                  onChange={(e) => handleChange(idx, e.target.value, "nonCurrent", "date2")}
                />
              </td>
            </tr>
          ))}
          <tr className="bg-gray-200 font-semibold">
            <td className="">(First Total)</td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300">{firstTotalNonCurrent}</td>
            <td className="border border-gray-300">{firstTotalNonCurrentDate2}</td>
          </tr>
          {nonCurrentSubAssets.map((val, idx) => (
            <tr key={`sub-non-${idx}`} className="bg-gray-100">
              <td className="border border-gray-300">
                <input
                  type="text"
                  className="w-full bg-gray-100 text-black p-1"
                  value={nonCurrentSubLabels[idx]}
                  placeholder={`${idx + 1}`}
                  onChange={(e) => handleChange(idx, e.target.value, "nonCurrentSubLabel", "label")}
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="text"
                  className="w-full bg-gray-100 text-black p-1"
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="number"
                  className="w-full bg-gray-100 text-black p-1"
                  value={val}
                  onChange={(e) => handleChange(idx, e.target.value, "nonCurrentSub")}
                /> 
              </td>
              <td className="border border-gray-300">
                <input
                  type="number"
                  className="w-full bg-gray-100 text-black p-1"
                  value={nonCurrentSubAssetsDate2[idx]}
                  onChange={(e) => handleChange(idx, e.target.value, "nonCurrentSub", "date2")}
                /> 
              </td>
            </tr>
          ))}
          <tr className="bg-gray-100 font-semibold">
            <td className="">Total non-current assets </td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300">{secondTotalNonCurrent}</td>
            <td className="border border-gray-300">{secondTotalNonCurrentDate2}</td>
          </tr>

          <tr className="bg-gray-200 font-semibold">
            <td colSpan={4} className="p-2">Current assets</td>
          </tr>
          {currentAssets.map((val, idx) => (
            <tr key={`current-${idx}`} className="bg-gray-100">
              <td className="border border-gray-300">
                <input
                  type="text"
                  className="w-full bg-gray-100 text-black p-1"
                  value={currentLabels[idx]}
                  placeholder={`${idx + 1}`}
                  onChange={(e) => handleChange(idx, e.target.value, "currentLabel", "label")}
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="text"
                  className="w-full bg-gray-100 text-black p-1"
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="number"
                  className="w-full bg-gray-100 text-black p-1"
                  value={val}
                  onChange={(e) => handleChange(idx, e.target.value, "current")}
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="number"
                  className="w-full bg-gray-100 text-black p-1"
                  value={currentAssetsDate2[idx]}
                  onChange={(e) => handleChange(idx, e.target.value, "current", "date2")}
                />
              </td>
            </tr>
          ))}
          <tr className="bg-gray-200 font-semibold">
            <td className="">(First Total)</td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300">{firstTotalCurrent}</td>
            <td className="border border-gray-300">{firstTotalCurrentDate2}</td>
          </tr>
          {currentSubAssets.map((val, idx) => (
            <tr key={`sub-current-${idx}`} className="bg-gray-100">
              <td className="border border-gray-300">
                <input
                  type="text"
                  className="w-full bg-gray-100 text-black p-1"
                  value={currentSubLabels[idx]}
                  placeholder={`${idx + 1}`}
                  onChange={(e) => handleChange(idx, e.target.value, "currentSubLabel", "label")}
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="text"
                  className="w-full bg-gray-100 text-black p-1"
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="number"
                  className="w-full bg-gray-100 text-black p-1"
                  value={val}
                  onChange={(e) => handleChange(idx, e.target.value, "currentSub")}
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="number"
                  className="w-full bg-gray-100 text-black p-1"
                  value={currentSubAssetsDate2[idx]}
                  onChange={(e) => handleChange(idx, e.target.value, "currentSub", "date2")}
                />
              </td>
            </tr>
          ))}
          <tr className="bg-gray-200 font-semibold">
            <td className="">Total current assets </td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300">{secondTotalCurrent}</td>
            <td className="border border-gray-300">{secondTotalCurrentDate2}</td>
          </tr>

          <tr className="bg-gray-400 font-bold">
            <td className="">Total assets </td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300">{totalAssets}</td>
            <td className="border border-gray-300">{totalAssetsDate2}</td>
          </tr>
        </tbody>

        <tbody className="">
          <tr className="bg-gray-300 font-semibold">
            <td colSpan={4} className="p-1">Shareholder's equity and liabilities</td>
          </tr>
          <tr className="bg-gray-200 font-medium">
            <td colSpan={4} className="p-1">Shareholder's equity</td>
          </tr>
          {equityItems.map((val, idx) => (
            <tr key={`equity-${idx}`} className="bg-gray-100">
              <td className="border border-gray-300">
                <input
                  type="text"
                  className="w-full bg-gray-100 text-black p-1"
                  value={equityLabels[idx]}
                  placeholder={`${idx + 1}`}
                  onChange={(e) => handleChange(idx, e.target.value, "equityLabel", "label")}
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="text"
                  className="w-full bg-gray-100 text-black p-1"
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="number"
                  className="w-full bg-gray-100 text-black p-1"
                  value={val}
                  onChange={(e) => handleChange(idx, e.target.value, "equity")}
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="number"
                  className="w-full bg-gray-100 text-black p-1"
                  value={equityItemsDate2[idx]}
                  onChange={(e) => handleChange(idx, e.target.value, "equity", "date2")}
                />
              </td>
            </tr>
          ))}
          <tr className="bg-gray-200 font-semibold">
            <td className="">(First Total)</td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300">{firstTotalEquity}</td>
            <td className="border border-gray-300">{firstTotalEquityDate2}</td>
          </tr>
          {equitySubItems.map((val, idx) => (
            <tr key={`sub-equity-${idx}`} className="bg-gray-100">
              <td className="border border-gray-300">
                <h1></h1>
                <input
                  type="text"
                  className="w-full bg-gray-100 text-black p-1"
                  value={equitySubLabels[idx]}
                  placeholder={`${idx + 1}`}
                  onChange={(e) => handleChange(idx, e.target.value, "equitySubLabel", "label")}
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="text"
                  className="w-full bg-gray-100 text-black p-1"
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="number"
                  className="w-full bg-gray-100 text-black p-1"
                  value={val}
                  onChange={(e) => handleChange(idx, e.target.value, "equitySub")}
                /> 
              </td>
              <td className="border border-gray-300">
                <input
                  type="number"
                  className="w-full bg-gray-100 text-black p-1"
                  value={equitySubItemsDate2[idx]}
                  onChange={(e) => handleChange(idx, e.target.value, "equitySub", "date2")}
                /> 
              </td>
            </tr>
          ))}
          <tr className="bg-gray-100 font-bold">
            <td className="">Total shareholder's equity</td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300">{totalEquity}</td>
            <td className="border border-gray-300">{totalEquityDate2}</td>
          </tr>

          <tr className="bg-gray-200 font-semibold">
            <td colSpan={4} className="">Non-current liabilities</td>
          </tr>
          {nonCurrentLiabilities.map((val, idx) => (
            <tr key={`non-current-liability-${idx}`} className="bg-gray-100">
              <td className="border border-gray-300">
                <input
                  type="text"
                  className="w-full bg-gray-100 text-black p-1"
                  value={nonCurrentLiabilitiesLabels[idx]}
                  placeholder={`${idx + 1}`}
                  onChange={(e) => handleChange(idx, e.target.value, "nonCurrentLiabilityLabel", "label")}
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="text"
                  className="w-full bg-gray-100 text-black p-1"
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="number"
                  className="w-full bg-gray-100 text-black p-1"
                  value={val}
                  onChange={(e) => handleChange(idx, e.target.value, "nonCurrentLiability")}
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="number"
                  className="w-full bg-gray-100 text-black p-1"
                  value={nonCurrentLiabilitiesDate2[idx]}
                  onChange={(e) => handleChange(idx, e.target.value, "nonCurrentLiability", "date2")}
                />
              </td>
            </tr>
          ))}
          <tr className="bg-gray-200 font-semibold">
            <td className="">(First Total)</td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300">{firstTotalNonCurrentLiabilities}</td>
            <td className="border border-gray-300">{firstTotalNonCurrentLiabilitiesDate2}</td>
          </tr>
 
          {nonCurrentSubLiabilities.map((val, idx) => (
            <tr key={`sub-non-current-liability-${idx}`} className="bg-gray-100">
              <td className="border border-gray-300">
                <input
                  type="text"
                  className="w-full bg-gray-100 text-black p-1"
                  value={nonCurrentSubLiabilitiesLabels[idx]}
                  placeholder={`${idx + 1}`}
                  onChange={(e) => handleChange(idx, e.target.value, "nonCurrentSubLiabilityLabel", "label")}
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="text"
                  className="w-full bg-gray-100 text-black p-1"
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="number"
                  className="w-full bg-gray-100 text-black p-1"
                  value={val}
                  onChange={(e) => handleChange(idx, e.target.value, "nonCurrentSubLiability")}
                />
              </td>
              <td className="border border-gray-300">
                <input
                  type="number"
                  className="w-full bg-gray-100 text-black p-1"
                  value={nonCurrentSubLiabilitiesDate2[idx]}
                  onChange={(e) => handleChange(idx, e.target.value, "nonCurrentSubLiability", "date2")}
                />
              </td>
            </tr>
          ))}


















          <tr className="bg-gray-200 font-semibold">
            <td className="">Total non-current liabilities new</td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300">{totalNonCurrentLiabilities}</td> 
            <td className="border border-gray-300 ">{totalNonCurrentLiabilitiesDate2}</td>
          </tr>
          {/* /kfdf */}











          <tr className="bg-gray-200 font-semibold">
  <td colSpan={4} className="">Current liabilities</td>
</tr>
{currentLiabilities.map((val, idx) => (
  <tr key={`current-liability-${idx}`} className="bg-gray-100">
    <td className="border border-gray-300">
      <input
        type="text"
        className="w-full bg-gray-100 text-black p-1"
        value={currentLiabilitiesLabels[idx]}
        placeholder={`${idx + 1}`}
        onChange={(e) => handleChange(idx, e.target.value, "currentLiabilityLabel", "label")}
      />
    </td>
    <td className="border border-gray-300">
      <input
        type="text"
        className="w-full bg-gray-100 text-black p-1"
      />
    </td>
    <td className="border border-gray-300">
      <input
        type="number"
        className="w-full bg-gray-100 text-black p-1"
        value={val}
        onChange={(e) => handleChange(idx, e.target.value, "currentLiability")}
      />
    </td>
    <td className="border border-gray-300">
      <input
        type="number"
        className="w-full bg-gray-100 text-black p-1"
        value={currentLiabilitiesDate2[idx]}
        onChange={(e) => handleChange(idx, e.target.value, "currentLiability", "date2")}
      />
    </td>
  </tr>
))}
<tr className="bg-gray-200 font-semibold">
  <td className="">(First Total)</td>
  <td className="border border-gray-300"></td>
  <td className="border border-gray-300">{firstTotalCurrentLiabilities}</td>
  <td className="border border-gray-300">{firstTotalCurrentLiabilitiesDate2}</td>
</tr>
{currentSubLiabilities.map((val, idx) => (
  <tr key={`sub-current-liability-${idx}`} className="bg-gray-100">
    <td className="border border-gray-300">
      <input
        type="text"
        className="w-full bg-gray-100 text-black p-1"
        value={currentSubLiabilitiesLabels[idx]}
        placeholder={`${idx + 1}`}
        onChange={(e) => handleChange(idx, e.target.value, "currentSubLiabilityLabel", "label")}
      />
    </td>
    <td className="border border-gray-300">
      <input
        type="text"
        className="w-full bg-gray-100 text-black p-1"
      />
    </td>
    <td className="border border-gray-300">
      <input
        type="number"
        className="w-full bg-gray-100 text-black p-1"
        value={val}
        onChange={(e) => handleChange(idx, e.target.value, "currentSubLiability")}
      />
    </td>
    <td className="border border-gray-300">
      <input
        type="number"
        className="w-full bg-gray-100 text-black p-1"
        value={currentSubLiabilitiesDate2[idx]}
        onChange={(e) => handleChange(idx, e.target.value, "currentSubLiability", "date2")}
      />
    </td>
  </tr>
))}
<tr className="bg-gray-200 font-semibold">
  <td className="">Total current liabilities</td>
  <td className="border border-gray-300"></td>
  <td className="border border-gray-300">{totalCurrentLiabilities}</td>
  <td className="border border-gray-300">{totalCurrentLiabilitiesDate2}</td>
</tr>
<tr className="bg-gray-200 font-bold">
  <td className="">Total liabilities</td>
  <td className="border border-gray-300"></td>
  <td className="border border-gray-300">{totalLiabilities}</td>
  <td className="border border-gray-300">{totalLiabilitiesDate2}</td>
</tr>

<tr className="bg-gray-300 font-bold">
  <td className="">Total shareholder's equity and liabilities</td>
  <td className="border border-gray-300"></td>
  <td className="border border-gray-300">{totalEquityAndLiabilities}</td>
  <td className="border border-gray-300">{totalEquityAndLiabilitiesDate2}</td>
</tr>









        </tbody>
      </table>
    </div>
  );
};

export default AssetForm;
