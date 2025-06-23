/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import gregorian_ar from "react-date-object/locales/gregorian_ar";
import arabic from "react-date-object/calendars/gregorian";
import type { DateObject } from "react-multi-date-picker";

import { useDispatch, useSelector  } from "react-redux";
import { AppDispatch, RootState  } from "../../../../../reduxKit/store";

import { SetCashFlowDataArabicAction } from "../../../../../reduxKit/actions/Tables/cashFlowAr";
type BalaceSheetFormArProps = {
  TakingShort: boolean;
};

const CashFlowFormAr: React.FC<BalaceSheetFormArProps> = React.memo(
  ({ TakingShort }) => {
    const dispatch = useDispatch<AppDispatch>();
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

    const [data1Ar, setDate1Ar] = useState<Date | null | any>(null);
    const [data2Ar, setDate2Ar] = useState<Date | null | any>(null);
   

    const [date1, setDate1] = useState("(غير مراجعة)");
    const [date2, setDate2] = useState("(مراجعة)");

    // section One
       const [sectionOneFirstLabelEn, setSectionOneFirstLabelEn] = useState(     "Continuing operation:"   );
       const [sectionOneLabelsEn, setSectionOneLabelsEn] = useState<string[]>(      Array(5).fill("")   );
       const [sectionOneNotesEn, setFlowSectionOneNotesEn] = useState<string[]>(     Array(5).fill("")   );
       const [sectionOneItemsEn, setFlowSectionOneEn] = useState<string[]>(     Array(5).fill("")   );
       const [sectionOneItemsDate2En, setFlowSectionOneDate2En] = useState<    string[]   >(Array(5).fill(""));
       const [sectionOneTotalLabel, setSectionOneTotalLabel] = useState("First Total (Gross income)");
       const TotalsectionOneItemsEn = sumStringValues(sectionOneItemsEn);
       const TotalsectionOneItemsDate2En = sumStringValues(sectionOneItemsDate2En);
   
       // section Two
       const [sectionTwoLabelsEn, setSectionTwoLabelsEn] = useState<string[]>(     Array(12).fill("")  );
       const [sectionTwoNotesEn, setFlowSectionTwoNotesEn] = useState<string[]>(     Array(12).fill("")   );
       const [sectionTwoItemsEn, setFlowSectionTwoEn] = useState<string[]>(     Array(12).fill("")   );
       const [sectionTwoItemsDate2En, setFlowSectionTwoDate2En] = useState<    string[]  >(Array(12).fill(""));
       const [sectionTwoTotalLabel, setSectionTwoTotalLabel] = useState("Second Total (Operating loss)");
       const TotalsectionTwoItemsEn =    TotalsectionOneItemsEn + sumStringValues(sectionTwoItemsEn);
       const TotalsectionTwoItemsDate2En =   TotalsectionOneItemsDate2En + sumStringValues(sectionTwoItemsDate2En);
   
       // section Three
       const [sectionThreeLabelsEn, setSectionThreeLabelsEn] = useState<string[]>(    Array(7).fill("")  );
      const [sectionThreeNotesEn, setFlowSectionThreeNotesEn] = useState<    string[]   >(Array(7).fill(""));
       const [sectionThreeItemsEn, setFlowSectionThreeEn] = useState<string[]>(     Array(7).fill("")   );
       const [sectionThreeItemsDate2En, setFlowSectionThreeDate2En] = useState<     string[]    >(Array(7).fill(""));
       const [sectionThreeTotalLabel, setSectionThreeTotalLabel] = useState("Third Total (Income (loss) before zakat and foreign Income)");
       const TotalsectionThreeItemsEn =      TotalsectionTwoItemsEn + sumStringValues(sectionThreeItemsEn);
       const TotalsectionThreeItemsDate2En =      TotalsectionTwoItemsDate2En + sumStringValues(sectionThreeItemsDate2En);
   
   
       // sectoin Four
       const [sectionFourLabelsEn, setSectionFourLabelsEn] = useState<string[]>(     Array(5).fill("")    );
       const [sectionFourNotesEn, setFlowSectionFourNotesEn] = useState<string[]>(      Array(5).fill("")   );
       const [sectionFourItemsEn, setFlowSectionFourEn] = useState<string[]>(      Array(5).fill("")    );
       const [sectionFourItemsDate2En, setFlowSectionFourDate2En] = useState<      string[]    >(Array(5).fill(""));
       const [sectionFourTotalLabel, setSectionFourTotalLabel] = useState("Four Total (Loss for the year from continuing operations)");
       const TotalsectionFourItemsEn =      TotalsectionThreeItemsEn + sumStringValues(sectionFourItemsEn);
       const TotalsectionFourItemsDate2En =     TotalsectionThreeItemsDate2En + sumStringValues(sectionFourItemsDate2En);
   
       const [sectionFourSubFirstLabelEn, setSectionFourSubFirstLabelEn] =  useState("Discontinued operation:");
       const [sectionFourSubLabelsEn, setSectionFourSubLabelsEn] = useState< string[] >(Array(3).fill(""));
       const [sectionFourSubNotesEn, setFlowSectionFourSubNotesEn] = useState< string[] >(Array(3).fill(""));
       const [sectionFourSubItemsEn, setFlowSectionFourSubEn] = useState<string[]>(  Array(3).fill("")    );
       const [sectionFourSubItemsDate2En, setFlowSectionFourSubDate2En] = useState<   string[]   >(Array(3).fill(""));
       const [sectionFourSubTotalLabel, setSectionFourSubTotalLabel] =  useState("Fifth Total (Loss for the year)");
       const TotalsectionFourSubItemsEn =   TotalsectionThreeItemsEn + sumStringValues(sectionFourSubItemsEn);
       const TotalsectionFourSubItemsDate2En =  TotalsectionThreeItemsDate2En + sumStringValues(sectionFourSubItemsDate2En);
   
   
   
   
   
       const [sectionFourAttribute, setSectionFourAttributeLabel] = useState("Net income from continuing operations Attributable to:1");
       const [sectionFourAttributeLabelsEn, setSectionFourAttributeLabelsEn] =    useState<string[]>(Array(2).fill(""));
       const [sectionFourAttributeItemsEn, setSectionFourAttributeItemsEn] =   useState<string[]>(Array(2).fill(""));
       const [sectionFourAttributeItemsDate2En,   setSectionFourAttributeItemsDate2En,  ] = useState<string[]>(Array(2).fill(""));
       const TotalsectionFourAttributeItemsEn = sumStringValues(  sectionFourAttributeItemsEn  );
       const TotalsectionFourAttributeItemsDate2En = sumStringValues(  sectionFourAttributeItemsDate2En );
   
   
       const [sectionFourAttribute2, setSectionFourAttribute2Label] = useState("Net (Loss) income Attributable to:2");
       const [sectionFourAttribute2LabelsEn, setSectionFourAttribute2LabelsEn] =  useState<string[]>(Array(2).fill(""));
       const [sectionFourAttribute2ItemsEn, setSectionFourAttribute2ItemsEn] = useState<string[]>(Array(2).fill(""));
       const [sectionFourAttribute2ItemsDate2En,     setSectionFourAttribute2ItemsDate2En] = useState<string[]>(Array(2).fill(""));
       const TotalsectionFourAttribute2ItemsEn = sumStringValues( sectionFourAttribute2ItemsEn);
       const TotalsectionFourAttribute2ItemsDate2En = sumStringValues( sectionFourAttribute2ItemsDate2En);
       
       const [ sectionFourOtherComprehensiveIncome,    setSectionFourOtherComprehensiveIncomeLabel,  ] = useState("Basic and diluted earnings per share from net (loss) income attributable to equity holders of the Parent (Saudi Riyals)");
       const [ sectionFourOtherComprehensiveIncomeSubheadingLabelsEn,   setSectionFourOtherComprehensiveIncomeSubheadingLabelsEn,  ] = useState<string[]>(Array(2).fill(""));
       const [  sectionFourOtherComprehensiveIncomeSubheadingNotesEn,   setSectionFourOtherComprehensiveIncomeSubheadingNotesEn,   ] = useState<string[]>(Array(2).fill(""));
       const [  sectionFourOtherComprehensiveIncomeSubheadingItemsEn,     setSectionFourOtherComprehensiveIncomeSubheadingItemsEn,   ] = useState<string[]>(Array(2).fill(""));
       const [ sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En,    setSectionFourOtherComprehensiveIncomeSubheadingItemsDate2En,   ] = useState<string[]>(Array(2).fill(""));
   



         const [dataTwo1Ar, setDateTwo1Ar] = useState<Date | null>(null);
        const [dataTwo2Ar, setDateTwo2Ar] = useState<Date | null>(null);
   
   
         const [sectionLastLabel, setSectionLastLabel] =  useState("Fifth Total (Loss for the year)2");
         const [sectionSevenLastLabel, setSectionSevenLastLabel] =  useState("Other comprehensive income");
         const [ sectionSevenSubheading,   setSectionSevenSubheadingLabel ] = useState("Other comprehensive income (loss) that may be reclassified to profit or loss in subsequent years:");
   
         const [ sectionLastLabelsEn,  setSectionLastLabelsEn,  ] = useState<string[]>(Array(8).fill(""));
         const [ sectionLastNotesEn, setSectionLastNotesEn,   ] = useState<string[]>(Array(8).fill(""));
         const [ sectionLastItemsEn,    setSectionLastItemsEn,   ] = useState<string[]>(Array(8).fill(""));
         const [ sectionLastItemsDate2En,   setSectionLastItemsDate2En,   ] = useState<string[]>(Array(8).fill(""));
          const [ sectionLastTotalLabelEn,  setSectionLastTotalLabelEn,  ] = useState("Total other comprehensive income (loss) that may be reclassified to profit or loss in subsequent years");
          const TotalSectionLastLabelItemsEn =      sumStringValues(sectionLastItemsEn);
          const TotalSectionLastItemsDate2En =  sumStringValues(sectionLastItemsDate2En);
   
   
   
   
          const [ sectionSevenSubheading2,   setSectionSevenSubheadingLabel2 ] = useState("Other comprehensive income (loss) not reclassified to profit or loss in subsequent years:1");
          const [ sectionLastLabelsEn2,  setSectionLastLabelsEn2 ] = useState<string[]>(Array(8).fill(""));
          const [ sectionLastNotesEn2, setSectionLastNotesEn2 ] = useState<string[]>(Array(8).fill(""));
          const [ sectionLastItemsEn2,    setSectionLastItemsEn2] = useState<string[]>(Array(8).fill(""));
          const [ sectionLastItemsDate2En2,   setSectionLastItemsDate2En2 ] = useState<string[]>(Array(8).fill(""));
    
          const [ sectionLastTotalLabelEn2,  setSectionToatalLastLabelEn2 ] = useState("Total other comprehensive income (loss) not reclassified to profit or loss in subsequent years:");
          const TotalSectionLastLabelItemsEn2 =      sumStringValues(sectionLastItemsEn2);
          const TotalSectionLastItemsDate2En2 =  sumStringValues(sectionLastItemsDate2En2);
   
          const [SectionSevenSecondLastLabel2,   setSectionSevenSecondLastLabel2 ] = useState("Total other comprehensive income");
          const TotalsectionSevenSecondLastItemEn = TotalSectionLastLabelItemsEn+TotalSectionLastLabelItemsEn2
          const TotalsectionSevenSecondLastItemsDate2En = TotalSectionLastItemsDate2En+TotalSectionLastItemsDate2En2
          const [ SectionSevenLastLabel2,   setSectionSevenLastLabel2 ] = useState("Total comprehensive (loss) income for the year ");
          const TotalsectionSevenLastItemEn =     TotalsectionSevenSecondLastItemEn
          const TotalsectionSevenLastItemsDate2En = TotalsectionSevenSecondLastItemsDate2En
   
          
       
     // Table 2 States
   const [sectionFourAttributeTable2, setSectionFourAttributeLabelTable2] = useState("Net income from continuing operations Attributable to:");
   const [sectionFourAttributeLabelsEnTable2, setSectionFourAttributeLabelsEnTable2] = useState<string[]>(Array(2).fill(""));
   const [sectionFourAttributeItemsEnTable2, setSectionFourAttributeItemsEnTable2] = useState<string[]>(Array(2).fill(""));
   const [sectionFourAttributeItemsDate2EnTable2, setSectionFourAttributeItemsDate2EnTable2] = useState<string[]>(Array(2).fill(""));
   const TotalsectionFourAttributeItemsEnTable2 = sumStringValues(sectionFourAttributeItemsEnTable2);
   const TotalsectionFourAttributeItemsDate2EnTable2 = sumStringValues(sectionFourAttributeItemsDate2EnTable2);
    
   const [sectionFourAttribute2Table2, setSectionFourAttribute2LabelTable2] = useState("Net (Loss) income Attributable to:");
   const [sectionFourAttribute2LabelsEnTable2, setSectionFourAttribute2LabelsEnTable2] = useState<string[]>(Array(2).fill(""));
   const [sectionFourAttribute2ItemsEnTable2, setSectionFourAttribute2ItemsEnTable2] = useState<string[]>(Array(2).fill(""));
   const [sectionFourAttribute2ItemsDate2EnTable2, setSectionFourAttribute2ItemsDate2EnTable2] = useState<string[]>(Array(2).fill(""));
   const TotalsectionFourAttribute2ItemsEnTable2 = sumStringValues(sectionFourAttribute2ItemsEnTable2);
   const TotalsectionFourAttribute2ItemsDate2EnTable2 = sumStringValues(sectionFourAttribute2ItemsDate2EnTable2);
   
   
   const [sectionFourOtherComprehensiveIncomeTable2, setSectionFourOtherComprehensiveIncomeLabelTable2] = useState("Basic and diluted earnings per share from net (loss) income attributable to equity holders of the Parent (Saudi Riyals)");
   const [sectionFourOtherComprehensiveIncomeSubheadingLabelsEnTable2, setSectionFourOtherComprehensiveIncomeSubheadingLabelsEnTable2] = useState<string[]>(Array(2).fill(""));
   const [sectionFourOtherComprehensiveIncomeSubheadingNotesEnTable2, setSectionFourOtherComprehensiveIncomeSubheadingNotesEnTable2] = useState<string[]>(Array(2).fill(""));
   const [sectionFourOtherComprehensiveIncomeSubheadingItemsEnTable2, setSectionFourOtherComprehensiveIncomeSubheadingItemsEnTable2] = useState<string[]>(Array(2).fill(""));
   const [sectionFourOtherComprehensiveIncomeSubheadingItemsDate2EnTable2, setSectionFourOtherComprehensiveIncomeSubheadingItemsDate2EnTable2] = useState<string[]>(Array(2).fill(""));
   
   






      
// Handle Change Function
const handleChangeSectionFourSub = (
  index: number,
  value: string,
  section: "sectionFourSub",
  type: "label" | "note" | "item" | "date2"
) => {
  if (section === "sectionFourSub") {
    switch (type) {
      case "label":
        setSectionFourSubLabelsEn((prev) => {
          const updated = [...prev];
          updated[index] = value;
          return updated;
        });
        break;
      case "note":
        setFlowSectionFourSubNotesEn((prev) => {
          const updated = [...prev];
          updated[index] = value;
          return updated;
        });
        break;
      case "item":
        setFlowSectionFourSubEn((prev) => {
          const updated = [...prev];
          updated[index] = value;
          return updated;
        });
        break;
      case "date2":
        setFlowSectionFourSubDate2En((prev) => {
          const updated = [...prev];
          updated[index] = value;
          return updated;
        });
        break;
      default:
        break;
    }
  }
}

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


const handleChangeAttributeTable2 = (
  idx: number,
  value: string,
  section: "sectionFourAttribute",
  field: "label" | "item" | "date2" = "item"
) => {
  if (section === "sectionFourAttribute") {
    if (field === "label") {
      const updated = [...sectionFourAttributeLabelsEnTable2];
      updated[idx] = value;
      setSectionFourAttributeLabelsEnTable2(updated);
    } else if (field === "date2") {
      const updated = [...sectionFourAttributeItemsDate2EnTable2];
      updated[idx] = value;
      setSectionFourAttributeItemsDate2EnTable2(updated);
    } else {
      const updated = [...sectionFourAttributeItemsEnTable2];
      updated[idx] = value;
      setSectionFourAttributeItemsEnTable2(updated);
    }
  }
};
const handleChangeAttribute2Table2 = (
  index: number,
  value: string,
  type: "label" | "item" | "date2"
) => {
  switch (type) {
    case "label":
      setSectionFourAttribute2LabelsEnTable2((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
      break;
    case "item":
      setSectionFourAttribute2ItemsEnTable2((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
      break;
    case "date2":
      setSectionFourAttribute2ItemsDate2EnTable2((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
      break;
    default:
      break;
  }
};

const handleChangeOtherComprehensiveIncomeTable2 = (
  index: number,
  value: string,
  type: "label" | "note" | "item" | "date2"
) => {
  switch (type) {
    case "label":
      setSectionFourOtherComprehensiveIncomeSubheadingLabelsEnTable2((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
      break;
    case "note":
      setSectionFourOtherComprehensiveIncomeSubheadingNotesEnTable2((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
      break;
    case "item":
      setSectionFourOtherComprehensiveIncomeSubheadingItemsEnTable2((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
      break;
    case "date2":
      setSectionFourOtherComprehensiveIncomeSubheadingItemsDate2EnTable2((prev) => {
        const updated = [...prev];
        updated[index] = value;
        return updated;
      });
      break;
    default:
      break;
  }
};




const handleChangeSectionLast = (
  index: number,
  value: string,
  section: "sectionLast",
  type: "label" | "note" | "item" | "date2"
) => {
  if (section === "sectionLast") {
    switch (type) {
      case "label":
        setSectionLastLabelsEn((prev) => {
          const updated = [...prev];
          updated[index] = value;
          return updated;
        });
        break;
      case "note":
        setSectionLastNotesEn((prev) => {
          const updated = [...prev];
          updated[index] = value;
          return updated;
        });
        break;
      case "item":
        setSectionLastItemsEn((prev) => {
          const updated = [...prev];
          updated[index] = value;
          return updated;
        });
        break;
      case "date2":
        setSectionLastItemsDate2En((prev) => {
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


const handleChangeSectionLast2 = (
  index: number,
  value: string,
  section: "sectionLast2",
  type: "label" | "note" | "item" | "date2"
) => {
  if (section === "sectionLast2") {
    switch (type) {
      case "label":
        setSectionLastLabelsEn2((prev) => {
          const updated = [...prev];
          updated[index] = value;
          return updated;
        });
        break;
      case "note":
        setSectionLastNotesEn2((prev) => {
          const updated = [...prev];
          updated[index] = value;
          return updated;
        });
        break;
      case "item":
        setSectionLastItemsEn2((prev) => {
          const updated = [...prev];
          updated[index] = value;
          return updated;
        });
        break;
      case "date2":
        setSectionLastItemsDate2En2((prev) => {
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




    const handleChangeOtherComprehensiveIncome = (
      index: number,
      value: string,
      section: "sectionFourOtherComprehensiveIncomeSubheading",
      type: "label" | "note" | "item" | "date2"
    ) => {
      if (section === "sectionFourOtherComprehensiveIncomeSubheading") {
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
            setSectionFourOtherComprehensiveIncomeSubheadingItemsDate2En(
              (prev) => {
                const updated = [...prev];
                updated[index] = value;
                return updated;
              }
            );
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
        }
      }
    };



useEffect(() => {
  const handleDispatch = async () => {
    try {
      const formData = {
        qdate1: data1Ar,
        qdate2: data2Ar,

        qsectionOne: {
          qsectionOneFirstLabelEn: sectionOneFirstLabelEn,
          qsectionOneLabelsEn: sectionOneLabelsEn,
          qsectionOneNotesEn: sectionOneNotesEn,
          qsectionOneItemsEn: sectionOneItemsEn,
          qsectionOneItemsDate2En: sectionOneItemsDate2En,
          qsectionOneTotalLabel: sectionOneTotalLabel,
          qTotalsectionOneItemsEn: TotalsectionOneItemsEn,
          qTotalsectionOneItemsDate2En: TotalsectionOneItemsDate2En,
        },
        qsectionTwo: {
          qsectionTwoLabelsEn: sectionTwoLabelsEn,
          qsectionTwoNotesEn: sectionTwoNotesEn,
          qsectionTwoItemsEn: sectionTwoItemsEn,
          qsectionTwoItemsDate2En: sectionTwoItemsDate2En,
          qsectionTwoTotalLabel: sectionTwoTotalLabel,
          qTotalsectionTwoItemsEn: TotalsectionTwoItemsEn,
          qTotalsectionTwoItemsDate2En: TotalsectionTwoItemsDate2En,
        },
        qsectionThree: {
          qsectionThreeLabelsEn: sectionThreeLabelsEn,
          qsectionThreeNotesEn: sectionThreeNotesEn,
          qsectionThreeItemsEn: sectionThreeItemsEn,
          qsectionThreeItemsDate2En: sectionThreeItemsDate2En,
          qsectionThreeTotalLabel: sectionThreeTotalLabel,
          qTotalsectionThreeItemsEn: TotalsectionThreeItemsEn,
          qTotalsectionThreeItemsDate2En: TotalsectionThreeItemsDate2En,
        },
        qsectionFour: {
          qsectionFourLabelsEn: sectionFourLabelsEn,
          qsectionFourNotesEn: sectionFourNotesEn,
          qsectionFourItemsEn: sectionFourItemsEn,
          qsectionFourItemsDate2En: sectionFourItemsDate2En,
          qsectionFourTotalLabel: sectionFourTotalLabel,
          qTotalsectionFourItemsEn: TotalsectionFourItemsEn,
          qTotalsectionFourItemsDate2En: TotalsectionFourItemsDate2En,
        },

        //new setion 12/6/25
        qsectionFourSub: {
          qsectionFourSubFirstLabelEn: sectionFourSubFirstLabelEn,
          qsectionFourSubLabelsEn: sectionFourSubLabelsEn,
          qsectionFourSubNotesEn: sectionFourSubNotesEn,
          qsectionFourSubItemsEn: sectionFourSubItemsEn,
          qsectionFourSubItemsDate2En: sectionFourSubItemsDate2En,
          qsectionFourSubTotalLabel: sectionFourSubTotalLabel,
          qTotalsectionFourSubItemsEn: TotalsectionFourSubItemsEn,
          qTotalsectionFourSubItemsDate2En: TotalsectionFourSubItemsDate2En,
        },

        qsectionAttributeOne: {
          qsectionFourAttribute: sectionFourAttribute,
          qsectionFourAttributeLabelsEn: sectionFourAttributeLabelsEn,
          qsectionFourAttributeItemsEn: sectionFourAttributeItemsEn,
          qsectionFourAttributeItemsDate2En: sectionFourAttributeItemsDate2En,
          qTotalsectionFourAttributeItemsEn: TotalsectionFourAttributeItemsEn,
          qTotalsectionFourAttributeItemsDate2En: TotalsectionFourAttributeItemsDate2En,
        },
        qsectionAttributeTwo: {
          qsectionFourAttribute2: sectionFourAttribute2,
          qsectionFourAttribute2LabelsEn: sectionFourAttribute2LabelsEn,
          qsectionFourAttribute2ItemsEn: sectionFourAttribute2ItemsEn,
          qsectionFourAttribute2ItemsDate2En: sectionFourAttribute2ItemsDate2En,
          qTotalsectionFourAttribute2ItemsEn: TotalsectionFourAttribute2ItemsEn,
          qTotalsectionFourAttribute2ItemsDate2En: TotalsectionFourAttribute2ItemsDate2En,
        },
        qsectionOtherComprehensiveIncome: {
          qsectionFourOtherComprehensiveIncome: sectionFourOtherComprehensiveIncome,
          qsectionFourOtherComprehensiveIncomeSubheadingLabelsEn: sectionFourOtherComprehensiveIncomeSubheadingLabelsEn,
          qsectionFourOtherComprehensiveIncomeSubheadingNotesEn: sectionFourOtherComprehensiveIncomeSubheadingNotesEn,
          qsectionFourOtherComprehensiveIncomeSubheadingItemsEn: sectionFourOtherComprehensiveIncomeSubheadingItemsEn,
          qsectionFourOtherComprehensiveIncomeSubheadingItemsDate2En: sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En,
        },

        qTable2: {
          qdateTwo1Ar: dataTwo1Ar,
          qdateTwo2Ar: dataTwo2Ar,

          qsectionOneTable2: {
            qsectionLastLabel: sectionLastLabel,
            qTotalsectionFourSubItemsEn: TotalsectionFourSubItemsEn,
            qTotalsectionFourSubItemsDate2En: TotalsectionFourSubItemsDate2En,
            qsectionSevenLastLabel: sectionSevenLastLabel,
            qsectionSevenSubheading: sectionSevenSubheading,
            qsectionLastLabelsEn: sectionLastLabelsEn,
            qsectionLastNotesEn: sectionLastNotesEn,
            qsectionLastItemsEn: sectionLastItemsEn,
            qsectionLastItemsDate2En: sectionLastItemsDate2En,
            qsectionLastTotalLabelEn: sectionLastTotalLabelEn,
            qTotalSectionLastLabelItemsEn: TotalSectionLastLabelItemsEn,
            qTotalSectionLastItemsDate2En: TotalSectionLastItemsDate2En,
          },
          qsectionTwoTable2: {
            qsectionSevenSubheading2: sectionSevenSubheading2,
            qsectionLastLabelsEn2: sectionLastLabelsEn2,
            qsectionLastNotesEn2: sectionLastNotesEn2,
            qsectionLastItemsEn2: sectionLastItemsEn2,
            qsectionLastItemsDate2En2: sectionLastItemsDate2En2,
            qsectionLastTotalLabelEn2: sectionLastTotalLabelEn2,
            qTotalSectionLastLabelItemsEn2: TotalSectionLastLabelItemsEn2,
            qTotalSectionLastItemsDate2En2: TotalSectionLastItemsDate2En2,

            qtotalOtherComp: {
              qSectionSevenSecondLastLabel2: SectionSevenSecondLastLabel2,
              qTotalsectionSevenSecondLastItemEn: TotalsectionSevenSecondLastItemEn,
              qTotalsectionSevenSecondLastItemsDate2En: TotalsectionSevenSecondLastItemsDate2En,
            },
            qtotalComprehensiveLoss: {
              qSectionSevenLastLabel2: SectionSevenLastLabel2,
              qTotalsectionSevenLastItemEn: TotalsectionSevenLastItemEn,
              qTotalsectionSevenLastItemsDate2En: TotalsectionSevenLastItemsDate2En
            },
           
          },
           qsectionAttributeOneTable2: {
              qsectionFourAttributeTable2: sectionFourAttributeTable2,
              qsectionFourAttributeLabelsEnTable2: sectionFourAttributeLabelsEnTable2,
              qsectionFourAttributeItemsEnTable2: sectionFourAttributeItemsEnTable2,
              qsectionFourAttributeItemsDate2EnTable2: sectionFourAttributeItemsDate2EnTable2,
              qTotalsectionFourAttributeItemsEnTable2: TotalsectionFourAttributeItemsEnTable2,
              qTotalsectionFourAttributeItemsDate2EnTable2: TotalsectionFourAttributeItemsDate2EnTable2,
            },
            qsectionAttributeTwoTable2: {
              qsectionFourAttribute2Table2: sectionFourAttribute2Table2,
              qsectionFourAttribute2LabelsEnTable2: sectionFourAttribute2LabelsEnTable2,
              qsectionFourAttribute2ItemsEnTable2: sectionFourAttribute2ItemsEnTable2,
              qsectionFourAttribute2ItemsDate2EnTable2: sectionFourAttribute2ItemsDate2EnTable2,
              qTotalsectionFourAttribute2ItemsEnTable2: TotalsectionFourAttribute2ItemsEnTable2,
              qTotalsectionFourAttribute2ItemsDate2EnTable2: TotalsectionFourAttribute2ItemsDate2EnTable2,
            },
            qsectionOtherComprehensiveIncomeTable2: {
              qsectionFourOtherComprehensiveIncomeTable2: sectionFourOtherComprehensiveIncomeTable2,
              qsectionFourOtherComprehensiveIncomeSubheadingLabelsEnTable2: sectionFourOtherComprehensiveIncomeSubheadingLabelsEnTable2,
              qsectionFourOtherComprehensiveIncomeSubheadingNotesEnTable2: sectionFourOtherComprehensiveIncomeSubheadingNotesEnTable2,
              qsectionFourOtherComprehensiveIncomeSubheadingItemsEnTable2: sectionFourOtherComprehensiveIncomeSubheadingItemsEnTable2,
              qsectionFourOtherComprehensiveIncomeSubheadingItemsDate2EnTable2: sectionFourOtherComprehensiveIncomeSubheadingItemsDate2EnTable2,
            }
        }
      };

      await dispatch(SetCashFlowDataArabicAction(formData));
    } catch (error) {
      console.log("Dispatch Error:", error);
    }
  };

  handleDispatch();
}, [
  // Original dependencies
  data1Ar,
  data2Ar,
  sectionOneFirstLabelEn,
  sectionOneLabelsEn,
  sectionOneNotesEn,
  sectionOneItemsEn,
  sectionOneItemsDate2En,
  sectionOneTotalLabel,
  TotalsectionOneItemsEn,
  TotalsectionOneItemsDate2En,
  sectionTwoLabelsEn,
  sectionTwoNotesEn,
  sectionTwoItemsEn,
  sectionTwoItemsDate2En,
  sectionTwoTotalLabel,
  TotalsectionTwoItemsEn,
  TotalsectionTwoItemsDate2En,
  sectionThreeLabelsEn,
  sectionThreeNotesEn,
  sectionThreeItemsEn,
  sectionThreeItemsDate2En,
  sectionThreeTotalLabel,
  TotalsectionThreeItemsEn,
  TotalsectionThreeItemsDate2En,
  sectionFourLabelsEn,
  sectionFourNotesEn,
  sectionFourItemsEn,
  sectionFourItemsDate2En,
  sectionFourTotalLabel,
  TotalsectionFourItemsEn,
  TotalsectionFourItemsDate2En,
  sectionFourAttribute,
  sectionFourAttributeLabelsEn,
  sectionFourAttributeItemsEn,
  sectionFourAttributeItemsDate2En,
  TotalsectionFourAttributeItemsEn,
  TotalsectionFourAttributeItemsDate2En,
  sectionFourOtherComprehensiveIncome,
  sectionFourOtherComprehensiveIncomeSubheadingLabelsEn,
  sectionFourOtherComprehensiveIncomeSubheadingNotesEn,
  sectionFourOtherComprehensiveIncomeSubheadingItemsEn,
  sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En,
  sectionFourAttribute2,
  sectionFourAttribute2LabelsEn,
  sectionFourAttribute2ItemsEn,
  sectionFourAttribute2ItemsDate2En,
  TotalsectionFourAttribute2ItemsEn,
  TotalsectionFourAttribute2ItemsDate2En,

  // MISSING DEPENDENCIES - Added below:
  
  // sectionFourSub variables
  sectionFourSubFirstLabelEn,
  sectionFourSubLabelsEn,
  sectionFourSubNotesEn,
  sectionFourSubItemsEn,
  sectionFourSubItemsDate2En,
  sectionFourSubTotalLabel,
  TotalsectionFourSubItemsEn,
  TotalsectionFourSubItemsDate2En,

  // Table2 variables
  dataTwo1Ar,
  dataTwo2Ar,

  // sectionOneTable2 variables
  sectionLastLabel,
  sectionSevenLastLabel,
  sectionSevenSubheading,
  sectionLastLabelsEn,
  sectionLastNotesEn,
  sectionLastItemsEn,
  sectionLastItemsDate2En,
  sectionLastTotalLabelEn,
  TotalSectionLastLabelItemsEn,
  TotalSectionLastItemsDate2En,

  // sectionTwo (Table2) variables
  sectionSevenSubheading2,
  sectionLastLabelsEn2,
  sectionLastNotesEn2,
  sectionLastItemsEn2,
  sectionLastItemsDate2En2,
  sectionLastTotalLabelEn2,
  TotalSectionLastLabelItemsEn2,
  TotalSectionLastItemsDate2En2,

  // totalOtherComp variables
  SectionSevenSecondLastLabel2,
  TotalsectionSevenSecondLastItemEn,
  TotalsectionSevenSecondLastItemsDate2En,

  // totalComprehensiveLoss variables
  SectionSevenLastLabel2,
  TotalsectionSevenLastItemEn,
  TotalsectionSevenLastItemsDate2En,

  // sectionAttributeOneTable2 variables
  sectionFourAttributeTable2,
  sectionFourAttributeLabelsEnTable2,
  sectionFourAttributeItemsEnTable2,
  sectionFourAttributeItemsDate2EnTable2,
  TotalsectionFourAttributeItemsEnTable2,
  TotalsectionFourAttributeItemsDate2EnTable2,

  // sectionAttributeTwoTable2 variables
  sectionFourAttribute2Table2,
  sectionFourAttribute2LabelsEnTable2,
  sectionFourAttribute2ItemsEnTable2,
  sectionFourAttribute2ItemsDate2EnTable2,
  TotalsectionFourAttribute2ItemsEnTable2,
  TotalsectionFourAttribute2ItemsDate2EnTable2,

  // sectionOtherComprehensiveIncomeTable2 variables
  sectionFourOtherComprehensiveIncomeTable2,
  sectionFourOtherComprehensiveIncomeSubheadingLabelsEnTable2,
  sectionFourOtherComprehensiveIncomeSubheadingNotesEnTable2,
  sectionFourOtherComprehensiveIncomeSubheadingItemsEnTable2,
  sectionFourOtherComprehensiveIncomeSubheadingItemsDate2EnTable2,

  // dispatch function
  dispatch
]);



     const {cashFlowDataEn}=useSelector((state:RootState)=>state.cashFlowEn)



     useEffect(()=>{
        
        console.log("cashFlowData : ",cashFlowDataEn);

        if (cashFlowDataEn) {

            setDate1Ar(cashFlowDataEn?.date1)
            setDate2Ar(cashFlowDataEn?.date2)
            if(cashFlowDataEn?.sectionOne){
                setFlowSectionOneEn(cashFlowDataEn?.sectionOne?.sectionOneItemsEn)
                setFlowSectionOneDate2En(cashFlowDataEn?.sectionOne?.sectionOneItemsDate2En)
            }
            if(cashFlowDataEn?.sectionTwo){
            setFlowSectionTwoDate2En(cashFlowDataEn?.sectionTwo?.sectionTwoItemsDate2En)
            setFlowSectionTwoEn(cashFlowDataEn?.sectionTwo?.sectionTwoItemsEn)
                 if(cashFlowDataEn?.sectionThree){
            setFlowSectionThreeDate2En(cashFlowDataEn?.sectionThree?.sectionThreeItemsDate2En)
            setFlowSectionThreeEn(cashFlowDataEn?.sectionThree?.sectionThreeItemsEn)
            }}

            if(cashFlowDataEn?.sectionFour){
            setFlowSectionFourEn(cashFlowDataEn?.sectionFour?.sectionFourItemsEn)
            setFlowSectionFourDate2En(cashFlowDataEn?.sectionFour?.sectionFourItemsDate2En)
            }
       
            if(cashFlowDataEn?.sectionAttributeOne){
              setSectionFourAttributeItemsEn(cashFlowDataEn?.sectionAttributeOne?.sectionFourAttributeItemsEn)
               setSectionFourAttributeItemsDate2En(cashFlowDataEn?.sectionAttributeOne?.sectionFourAttributeItemsDate2En)

            }
            if(cashFlowDataEn?.sectionOtherComprehensiveIncome){
              setSectionFourOtherComprehensiveIncomeSubheadingItemsEn(cashFlowDataEn?.sectionOtherComprehensiveIncome?.sectionFourOtherComprehensiveIncomeSubheadingItemsEn)
               setSectionFourOtherComprehensiveIncomeSubheadingItemsDate2En(cashFlowDataEn?.sectionOtherComprehensiveIncome?.sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En)

            }

             if(cashFlowDataEn?.sectionAttributeTwo){
              setSectionFourAttribute2ItemsEn(cashFlowDataEn?.sectionAttributeTwo?.sectionFourAttribute2ItemsEn)
               setSectionFourAttribute2ItemsDate2En(cashFlowDataEn?.sectionAttributeTwo?.sectionFourAttribute2ItemsDate2En)

            }
            
        }
        

     },[cashFlowDataEn])




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
            <tr className="bg-gray-200 font-semibold">
              <td className="">
                <input
                  value={sectionOneFirstLabelEn}
                  onChange={(e) => setSectionOneFirstLabelEn(e.target.value)}
                  className="w-full  bg-gray-200 text-black p-1"
                />
              </td>
              <td className=""></td>
              <td className=""></td>
              <td className=""></td>
            </tr>

            {sectionOneLabelsEn.map((val, idx) => {
              const isRowEmpty = !val && !sectionOneItemsDate2En[idx];
              // 🧠 Only hide the row *after* submission if it's empty
              if (TakingShort && isRowEmpty) return null;

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

            {sectionTwoLabelsEn.map((val, idx) => {
              const isRowEmpty = !val && !sectionTwoItemsDate2En[idx];
              // 🧠 Only hide the row *after* submission if it's empty
              if (TakingShort && isRowEmpty) return null;

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

            {sectionThreeLabelsEn.map((val, idx) => {
              const isRowEmpty = !val && !sectionThreeItemsDate2En[idx];
              // 🧠 Only hide the row *after* submission if it's empty
              if (TakingShort && isRowEmpty) return null;

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

            {sectionFourLabelsEn.map((val, idx) => {
              const isRowEmpty = !val && !sectionFourItemsDate2En[idx];
              // 🧠 Only hide the row *after* submission if it's empty
              if (TakingShort && isRowEmpty) return null;

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
                  value={sectionFourSubFirstLabelEn}
                  onChange={(e) =>
                    setSectionFourSubFirstLabelEn(e.target.value)
                  }
                  className="w-full  bg-gray-200 text-black p-1"
                />
              </td>
              <td className=""></td>
              <td className=""></td>
              <td className=""></td>
            </tr>




{sectionFourSubLabelsEn.map((val, idx) => {
  const isRowEmpty =
    !val && !sectionFourSubItemsDate2En[idx];
  if (TakingShort && isRowEmpty) return null;

  return (
    <tr key={`section-four-sub-${idx}`} className="bg-gray-100">
      {/* Label */}
      <td className="border border-gray-300">
        <input
          className="w-full h-7 bg-gray-100 text-black p-1"
          value={sectionFourSubLabelsEn[idx]}
          placeholder={`${idx + 1}`}
          onChange={(e) =>
            handleChangeSectionFourSub(
              idx,
              e.target.value,
              "sectionFourSub",
              "label"
            )
          }
        />
      </td>

      {/* Note */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionFourSubNotesEn[idx]}
          onChange={(e) =>
            handleChangeSectionFourSub(
              idx,
              e.target.value,
              "sectionFourSub",
              "note"
            )
          }
        />
      </td>

      {/* Item */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionFourSubItemsEn[idx]}
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
              handleChangeSectionFourSub(
                idx,
                newVal,
                "sectionFourSub",
                "item"
              );
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChangeSectionFourSub(
                idx,
                "-",
                "sectionFourSub",
                "item"
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
              handleChangeSectionFourSub(
                idx,
                "-",
                "sectionFourSub",
                "item"
              );
              return;
            }

            if (rawValue === "") {
              handleChangeSectionFourSub(
                idx,
                "",
                "sectionFourSub",
                "item"
              );
              return;
            }

            const formatted = new Intl.NumberFormat(
              "en-US"
            ).format(Number(rawValue));
            const finalValue = isNegative
              ? `(${formatted})`
              : formatted;

            handleChangeSectionFourSub(
              idx,
              finalValue,
              "sectionFourSub",
              "item"
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

      {/* Date2 */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionFourSubItemsDate2En[idx]}
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
              handleChangeSectionFourSub(
                idx,
                newVal,
                "sectionFourSub",
                "date2"
              );
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChangeSectionFourSub(
                idx,
                "-",
                "sectionFourSub",
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
              handleChangeSectionFourSub(
                idx,
                "-",
                "sectionFourSub",
                "date2"
              );
              return;
            }

            if (rawValue === "") {
              handleChangeSectionFourSub(
                idx,
                "",
                "sectionFourSub",
                "date2"
              );
              return;
            }

            const formatted = new Intl.NumberFormat(
              "en-US"
            ).format(Number(rawValue));
            const finalValue = isNegative
              ? `(${formatted})`
              : formatted;

            handleChangeSectionFourSub(
              idx,
              finalValue,
              "sectionFourSub",
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
                  value={sectionFourSubTotalLabel}
                  onChange={(e) =>
                    setSectionFourSubTotalLabel(
                      e.target.value
                    )
                  }
                  className="w-full     bg-gray-200 text-black px-1 "
                />
              </td>
              <td className=" "></td>
              <td className="p-2  ">
                {formatWithParentheses(
                  TotalsectionFourSubItemsEn
                )}
              </td>
              <td className="">
                {formatWithParentheses(
                  TotalsectionFourSubItemsDate2En
                )}
              </td>
            </tr>


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
              <td className=" "></td>
              <td className=""></td>
            </tr>

            {sectionFourAttributeLabelsEn.map((val, idx) => {
              const isRowEmpty = !val && !sectionFourAttributeItemsDate2En[idx];
              if (TakingShort && isRowEmpty) return null;

              return (
                <tr key={`section-four-${idx}`} className="bg-gray-100">
                  {/* Label Input */}
                  <td className="border border-gray-300">
                    <input
                      className="w-full h-7 bg-gray-100 text-black p-1"
                      value={sectionFourAttributeLabelsEn[idx]}
                      placeholder={`${idx + 1}`}
                      onChange={(e) =>
                        handleChangeAttribute(
                          idx,
                          e.target.value,
                          "sectionFourAttribute",
                          "label"
                        )
                      }
                    />
                  </td>
                  <td className="border border-gray-300">
                    <input className="w-full bg-gray-100 text-black p-1" />
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
                          handleChangeAttribute(
                            idx,
                            newVal,
                            "sectionFourAttribute",
                            "item"
                          );
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        if (inputValue === "-") {
                          handleChangeAttribute(
                            idx,
                            "-",
                            "sectionFourAttribute",
                            "item"
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
                          handleChangeAttribute(
                            idx,
                            "-",
                            "sectionFourAttribute",
                            "item"
                          );
                          return;
                        }

                        if (rawValue === "") {
                          handleChangeAttribute(
                            idx,
                            "",
                            "sectionFourAttribute",
                            "item"
                          );
                          return;
                        }

                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

                        handleChangeAttribute(
                          idx,
                          finalValue,
                          "sectionFourAttribute",
                          "item"
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
                          handleChangeAttribute(
                            idx,
                            newVal,
                            "sectionFourAttribute",
                            "date2"
                          );
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        if (inputValue === "-") {
                          handleChangeAttribute(
                            idx,
                            "-",
                            "sectionFourAttribute",
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
                          handleChangeAttribute(
                            idx,
                            "-",
                            "sectionFourAttribute",
                            "date2"
                          );
                          return;
                        }

                        if (rawValue === "") {
                          handleChangeAttribute(
                            idx,
                            "",
                            "sectionFourAttribute",
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

                        handleChangeAttribute(
                          idx,
                          finalValue,
                          "sectionFourAttribute",
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

            <tr className="bg-gray-100 font-semibold  ">
              <td className="bg-white"></td>
              <td className=" "></td>
              <td className="p-2  ">
                {formatWithParentheses(TotalsectionFourAttributeItemsEn)}
              </td>
              <td className="">
                {formatWithParentheses(TotalsectionFourAttributeItemsDate2En)}
              </td>
            </tr>























            <br />








              <tr className="bg-gray-200 font-semibold">
              <td className="">
                <input
                  value={sectionFourAttribute2}
                  onChange={(e) =>
                    setSectionFourAttribute2Label(e.target.value)
                  }
                  className="w-full  bg-gray-200 text-black p-1"
                />
              </td>
              <td className=" "></td>
              <td className=" "></td>
              <td className=""></td>
            </tr>

            {sectionFourAttribute2LabelsEn.map((val, idx) => {
              const isRowEmpty =
                !val && !sectionFourAttribute2ItemsDate2En[idx];
              if (TakingShort && isRowEmpty) return null;

              return (
                <tr
                  key={`section-four-attribute2-${idx}`}
                  className="bg-gray-100"
                >
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
                        const isNegative =
                          inputValue.startsWith("-") ||
                          inputValue.startsWith("(");
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

                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );
                        const finalValue = isNegative
                          ? `(${formatted})`
                          : formatted;

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
                          handleChangeAttribute2(idx, newVal, "date2");
                        }
                      }}
                      onChange={(e) => {
                        const input = e.target;
                        const inputValue = input.value;
                        const caretPos = input.selectionStart ?? 0;

                        if (inputValue === "-") {
                          handleChangeAttribute2(idx, "-", "date2");
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
                          handleChangeAttribute2(idx, "-", "date2");
                          return;
                        }

                        if (rawValue === "") {
                          handleChangeAttribute2(idx, "", "date2");
                          return;
                        }

                        const formatted = new Intl.NumberFormat("en-US").format(
                          Number(rawValue)
                        );
                        const finalValue = isNegative 
                          ? `(${formatted})`
                          : formatted;

                        handleChangeAttribute2(idx, finalValue, "date2");

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


















            <tr className="bg-gray-200 font-semibold  ">
              <td className="">
                <textarea 
                  value={sectionFourOtherComprehensiveIncome}
                  onChange={(e) =>
                    setSectionFourOtherComprehensiveIncomeLabel(e.target.value)
                  }
                  className="w-full   bg-gray-200 text-black px-1"
                />
              </td>
              <td className=" "></td>
              <td className="   "></td>
              <td className=""></td>
            </tr>
           

            {sectionFourOtherComprehensiveIncomeSubheadingLabelsEn.map(
              (val, idx) => {
                const isRowEmpty =
                    !val &&
                    !sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En[
                        idx
                    ];
                  if (TakingShort && isRowEmpty) return null;
                  return (
                    <tr key={`section-four-other-${idx}`} className="bg-gray-100">
                        {/* Label */}
                      <td className="border border-gray-300">
                        <input
                        className="w-full h-7 bg-gray-100 text-black p-1"
                        value={
                          sectionFourOtherComprehensiveIncomeSubheadingLabelsEn[
                            idx
                          ]
                        }
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
                        value={
                          sectionFourOtherComprehensiveIncomeSubheadingNotesEn[
                            idx
                          ]
                        }
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
                        value={
                          sectionFourOtherComprehensiveIncomeSubheadingItemsEn[
                            idx
                          ]
                        }
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
                            handleChangeOtherComprehensiveIncome(
                              idx,
                              "-",
                              "sectionFourOtherComprehensiveIncomeSubheading",
                              "item"
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
                            handleChangeOtherComprehensiveIncome(
                              idx,
                              "-",
                              "sectionFourOtherComprehensiveIncomeSubheading",
                              "item"
                            );
                            return;
                          }

                          if (rawValue === "") {
                            handleChangeOtherComprehensiveIncome(
                              idx,
                              "",
                              "sectionFourOtherComprehensiveIncomeSubheading",
                              "item"
                            );
                            return;
                          }

                          const formatted = new Intl.NumberFormat(
                            "en-US"
                          ).format(Number(rawValue));
                          const finalValue = isNegative
                            ? `(${formatted})`
                            : formatted;

                          handleChangeOtherComprehensiveIncome(
                            idx,
                            finalValue,
                            "sectionFourOtherComprehensiveIncomeSubheading",
                            "item"
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

                    {/* Date2 */}
                    <td className="border border-gray-300">
                      <input
                        className="w-full bg-gray-100 text-black p-1"
                        value={
                          sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En[
                            idx
                          ]
                        }
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
                            handleChangeOtherComprehensiveIncome(
                              idx,
                              "-",
                              "sectionFourOtherComprehensiveIncomeSubheading",
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
                            handleChangeOtherComprehensiveIncome(
                              idx,
                              "-",
                              "sectionFourOtherComprehensiveIncomeSubheading",
                              "date2"
                            );
                            return;
                          }

                          if (rawValue === "") {
                            handleChangeOtherComprehensiveIncome(
                              idx,
                              "",
                              "sectionFourOtherComprehensiveIncomeSubheading",
                              "date2"
                            );
                            return;
                          }

                          const formatted = new Intl.NumberFormat(
                            "en-US"
                          ).format(Number(rawValue));
                          const finalValue = isNegative
                            ? `(${formatted})`
                            : formatted;

                          handleChangeOtherComprehensiveIncome(
                            idx,
                            finalValue,
                            "sectionFourOtherComprehensiveIncomeSubheading",
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
              }
            )}

          

            <br />
            <br />



































          





<br />













          </tbody>


            <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-100 w-96"></th>
              <th className="border border-gray-100 w-16">إيضاحات</th>
              <th className="border border-gray-100 p-1 w-28">
                <div dir="rtl" className="items-center h-5">
                  <DatePicker
                    className="text-right"
                    value={dataTwo1Ar}
                    onChange={(date: DateObject | null) => {
                      if (date) {
                        const jsDate = new Date(
                          date.year,
                          date.month.number - 1, // ✅ Correct usage
                          date.day
                        );
                        setDateTwo1Ar(jsDate);
                      } else {
                        setDateTwo1Ar(null);
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
                    value={dataTwo2Ar}
                    onChange={(date: DateObject | null) => {
                      if (date) {
                        const jsDate = new Date(
                          date.year,
                          date.month.number - 1, // ✅ Correct usage
                          date.day
                        );
                        setDateTwo2Ar(jsDate);
                      } else {
                        setDateTwo2Ar(null);
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

        <tr className="bg-gray-300 font-semibold">
              <td className="">
                <input
                  value={sectionLastLabel}
                  onChange={(e) =>
                    setSectionLastLabel(
                      e.target.value
                    )
                  }
                  className="w-full     bg-gray-300 text-black px-1 "
                />
              </td>
              <td className=" "></td>
              <td className="p-1  ">
                {formatWithParentheses(
                  TotalsectionFourSubItemsEn
                )}
              </td>
              <td className="">
                {formatWithParentheses(
                  TotalsectionFourSubItemsDate2En
                )}
              </td>
            </tr>

        <tr className="bg-gray-300 font-semibold">
              <td className=" p-1">
                <input
                  value={sectionSevenLastLabel}
                  onChange={(e) =>
                    setSectionSevenLastLabel(
                      e.target.value
                    )
                  }
                  className="w-full  bg-gray-300 text-black  "
                />
              </td>
              <td className=" "></td>
              <td className="  ">
               
              </td>
              <td className="">
               
              </td>

            </tr>
               <tr className="bg-gray-200 font-semibold  ">
              <td className="">
                <textarea
                  value={sectionSevenSubheading}
                  onChange={(e) =>
                    setSectionSevenSubheadingLabel(
                      e.target.value
                    )
                  }
                  className="w-full     bg-gray-200 text-black px-1 "
                />
              </td>
              <td className=" "></td>
              <td className="   "></td>
              <td className=""></td>
            </tr>








  
            {sectionLastLabelsEn.map((val, idx) => {
  const isRowEmpty = !val && !sectionLastItemsDate2En[idx];
  if (TakingShort && isRowEmpty) return null;

  return (
    <tr key={`section-last-${idx}`} className="bg-gray-100">
      <td className="border border-gray-300">
        <input
          className="w-full h-7 bg-gray-100 text-black p-1"
          value={sectionLastLabelsEn[idx]}
          placeholder={`${idx + 1}`}
          onChange={(e) =>
            handleChangeSectionLast(idx, e.target.value, "sectionLast", "label")
          }
        />
      </td>

      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionLastNotesEn[idx]}
          onChange={(e) =>
            handleChangeSectionLast(idx, e.target.value, "sectionLast", "note")
          }
        />
      </td>

      {/* Item */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionLastItemsEn[idx]}
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
              handleChangeSectionLast(idx, newVal, "sectionLast", "item");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChangeSectionLast(idx, "-", "sectionLast", "item");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChangeSectionLast(idx, "-", "sectionLast", "item");
              return;
            }

            if (rawValue === "") {
              handleChangeSectionLast(idx, "", "sectionLast", "item");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(Number(rawValue));
            const finalValue = isNegative ? `(${formatted})` : formatted;

            handleChangeSectionLast(idx, finalValue, "sectionLast", "item");

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
          value={sectionLastItemsDate2En[idx]}
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
              handleChangeSectionLast(idx, newVal, "sectionLast", "date2");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChangeSectionLast(idx, "-", "sectionLast", "date2");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, ""); 

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChangeSectionLast(idx, "-", "sectionLast", "date2");
              return;
            }

            if (rawValue === "") {
              handleChangeSectionLast(idx, "", "sectionLast", "date2");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(Number(rawValue));
            const finalValue = isNegative ? `(${formatted})` : formatted;

            handleChangeSectionLast(idx, finalValue, "sectionLast", "date2");

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
              <td className="bg-white"> <textarea
                  value={sectionLastTotalLabelEn}
                  onChange={(e) =>
                    setSectionLastTotalLabelEn(
                      e.target.value
                    )
                  }
                  className="w-full     bg-gray-200 text-black px-1 "
                /></td>
              <td></td>
              <td className="p-2">
                {formatWithParentheses(TotalSectionLastLabelItemsEn)}
              </td>
              <td>
                {formatWithParentheses(TotalSectionLastItemsDate2En)}
              </td>
            </tr>
            <br />




            
               <tr className="bg-gray-200 font-semibold  ">
              <td className="">
                <textarea
                  value={sectionSevenSubheading2}
                  onChange={(e) =>
                    setSectionSevenSubheadingLabel2(
                      e.target.value
                    )
                  }
                  className="w-full     bg-gray-200 text-black px-1 "
                />
              </td>
              <td className=" "></td>
              <td className="   "></td>
              <td className=""></td>
            </tr>




{sectionLastLabelsEn2.map((val, idx) => {
  const isRowEmpty = !val && !sectionLastItemsDate2En2[idx];
  if (TakingShort && isRowEmpty) return null;

  return (
    <tr key={`section-last2-${idx}`} className="bg-gray-100">
      {/* Label */}
      <td className="border border-gray-300">
        <input
          className="w-full h-7 bg-gray-100 text-black p-1"
          value={sectionLastLabelsEn2[idx]}
          placeholder={`${idx + 1}`}
          onChange={(e) =>
            handleChangeSectionLast2(idx, e.target.value, "sectionLast2", "label")
          }
        />
      </td>

      {/* Note */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionLastNotesEn2[idx]}
          onChange={(e) =>
            handleChangeSectionLast2(idx, e.target.value, "sectionLast2", "note")
          }
        />
      </td>

      {/* Item */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionLastItemsEn2[idx]}
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
              handleChangeSectionLast2(idx, newVal, "sectionLast2", "item");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChangeSectionLast2(idx, "-", "sectionLast2", "item");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChangeSectionLast2(idx, "-", "sectionLast2", "item");
              return;
            }

            if (rawValue === "") {
              handleChangeSectionLast2(idx, "", "sectionLast2", "item");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(Number(rawValue));
            const finalValue = isNegative ? `(${formatted})` : formatted;

            handleChangeSectionLast2(idx, finalValue, "sectionLast2", "item");

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
          value={sectionLastItemsDate2En2[idx]}
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
              handleChangeSectionLast2(idx, newVal, "sectionLast2", "date2");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChangeSectionLast2(idx, "-", "sectionLast2", "date2");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") { 
              handleChangeSectionLast2(idx, "-", "sectionLast2", "date2");
              return;
            }

            if (rawValue === "") {
              handleChangeSectionLast2(idx, "", "sectionLast2", "date2");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(Number(rawValue));
            const finalValue = isNegative ? `(${formatted})` : formatted;

            handleChangeSectionLast2(idx, finalValue, "sectionLast2", "date2");

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
              <td className="bg-white"><textarea
                  value={sectionLastTotalLabelEn2}
                  onChange={(e) =>
                    setSectionToatalLastLabelEn2(
                      e.target.value
                    )
                  }
                  className="w-full     bg-gray-200 text-black px-1 "
                /></td>
              <td></td>
              <td className="p-2">
                {formatWithParentheses(TotalSectionLastLabelItemsEn2)}
              </td>
              <td>
                {formatWithParentheses(TotalSectionLastItemsDate2En2)}
              </td>
            </tr>
























      <tr className="bg-gray-300 font-semibold">
              <td className="">
                <input
                  value={SectionSevenSecondLastLabel2}
                  onChange={(e) =>
                    setSectionSevenSecondLastLabel2(
                      e.target.value
                    )
                  }
                  className="w-full     bg-gray-300 text-black px-1 "
                />
              </td>
              <td className=" "></td>
              <td className="p-1  ">
                {formatWithParentheses(
                  TotalsectionSevenSecondLastItemEn
                )}
              </td>
              <td className="">
                {formatWithParentheses(
                  TotalsectionSevenSecondLastItemsDate2En
                )}
              </td>
            </tr>
      <tr className="bg-gray-300 font-semibold">
              <td className="">
                <input
                  value={SectionSevenLastLabel2}
                  onChange={(e) =>
                    setSectionSevenLastLabel2(
                      e.target.value
                    )
                  }
                  className="w-full     bg-gray-300 text-black px-1 "
                />
              </td>
              <td className=" "></td>
              <td className="p-1  ">
                {formatWithParentheses(
                  TotalsectionSevenLastItemEn 
                )}
              </td>
              <td className="">
                {formatWithParentheses(
                  TotalsectionSevenLastItemsDate2En
                )}
              </td>
            </tr>




<br />
<br />





<tr className="bg-gray-200 font-semibold">
  <td className="">
    <input
      value={sectionFourAttributeTable2}
      onChange={(e) => setSectionFourAttributeLabelTable2(e.target.value)}
      className="w-full bg-gray-200 text-black p-1"
    />
  </td>
  <td className=" "></td>
  <td className=" "></td>
  <td className=""></td>
</tr>

{sectionFourAttributeLabelsEnTable2.map((val, idx) => {
  const isRowEmpty = !val && !sectionFourAttributeItemsDate2EnTable2[idx];
  if (TakingShort && isRowEmpty) return null;

  return (
    <tr key={`section-four-table2-${idx}`} className="bg-gray-100">
      {/* Label Input */}
      <td className="border border-gray-300">
        <input
          className="w-full h-7 bg-gray-100 text-black p-1"
          value={sectionFourAttributeLabelsEnTable2[idx]}
          placeholder={`${idx + 1}`}
          onChange={(e) =>
            handleChangeAttributeTable2(
              idx,
              e.target.value,
              "sectionFourAttribute",
              "label"
            )
          }
        />
      </td>

      <td className="border border-gray-300">
        <input className="w-full bg-gray-100 text-black p-1" />
      </td>

      {/* Item Input */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          placeholder=""
          value={sectionFourAttributeItemsEnTable2[idx]}
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
              handleChangeAttributeTable2(
                idx,
                newVal,
                "sectionFourAttribute",
                "item"
              );
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChangeAttributeTable2(idx, "-", "sectionFourAttribute", "item");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChangeAttributeTable2(idx, "-", "sectionFourAttribute", "item");
              return;
            }

            if (rawValue === "") {
              handleChangeAttributeTable2(idx, "", "sectionFourAttribute", "item");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(Number(rawValue));
            const finalValue = isNegative ? `(${formatted})` : formatted;

            handleChangeAttributeTable2(idx, finalValue, "sectionFourAttribute", "item");

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
          value={sectionFourAttributeItemsDate2EnTable2[idx]}
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
              handleChangeAttributeTable2(
                idx,
                newVal,
                "sectionFourAttribute",
                "date2"
              );
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChangeAttributeTable2(idx, "-", "sectionFourAttribute", "date2");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChangeAttributeTable2(idx, "-", "sectionFourAttribute", "date2");
              return;
            }

            if (rawValue === "") {
              handleChangeAttributeTable2(idx, "", "sectionFourAttribute", "date2");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(Number(rawValue));
            const finalValue = isNegative ? `(${formatted})` : formatted;

            handleChangeAttributeTable2(idx, finalValue, "sectionFourAttribute", "date2");

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
  <td className="bg-white"></td>
  <td className=""></td>
  <td className="p-2">
    {formatWithParentheses(TotalsectionFourAttributeItemsEnTable2)}
  </td>
  <td className="">
    {formatWithParentheses(TotalsectionFourAttributeItemsDate2EnTable2)}
  </td>
</tr>



    {/* Main label row */}
<tr className="bg-gray-200 font-semibold">
  <td className="">
    <input
      value={sectionFourAttribute2Table2}
      onChange={(e) => setSectionFourAttribute2LabelTable2(e.target.value)}
      className="w-full bg-gray-200 text-black p-1"
    />
  </td>
  <td className=""></td>
  <td className=""></td>
  <td className=""></td>
</tr>

{/* Dynamic input rows */}
{sectionFourAttribute2LabelsEnTable2.map((val, idx) => {
  const isRowEmpty =
    !val && !sectionFourAttribute2ItemsDate2EnTable2[idx];
  if (TakingShort && isRowEmpty) return null;

  return (
    <tr key={`section-four-attribute2-table2-${idx}`} className="bg-gray-100">
      {/* Label Input */}
      <td className="border border-gray-300">
        <input
          className="w-full h-7 bg-gray-100 text-black p-1"
          value={sectionFourAttribute2LabelsEnTable2[idx]}
          placeholder={`${idx + 1}`}
          onChange={(e) =>
            handleChangeAttribute2Table2(idx, e.target.value, "label")
          }
        />
      </td>

      {/* Spacer cell */}
      <td className="border border-gray-300"></td>

      {/* Item Input */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionFourAttribute2ItemsEnTable2[idx]}
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
              handleChangeAttribute2Table2(idx, newVal, "item");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChangeAttribute2Table2(idx, "-", "item");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChangeAttribute2Table2(idx, "-", "item");
              return;
            }

            if (rawValue === "") {
              handleChangeAttribute2Table2(idx, "", "item");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(
              Number(rawValue)
            );
            const finalValue = isNegative ? `(${formatted})` : formatted;

            handleChangeAttribute2Table2(idx, finalValue, "item");

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
          value={sectionFourAttribute2ItemsDate2EnTable2[idx]}
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
              handleChangeAttribute2Table2(idx, newVal, "date2");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChangeAttribute2Table2(idx, "-", "date2");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChangeAttribute2Table2(idx, "-", "date2");
              return;
            }

            if (rawValue === "") {
              handleChangeAttribute2Table2(idx, "", "date2");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(
              Number(rawValue)
            );
            const finalValue = isNegative ? `(${formatted})` : formatted;

            handleChangeAttribute2Table2(idx, finalValue, "date2");

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

{/* Total Row */}
<tr className="bg-gray-100 font-semibold">
  <td className="bg-white"></td>
  <td></td>
  <td className="p-2">
    {formatWithParentheses(TotalsectionFourAttribute2ItemsEnTable2)}
  </td>
  <td>
    {formatWithParentheses(TotalsectionFourAttribute2ItemsDate2EnTable2)}
  </td>
</tr>


<tr className="bg-gray-200 font-semibold">
  <td>
    <textarea
      value={sectionFourOtherComprehensiveIncomeTable2}
      onChange={(e) =>
        setSectionFourOtherComprehensiveIncomeLabelTable2(e.target.value)
      }
      className="w-full bg-gray-200 text-black px-1"
    />
  </td>
  <td></td>
  <td></td>
  <td></td>
</tr>

{sectionFourOtherComprehensiveIncomeSubheadingLabelsEnTable2.map((val, idx) => {
  const isRowEmpty =
    !val && !sectionFourOtherComprehensiveIncomeSubheadingItemsDate2EnTable2[idx];
  if (TakingShort && isRowEmpty) return null;

  return (
    <tr key={`section-four-other-table2-${idx}`} className="bg-gray-100">
      {/* Label */}
      <td className="border border-gray-300">
        <input
          className="w-full h-7 bg-gray-100 text-black p-1"
          value={val}
          placeholder={`${idx + 1}`}
          onChange={(e) =>
            handleChangeOtherComprehensiveIncomeTable2(idx, e.target.value, "label")
          }
        />
      </td>

      {/* Note */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionFourOtherComprehensiveIncomeSubheadingNotesEnTable2[idx]}
          onChange={(e) =>
            handleChangeOtherComprehensiveIncomeTable2(idx, e.target.value, "note")
          }
        />
      </td>

      {/* Item */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionFourOtherComprehensiveIncomeSubheadingItemsEnTable2[idx]}
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
              handleChangeOtherComprehensiveIncomeTable2(idx, newVal, "item");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChangeOtherComprehensiveIncomeTable2(idx, "-", "item");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChangeOtherComprehensiveIncomeTable2(idx, "-", "item");
              return;
            }

            if (rawValue === "") {
              handleChangeOtherComprehensiveIncomeTable2(idx, "", "item");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(Number(rawValue));
            const finalValue = isNegative ? `(${formatted})` : formatted;

            handleChangeOtherComprehensiveIncomeTable2(idx, finalValue, "item");

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
          value={sectionFourOtherComprehensiveIncomeSubheadingItemsDate2EnTable2[idx]}
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
              handleChangeOtherComprehensiveIncomeTable2(idx, newVal, "date2");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChangeOtherComprehensiveIncomeTable2(idx, "-", "date2");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChangeOtherComprehensiveIncomeTable2(idx, "-", "date2");
              return;
            }

            if (rawValue === "") {
              handleChangeOtherComprehensiveIncomeTable2(idx, "", "date2");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(Number(rawValue));
            const finalValue = isNegative ? `(${formatted})` : formatted;

            handleChangeOtherComprehensiveIncomeTable2(idx, finalValue, "date2");

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


          </tbody>







        </table>
      </div>
    );
  }
);

export default CashFlowFormAr;
