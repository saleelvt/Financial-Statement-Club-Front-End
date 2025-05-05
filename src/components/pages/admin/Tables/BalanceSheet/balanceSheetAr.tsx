import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../reduxKit/store";
import { setBalanceSheetDataAction } from "../../../../../reduxKit/actions/Tables/balancSheet";
type BalaceSheetFormArProps = {
  TakingShort: boolean;
};

const BalaceSheetFormAr: React.FC<BalaceSheetFormArProps> = React.memo(
  ({ TakingShort }) => {
    const dispatch = useDispatch<AppDispatch>();

    // Updated state declarations with empty strings as initial values
    const [nonCurrentAssets, setNonCurrentAssets] = useState<string[]>(
      Array(12).fill("")
    );
    const [nonCurrentSubAssets, setNonCurrentSubAssets] = useState<string[]>(
      Array(3).fill("")
    );
    const [nonCurrentLabels, setNonCurrentLabels] = useState<string[]>(
      Array(12).fill("")
    );
    const [nonCurrentNotes, setNonCurrentNotes] = useState<string[]>(
      Array(12).fill("")
    );

    const [currentAssets, setCurrentAssets] = useState<string[]>(
      Array(12).fill("")
    );
    const [currentSubAssets, setCurrentSubAssets] = useState<string[]>(
      Array(3).fill("")
    );
    const [CurrentAssetsNotes, setCurrentAssetsNotes] = useState<string[]>(
      Array(12).fill("")
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

    const [equityItemsNotes, setEquityItemsNotes] = useState<string[]>(
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

    const [nonCurrentLiabilitiesNotes, setNonCurrentLiabilitiesNotes] =
      useState<string[]>(Array(12).fill(""));
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
    const [currentLiabilitiesNotes, setCurrentLiabilitiesNotes] = useState<
      string[]
    >(Array(12).fill(""));
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
      column: "date1" | "date2" | "label" | "note" = "date1"
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
      } else if (column === "note") {
        if (type === "nonCurrentNote") {
          const updated = [...nonCurrentNotes];
          updated[index] = value;
          setNonCurrentNotes(updated);
        } else if (type === "CurrentAssetsNote") {
          const updated = [...CurrentAssetsNotes];
          updated[index] = value;
          setCurrentAssetsNotes(updated);
        } else if (type === "equityItemsNote") {
          const updated = [...equityItemsNotes];
          updated[index] = value;
          setEquityItemsNotes(updated);
        } else if (type === "nonCurrentLiabilitiesNote") {
          const updated = [...nonCurrentLiabilitiesNotes];
          updated[index] = value;
          setNonCurrentLiabilitiesNotes(updated);
        } else if (type === "currentLiabilitiesNote") {
          const updated = [...currentLiabilitiesNotes];
          updated[index] = value;
          setCurrentLiabilitiesNotes(updated);
        }
        // add other types of notes here if needed (e.g., nonCurrentSubNote, currentNote, etc.)
      }
    };

    // Helper function to safely parse numeric values from strings
    const parseNumericValue = (value: string): number => {
      if (!value || value.trim() === "-" || value.trim() === "") return 0;

      const isNegative =
        value.trim().startsWith("(") && value.trim().endsWith(")");
      const cleaned = value.replace(/[(),]/g, ""); // Remove (, ), and ,
      const numValue = parseFloat(cleaned);

      if (isNaN(numValue)) return 0;
      return isNegative ? -numValue : numValue;
    };

    const sumStringValues = (values: string[]): number => {
      return values.reduce((sum, val) => sum + parseNumericValue(val), 0);
    };
    const formatWithParentheses = (value: number): string => {
      const formatted = new Intl.NumberFormat("en-US").format(Math.abs(value));
      return value < 0 ? `(${formatted})` : formatted;
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

    const [data1Ar, setDate1Ar] = useState<Date | null>(null);
    const [data2Ar, setDate2Ar] = useState<Date | null>(null);

    const [date1, setDate1] = useState("(غير مراجعة)");
    const [date2, setDate2] = useState("(مراجعة)");
    const [date1Rl, setDate1Rl] = useState("'000");
    const [date2Rl, setDate2Rl] = useState("'000");

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

    const [liabilities, setLiabilities] = useState("المطلوبات");
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
      nonCurrentAssetsDate2,
      nonCurrentSubAssetsDate2,
      nonCurrentNotes,

      // Assets - Current
      currentAssets,
      currentSubAssets,
      currentAssetsDate2,
      currentSubAssetsDate2,
      CurrentAssetsNotes,

      // Equity
      equityItems,
      equitySubItems,
      equityItemsDate2,
      equitySubItemsDate2,
      equityItemsNotes,

      // Liabilities - Non-Current
      nonCurrentLiabilities,
      nonCurrentLiabilitiesNotes,
      nonCurrentSubLiabilities,
      nonCurrentLiabilitiesDate2,
      nonCurrentSubLiabilitiesDate2,

      // Liabilities - Current
      currentLiabilities,
      currentLiabilitiesNotes,
      currentSubLiabilities,
      currentLiabilitiesDate2,
      currentSubLiabilitiesDate2,
    ]);

    const prepareAndDispatchData = async () => {
      const formData = {
        assets: {
          nonCurrent: {
            items: nonCurrentAssets,
            nonCurrentNotes: nonCurrentNotes,
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
            CurrentAssetsNotes: CurrentAssetsNotes,
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
          equityItemsNotes: equityItemsNotes,
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
            nonCurrentLiabilitiesNotes: nonCurrentLiabilitiesNotes,
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
            currentLiabilitiesNotes: currentLiabilitiesNotes,
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

    const { data } = useSelector((state: RootState) => state.table);

    useEffect(() => {
      if (data) {
        setDate1Ar(data.data1En);
        setDate2Ar(data.data2En);
        if (data.assets?.nonCurrent) {
          setNonCurrentAssets(
            data.assets.nonCurrent.items || Array(12).fill("")
          );
          setNonCurrentSubAssets(
            data.assets.nonCurrent.subItems || Array(3).fill("")
          );
          setNonCurrentNotes(data.assets.nonCurrent.nonCurrentNotes);

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
          setCurrentAssetsNotes(data.assets.current.CurrentAssetsNotes);
          setCurrentSubAssets(
            data.assets.current.subItems || Array(3).fill("")
          );

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
          setEquityItemsNotes(data.equity.equityItemsNotes);
          setEquitySubItems(data.equity.subItems || Array(3).fill(""));

          setEquityItemsDate2(data.equity.itemsDate2 || Array(12).fill(""));
          setEquitySubItemsDate2(
            data.equity.subItemsDate2 || Array(3).fill("")
          );
        }

        // Liabilities - Non-Current
        if (data.liabilities?.nonCurrent) {
          setNonCurrentLiabilities(
            data.liabilities.nonCurrent.items || Array(12).fill("")
          );
          setNonCurrentLiabilitiesNotes(
            data.liabilities.nonCurrent.nonCurrentLiabilitiesNotes
          );
          setNonCurrentSubLiabilities(
            data.liabilities.nonCurrent.subItems || Array(3).fill("")
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
          setCurrentLiabilitiesNotes(
            data.liabilities.current.currentLiabilitiesNotes
          );
          setCurrentSubLiabilities(
            data.liabilities.current.subItems || Array(3).fill("")
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

    return (
      <div className="flex justify-start  my-2 text-black">
        <table
          dir="rtl"
          className="border font-semibold border-gray-300 text-xs table-fixed mb-12  "
        >
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-100 w-96"></th>
              <th className="border border-gray-100 w-16">Notes</th>
              <th className="border border-gray-100 p-1 w-28">
                <DatePicker
                  selected={data1Ar}
                  onChange={(date) => setDate1Ar(date)}
                  className="bg-gray-100  w-24 text-center font-bold direction-ltr"
                  calendarClassName="custom-datepicker"
                  placeholderText="اختر التاريخ"
                  dateFormat="dd MMMM yyyy" // 30 April 2025
                />

                <input
                  placeholder=""
                  value={date1}
                  onChange={(e) => setDate1(e.target.value)}
                  className="w-full text-center bg-gray-100 fext-row"
                  type="text"
                />
                <div
                  dir="ltr"
                  className="flex items-center justify-center bg-gray-100 w-full  rounded"
                >
                  <img
                    src="https://res.cloudinary.com/dllmjze4p/image/upload/fl_preserve_transparency/v1746013121/riyal_uxhuwz.jpg?_s=public-apps"
                    alt="Riyal"
                    className="w-3 h-3 "
                  />
                  <input
                    placeholder=""
                    value={date1Rl}
                    onChange={(e) => setDate1Rl(e.target.value)}
                    className="w-8  text-center bg-gray-100 focus:outline-none"
                    type="text"
                  />
                </div>
              </th>

              <th className="border border-gray-100  w-28 p-1 ">
                <DatePicker
                  selected={data2Ar}
                  onChange={(date) => setDate2Ar(date)}
                  className="bg-gray-100   w-24 text-center font-bold"
                  calendarClassName="custom-datepicker"
                  placeholderText="اختر التاريخ"
                  dateFormat="yyyy MMMM dd"
                />

                <input
                  placeholder=""
                  value={date2}
                  onChange={(e) => setDate2(e.target.value)}
                  className="w-full text-center bg-gray-100"
                  type="text"
                />

                {/* Riyal symbol + input as flex */}
                <div
                  dir="ltr"
                  className="flex items-center justify-center bg-gray-100   rounded"
                >
                  <img
                    src="https://res.cloudinary.com/dllmjze4p/image/upload/fl_preserve_transparency/v1746013121/riyal_uxhuwz.jpg?_s=public-apps"
                    alt="Riyal"
                    className="w-3 h-3 "
                  />
                  <input
                    placeholder=""
                    value={date2Rl}
                    onChange={(e) => setDate2Rl(e.target.value)}
                    className="w-8  text-center bg-gray-100 focus:outline-none"
                    type="text"
                  />
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="bg-gray-400  text-sm font-semibold font-semibold">
              <td colSpan={4} className="p-1">
                <input
                  placeholder=""
                  value={sassets}
                  onChange={(e) => setAssets(e.target.value)}
                  className=" text-start    bg-gray-400 fext-row"
                  type="text"
                />
              </td>
            </tr>

            <tr className="bg-gray-200  font-semibold">
              <td colSpan={4} className="p-1">
                <input
                  placeholder=""
                  value={snonCurrentAssets}
                  onChange={(e) => ssetnonCurrentAssets(e.target.value)}
                  className=" text-start w-full  bg-gray-200 fext-row"
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
                      className=" h-7 w-full  bg-gray-100 text-black p-1"
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

                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      value={val}
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "nonCurrent")
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
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
                  <input className="w-full bg-gray-200 text-black p-1" />
                </td>
                <td className="border border-gray-300"></td>
                <td className="border  border-gray-300">
                  {formatWithParentheses(firstTotalNonCurrent)}
                </td>
                <td className="border border-gray-300">
                  {formatWithParentheses(firstTotalNonCurrentDate2)}
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
                      className="w-full bg-gray-100 text-black p-1"
                      value={val}
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "nonCurrentSub")
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
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

            <tr className="bg-gray-200 border-gray-300 font-semibold">
              <td className=" bg-gray-200 border-gray-300 ">
                {" "}
                <input
                  placeholder=""
                  value={stotalNonCurrentAssets}
                  onChange={(e) => ssetTotalNonCurrentAssets(e.target.value)}
                  className=" text-start  bg-gray-200 p-0.5   fext-row"
                />
              </td>

              <td className="border bg-gray-200  border-gray-300"></td>
              <td className="border border-gray-300 bg-gray-200 p-1 text-start">
                {secondTotalNonCurrent !== 0 &&
                secondTotalNonCurrent !== undefined
                  ? formatWithParentheses(Number(secondTotalNonCurrent))
                  : ""}
              </td>

              <td className="border border-gray-300 font bg-gray-200 p-1 text-start">
                {secondTotalNonCurrentDate2 !== 0 &&
                secondTotalNonCurrentDate2 !== undefined
                  ? formatWithParentheses(Number(secondTotalNonCurrentDate2))
                  : ""}
              </td>
            </tr>

            <tr className="bg-gray-200 font-semibold">
              <td colSpan={4} className="p-0.5">
                <input
                  placeholder=""
                  value={scurrentAssets}
                  onChange={(e) => ssetCurrentAssets(e.target.value)}
                  className=" text-start   bg-gray-200 fext-row"
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
                      className="w-full bg-gray-100 text-black p-1"
                      value={CurrentAssetsNotes[idx]}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "CurrentAssetsNote",
                          "note"
                        )
                      }
                    />
                  </td>

                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      value={val}
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "current")
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
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
                    className="w-full bg-gray-200 text-black p-1"
                    type="text"
                  />
                </td>
                <td className="border border-gray-300"></td>
                <td className="border border-gray-300">
                  {formatWithParentheses(firstTotalCurrent)}
                </td>
                <td className="border border-gray-300">
                  {formatWithParentheses(firstTotalCurrentDate2)}
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
                      className="w-full bg-gray-100 text-black p-1"
                      value={val}
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "currentSub")
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
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
                  className=" text-start p-0.5  bg-gray-200 fext-row"
                  type="text"
                />
              </td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300">
                {formatWithParentheses(secondTotalCurrent)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(secondTotalCurrentDate2)}
              </td>
            </tr>

            <tr className="bg-gray-400 font-bold">
              <td className="">
                {" "}
                <input
                  placeholder=""
                  value={stotalAssets}
                  onChange={(e) => ssetTotalAssets(e.target.value)}
                  className=" text-start p-1  bg-gray-400 fext-row"
                  type="text"
                />{" "}
              </td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300">
  {formatWithParentheses(totalAssets)}
</td>
<td className="border border-gray-300">
  {formatWithParentheses(totalAssetsDate2)}
</td>

            </tr>
          </tbody>
          <br />

          <tbody className="">
            <tr className="bg-gray-400   font-semibold">
              <td colSpan={4} className="p-1">
                <input
                  placeholder=""
                  value={sShareholdersEquityandliabilitiess}
                  onChange={(e) =>
                    setShareholdersEquityandliabilities(e.target.value)
                  }
                  className=" text-start w-full   bg-gray-400 fext-row"
                  type="text"
                />
              </td>
            </tr>

            <tr className="bg-gray-300 font-medium">
              <td colSpan={4} className="p-1">
                <input
                  placeholder=""
                  value={sShareholdersEquity}
                  onChange={(e) => setShareholdersEquity(e.target.value)}
                  className=" text-start w-full   bg-gray-300 fext-row"
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
                      value={equityItemsNotes[idx]}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "equityItemsNote",
                          "note"
                        )
                      }
                    />
                  </td>

                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      value={val}
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "equity")
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
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
                <td className="border border-gray-300">
                  {formatWithParentheses(firstTotalEquity)}
                </td>
                <td className="border border-gray-300">
                  {formatWithParentheses(firstTotalEquityDate2)}
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
                      className="w-full bg-gray-100 text-black p-1"
                      value={val}
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "equitySub")
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
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

            <tr className="bg-gray-300 font-bold">
              <td className="">
                {" "}
                <input
                  placeholder=""
                  value={stotalShareholdersEquity}
                  onChange={(e) => setTotalShareholdersEquity(e.target.value)}
                  className=" text-start w-full p-0.5  bg-gray-300 fext-row"
                  type="text"
                />
              </td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300">
                {formatWithParentheses(totalEquity)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(totalEquityDate2)}
              </td>
            </tr>

            <tr className="bg-gray-200 font-semibold ">
              <td colSpan={4} className="">
                <input
                  placeholder=""
                  value={liabilities}
                  onChange={(e) => setLiabilities(e.target.value)}
                  className=" text-start w-full p-0.5 bg-gray-300 fext-row"
                  type="text"
                />
              </td>
            </tr>
            <tr className="bg-gray-200 font-semibold ">
              <td colSpan={4} className="">
                <input
                  placeholder=""
                  value={sNoncurrentliabilities}
                  onChange={(e) => setNoncurrentliabilities(e.target.value)}
                  className=" text-start w-full  p-0.5   bg-gray-200 fext-row"
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
                      value={nonCurrentLiabilitiesNotes[idx]}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "nonCurrentLiabilitiesNote",
                          "note"
                        )
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      value={val}
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "nonCurrentLiability")
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
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
                  {formatWithParentheses(firstTotalNonCurrentLiabilities)}
                </td>
                <td className="border border-gray-300">
                  {formatWithParentheses(firstTotalNonCurrentLiabilitiesDate2)}
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
              <td className="p-0.5">
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
                {formatWithParentheses(totalNonCurrentLiabilities)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(totalNonCurrentLiabilitiesDate2)}
              </td>
            </tr>
            {/* /kfdf */}

            <tr className="bg-gray-200 font-semibold">
              <td colSpan={4} className="p-0.5">
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
                      value={currentLiabilitiesNotes[idx]}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "currentLiabilitiesNote",
                          "note"
                        )
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      value={val}
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "currentLiability")
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
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
                  {formatWithParentheses(firstTotalCurrentLiabilities)}
                </td>
                <td className="border border-gray-300">
                  {formatWithParentheses(firstTotalCurrentLiabilitiesDate2)}
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
                      className="w-full bg-gray-100 text-black p-1"
                      value={val}
                      onChange={(e) =>
                        handleChange(idx, e.target.value, "currentSubLiability")
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
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
              <td className="p-0.5">
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
                {formatWithParentheses(totalCurrentLiabilities)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(totalCurrentLiabilitiesDate2)}
              </td>
            </tr>
            <tr className="bg-gray-300  font-bold">
              <td className="p-0.5">
                {" "}
                <input
                  placeholder=""
                  value={stotalliabilities}
                  onChange={(e) => setTotalliabilities(e.target.value)}
                  className=" text-start w-full   bg-gray-300 fext-row"
                  type="text"
                />
              </td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300">
                {formatWithParentheses(totalLiabilities)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(totalLiabilitiesDate2)}
              </td>
            </tr>
            <tr className="bg-gray-400  font-bold">
              <td className="p-0.5">
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
                {formatWithParentheses(totalEquityAndLiabilities)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(totalEquityAndLiabilitiesDate2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
);

export default BalaceSheetFormAr;
