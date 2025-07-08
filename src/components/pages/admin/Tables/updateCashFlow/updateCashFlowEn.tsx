/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../reduxKit/store";
import { SetCashFlowDataEnglishAction } from "../../../../../reduxKit/actions/Tables/cashFlowEn";

type BalaceSheetFormArProps = { TableDataEn:   any };



const CashFlowUpdateFormEn: React.FC<BalaceSheetFormArProps> = React.memo( ({ TableDataEn }) => {
    // Updated state declarations with empty strings as initial values
    const dispatch = useDispatch<AppDispatch>();
    // Helper function to safely parse numeric values from strings
    const parseNumericValue = (value: string): number => {
      if (!value || value.trim() === "-" || value.trim() === "") return 0;

      const isNegative =
 value.trim().startsWith("(") && value.trim().endsWith(")");
      const cleaned = value.replace(/[(),]/g, "");
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



    const autoResizeTextarea = (el: any | null) => {
  if (el) {
    el.style.height = 'auto'; // Reset height
    el.style.height = el.scrollHeight + 'px'; // Set new height
  }
};

const textareaRef = useRef<any | null>(null);


useEffect(() => {
  autoResizeTextarea(textareaRef.current);
},);

    const [date1Rl, setDate1Rl] = useState("'000");
    const [date2Rl, setDate2Rl] = useState("'000");
    const [date1, setDate1] = useState("(Unaudited)");
    const [date2, setDate2] = useState("(Audited)");

    const [data1En, setDate1En] = useState<Date | null>(null);
    const [data2En, setDate2En] = useState<Date | null>(null);
  
    // section One
    const [sectionOneFirstLabelEn, setSectionOneFirstLabelEn] = useState("" );
    const [sectionOneSecondLabelEn, setSectionOneSecondLabelEn] = useState("" );
    const [sectionOneLabelsEn, setSectionOneLabelsEn] = useState<string[]>(      Array(2).fill("") );
    const [sectionOneNotesEn, setFlowSectionOneNotesEn] = useState<string[]>(     Array(2).fill("") );
    const [sectionOneItemsEn, setFlowSectionOneEn] = useState<string[]>(Array(2).fill(""));
    const [sectionOneItemsDate2En, setFlowSectionOneDate2En] = useState<string[] >(Array(2).fill(""));
 

    // section Two
     const [sectionTwoFirstLabel, setSectionTwoFirstLabel] = useState("");
    const [sectionTwoLabelsEn, setSectionTwoLabelsEn] = useState<string[]>(   Array(23).fill("")  );
    const [sectionTwoNotesEn, setFlowSectionTwoNotesEn] = useState<string[]>(  Array(23).fill("")   );
    const [sectionTwoItemsEn, setFlowSectionTwoEn] = useState<string[]>(  Array(23).fill("")   );
    const [sectionTwoItemsDate2En, setFlowSectionTwoDate2En] = useState<    string[]  >(Array(23).fill(""));
    const [sectionTwoTotalLabel, setSectionTwoTotalLabel] = useState("");
      const [sectionTwoTotalNote, setSectionTwoTotalNote] = useState("");
    const TotalsectionTwoItemsEn =   sumStringValues(sectionTwoItemsEn);
    const TotalsectionTwoItemsDate2En = sumStringValues(sectionTwoItemsDate2En);

    // section Three
      const [sectionThreeFirstLabel, setSectionThreeFirstLabel] = useState("");
    const [sectionThreeLabelsEn, setSectionThreeLabelsEn] = useState<string[]>(Array(17).fill(""));
   const [sectionThreeNotesEn, setFlowSectionThreeNotesEn] = useState<string[] >(Array(17).fill(""));
    const [sectionThreeItemsEn, setFlowSectionThreeEn] = useState<string[]>(     Array(17).fill("")   );
    const [sectionThreeItemsDate2En, setFlowSectionThreeDate2En] = useState<     string[]    >(Array(17).fill(""));
    const [sectionThreeTotalLabel, setSectionThreeTotalLabel] = useState("");
     const [sectionThreeTotalNote, setSectionThreeTotalNote] = useState("");
    const TotalsectionThreeItemsEn =      sumStringValues(sectionThreeItemsEn);
    const TotalsectionThreeItemsDate2En =     sumStringValues(sectionThreeItemsDate2En);


    // sectoin Four
     const [sectionFourFirstLabel, setSectionFourFirstLabel] = useState("");
    const [sectionFourLabelsEn, setSectionFourLabelsEn] = useState<string[]>( Array(17).fill(""));
    const [sectionFourNotesEn, setFlowSectionFourNotesEn] = useState<string[]>( Array(17).fill(""));
    const [sectionFourItemsEn, setFlowSectionFourEn] = useState<string[]>(Array(17).fill("") );
    const [sectionFourItemsDate2En, setFlowSectionFourDate2En] = useState<string[] >(Array(17).fill(""));
    const [sectionFourTotalLabel, setSectionFourTotalLabel] = useState("");
         const [sectionFourTotalNote, setSectionFourTotalNote] = useState("");
    const TotalsectionFourItemsEn =  sumStringValues(sectionFourItemsEn);
    const TotalsectionFourItemsDate2En =  sumStringValues(sectionFourItemsDate2En);

    // section Five
const [sectionFiveFirstLabel, setSectionFiveFirstLabel] = useState("");
const [sectionFiveLabelsEn, setSectionFiveLabelsEn] = useState<string[]>(Array(15 ).fill(""));
const [sectionFiveNotesEn, setSectionFiveNotesEn] = useState<string[]>(Array(15 ).fill(""));
const [sectionFiveItemsEn, setSectionFiveItemsEn] = useState<string[]>(Array(15 ).fill(""));
const [sectionFiveItemsDate2En, setSectionFiveItemsDate2En] = useState<string[]>(Array(15 ).fill(""));
const [sectionFiveTotalLabel, setSectionFiveTotalLabel] = useState("");
const [sectionFiveTotalNote, setSectionFiveTotalNote] = useState("");
const TotalsectionFiveItemsEn = sumStringValues(sectionFiveItemsEn);
const TotalsectionFiveItemsDate2En = sumStringValues(sectionFiveItemsDate2En);

// section Six
const [sectionSixFirstLabel, setSectionSixFirstLabel] = useState("");
const [sectionSixLabelsEn, setSectionSixLabelsEn] = useState<string[]>(Array(12).fill(""));
const [sectionSixNotesEn, setSectionSixNotesEn] = useState<string[]>(Array(12).fill(""));
const [sectionSixItemsEn, setSectionSixItemsEn] = useState<string[]>(Array(12).fill(""));
const [sectionSixItemsDate2En, setSectionSixItemsDate2En] = useState<string[]>(Array(12).fill(""));
const [sectionSixTotalLabel, setSectionSixTotalLabel] = useState("");
const [sectionSixTotalNote, setSectionSixTotalNote] = useState("");
const TotalsectionSixItemsEn = sumStringValues(sectionSixItemsEn);
const TotalsectionSixItemsDate2En = sumStringValues(sectionSixItemsDate2En);

const [sectionSixSecondTotalLabel, setSectionSixSecondTotalLabel] = useState("");
const [sectionSixSecondTotalNote, setSectionSixSecondTotalNote] = useState("");
const TotalsectionSixSecondItemsEn = sumStringValues(sectionSixItemsEn);
const TotalsectionSixSecondItemsDate2En = sumStringValues(sectionSixItemsDate2En);

// section Seven
const [sectionSevenLabelsEn, setSectionSevenLabelsEn] = useState<string[]>(Array(2).fill(""));
const [sectionSevenNotesEn, setSectionSevenNotesEn] = useState<string[]>(Array(2).fill(""));
const [sectionSevenItemsEn, setSectionSevenItemsEn] = useState<string[]>(Array(2).fill(""));
const [sectionSevenItemsDate2En, setSectionSevenItemsDate2En] = useState<string[]>(Array(2).fill(""));
const [sectionSevenTotalLabel, setSectionSevenTotalLabel] = useState("");
const [sectionSevenTotalNote, setSectionSevenTotalNote] = useState("");
const TotalsectionSevenItemsEn = sumStringValues(sectionSevenItemsEn);
const TotalsectionSevenItemsDate2En = sumStringValues(sectionSevenItemsDate2En);

// section Eight
const [sectionEightLabelsEn, setSectionEightLabelsEn] = useState<string[]>(Array(8).fill(""));
const [sectionEightNotesEn, setSectionEightNotesEn] = useState<string[]>(Array(8).fill(""));
const [sectionEightItemsEn, setSectionEightItemsEn] = useState<string[]>(Array(8).fill(""));
const [sectionEightItemsDate2En, setSectionEightItemsDate2En] = useState<string[]>(Array(8).fill(""));
const [sectionEightLastLabel, setSectionEightLastLabel] = useState("");


// table2 section
    const [date1Table2, setDate1Table2] = useState<Date | null>(null);
    const [date2Table2, setDate2Table2] = useState<Date | null>(null);

// section Nine
const [sectionNineLabelsEn, setSectionNineLabelsEn] = useState<string[]>(Array(16).fill(""));
const [sectionNineNotesEn, setSectionNineNotesEn] = useState<string[]>(Array(16).fill(""));
const [sectionNineItemsEn, setSectionNineItemsEn] = useState<string[]>(Array(16).fill(""));
const [sectionNineItemsDate2En, setSectionNineItemsDate2En] = useState<string[]>(Array(16).fill(""));






 useEffect(() => {
  const handleDispatch = async () => {
    try {
     const formData = {
  // Main dates
  date1: data1En,
  date2: data2En,

  // Section One - Operating activities
  sectionOne: {
    sectionOneFirstLabelEn,
    sectionOneSecondLabelEn,
    sectionOneLabelsEn,
    sectionOneNotesEn,
    sectionOneItemsEn,
    sectionOneItemsDate2En,
  },

  // Section Two - Adjustments for
  sectionTwo: {
    sectionTwoFirstLabel,
    sectionTwoLabelsEn,
    sectionTwoNotesEn,
    sectionTwoItemsEn,
    sectionTwoItemsDate2En,
    sectionTwoTotalLabel,
       sectionTwoTotalNote,
    TotalsectionTwoItemsEn,
    TotalsectionTwoItemsDate2En,
  },

  // Section Three - Working capital adjustments
  sectionThree: {
    sectionThreeFirstLabel,
    sectionThreeLabelsEn,
    sectionThreeNotesEn,
    sectionThreeItemsEn,
    sectionThreeItemsDate2En,
    sectionThreeTotalLabel,
        sectionThreeTotalNote,
    TotalsectionThreeItemsEn,
    TotalsectionThreeItemsDate2En,
  },

  // Section Four - Other changes
  sectionFour: {
    sectionFourFirstLabel,
    sectionFourLabelsEn,
    sectionFourNotesEn,
    sectionFourItemsEn,
    sectionFourItemsDate2En,
    sectionFourTotalLabel,
     sectionFourTotalNote,
    TotalsectionFourItemsEn,
    TotalsectionFourItemsDate2En,
  },

  // Section Five - Investing activities
  sectionFive: {
    sectionFiveFirstLabel,
    sectionFiveLabelsEn,
    sectionFiveNotesEn,
    sectionFiveItemsEn,
    sectionFiveItemsDate2En,
    sectionFiveTotalLabel,
        sectionFiveTotalNote,
    TotalsectionFiveItemsEn,
    TotalsectionFiveItemsDate2En,
  },

  // Section Six - Financing activities
  sectionSix: {
    sectionSixFirstLabel,
    sectionSixLabelsEn,
    sectionSixNotesEn,
    sectionSixItemsEn,
    sectionSixItemsDate2En,
    sectionSixTotalLabel,
        sectionSixTotalNote,
    TotalsectionSixItemsEn,
    TotalsectionSixItemsDate2En,
    sectionSixSecondTotalLabel,
        sectionSixSecondTotalNote,
    TotalsectionSixSecondItemsEn,
    TotalsectionSixSecondItemsDate2En,
  },

  // Section Seven - Cash and cash equivalents
  sectionSeven: {
    sectionSevenLabelsEn,
    sectionSevenNotesEn,
    sectionSevenItemsEn,
    sectionSevenItemsDate2En,
    sectionSevenTotalLabel,
    sectionSevenTotalNote,
    TotalsectionSevenItemsEn,
    TotalsectionSevenItemsDate2En,
  },

  // Section Eight - Significant non-cash transactions
  sectionEight: {
    sectionEightLabelsEn,
    sectionEightNotesEn,
    sectionEightItemsEn,
    sectionEightItemsDate2En,
    sectionEightLastLabel,
  },

  // Table2 - Second table with its own dates
  Table2: {
    dateTwo1En: date1Table2,
    dateTwo2En: date2Table2,
    sectionOneTable2: {
      sectionNineLabelsEn,
      sectionNineNotesEn,
      sectionNineItemsEn,
      sectionNineItemsDate2En,
    }
  }
};
      await dispatch(SetCashFlowDataEnglishAction(formData));
    } catch (error) {
      console.log("Dispatch Error:", error);
    }
  };

  handleDispatch();
}, [
  // Main dates
  data1En,
  data2En,

  // Section One
  sectionOneFirstLabelEn,
  sectionOneSecondLabelEn,
  sectionOneLabelsEn,
  sectionOneNotesEn,
  sectionOneItemsEn,
  sectionOneItemsDate2En,

  // Section Two
  sectionTwoFirstLabel,
  sectionTwoLabelsEn,
  sectionTwoNotesEn,
  sectionTwoItemsEn,
  sectionTwoItemsDate2En,
  sectionTwoTotalLabel,
    sectionTwoTotalNote,
  TotalsectionTwoItemsEn,
  TotalsectionTwoItemsDate2En,

  // Section Three
  sectionThreeFirstLabel,
  sectionThreeLabelsEn,
  sectionThreeNotesEn,
  sectionThreeItemsEn,
  sectionThreeItemsDate2En,
  sectionThreeTotalLabel,
    sectionThreeTotalNote,
  TotalsectionThreeItemsEn,
  TotalsectionThreeItemsDate2En,

  // Section Four
  sectionFourFirstLabel,
  sectionFourLabelsEn,
  sectionFourNotesEn,
  sectionFourItemsEn,
  sectionFourItemsDate2En,
  sectionFourTotalLabel,
    sectionFourTotalNote,
  TotalsectionFourItemsEn,
  TotalsectionFourItemsDate2En,

  // Section Five
  sectionFiveFirstLabel,
  sectionFiveLabelsEn,
  sectionFiveNotesEn,
  sectionFiveItemsEn,
  sectionFiveItemsDate2En,
  sectionFiveTotalLabel,
  sectionFiveTotalNote,
  TotalsectionFiveItemsEn,
  TotalsectionFiveItemsDate2En,

  // Section Six
  sectionSixFirstLabel,
  sectionSixLabelsEn,
  sectionSixNotesEn,
  sectionSixItemsEn,
  sectionSixItemsDate2En,
  sectionSixTotalLabel,
    sectionSixTotalNote,
  TotalsectionSixItemsEn,
  TotalsectionSixItemsDate2En,
  sectionSixSecondTotalLabel,
    sectionSixSecondTotalNote,
  TotalsectionSixSecondItemsEn,
  TotalsectionSixSecondItemsDate2En,

  // Section Seven
  sectionSevenLabelsEn,
  sectionSevenNotesEn,
  sectionSevenItemsEn,
  sectionSevenItemsDate2En,
  sectionSevenTotalLabel,
  sectionSevenTotalNote,
  TotalsectionSevenItemsEn,
  TotalsectionSevenItemsDate2En,

  // Section Eight
  sectionEightLabelsEn,
  sectionEightNotesEn,
  sectionEightItemsEn,
  sectionEightItemsDate2En,
  sectionEightLastLabel,

  // Table2
  date1Table2,
  date2Table2,
  sectionNineLabelsEn,
  sectionNineNotesEn,
  sectionNineItemsEn,
  sectionNineItemsDate2En,
  dispatch
]);





// useEffect(()=>{
// console.log("the update cashflow data is the data : ", TableDataEn);

// if(TableDataEn && Object.keys(TableDataEn).length > 0){



// }
// },[TableDataEn])




// Complete useEffect to populate all data from MongoDB
useEffect(() => {
 
  
 if(TableDataEn && Object.keys(TableDataEn).length > 0){
    try {
      if (TableDataEn.date1En) {
        setDate1En(new Date(TableDataEn.date1En));
      }
      if (TableDataEn.date2En) {
        setDate2En(new Date(TableDataEn.date2En));
      }
      
      // Section One
      if (TableDataEn.sectionOne) {
        setSectionOneFirstLabelEn(TableDataEn.sectionOne.sectionOneFirstLabelEn );
        setSectionOneSecondLabelEn(TableDataEn.sectionOne.sectionOneSecondLabelEn)
        setSectionOneLabelsEn(TableDataEn.sectionOne.sectionOneLabelsEn || Array(2).fill(""));
        setFlowSectionOneNotesEn(TableDataEn.sectionOne.sectionOneNotesEn || Array(2).fill(""));
        setFlowSectionOneEn(TableDataEn.sectionOne.sectionOneItemsEn || Array(2).fill(""));
        setFlowSectionOneDate2En(TableDataEn.sectionOne.sectionOneItemsDate2En || Array(2).fill(""));
    
      }
      
      // Section Two
      if (TableDataEn.sectionTwo) {
        setSectionTwoFirstLabel(TableDataEn.sectionTwo.sectionTwoFirstLabel)
        setSectionTwoLabelsEn(TableDataEn.sectionTwo.sectionTwoLabelsEn || Array(23).fill(""));
        setFlowSectionTwoNotesEn(TableDataEn.sectionTwo.sectionTwoNotesEn || Array(23).fill(""));
        setFlowSectionTwoEn(TableDataEn.sectionTwo.sectionTwoItemsEn || Array(23).fill(""));
        setFlowSectionTwoDate2En(TableDataEn.sectionTwo.sectionTwoItemsDate2En || Array(23).fill(""));
        setSectionTwoTotalLabel(TableDataEn.sectionTwo.sectionTwoTotalLabel );
      }
      
      // Section Three
      if (TableDataEn.sectionThree) {
        setSectionThreeFirstLabel(TableDataEn.sectionThree.sectionThreeFirstLabel)
        setSectionThreeLabelsEn(TableDataEn.sectionThree.sectionThreeLabelsEn || Array(17).fill(""));
        setFlowSectionThreeNotesEn(TableDataEn.sectionThree.sectionThreeNotesEn || Array(17).fill(""));
        setFlowSectionThreeEn(TableDataEn.sectionThree.sectionThreeItemsEn || Array(17).fill(""));
        setFlowSectionThreeDate2En(TableDataEn.sectionThree.sectionThreeItemsDate2En || Array(17).fill(""));
        setSectionThreeTotalLabel(TableDataEn.sectionThree.sectionThreeTotalLabel );
      }
      
      // Section Four
      if (TableDataEn.sectionFour) {
        setSectionFourFirstLabel(TableDataEn.sectionFour.sectionFourFirstLabel)
        setSectionFourLabelsEn(TableDataEn.sectionFour.sectionFourLabelsEn || Array(17).fill(""));
        setFlowSectionFourNotesEn(TableDataEn.sectionFour.sectionFourNotesEn || Array(17).fill(""));
        setFlowSectionFourEn(TableDataEn.sectionFour.sectionFourItemsEn || Array(17).fill(""));
        setFlowSectionFourDate2En(TableDataEn.sectionFour.sectionFourItemsDate2En || Array(17).fill(""));
        setSectionFourTotalLabel(TableDataEn.sectionFour.sectionFourTotalLabel );
      }
      if (TableDataEn.sectionFive) {
  setSectionFiveFirstLabel(TableDataEn.sectionFive.sectionFiveFirstLabel);
  setSectionFiveLabelsEn(TableDataEn.sectionFive.sectionFiveLabelsEn || Array(15).fill(""));
  setSectionFiveNotesEn(TableDataEn.sectionFive.sectionFiveNotesEn || Array(15).fill(""));
  setSectionFiveItemsEn(TableDataEn.sectionFive.sectionFiveItemsEn || Array(15).fill(""));
  setSectionFiveItemsDate2En(TableDataEn.sectionFive.sectionFiveItemsDate2En || Array(15).fill(""));
  setSectionFiveTotalLabel(TableDataEn.sectionFive.sectionFiveTotalLabel);
}
if (TableDataEn.sectionSix) {
  setSectionSixFirstLabel(TableDataEn.sectionSix.sectionSixFirstLabel);
  setSectionSixLabelsEn(TableDataEn.sectionSix.sectionSixLabelsEn || Array(12).fill(""));
  setSectionSixNotesEn(TableDataEn.sectionSix.sectionSixNotesEn || Array(12).fill(""));
  setSectionSixItemsEn(TableDataEn.sectionSix.sectionSixItemsEn || Array(12).fill(""));
  setSectionSixItemsDate2En(TableDataEn.sectionSix.sectionSixItemsDate2En || Array(12).fill(""));
  setSectionSixTotalLabel(TableDataEn.sectionSix.sectionSixTotalLabel);
  setSectionSixSecondTotalLabel(TableDataEn.sectionSix.sectionSixSecondTotalLabel);
}

if (TableDataEn.sectionSeven) {
  setSectionSevenLabelsEn(TableDataEn.sectionSeven.sectionSevenLabelsEn || Array(2).fill(""));
  setSectionSevenNotesEn(TableDataEn.sectionSeven.sectionSevenNotesEn || Array(2).fill(""));
  setSectionSevenItemsEn(TableDataEn.sectionSeven.sectionSevenItemsEn || Array(2).fill(""));
  setSectionSevenItemsDate2En(TableDataEn.sectionSeven.sectionSevenItemsDate2En || Array(2).fill(""));
  setSectionSevenTotalLabel(TableDataEn.sectionSeven.sectionSevenTotalLabel);
}

if (TableDataEn.sectionEight) {
  setSectionEightLabelsEn(TableDataEn.sectionEight.sectionEightLabelsEn || Array(8).fill(""));
  setSectionEightNotesEn(TableDataEn.sectionEight.sectionEightNotesEn || Array(8).fill(""));
  setSectionEightItemsEn(TableDataEn.sectionEight.sectionEightItemsEn || Array(8).fill(""));
  setSectionEightItemsDate2En(TableDataEn.sectionEight.sectionEightItemsDate2En || Array(8).fill(""));
  setSectionEightLastLabel(TableDataEn.sectionEight.sectionEightLastLabel);
}

      // Table 2 sections
    
        setDate1Table2(new Date(TableDataEn.Table2.dateTwo1En))
        setDate2Table2(new Date(TableDataEn.Table2.dateTwo2En))

    setSectionNineLabelsEn(TableDataEn.Table2.sectionOneTable2.sectionNineLabelsEn ||Array(16).fill(""))
    setSectionNineNotesEn(TableDataEn.Table2.sectionOneTable2.sectionNineNotesEn ||Array(16).fill(""))
    setSectionNineItemsEn(TableDataEn.Table2.sectionOneTable2.sectionNineItemsEn ||Array(16).fill(""))
    setSectionNineItemsDate2En(TableDataEn.Table2.sectionOneTable2.sectionNineItemsDate2En ||Array(16).fill(""))

 

      
      
    } catch (error) {
      console.error("Error loading financial data into state:", error);
    }
  } else {
    console.log("TableDataEn is empty or undefined");
  }
}, [TableDataEn]);






























        const handleChange = (
  index: number,
  value: string,
  type: string,
  column: "date1" | "date2" | "label" | "note" = "date1"
) => {
  if (column === "label") {
    // Section One Labels
    if (type === "sectionOneLabel") {
      const updated = [...sectionOneLabelsEn];
      updated[index] = value;
      setSectionOneLabelsEn(updated);
    }
    // Section Two Labels
    else if (type === "sectionTwoLabel") {
      const updated = [...sectionTwoLabelsEn];
      updated[index] = value;
      setSectionTwoLabelsEn(updated);
    }
    // Section Three Labels
    else if (type === "sectionThreeLabel") {
      const updated = [...sectionThreeLabelsEn];
      updated[index] = value;
      setSectionThreeLabelsEn(updated);
    }
    // Section Four Labels
    else if (type === "sectionFourLabel") {
      const updated = [...sectionFourLabelsEn];
      updated[index] = value;
      setSectionFourLabelsEn(updated);
    }
    // Section Five Labels
    else if (type === "sectionFiveLabel") {
      const updated = [...sectionFiveLabelsEn];
      updated[index] = value;
      setSectionFiveLabelsEn(updated);
    }
    // Section Six Labels
    else if (type === "sectionSixLabel") {
      const updated = [...sectionSixLabelsEn];
      updated[index] = value;
      setSectionSixLabelsEn(updated);
    }
    // Section Seven Labels
    else if (type === "sectionSevenLabel") {
      const updated = [...sectionSevenLabelsEn];
      updated[index] = value;
      setSectionSevenLabelsEn(updated);
    }
    // Section Eight Labels
    else if (type === "sectionEightLabel") {
      const updated = [...sectionEightLabelsEn];
      updated[index] = value;
      setSectionEightLabelsEn(updated);
    }
    // Section Nine Labels
    else if (type === "sectionNineLabel") {
      const updated = [...sectionNineLabelsEn];
      updated[index] = value;
      setSectionNineLabelsEn(updated);
    }
    return;
  }

  // For numeric fields (date1 column)
  if (column === "date1") {
    // Section One Items
    if (type === "sectionOne") {
      const updated = [...sectionOneItemsEn];
      updated[index] = value;
      setFlowSectionOneEn(updated);
    }
    // Section Two Items
    else if (type === "sectionTwo") {
      const updated = [...sectionTwoItemsEn];
      updated[index] = value;
      setFlowSectionTwoEn(updated);
    }
    // Section Three Items
    else if (type === "sectionThree") {
      const updated = [...sectionThreeItemsEn];
      updated[index] = value;
      setFlowSectionThreeEn(updated);
    }
    // Section Four Items
    else if (type === "sectionFour") {
      const updated = [...sectionFourItemsEn];
      updated[index] = value;
      setFlowSectionFourEn(updated);
    }
    // Section Five Items
    else if (type === "sectionFive") {
      const updated = [...sectionFiveItemsEn];
      updated[index] = value;
      setSectionFiveItemsEn(updated);
    }
    // Section Six Items
    else if (type === "sectionSix") {
      const updated = [...sectionSixItemsEn];
      updated[index] = value;
      setSectionSixItemsEn(updated);
    }
    // Section Seven Items
    else if (type === "sectionSeven") {
      const updated = [...sectionSevenItemsEn];
      updated[index] = value;
      setSectionSevenItemsEn(updated);
    }
    // Section Eight Items
    else if (type === "sectionEight") {
      const updated = [...sectionEightItemsEn];
      updated[index] = value;
      setSectionEightItemsEn(updated);
    }
    // Section Nine Items
    else if (type === "sectionNine") {
      const updated = [...sectionNineItemsEn];
      updated[index] = value;
      setSectionNineItemsEn(updated);
    }
  }
  // For date2 column
  else if (column === "date2") {
    // Section One Items Date2
    if (type === "sectionOne") {
      const updated = [...sectionOneItemsDate2En];
      updated[index] = value;
      setFlowSectionOneDate2En(updated);
    }
    // Section Two Items Date2
    else if (type === "sectionTwo") {
      const updated = [...sectionTwoItemsDate2En];
      updated[index] = value;
      setFlowSectionTwoDate2En(updated);
    }
    // Section Three Items Date2
    else if (type === "sectionThree") {
      const updated = [...sectionThreeItemsDate2En];
      updated[index] = value;
      setFlowSectionThreeDate2En(updated);
    }
    // Section Four Items Date2
    else if (type === "sectionFour") {
      const updated = [...sectionFourItemsDate2En];
      updated[index] = value;
      setFlowSectionFourDate2En(updated);
    }
    // Section Five Items Date2
    else if (type === "sectionFive") {
      const updated = [...sectionFiveItemsDate2En];
      updated[index] = value;
      setSectionFiveItemsDate2En(updated);
    }
    // Section Six Items Date2
    else if (type === "sectionSix") {
      const updated = [...sectionSixItemsDate2En];
      updated[index] = value;
      setSectionSixItemsDate2En(updated);
    }
    // Section Seven Items Date2
    else if (type === "sectionSeven") {
      const updated = [...sectionSevenItemsDate2En];
      updated[index] = value;
      setSectionSevenItemsDate2En(updated);
    }
    // Section Eight Items Date2
    else if (type === "sectionEight") {
      const updated = [...sectionEightItemsDate2En];
      updated[index] = value;
      setSectionEightItemsDate2En(updated);
    }
    // Section Nine Items Date2
    else if (type === "sectionNine") {
      const updated = [...sectionNineItemsDate2En];
      updated[index] = value;
      setSectionNineItemsDate2En(updated);
    }
  }
  // For notes column
  else if (column === "note") {
    // Section One Notes
    if (type === "sectionOneNote") {
      const updated = [...sectionOneNotesEn];
      updated[index] = value;
      setFlowSectionOneNotesEn(updated);
    }
    // Section Two Notes
    else if (type === "sectionTwoNote") {
      const updated = [...sectionTwoNotesEn];
      updated[index] = value;
      setFlowSectionTwoNotesEn(updated);
    }
    // Section Three Notes
    else if (type === "sectionThreeNote") {
      const updated = [...sectionThreeNotesEn];
      updated[index] = value;
      setFlowSectionThreeNotesEn(updated);
    }
    // Section Four Notes
    else if (type === "sectionFourNote") {
      const updated = [...sectionFourNotesEn];
      updated[index] = value;
      setFlowSectionFourNotesEn(updated);
    }
    // Section Five Notes
    else if (type === "sectionFiveNote") {
      const updated = [...sectionFiveNotesEn];
      updated[index] = value;
      setSectionFiveNotesEn(updated);
    }
    // Section Six Notes
    else if (type === "sectionSixNote") {
      const updated = [...sectionSixNotesEn];
      updated[index] = value;
      setSectionSixNotesEn(updated);
    }
    // Section Seven Notes
    else if (type === "sectionSevenNote") {
      const updated = [...sectionSevenNotesEn];
      updated[index] = value;
      setSectionSevenNotesEn(updated);
    }
    // Section Eight Notes
    else if (type === "sectionEightNote") {
      const updated = [...sectionEightNotesEn];
      updated[index] = value;
      setSectionEightNotesEn(updated);
    }
    // Section Nine Notes
    else if (type === "sectionNineNote") {
      const updated = [...sectionNineNotesEn];
      updated[index] = value;
      setSectionNineNotesEn(updated);
    }
  }
};










    return (
      <div className="flex justify-start  my-2 text-black">
        <table className="border  font-semibold border-gray-300 text-xs mb-12  w-full">

          <thead>
            <tr className="bg-gray-100 ">
              <th className="border border-gray-100 w-96"></th>
              <th className="border border-gray-100 w-16">Notes</th>
              <th className="border  border-gray-100 p-1 w-28   ">
                <input
                  type="date"
                  className="text-center   h-5  bg-gray-100"
                  placeholder=""
                  value={data1En ? data1En.toISOString().split("T")[0] : ""}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    setDate1En(selectedDate ? new Date(selectedDate) : null);
                  }}
                  lang="en"
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
                  value={data2En ? data2En.toISOString().split("T")[0] : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDate2En(value ? new Date(value) : null);
                  }}
                  placeholder=""
                  className="text-center bg-gray-100"
                  type="date"
                  lang="en"
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
            <tr className="bg-gray-300 font-semibold">
              <td className=""> 
                <input
                  value={sectionOneFirstLabelEn}
                  onChange={(e) => setSectionOneFirstLabelEn(e.target.value)}
                  className="w-full  bg-gray-300 text-black p-1"
                />
              </td>
              <td className=""></td>
              <td className=""></td>
              <td className=""></td>
            </tr>
            <tr className="bg-gray-200 font-semibold">
              <td className="">
                <input
                  value={sectionOneSecondLabelEn}
                  onChange={(e) => setSectionOneSecondLabelEn(e.target.value)}
                  className="w-full  bg-gray-200 text-black p-1"
                />
              </td>
              <td className=""></td>
              <td className=""></td>
              <td className=""></td>
            </tr>



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
                  value={sectionTwoFirstLabel}
                  onChange={(e) => setSectionTwoFirstLabel(e.target.value)}
                  className="w-full  bg-gray-200 text-black p-1"
                />
              </td>
              <td className=""></td>
              <td className=""></td>
              <td className=""></td>
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

               <td className="border border-gray-300 bg-gray-200 p-1"> <input
                  placeholder=""
                  value={sectionTwoTotalNote}
                  onChange={(e) => setSectionTwoTotalNote(e.target.value)}
                  className=" text-start p-0.5 w-full bg-gray-200  fext-row"
                /></td>


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

             <tr className="bg-gray-200 font-semibold">
              <td className="">
                <input
                  value={sectionThreeFirstLabel}
                  onChange={(e) => setSectionThreeFirstLabel(e.target.value)}
                  className="w-full  bg-gray-200 text-black p-1"
                />
              </td>
              <td className=""></td>
              <td className=""></td>
              <td className=""></td>
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
              <td className="border border-gray-300"> <input
                  value={sectionThreeTotalNote}
                  onChange={(e) => setSectionThreeTotalNote(e.target.value)}
                  className="w-full  bg-gray-200 text-black p-1"
                /></td>

              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionThreeItemsEn)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionThreeItemsDate2En)}
              </td>
            </tr>

             <tr className="bg-gray-200 font-semibold">
              <td className="">
                <input
                  value={sectionFourFirstLabel}
                  onChange={(e) => setSectionFourFirstLabel(e.target.value)}
                  className="w-full  bg-gray-200 text-black p-1"
                />
              </td>
              <td className=""></td>
              <td className=""></td>
              <td className=""></td>
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
              <td className="">
                {" "}
                <input
                  placeholder=""
                  value={sectionFourTotalLabel}
                  onChange={(e) => setSectionFourTotalLabel(e.target.value)}
                  className=" text-start p-0.5   w-full bg-gray-200 fext-row"
                />
              </td>
                          <td className="border border-gray-300"> <input
                  placeholder=""
                  value={sectionFourTotalNote}
                  onChange={(e) => setSectionFourTotalNote(e.target.value)}
                  className=" text-start p-0.5   w-full bg-gray-200 fext-row"
                /></td>
              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionFourItemsEn)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionFourItemsDate2En)}
              </td>
            </tr>
            <br />
        






         <tr className="bg-gray-200 font-semibold">
              <td className="">
                <input
                  value={sectionFiveFirstLabel}
                  onChange={(e) => setSectionFiveFirstLabel(e.target.value)}
                  className="w-full  bg-gray-200 text-black p-1"
                />
              </td>
              <td className=""></td>
              <td className=""></td>
              <td className=""></td>
            </tr>



{sectionFiveLabelsEn.map((_, idx) => {

  return (
    <tr key={`section-five-${idx}`} className="bg-gray-100">
      <td className="border border-gray-300">
        <input
          className="w-full h-7 bg-gray-100 text-black p-1"
          value={sectionFiveLabelsEn[idx]}
          placeholder={`${idx + 1}`}
          onChange={(e) =>
            handleChange(idx, e.target.value, "sectionFiveLabel", "label")
          }
        />
      </td>

      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionFiveNotesEn[idx]}
          onChange={(e) =>
            handleChange(idx, e.target.value, "sectionFiveNote", "note")
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
            if (
              e.key === "Backspace" &&
              caretPos === input.value.length &&
              input.value.endsWith(")")
            ) {
              e.preventDefault();
              const newVal = input.value.slice(0, -1);
              handleChange(idx, newVal, "sectionFive");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChange(idx, "-", "sectionFive");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");

            rawValue = rawValue.replace(/^-/, "");
            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChange(idx, "-", "sectionFive");
              return;
            }

            if (rawValue === "") {
              handleChange(idx, "", "sectionFive");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(
              Number(rawValue)
            );
            const finalValue = isNegative
              ? `(${formatted})`
              : formatted;

            handleChange(idx, finalValue, "sectionFive");

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
            if (
              e.key === "Backspace" &&
              caretPos === input.value.length &&
              input.value.endsWith(")")
            ) {
              e.preventDefault();
              const newVal = input.value.slice(0, -1);
              handleChange(idx, newVal, "sectionFive", "date2");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChange(idx, "-", "sectionFive", "date2");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");

            rawValue = rawValue.replace(/^-/, "");
            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChange(idx, "-", "sectionFive", "date2");
              return;
            }

            if (rawValue === "") {
              handleChange(idx, "", "sectionFive", "date2");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(
              Number(rawValue)
            );
            const finalValue = isNegative
              ? `(${formatted})`
              : formatted;

            handleChange(idx, finalValue, "sectionFive", "date2");

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
                  className=" text-start p-0.5   w-full bg-gray-200 fext-row"
                />
              </td>
              <td className="border border-gray-300">    <input
                  placeholder=""
                  value={sectionFiveTotalNote}
                  onChange={(e) => setSectionFiveTotalNote(e.target.value)}
                  className=" text-start p-0.5   w-full bg-gray-200 fext-row"
                /></td>
              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionFiveItemsEn)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionFiveItemsDate2En)}
              </td>
            </tr>
            <br />
         <tr className="bg-gray-200 font-semibold">
              <td className="">
                <input
                  value={sectionSixFirstLabel}
                  onChange={(e) => setSectionSixFirstLabel(e.target.value)}
                  className="w-full  bg-gray-200 text-black p-1"
                />
              </td>
              <td className=""></td>
              <td className=""></td>
              <td className=""></td>
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
            handleChange(idx, e.target.value, "sectionSixLabel", "label")
          }
        />
      </td>
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionSixNotesEn[idx]}
          onChange={(e) =>
            handleChange(idx, e.target.value, "sectionSixNote", "note")
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
            if (
              e.key === "Backspace" &&
              caretPos === input.value.length &&
              input.value.endsWith(")")
            ) {
              e.preventDefault();
              const newVal = input.value.slice(0, -1);
              handleChange(idx, newVal, "sectionSix");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChange(idx, "-", "sectionSix");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");

            rawValue = rawValue.replace(/^-/, "");
            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChange(idx, "-", "sectionSix");
              return;
            }

            if (rawValue === "") {
              handleChange(idx, "", "sectionSix");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(
              Number(rawValue)
            );
            const finalValue = isNegative
              ? `(${formatted})`
              : formatted;

            handleChange(idx, finalValue, "sectionSix");

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
            if (
              e.key === "Backspace" &&
              caretPos === input.value.length &&
              input.value.endsWith(")")
            ) {
              e.preventDefault();
              const newVal = input.value.slice(0, -1);
              handleChange(idx, newVal, "sectionSix", "date2");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChange(idx, "-", "sectionSix", "date2");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");

            rawValue = rawValue.replace(/^-/, "");
            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChange(idx, "-", "sectionSix", "date2");
              return;
            }

            if (rawValue === "") {
              handleChange(idx, "", "sectionSix", "date2");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(
              Number(rawValue)
            );
            const finalValue = isNegative
              ? `(${formatted})`
              : formatted;

            handleChange(idx, finalValue, "sectionSix", "date2");

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
                  className=" text-start p-0.5   w-full bg-gray-200 fext-row"
                />
              </td>
             <td className="border border-gray-300"> <input
                  placeholder=""
                  value={sectionSixTotalNote}
                  onChange={(e) => setSectionSixTotalNote(e.target.value)}
                  className=" text-start p-0.5   w-full bg-gray-200 fext-row"
                /></td>
              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionSixItemsEn)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionSixItemsDate2En)}
              </td>
            </tr>
            <br />
                 <tr className="bg-gray-200 font-semibold">
              <td className="">
                 {" "}

                <input 
                  placeholder=""
                  value={sectionSixSecondTotalLabel}
                  onChange={(e) => setSectionSixSecondTotalLabel(e.target.value)}
                  className=" text-start p-0.5   w-full bg-gray-200 fext-row"
                />
              </td>
             <td className="border border-gray-300"> <input 
                  placeholder=""
                  value={sectionSixSecondTotalNote}
                  onChange={(e) => setSectionSixSecondTotalNote(e.target.value)}
                  className=" text-start p-0.5   w-full bg-gray-200 fext-row"
                /></td>
              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionSixSecondItemsEn)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionSixSecondItemsDate2En)}
              </td>
            </tr>


      {sectionSevenLabelsEn.map((_, idx) => {


  return (
    <tr key={`section-seven-${idx}`} className="bg-gray-100">
      <td className="border border-gray-300">
        <input
          className="w-full h-7 bg-gray-100 text-black p-1"
          value={sectionSevenLabelsEn[idx]}
          placeholder={`${idx + 1}`}
          onChange={(e) =>
            handleChange(idx, e.target.value, "sectionSevenLabel", "label")
          }
        />
      </td>

      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionSevenNotesEn[idx]}
          onChange={(e) =>
            handleChange(idx, e.target.value, "sectionSevenNote", "note")
          }
        />
      </td>

      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionSevenItemsEn[idx]}
          placeholder=""
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
              handleChange(idx, newVal, "sectionSeven");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChange(idx, "-", "sectionSeven");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");

            rawValue = rawValue.replace(/^-/, "");
            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChange(idx, "-", "sectionSeven");
              return;
            }

            if (rawValue === "") {
              handleChange(idx, "", "sectionSeven");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(
              Number(rawValue)
            );
            const finalValue = isNegative
              ? `(${formatted})`
              : formatted;

            handleChange(idx, finalValue, "sectionSeven");

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
          value={sectionSevenItemsDate2En[idx]}
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
              handleChange(idx, newVal, "sectionSeven", "date2");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChange(idx, "-", "sectionSeven", "date2");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");

            rawValue = rawValue.replace(/^-/, "");
            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChange(idx, "-", "sectionSeven", "date2");
              return;
            }

            if (rawValue === "") {
              handleChange(idx, "", "sectionSeven", "date2");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(
              Number(rawValue)
            );
            const finalValue = isNegative
              ? `(${formatted})`
              : formatted;

            handleChange(idx, finalValue, "sectionSeven", "date2");

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
                  value={sectionSevenTotalLabel}
                  onChange={(e) => setSectionSevenTotalLabel(e.target.value)}
                  className=" text-start p-0.5   w-full bg-gray-200 fext-row"
                />
              </td>
              <td className="border border-gray-300">
                <input 
                  placeholder=""
                  value={sectionSevenTotalNote}
                  onChange={(e) => setSectionSevenTotalNote(e.target.value)}
                  className=" text-start p-0.5   w-full bg-gray-200 fext-row"
                />
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionSevenItemsEn)}
              </td>
              <td className="border border-gray-300">
                {formatWithParentheses(TotalsectionSevenItemsDate2En)}
              </td>
            </tr>

<br />




{sectionEightLabelsEn.map((_, idx) => {


  return (
    <tr key={`section-eight-${idx}`} className="bg-gray-100">
      {/* Label Input */}
      <td className="border border-gray-300">
        <input
          className="w-full h-7 bg-gray-100 text-black p-1"
          value={sectionEightLabelsEn[idx]}
          placeholder={`${idx + 1}`}
          onChange={(e) =>
            handleChange(idx, e.target.value, "sectionEightLabel", "label")
          }
        />
      </td>

      {/* Note Input */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionEightNotesEn[idx]}
          onChange={(e) =>
            handleChange(idx, e.target.value, "sectionEightNote", "note")
          }
        />
      </td>

      {/* Item Input (Date 1) */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionEightItemsEn[idx]}
          placeholder=""
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
              handleChange(idx, newVal, "sectionEight");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChange(idx, "-", "sectionEight");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChange(idx, "-", "sectionEight");
              return;
            }

            if (rawValue === "") {
              handleChange(idx, "", "sectionEight");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(
              Number(rawValue)
            );
            const finalValue = isNegative
              ? `(${formatted})`
              : formatted;

            handleChange(idx, finalValue, "sectionEight");

            setTimeout(() => {
              const newLength = finalValue.length;
              const offset = newLength - inputValue.length;
              const newPos = caretPos + offset;
              input.setSelectionRange(newPos, newPos);
            }, 0);
          }}
        />
      </td>

      {/* Item Input (Date 2) */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionEightItemsDate2En[idx]}
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
              handleChange(idx, newVal, "sectionEight", "date2");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChange(idx, "-", "sectionEight", "date2");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChange(idx, "-", "sectionEight", "date2");
              return;
            }

            if (rawValue === "") {
              handleChange(idx, "", "sectionEight", "date2");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(
              Number(rawValue)
            );
            const finalValue = isNegative
              ? `(${formatted})`
              : formatted;

            handleChange(idx, finalValue, "sectionEight", "date2");

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
                  value={sectionEightLastLabel}
                  onChange={(e) => setSectionEightLastLabel(e.target.value)}
                  className=" text-start p-0.5   w-full bg-gray-200 fext-row"
                />
              </td>
              <td className="border border-gray-300"></td>
              <td className="border border-gray-300">
              </td>
              <td className="border border-gray-300">
             
              </td>
            </tr>
          </tbody>



        <thead>
            <tr className="bg-gray-100 ">
              <th className="border border-gray-100 w-96"></th>
              <th className="border border-gray-100 w-16">Notes</th>
              <th className="border  border-gray-100 p-1 w-28   ">
                <input
                  type="date"
                  className="text-center   h-5  bg-gray-100"
                  placeholder=""
                  value={date1Table2 ? date1Table2.toISOString().split("T")[0] : ""}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    setDate1Table2(selectedDate ? new Date(selectedDate) : null);
                  }}
                  lang="en"
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
                  value={date2Table2 ? date2Table2.toISOString().split("T")[0] : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDate2Table2(value ? new Date(value) : null);
                  }}
                  placeholder=""
                  className="text-center bg-gray-100"
                  type="date"
                  lang="en"
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


          <body>
            
            

          </body>
{sectionNineLabelsEn.map((_, idx) => {

  return (
    <tr key={`section-nine-${idx}`} className="bg-gray-100">
      {/* Label */}
      <td className="border border-gray-300">
        <input
          className="w-full h-7 bg-gray-100 text-black p-1"
          value={sectionNineLabelsEn[idx]}
          placeholder={`${idx + 1}`}
          onChange={(e) =>
            handleChange(idx, e.target.value, "sectionNineLabel", "label")
          }
        />
      </td>

      {/* Note */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionNineNotesEn[idx]}
          onChange={(e) =>
            handleChange(idx, e.target.value, "sectionNineNote", "note")
          }
        />
      </td>

      {/* Items Date 1 */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionNineItemsEn[idx]}
          placeholder=""
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
              handleChange(idx, newVal, "sectionNine");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChange(idx, "-", "sectionNine");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChange(idx, "-", "sectionNine");
              return;
            }

            if (rawValue === "") {
              handleChange(idx, "", "sectionNine");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(
              Number(rawValue)
            );
            const finalValue = isNegative
              ? `(${formatted})`
              : formatted;

            handleChange(idx, finalValue, "sectionNine");

            setTimeout(() => {
              const newLength = finalValue.length;
              const offset = newLength - inputValue.length;
              const newPos = caretPos + offset;
              input.setSelectionRange(newPos, newPos);
            }, 0);
          }}
        />
      </td>

      {/* Items Date 2 */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionNineItemsDate2En[idx]}
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
              handleChange(idx, newVal, "sectionNine", "date2");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChange(idx, "-", "sectionNine", "date2");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChange(idx, "-", "sectionNine", "date2");
              return;
            }

            if (rawValue === "") {
              handleChange(idx, "", "sectionNine", "date2");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(
              Number(rawValue)
            );
            const finalValue = isNegative
              ? `(${formatted})`
              : formatted;

            handleChange(idx, finalValue, "sectionNine", "date2");

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


        </table>
      </div>
    );
  }
)

export default CashFlowUpdateFormEn;
