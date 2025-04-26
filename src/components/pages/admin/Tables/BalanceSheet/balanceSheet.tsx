/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
// import { IBalanceSheetData } from "./interface";

import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../reduxKit/store";
type BalaceSheetFormArProps = {
  TakingShort: boolean;
};

const BalaceSheetForm:React.FC<BalaceSheetFormArProps> = React.memo(({ TakingShort }) => {
  // Updated state declarations with empty strings as initial values

  const [nonCurrentAssetsAr, setNonCurrentAssets] = useState<string[]>( 
    Array(12).fill("")
  );
  const [nonCurrentNotes, setNonCurrentNotes] = useState<string[]>(
      Array(12).fill("")
    );
    const [nonCurrentAssetsDate2Ar, setNonCurrentAssetsDate2] = useState<string[]>(
      Array(12).fill("")
    );
    const [nonCurrentSubAssetsDate2Ar, setNonCurrentSubAssetsDate2] = useState<
      string[]
    >(Array(3).fill(""));

  const [nonCurrentSubAssetsAr, setNonCurrentSubAssets] = useState<string[]>(
    Array(3).fill("")
  );







  const [currentAssetsAr, setCurrentAssets] = useState<string[]>(
    Array(12).fill("")
  );
  const [currentSubAssetsAr, setCurrentSubAssets] = useState<string[]>(
    Array(3).fill("")
  );


  const [currentAssetsDate2Ar, setCurrentAssetsDate2] = useState<string[]>(
    Array(12).fill("")
  );
  const [currentSubAssetsDate2Ar, setCurrentSubAssetsDate2] = useState<string[]>(
    Array(3).fill("")
  );


  // Labels remain as strings
  const [nonCurrentLabelsAr, setNonCurrentLabels] = useState<string[]>(
    Array(12).fill("")
  );
  const [nonCurrentSubLabelsAr, setNonCurrentSubLabels] = useState<string[]>(
    Array(3).fill("")
  );
  const [currentLabelsAr, setCurrentLabels] = useState<string[]>(
    Array(12).fill("")
  );
  const [currentSubLabelsAr, setCurrentSubLabels] = useState<string[]>(
    Array(3).fill("")
  );

  // States for equity and liabilities with empty strings
  const [equityItemsAr, setEquityItems] = useState<string[]>(Array(12).fill(""));
  const [equityItemsDate2Ar, setEquityItemsDate2] = useState<string[]>(
    Array(12).fill("")
  );
  const [equityLabelsAr, setEquityLabels] = useState<string[]>(
    Array(12).fill("")
  );

  const [equitySubItemsAr, setEquitySubItems] = useState<string[]>(
    Array(3).fill("")
  );
  const [equitySubItemsDate2Ar, setEquitySubItemsDate2] = useState<string[]>(
    Array(3).fill("")
  );
  const [equitySubLabelsAr, setEquitySubLabels] = useState<string[]>(
    Array(3).fill("")
  );

  const [nonCurrentLiabilitiesAr, setNonCurrentLiabilities] = useState<string[]>(
    Array(12).fill("")
  );
  const [nonCurrentLiabilitiesDate2Ar, setNonCurrentLiabilitiesDate2] = useState<
    string[]
  >(Array(12).fill(""));
  const [nonCurrentLiabilitiesLabelsAr, setNonCurrentLiabilitiesLabels] =
    useState<string[]>(Array(12).fill(""));

  const [nonCurrentSubLiabilitiesAr, setNonCurrentSubLiabilities] = useState<
    string[]
  >(Array(3).fill(""));
  const [nonCurrentSubLiabilitiesDate2Ar, setNonCurrentSubLiabilitiesDate2] =
    useState<string[]>(Array(3).fill(""));
  const [nonCurrentSubLiabilitiesLabelsAr, setNonCurrentSubLiabilitiesLabels] =
    useState<string[]>(Array(3).fill(""));
  const [currentLiabilitiesAr, setCurrentLiabilities] = useState<string[]>(
    Array(12).fill("")
  );
  const [currentLiabilitiesDate2Ar, setCurrentLiabilitiesDate2] = useState<
    string[]
  >(Array(12).fill(""));
  const [currentLiabilitiesLabelsAr, setCurrentLiabilitiesLabels] = useState<
    string[]
  >(Array(12).fill(""));

  const [currentSubLiabilitiesAr, setCurrentSubLiabilities] = useState<string[]>(
    Array(3).fill("")
  );
  const [currentSubLiabilitiesDate2Ar, setCurrentSubLiabilitiesDate2] = useState<
    string[]
  >(Array(3).fill(""));
  const [currentSubLiabilitiesLabelsAr, setCurrentSubLiabilitiesLabels] =
    useState<string[]>(Array(3).fill(""));

  // Updated handleChange function to work with string values
  const handleChange = (
    index: number,
    value: string,
    type: string,
    column: "date1" | "date2" | "label"|  "note" = "date1"
  ) => {
    if (column === "label") {
      if (type === "nonCurrentLabel") {
        const updated = [...nonCurrentLabelsAr];
        updated[index] = value;
        setNonCurrentLabels(updated);
      } else if (type === "nonCurrentSubLabel") {
        const updated = [...nonCurrentSubLabelsAr];
        updated[index] = value;
        setNonCurrentSubLabels(updated);
      } else if (type === "currentLabel") {
        const updated = [...currentLabelsAr];
        updated[index] = value;
        setCurrentLabels(updated);
      } else if (type === "currentSubLabel") {
        const updated = [...currentSubLabelsAr];
        updated[index] = value;
        setCurrentSubLabels(updated);
      } else if (type === "equityLabel") {
        const updated = [...equityLabelsAr];
        updated[index] = value;
        setEquityLabels(updated);
      } else if (type === "equitySubLabel") {
        const updated = [...equitySubLabelsAr];
        updated[index] = value;
        setEquitySubLabels(updated);
      } else if (type === "nonCurrentLiabilityLabel") {
        const updated = [...nonCurrentLiabilitiesLabelsAr];
        updated[index] = value;
        setNonCurrentLiabilitiesLabels(updated);
      } else if (type === "nonCurrentSubLiabilityLabel") {
        const updated = [...nonCurrentSubLiabilitiesLabelsAr];
        updated[index] = value;
        setNonCurrentSubLiabilitiesLabels(updated);
      } else if (type === "currentLiabilityLabel") {
        const updated = [...currentLiabilitiesLabelsAr];
        updated[index] = value;
        setCurrentLiabilitiesLabels(updated);
      } else if (type === "currentSubLiabilityLabel") {
        const updated = [...currentSubLiabilitiesLabelsAr];
        updated[index] = value;
        setCurrentSubLiabilitiesLabels(updated);
      }
      return;
    }

    // For numeric fields, we store as strings but validate numeric input
    if (column === "date1") {
      if (type === "nonCurrent") {
        const updated = [...nonCurrentAssetsAr]
        updated[index] = value;
        setNonCurrentAssets(updated);
      } else if (type === "nonCurrentSub") {
        const updated = [...nonCurrentSubAssetsAr];
        updated[index] = value;
        setNonCurrentSubAssets(updated);
      } else if (type === "current") {
        const updated = [...currentAssetsAr];
        updated[index] = value;
        setCurrentAssets(updated);
      } else if (type === "currentSub") {
        const updated = [...currentSubAssetsAr];
        updated[index] = value;
        setCurrentSubAssets(updated);
      } else if (type === "equity") {
        const updated = [...equityItemsAr];
        updated[index] = value;
        setEquityItems(updated);
      } else if (type === "equitySub") {
        const updated = [...equitySubItemsAr];
        updated[index] = value;
        setEquitySubItems(updated);
      } else if (type === "nonCurrentLiability") {
        const updated = [...nonCurrentLiabilitiesAr];
        updated[index] = value;
        setNonCurrentLiabilities(updated);
      } else if (type === "nonCurrentSubLiability") {
        const updated = [...nonCurrentSubLiabilitiesAr];
        updated[index] = value;
        setNonCurrentSubLiabilities(updated);
      } else if (type === "currentLiability") {
        const updated = [...currentLiabilitiesAr];
        updated[index] = value;
        setCurrentLiabilities(updated);
      } else if (type === "currentSubLiability") {
        const updated = [...currentSubLiabilitiesAr];
        updated[index] = value;
        setCurrentSubLiabilities(updated);
      }
    } else if (column === "date2") {
      if (type === "nonCurrent") {
        const updated = [...nonCurrentAssetsDate2Ar];
        updated[index] = value;
        setNonCurrentAssetsDate2(updated);
      } else if (type === "nonCurrentSub") {
        const updated = [...nonCurrentSubAssetsDate2Ar];
        updated[index] = value;
        setNonCurrentSubAssetsDate2(updated);
      } else if (type === "current") {
        const updated = [...currentAssetsDate2Ar];
        updated[index] = value;
        setCurrentAssetsDate2(updated);
      } else if (type === "currentSub") {
        const updated = [...currentSubAssetsDate2Ar];
        updated[index] = value;
        setCurrentSubAssetsDate2(updated);
      } else if (type === "equity") {
        const updated = [...equityItemsDate2Ar];
        updated[index] = value;
        setEquityItemsDate2(updated);
      } else if (type === "equitySub") {
        const updated = [...equitySubItemsDate2Ar];
        updated[index] = value;
        setEquitySubItemsDate2(updated);
      } else if (type === "nonCurrentLiability") {
        const updated = [...nonCurrentLiabilitiesDate2Ar];
        updated[index] = value;
        setNonCurrentLiabilitiesDate2(updated);
      } else if (type === "nonCurrentSubLiability") {
        const updated = [...nonCurrentSubLiabilitiesDate2Ar];
        updated[index] = value;
        setNonCurrentSubLiabilitiesDate2(updated);
      } else if (type === "currentLiability") {
        const updated = [...currentLiabilitiesDate2Ar];
        updated[index] = value;
        setCurrentLiabilitiesDate2(updated);
      } else if (type === "currentSubLiability") {
        const updated = [...currentSubLiabilitiesDate2Ar];
        updated[index] = value;
        setCurrentSubLiabilitiesDate2(updated);
      }
    }else if (column === "note") {
      if (type === "nonCurrentNote") {
        const updated = [...nonCurrentNotes];
        updated[index] = value;
        setNonCurrentNotes(updated);
      }
      // add other types of notes here if needed (e.g., nonCurrentSubNote, currentNote, etc.)
    }
  };

  // Helper function to safely parse numeric values from strings
  const parseNumericValue = (value: string): number => {
    if (value === "") return 0;
    const numValue = parseFloat(value);
    return isNaN(numValue) ? 0 : numValue;
  };

  // Helper function to sum array of string values
  const sumStringValues = (values: string[]): number => {
    return values.reduce((sum, val) => sum + parseNumericValue(val), 0);
  };

  // Calculate totals for Assets
  const firstTotalNonCurrent = sumStringValues(nonCurrentAssetsAr);
  const secondTotalNonCurrent =
    firstTotalNonCurrent + sumStringValues(nonCurrentSubAssetsAr);
  const firstTotalCurrent = sumStringValues(currentAssetsAr);
  const secondTotalCurrent =
    firstTotalCurrent + sumStringValues(currentSubAssetsAr);
  const totalAssets = secondTotalNonCurrent + secondTotalCurrent;

  // Calculate totals for Date 2
  const firstTotalNonCurrentDate2 = sumStringValues(nonCurrentAssetsDate2Ar);
  const secondTotalNonCurrentDate2 =
    firstTotalNonCurrentDate2 + sumStringValues(nonCurrentSubAssetsDate2Ar);
  const firstTotalCurrentDate2 = sumStringValues(currentAssetsDate2Ar);
  const secondTotalCurrentDate2 =
    firstTotalCurrentDate2 + sumStringValues(currentSubAssetsDate2Ar);
  const totalAssetsDate2 = secondTotalNonCurrentDate2 + secondTotalCurrentDate2;

  // Calculate totals for Equity
  const firstTotalEquity = sumStringValues(equityItemsAr);
  const totalEquity = firstTotalEquity + sumStringValues(equitySubItemsAr);

  const firstTotalEquityDate2 = sumStringValues(equityItemsDate2Ar);
  const totalEquityDate2 =
    firstTotalEquityDate2 + sumStringValues(equitySubItemsDate2Ar);

  // Calculate totals for Non-Current Liabilities
  const firstTotalNonCurrentLiabilities = sumStringValues(
    nonCurrentLiabilitiesAr
  );
  const totalNonCurrentLiabilities =
    firstTotalNonCurrentLiabilities + sumStringValues(nonCurrentSubLiabilitiesAr);

  const firstTotalNonCurrentLiabilitiesDate2 = sumStringValues(
    nonCurrentLiabilitiesDate2Ar
  );
  const totalNonCurrentLiabilitiesDate2 =
    firstTotalNonCurrentLiabilitiesDate2 +
    sumStringValues(nonCurrentSubLiabilitiesDate2Ar);

  // Calculate totals for Current Liabilities
  const firstTotalCurrentLiabilities = sumStringValues(currentLiabilitiesAr);
  const totalCurrentLiabilities =
    firstTotalCurrentLiabilities + sumStringValues(currentSubLiabilitiesAr);

  const firstTotalCurrentLiabilitiesDate2 = sumStringValues(
    currentLiabilitiesDate2Ar
  );
  const totalCurrentLiabilitiesDate2 =
    firstTotalCurrentLiabilitiesDate2 +
    sumStringValues(currentSubLiabilitiesDate2Ar);

  // Calculate Total Liabilities
  const totalLiabilities = totalNonCurrentLiabilities + totalCurrentLiabilities;
  const totalLiabilitiesDate2 =
    totalNonCurrentLiabilitiesDate2 + totalCurrentLiabilitiesDate2;

  // Calculate Total Shareholder's Equity and Liabilities
  const totalEquityAndLiabilities = totalEquity + totalLiabilities;
  const totalEquityAndLiabilitiesDate2 =
    totalEquityDate2 + totalLiabilitiesDate2;




    const hasNonEmptyNonCurrentSubAssets = nonCurrentSubAssetsAr.some(
      (val, idx) => val || nonCurrentSubAssetsDate2Ar[idx]
    );
    const hasNonEmptyCurrentSubAssets = currentSubAssetsAr.some(
      (val, idx) => val || currentSubAssetsDate2Ar[idx]
    );
    
    const hasNonEmptyEquitySubItems = equitySubItemsAr.some(
      (val, idx) => val || equitySubItemsDate2Ar[idx]
    );
    const hasNonEmptyNonCurrentSubLiabilities = nonCurrentSubLiabilitiesAr.some(
      (val, idx) => val || nonCurrentSubLiabilitiesDate2Ar[idx]
    );
    const hasNonEmptyCurrentSubLiabilities = currentSubLiabilitiesAr.some(
      (val, idx) => val || currentSubLiabilitiesDate2Ar[idx]
    );
    






  const [date1, setDate1] = useState("(Unaudited)");
  const [date2, setDate2] = useState("(Audited)");

  const [sassets, setAssets] = useState("Assets");
  const [snonCurrentAssets, ssetnonCurrentAssets] = useState("Non-current Assets");
  const [stotalNonCurrentAssets, ssetTotalNonCurrentAssets] = useState( "Total non-current Assets");

  const [scurrentAssets, ssetCurrentAssets] = useState("Current Assets");
  const [stotalCurrentAssets, ssetTotalCurrentAssets] = useState(
    "Total Current Assets"
  );
  const [stotalAssets, ssetTotalAssets] = useState("Total Assets");

  const [
    sShareholdersEquityandliabilitiess,
    setShareholdersEquityandliabilities,
  ] = useState("Shareholder's Equity and Liabilities");
  const [sShareholdersEquity, setShareholdersEquity] = useState(
    "Shareholder's Equity"
  );
  const [stotalShareholdersEquity, setTotalShareholdersEquity] = useState(
    "Total Shareholder's Equity"
  );

  const [sNoncurrentliabilities, setNoncurrentliabilities] = useState(
    "Non-current Liabilities"
  );
  const [stotalNoncurrentliabilities, setTotalNoncurrentliabilities] = useState(
    "Total non-current Liabilities"
  );

  const [scurrentliabilities, setcurrentliabilities] = useState(
    "Current Liabilities"
  );
  const [stotalcurrentliabilities, setTotalcurrentliabilities] = useState(
    "Total Current Liabilities"
  );
  const [stotalliabilities, setTotalliabilities] =
    useState("Total  Liabilities");
  const [stotalEquityAndLiabilities, settotalEquityAndLiabilities] = useState(
    "Total shareholder's equity and Liabilities"
  );




  // const [importedData, setImportedData] = useState<IBalanceSheetData | null>(
  //   null
  // );

  const { data } = useSelector((state: RootState) => state.table);

  useEffect(() => {
    if (data) {
      if (data.assets?.nonCurrent) {
        setNonCurrentAssets(data.assets.nonCurrent.items || Array(12).fill(""));
        setNonCurrentSubAssets(
          data.assets.nonCurrent.subItems || Array(3).fill("")
        );
        setNonCurrentNotes(data.assets.nonCurrent.nonCurrentNotes)
        setNonCurrentLabels( Array(12).fill("")
        );
        setNonCurrentSubLabels(
          Array(3).fill("")
        );
        setNonCurrentAssetsDate2(
          data.assets.nonCurrent.itemsDate2 || Array(12).fill("")
        );
        setNonCurrentSubAssetsDate2(
          data.assets.nonCurrent.subItemsDate2 || Array(3).fill("")
        );
      }

      // Assets - Current
      if (data.assets?.current) {
        setCurrentAssets(data.assets.current.items || Array(12).fill(""));
        setCurrentSubAssets(data.assets.current.subItems || Array(3).fill(""));
        setCurrentLabels( Array(12).fill(""));
        setCurrentSubLabels( Array(3).fill(""));
        setCurrentAssetsDate2(
          data.assets.current.itemsDate2 || Array(12).fill("")
        );
        setCurrentSubAssetsDate2(
          data.assets.current.subItemsDate2 || Array(3).fill("")
        );
      }

      // Equity
      if (data.equity) {
        setEquityItems(data.equity.items || Array(12).fill(""));
        setEquitySubItems(data.equity.subItems || Array(3).fill(""));
        setEquityLabels( Array(12).fill(""));
        setEquitySubLabels( Array(3).fill(""));
        setEquityItemsDate2(data.equity.itemsDate2 || Array(12).fill(""));
        setEquitySubItemsDate2(data.equity.subItemsDate2 || Array(3).fill(""));
      }

      // Liabilities - Non-Current
      if (data.liabilities?.nonCurrent) {
        setNonCurrentLiabilities(
          data.liabilities.nonCurrent.items || Array(12).fill("")
        );
        setNonCurrentSubLiabilities(
          data.liabilities.nonCurrent.subItems || Array(3).fill("")
        );
        setNonCurrentLiabilitiesLabels(
          Array(12).fill("")
        );
        setNonCurrentSubLiabilitiesLabels(
          Array(3).fill("")
        );
        setNonCurrentLiabilitiesDate2(
          data.liabilities.nonCurrent.itemsDate2 || Array(12).fill("")
        );
        setNonCurrentSubLiabilitiesDate2(
          data.liabilities.nonCurrent.subItemsDate2 || Array(3).fill("")
        );
      }

      // Liabilities - Current
      if (data.liabilities?.current) {
        setCurrentLiabilities(
          data.liabilities.current.items || Array(12).fill("")
        );
        setCurrentSubLiabilities(
          data.liabilities.current.subItems || Array(3).fill("")
        );
        setCurrentLiabilitiesLabels(
          Array(12).fill("")
        );
        setCurrentSubLiabilitiesLabels(
           Array(3).fill("")
        );
        setCurrentLiabilitiesDate2(
          data.liabilities.current.itemsDate2 || Array(12).fill("")
        );
        setCurrentSubLiabilitiesDate2(
          data.liabilities.current.subItemsDate2 || Array(3).fill("")
        );
      }
    }
  }, [data]);

  // const { assets, equity, liabilities, ItotalEquityAndLiabilitiesDate2, ItotalEquityAndLiabilities } = data
  return (
    <div className="flex justify-start  my-2 text-black">
      <table className="border border-gray-300 text-xs mb-12  ">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-100 w-96"></th>
            <th className="border border-gray-100 w-16">Notes</th>
            <th className="border border-gray-100 p-1 w-28">
              <input
                placeholder="Date 1"
                className="w-full text-center bg-gray-100 fext-row"
                type="date"
              />
              <input
                placeholder=""
                value={date1}
                onChange={(e) => setDate1(e.target.value)}
                className="w-full text-center bg-gray-100 fext-row"
                type="text"
              />
            </th>
            <th className="border  border-gray-100 w-28">
              <input
                placeholder="Date 2"
                className="w-full text-center bg-gray-100 fext-row"
                type="date"
              />
              <input
                placeholder=""
                value={date2}
                onChange={(e) => setDate2(e.target.value)}
                className="w-full text-center bg-gray-100 fext-row"
                type="text"
              />
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="bg-gray-300 font-semibold">
            <td colSpan={4} className="p-1">
              <input
                placeholder=""
                value={sassets}
                onChange={(e) => setAssets(e.target.value)}
                className=" text-start  bg-gray-300 fext-row"
                type="text"
              />
            </td>
          </tr>
          <br />

          <tr className="bg-gray-200 font-medium">
            <td colSpan={4} className="p-1">
              <input
                placeholder=""
                value={snonCurrentAssets}
                onChange={(e) => ssetnonCurrentAssets(e.target.value)}
                className=" text-start  bg-gray-200 fext-row"
                type="text"
              />
            </td>
          </tr>







          


          {nonCurrentAssetsAr.map((val, idx) => {
              const isRowEmpty = !val && !nonCurrentAssetsDate2Ar[idx];

              // 🧠 Only hide the row *after* submission if it's empty
              if (TakingShort && isRowEmpty) return null;

              return (
                <tr key={`non-current-${idx}`} className="bg-gray-100">
                  <td className="border border-gray-300">
                    <input
                      type="text"
                      className="w-full bg-gray-100 text-black p-1"
                      value={nonCurrentLabelsAr[idx]}
                      placeholder={`${idx + 1}`}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "nonCurrentLabel",
                          "label"
                        )
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                  <td className="border ">
                    <input
                      type="text"
                      className="w-full bg-gray-100 text-black p-1"
                      value={nonCurrentNotes[idx]}
                   
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "nonCurrentNote",
                          "note"
                        )
                      }
                    />
                  </td>

                  </td>
                  <td className="border border-gray-300">
                    <input
                      type="number"
                      className="w-full bg-gray-100 text-black p-1"
                      value={val}
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "nonCurrent")
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
                      type="number"
                      className="w-full bg-gray-100 text-black p-1"
                      value={nonCurrentAssetsDate2Ar[idx]}
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "nonCurrent", "date2")
                      }
                    />
                  </td>
                </tr>
              );
            })}



{hasNonEmptyNonCurrentSubAssets && (
              <tr className="bg-gray-200 font-semibold">
                <td className="">
                  <input
                    className="w-full bg-gray-100 text-black p-1"
                    type="text"
                  />
                </td>
                <td className="border border-gray-300"></td>
                <td className="border border-gray-300">
                  {firstTotalNonCurrent}
                </td>
                <td className="border border-gray-300">
                  {firstTotalNonCurrentDate2}
                </td>
              </tr>
            )}


{nonCurrentSubAssetsAr.map((val, idx) => {
              const isRowEmpty = !val && ! nonCurrentSubAssetsDate2Ar[idx];

              if (TakingShort && isRowEmpty) return null;

              return (
                <tr key={`sub-non-${idx}`} className="bg-gray-100">
                  <td className="border border-gray-300">
                    <input
                      type="text"
                      className="w-full bg-gray-100 text-black p-1"
                      value={nonCurrentSubLabelsAr[idx]}
                      placeholder={`${idx + 1}`}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "nonCurrentSubLabel",
                          "label"
                        )
                      }
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
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "nonCurrentSub")
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
                      type="number"
                      className="w-full bg-gray-100 text-black p-1"
                      value={nonCurrentSubAssetsDate2Ar[idx]}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "nonCurrentSub",
                          "date2"
                        )
                      }
                    />
                  </td>
                </tr>
              );
            })}



          <tr className="bg-gray-100  font-semibold">
            <td className=" ">
              {" "}
              <input
                placeholder=""
                value={stotalNonCurrentAssets}
                onChange={(e) => ssetTotalNonCurrentAssets(e.target.value)}
                className=" text-start  bg-gray-100 fext-row"
                type="text"
              />
            </td>
            <td className="border   border-gray-300"></td>
            <td className="border  p-1 border-gray-300">
              {secondTotalNonCurrent}
            </td>
            <td className="border  border-gray-300">
              {secondTotalNonCurrentDate2}
            </td>
          </tr>
          <br />

          <tr className="bg-gray-200 font-semibold">
            <td colSpan={4} className="p-2">
              <input
                placeholder=""
                value={scurrentAssets}
                onChange={(e) => ssetCurrentAssets(e.target.value)}
                className=" text-start   bg-gray-200 fext-row"
                type="text"
              />
            </td>
          </tr>

       {currentAssetsAr.map((val, idx) => {
              const isRowEmpty = !val && !currentAssetsDate2Ar[idx];

              if (TakingShort && isRowEmpty) return null;

              return (
                <tr key={`current-${idx}`} className="bg-gray-100">
                  <td className="border border-gray-300">
                    <input
                      type="text"
                      className="w-full bg-gray-100 text-black p-1"
                      value={currentLabelsAr[idx]}
                      placeholder={`${idx + 1}`}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "currentLabel",
                          "label"
                        )
                      }
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
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "current")
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
                      type="number"
                      className="w-full bg-gray-100 text-black p-1"
                      value={currentAssetsDate2Ar[idx]}
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "current", "date2")
                      }
                    />
                  </td>
                </tr>
              );
            })}



{hasNonEmptyCurrentSubAssets && (
              <tr className="bg-gray-200 font-semibold">
                <td className="">
                  <input
                    className="w-full bg-gray-100 text-black p-1"
                    type="text"
                  />
                </td>
                <td className="border border-gray-300"></td>
                <td className="border border-gray-300">{firstTotalCurrent}</td>
                <td className="border border-gray-300">
                  {firstTotalCurrentDate2}
                </td>
              </tr>
            )}



            
{currentSubAssetsAr.map((val, idx) => {
              const isRowEmpty = !val && !currentSubAssetsDate2Ar[idx];

              if (TakingShort && isRowEmpty) return null;

              return (
                <tr key={`sub-current-${idx}`} className="bg-gray-100">
                  <td className="border border-gray-300">
                    <input
                      type="text"
                      className="w-full bg-gray-100 text-black p-1"
                      value={currentSubLabelsAr[idx]}
                      placeholder={`${idx + 1}`}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "currentSubLabel",
                          "label"
                        )
                      }
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
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "currentSub")
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
                      type="number"
                      className="w-full bg-gray-100 text-black p-1"
                      value={currentSubAssetsDate2Ar[idx]}
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "currentSub", "date2")
                      }
                    />
                  </td>
                </tr>
              );
            })}



          <tr className="bg-gray-200 font-semibold">
            <td className="">
              {" "}
              <input
                placeholder=""
                value={stotalCurrentAssets}
                onChange={(e) => ssetTotalCurrentAssets(e.target.value)}
                className=" text-start  bg-gray-200 fext-row"
                type="text"
              />
            </td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300">{secondTotalCurrent}</td>
            <td className="border border-gray-300">
              {secondTotalCurrentDate2}
            </td>
          </tr>

          <tr className="bg-gray-400 font-bold">
            <td className="">
              {" "}
              <input
                placeholder=""
                value={stotalAssets}
                onChange={(e) => ssetTotalAssets(e.target.value)}
                className=" text-start  bg-gray-400 fext-row"
                type="text"
              />{" "}
            </td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300">{totalAssets}</td>
            <td className="border border-gray-300">{totalAssetsDate2}</td>
          </tr>
        </tbody>
        <br />

        <tbody className="">
          <tr className="bg-gray-300 font-semibold">
            <td colSpan={4} className="p-1">
              <input
                placeholder=""
                value={sShareholdersEquityandliabilitiess}
                onChange={(e) =>
                  setShareholdersEquityandliabilities(e.target.value)
                }
                className=" text-start w-full   bg-gray-300 fext-row"
                type="text"
              />
            </td>
          </tr>

          <tr className="bg-gray-200 font-medium">
            <td colSpan={4} className="p-1">
              <input
                placeholder=""
                value={sShareholdersEquity}
                onChange={(e) => setShareholdersEquity(e.target.value)}
                className=" text-start w-full   bg-gray-200 fext-row"
                type="text"
              />
            </td>
          </tr>



           {equityItemsAr.map((val, idx) => {
              const isRowEmpty = !val && !equityItemsDate2Ar[idx];

              if (TakingShort && isRowEmpty) return null;

              return (
                <tr key={`equity-${idx}`} className="bg-gray-100">
                  <td className="border border-gray-300">
                    <input 
                      type="text"
                      className="w-full bg-gray-100 text-black p-1"
                      value={equityLabelsAr[idx]}
                      placeholder={`${idx + 1}`}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "equityLabel",
                          "label"
                        )
                      }
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
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "equity")
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
                      type="number"
                      className="w-full bg-gray-100 text-black p-1"
                      value={equityItemsDate2Ar[idx]}
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "equity", "date2")
                      }
                    />
                  </td>
                </tr>
              );
            })}




{hasNonEmptyEquitySubItems && (
              <tr className="bg-gray-200 font-semibold">
                <td className="">
                  <input
                    className="w-full bg-gray-100 text-black p-1"
                    type="text"
                  />
                </td>
                <td className="border border-gray-300"></td>
                <td className="border border-gray-300">{firstTotalEquity}</td>
                <td className="border border-gray-300">
                  {firstTotalEquityDate2}
                </td>
              </tr>
            )}




{equitySubItemsAr.map((val, idx) => {
              const isRowEmpty = !val && !equitySubItemsDate2Ar[idx];

              if (TakingShort && isRowEmpty) return null;

              return (
                <tr key={`sub-equity-${idx}`} className="bg-gray-100">
                  <td className="border border-gray-300">
                    <h1></h1>
                    <input
                      type="text"
                      className="w-full bg-gray-100 text-black p-1"
                      value={equitySubLabelsAr[idx]}
                      placeholder={`${idx + 1}`}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "equitySubLabel",
                          "label"
                        )
                      }
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
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "equitySub")
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
                      type="number"
                      className="w-full bg-gray-100 text-black p-1"
                      value={equitySubItemsDate2Ar[idx]}
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "equitySub", "date2")
                      }
                    />
                  </td>
                </tr>
              );
            })}

          <tr className="bg-gray-100 font-bold">
            <td className="">
              {" "}
              <input
                placeholder=""
                value={stotalShareholdersEquity}
                onChange={(e) => setTotalShareholdersEquity(e.target.value)}
                className=" text-start w-full   bg-gray-100 fext-row"
                type="text"
              />
            </td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300">{totalEquity}</td>
            <td className="border border-gray-300">{totalEquityDate2}</td>
          </tr>
          <br />

          <tr className="bg-gray-200 font-semibold ">
            <td colSpan={4} className="">
              <input
                placeholder=""
                value={sNoncurrentliabilities}
                onChange={(e) => setNoncurrentliabilities(e.target.value)}
                className=" text-start w-full   bg-gray-200 fext-row"
                type="text"
              />
            </td>
          </tr>


          {nonCurrentLiabilitiesAr.map((val, idx) => {
              const isRowEmpty = !val && !nonCurrentLiabilitiesDate2Ar[idx];

              if (TakingShort && isRowEmpty) return null;

              return (
                <tr
                  key={`non-current-liability-${idx}`}
                  className="bg-gray-100"
                >
                  <td className="border border-gray-300">
                    <input
                      type="text"
                      className="w-full bg-gray-100 text-black p-1"
                      value={nonCurrentLiabilitiesLabelsAr[idx]}
                      placeholder={`${idx + 1}`}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "nonCurrentLiabilityLabel",
                          "label"
                        )
                      }
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
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "nonCurrentLiability")
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
                      type="number"
                      className="w-full bg-gray-100 text-black p-1"
                      value={nonCurrentLiabilitiesDate2Ar[idx]}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "nonCurrentLiability",
                          "date2"
                        )
                      }
                    />
                  </td>
                </tr>
              );
            })}


        {hasNonEmptyNonCurrentSubLiabilities && (
              <tr className="bg-gray-200 font-semibold">
                <td className="">
                  <input
                    className="w-full bg-gray-100 text-black p-1"
                    type="text"
                  />
                </td>
                <td className="border border-gray-300"></td>
                <td className="border border-gray-300">
                  {firstTotalNonCurrentLiabilities}
                </td>
                <td className="border border-gray-300">
                  {firstTotalNonCurrentLiabilitiesDate2}
                </td>
              </tr>
            )}


{nonCurrentSubLiabilitiesAr.map((val, idx) => {
              const isRowEmpty = !val && !nonCurrentSubLiabilitiesDate2Ar[idx];

              if (TakingShort && isRowEmpty) return null;

              return (
                <tr
                  key={`sub-non-current-liability-${idx}`}
                  className="bg-gray-100"
                >
                  <td className="border border-gray-300">
                    <input
                      type="text"
                      className="w-full bg-gray-100 text-black p-1"
                      value={nonCurrentSubLiabilitiesLabelsAr[idx]}
                      placeholder={`${idx + 1}`}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "nonCurrentSubLiabilityLabel",
                          "label"
                        )
                      }
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
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "nonCurrentSubLiability"
                        )
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
                      type="number"
                      className="w-full bg-gray-100 text-black p-1"
                      value={nonCurrentSubLiabilitiesDate2Ar[idx]}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "nonCurrentSubLiability",
                          "date2"
                        )
                      }
                    />
                  </td>
                </tr>
              );
            })}

          <tr className="bg-gray-200 font-semibold ">
            <td className="">
              {" "}
              <input
                placeholder=""
                value={stotalNoncurrentliabilities}
                onChange={(e) => setTotalNoncurrentliabilities(e.target.value)}
                className=" text-start w-full   bg-gray-200 fext-row"
                type="text"
              />
            </td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300">
              {totalNonCurrentLiabilities}
            </td>
            <td className="border border-gray-300 ">
              {totalNonCurrentLiabilitiesDate2}
            </td>
          </tr>
          {/* /kfdf */}
          <br />

          <tr className="bg-gray-200 font-semibold">
            <td colSpan={4} className="">
              <input
                placeholder=""
                value={scurrentliabilities}
                onChange={(e) => setcurrentliabilities(e.target.value)}
                className=" text-start w-full   bg-gray-200 fext-row"
                type="text"
              />
            </td>
          </tr>


           {currentLiabilitiesAr.map((val, idx) => {
              const isRowEmpty = !val && !currentLiabilitiesDate2Ar[idx];

              if (TakingShort && isRowEmpty) return null;

              return (
                <tr key={`current-liability-${idx}`} className="bg-gray-100">
                  <td className="border border-gray-300">
                    <input
                      type="text"
                      className="w-full bg-gray-100 text-black p-1"
                      value={currentLiabilitiesLabelsAr[idx]}
                      placeholder={`${idx + 1}`}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "currentLiabilityLabel",
                          "label"
                        )
                      }
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
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "currentLiability")
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
                      type="number"
                      className="w-full bg-gray-100 text-black p-1"
                      value={currentLiabilitiesDate2Ar[idx]}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "currentLiability",
                          "date2"
                        )
                      }
                    />
                  </td>
                </tr>
              );
            })}


{hasNonEmptyCurrentSubLiabilities && (
              <tr className="bg-gray-200 font-semibold">
                <td className="">
                  <input
                    className="w-full bg-gray-100 text-black p-1"
                    type="text"
                  />
                </td>
                <td className="border border-gray-300"></td>
                <td className="border border-gray-300">
                  {firstTotalCurrentLiabilities}
                </td>
                <td className="border border-gray-300">
                  {firstTotalCurrentLiabilitiesDate2}
                </td>
              </tr>
            )}

{currentSubLiabilitiesAr.map((val, idx) => {
              const isRowEmpty = !val && !currentSubLiabilitiesDate2Ar[idx];

              if (TakingShort && isRowEmpty) return null;

              return (
                <tr
                  key={`sub-current-liability-${idx}`}
                  className="bg-gray-100"
                >
                  <td className="border border-gray-300">
                    <input
                      type="text"
                      className="w-full bg-gray-100 text-black p-1"
                      value={currentSubLiabilitiesLabelsAr[idx]}
                      placeholder={`${idx + 1}`}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "currentSubLiabilityLabel",
                          "label"
                        )
                      }
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
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "currentSubLiability")
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
                      type="number"
                      className="w-full bg-gray-100 text-black p-1"
                      value={currentSubLiabilitiesDate2Ar[idx]}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "currentSubLiability",
                          "date2"
                        )
                      }
                    />
                  </td>
                </tr>
              );
            })}

          <tr className="bg-gray-200 font-semibold ">
            <td className="">
              {" "}
              <input
                placeholder=""
                value={stotalcurrentliabilities}
                onChange={(e) => setTotalcurrentliabilities(e.target.value)}
                className=" text-start w-full   bg-gray-200 fext-row"
                type="text"
              />
            </td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300">
              {totalCurrentLiabilities}
            </td>
            <td className="border border-gray-300">
              {totalCurrentLiabilitiesDate2}
            </td>
          </tr>
          <tr className="bg-gray-200  font-bold">
            <td className="">
              {" "}
              <input
                placeholder=""
                value={stotalliabilities}
                onChange={(e) => setTotalliabilities(e.target.value)}
                className=" text-start w-full   bg-gray-200 fext-row"
                type="text"
              />
            </td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300">{totalLiabilities}</td>
            <td className="border border-gray-300">{totalLiabilitiesDate2}</td>
          </tr>
          <tr className="bg-gray-400  font-bold">
            <td className="">
              <input
                placeholder=""
                value={stotalEquityAndLiabilities}
                onChange={(e) => settotalEquityAndLiabilities(e.target.value)}
                className=" text-start w-full   bg-gray-400 fext-row"
                type="text"
              />
            </td>
            <td className="border border-gray-300"></td>
            <td className="border border-gray-300">
              {totalEquityAndLiabilities}
            </td>
            <td className="border border-gray-300">
              {totalEquityAndLiabilitiesDate2}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
});

export default BalaceSheetForm;
