/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../reduxKit/store";

import { setBalanceSheetDataAction } from "../../../../../reduxKit/actions/Tables/balancSheet";
type BalaceSheetFormArProps = {
  TableDataEn: any;
};

const BalaceSheetUpdateFormEn: React.FC<BalaceSheetFormArProps> = React.memo(
  ({ TableDataEn }) => {
    // Updated state declarations with empty strings as initial values
    const dispatch = useDispatch<AppDispatch>();
    const [nonCurrentAssetsAr, setNonCurrentAssets] = useState<string[]>(
      Array(12).fill("")
    ); 
    const [nonCurrentNotes, setNonCurrentNotes] = useState<string[]>(
      Array(12).fill("")
    );
    const [nonCurrentAssetsDate2Ar, setNonCurrentAssetsDate2] = useState<
      string[]
    >(Array(12).fill(""));
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
    const [CurrentAssetsNotes, setCurrentAssetsNotes] = useState<string[]>(
      Array(12).fill("")
    );

    const [currentAssetsDate2Ar, setCurrentAssetsDate2] = useState<string[]>(
      Array(12).fill("")
    );
    const [currentSubAssetsDate2Ar, setCurrentSubAssetsDate2] = useState<
      string[]
    >(Array(3).fill(""));

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
    const [equityItemsAr, setEquityItems] = useState<string[]>(
      Array(12).fill("")
    );
    const [equityItemsNotes, setEquityItemsNotes] = useState<string[]>(
      Array(12).fill("")
    );

    const [equityItemsDate2Ar, setEquityItemsDate2] = useState<string[]>(
      Array(12).fill("")
    );
    const [equityLabelsAr, setEquityLabels] = useState<string[]>(
      Array(12).fill("")
    );
    const [equitySubLabelsAr, setEquitySubLabels] = useState<string[]>(
      Array(3).fill("")
    );

    const [equitySubItemsAr, setEquitySubItems] = useState<string[]>(
      Array(3).fill("")
    );
    const [equitySubItemsDate2Ar, setEquitySubItemsDate2] = useState<string[]>(
      Array(3).fill("")
    );
    const [nonCurrentLiabilitiesAr, setNonCurrentLiabilities] = useState<
      string[]
    >(Array(12).fill(""));
    const [nonCurrentLiabilitiesNotes, setNonCurrentLiabilitiesNotes] =
      useState<string[]>(Array(12).fill(""));
    const [nonCurrentLiabilitiesDate2Ar, setNonCurrentLiabilitiesDate2] =
      useState<string[]>(Array(12).fill(""));
    const [nonCurrentLiabilitiesLabelsAr, setNonCurrentLiabilitiesLabels] =
      useState<string[]>(Array(12).fill(""));

    const [nonCurrentSubLiabilitiesAr, setNonCurrentSubLiabilities] = useState<
      string[]
    >(Array(3).fill(""));
    const [nonCurrentSubLiabilitiesDate2Ar, setNonCurrentSubLiabilitiesDate2] =
      useState<string[]>(Array(3).fill(""));
    const [
      nonCurrentSubLiabilitiesLabelsAr,
      setNonCurrentSubLiabilitiesLabels,
    ] = useState<string[]>(Array(3).fill(""));

    const [currentLiabilitiesAr, setCurrentLiabilities] = useState<string[]>(
      Array(12).fill("")
    );
    const [currentLiabilitiesNotes, setCurrentLiabilitiesNotes] = useState<
      string[]
    >(Array(12).fill(""));
    const [currentLiabilitiesDate2Ar, setCurrentLiabilitiesDate2] = useState<
      string[]
    >(Array(12).fill(""));

    const [currentLiabilitiesLabelsAr, setCurrentLiabilitiesLabels] = useState<
      string[]
    >(Array(12).fill(""));
    const [currentSubLiabilitiesLabelsAr, setCurrentSubLiabilitiesLabels] =
      useState<string[]>(Array(3).fill(""));

    const [currentSubLiabilitiesAr, setCurrentSubLiabilities] = useState<
      string[]
    >(Array(3).fill(""));
    const [currentSubLiabilitiesDate2Ar, setCurrentSubLiabilitiesDate2] =
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
          const updated = [...nonCurrentAssetsAr];
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
    const totalAssetsDate2 =
      secondTotalNonCurrentDate2 + secondTotalCurrentDate2;

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
      firstTotalNonCurrentLiabilities +
      sumStringValues(nonCurrentSubLiabilitiesAr);

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
    const totalLiabilities =
      totalNonCurrentLiabilities + totalCurrentLiabilities;
    const totalLiabilitiesDate2 =
      totalNonCurrentLiabilitiesDate2 + totalCurrentLiabilitiesDate2;

    // Calculate Total Shareholder's Equity and Liabilities
    const totalEquityAndLiabilities = totalEquity + totalLiabilities;
    const totalEquityAndLiabilitiesDate2 =
      totalEquityDate2 + totalLiabilitiesDate2;

    const [data1EnN, setDate1En] = useState<Date | null>(null);
    const [data2EnN, setDate2En] = useState<Date | null>(null);

    const [date1Rl, setDate1Rl] = useState("'000");
    const [date2Rl, setDate2Rl] = useState("'000");

    const [date1, setDate1] = useState("(Unaudited)");
    const [date2, setDate2] = useState("(Audited)");

    const [sassets, setAssets] = useState("ASSETS");
    const [snonCurrentAssets, ssetnonCurrentAssets] =
      useState("Non-current assets");
    const [sfirtsTotalnonCurrentAssets, ssetfirtsTotalnonCurrentAssets] =
      useState("");
    const [stotalNonCurrentAssets, ssetTotalNonCurrentAssets] = useState(
      "Total non-current assets"  );
    const [scurrentAssets, ssetCurrentAssets] = useState("Current assets");
    const [sfirtsTotalCurrentAssets, ssetfirtsTotalCurrentAssets] =   useState("");
    const [stotalCurrentAssets, ssetTotalCurrentAssets] = useState(    "Total current assets"  );
    const [stotalAssets, ssetTotalAssets] = useState("TOTAL ASSETS");
    const [   sShareholdersEquityandliabilitiess,  setShareholdersEquityandliabilities,  ] = useState("EQUITY AND LIABILITIES");
    const [sShareholdersEquity, setShareholdersEquity] = useState(   "Equity" );
    const [sfirtsTotalShareholdersEquity, ssetfirtsTotalShareholdersEquity] =  useState("");
    const [stotalShareholdersEquity, setTotalShareholdersEquity] = useState(  "Tota equity");
    const [sliabilities, setLiabilities] = useState("Liabilities");
    const [sNoncurrentliabilities, setNoncurrentliabilities] = useState(    "Non-current Liabilities" );
    const [sfirtsTotalNoncurrentLiabilities, ssetfirtsNoncurrentLiabilities] =  useState("");
    const [stotalNoncurrentliabilities, setTotalNoncurrentliabilities] =  useState("Total non-current liabilities");
    const [scurrentliabilities, setcurrentliabilities] = useState(   "Current Liabilities" );
    const [sfirtsTotalcurrentLiabilities, ssetfirtscurrentLiabilities] =  useState("");
    const [stotalcurrentliabilities, setTotalcurrentliabilities] = useState(  "Total current liabilities" );
    const [stotalliabilities, setTotalliabilities] =    useState("Total  liabilities");
    const [stotalEquityAndLiabilities, settotalEquityAndLiabilities] = useState(  "TOTAL EQUITY AND LIABILITIES" );

    useEffect(() => {
      console.log(
        "The Update section of the Data Set in the Part english : ",
        TableDataEn.data1En,
        TableDataEn.data2En
      );

      if (TableDataEn) {
        setDate1En(new Date(TableDataEn.data1En)); // ensure it's a Date object
        setDate2En(new Date(TableDataEn.data2En)); // same here
        setAssets(TableDataEn.assets.sassets);
        ssetTotalAssets(TableDataEn.assets.stotalAssets);
        if (TableDataEn.assets?.nonCurrent) {
          setNonCurrentLabels(TableDataEn.assets.nonCurrent.nonCurrentLabels);
          setNonCurrentSubLabels(
            TableDataEn.assets.nonCurrent.nonCurrentSubLabels
          );
          ssetfirtsTotalnonCurrentAssets(
            TableDataEn.assets.nonCurrent.sfirtsTotalnonCurrentAssets
          );
          ssetnonCurrentAssets(TableDataEn.assets.nonCurrent.snonCurrentAssets);
          ssetTotalNonCurrentAssets(
            TableDataEn.assets.nonCurrent.stotalNonCurrentAssets
          );

          setNonCurrentAssets(
            TableDataEn.assets.nonCurrent.items || Array(12).fill("")
          );
          setNonCurrentSubAssets(
            TableDataEn.assets.nonCurrent.subItems || Array(3).fill("")
          );
          setNonCurrentNotes(TableDataEn.assets.nonCurrent.nonCurrentNotes);

          setNonCurrentAssetsDate2(
            TableDataEn.assets.nonCurrent.itemsDate2 || Array(12).fill("")
          );
          setNonCurrentSubAssetsDate2(
            TableDataEn.assets.nonCurrent.subItemsDate2 || Array(3).fill("")
          );
        }

        // Assets - Current
        if (TableDataEn.assets?.current) {
          ssetCurrentAssets(TableDataEn.assets?.current.scurrentAssets);
          ssetfirtsTotalCurrentAssets(
            TableDataEn.assets?.current.sfirtsTotalCurrentAssets
          );
          ssetTotalCurrentAssets(
            TableDataEn.assets?.current.stotalCurrentAssets
          );
          setCurrentLabels(TableDataEn.assets?.current.currentLabels);
          setCurrentSubLabels(TableDataEn.assets?.current.currentSubLabels);
          setCurrentAssets(
            TableDataEn.assets.current.items || Array(12).fill("")
          );
          setCurrentAssetsNotes(TableDataEn.assets.current.CurrentAssetsNotes);
          setCurrentSubAssets(
            TableDataEn.assets.current.subItems || Array(3).fill("")
          );
          setCurrentAssetsDate2(
            TableDataEn.assets.current.itemsDate2 || Array(12).fill("")
          );
          setCurrentSubAssetsDate2(
            TableDataEn.assets.current.subItemsDate2 || Array(3).fill("")
          );
        }

        // Equity
        if (TableDataEn.equity) {
          setEquityLabels(TableDataEn.equity.equityLabels);
          setEquitySubLabels(TableDataEn.equity.equitySubLabels);

          setShareholdersEquityandliabilities(
            TableDataEn.sShareholdersEquityandliabilitiess
          );
          setShareholdersEquity(TableDataEn.equity.sShareholdersEquity);
          ssetfirtsTotalShareholdersEquity(
            TableDataEn.equity.sfirtsTotalShareholdersEquity
          );
          ssetfirtsTotalShareholdersEquity(
            TableDataEn.equity.sfirtsTotalShareholdersEquity
          );
          setTotalShareholdersEquity(
            TableDataEn.equity.stotalShareholdersEquity
          );
          settotalEquityAndLiabilities(TableDataEn.stotalEquityAndLiabilities);

          setEquityItems(TableDataEn.equity.items || Array(12).fill(""));
          setEquityItemsNotes(TableDataEn.equity.equityItemsNotes);
          setEquitySubItems(TableDataEn.equity.subItems || Array(3).fill(""));
          setEquityItemsDate2(
            TableDataEn.equity.itemsDate2 || Array(12).fill("")
          );
          setEquitySubItemsDate2(
            TableDataEn.equity.subItemsDate2 || Array(3).fill("")
          );
        }

        // Liabilities - Non-Current
        if (TableDataEn.liabilities?.nonCurrent) {
          setLiabilities(TableDataEn.liabilities?.liabilities);
          setNoncurrentliabilities(
            TableDataEn.liabilities.nonCurrent.sNoncurrentliabilities
          );
          ssetfirtsNoncurrentLiabilities(
            TableDataEn.liabilities.nonCurrent.sfirtsTotalNoncurrentLiabilities
          );
          setNonCurrentLiabilitiesLabels(
            TableDataEn.liabilities.nonCurrent.NonCurrentLiabilitiesLabels
          );
          setNonCurrentSubLiabilitiesLabels(
            TableDataEn.liabilities.nonCurrent.NonCurrentLiabilitiesSubLabels
          );
          setTotalNoncurrentliabilities(
            TableDataEn.liabilities.nonCurrent.stotalNoncurrentliabilities
          );
          setTotalliabilities(TableDataEn.liabilities.stotalliabilities);

          setNonCurrentLiabilities(
            TableDataEn.liabilities.nonCurrent.items || Array(12).fill("")
          );
          setNonCurrentLiabilitiesNotes(
            TableDataEn.liabilities.nonCurrent.nonCurrentLiabilitiesNotes
          );
          setNonCurrentSubLiabilities(
            TableDataEn.liabilities.nonCurrent.subItems || Array(3).fill("")
          );

          setNonCurrentLiabilitiesDate2(
            TableDataEn.liabilities.nonCurrent.itemsDate2 || Array(12).fill("")
          );
          setNonCurrentSubLiabilitiesDate2(
            TableDataEn.liabilities.nonCurrent.subItemsDate2 ||
              Array(3).fill("")
          );
        }

        // Liabilities - Current
        if (TableDataEn.liabilities?.current) {
          setcurrentliabilities(
            TableDataEn.liabilities?.current.scurrentliabilities
          );
          setCurrentLiabilitiesLabels(
            TableDataEn.liabilities?.current.currentLiabilitiesLabels
          );
          ssetfirtscurrentLiabilities(
            TableDataEn.liabilities?.current.sfirtsTotalcurrentLiabilities
          );
          setCurrentSubLiabilitiesLabels(
            TableDataEn.liabilities?.current.currentLiabilitiesSubLabels
          );
          setTotalcurrentliabilities(
            TableDataEn.liabilities?.current.stotalcurrentliabilities
          );
          setTotalliabilities(TableDataEn.liabilities?.stotalliabilities);

          setCurrentLiabilities(
            TableDataEn.liabilities.current.items || Array(12).fill("")
          );
          setCurrentLiabilitiesNotes(
            TableDataEn.liabilities.current.currentLiabilitiesNotes
          );
          setCurrentSubLiabilities(
            TableDataEn.liabilities.current.subItems || Array(3).fill("")
          );

          setCurrentLiabilitiesDate2(
            TableDataEn.liabilities.current.itemsDate2 || Array(12).fill("")
          );
          setCurrentSubLiabilitiesDate2(
            TableDataEn.liabilities.current.subItemsDate2 || Array(3).fill("")
          );
        }
      }
    }, [TableDataEn]);

    useEffect(() => {
      try {
        prepareAndDispatchData();
      } catch (error) {
        console.log("useEffect error : ", error);
      }
    }, [
      nonCurrentLabelsAr,
      nonCurrentSubLabelsAr,
      currentSubLabelsAr,
      currentLabelsAr,
      equityLabelsAr,
      equitySubLabelsAr,
      currentLiabilitiesLabelsAr,
      currentSubLiabilitiesLabelsAr,
      nonCurrentLiabilitiesLabelsAr,
      nonCurrentSubLiabilitiesLabelsAr,

      sassets,
      snonCurrentAssets,
      sfirtsTotalnonCurrentAssets,
      stotalNonCurrentAssets,
      scurrentAssets,
      sfirtsTotalCurrentAssets,
      stotalCurrentAssets,
      stotalAssets,
      sShareholdersEquityandliabilitiess,
      sShareholdersEquity,
      sfirtsTotalShareholdersEquity,
      stotalShareholdersEquity,
      sliabilities,
      sNoncurrentliabilities,
      sfirtsTotalNoncurrentLiabilities,
      stotalNoncurrentliabilities,
      scurrentliabilities,
      sfirtsTotalcurrentLiabilities,
      stotalcurrentliabilities,
      stotalliabilities,
      stotalEquityAndLiabilities,

      data1EnN,
      data2EnN,
      nonCurrentAssetsAr,
      nonCurrentSubAssetsAr,
      nonCurrentAssetsDate2Ar,
      nonCurrentSubAssetsDate2Ar,
      nonCurrentNotes,

      // Assets - Current
      currentAssetsAr,
      currentSubAssetsAr,
      currentAssetsDate2Ar,
      currentSubAssetsDate2Ar,
      CurrentAssetsNotes,

      // Equity
      equityItemsAr,
      equitySubItemsAr,
      equityItemsDate2Ar,
      equitySubItemsDate2Ar,
      equityItemsNotes,

      // Liabilities - Non-Current
      nonCurrentLiabilitiesAr,
      nonCurrentLiabilitiesNotes,
      nonCurrentSubLiabilitiesAr,
      nonCurrentLiabilitiesDate2Ar,
      nonCurrentSubLiabilitiesDate2Ar,

      // Liabilities - Current
      currentLiabilitiesAr,
      currentLiabilitiesNotes,
      currentSubLiabilitiesAr,
      currentLiabilitiesDate2Ar,
      currentSubLiabilitiesDate2Ar,
    ]);

    const prepareAndDispatchData = async () => {
      const formData = {
        assets: {
          sassets: sassets,
          nonCurrent: {
            snonCurrentAssets: snonCurrentAssets,
            nonCurrentLabelsAr: nonCurrentLabelsAr,
            items: nonCurrentAssetsAr,
            itemsDate2: nonCurrentAssetsDate2Ar,
            nonCurrentNotes: nonCurrentNotes,

            nonCurrentSubLabelsAr: nonCurrentSubLabelsAr,
            subItems: nonCurrentSubAssetsAr,
            subItemsDate2: nonCurrentSubAssetsDate2Ar,
            sfirtsTotalnonCurrentAssets: sfirtsTotalnonCurrentAssets,
            firstTotal: firstTotalNonCurrent,
            firstTotalDate2: firstTotalNonCurrentDate2,
            secondTotal: secondTotalNonCurrent,
            secondTotalDate2: secondTotalNonCurrentDate2,
            stotalNonCurrentAssets: stotalNonCurrentAssets,
          },
          current: {
            scurrentAssets: scurrentAssets,
            currentLabelsAr: currentLabelsAr,
            items: currentAssetsAr,
            itemsDate2: currentAssetsDate2Ar,
            CurrentAssetsNotes: CurrentAssetsNotes,

            currentSubLabelsAr: currentSubLabelsAr,
            subItems: currentSubAssetsAr,
            subItemsDate2: currentSubAssetsDate2Ar,
            sfirtsTotalCurrentAssets: sfirtsTotalCurrentAssets,
            firstTotal: firstTotalCurrent,
            firstTotalDate2: firstTotalCurrentDate2,
            stotalCurrentAssets: stotalCurrentAssets,
            secondTotal: secondTotalCurrent,
            secondTotalDate2: secondTotalCurrentDate2,
          },
          stotalAssets: stotalAssets,
          totalAssets,
          totalAssetsDate2,
        },
        sShareholdersEquityandliabilitiess,
        equity: {
          sShareholdersEquity: sShareholdersEquity,
          equityLabelsAr: equityLabelsAr,
          equityItemsNotes: equityItemsNotes,
          items: equityItemsAr,
          itemsDate2: equityItemsDate2Ar,

          equitySubLabelsAr: equitySubLabelsAr,
          subItems: equitySubItemsAr,
          subItemsDate2: equitySubItemsDate2Ar,
          sfirtsTotalShareholdersEquity: sfirtsTotalShareholdersEquity,
          firstTotal: firstTotalEquity,
          firstTotalDate2: firstTotalEquityDate2,
          stotalShareholdersEquity: stotalShareholdersEquity,
          totalEquity,
          totalEquityDate2,
        },
        liabilities: {
          liabilities: sliabilities,
          nonCurrent: {
            sNoncurrentliabilities: sNoncurrentliabilities,
            nonCurrentLiabilitiesLabelsAr: nonCurrentLiabilitiesLabelsAr,
            nonCurrentLiabilitiesNotes: nonCurrentLiabilitiesNotes,
            items: nonCurrentLiabilitiesAr,
            itemsDate2: nonCurrentLiabilitiesDate2Ar,

            nonCurrentSubLiabilitiesLabelsAr: nonCurrentSubLiabilitiesLabelsAr,
            subItems: nonCurrentSubLiabilitiesAr,
            subItemsDate2: nonCurrentSubLiabilitiesDate2Ar,
            sfirtsTotalNoncurrentLiabilities: sfirtsTotalNoncurrentLiabilities,
            firstTotal: firstTotalNonCurrentLiabilities,
            firstTotalDate2: firstTotalNonCurrentLiabilitiesDate2,
            stotalNoncurrentliabilities: stotalNoncurrentliabilities,
            total: totalNonCurrentLiabilities,
            totalDate2: totalNonCurrentLiabilitiesDate2,
          },

          current: {
            scurrentliabilities: scurrentliabilities,
            currentLiabilitiesNotes: currentLiabilitiesNotes,
            items: currentLiabilitiesAr,
            itemsDate2: currentLiabilitiesDate2Ar,
            sfirtsTotalcurrentLiabilities: sfirtsTotalcurrentLiabilities,
            firstTotal: firstTotalCurrentLiabilities,
            firstTotalDate2: firstTotalCurrentLiabilitiesDate2,

            currentLiabilitiesLabelsAr: currentLiabilitiesLabelsAr,
            currentSubLiabilitiesLabelsAr: currentSubLiabilitiesLabelsAr,

            subItems: currentSubLiabilitiesAr,
            subItemsDate2: currentSubLiabilitiesDate2Ar,
            stotalcurrentliabilities: stotalcurrentliabilities,
            total: totalCurrentLiabilities,
            totalDate2: totalCurrentLiabilitiesDate2,
          },
          stotalliabilities: stotalliabilities,
          totalLiabilities,
          totalLiabilitiesDate2,
        },
        stotalEquityAndLiabilities: stotalEquityAndLiabilities,
        ItotalEquityAndLiabilities: totalEquityAndLiabilities,
        ItotalEquityAndLiabilitiesDate2: totalEquityAndLiabilitiesDate2,
        data1En: data1EnN,
        data2En: data2EnN,
      };

      await dispatch(setBalanceSheetDataAction(formData));
    };

    // const { data } = useSelector((state: RootState) => state.table);

    // useEffect(() => {
    //   if (data) {
    //     if (data.assets?.nonCurrent) {
    //       setNonCurrentAssets(
    //         data.assets.nonCurrent.items || Array(12).fill("")
    //       );
    //       setNonCurrentSubAssets(
    //         data.assets.nonCurrent.subItems || Array(3).fill("")
    //       );
    //       setNonCurrentNotes(data.assets.nonCurrent.nonCurrentNotes);

    //       setNonCurrentAssetsDate2(
    //         data.assets.nonCurrent.itemsDate2 || Array(12).fill("")
    //       ); 
    //       setNonCurrentSubAssetsDate2(
    //         data.assets.nonCurrent.subItemsDate2 || Array(3).fill("")
    //       );
    //     }

    //     // Assets - Current
    //     if (data.assets?.current) {
    //       setCurrentAssets(data.assets.current.items || Array(12).fill(""));
    //       setCurrentAssetsNotes(data.assets.current.CurrentAssetsNotes);
    //       setCurrentSubAssets(
    //         data.assets.current.subItems || Array(3).fill("")
    //       );

    //       setCurrentAssetsDate2(
    //         data.assets.current.itemsDate2 || Array(12).fill("")
    //       );
    //       setCurrentSubAssetsDate2(
    //         data.assets.current.subItemsDate2 || Array(3).fill("")
    //       );
    //     }

    //     // Equity
    //     if (data.equity) {
    //       setEquityItems(data.equity.items || Array(12).fill(""));
    //       setEquityItemsNotes(data.equity.equityItemsNotes);
    //       setEquitySubItems(data.equity.subItems || Array(3).fill(""));

    //       setEquityItemsDate2(data.equity.itemsDate2 || Array(12).fill(""));
    //       setEquitySubItemsDate2(
    //         data.equity.subItemsDate2 || Array(3).fill("")
    //       );
    //     }

    //     // Liabilities - Non-Current
    //     if (data.liabilities?.nonCurrent) {
    //       setNonCurrentLiabilities(
    //         data.liabilities.nonCurrent.items || Array(12).fill("")
    //       );
    //       setNonCurrentLiabilitiesNotes(
    //         data.liabilities.nonCurrent.nonCurrentLiabilitiesNotes
    //       );
    //       setNonCurrentSubLiabilities(
    //         data.liabilities.nonCurrent.subItems || Array(3).fill("")
    //       );

    //       setNonCurrentLiabilitiesDate2(
    //         data.liabilities.nonCurrent.itemsDate2 || Array(12).fill("")
    //       );
    //       setNonCurrentSubLiabilitiesDate2(
    //         data.liabilities.nonCurrent.subItemsDate2 || Array(3).fill("")
    //       );
    //     }

    //     // Liabilities - Current
    //     if (data.liabilities?.current) {
    //       setCurrentLiabilities(
    //         data.liabilities.current.items || Array(12).fill("")
    //       );
    //       setCurrentLiabilitiesNotes(
    //         data.liabilities.current.currentLiabilitiesNotes
    //       );
    //       setCurrentSubLiabilities(
    //         data.liabilities.current.subItems || Array(3).fill("")
    //       );

    //       setCurrentLiabilitiesDate2(
    //         data.liabilities.current.itemsDate2 || Array(12).fill("")
    //       );
    //       setCurrentSubLiabilitiesDate2(
    //         data.liabilities.current.subItemsDate2 || Array(3).fill("")
    //       );
    //     }
    //   }
    // }, [data]);

    // const { assets, equity, liabilities, ItotalEquityAndLiabilitiesDate2, ItotalEquityAndLiabilities } = data
    return (
      <div className="flex justify-start   my-2 text-black">
        <table className="border font-semibold border-gray-300 text-xs mb-12 table-fixed ">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-100 w-96"></th>
              <th className="border border-gray-100 w-16">Notes</th>
              <th className="border border-gray-100 p-1 w-28   ">
                <input
                  type="date"
                  className="text-center text-align:right;  bg-gray-100"
                  placeholder=""
                  value={
                    data1EnN instanceof Date && !isNaN(data1EnN.getTime())
                      ? data1EnN.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    setDate1En(selectedDate ? new Date(selectedDate) : null);
                  }}
                />

                <input
                  placeholder=""
                  value={date1}
                  onChange={(e) => setDate1(e.target.value)}
                  className="w-full text-center bg-gray-100 fext-row"
                />
                <div
                  dir="ltr"
                  className="flex items-center justify-center bg-gray-100 w-full   rounded"
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
                    className="w-8 selection: text-center bg-gray-100 focus:outline-none"
                    type="text"
                  />
                </div>
              </th>
              <th className="border   border-gray-100 p-1 w-28 ">
                <input
                  value={
                    data2EnN instanceof Date && !isNaN(data2EnN.getTime())
                      ? data2EnN.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    setDate2En(value ? new Date(value) : null);
                  }}
                  placeholder=""
                  className="text-center bg-gray-100"
                  type="date"
                />

                <input
                  placeholder=""
                  value={date2}
                  onChange={(e) => setDate2(e.target.value)}
                  className="w-full text-center bg-gray-100 fext-row"
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
            <tr className="bg-gray-400  text-sm font-semibold">
              <td colSpan={4} className="p-1">
                <input
                  placeholder=""
                  value={sassets}
                  onChange={(e) => setAssets(e.target.value)}
                  className=" text-start   bg-gray-400 fext-row"
                />
              </td>
            </tr>

            <tr className="bg-gray-200 font-medium">
              <td colSpan={4} className="p-1">
                <input
                  placeholder=""
                  value={snonCurrentAssets}
                  onChange={(e) => ssetnonCurrentAssets(e.target.value)}
                  className=" text-start  w-full bg-gray-200 fext-row"
                />
              </td>
            </tr>

            {nonCurrentAssetsAr.map((val, idx) => {
              return (
                <tr key={`non-current-${idx}`} className="bg-gray-100">
                  <td className="border border-gray-300">
                    <input
                      className="w-full h-7   bg-gray-100 text-black p-1"
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
                        className="w-full  bg-gray-100 text-black p-1"
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
                      className="w-full bg-gray-100 text-black p-1"
                      placeholder=""
                      value={val}
                      onKeyDown={(e) => {
                        const input = e.currentTarget;
                        const caretPos = input.selectionStart ?? 0;

                        // Only handle Backspace when caret is at the end and value ends with ')'
                        if (
                          e.key === "Backspace" &&
                          caretPos === input.value.length &&
                          input.value.endsWith(")")
                        ) {
                          e.preventDefault();
                          const newVal = input.value.slice(0, -1); // remove last ')'
                          handleChange(idx, newVal, "nonCurrent");
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        // Special case: user is typing just "-"
                        if (inputValue === "-") {
                          handleChange(idx, "-", "nonCurrent");
                          return;
                        }

                        // Remove formatting (commas, parentheses, spaces)
                        let rawValue = inputValue.replace(/[(),\s]/g, "");

                        // Check if negative number (starts with "-" or "(")
                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");

                        // Strip the minus sign for digit-only processing
                        rawValue = rawValue.replace(/^-/, "");

                        // Only allow digits
                        if (!/^\d*$/.test(rawValue)) return;

                        // Remove leading zeros
                        rawValue = rawValue.replace(/^0+(?=\d)/, "");

                        // Special case: Input is zero → treat as "-"
                        if (rawValue === "0") {
                          handleChange(idx, "-", "nonCurrent");
                          return;
                        }

                        // Handle case where the value is empty after backspace (clear all)
                        if (rawValue === "") {
                          handleChange(idx, "", "nonCurrent");
                          return;
                        }

                        // Format the number with commas
                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );

                        // Final value with parentheses for negative numbers
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        // Update the value in the parent component
                        handleChange(idx, finalValue, "nonCurrent");

                        // Optional: Restore caret position after formatting
                        setTimeout(() => {
                          const newLength = finalValue.length;
                          const offset = newLength - inputValue.length;
                          const newPos = caretPos + offset;
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }}
                    />
                  </td>

                  <td className="border border-gray-300">
                    <input
                      className=" w-full bg-gray-100 text-black p-1"
                      value={nonCurrentAssetsDate2Ar[idx]}
                      onKeyDown={(e) => {
                        const input = e.currentTarget;
                        const caretPos = input.selectionStart ?? 0;

                        // Only handle Backspace when caret is at the end and value ends with ')'
                        if (
                          e.key === "Backspace" &&
                          caretPos === input.value.length &&
                          input.value.endsWith(")")
                        ) {
                          e.preventDefault();
                          const newVal = input.value.slice(0, -1); // remove last ')'
                          handleChange(idx, newVal, "nonCurrent", "date2");
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        // Special case: user is typing just "-"
                        if (inputValue === "-") {
                          handleChange(idx, "-", "nonCurrent", "date2");
                          return;
                        }

                        // Remove formatting (commas, parentheses, spaces)
                        let rawValue = inputValue.replace(/[(),\s]/g, "");

                        // Check if negative number (starts with "-" or "(")
                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");

                        // Strip the minus sign for digit-only processing
                        rawValue = rawValue.replace(/^-/, "");

                        // Only allow digits
                        if (!/^\d*$/.test(rawValue)) return;

                        // Remove leading zeros
                        rawValue = rawValue.replace(/^0+(?=\d)/, "");

                        // Special case: Input is zero → treat as "-"
                        if (rawValue === "0") {
                          handleChange(idx, "-", "nonCurrent", "date2");
                          return;
                        }

                        // Handle case where the value is empty after backspace (clear all)
                        if (rawValue === "") {
                          handleChange(idx, "", "nonCurrent", "date2");
                          return;
                        }

                        // Format the number with commas
                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );

                        // Final value with parentheses for negative numbers
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        // Update the value in the parent component
                        handleChange(idx, finalValue, "nonCurrent", "date2");

                        // Optional: Restore caret position after formatting
                        setTimeout(() => {
                          const newLength = finalValue.length;
                          const offset = newLength - inputValue.length;
                          const newPos = caretPos + offset;
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }}
                    />
                  </td>
                </tr>
              );
            })}

            <tr className="bg-gray-200 font-semibold">
              <td className="">
                <input
                  value={sfirtsTotalnonCurrentAssets}
                  onChange={(e) =>
                    ssetfirtsTotalnonCurrentAssets(e.target.value)
                  }
                  className="w-full bg-gray-200 text-black p-1"
                />
              </td>
              <td className="border border-gray-300"></td>
              <td className="border  border-gray-300">
                {formatWithParentheses(firstTotalNonCurrent)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(firstTotalNonCurrentDate2)}
              </td>
            </tr>

            {nonCurrentSubAssetsAr.map((val, idx) => {
              return (
                <tr key={`sub-non-${idx}`} className="bg-gray-100">
                  <td className="border border-gray-300">
                    <input
                      className="w-full  bg-gray-100 text-black p-1"
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
                    <input className="w-full bg-gray-100 text-black " />
                  </td>
                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      value={val}
                      onKeyDown={(e) => {
                        const input = e.currentTarget;
                        const caretPos = input.selectionStart ?? 0;

                        // Only handle Backspace when caret is at the end and value ends with ')'
                        if (
                          e.key === "Backspace" &&
                          caretPos === input.value.length &&
                          input.value.endsWith(")")
                        ) {
                          e.preventDefault();
                          const newVal = input.value.slice(0, -1); // remove last ')'
                          handleChange(idx, newVal, "nonCurrentSub");
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        // Special case: user is typing just "-"
                        if (inputValue === "-") {
                          handleChange(idx, "-", "nonCurrentSub");
                          return;
                        }

                        // Remove formatting (commas, parentheses, spaces)
                        let rawValue = inputValue.replace(/[(),\s]/g, "");

                        // Check if negative number (starts with "-" or "(")
                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");

                        // Strip the minus sign for digit-only processing
                        rawValue = rawValue.replace(/^-/, "");

                        // Only allow digits
                        if (!/^\d*$/.test(rawValue)) return;

                        // Remove leading zeros
                        rawValue = rawValue.replace(/^0+(?=\d)/, "");

                        // Special case: Input is zero → treat as "-"
                        if (rawValue === "0") {
                          handleChange(idx, "-", "nonCurrentSub");
                          return;
                        }

                        // Handle case where the value is empty after backspace (clear all)
                        if (rawValue === "") {
                          handleChange(idx, "", "nonCurrentSub");
                          return;
                        }

                        // Format the number with commas
                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );

                        // Final value with parentheses for negative numbers
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        // Update the value in the parent component
                        handleChange(idx, finalValue, "nonCurrentSub");

                        // Optional: Restore caret position after formatting
                        setTimeout(() => {
                          const newLength = finalValue.length;
                          const offset = newLength - inputValue.length;
                          const newPos = caretPos + offset;
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }}
                    />
                  </td>

                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      value={nonCurrentSubAssetsDate2Ar[idx]}
                      placeholder=""
                      onKeyDown={(e) => {
                        const input = e.currentTarget;
                        const caretPos = input.selectionStart ?? 0;

                        // Only handle Backspace when caret is at the end and value ends with ')'
                        if (
                          e.key === "Backspace" &&
                          caretPos === input.value.length &&
                          input.value.endsWith(")")
                        ) {
                          e.preventDefault();
                          const newVal = input.value.slice(0, -1); // remove last ')'
                          handleChange(idx, newVal, "nonCurrentSub", "date2");
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        // Special case: user is typing just "-"
                        if (inputValue === "-") {
                          handleChange(idx, "-", "nonCurrentSub", "date2");
                          return;
                        }

                        // Remove formatting (commas, parentheses, spaces)
                        let rawValue = inputValue.replace(/[(),\s]/g, "");

                        // Check if negative number (starts with "-" or "(")
                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");

                        // Strip the minus sign for digit-only processing
                        rawValue = rawValue.replace(/^-/, "");

                        // Only allow digits
                        if (!/^\d*$/.test(rawValue)) return;

                        // Remove leading zeros
                        rawValue = rawValue.replace(/^0+(?=\d)/, "");

                        // Special case: Input is zero → treat as "-"
                        if (rawValue === "0") {
                          handleChange(idx, "-", "nonCurrentSub", "date2");
                          return;
                        }

                        // Handle case where the value is empty after backspace (clear all)
                        if (rawValue === "") {
                          handleChange(idx, "", "nonCurrentSub", "date2");
                          return;
                        }

                        // Format the number with commas
                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );

                        // Final value with parentheses for negative numbers
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        // Update the value in the parent component
                        handleChange(idx, finalValue, "nonCurrentSub", "date2");

                        // Optional: Restore caret position after formatting
                        setTimeout(() => {
                          const newLength = finalValue.length;
                          const offset = newLength - inputValue.length;
                          const newPos = caretPos + offset;
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }}
                    />
                  </td>
                </tr>
              );
            })}

            <tr className="bg-gray-100 font-semibold">
              <td className="border border-gray-300">
                <input
                  placeholder=""
                  value={stotalNonCurrentAssets}
                  onChange={(e) => ssetTotalNonCurrentAssets(e.target.value)}
                  className=" text-start p-0.5  w-full bg-gray-200  fext-row"
                />
              </td>

              <td className="border border-gray-300 bg-gray-200 p-1"></td>

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
              <td colSpan={4} className="p-0.5 ">
                <input
                  placeholder=""
                  value={scurrentAssets}
                  onChange={(e) => ssetCurrentAssets(e.target.value)}
                  className=" text-start   bg-gray-200 fext-row"
                />
              </td>
            </tr>

            {currentAssetsAr.map((val, idx) => {
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
                      onKeyDown={(e) => {
                        const input = e.currentTarget;
                        const caretPos = input.selectionStart ?? 0;

                        // Handle Backspace at end if value ends with ')'
                        if (
                          e.key === "Backspace" &&
                          caretPos === input.value.length &&
                          input.value.endsWith(")")
                        ) {
                          e.preventDefault();
                          const newVal = input.value.slice(0, -1); // Remove last ')'
                          handleChange(idx, newVal, "current");
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        // Just "-" entered
                        if (inputValue === "-") {
                          handleChange(idx, "-", "current");
                          return;
                        }

                        // Remove formatting (commas, parens, spaces)
                        let rawValue = inputValue.replace(/[(),\s]/g, "");

                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");

                        // Strip any "-"
                        rawValue = rawValue.replace(/^-/, "");

                        // Allow only digits
                        if (!/^\d*$/.test(rawValue)) return;

                        // Remove leading zeros
                        rawValue = rawValue.replace(/^0+(?=\d)/, "");

                        // Handle zero
                        if (rawValue === "0") {
                          handleChange(idx, "-", "current");
                          return;
                        }

                        // Handle empty input
                        if (rawValue === "") {
                          handleChange(idx, "", "current");
                          return;
                        }

                        // Format with commas
                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );

                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        // Update value
                        handleChange(idx, finalValue, "current");

                        // Adjust caret
                        setTimeout(() => {
                          const newLength = finalValue.length;
                          const offset = newLength - inputValue.length;
                          const newPos = caretPos + offset;
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }}
                    />
                  </td>

                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      placeholder=""
                      value={currentAssetsDate2Ar[idx]}
                      onKeyDown={(e) => {
                        const input = e.currentTarget;
                        const caretPos = input.selectionStart ?? 0;

                        // Handle backspace when value ends with ")"
                        if (
                          e.key === "Backspace" &&
                          caretPos === input.value.length &&
                          input.value.endsWith(")")
                        ) {
                          e.preventDefault();
                          const newVal = input.value.slice(0, -1); // Remove last ')'
                          handleChange(idx, newVal, "current", "date2");
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        // If just "-" typed
                        if (inputValue === "-") {
                          handleChange(idx, "-", "current", "date2");
                          return;
                        }

                        // Remove formatting: commas, parentheses, spaces
                        let rawValue = inputValue.replace(/[(),\s]/g, "");

                        // Check for negative
                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");

                        // Remove minus sign if any
                        rawValue = rawValue.replace(/^-/, "");

                        // Only allow digits
                        if (!/^\d*$/.test(rawValue)) return;

                        // Remove leading zeros
                        rawValue = rawValue.replace(/^0+(?=\d)/, "");

                        // If zero input
                        if (rawValue === "0") {
                          handleChange(idx, "-", "current", "date2");
                          return;
                        }

                        // If value empty
                        if (rawValue === "") {
                          handleChange(idx, "", "current", "date2");
                          return;
                        }

                        // Format with commas
                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );

                        // Wrap with parentheses if negative
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        // Send to parent
                        handleChange(idx, finalValue, "current", "date2");

                        // Restore caret
                        setTimeout(() => {
                          const newLength = finalValue.length;
                          const offset = newLength - inputValue.length;
                          const newPos = caretPos + offset;
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }}
                    />
                  </td>
                </tr>
              );
            })}

            <tr className="bg-gray-200 font-semibold">
              <td className="">
                <input
                  value={sfirtsTotalCurrentAssets}
                  onChange={(e) => ssetfirtsTotalCurrentAssets(e.target.value)}
                  className="w-full bg-gray-200 text-black p-1"
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

            {currentSubAssetsAr.map((val, idx) => {
              return (
                <tr key={`sub-current-${idx}`} className="bg-gray-100">
                  <td className="border border-gray-300">
                    <input
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
                    <input className="w-full bg-gray-100 text-black p-1" />
                  </td>

                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      value={val}
                      onKeyDown={(e) => {
                        const input = e.currentTarget;
                        const caretPos = input.selectionStart ?? 0;

                        if (
                          e.key === "Backspace" &&
                          caretPos === input.value.length &&
                          input.value.endsWith(")")
                        ) {
                          e.preventDefault();
                          const newVal = input.value.slice(0, -1);
                          handleChange(idx, newVal, "currentSub");
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        if (inputValue === "-") {
                          handleChange(idx, "-", "currentSub");
                          return;
                        }

                        let rawValue = inputValue.replace(/[(),\s]/g, "");
                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");
                        rawValue = rawValue.replace(/^-/, "");

                        if (!/^\d*$/.test(rawValue)) return;
                        rawValue = rawValue.replace(/^0+(?=\d)/, "");

                        if (rawValue === "0") {
                          handleChange(idx, "-", "currentSub");
                          return;
                        }

                        if (rawValue === "") {
                          handleChange(idx, "", "currentSub");
                          return;
                        }

                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        handleChange(idx, finalValue, "currentSub");

                        setTimeout(() => {
                          const newLength = finalValue.length;
                          const offset = newLength - inputValue.length;
                          const newPos = caretPos + offset;
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }}
                    />
                  </td>

                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      value={currentSubAssetsDate2Ar[idx]}
                      onKeyDown={(e) => {
                        const input = e.currentTarget;
                        const caretPos = input.selectionStart ?? 0;

                        if (
                          e.key === "Backspace" &&
                          caretPos === input.value.length &&
                          input.value.endsWith(")")
                        ) {
                          e.preventDefault();
                          const newVal = input.value.slice(0, -1);
                          handleChange(idx, newVal, "currentSub", "date2");
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        if (inputValue === "-") {
                          handleChange(idx, "-", "currentSub", "date2");
                          return;
                        }

                        let rawValue = inputValue.replace(/[(),\s]/g, "");
                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");
                        rawValue = rawValue.replace(/^-/, "");

                        if (!/^\d*$/.test(rawValue)) return;
                        rawValue = rawValue.replace(/^0+(?=\d)/, "");

                        if (rawValue === "0") {
                          handleChange(idx, "-", "currentSub", "date2");
                          return;
                        }

                        if (rawValue === "") {
                          handleChange(idx, "", "currentSub", "date2");
                          return;
                        }

                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        handleChange(idx, finalValue, "currentSub", "date2");

                        setTimeout(() => {
                          const newLength = finalValue.length;
                          const offset = newLength - inputValue.length;
                          const newPos = caretPos + offset;
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }}
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
                  className=" text-start p-0.5   bg-gray-200 fext-row"
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
            <tr className="bg-gray-400  font-semibold">
              <td colSpan={4} className="p-1">
                <input
                  placeholder=""
                  value={sShareholdersEquityandliabilitiess}
                  onChange={(e) =>
                    setShareholdersEquityandliabilities(e.target.value)
                  }
                  className=" text-start w-full   bg-gray-400 fext-row"
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
                />
              </td>
            </tr>

            {equityItemsAr.map((val, idx) => {
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
                      onKeyDown={(e) => {
                        const input = e.currentTarget;
                        const caretPos = input.selectionStart ?? 0;

                        if (
                          e.key === "Backspace" &&
                          caretPos === input.value.length &&
                          input.value.endsWith(")")
                        ) {
                          e.preventDefault();
                          const newVal = input.value.slice(0, -1);
                          handleChange(idx, newVal, "equity");
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        if (inputValue === "-") {
                          handleChange(idx, "-", "equity");
                          return;
                        }

                        let rawValue = inputValue.replace(/[(),\s]/g, "");
                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");
                        rawValue = rawValue.replace(/^-/, "");

                        if (!/^\d*$/.test(rawValue)) return;
                        rawValue = rawValue.replace(/^0+(?=\d)/, "");

                        if (rawValue === "0") {
                          handleChange(idx, "-", "equity");
                          return;
                        }

                        if (rawValue === "") {
                          handleChange(idx, "", "equity");
                          return;
                        }

                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        handleChange(idx, finalValue, "equity");

                        setTimeout(() => {
                          const newLength = finalValue.length;
                          const offset = newLength - inputValue.length;
                          const newPos = caretPos + offset;
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }}
                    />
                  </td>

                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      value={equityItemsDate2Ar[idx]}
                      onKeyDown={(e) => {
                        const input = e.currentTarget;
                        const caretPos = input.selectionStart ?? 0;

                        if (
                          e.key === "Backspace" &&
                          caretPos === input.value.length &&
                          input.value.endsWith(")")
                        ) {
                          e.preventDefault();
                          const newVal = input.value.slice(0, -1);
                          handleChange(idx, newVal, "equity", "date2");
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        if (inputValue === "-") {
                          handleChange(idx, "-", "equity", "date2");
                          return;
                        }

                        let rawValue = inputValue.replace(/[(),\s]/g, "");
                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");
                        rawValue = rawValue.replace(/^-/, "");

                        if (!/^\d*$/.test(rawValue)) return;
                        rawValue = rawValue.replace(/^0+(?=\d)/, "");

                        if (rawValue === "0") {
                          handleChange(idx, "-", "equity", "date2");
                          return;
                        }

                        if (rawValue === "") {
                          handleChange(idx, "", "equity", "date2");
                          return;
                        }

                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        handleChange(idx, finalValue, "equity", "date2");

                        setTimeout(() => {
                          const newLength = finalValue.length;
                          const offset = newLength - inputValue.length;
                          const newPos = caretPos + offset;
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }}
                    />
                  </td>
                </tr>
              );
            })}

            <tr className="bg-gray-200 font-semibold">
              <input
                value={sfirtsTotalShareholdersEquity}
                onChange={(e) =>
                  ssetfirtsTotalShareholdersEquity(e.target.value)
                }
                className="w-full bg-gray-200 text-black p-1"
              />
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300">
                {formatWithParentheses(firstTotalEquity)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(firstTotalEquityDate2)}
              </td>
            </tr>

            {equitySubItemsAr.map((val, idx) => {
              return (
                <tr key={`sub-equity-${idx}`} className="bg-gray-100">
                  <td className="border border-gray-300">
                    <h1></h1>
                    <input
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
                    <input className="w-full bg-gray-100 text-black p-1" />
                  </td>

                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      value={val}
                      onKeyDown={(e) => {
                        const input = e.currentTarget;
                        const caretPos = input.selectionStart ?? 0;

                        if (
                          e.key === "Backspace" &&
                          caretPos === input.value.length &&
                          input.value.endsWith(")")
                        ) {
                          e.preventDefault();
                          const newVal = input.value.slice(0, -1);
                          handleChange(idx, newVal, "equitySub");
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        if (inputValue === "-") {
                          handleChange(idx, "-", "equitySub");
                          return;
                        }

                        let rawValue = inputValue.replace(/[(),\s]/g, "");
                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");
                        rawValue = rawValue.replace(/^-/, "");

                        if (!/^\d*$/.test(rawValue)) return;
                        rawValue = rawValue.replace(/^0+(?=\d)/, "");

                        if (rawValue === "0") {
                          handleChange(idx, "-", "equitySub");
                          return;
                        }

                        if (rawValue === "") {
                          handleChange(idx, "", "equitySub");
                          return;
                        }

                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        handleChange(idx, finalValue, "equitySub");

                        setTimeout(() => {
                          const newLength = finalValue.length;
                          const offset = newLength - inputValue.length;
                          const newPos = caretPos + offset;
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }}
                    />
                  </td>

                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      value={equitySubItemsDate2Ar[idx]}
                      onKeyDown={(e) => {
                        const input = e.currentTarget;
                        const caretPos = input.selectionStart ?? 0;

                        if (
                          e.key === "Backspace" &&
                          caretPos === input.value.length &&
                          input.value.endsWith(")")
                        ) {
                          e.preventDefault();
                          const newVal = input.value.slice(0, -1);
                          handleChange(idx, newVal, "equitySub", "date2");
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        if (inputValue === "-") {
                          handleChange(idx, "-", "equitySub", "date2");
                          return;
                        }

                        let rawValue = inputValue.replace(/[(),\s]/g, "");
                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");
                        rawValue = rawValue.replace(/^-/, "");

                        if (!/^\d*$/.test(rawValue)) return;
                        rawValue = rawValue.replace(/^0+(?=\d)/, "");

                        if (rawValue === "0") {
                          handleChange(idx, "-", "equitySub", "date2");
                          return;
                        }

                        if (rawValue === "") {
                          handleChange(idx, "", "equitySub", "date2");
                          return;
                        }

                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        handleChange(idx, finalValue, "equitySub", "date2");

                        setTimeout(() => {
                          const newLength = finalValue.length;
                          const offset = newLength - inputValue.length;
                          const newPos = caretPos + offset;
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }}
                    />
                  </td>
                </tr>
              );
            })}

            <tr className="bg-gray-300 border-gray-300  font-bold">
              <td className="">
                {" "}
                <input
                  placeholder=""
                  value={stotalShareholdersEquity}
                  onChange={(e) => setTotalShareholdersEquity(e.target.value)}
                  className=" text-start w-full bg-gray-300 p-0.5 "
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
                  value={sliabilities}
                  onChange={(e) => setLiabilities(e.target.value)}
                  className=" text-start  p-0.5 w-full font-bold   bg-gray-300  fext-row"
                />
              </td>
            </tr>
            <tr className="bg-gray-200   font-semibold ">
              <td colSpan={4} className="">
                <input
                  value={sNoncurrentliabilities}
                  onChange={(e) => setNoncurrentliabilities(e.target.value)}
                  className="text-start w-full   p-0.5  bg-gray-200 fext-row"
                />
              </td>
            </tr>

            {nonCurrentLiabilitiesAr.map((val, idx) => {
              return (
                <tr
                  key={`non-current-liability-${idx}`}
                  className="bg-gray-100"
                >
                  <td className="border border-gray-300">
                    <input
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
                      onKeyDown={(e) => {
                        const input = e.currentTarget;
                        const caretPos = input.selectionStart ?? 0;

                        if (
                          e.key === "Backspace" &&
                          caretPos === input.value.length &&
                          input.value.endsWith(")")
                        ) {
                          e.preventDefault();
                          const newVal = input.value.slice(0, -1);
                          handleChange(idx, newVal, "nonCurrentLiability");
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        if (inputValue === "-") {
                          handleChange(idx, "-", "nonCurrentLiability");
                          return;
                        }

                        let rawValue = inputValue.replace(/[(),\s]/g, "");
                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");
                        rawValue = rawValue.replace(/^-/, "");

                        if (!/^\d*$/.test(rawValue)) return;
                        rawValue = rawValue.replace(/^0+(?=\d)/, "");

                        if (rawValue === "0") {
                          handleChange(idx, "-", "nonCurrentLiability");
                          return;
                        }

                        if (rawValue === "") {
                          handleChange(idx, "", "nonCurrentLiability");
                          return;
                        }

                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        handleChange(idx, finalValue, "nonCurrentLiability");

                        setTimeout(() => {
                          const newLength = finalValue.length;
                          const offset = newLength - inputValue.length;
                          const newPos = caretPos + offset;
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }}
                    />
                  </td>

                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      value={nonCurrentLiabilitiesDate2Ar[idx]}
                      onKeyDown={(e) => {
                        const input = e.currentTarget;
                        const caretPos = input.selectionStart ?? 0;

                        if (
                          e.key === "Backspace" &&
                          caretPos === input.value.length &&
                          input.value.endsWith(")")
                        ) {
                          e.preventDefault();
                          const newVal = input.value.slice(0, -1);
                          handleChange(
                            idx,
                            newVal,
                            "nonCurrentLiability",
                            "date2"
                          );
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        if (inputValue === "-") {
                          handleChange(
                            idx,
                            "-",
                            "nonCurrentLiability",
                            "date2"
                          );
                          return;
                        }

                        let rawValue = inputValue.replace(/[(),\s]/g, "");
                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");
                        rawValue = rawValue.replace(/^-/, "");

                        if (!/^\d*$/.test(rawValue)) return;
                        rawValue = rawValue.replace(/^0+(?=\d)/, "");

                        if (rawValue === "0") {
                          handleChange(
                            idx,
                            "-",
                            "nonCurrentLiability",
                            "date2"
                          );
                          return;
                        }

                        if (rawValue === "") {
                          handleChange(idx, "", "nonCurrentLiability", "date2");
                          return;
                        }

                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        handleChange(
                          idx,
                          finalValue,
                          "nonCurrentLiability",
                          "date2"
                        );

                        setTimeout(() => {
                          const newLength = finalValue.length;
                          const offset = newLength - inputValue.length;
                          const newPos = caretPos + offset;
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }}
                    />
                  </td>
                </tr>
              );
            })}

            <tr className="bg-gray-200 font-semibold">
              <td className="">
                <input
                  value={sfirtsTotalNoncurrentLiabilities}
                  onChange={(e) =>
                    ssetfirtsNoncurrentLiabilities(e.target.value)
                  }
                  className="w-full bg-gray-200 text-black p-1"
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

            {nonCurrentSubLiabilitiesAr.map((val, idx) => {
              return (
                <tr
                  key={`sub-non-current-liability-${idx}`}
                  className="bg-gray-100"
                >
                  <td className="border border-gray-300">
                    <input
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
                    <input className="w-full bg-gray-100 text-black p-1" />
                  </td>
                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      value={val}
                      onKeyDown={(e) => {
                        const input = e.currentTarget;
                        const caretPos = input.selectionStart ?? 0;

                        if (
                          e.key === "Backspace" &&
                          caretPos === input.value.length &&
                          input.value.endsWith(")")
                        ) {
                          e.preventDefault();
                          const newVal = input.value.slice(0, -1);
                          handleChange(idx, newVal, "nonCurrentSubLiability");
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        if (inputValue === "-") {
                          handleChange(idx, "-", "nonCurrentSubLiability");
                          return;
                        }

                        let rawValue = inputValue.replace(/[(),\s]/g, "");
                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");
                        rawValue = rawValue.replace(/^-/, "");

                        if (!/^\d*$/.test(rawValue)) return;
                        rawValue = rawValue.replace(/^0+(?=\d)/, "");

                        if (rawValue === "0") {
                          handleChange(idx, "-", "nonCurrentSubLiability");
                          return;
                        }

                        if (rawValue === "") {
                          handleChange(idx, "", "nonCurrentSubLiability");
                          return;
                        }

                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        handleChange(idx, finalValue, "nonCurrentSubLiability");

                        setTimeout(() => {
                          const newLength = finalValue.length;
                          const offset = newLength - inputValue.length;
                          const newPos = caretPos + offset;
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }}
                    />
                  </td>

                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      value={nonCurrentSubLiabilitiesDate2Ar[idx]}
                      onKeyDown={(e) => {
                        const input = e.currentTarget;
                        const caretPos = input.selectionStart ?? 0;

                        if (
                          e.key === "Backspace" &&
                          caretPos === input.value.length &&
                          input.value.endsWith(")")
                        ) {
                          e.preventDefault();
                          const newVal = input.value.slice(0, -1);
                          handleChange(
                            idx,
                            newVal,
                            "nonCurrentSubLiability",
                            "date2"
                          );
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        if (inputValue === "-") {
                          handleChange(
                            idx,
                            "-",
                            "nonCurrentSubLiability",
                            "date2"
                          );
                          return;
                        }

                        let rawValue = inputValue.replace(/[(),\s]/g, "");
                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");
                        rawValue = rawValue.replace(/^-/, "");

                        if (!/^\d*$/.test(rawValue)) return;
                        rawValue = rawValue.replace(/^0+(?=\d)/, "");

                        if (rawValue === "0") {
                          handleChange(
                            idx,
                            "-",
                            "nonCurrentSubLiability",
                            "date2"
                          );
                          return;
                        }

                        if (rawValue === "") {
                          handleChange(
                            idx,
                            "",
                            "nonCurrentSubLiability",
                            "date2"
                          );
                          return;
                        }

                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        handleChange(
                          idx,
                          finalValue,
                          "nonCurrentSubLiability",
                          "date2"
                        );

                        setTimeout(() => {
                          const newLength = finalValue.length;
                          const offset = newLength - inputValue.length;
                          const newPos = caretPos + offset;
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }}
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

            <tr className="bg-gray-200 font-semibold">
              <td colSpan={4} className="p-0.5">
                <input
                  placeholder=""
                  value={scurrentliabilities}
                  onChange={(e) => setcurrentliabilities(e.target.value)}
                  className=" text-start w-full   bg-gray-200 fext-row"
                />
              </td>
            </tr>

            {currentLiabilitiesAr.map((val, idx) => {
              return (
                <tr key={`current-liability-${idx}`} className="bg-gray-100">
                  <td className="border border-gray-300">
                    <input
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
                      onKeyDown={(e) => {
                        const input = e.currentTarget;
                        const caretPos = input.selectionStart ?? 0;

                        if (
                          e.key === "Backspace" &&
                          caretPos === input.value.length &&
                          input.value.endsWith(")")
                        ) {
                          e.preventDefault();
                          const newVal = input.value.slice(0, -1);
                          handleChange(idx, newVal, "currentLiability");
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        if (inputValue === "-") {
                          handleChange(idx, "-", "currentLiability");
                          return;
                        }

                        let rawValue = inputValue.replace(/[(),\s]/g, "");
                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");
                        rawValue = rawValue.replace(/^-/, "");

                        if (!/^\d*$/.test(rawValue)) return;
                        rawValue = rawValue.replace(/^0+(?=\d)/, "");

                        if (rawValue === "0") {
                          handleChange(idx, "-", "currentLiability");
                          return;
                        }

                        if (rawValue === "") {
                          handleChange(idx, "", "currentLiability");
                          return;
                        }

                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        handleChange(idx, finalValue, "currentLiability");

                        setTimeout(() => {
                          const newLength = finalValue.length;
                          const offset = newLength - inputValue.length;
                          const newPos = caretPos + offset;
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }}
                    />
                  </td>

                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      value={currentLiabilitiesDate2Ar[idx]}
                      onKeyDown={(e) => {
                        const input = e.currentTarget;
                        const caretPos = input.selectionStart ?? 0;

                        if (
                          e.key === "Backspace" &&
                          caretPos === input.value.length &&
                          input.value.endsWith(")")
                        ) {
                          e.preventDefault();
                          const newVal = input.value.slice(0, -1);
                          handleChange(
                            idx,
                            newVal,
                            "currentLiability",
                            "date2"
                          );
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        if (inputValue === "-") {
                          handleChange(idx, "-", "currentLiability", "date2");
                          return;
                        }

                        let rawValue = inputValue.replace(/[(),\s]/g, "");
                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");
                        rawValue = rawValue.replace(/^-/, "");

                        if (!/^\d*$/.test(rawValue)) return;
                        rawValue = rawValue.replace(/^0+(?=\d)/, "");

                        if (rawValue === "0") {
                          handleChange(idx, "-", "currentLiability", "date2");
                          return;
                        }

                        if (rawValue === "") {
                          handleChange(idx, "", "currentLiability", "date2");
                          return;
                        }

                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        handleChange(
                          idx,
                          finalValue,
                          "currentLiability",
                          "date2"
                        );

                        setTimeout(() => {
                          const newLength = finalValue.length;
                          const offset = newLength - inputValue.length;
                          const newPos = caretPos + offset;
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }}
                    />
                  </td>
                </tr>
              );
            })}

            <tr className="bg-gray-200 font-semibold">
              <td className="">
                <input
                  value={sfirtsTotalcurrentLiabilities}
                  onChange={(e) => ssetfirtscurrentLiabilities(e.target.value)}
                  className="w-full bg-gray-200 text-black p-1"
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

            {currentSubLiabilitiesAr.map((val, idx) => {
              return (
                <tr
                  key={`sub-current-liability-${idx}`}
                  className="bg-gray-100"
                >
                  <td className="border border-gray-300">
                    <input
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
                    <input className="w-full bg-gray-100 text-black p-1" />
                  </td>
                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      value={val}
                      onKeyDown={(e) => {
                        const input = e.currentTarget;
                        const caretPos = input.selectionStart ?? 0;

                        if (
                          e.key === "Backspace" &&
                          caretPos === input.value.length &&
                          input.value.endsWith(")")
                        ) {
                          e.preventDefault();
                          const newVal = input.value.slice(0, -1);
                          handleChange(idx, newVal, "currentSubLiability");
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        if (inputValue === "-") {
                          handleChange(idx, "-", "currentSubLiability");
                          return;
                        }

                        let rawValue = inputValue.replace(/[(),\s]/g, "");
                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");
                        rawValue = rawValue.replace(/^-/, "");

                        if (!/^\d*$/.test(rawValue)) return;
                        rawValue = rawValue.replace(/^0+(?=\d)/, "");

                        if (rawValue === "0") {
                          handleChange(idx, "-", "currentSubLiability");
                          return;
                        }

                        if (rawValue === "") {
                          handleChange(idx, "", "currentSubLiability");
                          return;
                        }

                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        handleChange(idx, finalValue, "currentSubLiability");

                        setTimeout(() => {
                          const newLength = finalValue.length;
                          const offset = newLength - inputValue.length;
                          const newPos = caretPos + offset;
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }}
                    />
                  </td>

                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      value={currentSubLiabilitiesDate2Ar[idx]}
                      onKeyDown={(e) => {
                        const input = e.currentTarget;
                        const caretPos = input.selectionStart ?? 0;

                        if (
                          e.key === "Backspace" &&
                          caretPos === input.value.length &&
                          input.value.endsWith(")")
                        ) {
                          e.preventDefault();
                          const newVal = input.value.slice(0, -1);
                          handleChange(
                            idx,
                            newVal,
                            "currentSubLiability",
                            "date2"
                          );
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        if (inputValue === "-") {
                          handleChange(
                            idx,
                            "-",
                            "currentSubLiability",
                            "date2"
                          );
                          return;
                        }

                        let rawValue = inputValue.replace(/[(),\s]/g, "");
                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");
                        rawValue = rawValue.replace(/^-/, "");

                        if (!/^\d*$/.test(rawValue)) return;
                        rawValue = rawValue.replace(/^0+(?=\d)/, "");

                        if (rawValue === "0") {
                          handleChange(
                            idx,
                            "-",
                            "currentSubLiability",
                            "date2"
                          );
                          return;
                        }

                        if (rawValue === "") {
                          handleChange(idx, "", "currentSubLiability", "date2");
                          return;
                        }

                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        handleChange(
                          idx,
                          finalValue,
                          "currentSubLiability",
                          "date2"
                        );

                        setTimeout(() => {
                          const newLength = finalValue.length;
                          const offset = newLength - inputValue.length;
                          const newPos = caretPos + offset;
                          input.setSelectionRange(newPos, newPos);
                        }, 0);
                      }}
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

            <tr className="bg-gray-300   font-bold">
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
            <tr className="bg-gray-400   font-bold">
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

export default BalaceSheetUpdateFormEn;
