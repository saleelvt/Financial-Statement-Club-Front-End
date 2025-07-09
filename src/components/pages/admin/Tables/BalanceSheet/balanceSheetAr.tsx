/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import arabic from "react-date-object/calendars/gregorian";
import type { DateObject } from "react-multi-date-picker";


import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../reduxKit/store";

import { setBalanceSheetDataArAction } from "../../../../../reduxKit/actions/Tables/balanceSheetAr";
type BalaceSheetFormArProps = {
  TakingShort: boolean;
};

const BalaceSheetFormAr: React.FC<BalaceSheetFormArProps> = React.memo(
  ({ TakingShort }) => { 
    const dispatch = useDispatch<AppDispatch>();



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


  const [data1Ar, setDate1Ar] = useState<Date |null|any>(null);
    const [data2Ar, setDate2Ar] = useState<Date | null |any>(null);

    const [date1, setDate1] = useState("(غير مراجعة)");
    const [date2, setDate2] = useState("(مراجعة)");
    const [date1Rl, setDate1Rl] = useState("'000");
    const [date2Rl, setDate2Rl] = useState("'000");


   const [assets, setAssets] = useState("الأصول");
    const [lnonCurrentAssets, ssetnonCurrentAssets] = useState(    "الأصول غير المتداولة"  );
    const [firtsTotalnonCurrentAssets, ssetfirtsTotalnonCurrentAssets] =    useState("");
    const [totalNonCurrentAssets, ssetTotalNonCurrentAssets] = useState(    "إجمالي الأصول غير المتداولة"   );

    const [lcurrentAssets, ssetCurrentAssets] = useState("الأصول المتداولة");
    const [firtsTotalCurrentAssets, ssetfirtsTotalCurrentAssets] = useState("");
    const [totalCurrentAssets, ssetTotalCurrentAssets] = useState(     "إجمالي الأصول المتداولة"   );
    const [totalAssets, ssetTotalAssets] = useState("إجمالي الأصول");

    const [ ShareholdersEquityandliabilitiess,   setShareholdersEquityandliabilities,   ] = useState(" حقوق المساهمين والمطلوبات");
    const [ShareholdersEquity, setShareholdersEquity] =    useState("حقوق المساهمين");
    const [firtsTotalShareholdersEquity, ssetfirtsTotalShareholdersEquity] =    useState("");
    const [totalShareholdersEquity, setTotalShareholdersEquity] = useState(    "إجمالي حقوق المساهمين"  );

    const [liabilities, setLiabilities] = useState("المطلوبات");
    const [Noncurrentliabilities, setNoncurrentliabilities] = useState(     "المطلوبات غير المتداولة"  );
    const [firtsTotalNoncurrentLiabilities, ssetfirtsNoncurrentLiabilities] =     useState("");
    const [totalNoncurrentliabilities, setTotalNoncurrentliabilities] =   useState("إجمالي المطلوبات غير المتداولة");

    const [currentliabilities, setcurrentliabilities] = useState("المطلوبات المتداولة"   );
    const [firtsTotalcurrentLiabilities, ssetfirtscurrentLiabilities] =    useState("");
    const [totalcurrentliabilities, setTotalcurrentliabilities] = useState(   "إجمالي المطلوبات المتداولة"  );
    const [totalliabilities, setTotalliabilities] =   useState("إجمالي المطلوبات");
    const [totalEquityAndLiabilities, settotalEquityAndLiabilities] = useState(  "إجمالي حقوق المساهمين والمطلوبات"  );


 
    // Updated state declarations with empty strings as initial values
    const [nonCurrentAssets, setNonCurrentAssets] = useState<string[]>(   Array(12).fill("")  );
    const [nonCurrentSubAssets, setNonCurrentSubAssets] = useState<string[]>(   Array(3).fill("")  );
    const [nonCurrentLabels, setNonCurrentLabels] = useState<string[]>(   Array(12).fill("")  );
    const [nonCurrentNotes, setNonCurrentNotes] = useState<string[]>(   Array(12).fill("")  );

    const [currentAssets, setCurrentAssets] = useState<string[]>(   Array(12).fill("")  );
    const [currentSubAssets, setCurrentSubAssets] = useState<string[]>(   Array(3).fill("")  );
    const [CurrentAssetsNotes, setCurrentAssetsNotes] = useState<string[]>(    Array(12).fill("")  );
    // New state for Date 2 columns with empty strings
    const [nonCurrentAssetsDate2, setNonCurrentAssetsDate2] = useState<    string[]  >(Array(12).fill(""));

    const [nonCurrentSubAssetsDate2, setNonCurrentSubAssetsDate2] = useState<    string[]  >(Array(3).fill(""));
    const [currentAssetsDate2, setCurrentAssetsDate2] = useState<string[]>(   Array(12).fill("")  );
    const [currentSubAssetsDate2, setCurrentSubAssetsDate2] = useState<    string[]  >(Array(3).fill(""));

    // Labels remain as strings

    const [nonCurrentSubLabels, setNonCurrentSubLabels] = useState<string[]>(    Array(3).fill("")  );
    const [currentLabels, setCurrentLabels] = useState<string[]>(    Array(12).fill("") );
    const [currentSubLabels, setCurrentSubLabels] = useState<string[]>(   Array(3).fill("") );

    // States for equity and liabilities with empty strings
    const [equityItems, setEquityItems] = useState<string[]>(    Array(12).fill("")  );
    const [equityItemsNotes, setEquityItemsNotes] = useState<string[]>(  Array(12).fill("")  );
    const [equityItemsDate2, setEquityItemsDate2] = useState<string[]>(    Array(12).fill("") );
    const [equityLabels, setEquityLabels] = useState<string[]>(    Array(12).fill("")   );
    const [equitySubItems, setEquitySubItems] = useState<string[]>(   Array(3).fill("")  );
    const [equitySubItemsDate2, setEquitySubItemsDate2] = useState<string[]>(    Array(3).fill("")  );
    const [equitySubLabels, setEquitySubLabels] = useState<string[]>(    Array(3).fill("") );

    const [nonCurrentLiabilities, setNonCurrentLiabilities] = useState<    string[]  >(Array(12).fill(""));
    const [nonCurrentLiabilitiesNotes, setNonCurrentLiabilitiesNotes] =    useState<string[]>(Array(12).fill(""));
    const [nonCurrentLiabilitiesDate2, setNonCurrentLiabilitiesDate2] =   useState<string[]>(Array(12).fill(""));
    const [nonCurrentLiabilitiesLabels, setNonCurrentLiabilitiesLabels] =  useState<string[]>(Array(12).fill(""));

    const [nonCurrentSubLiabilities, setNonCurrentSubLiabilities] = useState<   string[]  >(Array(3).fill(""));
    const [nonCurrentSubLiabilitiesDate2, setNonCurrentSubLiabilitiesDate2] =   useState<string[]>(Array(3).fill(""));
    const [nonCurrentSubLiabilitiesLabels, setNonCurrentSubLiabilitiesLabels] =   useState<string[]>(Array(3).fill(""));

    const [currentLiabilities, setCurrentLiabilities] = useState<string[]>(    Array(12).fill("")  );
    const [currentLiabilitiesNotes, setCurrentLiabilitiesNotes] = useState<    string[]  >(Array(12).fill(""));
    const [currentLiabilitiesDate2, setCurrentLiabilitiesDate2] = useState<    string[] >(Array(12).fill(""));
    const [currentLiabilitiesLabels, setCurrentLiabilitiesLabels] = useState<    string[]  >(Array(12).fill(""));

    const [currentSubLiabilities, setCurrentSubLiabilities] = useState<   string[] >(Array(3).fill(""));
    const [currentSubLiabilitiesDate2, setCurrentSubLiabilitiesDate2] =   useState<string[]>(Array(3).fill(""));
    const [currentSubLiabilitiesLabels, setCurrentSubLiabilitiesLabels] =   useState<string[]>(Array(3).fill(""));



    
    // Calculate totals for Assets
       const [sfirtsTotalnonCurrentNote, ssetfirtsTotalnonCurrentAssetsNote] =  useState("");
    const firstTotalNonCurrent = sumStringValues(nonCurrentAssets);
      const firstTotalNonCurrentDate2 = sumStringValues(nonCurrentAssetsDate2);


        const [stotalNonCurrentAssetsNote, ssetTotalNonCurrentAssetsNote] = useState(  "");
        const secondTotalNonCurrent =    firstTotalNonCurrent + sumStringValues(nonCurrentSubAssets);
       const secondTotalNonCurrentDate2 =    firstTotalNonCurrentDate2 + sumStringValues(nonCurrentSubAssetsDate2);

         const [sfirtsTotalCurrentAssetsNote, ssetfirtsTotalCurrentAssetsNote] =  useState("");
         const firstTotalCurrent = sumStringValues(currentAssets);
         const firstTotalCurrentDate2 = sumStringValues(currentAssetsDate2);

           const [stotalCurrentAssetsNote, ssetTotalCurrentAssetsNote] = useState(  "" );
           const secondTotalCurrent =    firstTotalCurrent + sumStringValues(currentSubAssets);
           const secondTotalCurrentDate2 =    firstTotalCurrentDate2 + sumStringValues(currentSubAssetsDate2);

             const [stotalAssetsNote, ssetTotalAssetsNote] = useState("");
             const LtotalAssets = secondTotalNonCurrent + secondTotalCurrent;
             const totalAssetsDate2 =   secondTotalNonCurrentDate2 + secondTotalCurrentDate2;



    const [sfirtsTotalShareholdersEquityNote, ssetfirtsTotalShareholdersEquityNote] =   useState("");
    const firstTotalEquity = sumStringValues(equityItems);
    const firstTotalEquityDate2 = sumStringValues(equityItemsDate2);


         const [stotalShareholdersEquityNote, setTotalShareholdersEquityNote] = useState(  "" );
    const totalEquity = firstTotalEquity + sumStringValues(equitySubItems);
    const totalEquityDate2 = firstTotalEquityDate2 + sumStringValues(equitySubItemsDate2);


      const [sfirtsTotalNoncurrentLiabilitiesNote, ssetfirtsNoncurrentLiabilitiesNote] =   useState("");
      const firstTotalNonCurrentLiabilities = sumStringValues(     nonCurrentLiabilities   );
      const firstTotalNonCurrentLiabilitiesDate2 = sumStringValues(   nonCurrentLiabilitiesDate2   );

   
          const [stotalNoncurrentliabilitiesNote, setTotalNoncurrentliabilitiesNote] =   useState("");
    const totalNonCurrentLiabilities =    firstTotalNonCurrentLiabilities +    sumStringValues(nonCurrentSubLiabilities);
    const totalNonCurrentLiabilitiesDate2 =    firstTotalNonCurrentLiabilitiesDate2 +     sumStringValues(nonCurrentSubLiabilitiesDate2);


    // Calculate totals for Current Liabilities
      const [sfirtsTotalcurrentLiabilitiesNote, ssetfirtscurrentLiabilitiesNote] =    useState("");
    const firstTotalCurrentLiabilities = sumStringValues(currentLiabilities);
    const firstTotalCurrentLiabilitiesDate2 = sumStringValues(    currentLiabilitiesDate2  );
    
        const [stotalcurrentliabilitiesNote, setTotalcurrentliabilitiesNote] = useState( ""  );
    const totalCurrentLiabilities =    firstTotalCurrentLiabilities + sumStringValues(currentSubLiabilities);
    const totalCurrentLiabilitiesDate2 =    firstTotalCurrentLiabilitiesDate2 +     sumStringValues(currentSubLiabilitiesDate2);

    // Calculate Total Liabilities
         const [stotalliabilitiesNote, setTotalliabilitiesNote] =    useState("");
    const totalLiabilities =   totalNonCurrentLiabilities + totalCurrentLiabilities;
    const totalLiabilitiesDate2 =    totalNonCurrentLiabilitiesDate2 + totalCurrentLiabilitiesDate2;

    // Calculate Total Shareholder's Equity and Liabilities
      const [stotalEquityAndLiabilitiesNote, settotalEquityAndLiabilitiesNote] = useState(  ""   );
    const LtotalEquityAndLiabilities = totalEquity + totalLiabilities;
    const totalEquityAndLiabilitiesDate2 =   totalEquityDate2 + totalLiabilitiesDate2;
 

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

  

    // const hasNonEmptyNonCurrentSubAssets = nonCurrentSubAssets.some(
    //   (val, idx) => val || nonCurrentSubAssetsDate2[idx]
    // );
    // const hasNonEmptyCurrentSubAssets = currentSubAssets.some(
    //   (val, idx) => val || currentSubAssetsDate2[idx]
    // );

    // const hasNonEmptyEquitySubItems = equitySubItems.some(
    //   (val, idx) => val || equitySubItemsDate2[idx]
    // );
    // const hasNonEmptyNonCurrentSubLiabilities = nonCurrentSubLiabilities.some(
    //   (val, idx) => val || nonCurrentSubLiabilitiesDate2[idx]
    // );
    // const hasNonEmptyCurrentSubLiabilities = currentSubLiabilities.some(
    //   (val, idx) => val || currentSubLiabilitiesDate2[idx]
    // );

  
 
    useEffect(() => {
      try {
        prepareAndDispatchForArabicDataStore();
      } catch (error) {
        console.log("useEffect error : ", error);
      }
    }, [
      nonCurrentLabels,
      nonCurrentSubLabels,

      currentSubLabels,
      currentLabels,

      equityLabels,
      equitySubLabels,

      currentLiabilitiesLabels,
      currentSubLiabilitiesLabels,

      nonCurrentLiabilitiesLabels,
      nonCurrentSubLiabilitiesLabels,

      assets,
      nonCurrentAssets,
      firtsTotalnonCurrentAssets,

      totalNonCurrentAssets,
      currentAssets,
      firtsTotalCurrentAssets,
      totalCurrentAssets,
      totalAssets,
      ShareholdersEquityandliabilitiess,
      ShareholdersEquity,
      firtsTotalShareholdersEquity,
      totalShareholdersEquity,
      liabilities,
      Noncurrentliabilities,
      firtsTotalNoncurrentLiabilities,
      totalNoncurrentliabilities,
      currentliabilities,
      firtsTotalcurrentLiabilities,
      totalcurrentliabilities,
      totalliabilities,
      totalEquityAndLiabilities,

      data1Ar,
      data2Ar,
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


      sfirtsTotalnonCurrentNote,
      stotalNonCurrentAssetsNote,
      sfirtsTotalCurrentAssetsNote,
      stotalCurrentAssetsNote,
      stotalAssetsNote,
      sfirtsTotalShareholdersEquityNote,
      stotalShareholdersEquityNote,
      sfirtsTotalNoncurrentLiabilitiesNote,
      stotalNoncurrentliabilitiesNote,
      sfirtsTotalcurrentLiabilitiesNote,
      stotalcurrentliabilitiesNote,
      stotalliabilitiesNote,
      stotalEquityAndLiabilitiesNote,
      dispatch,
    ]);

    const prepareAndDispatchForArabicDataStore = async () => {
      const formDataAr = {
        qassets: {
          qsassets: assets,
          qnonCurrent: {
            qsnonCurrentAssets: lnonCurrentAssets,
            qnonCurrentLabelsAr: nonCurrentLabels,
            qitems: nonCurrentAssets,
            qitemsDate2: nonCurrentAssetsDate2,
            qnonCurrentNotes: nonCurrentNotes,
            qnonCurrentSubLabelsAr: nonCurrentSubLabels,
            qsubItems: nonCurrentSubAssets,
            qsubItemsDate2: nonCurrentSubAssetsDate2,
            qsfirtsTotalnonCurrentAssets: firtsTotalnonCurrentAssets,
            qsfirtsTotalnonCurrentNote:sfirtsTotalnonCurrentNote,
            qfirstTotal: firstTotalNonCurrent,
            qfirstTotalDate2: firstTotalNonCurrentDate2,
            qsecondTotal: secondTotalNonCurrent,
            qstotalNonCurrentAssetsNote:stotalNonCurrentAssetsNote,
            qsecondTotalDate2: secondTotalNonCurrentDate2,
            qstotalNonCurrentAssets: totalNonCurrentAssets,
          },
          qcurrent: {
            qscurrentAssets: lcurrentAssets,
            qcurrentLabelsAr: currentLabels,
            qitems: currentAssets,
            qitemsDate2: currentAssetsDate2,
            qCurrentAssetsNotes: CurrentAssetsNotes,
            qcurrentSubLabelsAr: currentSubLabels,
            qsubItems: currentSubAssets,
            qsubItemsDate2: currentSubAssetsDate2,
            qsfirtsTotalCurrentAssets: firtsTotalCurrentAssets,
            qsfirtsTotalCurrentAssetsNote:sfirtsTotalCurrentAssetsNote,
            qfirstTotal: firstTotalCurrent,
            qfirstTotalDate2: firstTotalCurrentDate2,
            qstotalCurrentAssets: totalCurrentAssets,
            qstotalCurrentAssetsNote:stotalCurrentAssetsNote,
            qsecondTotal: secondTotalCurrent,
            qsecondTotalDate2: secondTotalCurrentDate2,
          },
          qstotalAssets: totalAssets,
          qstotalAssetsNote:stotalAssetsNote,
          qtotalAssets: LtotalAssets,
          qtotalAssetsDate2: totalAssetsDate2,
        },
        qShareholdersEquityandliabilitiess: ShareholdersEquityandliabilitiess,
        qequity: {
          qsShareholdersEquity: ShareholdersEquity,
          qequityLabelsAr: equityLabels,
          qequityItemsNotes: equityItemsNotes,
          qitems: equityItems,
          qitemsDate2: equityItemsDate2,

          qequitySubLabelsAr: equitySubLabels,
          qsubItems: equitySubItems,
          qsubItemsDate2: equitySubItemsDate2,
          qsfirtsTotalShareholdersEquity: firtsTotalShareholdersEquity,
          qsfirtsTotalShareholdersEquityNote:sfirtsTotalShareholdersEquityNote,
          qfirstTotal: firstTotalEquity,
          qfirstTotalDate2: firstTotalEquityDate2,
          qstotalShareholdersEquity: totalShareholdersEquity,
          qstotalShareholdersEquityNote:stotalShareholdersEquityNote,
          qtotalEquity: totalEquity,
          qtotalEquityDate2: totalEquityDate2,
        },
        qliabilities: {
          qliabilities: liabilities,
          qnonCurrent: {
            qsNoncurrentliabilities: Noncurrentliabilities,
            qnonCurrentLiabilitiesLabelsAr: nonCurrentLiabilitiesLabels,
            qnonCurrentLiabilitiesNotes: nonCurrentLiabilitiesNotes,
            qitems: nonCurrentLiabilities,
            qitemsDate2: nonCurrentLiabilitiesDate2,

            qnonCurrentSubLiabilitiesLabelsAr: nonCurrentSubLiabilitiesLabels,
            qsubItems: nonCurrentSubLiabilities,
            qsubItemsDate2: nonCurrentSubLiabilitiesDate2,
            qsfirtsTotalNoncurrentLiabilities: firtsTotalNoncurrentLiabilities,
            qsfirtsTotalNoncurrentLiabilitiesNote:sfirtsTotalNoncurrentLiabilitiesNote,
            qfirstTotal: firstTotalNonCurrentLiabilities,
            qfirstTotalDate2: firstTotalNonCurrentLiabilitiesDate2,
            qstotalNoncurrentliabilities: totalNoncurrentliabilities,
            qstotalNoncurrentliabilitiesNote:stotalNoncurrentliabilitiesNote,
            qtotal: totalNonCurrentLiabilities,
            qtotalDate2: totalNonCurrentLiabilitiesDate2,
          },

          qcurrent: {
            qscurrentliabilities: currentliabilities,
            qcurrentLiabilitiesLabelsAr: currentLiabilitiesLabels,
            qcurrentLiabilitiesNotes: currentLiabilitiesNotes,
            qitems: currentLiabilities,
            qitemsDate2: currentLiabilitiesDate2,
            qsfirtsTotalcurrentLiabilities: firtsTotalcurrentLiabilities,
            qsfirtsTotalcurrentLiabilitiesNote:sfirtsTotalcurrentLiabilitiesNote,
            qfirstTotal: firstTotalCurrentLiabilities,
            qfirstTotalDate2: firstTotalCurrentLiabilitiesDate2,

            qcurrentSubLiabilitiesLabelsAr: currentSubLiabilitiesLabels,
            qsubItems: currentSubLiabilities,
            qsubItemsDate2: currentSubLiabilitiesDate2,
            qstotalcurrentliabilities: totalcurrentliabilities,
            qstotalcurrentliabilitiesNote:stotalcurrentliabilitiesNote,
            qtotal: totalCurrentLiabilities,
            qtotalDate2: totalCurrentLiabilitiesDate2,
          },
          qstotalliabilities: totalliabilities,
          qstotalliabilitiesNote:stotalliabilitiesNote,
          qtotalLiabilities: totalLiabilities,
          qtotalLiabilitiesDate2: totalLiabilitiesDate2,
        },
        qstotalEquityAndLiabilities: totalEquityAndLiabilities,
        qstotalEquityAndLiabilitiesNote:stotalEquityAndLiabilitiesNote,
        qItotalEquityAndLiabilities: LtotalEquityAndLiabilities,
        qItotalEquityAndLiabilitiesDate2: totalEquityAndLiabilitiesDate2,
        qdata1En: data1Ar,
        qdata2En: data2Ar,
      };
      console.log("Balance sheet Data of Arabic : ", formDataAr);

      await dispatch(setBalanceSheetDataArAction(formDataAr));
    };

    const { data } = useSelector((state: RootState) => state.table);

    useEffect(() => {
      if (data) {
        if (data.data1En || data.data2En) {
          setDate1Ar(data.data1En);
          setDate2Ar(data.data2En);
        }
        if (data.assets?.nonCurrent) {
          setNonCurrentAssets(
            data.assets.nonCurrent.items || Array(12).fill("")
          );
          setNonCurrentSubAssets(
            data.assets.nonCurrent.subItems || Array(3).fill("")
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

    // const formatDateToYYYYMMDD = (date: Date) => {
    //   const yyyy = date.getFullYear();
    //   const mm = ("0" + (date.getMonth() + 1)).slice(-2);
    //   const dd = ("0" + date.getDate()).slice(-2);
    //   return `${yyyy}/${mm}/${dd}`;
    // };

    // // Parse yyyy/MM/dd string to Date
    // const parseDateFromYYYYMMDD = (str: string): Date | null => {
    //   const parts = str.split("/");
    //   if (parts.length === 3) {
    //     const [yyyy, mm, dd] = parts;
    //     const date = new Date(`${yyyy}-${mm}-${dd}`);
    //     return isNaN(date.getTime()) ? null : date;
    //   }
    //   return null;
    // };
    return (
      <div className="flex justify-start  my-2 text-black">
        <table
          dir="rtl"
          className="border font-semibold border-gray-300 text-xs  w-full mb-12  "
        >
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-100 w-96"></th>
              <th className="border border-gray-100 w-16">إيضاحات</th>
              <th className="border border-gray-100 p-1 w-28">

<div dir="rtl" className="items-center  h-5">
  <DatePicker
    className="text-right"
    value={data1Ar}
    onChange={(date: DateObject | null) => {
      if (date) {
        const jsDate = new Date(
        date.year,
        date.month.number - 1, // ✅ Correct usage
        date.day
      );
        setDate1Ar(jsDate);
      } else {
        setDate1Ar(null);
      }
    }}
    calendar={arabic}
    locale={gregorian_ar}
    inputClass="text-center bg-gray-100 w-28"
    placeholder="اختر التاريخ"
  />
</div>


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
                <div dir="rtl" className="items-center bg-green">
                 <DatePicker
  className="text-right"
  value={data2Ar}
  onChange={(date: DateObject | null) => {
    if (date) {
 const jsDate = new Date(
        date.year,
        date.month.number - 1, // ✅ Correct usage
        date.day
      );
      setDate2Ar(jsDate);
    } else {
      setDate2Ar(null);
    }
  }}
  calendar={arabic}
  locale={gregorian_ar}
  inputClass="text-center bg-gray-100 w-28"
  placeholder="اختر التاريخ"
/>

                </div>

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
                  value={assets}
                  
                  onChange={(e) => setAssets(e.target.value)}
                  className=" text-start     bg-gray-400 fext-row"
                  type="text"
                />
              </td>
            </tr>
            <tr className="bg-gray-200  font-semibold">
              <td colSpan={4} className="p-1">
                <input
                  placeholder=""
                  value={lnonCurrentAssets}
                  
                  onChange={(e) => ssetnonCurrentAssets(e.target.value)}
                  className=" text-start w-full   bg-gray-200 fext-row"
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
                      className="w-full text-center bg-gray-100 text-black p-1"
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

            <tr className="bg-gray-200 font-semibold">
              <td className="">
                <input
                  value={firtsTotalnonCurrentAssets}
                  onChange={(e) =>
                    ssetfirtsTotalnonCurrentAssets(e.target.value)
                  }
                  className="w-full   bg-gray-200 text-black p-1"
                />
              </td>
              <td className="border border-gray-300">                <input
                  value={sfirtsTotalnonCurrentNote}
                  onChange={(e) =>
                    ssetfirtsTotalnonCurrentAssetsNote(e.target.value)
                  }
                  className="w-full   bg-gray-200 text-black p-1"
                /></td>
              <td className="border  border-gray-300">
                {formatWithParentheses(firstTotalNonCurrent)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(firstTotalNonCurrentDate2)}
              </td>
            </tr>

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
                  value={totalNonCurrentAssets}
                  
                  onChange={(e) => ssetTotalNonCurrentAssets(e.target.value)}
                  className=" text-start   bg-gray-200 p-0.5   fext-row"
                />
              </td>

              <td className="border bg-gray-200  border-gray-300"> <input
             
                  value={stotalNonCurrentAssetsNote}
                  
                  onChange={(e) => ssetTotalNonCurrentAssetsNote(e.target.value)}
                  className=" text-center w-full p-1  bg-gray-200 "
                /></td>
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
                  
                  value={lcurrentAssets}
                  onChange={(e) => ssetCurrentAssets(e.target.value)}
                  className=" text-start    bg-gray-200 fext-row"
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
                      className="w-full  text-center bg-gray-100 text-black p-1"
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

            <tr className="bg-gray-200 font-semibold">
              <td className="">
                <input
                  value={firtsTotalCurrentAssets}
                  onChange={(e) => ssetfirtsTotalCurrentAssets(e.target.value)}
                  className="w-full  bg-gray-200 text-black p-1"
                /> 
              </td>
              <td className="border border-gray-300"> <input
                  value={sfirtsTotalCurrentAssetsNote}
                  onChange={(e) =>
                    ssetfirtsTotalCurrentAssetsNote(e.target.value)
                  }
                  className="w-full  text-center  bg-gray-200 text-black p-1"
                /></td>
              <td className="border border-gray-300">
                {formatWithParentheses(firstTotalCurrent)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(firstTotalCurrentDate2)}
              </td>
            </tr>

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
                  value={totalCurrentAssets}
                  
                  onChange={(e) => ssetTotalCurrentAssets(e.target.value)}
                  className=" text-start p-0.5   bg-gray-200 fext-row"
                  type="text"
                />
              </td>
              <td className="border  border-gray-300"> <input
                  value={stotalCurrentAssetsNote}
                  onChange={(e) =>
                    ssetTotalCurrentAssetsNote(e.target.value)
                  }
                  className="w-full  text-center  bg-gray-200 text-black p-1"
                /></td>
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
                  value={totalAssets}
                  
                  onChange={(e) => ssetTotalAssets(e.target.value)}
                  className=" text-start p-1   bg-gray-400 fext-row"
                  type="text"
                />{" "}
              </td>
              <td className="border border-gray-300">  <input
                  value={stotalAssetsNote}
                  onChange={(e) =>
                    ssetTotalAssetsNote(e.target.value)
                  }
                  className="w-full  text-center  bg-gray-400 text-black p-1"
                /></td>
              <td className="border border-gray-300">
                {formatWithParentheses(LtotalAssets)}
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
                  value={ShareholdersEquityandliabilitiess}
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
                  value={ShareholdersEquity}
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
                      className="w-full  text-center bg-gray-100 text-black p-1"
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

            <tr className="bg-gray-200 font-semibold">
              <td className="">
                <input
                  value={firtsTotalShareholdersEquity}
                  onChange={(e) =>
                    ssetfirtsTotalShareholdersEquity(e.target.value)
                  }
                  className="w-full bg-gray-200 text-black p-1"
                />
              </td>
              <td className="border border-gray-300">   <input
                  value={sfirtsTotalShareholdersEquityNote}
                  onChange={(e) =>
                    ssetfirtsTotalShareholdersEquityNote(e.target.value)
                  }
                  className="w-full  text-center  bg-gray-200 text-black p-1"
                /></td>
              <td className="border border-gray-300">
                {formatWithParentheses(firstTotalEquity)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(firstTotalEquityDate2)}
              </td>
            </tr>

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
                  value={totalShareholdersEquity}
                  onChange={(e) => setTotalShareholdersEquity(e.target.value)}
                  className=" text-start w-full p-0.5  bg-gray-300 fext-row"
                  type="text"
                />
              </td>
              <td className="border border-gray-300">   <input
                  value={stotalShareholdersEquityNote}
                  onChange={(e) =>
                    setTotalShareholdersEquityNote(e.target.value)
                  }
                  className="w-full  text-center  bg-gray-300 text-black p-1"
                /></td>
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
                  value={Noncurrentliabilities}
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
                      className="w-full  text-center  bg-gray-100 text-black p-1"
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

            <tr className="bg-gray-200 font-semibold">
              <td className="">
                <input
                  value={firtsTotalNoncurrentLiabilities}
                  onChange={(e) =>
                    ssetfirtsNoncurrentLiabilities(e.target.value)
                  }
                  className="w-full bg-gray-200 text-black p-1"
                />
              </td>
              <td className="border border-gray-300">   <input
                  value={sfirtsTotalNoncurrentLiabilitiesNote}
                  onChange={(e) =>
                    ssetfirtsNoncurrentLiabilitiesNote(e.target.value)
                  }
                  className="w-full  text-center  bg-gray-200 text-black p-1"
                /></td>
              <td className="border border-gray-300">
                {formatWithParentheses(firstTotalNonCurrentLiabilities)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(firstTotalNonCurrentLiabilitiesDate2)}
              </td>
            </tr>

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
                  value={totalNoncurrentliabilities}
                  onChange={(e) =>
                    setTotalNoncurrentliabilities(e.target.value)
                  }
                  className=" text-start w-full   bg-gray-200 fext-row"
                  type="text"
                />
              </td>
              <td className="border border-gray-300">
                 <input
                  value={stotalNoncurrentliabilitiesNote}
                  onChange={(e) =>
                    setTotalNoncurrentliabilitiesNote(e.target.value)
                  }
                  className="w-full   text-center  bg-gray-200 text-black p-1"
                />
</td>
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
                  value={currentliabilities}
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
                      className="w-full  text-center bg-gray-100 text-black p-1"
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

            <tr className="bg-gray-200 font-semibold">
              <td className="">
                <input
                  value={firtsTotalcurrentLiabilities}
                  onChange={(e) => ssetfirtscurrentLiabilities(e.target.value)}
                  className="w-full bg-gray-200 text-black p-1"
                />
              </td>
              <td className="border border-gray-300"> <input
                  value={sfirtsTotalcurrentLiabilitiesNote}
                  onChange={(e) =>
                    ssetfirtscurrentLiabilitiesNote(e.target.value)
                  }
                  className="w-full  text-center  bg-gray-200 text-black p-1"
                /></td>
              <td className="border border-gray-300">
                {formatWithParentheses(firstTotalCurrentLiabilities)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(firstTotalCurrentLiabilitiesDate2)}
              </td>
            </tr>

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
                  value={totalcurrentliabilities}
                  onChange={(e) => setTotalcurrentliabilities(e.target.value)}
                  className=" text-start w-full   bg-gray-200 fext-row"
                  type="text"
                />
              </td>
              <td className="border border-gray-300"> <input
                  value={stotalcurrentliabilitiesNote}
                  onChange={(e) =>
                    setTotalcurrentliabilitiesNote(e.target.value)
                  }
                  className="w-full  text-center   bg-gray-200 text-black p-1"
                /></td>
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
                  value={totalliabilities}
                  onChange={(e) => setTotalliabilities(e.target.value)}
                  className=" text-start w-full   bg-gray-300 fext-row"
                  type="text"
                />
              </td>
              <td className="border border-gray-300"> <input
                  value={stotalliabilitiesNote}
                  onChange={(e) =>
                    setTotalliabilitiesNote(e.target.value)
                  }
                  className="w-full  text-center  bg-gray-300 text-black p-1"
                /></td>
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
                  value={totalEquityAndLiabilities}
                  onChange={(e) => settotalEquityAndLiabilities(e.target.value)}
                  className=" text-start w-full   bg-gray-400 fext-row"
                  type="text"
                />
              </td>
              <td className="border border-gray-300"> <input
                  value={stotalEquityAndLiabilitiesNote}
                  onChange={(e) =>
                    settotalEquityAndLiabilitiesNote(e.target.value)
                  }
                  className="w-full  text-center  bg-gray-400 text-black p-1"
                /></td>
              <td className="border border-gray-300">
                {formatWithParentheses(LtotalEquityAndLiabilities)}
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
