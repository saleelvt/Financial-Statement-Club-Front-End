/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../../reduxKit/store";
import { SetCashFlowDataEnglishAction } from "../../../../../reduxKit/actions/Tables/cashFlowEn";

type BalaceSheetFormArProps = { TakingShort: boolean };
const CashFlowFormEn: React.FC<BalaceSheetFormArProps> = React.memo(
  ({ TakingShort }) => {
    // Updated state declarations with empty strings as initial values
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

    const [date1, setDate1] = useState("(Unaudited)");
    const [date2, setDate2] = useState("(Audited)");

    const [data1En, setDate1En] = useState<Date | null>(null);
    const [data2En, setDate2En] = useState<Date | null>(null);
    const [dataTwo1En, setDateTwo1En] = useState<Date | null>(null);
    const [dataTwo2En, setDateTwo2En] = useState<Date | null>(null);
    // section One

    const [sectionOneFirstLabelEn, setSectionOneFirstLabelEn] = useState(     "Continuing Operations"   );
    const [sectionOneLabelsEn, setSectionOneLabelsEn] = useState<string[]>(      Array(5).fill("")   );
    const [sectionOneNotesEn, setFlowSectionOneNotesEn] = useState<string[]>(     Array(5).fill("")   );
    const [sectionOneItemsEn, setFlowSectionOneEn] = useState<string[]>(     Array(5).fill("")   );
    const [sectionOneItemsDate2En, setFlowSectionOneDate2En] = useState<    string[]   >(Array(5).fill(""));
    const [sectionOneTotalLabel, setSectionOneTotalLabel] = useState("");
    const TotalsectionOneItemsEn = sumStringValues(sectionOneItemsEn);
    const TotalsectionOneItemsDate2En = sumStringValues(sectionOneItemsDate2En);

    // section Two
    const [sectionTwoLabelsEn, setSectionTwoLabelsEn] = useState<string[]>(     Array(12).fill("")  );
    const [sectionTwoNotesEn, setFlowSectionTwoNotesEn] = useState<string[]>(     Array(12).fill("")   );
    const [sectionTwoItemsEn, setFlowSectionTwoEn] = useState<string[]>(     Array(12).fill("")   );
    const [sectionTwoItemsDate2En, setFlowSectionTwoDate2En] = useState<    string[]  >(Array(12).fill(""));
    const [sectionTwoTotalLabel, setSectionTwoTotalLabel] = useState("");
    const TotalsectionTwoItemsEn =    TotalsectionOneItemsEn + sumStringValues(sectionTwoItemsEn);
    const TotalsectionTwoItemsDate2En =   TotalsectionOneItemsDate2En + sumStringValues(sectionTwoItemsDate2En);

    // section Three
    const [sectionThreeLabelsEn, setSectionThreeLabelsEn] = useState<string[]>(    Array(7).fill("")  );
   const [sectionThreeNotesEn, setFlowSectionThreeNotesEn] = useState<    string[]   >(Array(7).fill(""));
    const [sectionThreeItemsEn, setFlowSectionThreeEn] = useState<string[]>(     Array(7).fill("")   );
    const [sectionThreeItemsDate2En, setFlowSectionThreeDate2En] = useState<     string[]    >(Array(7).fill(""));
    const [sectionThreeTotalLabel, setSectionThreeTotalLabel] = useState("");
    const TotalsectionThreeItemsEn =      TotalsectionTwoItemsEn + sumStringValues(sectionThreeItemsEn);
    const TotalsectionThreeItemsDate2En =      TotalsectionTwoItemsDate2En + sumStringValues(sectionThreeItemsDate2En);

    // sectoin Four
    const [sectionFourLabelsEn, setSectionFourLabelsEn] = useState<string[]>(     Array(5).fill("")    );
    const [sectionFourNotesEn, setFlowSectionFourNotesEn] = useState<string[]>(      Array(5).fill("")   );
    const [sectionFourItemsEn, setFlowSectionFourEn] = useState<string[]>(      Array(5).fill("")    );
    const [sectionFourItemsDate2En, setFlowSectionFourDate2En] = useState<      string[]    >(Array(5).fill(""));
    const [sectionFourTotalLabel, setSectionFourTotalLabel] = useState("");
    const TotalsectionFourItemsEn =      TotalsectionThreeItemsEn + sumStringValues(sectionFourItemsEn);
    const TotalsectionFourItemsDate2En =     TotalsectionThreeItemsDate2En + sumStringValues(sectionFourItemsDate2En);

    const [sectionFourSubFirstLabelEn, setSectionFourSubFirstLabelEn] =  useState("Discontinued Operation");
    const [sectionFourSubLabelsEn, setSectionFourSubLabelsEn] = useState< string[] >(Array(3).fill(""));
    const [sectionFourSubNotesEn, setFlowSectionFourSubNotesEn] = useState< string[] >(Array(3).fill(""));
    const [sectionFourSubItemsEn, setFlowSectionFourSubEn] = useState<string[]>(  Array(3).fill("")    );
    const [sectionFourSubItemsDate2En, setFlowSectionFourSubDate2En] = useState<   string[]   >(Array(3).fill(""));
    const [sectionFourSubTotalLabel, setSectionFourSubTotalLabel] =  useState("LOSS FOR THE YEAR");
    const TotalsectionFourSubItemsEn =   TotalsectionThreeItemsEn + sumStringValues(sectionFourSubItemsEn);
    const TotalsectionFourSubItemsDate2En =  TotalsectionThreeItemsDate2En + sumStringValues(sectionFourSubItemsDate2En);

    const [sectionFourAttribute, setSectionFourAttributeLabel] = useState("");
    const [sectionFourAttributeLabelsEn, setSectionFourAttributeLabelsEn] =    useState<string[]>(Array(2).fill(""));
    const [sectionFourAttributeItemsEn, setSectionFourAttributeItemsEn] =   useState<string[]>(Array(2).fill(""));
    const [sectionFourAttributeItemsDate2En,   setSectionFourAttributeItemsDate2En,  ] = useState<string[]>(Array(2).fill(""));
    const TotalsectionFourAttributeItemsEn = sumStringValues(  sectionFourAttributeItemsEn  );
    const TotalsectionFourAttributeItemsDate2En = sumStringValues(  sectionFourAttributeItemsDate2En );

    const [ sectionFourOtherComprehensiveIncome,    setSectionFourOtherComprehensiveIncomeLabel,  ] = useState("OtherComprehensiveIncome");
    const [ sectionFourOtherComprehensiveIncomeSubheading,   setSectionFourOtherComprehensiveIncomeSubheadingLabel ] = useState("OtherComprehensiveIncome subbb");

    const [ sectionFourOtherComprehensiveIncomeSubheadingLabelsEn,   setSectionFourOtherComprehensiveIncomeSubheadingLabelsEn,  ] = useState<string[]>(Array(2).fill(""));
    const [  sectionFourOtherComprehensiveIncomeSubheadingNotesEn,   setSectionFourOtherComprehensiveIncomeSubheadingNotesEn,   ] = useState<string[]>(Array(2).fill(""));
    const [  sectionFourOtherComprehensiveIncomeSubheadingItemsEn,     setSectionFourOtherComprehensiveIncomeSubheadingItemsEn,   ] = useState<string[]>(Array(2).fill(""));
    const [ sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En,    setSectionFourOtherComprehensiveIncomeSubheadingItemsDate2En,   ] = useState<string[]>(Array(2).fill(""));
    const [   sectionFourOtherTotalComprehensiveIncome,     setSectionFourOtherToatalComprehensiveIncomeLabel,   ] = useState("");
    const TotalsectionFourOtherComprehensiveIncomeSubheadingItemsEn =    TotalsectionFourAttributeItemsEn +    sumStringValues(sectionFourOtherComprehensiveIncomeSubheadingItemsEn);
    const TotalsectionFourOtherComprehensiveIncomeSubheadingItemsDate2En =   TotalsectionFourAttributeItemsDate2En +   sumStringValues(     sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En     );

    const [sectionFourAttribute2, setSectionFourAttribute2Label] = useState("");
    const [sectionFourAttribute2LabelsEn, setSectionFourAttribute2LabelsEn] =  useState<string[]>(Array(2).fill(""));
    const [sectionFourAttribute2ItemsEn, setSectionFourAttribute2ItemsEn] = useState<string[]>(Array(2).fill(""));
    const [sectionFourAttribute2ItemsDate2En,     setSectionFourAttribute2ItemsDate2En,   ] = useState<string[]>(Array(2).fill(""));
    const TotalsectionFourAttribute2ItemsEn = sumStringValues( sectionFourAttribute2ItemsEn   );
  const TotalsectionFourAttribute2ItemsDate2En = sumStringValues( sectionFourAttribute2ItemsDate2En   );


  //does't added
    const [sectionFourAfterAttribute2Label, setSectionFourAfterAttribute2Label] = useState("after attribut ");
    const [sectionFourAfterAttribute2LabelsEn, setSectionFourAfterAttribute2LabelsEn] = useState< string[] >(Array(3).fill(""));
    const [sectionFourAfterAttribute2NotesEn, setFlowSectionFourAfterAttribute2NotesEn] = useState<   string[]   >(Array(3).fill(""));
    const [sectionFourAfterAttribute2ItemsEn, setFlowSectionFourAfterAttribute2En] = useState<string[]>(  Array(3).fill("") );
    const [sectionFourAfterAttribute2ItemsDate2En, setFlowSectionFourAfterAttribute2Date2En]  = useState<   string[]   >(Array(3).fill(""));
//

      const [sectionLastLabel, setSectionLastLabel] =  useState("LOSS FOR THE YEAR 2");
      const [sectionSevenLastLabel, setSectionSevenLastLabel] =  useState("Other comprehensive income(loss)");
       const [ sectionSevenSubheading,   setSectionSevenSubheadingLabel ] = useState("OtherComprehens1");

    const [ sectionLastLabelsEn,  setSectionLastLabelsEn,  ] = useState<string[]>(Array(2).fill(""));
    const [ sectionLastNotesEn, setSectionLastNotesEn,   ] = useState<string[]>(Array(2).fill(""));
    const [ sectionLastItemsEn,    setSectionLastItemsEn,   ] = useState<string[]>(Array(2).fill(""));
    const [ sectionLastItemsDate2En,   setSectionLastItemsDate2En,   ] = useState<string[]>(Array(2).fill(""));
 
    const TotalSectionLastLabelItemsEn =      sumStringValues(sectionLastItemsEn);
    const TotalSectionLastItemsDate2En =  sumStringValues(sectionLastItemsDate2En);




       const [ sectionSevenSubheading2,   setSectionSevenSubheadingLabel2 ] = useState("OtherComprehs 2");
    const [ sectionLastLabelsEn2,  setSectionLastLabelsEn2 ] = useState<string[]>(Array(2).fill(""));
    const [ sectionLastNotesEn2, setSectionLastNotesEn2 ] = useState<string[]>(Array(2).fill(""));
    const [ sectionLastItemsEn2,    setSectionLastItemsEn2] = useState<string[]>(Array(2).fill(""));
    const [ sectionLastItemsDate2En2,   setSectionLastItemsDate2En2 ] = useState<string[]>(Array(2).fill(""));
 
    const TotalSectionLastLabelItemsEn2 =      sumStringValues(sectionLastItemsEn2);
    const TotalSectionLastItemsDate2En2 =  sumStringValues(sectionLastItemsDate2En2);

      const [SectionSevenSecondLastLabel2,   setSectionSevenSecondLastLabel2 ] = useState("Other Comprehensive Income total");

       const TotalsectionSevenSecondLastItemEn = TotalSectionLastLabelItemsEn+TotalSectionLastLabelItemsEn2
       const TotalsectionSevenSecondLastItemsDate2En = TotalSectionLastItemsDate2En+TotalSectionLastItemsDate2En2
    
      const [ SectionSevenLastLabel2,   setSectionSevenLastLabel2 ] = useState("Total Comprehensive (Loss) Income For The Year");

       const TotalsectionSevenLastItemEn =     TotalsectionSevenSecondLastItemEn
       const TotalsectionSevenLastItemsDate2En = TotalsectionSevenSecondLastItemsDate2En















    // section Five
    const [sectionFiveLabelsEn, setSectionFiveLabelsEn] = useState<string[]>(     Array(8).fill("")   );
    const [sectionFiveNotesEn, setFlowSectionFiveNotesEn] = useState<string[]>(     Array(8).fill("")  );
    const [sectionFiveItemsEn, setFlowSectionFiveEn] = useState<string[]>(    Array(8).fill("")   );
    const [sectionFiveItemsDate2En, setFlowSectionFiveDate2En] = useState<     string[]    >(Array(8).fill(""));
    const [sectionFiveTotalLabel, setSectionFiveTotalLabel] = useState("");
    const TotalsectionFiveItemsEn =      TotalsectionFourItemsEn + sumStringValues(sectionFiveItemsEn);
    const TotalsectionFiveItemsDate2En =     TotalsectionFourItemsDate2En + sumStringValues(sectionFiveItemsDate2En);

    // section Six
    const [sectionSixLabelsEn, setSectionSixLabelsEn] = useState<string[]>(     Array(8).fill("")  );
    const [sectionSixNotesEn, setFlowSectionSixNotesEn] = useState<string[]>(    Array(8).fill("")  );
    const [sectionSixItemsEn, setFlowSectionSixEn] = useState<string[]>(     Array(8).fill("")  );
    const [sectionSixItemsDate2En, setFlowSectionSixDate2En] = useState<    string[]  >(Array(8).fill(""));
    const [sectionSixTotalLabel, setSectionSixTotalLabel] = useState("");
    const TotalsectionSixItemsEn =   TotalsectionFiveItemsEn + sumStringValues(sectionSixItemsEn);
    const TotalsectionSixItemsDate2En =  TotalsectionFiveItemsDate2En + sumStringValues(sectionSixItemsDate2En);






      
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


    const handleChangeAfterAttribute2 = (
  index: number,
  value: string,
  section: "sectionFourAfterAttribute2",
  type: "label" | "note" | "item" | "date2"
) => {
  if (section === "sectionFourAfterAttribute2") {
    switch (type) {
      case "label":
        setSectionFourAfterAttribute2LabelsEn((prev) => {
          const updated = [...prev];
          updated[index] = value;
          return updated;
        });
        break;
      case "note":
        setFlowSectionFourAfterAttribute2NotesEn((prev) => {
          const updated = [...prev];
          updated[index] = value;
          return updated;
        });
        break;
      case "item":
        setFlowSectionFourAfterAttribute2En((prev) => {
          const updated = [...prev];
          updated[index] = value;
          return updated;
        });
        break;
      case "date2":
        setFlowSectionFourAfterAttribute2Date2En((prev) => {
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
            date1: data1En,
            date2: data2En,

            sectionOne: {
              sectionOneFirstLabelEn,
              sectionOneLabelsEn,
              sectionOneNotesEn,
              sectionOneItemsEn,
              sectionOneItemsDate2En,
              sectionOneTotalLabel,
              TotalsectionOneItemsEn,
              TotalsectionOneItemsDate2En,
            },
            sectionTwo: {
              sectionTwoLabelsEn,
              sectionTwoNotesEn,
              sectionTwoItemsEn,
              sectionTwoItemsDate2En,
              sectionTwoTotalLabel,
              TotalsectionTwoItemsEn,
              TotalsectionTwoItemsDate2En,
            },
            sectionThree: {
              sectionThreeLabelsEn,
              sectionThreeNotesEn,
              sectionThreeItemsEn,
              sectionThreeItemsDate2En,
              sectionThreeTotalLabel,
              TotalsectionThreeItemsEn,
              TotalsectionThreeItemsDate2En,
            },
            sectionFour: {
              sectionFourLabelsEn,
              sectionFourNotesEn,
              sectionFourItemsEn,
              sectionFourItemsDate2En,
              sectionFourTotalLabel,
              TotalsectionFourItemsEn,
              TotalsectionFourItemsDate2En,
            },

            //new setion 12/6/25
            sectionFourSub: {
              sectionFourSubFirstLabelEn,
              sectionFourSubLabelsEn,
              sectionFourSubNotesEn,
              sectionFourSubItemsEn,
              sectionFourSubItemsDate2En,
              sectionFourSubTotalLabel,
              TotalsectionFourSubItemsEn,
              TotalsectionFourSubItemsDate2En,
            },



            sectionAttributeOne: {
              sectionFourAttribute,
              sectionFourAttributeLabelsEn,
              sectionFourAttributeItemsEn,
              sectionFourAttributeItemsDate2En,
              TotalsectionFourAttributeItemsEn,
              TotalsectionFourAttributeItemsDate2En,
            },

            sectionOtherComprehensiveIncome: {
              sectionFourOtherComprehensiveIncome,
              sectionFourOtherComprehensiveIncomeSubheading,
              sectionFourOtherComprehensiveIncomeSubheadingLabelsEn,
              sectionFourOtherComprehensiveIncomeSubheadingNotesEn,
              sectionFourOtherComprehensiveIncomeSubheadingItemsEn,
              sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En,
              sectionFourOtherTotalComprehensiveIncome,
              TotalsectionFourOtherComprehensiveIncomeSubheadingItemsEn,
              TotalsectionFourOtherComprehensiveIncomeSubheadingItemsDate2En,
            },
            sectionAttributeTwo: {
              sectionFourAttribute2,
              sectionFourAttribute2LabelsEn,
              sectionFourAttribute2ItemsEn,
              sectionFourAttribute2ItemsDate2En,
              TotalsectionFourAttribute2ItemsEn,
              TotalsectionFourAttribute2ItemsDate2En,
            },

            sectionFive: {
              sectionFiveLabelsEn,
              sectionFiveNotesEn,
              sectionFiveItemsEn,
              sectionFiveItemsDate2En,
              sectionFiveTotalLabel,
              TotalsectionFiveItemsEn,
              TotalsectionFiveItemsDate2En,
            },
            sectionSix: {
              sectionSixLabelsEn,
              sectionSixNotesEn,
              sectionSixItemsEn,
              sectionSixItemsDate2En,
              sectionSixTotalLabel,
              TotalsectionSixItemsEn,
              TotalsectionSixItemsDate2En,
            },
          };

          await dispatch(SetCashFlowDataEnglishAction(formData));
        } catch (error) {
          console.log("Dispatch Error:", error);
        }
      };

      handleDispatch();
    }, [
      data1En,
      data2En,
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
      sectionFiveLabelsEn,
      sectionFiveNotesEn,
      sectionFiveItemsEn,
      sectionFiveItemsDate2En,
      sectionFiveTotalLabel,
      TotalsectionFiveItemsEn,
      TotalsectionFiveItemsDate2En,
      sectionSixLabelsEn,
      sectionSixNotesEn,
      sectionSixItemsEn,
      sectionSixItemsDate2En,
      sectionSixTotalLabel,
      TotalsectionSixItemsEn,
      TotalsectionSixItemsDate2En,
      sectionFourAttribute,
      sectionFourAttributeLabelsEn,
      sectionFourAttributeItemsEn,
      sectionFourAttributeItemsDate2En,
      TotalsectionFourAttributeItemsEn,
      TotalsectionFourAttributeItemsDate2En,
      sectionFourOtherComprehensiveIncome,
      sectionFourOtherComprehensiveIncomeSubheading,
      sectionFourOtherComprehensiveIncomeSubheadingLabelsEn,
      sectionFourOtherComprehensiveIncomeSubheadingNotesEn,
      sectionFourOtherComprehensiveIncomeSubheadingItemsEn,
      sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En,
      sectionFourOtherTotalComprehensiveIncome,
      TotalsectionFourOtherComprehensiveIncomeSubheadingItemsEn,
      TotalsectionFourOtherComprehensiveIncomeSubheadingItemsDate2En,
      sectionFourAttribute2,
      sectionFourAttribute2LabelsEn,
      sectionFourAttribute2ItemsEn,
      sectionFourAttribute2ItemsDate2En,
      TotalsectionFourAttribute2ItemsEn,
      TotalsectionFourAttribute2ItemsDate2En,
    ]);

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

            <tr className="bg-gray-200 font-semibold  ">
              <td className="">
                <input
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
            <tr className="bg-gray-200 font-semibold  text-[9px] ">
              <td className="">
                <input
                  value={sectionFourOtherComprehensiveIncomeSubheading}
                  onChange={(e) =>
                    setSectionFourOtherComprehensiveIncomeSubheadingLabel(
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

            <tr className="bg-gray-200 font-semibold  ">
              <td className="">
                <input
                  value={sectionFourOtherTotalComprehensiveIncome}
                  onChange={(e) =>
                    setSectionFourOtherToatalComprehensiveIncomeLabel(
                      e.target.value
                    )
                  }
                  className="w-full     bg-gray-200 text-black px-1 "
                />
              </td>
              <td className=" "></td>
              <td className="p-2  ">
                {formatWithParentheses(
                  TotalsectionFourOtherComprehensiveIncomeSubheadingItemsEn
                )}
              </td>
              <td className="">
                {formatWithParentheses(
                  TotalsectionFourOtherComprehensiveIncomeSubheadingItemsDate2En
                )}
              </td>
            </tr>

            <br />
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




 <tr className="bg-gray-200 font-semibold">
              <td className="">
                <input
                  value={sectionFourAfterAttribute2Label}
                  onChange={(e) =>
                    setSectionFourAfterAttribute2Label(e.target.value)
                  }
                  className="w-full  bg-gray-200 text-black p-1"
                />
              </td>
              <td className=""></td>
              <td className=""></td>
              <td className=""></td>
            </tr>

{/* <h1>saleel</h1> */}
{sectionFourAfterAttribute2LabelsEn.map((val, idx) => {
  const isRowEmpty =
    !val && !sectionFourAfterAttribute2ItemsDate2En[idx];
  if (TakingShort && isRowEmpty) return null;

  return (
    <tr key={`section-four-after-${idx}`} className="bg-gray-100">
      {/* Label */}
      <td className="border border-gray-300">
        <input
          className="w-full h-7 bg-gray-100 text-black p-1"
          value={sectionFourAfterAttribute2LabelsEn[idx]}
          placeholder={`${idx + 1}`}
          onChange={(e) =>
            handleChangeAfterAttribute2(idx, e.target.value, "sectionFourAfterAttribute2", "label")
          }
        />
      </td>

      {/* Note */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionFourAfterAttribute2NotesEn[idx]}
          onChange={(e) =>
            handleChangeAfterAttribute2(idx, e.target.value, "sectionFourAfterAttribute2", "note")
          }
        />
      </td>

      {/* Item */}
      <td className="border border-gray-300">
        <input
          className="w-full bg-gray-100 text-black p-1"
          value={sectionFourAfterAttribute2ItemsEn[idx]}
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
              handleChangeAfterAttribute2(idx, newVal, "sectionFourAfterAttribute2", "item");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChangeAfterAttribute2(idx, "-", "sectionFourAfterAttribute2", "item");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChangeAfterAttribute2(idx, "-", "sectionFourAfterAttribute2", "item");
              return;
            }

            if (rawValue === "") {
              handleChangeAfterAttribute2(idx, "", "sectionFourAfterAttribute2", "item");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(Number(rawValue));
            const finalValue = isNegative ? `(${formatted})` : formatted;

            handleChangeAfterAttribute2(idx, finalValue, "sectionFourAfterAttribute2", "item");

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
          value={sectionFourAfterAttribute2ItemsDate2En[idx]}
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
              handleChangeAfterAttribute2(idx, newVal, "sectionFourAfterAttribute2", "date2");
            }
          }}
          onChange={(e) => {
            const input = e.target;
            const inputValue = input.value;
            const caretPos = input.selectionStart ?? 0;

            if (inputValue === "-") {
              handleChangeAfterAttribute2(idx, "-", "sectionFourAfterAttribute2", "date2");
              return;
            }

            let rawValue = inputValue.replace(/[(),\s]/g, "");
            const isNegative =
              inputValue.startsWith("-") || inputValue.startsWith("(");
            rawValue = rawValue.replace(/^-/, "");

            if (!/^\d*$/.test(rawValue)) return;
            rawValue = rawValue.replace(/^0+(?=\d)/, "");

            if (rawValue === "0") {
              handleChangeAfterAttribute2(idx, "-", "sectionFourAfterAttribute2", "date2");
              return;
            }

            if (rawValue === "") {
              handleChangeAfterAttribute2(idx, "", "sectionFourAfterAttribute2", "date2");
              return;
            }

            const formatted = new Intl.NumberFormat("en-US").format(Number(rawValue));
            const finalValue = isNegative ? `(${formatted})` : formatted;

            handleChangeAfterAttribute2(idx, finalValue, "sectionFourAfterAttribute2", "date2");

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











































       <div className="hidden">



            {sectionFiveLabelsEn.map((val, idx) => {
              const isRowEmpty = !val && !sectionFiveItemsDate2En[idx];
              // 🧠 Only hide the row *after* submission if it's empty
              if (TakingShort && isRowEmpty) return null;

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
              <td className=" w-full">
                {" "}
                <input
                  placeholder=""
                  value={sectionFiveTotalLabel}
                  onChange={(e) => setSectionFiveTotalLabel(e.target.value)}
                  className=" text-start p-0.5 w-full bg-gray-200 fext-row"
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



           


          

            {sectionSixLabelsEn.map((val, idx) => {
              const isRowEmpty = !val && !sectionSixItemsDate2En[idx];
              // 🧠 Only hide the row *after* submission if it's empty
              if (TakingShort && isRowEmpty) return null;

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
 
  </div>






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
                  value={dataTwo1En ? dataTwo1En.toISOString().split("T")[0] : ""}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    setDateTwo1En(selectedDate ? new Date(selectedDate) : null);
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
                  value={dataTwo2En ? dataTwo2En.toISOString().split("T")[0] : ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setDateTwo2En(value ? new Date(value) : null);
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

        <tr className="bg-gray-200 font-semibold">
              <td className=" p-1">
                <input
                  value={sectionSevenLastLabel}
                  onChange={(e) =>
                    setSectionSevenLastLabel(
                      e.target.value
                    )
                  }
                  className="w-full  bg-gray-200 text-black  "
                />
              </td>
              <td className=" "></td>
              <td className="  ">
               
              </td>
              <td className="">
               
              </td>

            </tr>
               <tr className="bg-gray-200 font-semibold  text-[9px] ">
              <td className="">
                <input
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


     <tr className="bg-gray-100 font-semibold">
              <td className="bg-white"></td>
              <td></td>
              <td className="p-2">
                {formatWithParentheses(TotalSectionLastLabelItemsEn)}
              </td>
              <td>
                {formatWithParentheses(TotalSectionLastItemsDate2En)}
              </td>
            </tr>
            <br />




            
               <tr className="bg-gray-200 font-semibold  text-[9px] ">
              <td className="">
                <input
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



<tr className="bg-gray-100 font-semibold">
              <td className="bg-white"></td>
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
      <tr className="bg-gray-400 font-semibold">
              <td className="">
                <input
                  value={SectionSevenLastLabel2}
                  onChange={(e) =>
                    setSectionSevenLastLabel2(
                      e.target.value
                    )
                  }
                  className="w-full     bg-gray-400 text-black px-1 "
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










          </tbody>

        </table>
      </div>
    );
  }
);

export default CashFlowFormEn;
