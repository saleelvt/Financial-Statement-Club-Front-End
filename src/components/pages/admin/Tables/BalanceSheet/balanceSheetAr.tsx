import React, { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../reduxKit/store";
import { setBalanceSheetDataAction } from "../../../../../reduxKit/actions/Tables/balancSheet";
type BalaceSheetFormArProps = {
  TakingShort: boolean;
};

const BalaceSheetFormAr: React.FC<BalaceSheetFormArProps> = React.memo( ({ TakingShort }) => {
    const dispatch = useDispatch<AppDispatch>();

    // Updated state declarations with empty strings as initial values
    const [nonCurrentAssets, setNonCurrentAssets] = useState<string[]>(
      Array(12).fill("")
    );
    const [nonCurrentSubAssets, setNonCurrentSubAssets] = useState<string[]>(
      Array(3).fill("")
    );
    const [currentAssets, setCurrentAssets] = useState<string[]>(
      Array(12).fill("")
    );
    const [currentSubAssets, setCurrentSubAssets] = useState<string[]>(
      Array(3).fill("")
    );

    // New state for Date 2 columns with empty strings
    const [nonCurrentAssetsDate2, setNonCurrentAssetsDate2] = useState<
      string[]
    >(Array(12).fill(""));
    const [nonCurrentSubAssetsDate2, setNonCurrentSubAssetsDate2] = useState<
      string[]
    >(Array(3).fill(""));
    const [currentAssetsDate2, setCurrentAssetsDate2] = useState<string[]>(
      Array(12).fill("")
    );
    const [currentSubAssetsDate2, setCurrentSubAssetsDate2] = useState<
      string[]
    >(Array(3).fill(""));

    // Labels remain as strings
    const [nonCurrentLabels, setNonCurrentLabels] = useState<string[]>(
      Array(12).fill("")
    );
    const [nonCurrentSubLabels, setNonCurrentSubLabels] = useState<string[]>(
      Array(3).fill("")
    );
    const [currentLabels, setCurrentLabels] = useState<string[]>(
      Array(12).fill("")
    );
    const [currentSubLabels, setCurrentSubLabels] = useState<string[]>(
      Array(3).fill("")
    );

    // States for equity and liabilities with empty strings
    const [equityItems, setEquityItems] = useState<string[]>(
      Array(12).fill("")
    );
    const [equityItemsDate2, setEquityItemsDate2] = useState<string[]>(
      Array(12).fill("")
    );
    const [equityLabels, setEquityLabels] = useState<string[]>(
      Array(12).fill("")
    );

    const [equitySubItems, setEquitySubItems] = useState<string[]>(
      Array(3).fill("")
    );
    const [equitySubItemsDate2, setEquitySubItemsDate2] = useState<string[]>(
      Array(3).fill("")
    );
    const [equitySubLabels, setEquitySubLabels] = useState<string[]>(
      Array(3).fill("")
    );

    const [nonCurrentLiabilities, setNonCurrentLiabilities] = useState<
      string[]
    >(Array(12).fill(""));
    const [nonCurrentLiabilitiesDate2, setNonCurrentLiabilitiesDate2] =
      useState<string[]>(Array(12).fill(""));
    const [nonCurrentLiabilitiesLabels, setNonCurrentLiabilitiesLabels] =
      useState<string[]>(Array(12).fill(""));

    const [nonCurrentSubLiabilities, setNonCurrentSubLiabilities] = useState<
      string[]
    >(Array(3).fill(""));
    const [nonCurrentSubLiabilitiesDate2, setNonCurrentSubLiabilitiesDate2] =
      useState<string[]>(Array(3).fill(""));
    const [nonCurrentSubLiabilitiesLabels, setNonCurrentSubLiabilitiesLabels] =
      useState<string[]>(Array(3).fill(""));
    const [currentLiabilities, setCurrentLiabilities] = useState<string[]>(
      Array(12).fill("")
    );
    const [currentLiabilitiesDate2, setCurrentLiabilitiesDate2] = useState<
      string[]
    >(Array(12).fill(""));
    const [currentLiabilitiesLabels, setCurrentLiabilitiesLabels] = useState<
      string[]
    >(Array(12).fill(""));

    const [currentSubLiabilities, setCurrentSubLiabilities] = useState<
      string[]
    >(Array(3).fill(""));
    const [currentSubLiabilitiesDate2, setCurrentSubLiabilitiesDate2] =
      useState<string[]>(Array(3).fill(""));
    const [currentSubLiabilitiesLabels, setCurrentSubLiabilitiesLabels] =
      useState<string[]>(Array(3).fill(""));

    // Updated handleChange function to work with string values
    const handleChange = (
      index: number,
      value: string,
      type: string,
      column: "date1" | "date2" | "label" = "date1"
    ) => {
      if (column === "label") {
        if (type === "nonCurrentLabel") {
          const updated = [...nonCurrentLabels];
          updated[index] = value;
          setNonCurrentLabels(updated);
        } else if (type === "nonCurrentSubLabel") {
          const updated = [...nonCurrentSubLabels];
          updated[index] = value;
          setNonCurrentSubLabels(updated);
        } else if (type === "currentLabel") {
          const updated = [...currentLabels];
          updated[index] = value;
          setCurrentLabels(updated);
        } else if (type === "currentSubLabel") {
          const updated = [...currentSubLabels];
          updated[index] = value;
          setCurrentSubLabels(updated);
        } else if (type === "equityLabel") {
          const updated = [...equityLabels];
          updated[index] = value;
          setEquityLabels(updated);
        } else if (type === "equitySubLabel") {
          const updated = [...equitySubLabels];
          updated[index] = value;
          setEquitySubLabels(updated);
        } else if (type === "nonCurrentLiabilityLabel") {
          const updated = [...nonCurrentLiabilitiesLabels];
          updated[index] = value;
          setNonCurrentLiabilitiesLabels(updated);
        } else if (type === "nonCurrentSubLiabilityLabel") {
          const updated = [...nonCurrentSubLiabilitiesLabels];
          updated[index] = value;
          setNonCurrentSubLiabilitiesLabels(updated);
        } else if (type === "currentLiabilityLabel") {
          const updated = [...currentLiabilitiesLabels];
          updated[index] = value;
          setCurrentLiabilitiesLabels(updated);
        } else if (type === "currentSubLiabilityLabel") {
          const updated = [...currentSubLiabilitiesLabels];
          updated[index] = value;
          setCurrentSubLiabilitiesLabels(updated);
        }
        return;
      }

      // For numeric fields, we store as strings but validate numeric input
      if (column === "date1") {
        if (type === "nonCurrent") {
          const updated = [...nonCurrentAssets];
          updated[index] = value;
          setNonCurrentAssets(updated);
        } else if (type === "nonCurrentSub") {
          const updated = [...nonCurrentSubAssets];
          updated[index] = value;
          setNonCurrentSubAssets(updated);
        } else if (type === "current") {
          const updated = [...currentAssets];
          updated[index] = value;
          setCurrentAssets(updated);
        } else if (type === "currentSub") {
          const updated = [...currentSubAssets];
          updated[index] = value;
          setCurrentSubAssets(updated);
        } else if (type === "equity") {
          const updated = [...equityItems];
          updated[index] = value;
          setEquityItems(updated);
        } else if (type === "equitySub") {
          const updated = [...equitySubItems];
          updated[index] = value;
          setEquitySubItems(updated);
        } else if (type === "nonCurrentLiability") {
          const updated = [...nonCurrentLiabilities];
          updated[index] = value;
          setNonCurrentLiabilities(updated);
        } else if (type === "nonCurrentSubLiability") {
          const updated = [...nonCurrentSubLiabilities];
          updated[index] = value;
          setNonCurrentSubLiabilities(updated);
        } else if (type === "currentLiability") {
          const updated = [...currentLiabilities];
          updated[index] = value;
          setCurrentLiabilities(updated);
        } else if (type === "currentSubLiability") {
          const updated = [...currentSubLiabilities];
          updated[index] = value;
          setCurrentSubLiabilities(updated);
        }
      } else if (column === "date2") {
        if (type === "nonCurrent") {
          const updated = [...nonCurrentAssetsDate2];
          updated[index] = value;
          setNonCurrentAssetsDate2(updated);
        } else if (type === "nonCurrentSub") {
          const updated = [...nonCurrentSubAssetsDate2];
          updated[index] = value;
          setNonCurrentSubAssetsDate2(updated);
        } else if (type === "current") {
          const updated = [...currentAssetsDate2];
          updated[index] = value;
          setCurrentAssetsDate2(updated);
        } else if (type === "currentSub") {
          const updated = [...currentSubAssetsDate2];
          updated[index] = value;
          setCurrentSubAssetsDate2(updated);
        } else if (type === "equity") {
          const updated = [...equityItemsDate2];
          updated[index] = value;
          setEquityItemsDate2(updated);
        } else if (type === "equitySub") {
          const updated = [...equitySubItemsDate2];
          updated[index] = value;
          setEquitySubItemsDate2(updated);
        } else if (type === "nonCurrentLiability") {
          const updated = [...nonCurrentLiabilitiesDate2];
          updated[index] = value;
          setNonCurrentLiabilitiesDate2(updated);
        } else if (type === "nonCurrentSubLiability") {
          const updated = [...nonCurrentSubLiabilitiesDate2];
          updated[index] = value;
          setNonCurrentSubLiabilitiesDate2(updated);
        } else if (type === "currentLiability") {
          const updated = [...currentLiabilitiesDate2];
          updated[index] = value;
          setCurrentLiabilitiesDate2(updated);
        } else if (type === "currentSubLiability") {
          const updated = [...currentSubLiabilitiesDate2];
          updated[index] = value;
          setCurrentSubLiabilitiesDate2(updated);
        }
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
    const firstTotalNonCurrent = sumStringValues(nonCurrentAssets);
    const secondTotalNonCurrent =
      firstTotalNonCurrent + sumStringValues(nonCurrentSubAssets);
    const firstTotalCurrent = sumStringValues(currentAssets);
    const secondTotalCurrent =
      firstTotalCurrent + sumStringValues(currentSubAssets);
    const totalAssets = secondTotalNonCurrent + secondTotalCurrent;

    // Calculate totals for Date 2
    const firstTotalNonCurrentDate2 = sumStringValues(nonCurrentAssetsDate2);
    const secondTotalNonCurrentDate2 =
      firstTotalNonCurrentDate2 + sumStringValues(nonCurrentSubAssetsDate2);
    const firstTotalCurrentDate2 = sumStringValues(currentAssetsDate2);
    const secondTotalCurrentDate2 =
      firstTotalCurrentDate2 + sumStringValues(currentSubAssetsDate2);
    const totalAssetsDate2 =
      secondTotalNonCurrentDate2 + secondTotalCurrentDate2;

    // Calculate totals for Equity
    const firstTotalEquity = sumStringValues(equityItems);
    const totalEquity = firstTotalEquity + sumStringValues(equitySubItems);

    const firstTotalEquityDate2 = sumStringValues(equityItemsDate2);
    const totalEquityDate2 =
      firstTotalEquityDate2 + sumStringValues(equitySubItemsDate2);

    // Calculate totals for Non-Current Liabilities
    const firstTotalNonCurrentLiabilities = sumStringValues(
      nonCurrentLiabilities
    );
    const totalNonCurrentLiabilities =
      firstTotalNonCurrentLiabilities +
      sumStringValues(nonCurrentSubLiabilities);

    const firstTotalNonCurrentLiabilitiesDate2 = sumStringValues(
      nonCurrentLiabilitiesDate2
    );
    const totalNonCurrentLiabilitiesDate2 =
      firstTotalNonCurrentLiabilitiesDate2 +
      sumStringValues(nonCurrentSubLiabilitiesDate2);

    // Calculate totals for Current Liabilities
    const firstTotalCurrentLiabilities = sumStringValues(currentLiabilities);
    const totalCurrentLiabilities =
      firstTotalCurrentLiabilities + sumStringValues(currentSubLiabilities);

    const firstTotalCurrentLiabilitiesDate2 = sumStringValues(
      currentLiabilitiesDate2
    );
    const totalCurrentLiabilitiesDate2 =
      firstTotalCurrentLiabilitiesDate2 +
      sumStringValues(currentSubLiabilitiesDate2);

    // Calculate Total Liabilities
    const totalLiabilities =
      totalNonCurrentLiabilities + totalCurrentLiabilities;
    const totalLiabilitiesDate2 =
      totalNonCurrentLiabilitiesDate2 + totalCurrentLiabilitiesDate2;

    // Calculate Total Shareholder's Equity and Liabilities
    const totalEquityAndLiabilities = totalEquity + totalLiabilities;
    const totalEquityAndLiabilitiesDate2 =
      totalEquityDate2 + totalLiabilitiesDate2;

    const hasNonEmptyNonCurrentSubAssets = nonCurrentSubAssets.some(
      (val, idx) => val || nonCurrentSubAssetsDate2[idx]
    );
    const hasNonEmptyCurrentSubAssets = currentSubAssets.some(
      (val, idx) => val || currentSubAssetsDate2[idx]
    );

    const hasNonEmptyEquitySubItems = equitySubItems.some(
      (val, idx) => val || equitySubItemsDate2[idx]
    );
    const hasNonEmptyNonCurrentSubLiabilities = nonCurrentSubLiabilities.some(
      (val, idx) => val || nonCurrentSubLiabilitiesDate2[idx]
    );
    const hasNonEmptyCurrentSubLiabilities = currentSubLiabilities.some(
      (val, idx) => val || currentSubLiabilitiesDate2[idx]
    );

    const [date1, setDate1] = useState("(Unaudited)");
    const [date2, setDate2] = useState("(Audited)");

    const [sassets, setAssets] = useState("الأصول");
    const [snonCurrentAssets, ssetnonCurrentAssets] = useState(
      "الأصول غير المتداولة"
    );
    const [stotalNonCurrentAssets, ssetTotalNonCurrentAssets] = useState(
      "إجمالي الأصول غير المتداولة"
    );

    const [scurrentAssets, ssetCurrentAssets] = useState("الأصول المتداولة");
    const [stotalCurrentAssets, ssetTotalCurrentAssets] = useState(
      "إجمالي الأصول المتداولة"
    );
    const [stotalAssets, ssetTotalAssets] = useState("إجمالي الأصول");

    const [
      sShareholdersEquityandliabilitiess,
      setShareholdersEquityandliabilities,
    ] = useState("إجمالي حقوق المساهمين والمطلوبات");
    const [sShareholdersEquity, setShareholdersEquity] =
      useState("حقوق المساهمين");
    const [stotalShareholdersEquity, setTotalShareholdersEquity] = useState(
      "إجمالي حقوق المساهمين"
    );

    const [sNoncurrentliabilities, setNoncurrentliabilities] = useState(
      "المطلوبات غير المتداولة"
    );
    const [stotalNoncurrentliabilities, setTotalNoncurrentliabilities] =
      useState("إجمالي المطلوبات غير المتداولة");

    const [scurrentliabilities, setcurrentliabilities] = useState(
      "المطلوبات المتداولة"
    );
    const [stotalcurrentliabilities, setTotalcurrentliabilities] = useState(
      "إجمالي المطلوبات المتداولة"
    );
    const [stotalliabilities, setTotalliabilities] =
      useState("إجمالي المطلوبات");

    const [stotalEquityAndLiabilities, settotalEquityAndLiabilities] = useState(
      "إجمالي حقوق المساهمين والمطلوبات"
    );

    useEffect(() => {
      try {
        prepareAndDispatchData();
      } catch (error) {
        console.log("useEffect error : ", error);
      }
    }, [
      // Assets - Non-Current
      nonCurrentAssets,
      nonCurrentSubAssets,
      nonCurrentLabels,
      nonCurrentSubLabels,
      nonCurrentAssetsDate2,
      nonCurrentSubAssetsDate2,

      // Assets - Current
      currentAssets,
      currentSubAssets,
      currentLabels,
      currentSubLabels,
      currentAssetsDate2,
      currentSubAssetsDate2,

      // Equity
      equityItems,
      equitySubItems,
      equityLabels,
      equitySubLabels,
      equityItemsDate2,
      equitySubItemsDate2,

      // Liabilities - Non-Current
      nonCurrentLiabilities,
      nonCurrentSubLiabilities,
      nonCurrentLiabilitiesLabels,
      nonCurrentSubLiabilitiesLabels,
      nonCurrentLiabilitiesDate2,
      nonCurrentSubLiabilitiesDate2,

      // Liabilities - Current
      currentLiabilities,
      currentSubLiabilities,
      currentLiabilitiesLabels,
      currentSubLiabilitiesLabels,
      currentLiabilitiesDate2,
      currentSubLiabilitiesDate2,
    ]);

    const prepareAndDispatchData = async () => {
      const formData = {
        assets: {
          nonCurrent: {
            items: nonCurrentAssets,
            subItems: nonCurrentSubAssets,
            labels: nonCurrentLabels,
            subLabels: nonCurrentSubLabels,
            itemsDate2: nonCurrentAssetsDate2,
            subItemsDate2: nonCurrentSubAssetsDate2,
            firstTotal: firstTotalNonCurrent,
            secondTotal: secondTotalNonCurrent,
            firstTotalDate2: firstTotalNonCurrentDate2,
            secondTotalDate2: secondTotalNonCurrentDate2,
          },
          current: {
            items: currentAssets,
            subItems: currentSubAssets,
            labels: currentLabels,
            subLabels: currentSubLabels,
            itemsDate2: currentAssetsDate2,
            subItemsDate2: currentSubAssetsDate2,
            firstTotal: firstTotalCurrent,
            secondTotal: secondTotalCurrent,
            firstTotalDate2: firstTotalCurrentDate2,
            secondTotalDate2: secondTotalCurrentDate2,
          },
          totalAssets,
          totalAssetsDate2,
        },
        equity: {
          items: equityItems,
          subItems: equitySubItems,
          labels: equityLabels,
          subLabels: equitySubLabels,
          itemsDate2: equityItemsDate2,
          subItemsDate2: equitySubItemsDate2,
          firstTotal: firstTotalEquity,
          totalEquity,
          firstTotalDate2: firstTotalEquityDate2,
          totalEquityDate2,
        },
        liabilities: {
          nonCurrent: {
            items: nonCurrentLiabilities,
            subItems: nonCurrentSubLiabilities,
            labels: nonCurrentLiabilitiesLabels,
            subLabels: nonCurrentSubLiabilitiesLabels,
            itemsDate2: nonCurrentLiabilitiesDate2,
            subItemsDate2: nonCurrentSubLiabilitiesDate2,
            firstTotal: firstTotalNonCurrentLiabilities,
            total: totalNonCurrentLiabilities,
            firstTotalDate2: firstTotalNonCurrentLiabilitiesDate2,
            totalDate2: totalNonCurrentLiabilitiesDate2,
          },
          current: {
            items: currentLiabilities,
            subItems: currentSubLiabilities,
            labels: currentLiabilitiesLabels,
            subLabels: currentSubLiabilitiesLabels,
            itemsDate2: currentLiabilitiesDate2,
            subItemsDate2: currentSubLiabilitiesDate2,
            firstTotal: firstTotalCurrentLiabilities,
            total: totalCurrentLiabilities,
            firstTotalDate2: firstTotalCurrentLiabilitiesDate2,
            totalDate2: totalCurrentLiabilitiesDate2,
          },
          totalLiabilities,
          totalLiabilitiesDate2,
        },
        ItotalEquityAndLiabilities: totalEquityAndLiabilities,
        ItotalEquityAndLiabilitiesDate2: totalEquityAndLiabilitiesDate2,
      };

      await dispatch(setBalanceSheetDataAction(formData));
    };

    return (
      <div className="flex justify-start  my-2 text-black">
        <table dir="rtl" className="border border-gray-300 text-xs mb-12  ">
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













            {nonCurrentAssets.map((val, idx) => {
              const isRowEmpty = !val && !nonCurrentAssetsDate2[idx];

              // 🧠 Only hide the row *after* submission if it's empty
              if (TakingShort && isRowEmpty) return null;

              return (
                <tr key={`non-current-${idx}`} className="bg-gray-100">
                  <td className="border border-gray-300">
                    <input
                      type="text"
                      className="w-full bg-gray-100 text-black p-1"
                      value={nonCurrentLabels[idx]}
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
                    <input
                      type="text"
                      className="w-full bg-gray-100 text-black p-1"
                      placeholder=""
                    />
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
                      value={nonCurrentAssetsDate2[idx]}
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





            {nonCurrentSubAssets.map((val, idx) => {
              const isRowEmpty = !val && !nonCurrentSubAssetsDate2[idx];

              if (TakingShort && isRowEmpty) return null;

              return (
                <tr key={`sub-non-${idx}`} className="bg-gray-100">
                  <td className="border border-gray-300">
                    <input
                      type="text"
                      className="w-full bg-gray-100 text-black p-1"
                      value={nonCurrentSubLabels[idx]}
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
                      value={nonCurrentSubAssetsDate2[idx]}
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






            <tr className="bg-gray-100 font-semibold">
              <td className="">
                {" "}
                <input
                  placeholder=""
                  value={stotalNonCurrentAssets}
                  onChange={(e) => ssetTotalNonCurrentAssets(e.target.value)}
                  className=" text-start  bg-gray-100 fext-row"
                  type="text"
                />
              </td>
              <td className="border border-gray-300"></td>
              <td className="border p-1 border-gray-300">
                {secondTotalNonCurrent}
              </td>
              <td className="border border-gray-300">
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

            {currentAssets.map((val, idx) => {
              const isRowEmpty = !val && !currentAssetsDate2[idx];

              if (TakingShort && isRowEmpty) return null;

              return (
                <tr key={`current-${idx}`} className="bg-gray-100">
                  <td className="border border-gray-300">
                    <input
                      type="text"
                      className="w-full bg-gray-100 text-black p-1"
                      value={currentLabels[idx]}
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
                      value={currentAssetsDate2[idx]}
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




            {currentSubAssets.map((val, idx) => {
              const isRowEmpty = !val && !currentSubAssetsDate2[idx];

              if (TakingShort && isRowEmpty) return null;

              return (
                <tr key={`sub-current-${idx}`} className="bg-gray-100">
                  <td className="border border-gray-300">
                    <input
                      type="text"
                      className="w-full bg-gray-100 text-black p-1"
                      value={currentSubLabels[idx]}
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
                      value={currentSubAssetsDate2[idx]}
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



            {equityItems.map((val, idx) => {
              const isRowEmpty = !val && !equityItemsDate2[idx];

              if (TakingShort && isRowEmpty) return null;

              return (
                <tr key={`equity-${idx}`} className="bg-gray-100">
                  <td className="border border-gray-300">
                    <input
                      type="text"
                      className="w-full bg-gray-100 text-black p-1"
                      value={equityLabels[idx]}
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
                      value={equityItemsDate2[idx]}
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

            {equitySubItems.map((val, idx) => {
              const isRowEmpty = !val && !equitySubItemsDate2[idx];

              if (TakingShort && isRowEmpty) return null;

              return (
                <tr key={`sub-equity-${idx}`} className="bg-gray-100">
                  <td className="border border-gray-300">
                    <h1></h1>
                    <input
                      type="text"
                      className="w-full bg-gray-100 text-black p-1"
                      value={equitySubLabels[idx]}
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
                      value={equitySubItemsDate2[idx]}
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

            {nonCurrentLiabilities.map((val, idx) => {
              const isRowEmpty = !val && !nonCurrentLiabilitiesDate2[idx];

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
                      value={nonCurrentLiabilitiesLabels[idx]}
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
                      value={nonCurrentLiabilitiesDate2[idx]}
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



            {nonCurrentSubLiabilities.map((val, idx) => {
              const isRowEmpty = !val && !nonCurrentSubLiabilitiesDate2[idx];

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
                      value={nonCurrentSubLiabilitiesLabels[idx]}
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
                      value={nonCurrentSubLiabilitiesDate2[idx]}
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
                  onChange={(e) =>
                    setTotalNoncurrentliabilities(e.target.value)
                  }
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

            {currentLiabilities.map((val, idx) => {
              const isRowEmpty = !val && !currentLiabilitiesDate2[idx];

              if (TakingShort && isRowEmpty) return null;

              return (
                <tr key={`current-liability-${idx}`} className="bg-gray-100">
                  <td className="border border-gray-300">
                    <input
                      type="text"
                      className="w-full bg-gray-100 text-black p-1"
                      value={currentLiabilitiesLabels[idx]}
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
                      value={currentLiabilitiesDate2[idx]}
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

            {currentSubLiabilities.map((val, idx) => {
              const isRowEmpty = !val && !currentSubLiabilitiesDate2[idx];

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
                      value={currentSubLiabilitiesLabels[idx]}
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
                      value={currentSubLiabilitiesDate2[idx]}
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
              <td className="border border-gray-300">
                {totalLiabilitiesDate2}
              </td>
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
  }
);

export default BalaceSheetFormAr;
