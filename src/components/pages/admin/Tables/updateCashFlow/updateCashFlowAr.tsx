/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import arabic from "react-date-object/calendars/gregorian";
import type { DateObject } from "react-multi-date-picker";

import { useDispatch  } from "react-redux";
import { AppDispatch   } from "../../../../../reduxKit/store";

import { SetCashFlowDataArabicAction } from "../../../../../reduxKit/actions/Tables/cashFlowAr";
type TableFormArProps = {
  TableDataAr: any;
};
const CashFlowUpdateFormAr: React.FC<TableFormArProps> = React.memo(
  ({ TableDataAr }) => {
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

    const [date1Rl, setDate1Rl] = useState("'000");
    const [date2Rl, setDate2Rl] = useState("'000");

  
    const [date1, setDate1] = useState("(غير مراجعة)");
    const [date2, setDate2] = useState("(مراجعة)");

      const [data1Ar, setDate1Ar] = useState<Date | null | any>(null);
    const [data2Ar, setDate2Ar] = useState<Date | null | any>(null);


    // section One
      const [sectionOneLabelsEn, setSectionOneLabelsEn] = useState<string[]>(    Array(5).fill("") );
       const [sectionOneNotesEn, setFlowSectionOneNotesEn] = useState<string[]>(   Array(5).fill("")   );
       const [sectionOneItemsEn, setFlowSectionOneEn] = useState<string[]>(    Array(5).fill("")  );
       const [sectionOneItemsDate2En, setFlowSectionOneDate2En] = useState<     string[]  >(Array(5).fill(""));
       const [sectionOneTotalLabel, setSectionOneTotalLabel] =    useState("d");
       const TotalsectionOneItemsEn = sumStringValues(sectionOneItemsEn);
       const TotalsectionOneItemsDate2En = sumStringValues(sectionOneItemsDate2En);
   
       // section Two
       const [sectionTwoLabelsEn, setSectionTwoLabelsEn] = useState<string[]>(     Array(12).fill("") );
       const [sectionTwoNotesEn, setFlowSectionTwoNotesEn] = useState<string[]>(      Array(12).fill("")  );
       const [sectionTwoItemsEn, setFlowSectionTwoEn] = useState<string[]>(    Array(12).fill("")  );
       const [sectionTwoItemsDate2En, setFlowSectionTwoDate2En] = useState<    string[] >(Array(12).fill(""));
       const [sectionTwoTotalLabel, setSectionTwoTotalLabel] = useState(    ""  );
       const TotalsectionTwoItemsEn = TotalsectionOneItemsEn+ sumStringValues(sectionTwoItemsEn);
       const TotalsectionTwoItemsDate2En = TotalsectionOneItemsDate2En+ sumStringValues(sectionTwoItemsDate2En);
   
       // section Three
       const [sectionThreeLabelsEn, setSectionThreeLabelsEn] = useState<string[]>(   Array(7).fill("")  );
       const [sectionThreeNotesEn, setFlowSectionThreeNotesEn] = useState<    string[]  >(Array(7).fill(""));
       const [sectionThreeItemsEn, setFlowSectionThreeEn] = useState<string[]>(  Array(7).fill("") );
       const [sectionThreeItemsDate2En, setFlowSectionThreeDate2En] = useState<     string[]  >(Array(7).fill(""));
       const [sectionThreeTotalLabel, setSectionThreeTotalLabel] = useState(    "" );
       const TotalsectionThreeItemsEn =TotalsectionTwoItemsEn+ sumStringValues(sectionThreeItemsEn);
       const TotalsectionThreeItemsDate2En = TotalsectionTwoItemsDate2En+ sumStringValues(    sectionThreeItemsDate2En );
   
       // sectoin Four
       const [sectionFourLabelsEn, setSectionFourLabelsEn] = useState<string[]>(   Array(5).fill("") );
       const [sectionFourNotesEn, setFlowSectionFourNotesEn] = useState<string[]>(  Array(5).fill("") );
       const [sectionFourItemsEn, setFlowSectionFourEn] = useState<string[]>(  Array(5).fill("") );
       const [sectionFourItemsDate2En, setFlowSectionFourDate2En] = useState<string[]>(Array(5).fill(""));
       const [sectionFourTotalLabel, setSectionFourTotalLabel] = useState( "" );
       const TotalsectionFourItemsEn = TotalsectionThreeItemsEn+ sumStringValues(sectionFourItemsEn);
       const TotalsectionFourItemsDate2En = TotalsectionThreeItemsDate2En+ sumStringValues( sectionFourItemsDate2En );
   
       
       const [sectionFourAttribute, setSectionFourAttributeLabel] = useState(   ""  );
        const [sectionFourAttributeLabelsEn, setSectionFourAttributeLabelsEn] = useState<string[]>(Array(2).fill(""));
         const [sectionFourAttributeItemsEn, setSectionFourAttributeItemsEn] = useState<string[]>(Array(2).fill(""));
         const [sectionFourAttributeItemsDate2En, setSectionFourAttributeItemsDate2En] = useState<string[]>(Array(2).fill(""));
         const TotalsectionFourAttributeItemsEn = sumStringValues(sectionFourAttributeItemsEn);
         const TotalsectionFourAttributeItemsDate2En = sumStringValues(sectionFourAttributeItemsDate2En);
      
         const [sectionFourOtherComprehensiveIncome, setSectionFourOtherComprehensiveIncomeLabel] = useState("");  
         const [sectionFourOtherComprehensiveIncomeSubheading, setSectionFourOtherComprehensiveIncomeSubheadingLabel] = useState(""); 
      
         
         const [sectionFourOtherComprehensiveIncomeSubheadingLabelsEn, setSectionFourOtherComprehensiveIncomeSubheadingLabelsEn] = useState<string[]>(Array(2).fill(""));
         const [sectionFourOtherComprehensiveIncomeSubheadingNotesEn, setSectionFourOtherComprehensiveIncomeSubheadingNotesEn] = useState<string[]>(  Array(2).fill("") );
         const [sectionFourOtherComprehensiveIncomeSubheadingItemsEn, setSectionFourOtherComprehensiveIncomeSubheadingItemsEn] = useState<string[]>(Array(2).fill(""));
         const [sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En, setSectionFourOtherComprehensiveIncomeSubheadingItemsDate2En] = useState<string[]>(Array(2).fill(""));
         const [sectionFourOtherTotalComprehensiveIncome, setSectionFourOtherToatalComprehensiveIncomeLabel] = useState("");
         const TotalsectionFourOtherComprehensiveIncomeSubheadingItemsEn =TotalsectionFourAttributeItemsEn+ sumStringValues(sectionFourOtherComprehensiveIncomeSubheadingItemsEn);
         const TotalsectionFourOtherComprehensiveIncomeSubheadingItemsDate2En = TotalsectionFourAttributeItemsDate2En+ sumStringValues(sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En);
      
      
          
            const [sectionFourAttribute2, setSectionFourAttribute2Label] = useState(" ");
            const [sectionFourAttribute2LabelsEn, setSectionFourAttribute2LabelsEn] = useState<string[]>(Array(2).fill(""));
            const [sectionFourAttribute2ItemsEn, setSectionFourAttribute2ItemsEn] = useState<string[]>(Array(2).fill(""));
            const [sectionFourAttribute2ItemsDate2En, setSectionFourAttribute2ItemsDate2En] = useState<string[]>(Array(2).fill(""));
            const TotalsectionFourAttribute2ItemsEn = sumStringValues(sectionFourAttribute2ItemsEn);
            const TotalsectionFourAttribute2ItemsDate2En = sumStringValues(sectionFourAttribute2ItemsDate2En);
      

       // section Five
       const [sectionFiveLabelsEn, setSectionFiveLabelsEn] = useState<string[]>(   Array(12).fill("")  );
       const [sectionFiveNotesEn, setFlowSectionFiveNotesEn] = useState<string[]>(  Array(12).fill("")  );
       const [sectionFiveItemsEn, setFlowSectionFiveEn] = useState<string[]>(   Array(12).fill("")  );
       const [sectionFiveItemsDate2En, setFlowSectionFiveDate2En] = useState<   string[] >(Array(12).fill(""));
       const [sectionFiveTotalLabel, setSectionFiveTotalLabel] = useState(   ".."  );
       const TotalsectionFiveItemsEn =TotalsectionFourItemsEn+ sumStringValues(sectionFiveItemsEn);
       const TotalsectionFiveItemsDate2En =TotalsectionFourItemsDate2En+ sumStringValues( sectionFiveItemsDate2En );
   
       // section Six
       const [sectionSixLabelsEn, setSectionSixLabelsEn] = useState<string[]>(   Array(12).fill("") );
       const [sectionSixNotesEn, setFlowSectionSixNotesEn] = useState<string[]>(   Array(12).fill("")  );
       const [sectionSixItemsEn, setFlowSectionSixEn] = useState<string[]>(    Array(12).fill("")  );
       const [sectionSixItemsDate2En, setFlowSectionSixDate2En] = useState<   string[]   >(Array(12).fill(""));
       const [sectionSixTotalLabel, setSectionSixTotalLabel] =  useState("..");
       const TotalsectionSixItemsEn =  TotalsectionFiveItemsEn+sumStringValues(sectionSixItemsEn);
       const TotalsectionSixItemsDate2En = TotalsectionFiveItemsDate2En+sumStringValues(sectionSixItemsDate2En);





useEffect(() => {
  console.log("the cashflow update data for the update Arabic: ", TableDataAr);
  
  if (TableDataAr && Object.keys(TableDataAr).length > 0) {
    try {
      // Set dates
      if (TableDataAr.date1Ar) {
        setDate1Ar(new Date(TableDataAr.date1Ar));
      }
      if (TableDataAr.date2Ar) {
        setDate2Ar(new Date(TableDataAr.date2Ar));
      }
      
      // Section One - Direct access from root level
      if (TableDataAr.sectionOne) {
        setSectionOneLabelsEn(TableDataAr.sectionOne.sectionOneLabelsEn);
        setFlowSectionOneNotesEn(TableDataAr.sectionOne.sectionOneNotesEn);
        setFlowSectionOneEn(TableDataAr.sectionOne.sectionOneItemsEn );
        setFlowSectionOneDate2En(TableDataAr.sectionOne.sectionOneItemsDate2En );
        setSectionOneTotalLabel(TableDataAr.sectionOne.sectionOneTotalLabel || "");
      }
      
      // Section Two - Direct access from root level
      if (TableDataAr.sectionTwo) {
        setSectionTwoLabelsEn(TableDataAr.sectionTwo.sectionTwoLabelsEn );
        setFlowSectionTwoNotesEn(TableDataAr.sectionTwo.sectionTwoNotesEn );
        setFlowSectionTwoEn(TableDataAr.sectionTwo.sectionTwoItemsEn );
        setFlowSectionTwoDate2En(TableDataAr.sectionTwo.sectionTwoItemsDate2En );
        setSectionTwoTotalLabel(TableDataAr.sectionTwo.sectionTwoTotalLabel || "");
      }
      
      // Section Three - Direct access from root level
      if (TableDataAr.sectionThree) {
        setSectionThreeLabelsEn(TableDataAr.sectionThree.sectionThreeLabelsEn );
        setFlowSectionThreeNotesEn(TableDataAr.sectionThree.sectionThreeNotesEn );
        setFlowSectionThreeEn(TableDataAr.sectionThree.sectionThreeItemsEn );
        setFlowSectionThreeDate2En(TableDataAr.sectionThree.sectionThreeItemsDate2En );
        setSectionThreeTotalLabel(TableDataAr.sectionThree.sectionThreeTotalLabel || "");
      }
      
      // Section Four - Direct access from root level
      if (TableDataAr.sectionFour) {
        setSectionFourLabelsEn(TableDataAr.sectionFour.sectionFourLabelsEn );
        setFlowSectionFourNotesEn(TableDataAr.sectionFour.sectionFourNotesEn );
        setFlowSectionFourEn(TableDataAr.sectionFour.sectionFourItemsEn );
        setFlowSectionFourDate2En(TableDataAr.sectionFour.sectionFourItemsDate2En );
        setSectionFourTotalLabel(TableDataAr.sectionFour.sectionFourTotalLabel || "");
      }
      
      // Section Four Attribute One - Direct access from root level
      if (TableDataAr.sectionFourAttributeOne) {
        setSectionFourAttributeLabel(TableDataAr.sectionFourAttributeOne.sectionFourAttribute || "");
        setSectionFourAttributeLabelsEn(TableDataAr.sectionFourAttributeOne.sectionFourAttributeLabelsEn);
        setSectionFourAttributeItemsEn(TableDataAr.sectionFourAttributeOne.sectionFourAttributeItemsEn);
        setSectionFourAttributeItemsDate2En(TableDataAr.sectionFourAttributeOne.sectionFourAttributeItemsDate2En );
      }
      
      // Section Other Comprehensive Income - Direct access from root level
      if (TableDataAr.sectionOtherComprehensiveIncome) {
        setSectionFourOtherComprehensiveIncomeLabel(TableDataAr.sectionOtherComprehensiveIncome.sectionFourOtherComprehensiveIncome || "");
        setSectionFourOtherComprehensiveIncomeSubheadingLabel(TableDataAr.sectionOtherComprehensiveIncome.sectionFourOtherComprehensiveIncomeSubheading || "");
        setSectionFourOtherComprehensiveIncomeSubheadingLabelsEn(TableDataAr.sectionOtherComprehensiveIncome.sectionFourOtherComprehensiveIncomeSubheadingLabelsEn);
        setSectionFourOtherComprehensiveIncomeSubheadingNotesEn(TableDataAr.sectionOtherComprehensiveIncome.sectionFourOtherComprehensiveIncomeSubheadingNotesEn );
        setSectionFourOtherComprehensiveIncomeSubheadingItemsEn(TableDataAr.sectionOtherComprehensiveIncome.sectionFourOtherComprehensiveIncomeSubheadingItemsEn );
        setSectionFourOtherComprehensiveIncomeSubheadingItemsDate2En(TableDataAr.sectionOtherComprehensiveIncome.sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En );
        setSectionFourOtherToatalComprehensiveIncomeLabel(TableDataAr.sectionOtherComprehensiveIncome.sectionFourOtherTotalComprehensiveIncome || "");
      }
      
      // Section Attribute Two - Direct access from root level  
      if (TableDataAr.sectionAttributeTwo) {
        setSectionFourAttribute2Label(TableDataAr.sectionAttributeTwo.sectionFourAttribute2 || "");
        setSectionFourAttribute2LabelsEn(TableDataAr.sectionAttributeTwo.sectionFourAttribute2LabelsEn || Array(2).fill(""));
        setSectionFourAttribute2ItemsEn(TableDataAr.sectionAttributeTwo.sectionFourAttribute2ItemsEn || Array(2).fill(""));
        setSectionFourAttribute2ItemsDate2En(TableDataAr.sectionAttributeTwo.sectionFourAttribute2ItemsDate2En || Array(2).fill(""));
      }
      
      // Section Five - Direct access from root level
      if (TableDataAr.sectionFive) {
        setSectionFiveLabelsEn(TableDataAr.sectionFive.sectionFiveLabelsEn || Array(12).fill(""));
        setFlowSectionFiveNotesEn(TableDataAr.sectionFive.sectionFiveNotesEn || Array(12).fill(""));
        setFlowSectionFiveEn(TableDataAr.sectionFive.sectionFiveItemsEn || Array(12).fill(""));
        setFlowSectionFiveDate2En(TableDataAr.sectionFive.sectionFiveItemsDate2En || Array(12).fill(""));
        setSectionFiveTotalLabel(TableDataAr.sectionFive.sectionFiveTotalLabel || "");
      }
      
      // Section Six - Direct access from root level
      if (TableDataAr.sectionSix) {
        setSectionSixLabelsEn(TableDataAr.sectionSix.sectionSixLabelsEn || Array(12).fill(""));
        setFlowSectionSixNotesEn(TableDataAr.sectionSix.sectionSixNotesEn || Array(12).fill(""));
        setFlowSectionSixEn(TableDataAr.sectionSix.sectionSixItemsEn || Array(12).fill(""));
        setFlowSectionSixDate2En(TableDataAr.sectionSix.sectionSixItemsDate2En || Array(12).fill(""));
        setSectionSixTotalLabel(TableDataAr.sectionSix.sectionSixTotalLabel || "");
      }
      
      console.log("All data successfully loaded into state");
      
    } catch (error) {
      console.error("Error loading data into state:", error);
    }
  } else {
    console.log("TableDataAr is empty or undefined");
  }
}, [TableDataAr]);



const handleChangeAttribute = (
  idx: number,
  value: string,
  section: "sectionFourAttribute",
  field: "label" | "item" | "date2" = "item"
) => {
  if (section === "sectionFourAttribute") {
    if (field === "label") {
      const updated = [...sectionFourAttributeLabelsEn];
      updated[idx] = value;
      setSectionFourAttributeLabelsEn(updated);
    } else if (field === "date2") {
      const updated = [...sectionFourAttributeItemsDate2En];
      updated[idx] = value;
      setSectionFourAttributeItemsDate2En(updated);
    } else {
      const updated = [...sectionFourAttributeItemsEn];
      updated[idx] = value;
      setSectionFourAttributeItemsEn(updated);
    }
  }
};
const handleChangeAttribute2 = (
  index: number,
  value: string,

  type: "label" | "item" | "date2"
) => {
  switch (type) {
    case "label":
      setSectionFourAttribute2LabelsEn((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
      break;
    case "item":
      setSectionFourAttribute2ItemsEn((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
      break;
    case "date2":
      setSectionFourAttribute2ItemsDate2En((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
      break;
    default:
      break;
  }
};



const handleChangeOtherComprehensiveIncome = (
  index: number,
  value: string,
  section: "sectionFourOtherComprehensiveIncomeSubheading",
  type: "label" | "note" | "item" | "date2"
) => {
     if( section === "sectionFourOtherComprehensiveIncomeSubheading"){
  switch (type) {
    case "label":
      setSectionFourOtherComprehensiveIncomeSubheadingLabelsEn((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
      break;
    case "note":
      setSectionFourOtherComprehensiveIncomeSubheadingNotesEn((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
      break;
    case "item":
      setSectionFourOtherComprehensiveIncomeSubheadingItemsEn((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
      break;
    case "date2":
      setSectionFourOtherComprehensiveIncomeSubheadingItemsDate2En((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
      break;
    default:
      break;
  }
  }
};






    // Updated handleChange function to work with string values
    const handleChange = (
      index: number,
      value: string,
      type: string,
      column: "date1" | "date2" | "label" | "note" = "date1"
    ) => {
      if (column === "label") {
        if (type === "sectionOneLabel") {
          const updated = [...sectionOneLabelsEn];
          updated[index] = value;
          setSectionOneLabelsEn(updated);
        } else if (type === "sectionTwoLabel") {
          const updated = [...sectionTwoLabelsEn];
          updated[index] = value;
          setSectionTwoLabelsEn(updated);
        } else if (type === "sectionThreeLabel") {
          const updated = [...sectionThreeLabelsEn];
          updated[index] = value;
          setSectionThreeLabelsEn(updated);
        } else if (type === "sectionFourLabel") {
          const updated = [...sectionFourLabelsEn];
          updated[index] = value;
          setSectionFourLabelsEn(updated);
        } else if (type === "sectionFiveLabel") {
          const updated = [...sectionFiveLabelsEn];
          updated[index] = value;
          setSectionFiveLabelsEn(updated);
        } else if (type === "sectionSixLabel") {
          const updated = [...sectionSixLabelsEn];
          updated[index] = value;
          setSectionSixLabelsEn(updated);
        }
        return;
      }

      // For numeric fields (date1 column)
      if (column === "date1") {
        if (type === "sectionOne") {
          const updated = [...sectionOneItemsEn];
          updated[index] = value;
          setFlowSectionOneEn(updated);
        } else if (type === "sectionTwo") {
          const updated = [...sectionTwoItemsEn];
          updated[index] = value;
          setFlowSectionTwoEn(updated);
        } else if (type === "sectionThree") {
          const updated = [...sectionThreeItemsEn];
          updated[index] = value;
          setFlowSectionThreeEn(updated);
        } else if (type === "sectionFour") {
          const updated = [...sectionFourItemsEn];
          updated[index] = value;
          setFlowSectionFourEn(updated);
        } else if (type === "sectionFive") {
          const updated = [...sectionFiveItemsEn];
          updated[index] = value;
          setFlowSectionFiveEn(updated);
        } else if (type === "sectionSix") {
          const updated = [...sectionSixItemsEn];
          updated[index] = value;
          setFlowSectionSixEn(updated);
        }
      } else if (column === "date2") {
        if (type === "sectionOne") {
          const updated = [...sectionOneItemsDate2En];
          updated[index] = value;
          setFlowSectionOneDate2En(updated);
        } else if (type === "sectionTwo") {
          const updated = [...sectionTwoItemsDate2En];
          updated[index] = value;
          setFlowSectionTwoDate2En(updated);
        } else if (type === "sectionThree") {
          const updated = [...sectionThreeItemsDate2En];
          updated[index] = value;
          setFlowSectionThreeDate2En(updated);
        } else if (type === "sectionFour") {
          const updated = [...sectionFourItemsDate2En];
          updated[index] = value;
          setFlowSectionFourDate2En(updated);
        } else if (type === "sectionFive") {
          const updated = [...sectionFiveItemsDate2En];
          updated[index] = value;
          setFlowSectionFiveDate2En(updated);
        } else if (type === "sectionSix") {
          const updated = [...sectionSixItemsDate2En];
          updated[index] = value;
          setFlowSectionSixDate2En(updated);
        }
      } else if (column === "note") {
        if (type === "sectionOneNote") {
          const updated = [...sectionOneNotesEn];
          updated[index] = value;
          setFlowSectionOneNotesEn(updated);
        } else if (type === "sectionTwoNote") {
          const updated = [...sectionTwoNotesEn];
          updated[index] = value;
          setFlowSectionTwoNotesEn(updated);
        } else if (type === "sectionThreeNote") {
          const updated = [...sectionThreeNotesEn];
          updated[index] = value;
          setFlowSectionThreeNotesEn(updated);
        } else if (type === "sectionFourNote") {
          const updated = [...sectionFourNotesEn];
          updated[index] = value;
          setFlowSectionFourNotesEn(updated);
        } else if (type === "sectionFiveNote") {
          const updated = [...sectionFiveNotesEn];
          updated[index] = value;
          setFlowSectionFiveNotesEn(updated);
        } else if (type === "sectionSixNote") {
          const updated = [...sectionSixNotesEn];
          updated[index] = value;
          setFlowSectionSixNotesEn(updated);
        }
      }
    };







 useEffect(() => {
  const handleDispatch = async () => {
    try {
    const formData = {
  qdate1: data1Ar,
  qdate2: data2Ar,
    sectionOne: {
  qsectionOneLabelsEn: sectionOneLabelsEn,
  qsectionOneNotesEn: sectionOneNotesEn,
  qsectionOneItemsEn: sectionOneItemsEn,
  qsectionOneItemsDate2En: sectionOneItemsDate2En,
  qsectionOneTotalLabel: sectionOneTotalLabel,
  qTotalsectionOneItemsEn: TotalsectionOneItemsEn,
  qTotalsectionOneItemsDate2En: TotalsectionOneItemsDate2En,
     },
   sectionTwo: {
  qsectionTwoLabelsEn: sectionTwoLabelsEn,
  qsectionTwoNotesEn: sectionTwoNotesEn,
  qsectionTwoItemsEn: sectionTwoItemsEn,
  qsectionTwoItemsDate2En: sectionTwoItemsDate2En,
  qsectionTwoTotalLabel: sectionTwoTotalLabel,
  qTotalsectionTwoItemsEn: TotalsectionTwoItemsEn,
  qTotalsectionTwoItemsDate2En: TotalsectionTwoItemsDate2En,
      },

   sectionThree: {
  qsectionThreeLabelsEn: sectionThreeLabelsEn,
  qsectionThreeNotesEn: sectionThreeNotesEn,
  qsectionThreeItemsEn: sectionThreeItemsEn,
  qsectionThreeItemsDate2En: sectionThreeItemsDate2En,
  qsectionThreeTotalLabel: sectionThreeTotalLabel,
  qTotalsectionThreeItemsEn: TotalsectionThreeItemsEn,
  qTotalsectionThreeItemsDate2En: TotalsectionThreeItemsDate2En,
   },

     sectionFour: {
  qsectionFourLabelsEn: sectionFourLabelsEn,
  qsectionFourNotesEn: sectionFourNotesEn,
  qsectionFourItemsEn: sectionFourItemsEn,
  qsectionFourItemsDate2En: sectionFourItemsDate2En,
  qsectionFourTotalLabel: sectionFourTotalLabel,
  qTotalsectionFourItemsEn: TotalsectionFourItemsEn,
  qTotalsectionFourItemsDate2En: TotalsectionFourItemsDate2En,
      },


      sectionAttributeOne: {
    qsectionFourAttribute: sectionFourAttribute,
    qsectionFourAttributeLabelsEn: sectionFourAttributeLabelsEn,
    qsectionFourAttributeItemsEn: sectionFourAttributeItemsEn,
    qsectionFourAttributeItemsDate2En: sectionFourAttributeItemsDate2En,
    qTotalsectionFourAttributeItemsEn: TotalsectionFourAttributeItemsEn,
    qTotalsectionFourAttributeItemsDate2En: TotalsectionFourAttributeItemsDate2En, 
  },

  sectionOtherComprehensiveIncome: {
    qsectionFourOtherComprehensiveIncome: sectionFourOtherComprehensiveIncome,
    qsectionFourOtherComprehensiveIncomeSubheading: sectionFourOtherComprehensiveIncomeSubheading,
    qsectionFourOtherComprehensiveIncomeSubheadingLabelsEn: sectionFourOtherComprehensiveIncomeSubheadingLabelsEn,
    qsectionFourOtherComprehensiveIncomeSubheadingNotesEn: sectionFourOtherComprehensiveIncomeSubheadingNotesEn,
    qsectionFourOtherComprehensiveIncomeSubheadingItemsEn: sectionFourOtherComprehensiveIncomeSubheadingItemsEn,
    qsectionFourOtherComprehensiveIncomeSubheadingItemsDate2En: sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En,
    qsectionFourOtherTotalComprehensiveIncome: sectionFourOtherTotalComprehensiveIncome,
    qTotalsectionFourOtherComprehensiveIncomeSubheadingItemsEn: TotalsectionFourOtherComprehensiveIncomeSubheadingItemsEn,
    qTotalsectionFourOtherComprehensiveIncomeSubheadingItemsDate2En: TotalsectionFourOtherComprehensiveIncomeSubheadingItemsDate2En,
  },

  sectionAttributeTwo: {
    qsectionFourAttribute2: sectionFourAttribute2,
    qsectionFourAttribute2LabelsEn: sectionFourAttribute2LabelsEn,
    qsectionFourAttribute2ItemsEn: sectionFourAttribute2ItemsEn,
    qsectionFourAttribute2ItemsDate2En: sectionFourAttribute2ItemsDate2En,
    qTotalsectionFourAttribute2ItemsEn: TotalsectionFourAttribute2ItemsEn,
    qTotalsectionFourAttribute2ItemsDate2En: TotalsectionFourAttribute2ItemsDate2En,
  }
,



              sectionFive: {
  qsectionFiveLabelsEn: sectionFiveLabelsEn,
  qsectionFiveNotesEn: sectionFiveNotesEn,
  qsectionFiveItemsEn: sectionFiveItemsEn,
  qsectionFiveItemsDate2En: sectionFiveItemsDate2En,
  qsectionFiveTotalLabel: sectionFiveTotalLabel,
  qTotalsectionFiveItemsEn: TotalsectionFiveItemsEn,
  qTotalsectionFiveItemsDate2En: TotalsectionFiveItemsDate2En,
      },

       sectionSix: {
  qsectionSixLabelsEn: sectionSixLabelsEn,
  qsectionSixNotesEn: sectionSixNotesEn,
  qsectionSixItemsEn: sectionSixItemsEn,
  qsectionSixItemsDate2En: sectionSixItemsDate2En,
  qsectionSixTotalLabel: sectionSixTotalLabel,
  qTotalsectionSixItemsEn: TotalsectionSixItemsEn,
  qTotalsectionSixItemsDate2En: TotalsectionSixItemsDate2En,
    },
};

      await dispatch(SetCashFlowDataArabicAction(formData));
    } catch (error) {
      console.log("Dispatch Error:", error);
    }
  };

  handleDispatch();
}, [
  data1Ar, data2Ar,
  sectionOneLabelsEn, sectionOneNotesEn, sectionOneItemsEn, sectionOneItemsDate2En, sectionOneTotalLabel, TotalsectionOneItemsEn, TotalsectionOneItemsDate2En,
  sectionTwoLabelsEn, sectionTwoNotesEn, sectionTwoItemsEn, sectionTwoItemsDate2En, sectionTwoTotalLabel, TotalsectionTwoItemsEn, TotalsectionTwoItemsDate2En,
  sectionThreeLabelsEn, sectionThreeNotesEn, sectionThreeItemsEn, sectionThreeItemsDate2En, sectionThreeTotalLabel, TotalsectionThreeItemsEn, TotalsectionThreeItemsDate2En,
  sectionFourLabelsEn, sectionFourNotesEn, sectionFourItemsEn, sectionFourItemsDate2En, sectionFourTotalLabel, TotalsectionFourItemsEn, TotalsectionFourItemsDate2En,
  sectionFiveLabelsEn, sectionFiveNotesEn, sectionFiveItemsEn, sectionFiveItemsDate2En, sectionFiveTotalLabel, TotalsectionFiveItemsEn, TotalsectionFiveItemsDate2En,
  sectionSixLabelsEn, sectionSixNotesEn, sectionSixItemsEn, sectionSixItemsDate2En, sectionSixTotalLabel, TotalsectionSixItemsEn, TotalsectionSixItemsDate2En,
]);




   



    return (
      <div className="flex justify-start   my-2 text-black">
        <table
          dir="rtl"
          className="border font-semibold border-gray-300 text-xs  w-full mb-12  "
        >
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-100 w-96"></th>
              <th className="border border-gray-100 w-16">إيضاحات</th>
              <th className="border border-gray-100 p-1 w-28">
                <div dir="rtl" className="items-center h-5">
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
            {sectionOneLabelsEn.map((_, idx) => {
    

              return (
                <tr key={`section-one-${idx}`} className="bg-gray-100">
                  <td className="border border-gray-300">
                    <input
                      className="w-full h-7 bg-gray-100 text-black p-1"
                      value={sectionOneLabelsEn[idx]}
                      placeholder={`${idx + 1}`}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "sectionOneLabel",
                          "label"
                        )
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      value={sectionOneNotesEn[idx]}
                      onChange={(e) =>
                        handleChange(
                          idx,
                          e.target.value,
                          "sectionOneNote",
                          "note"
                        )
                      }
                    />
                  </td>

                  <td className="border border-gray-300">
                    <input
                      className="w-full bg-gray-100 text-black p-1"
                      placeholder=""
                      value={sectionOneItemsEn[idx]}
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
                          handleChange(idx, newVal, "sectionOne");
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        // Special case: user is typing just "-"
                        if (inputValue === "-") {
                          handleChange(idx, "-", "sectionOne");
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
                          handleChange(idx, "-", "sectionOne");
                          return;
                        }

                        // Handle case where the value is empty after backspace (clear all)
                        if (rawValue === "") {
                          handleChange(idx, "", "sectionOne");
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
                        handleChange(idx, finalValue, "sectionOne");

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
                      value={sectionOneItemsDate2En[idx]}
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
                          handleChange(idx, newVal, "sectionOne", "date2");
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        // Special case: user is typing just "-"
                        if (inputValue === "-") {
                          handleChange(idx, "-", "sectionOne", "date2");
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
                          handleChange(idx, "-", "sectionOne", "date2");
                          return;
                        }

                        // Handle case where the value is empty after backspace (clear all)
                        if (rawValue === "") {
                          handleChange(idx, "", "sectionOne", "date2");
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
                        handleChange(idx, finalValue, "sectionOne", "date2");

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
                  value={sectionOneTotalLabel}
                  onChange={(e) => setSectionOneTotalLabel(e.target.value)}
                  className="w-full  bg-gray-200 text-black p-1"
                />
              </td>
              <td className="border border-gray-300"></td>
              <td className="border  border-gray-300">
                {formatWithParentheses(TotalsectionOneItemsEn)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionOneItemsDate2En)}
              </td>
            </tr>

         {sectionTwoLabelsEn.map((_, idx) => {

  return (
    <tr key={`section-two-${idx}`} className="bg-gray-100">
      <td className="border border-gray-300">
        <input
          className="w-full h-7 bg-gray-100 text-black p-1"
          value={sectionTwoLabelsEn[idx]}
          placeholder={`${idx + 1}`}
          onChange={(e) =>
            handleChange(
              idx,
              e.target.value,
              "sectionTwoLabel",
              "label"
            )
          }
        />
      </td>
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionTwoNotesEn[idx]}
          onChange={(e) =>
            handleChange(
              idx,
              e.target.value,
              "sectionTwoNote",
              "note"
            )
          }
        />
      </td>

      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          placeholder=""
          value={sectionTwoItemsEn[idx]}
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
              handleChange(idx, newVal, "sectionTwo");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            // Special case: user is typing just "-"
            if (inputValue === "-") {
              handleChange(idx, "-", "sectionTwo");
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
              handleChange(idx, "-", "sectionTwo");
              return;
            }

            // Handle case where the value is empty after backspace (clear all)
            if (rawValue === "") {
              handleChange(idx, "", "sectionTwo");
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
            handleChange(idx, finalValue, "sectionTwo");

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
          value={sectionTwoItemsDate2En[idx]}
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
              handleChange(idx, newVal, "sectionTwo", "date2");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            // Special case: user is typing just "-"
            if (inputValue === "-") {
              handleChange(idx, "-", "sectionTwo", "date2");
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
              handleChange(idx, "-", "sectionTwo", "date2");
              return;
            }

            // Handle case where the value is empty after backspace (clear all)
            if (rawValue === "") {
              handleChange(idx, "", "sectionTwo", "date2");
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
            handleChange(idx, finalValue, "sectionTwo", "date2");

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
                  value={sectionTwoTotalLabel}
                  onChange={(e) => setSectionTwoTotalLabel(e.target.value)}
                  className=" text-start p-0.5 w-full bg-gray-200  fext-row"
                />
              </td>

              <td className="border border-gray-300 bg-gray-200 p-1"></td>

              <td className="border border-gray-300 bg-gray-200 p-1 text-start">
                {TotalsectionTwoItemsEn !== 0 &&
                TotalsectionTwoItemsEn !== undefined
                  ? formatWithParentheses(Number(TotalsectionTwoItemsEn))
                  : ""}
              </td>

              <td className="border border-gray-300 font bg-gray-200 p-1 text-start">
                {TotalsectionTwoItemsDate2En !== 0 &&
                TotalsectionTwoItemsDate2En !== undefined
                  ? formatWithParentheses(Number(TotalsectionTwoItemsDate2En))
                  : ""}
              </td>
            </tr>














       

          {sectionThreeLabelsEn.map((_, idx) => {

  return (
    <tr key={`section-three-${idx}`} className="bg-gray-100">
      <td className="border border-gray-300">
        <input
          className="w-full h-7 bg-gray-100 text-black p-1"
          value={sectionThreeLabelsEn[idx]}
          placeholder={`${idx + 1}`}
          onChange={(e) =>
            handleChange(
              idx,
              e.target.value,
              "sectionThreeLabel",
              "label"
            )
          }
        />
      </td>
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionThreeNotesEn[idx]}
          onChange={(e) =>
            handleChange(
              idx,
              e.target.value,
              "sectionThreeNote",
              "note"
            )
          }
        />
      </td>

      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          placeholder=""
          value={sectionThreeItemsEn[idx]}
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
              handleChange(idx, newVal, "sectionThree");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            // Special case: user is typing just "-"
            if (inputValue === "-") {
              handleChange(idx, "-", "sectionThree");
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
              handleChange(idx, "-", "sectionThree");
              return;
            }

            // Handle case where the value is empty after backspace (clear all)
            if (rawValue === "") {
              handleChange(idx, "", "sectionThree");
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
            handleChange(idx, finalValue, "sectionThree");

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
          value={sectionThreeItemsDate2En[idx]}
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
              handleChange(idx, newVal, "sectionThree", "date2");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            // Special case: user is typing just "-"
            if (inputValue === "-") {
              handleChange(idx, "-", "sectionThree", "date2");
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
              handleChange(idx, "-", "sectionThree", "date2");
              return;
            }

            // Handle case where the value is empty after backspace (clear all)
            if (rawValue === "") {
              handleChange(idx, "", "sectionThree", "date2");
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
            handleChange(idx, finalValue, "sectionThree", "date2");

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
                  value={sectionThreeTotalLabel}
                  onChange={(e) => setSectionThreeTotalLabel(e.target.value)}
                  className="w-full  bg-gray-200 text-black p-1"
                />
              </td>
              <td className="border border-gray-300"></td>

              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionThreeItemsEn)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionThreeItemsDate2En)}
              </td>
            </tr>








      
        {sectionFourLabelsEn.map((_, idx) => {


  return (
    <tr key={`section-four-${idx}`} className="bg-gray-100">
      <td className="border border-gray-300">
        <input
          className="w-full h-7 bg-gray-100 text-black p-1"
          value={sectionFourLabelsEn[idx]}
          placeholder={`${idx + 1}`}
          onChange={(e) =>
            handleChange(
              idx,
              e.target.value,
              "sectionFourLabel",
              "label"
            )
          }
        />
      </td>
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionFourNotesEn[idx]}
          onChange={(e) =>
            handleChange(
              idx,
              e.target.value,
              "sectionFourNote",
              "note"
            )
          }
        />
      </td>

      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          placeholder=""
          value={sectionFourItemsEn[idx]}
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
              handleChange(idx, newVal, "sectionFour");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            // Special case: user is typing just "-"
            if (inputValue === "-") {
              handleChange(idx, "-", "sectionFour");
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
              handleChange(idx, "-", "sectionFour");
              return;
            }

            // Handle case where the value is empty after backspace (clear all)
            if (rawValue === "") {
              handleChange(idx, "", "sectionFour");
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
            handleChange(idx, finalValue, "sectionFour");

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
          value={sectionFourItemsDate2En[idx]}
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
              handleChange(idx, newVal, "sectionFour", "date2");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            // Special case: user is typing just "-"
            if (inputValue === "-") {
              handleChange(idx, "-", "sectionFour", "date2");
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
              handleChange(idx, "-", "sectionFour", "date2");
              return;
            }

            // Handle case where the value is empty after backspace (clear all)
            if (rawValue === "") {
              handleChange(idx, "", "sectionFour", "date2");
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
            handleChange(idx, finalValue, "sectionFour", "date2");

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
              <td className="w-fll">
                {" "}
                <input
                  placeholder=""
                  value={sectionFourTotalLabel}
                  onChange={(e) => setSectionFourTotalLabel(e.target.value)}
                  className=" text-start p-0.5 w-full  bg-gray-200 fext-row"
                />
              </td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionFourItemsEn)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionFourItemsDate2En)}
              </td>
            </tr>


 <br />
  <br />

    <tr className="bg-gray-200 font-semibold">
              <td className="">
                <input
                  value={sectionFourAttribute}
                  onChange={(e) => setSectionFourAttributeLabel(e.target.value)}
                  className="w-full  bg-gray-200 text-black p-1"
                />
              </td>
              <td className=" "></td>
              <td className=" ">
              
              </td>
              <td className="">
             
              </td>
            </tr>














  {sectionFourAttributeLabelsEn.map((_, idx) => {


  return (
    <tr key={`section-four-${idx}`} className="bg-gray-100">
      {/* Label Input */}
      <td className="border border-gray-300">
        <input
          className="w-full h-7 bg-gray-100 text-black p-1"
          value={sectionFourAttributeLabelsEn[idx]}
          placeholder={`${idx + 1}`}
          onChange={(e) =>
            handleChangeAttribute(idx, e.target.value, "sectionFourAttribute", "label")
          }
        />
      </td>
        <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
         
          
        />
      </td>

      {/* Item Input */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          placeholder=""
          value={sectionFourAttributeItemsEn[idx]}
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
              handleChangeAttribute(idx, newVal, "sectionFourAttribute", "item");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChangeAttribute(idx, "-", "sectionFourAttribute", "item");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative = inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChangeAttribute(idx, "-", "sectionFourAttribute", "item");
              return;
            }

            if (rawValue === "") {
              handleChangeAttribute(idx, "", "sectionFourAttribute", "item");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(Number(rawValue));
            const finalValue = isNegative ? `(${formatted})` : formatted;

            handleChangeAttribute(idx, finalValue, "sectionFourAttribute", "item");

            setTimeout(() => {
              const newLength = finalValue.length;
              const offset = newLength - inputValue.length;
              const newPos = caretPos + offset;
              input.setSelectionRange(newPos, newPos);
            }, 0);
          }}
        />
      </td>

      {/* Date2 Input */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionFourAttributeItemsDate2En[idx]}
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
              handleChangeAttribute(idx, newVal, "sectionFourAttribute", "date2");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChangeAttribute(idx, "-", "sectionFourAttribute", "date2");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative = inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChangeAttribute(idx, "-", "sectionFourAttribute", "date2");
              return;
            }

            if (rawValue === "") {
              handleChangeAttribute(idx, "", "sectionFourAttribute", "date2");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(Number(rawValue));
            const finalValue = isNegative ? `(${formatted})` : formatted;

            handleChangeAttribute(idx, finalValue, "sectionFourAttribute", "date2");

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
<br />
 <tr className="bg-gray-100 font-semibold  ">
              <td className="bg-white">
               
              </td>
              <td className=" "></td>
              <td className="p-2  ">
              {formatWithParentheses(TotalsectionFourAttributeItemsEn)}
              </td>
              <td className="">
               {formatWithParentheses(TotalsectionFourAttributeItemsDate2En)}
              </td>
            </tr>

<br />

             <tr className="bg-gray-200 font-semibold  ">
              <td className="">
                <input
                  value={sectionFourOtherComprehensiveIncome}
                  onChange={(e) => setSectionFourOtherComprehensiveIncomeLabel(e.target.value)}
                  className="w-full   bg-gray-200 text-black px-1"
                />
              </td>
              <td className=" "></td>
              <td className="   ">
              </td>
              <td className="">
              
              </td>
            </tr>
             <tr className="bg-gray-200 font-semibold  text-[9px] ">
              <td className="">
                <input
                  value={sectionFourOtherComprehensiveIncomeSubheading}
                  onChange={(e) => setSectionFourOtherComprehensiveIncomeSubheadingLabel(e.target.value)}
                  className="w-full     bg-gray-200 text-black px-1 "
                />
              </td>
              <td className=" "></td>
              <td className="   ">
              </td>
              <td className="">
              
              </td>
            </tr>




  {sectionFourOtherComprehensiveIncomeSubheadingLabelsEn.map((_, idx) => {

  return (
    <tr key={`section-four-other-${idx}`} className="bg-gray-100">
      {/* Label */}
      <td className="border border-gray-300">
        <input
          className="w-full h-7 bg-gray-100 text-black p-1"
          value={sectionFourOtherComprehensiveIncomeSubheadingLabelsEn[idx]}
          placeholder={`${idx + 1}`}
          onChange={(e) =>
            handleChangeOtherComprehensiveIncome(
              idx,
              e.target.value,
              "sectionFourOtherComprehensiveIncomeSubheading",
              "label"
            )
          }
        />
      </td>

      {/* Note */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionFourOtherComprehensiveIncomeSubheadingNotesEn[idx]}
          onChange={(e) =>
            handleChangeOtherComprehensiveIncome(
              idx,
              e.target.value,
              "sectionFourOtherComprehensiveIncomeSubheading",
              "note"
            )
          }
        />
      </td>

      {/* Item */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionFourOtherComprehensiveIncomeSubheadingItemsEn[idx]}
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
              handleChangeOtherComprehensiveIncome(
                idx,
                newVal,
                "sectionFourOtherComprehensiveIncomeSubheading",
                "item"
              );
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChangeOtherComprehensiveIncome(idx, "-", "sectionFourOtherComprehensiveIncomeSubheading", "item");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative = inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChangeOtherComprehensiveIncome(idx, "-", "sectionFourOtherComprehensiveIncomeSubheading", "item");
              return;
            }

            if (rawValue === "") {
              handleChangeOtherComprehensiveIncome(idx, "", "sectionFourOtherComprehensiveIncomeSubheading", "item");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(Number(rawValue));
            const finalValue = isNegative ? `(${formatted})` : formatted;

            handleChangeOtherComprehensiveIncome(idx, finalValue, "sectionFourOtherComprehensiveIncomeSubheading", "item");

            setTimeout(() => {
              const newLength = finalValue.length;
              const offset = newLength - inputValue.length;
              const newPos = caretPos + offset;
              input.setSelectionRange(newPos, newPos);
            }, 0);
          }}
        />
      </td>

      {/* Date2 */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En[idx]}
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
              handleChangeOtherComprehensiveIncome(
                idx,
                newVal,
                "sectionFourOtherComprehensiveIncomeSubheading",
                "date2"
              );
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChangeOtherComprehensiveIncome(idx, "-", "sectionFourOtherComprehensiveIncomeSubheading", "date2");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative = inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChangeOtherComprehensiveIncome(idx, "-", "sectionFourOtherComprehensiveIncomeSubheading", "date2");
              return;
            }

            if (rawValue === "") {
              handleChangeOtherComprehensiveIncome(idx, "", "sectionFourOtherComprehensiveIncomeSubheading", "date2");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(Number(rawValue));
            const finalValue = isNegative ? `(${formatted})` : formatted;

            handleChangeOtherComprehensiveIncome(idx, finalValue, "sectionFourOtherComprehensiveIncomeSubheading", "date2");

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


 <tr className="bg-gray-200 font-semibold  ">
              <td className="">
                <input
                  value={sectionFourOtherTotalComprehensiveIncome}
                  onChange={(e) => setSectionFourOtherToatalComprehensiveIncomeLabel(e.target.value)}
                  className="w-full     bg-gray-200 text-black px-1 "
                />
              </td>
              <td className=" "></td>
              <td className="p-2  ">
              {formatWithParentheses(TotalsectionFourOtherComprehensiveIncomeSubheadingItemsEn)}
              </td>
              <td className="">
               {formatWithParentheses(TotalsectionFourOtherComprehensiveIncomeSubheadingItemsDate2En)}
              </td>
            </tr>



  <br />
  <br />
   <tr className="bg-gray-200 font-semibold">
              <td className="">
                <input
                  value={sectionFourAttribute2}
                  onChange={(e) => setSectionFourAttribute2Label(e.target.value)}
                  className="w-full  bg-gray-200 text-black p-1"
                />
              </td>
              <td className=" "></td>
              <td className=" ">
              
              </td>
              <td className="">
             
              </td>
            </tr>

  {sectionFourAttribute2LabelsEn.map((_, idx) => {


  return (
    <tr key={`section-four-attribute2-${idx}`} className="bg-gray-100">
      {/* Label Input */}
      <td className="border border-gray-300">
        <input
          className="w-full h-7 bg-gray-100 text-black p-1"
          value={sectionFourAttribute2LabelsEn[idx]}
          placeholder={`${idx + 1}`}
          onChange={(e) =>
            handleChangeAttribute2(idx, e.target.value, "label")
          }
        />
      </td>

      {/* Spacer cell (empty column) */}
      <td className="border border-gray-300"></td>

      {/* Item Input */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionFourAttribute2ItemsEn[idx]}
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
              handleChangeAttribute2(idx, newVal, "item");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChangeAttribute2(idx, "-", "item");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative = inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChangeAttribute2(idx, "-", "item");
              return;
            }

            if (rawValue === "") {
              handleChangeAttribute2(idx, "", "item");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(Number(rawValue));
            const finalValue = isNegative ? `(${formatted})` : formatted;

            handleChangeAttribute2(idx, finalValue, "item");

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
          value={sectionFourAttribute2ItemsDate2En[idx]}
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
              handleChangeAttribute2(idx, newVal,  "date2");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChangeAttribute2(idx, "-",  "date2");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative = inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChangeAttribute2(idx, "-",  "date2");
              return;
            }

            if (rawValue === "") {
              handleChangeAttribute2(idx, "",  "date2");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(Number(rawValue));
            const finalValue = isNegative ? `(${formatted})` : formatted;

            handleChangeAttribute2(idx, finalValue,  "date2");

            setTimeout(() => {
              const newLength = finalValue.length;
              const offset = newLength - inputValue.length;
              const newPos = caretPos + offset;
              input.setSelectionRange(newPos, newPos);
            }, 0)
          }}
        />
      </td>
    </tr>
  )
})} 
<br />
{/* Total Row */}
<tr className="bg-gray-100 font-semibold">
  <td className="bg-white"></td>
  <td></td>
  <td className="p-2">
    {formatWithParentheses(TotalsectionFourAttribute2ItemsEn)}
  </td>
  <td>
    {formatWithParentheses(TotalsectionFourAttribute2ItemsDate2En)}
  </td>
</tr>
<br />























            {sectionFiveLabelsEn.map((_, idx) => {


  return (
    <tr key={`section-five-${idx}`} className="bg-gray-100">
      <td className="border border-gray-300">
        <input
          className="w-full h-7 bg-gray-100 text-black p-1"
          value={sectionFiveLabelsEn[idx]}
          placeholder={`${idx + 1}`}
          onChange={(e) =>
            handleChange(
              idx,
              e.target.value,
              "sectionFiveLabel",
              "label"
            )
          }
        />
      </td>
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionFiveNotesEn[idx]}
          onChange={(e) =>
            handleChange(
              idx,
              e.target.value,
              "sectionFiveNote",
              "note"
            )
          }
        />
      </td>

      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          placeholder=""
          value={sectionFiveItemsEn[idx]}
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
              handleChange(idx, newVal, "sectionFive");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            // Special case: user is typing just "-"
            if (inputValue === "-") {
              handleChange(idx, "-", "sectionFive");
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
              handleChange(idx, "-", "sectionFive");
              return;
            }

            // Handle case where the value is empty after backspace (clear all)
            if (rawValue === "") {
              handleChange(idx, "", "sectionFive");
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
            handleChange(idx, finalValue, "sectionFive");

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
          value={sectionFiveItemsDate2En[idx]}
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
              handleChange(idx, newVal, "sectionFive", "date2");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            // Special case: user is typing just "-"
            if (inputValue === "-") {
              handleChange(idx, "-", "sectionFive", "date2");
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
              handleChange(idx, "-", "sectionFive", "date2");
              return;
            }

            // Handle case where the value is empty after backspace (clear all)
            if (rawValue === "") {
              handleChange(idx, "", "sectionFive", "date2");
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
            handleChange(idx, finalValue, "sectionFive", "date2");

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
                {" "}
                <input
                  placeholder=""
                  value={sectionFiveTotalLabel}
                  onChange={(e) => setSectionFiveTotalLabel(e.target.value)}
                  className=" text-start p-0.5   bg-gray-200 fext-row"
                />
              </td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionFiveItemsEn)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionFiveItemsDate2En)}
              </td>
            </tr>










       {sectionSixLabelsEn.map((_, idx) => {


  return (
    <tr key={`section-six-${idx}`} className="bg-gray-100">
      <td className="border border-gray-300">
        <input
          className="w-full h-7 bg-gray-100 text-black p-1"
          value={sectionSixLabelsEn[idx]}
          placeholder={`${idx + 1}`}
          onChange={(e) =>
            handleChange(
              idx,
              e.target.value,
              "sectionSixLabel",
              "label"
            )
          }
        />
      </td>
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionSixNotesEn[idx]}
          onChange={(e) =>
            handleChange(
              idx,
              e.target.value,
              "sectionSixNote",
              "note"
            )
          }
        />
      </td>

      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          placeholder=""
          value={sectionSixItemsEn[idx]}
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
              handleChange(idx, newVal, "sectionSix");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            // Special case: user is typing just "-"
            if (inputValue === "-") {
              handleChange(idx, "-", "sectionSix");
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
              handleChange(idx, "-", "sectionSix");
              return;
            }

            // Handle case where the value is empty after backspace (clear all)
            if (rawValue === "") {
              handleChange(idx, "", "sectionSix");
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
            handleChange(idx, finalValue, "sectionSix");

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
          value={sectionSixItemsDate2En[idx]}
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
              handleChange(idx, newVal, "sectionSix", "date2");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            // Special case: user is typing just "-"
            if (inputValue === "-") {
              handleChange(idx, "-", "sectionSix", "date2");
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
              handleChange(idx, "-", "sectionSix", "date2");
              return;
            }

            // Handle case where the value is empty after backspace (clear all)
            if (rawValue === "") {
              handleChange(idx, "", "sectionSix", "date2");
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
            handleChange(idx, finalValue, "sectionSix", "date2");

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
                {" "}
                <input
                  placeholder=""
                  value={sectionSixTotalLabel}
                  onChange={(e) => setSectionSixTotalLabel(e.target.value)}
                  className=" text-start p-0.5   bg-gray-200 fext-row"
                />
              </td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionSixItemsEn)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionSixItemsDate2En)}
              </td>
            </tr>





          </tbody>

        </table>
      </div>
    );
  }
);

export default CashFlowUpdateFormAr;
