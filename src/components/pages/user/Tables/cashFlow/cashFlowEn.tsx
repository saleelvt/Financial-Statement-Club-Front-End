/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

type CashFlowArProps = {
  Tabledata: any; // You can replace `any` with an actual type later
};

const CashFlowUserEnglish: React.FC<CashFlowArProps> = React.memo(
  ({ Tabledata }) => {
    const [table, setTable] = useState<any>(null);

    useEffect(() => {

          console.log("my cashFlow on for show the data  English: ",Tabledata);
        
      setTable(Tabledata);
    }, [Tabledata]);

    console.log("The table data from props:", Tabledata);

    const formatValue = (v: string | number) => {
      const num = Number(String(v).replace(/[(),\s]/g, ""));
      if (isNaN(num)) return "-";
      if (num === 0) return "-";
      if (v.toString().startsWith("-") || v.toString().startsWith("(")) {
        return `(${new Intl.NumberFormat("en-US").format(Math.abs(num))})`;
      }
      return new Intl.NumberFormat("en-US").format(num);
    };

    return (
      <> 
        {table ? (
          <div className="flex justify-start  mb-4   text-black">
            <table className="border font-semibold border-gray-300 text-xs   w-full ">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-100 w-96"></th>
                  <th className="border border-gray-100 w-16">Notes</th>

                  {/* Date 1 Display */}
                  <th className="border  border-gray-100 p-1 w-28">
                    <div className="bg-gray-100 w-26  flex justify-center text-center font-bold">
                      {table.date1En
                        ? new Date(table.date1En).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : "-"}
                    </div>
                    <div className="w-full text-center bg-gray-100">
                      {"(Unaudited)"}
                    </div>
                    <div
                      dir="ltr"
                      className="flex items-center justify-center bg-gray-100 w-full rounded"
                    >
                      <img
                        src="https://res.cloudinary.com/dllmjze4p/image/upload/fl_preserve_transparency/v1746013121/riyal_uxhuwz.jpg?_s=public-apps"
                        alt="Riyal"
                        className="w-3 h-3"
                      />
                      <span className="w-8 text-center bg-gray-100 block">
                        {"'000"}
                      </span>
                    </div>
                  </th>

                  {/* Date 2 Display */}
                  <th className="border border-gray-100 p-1 w-28">
                    <div className="bg-gray-100 w-26 text-center font-bold">
                      {table.date2En
                        ? new Date(table.date2En).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : "-"}
                    </div>
                    <div className="w-full text-center bg-gray-100">
                      {"(Audited)"}
                    </div>
                    <div
                      dir="ltr"
                      className="flex items-center justify-center bg-gray-100 w-full rounded"
                    >
                      <img
                        src="https://res.cloudinary.com/dllmjze4p/image/upload/fl_preserve_transparency/v1746013121/riyal_uxhuwz.jpg?_s=public-apps"
                        alt="Riyal"
                        className="w-3 h-3"
                      />
                      <span className="w-8 text-center bg-gray-100 block">
                        {"'000"}
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
            
                {table.sectionOne.sectionOneLabelsEn.map(
                  (label: string, idx: number) => {
                    const note = table.sectionOne.sectionOneNotesEn[idx];
                    const item = table.sectionOne.sectionOneItemsEn[idx];
                    const itemDate2 = table.sectionOne.sectionOneItemsDate2En[idx];

                    const allEmpty =
                      (!label || label.trim() === "") &&
                      (!note || note.trim() === "") &&
                      (!item || item.toString().trim() === "") &&
                      (!itemDate2 || itemDate2.toString().trim() === "");

                    if (allEmpty) return null; // Skip this row entirely

                    return (
                      <tr
                        key={`non-current-${idx}`}
                        className="bg-white hover:bg-gray-50"
                      >
                        <td className="border border-gray-300 p-1">
                          {label || "-"}
                        </td>
                        <td className="border text-center  border-gray-300 p-1">
                          {note || ""}
                        </td>
                        <td className="border text-right border-gray-300 p-1">
                          {item ? formatValue(item) : "-"}
                        </td>
                        <td className="border text-right border-gray-300 p-1">
                          {itemDate2 ? formatValue(itemDate2) : "-"}
                        </td>
                      </tr>
                    );
                  }
                )}

                {table.sectionOne.sectionOneTotalLabel &&
                  table.sectionOne.sectionOneTotalLabel.trim() !==
                    "" && (
                    <tr className="bg-gray-200 px-1   font-semibold">
                      <td className="">
                        {table.sectionOne.sectionOneTotalLabel}
                      </td>
                      <td className="border   border-gray-300"></td>
                      <td className="border  px-1 text-right  border-gray-300">
                        {formatValue(table.sectionOne.TotalsectionOneItemsEn)}
                      </td>
                      <td className="border  px-1  text-right border-gray-300">
                        {formatValue(table.sectionOne.TotalsectionOneItemsDate2En)}
                      </td>
                    </tr>
                  )}





              

               

                {table.sectionTwo.sectionTwoLabelsEn.map(
                  (label: string, idx: number) => {
                    const note = table.sectionTwo.sectionTwoNotesEn[idx];
                    const item = table.sectionTwo.sectionTwoItemsEn[idx];
                    const itemDate2 = table.sectionTwo.sectionTwoItemsDate2En[idx];

                    const allEmpty =
                      (!label || label.trim() === "") &&
                      (!note || note.trim() === "") &&
                      (!item || item.toString().trim() === "") &&
                      (!itemDate2 || itemDate2.toString().trim() === "");

                    if (allEmpty) return null; // Skip this row entirely

                    return (
                      <tr
                        key={`non-current-${idx}`}
                        className="bg-white hover:bg-gray-50"
                      >
                        <td className="border border-gray-300 p-1">
                          {label || "-"}
                        </td>
                        <td className="border  text-center border-gray-300 p-1">
                          {note || ""}
                        </td>
                        <td className="border  text-right border-gray-300 p-1">
                          {item ? formatValue(item) : "-"}
                        </td>
                        <td className="border  text-right border-gray-300 p-1">
                          {itemDate2 ? formatValue(itemDate2) : "-"}
                        </td>
                      </tr>
                    );
                  }
                )}

                {table.sectionTwo.sectionTwoTotalLabel&&
                  table.sectionTwo.sectionTwoTotalLabel.trim() !==
                    "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className="px-1">
                        {table.sectionTwo.sectionTwoTotalLabel}
                      </td>
                      <td className="border border-gray-300"></td>
                      <td className="border   px-1  text-right border-gray-300">
                        {formatValue(table.sectionTwo.TotalsectionTwoItemsEn)}
                      </td>
                      <td className="border  px-1   text-right border-gray-300">
                        {formatValue(table.sectionTwo.TotalsectionTwoItemsDate2En)}
                      </td>
                    </tr>
                  )}



              

              

         {/* {Array.isArray(table.sectionThree?.sectionThreeLabelsEn) &&
 Array.isArray(table.sectionThree?.sectionThreeItemsNotes) &&
 Array.isArray(table.sectionThree?.sectionThreeItemsEn) &&
 Array.isArray(table.sectionThree?.sectionThreeItemsDate2En) &&
 table.sectionThree.sectionThreeLabelsEn.map((label: string, idx: number) => {
    const note = table.sectionThree.sectionThreeItemsNotes[idx];
    const item = table.sectionThree.sectionThreeItemsEn[idx];
    const itemDate2 = table.sectionThree.sectionThreeItemsDate2En[idx];

    const allEmpty =
      (!label || label.trim() === "") &&
      (!note || note.trim() === "") &&
      (!item || item.toString().trim() === "") &&
      (!itemDate2 || itemDate2.toString().trim() === "");
    if (allEmpty) return null;

    return (
      <tr key={`non-current-${idx}`} className="bg-white hover:bg-gray-50">
        <td className="border border-gray-300 p-1">{label || "-"}</td>
        <td className="border text-center border-gray-300 p-1">
          {note || ""}
        </td>
        <td className="border text-right border-gray-300 p-1">
          {item ? formatValue(item) : "-"}
        </td>
        <td className="border text-right border-gray-300 p-1">
          {itemDate2 ? formatValue(itemDate2) : "-"}
        </td>
      </tr>
    );
})} */}

   {table.sectionThree.sectionThreeLabelsEn.map(
                  (label: string, idx: number) => {
                    const note = table.sectionThree.sectionThreeNotesEn[idx];
                    const item = table.sectionThree.sectionThreeItemsEn[idx];
                    const itemDate2 = table.sectionThree.sectionThreeItemsDate2En[idx];

                    const allEmpty =
                      (!label || label.trim() === "") &&
                      (!note || note.trim() === "") &&
                      (!item || item.toString().trim() === "") &&
                      (!itemDate2 || itemDate2.toString().trim() === "");

                    if (allEmpty) return null; // Skip this row entirely

                    return (
                      <tr
                        key={`non-current-${idx}`}
                        className="bg-white hover:bg-gray-50"
                      >
                        <td className="border border-gray-300 p-1">
                          {label || "-"}
                        </td>
                        <td className="border  text-center border-gray-300 p-1">
                          {note || ""}
                        </td>
                        <td className="border  text-right border-gray-300 p-1">
                          {item ? formatValue(item) : "-"}
                        </td>
                        <td className="border  text-right border-gray-300 p-1">
                          {itemDate2 ? formatValue(itemDate2) : "-"}
                        </td>
                      </tr>
                    );
                  }
                )}


                
                {table.sectionThree.sectionThreeTotalLabel &&
                  table.sectionThree.sectionThreeTotalLabel.trim() !== "" && (
                    <tr className="bg-gray-300 border-gray-300 font-bold">
                      <td className=" p-1">
                        {table.sectionThree.sectionThreeTotalLabel} saleel
                      </td>
                      <td className="border border-gray-300"></td>
                      <td className="border  px-1   text-right border-gray-300">
                        {formatValue(table.sectionThree.TotalsectionThreeItemsEn)}
                      </td>
                      <td className="border   px-1   text-right border-gray-300">
                        {formatValue(table.sectionThree.TotalsectionThreeItemsDate2En)}
                      </td>
                    </tr>
                  )}
          



             
                {table.sectionFour.sectionFourLabelsEn.map(
                  (label: string, idx: number) => {
                    const note = table.sectionFour.sectionFourNotesEn[idx];
                    const item = table.sectionFour.sectionFourItemsEn[idx];
                    const itemDate2 = table.sectionFour.sectionFourItemsDate2En[idx];

                    const allEmpty =
                      (!label || label.trim() === "") &&
                      (!note || note.trim() === "") &&
                      (!item || item.toString().trim() === "") &&
                      (!itemDate2 || itemDate2.toString().trim() === "");
                    if (allEmpty) return null; // Skip this row entirely

                    return (
                      <tr
                        key={`non-current-${idx}`}
                        className="bg-white hover:bg-gray-50"
                      >
                        <td className="border border-gray-300 p-1">
                          {label || "-"}
                        </td>
                        <td className="border  text-center border-gray-300 p-1">
                          {note || ""}
                        </td>
                        <td className="border  text-right border-gray-300 p-1">
                          {item ? formatValue(item) : "-"}
                        </td>
                        <td className="border  text-right border-gray-300 p-1">
                          {itemDate2 ? formatValue(itemDate2) : "-"}
                        </td>
                      </tr>
                    );
                  }
                )}
            

                {table.sectionFour.sectionFourTotalLabel&&
                 table.sectionFour.sectionFourTotalLabel.trim() !==
                    "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className="p-1">
                        {
                         table.sectionFour.sectionFourTotalLabel
                        }
                      </td>
                      <td className="border border-gray-300"></td>
                      <td className="border   px-1  text-right border-gray-300">
                        {formatValue(table.sectionFour.TotalsectionFourItemsEn)}
                      </td>
                      <td className="border   px-1  text-right border-gray-300">
                        {formatValue(
                          table.sectionFour.TotalsectionFourItemsDate2En
                        )}
                      </td>
                    </tr>
                  )}



                      <br />
                <br />
                {table.sectionFourAttributeOne.sectionFourAttribute&&
                 table.sectionFourAttributeOne.sectionFourAttribute.trim() !==
                    "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className="p-1">
                        {
                         table.sectionFourAttributeOne.sectionFourAttribute
                        }
                      </td>
                      <td className=" border-gray-300"></td>
                      <td className="   px-1  text-right border-gray-300">
                      
                      </td>
                      <td className="   px-1  text-right border-gray-300">
                        
                      </td>
                    </tr>
                  )}



    {table.sectionFourAttributeOne.sectionFourAttributeLabelsEn.map(
                  (label: string, idx: number) => {
       
                    const item = table.sectionFourAttributeOne.sectionFourAttributeItemsEn[idx];
                    const itemDate2 = table.sectionFourAttributeOne.sectionFourAttributeItemsDate2En[idx];

                    const allEmpty =
                      (!label || label.trim() === "") &&
               
                      (!item || item.toString().trim() === "") &&
                      (!itemDate2 || itemDate2.toString().trim() === "");
                    if (allEmpty) return null; // Skip this row entirely

                    return (
                      <tr
                        key={`non-current-${idx}`}
                        className="bg-white hover:bg-gray-50"
                      >
                        <td className="border border-gray-300 p-1">
                          {label || "-"}
                        </td>
                        <td className="border  text-center border-gray-300 p-1">
                  
                        </td>
                        <td className="border  text-right border-gray-300 p-1">
                          {item ? formatValue(item) : "-"}
                        </td>
                        <td className="border  text-right border-gray-300 p-1">
                          {itemDate2 ? formatValue(itemDate2) : "-"}
                        </td>
                      </tr>
                    );
                  }
                )}
                <br />

    



{(table.sectionFourAttributeOne.TotalsectionFourAttributeItemsEn ||
  table.sectionFourAttributeOne.TotalsectionFourAttributeItemsDate2En) && (
  <tr className="bg-gray-100 font-semibold">
    <td className="bg-white"></td>
    <td className=""></td>
    <td className="p-2">
      {table.sectionFourAttributeOne.TotalsectionFourAttributeItemsEn
        ? formatValue(table.sectionFourAttributeOne.TotalsectionFourAttributeItemsEn)
        : "-"}
    </td>
    <td className="">
      {table.sectionFourAttributeOne.TotalsectionFourAttributeItemsDate2En
        ? formatValue(table.sectionFourAttributeOne.TotalsectionFourAttributeItemsDate2En)
        : "-"}
    </td>
  </tr>
)}


<br />




 {table.sectionOtherComprehensiveIncome.sectionFourOtherComprehensiveIncome&&
                 table.sectionOtherComprehensiveIncome.sectionFourOtherComprehensiveIncome.trim() !==
                    "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className=" w-full   bg-gray-200 text-black px-1 ">
                        {
                         table.sectionOtherComprehensiveIncome.sectionFourOtherComprehensiveIncome
                        }
                      </td>
                      <td className=" border-gray-300"></td>
                      <td className="   px-1  text-right border-gray-300">
                      
                      </td>
                      <td className="   px-1  text-right border-gray-300">
                        
                      </td>
                    </tr>
                  )}




             {table.sectionOtherComprehensiveIncome.sectionFourOtherComprehensiveIncomeSubheading&&
                 table.sectionOtherComprehensiveIncome.sectionFourOtherComprehensiveIncomeSubheading.trim() !==
                    "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className=" w-full  px-1  text-[9px]   bg-gray-200 text-black  ">
                        {
                         table.sectionOtherComprehensiveIncome.sectionFourOtherComprehensiveIncomeSubheading
                        }
                      </td>
                      <td className=" border-gray-300"></td>
                      <td className="   px-1  text-right border-gray-300">
                      
                      </td>
                      <td className="   px-1  text-right border-gray-300">
                        
                      </td>
                    </tr>
                  )}


                               {table.sectionOtherComprehensiveIncome.sectionFourOtherComprehensiveIncomeSubheadingLabelsEn.map(
                  (label: string, idx: number) => {
                    const note = table.sectionOtherComprehensiveIncome.sectionFourOtherComprehensiveIncomeSubheadingNotesEn[idx];
                    const item = table.sectionOtherComprehensiveIncome.sectionFourOtherComprehensiveIncomeSubheadingItemsEn[idx];
                    const itemDate2 = table.sectionOtherComprehensiveIncome.sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En[idx];

                    const allEmpty =
                      (!label || label.trim() === "") &&
                      (!note || note.trim() === "") &&
                      (!item || item.toString().trim() === "") &&
                      (!itemDate2 || itemDate2.toString().trim() === "");
                    if (allEmpty) return null; // Skip this row entirely

                    return (
                      <tr
                        key={`non-current-${idx}`}
                        className="bg-white hover:bg-gray-50"
                      >
                        <td className="border border-gray-300 p-1">
                          {label || "-"}
                        </td>
                        <td className="border  text-center border-gray-300 p-1">
                          {note || ""}
                        </td>
                        <td className="border  text-right border-gray-300 p-1">
                          {item ? formatValue(item) : "-"}
                        </td>
                        <td className="border  text-right border-gray-300 p-1">
                          {itemDate2 ? formatValue(itemDate2) : "-"}
                        </td>
                      </tr>
                    );
                  }
                )}






                {table.sectionOtherComprehensiveIncome.sectionFourOtherTotalComprehensiveIncome&&
                 table.sectionOtherComprehensiveIncome.sectionFourOtherTotalComprehensiveIncome.trim() !==
                    "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className="p-1">
                        {
                         table.sectionOtherComprehensiveIncome.sectionFourOtherTotalComprehensiveIncome
                        }
                      </td>
                      <td className="border border-gray-300"></td>
                      <td className="border   px-1  text-right border-gray-300">
                        {formatValue(table.sectionOtherComprehensiveIncome.TotalsectionFourOtherComprehensiveIncomeSubheadingItemsEn)}
                      </td>
                      <td className="border   px-1  text-right border-gray-300">
                        {formatValue(
                          table.sectionOtherComprehensiveIncome.TotalsectionFourOtherComprehensiveIncomeSubheadingItemsDate2En
                        )}
                      </td>
                    </tr>
                  )}


<br />



             <br />
                <br />
                {table.sectionAttributeTwo.sectionFourAttribute2&&
                 table.sectionAttributeTwo.sectionFourAttribute2.trim() !==
                    "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className="p-1">
                        {
                         table.sectionAttributeTwo.sectionFourAttribute2
                        }
                      </td>
                      <td className=" border-gray-300"></td>
                      <td className="   px-1  text-right border-gray-300">
                      
                      </td>
                      <td className="   px-1  text-right border-gray-300">
                        
                      </td>
                    </tr>
                  )}



    {table.sectionAttributeTwo.sectionFourAttribute2LabelsEn.map(
                  (label: string, idx: number) => {
       
                    const item = table.sectionAttributeTwo.sectionFourAttribute2ItemsEn[idx];
                    const itemDate2 = table.sectionAttributeTwo.sectionFourAttribute2ItemsDate2En[idx];

                    const allEmpty =
                      (!label || label.trim() === "") &&
               
                      (!item || item.toString().trim() === "") &&
                      (!itemDate2 || itemDate2.toString().trim() === "");
                    if (allEmpty) return null; // Skip this row entirely

                    return (
                      <tr
                        key={`non-current-${idx}`}
                        className="bg-white hover:bg-gray-50"
                      >
                        <td className="border border-gray-300 p-1">
                          {label || "-"}
                        </td>
                        <td className="border  text-center border-gray-300 p-1">
                  
                        </td>
                        <td className="border  text-right border-gray-300 p-1">
                          {item ? formatValue(item) : "-"}
                        </td>
                        <td className="border  text-right border-gray-300 p-1">
                          {itemDate2 ? formatValue(itemDate2) : "-"}
                        </td>
                      </tr>
                    );
                  }
                )}
                <br />

    



{(table.sectionAttributeTwo.TotalsectionFourAttribute2ItemsEn ||
  table.sectionAttributeTwo.TotalsectionFourAttribute2ItemsDate2En) && (
  <tr className="bg-gray-100 font-semibold">
    <td className="bg-white"></td>
    <td className=""></td>
    <td className="p-2">
      {table.sectionAttributeTwo.TotalsectionFourAttribute2ItemsEn
        ? formatValue(table.sectionAttributeTwo.TotalsectionFourAttribute2ItemsEn)
        : "-"}
    </td>
    <td className="">
      {table.sectionAttributeTwo.TotalsectionFourAttribute2ItemsDate2En
        ? formatValue(table.sectionAttributeTwo.TotalsectionFourAttribute2ItemsDate2En)
        : "-"}
    </td>
  </tr>
)}


<br />
                {table.sectionFive.sectionFiveLabelsEn.map(
                  (label: string, idx: number) => {
                    const note =
                      table.sectionFive.sectionFiveNotesEn[idx];
                    const item = table.sectionFive.sectionFiveItemsEn[idx];
                    const itemDate2 = table.sectionFive.sectionFiveItemsDate2En[idx];

                    const allEmpty =
                      (!label || label.trim() === "") &&
                      (!note || note.trim() === "") &&
                      (!item || item.toString().trim() === "") &&
                      (!itemDate2 || itemDate2.toString().trim() === "");

                    if (allEmpty) return null; // Skip this row entirely

                    return (
                      <tr
                        key={`non-current-${idx}`}
                        className="bg-white hover:bg-gray-50"
                      >
                        <td className="border border-gray-300 p-1">
                          {label || "-"}
                        </td>
                        <td className="border  text-center border-gray-300 p-1">
                          {note || ""}
                        </td>
                        <td className="border  text-right border-gray-300 p-1">
                          {item ? formatValue(item) : "-"}
                        </td>
                        <td className="border  text-right border-gray-300 p-1">
                          {itemDate2 ? formatValue(itemDate2) : "-"}
                        </td>
                      </tr>
                    );
                  }
                )}

                {table.sectionFive.sectionFiveTotalLabel &&
                  table.sectionFive.sectionFiveTotalLabel.trim() !==
                    "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className="p-1">
                        {
                          table.sectionFive.sectionFiveTotalLabel
                        }
                      </td>
                      <td className="border border-gray-300"></td>
                      <td className="border  px-1   text-right border-gray-300">
                        {formatValue(table.sectionFive.TotalsectionFiveItemsEn)}
                      </td>
                      <td className="border  px-1   text-right border-gray-300">
                        {formatValue(table.sectionFive.TotalsectionFiveItemsDate2En)}
                      </td>
                    </tr>
                  )}



                {table.sectionSix.sectionSixLabelsEn.map(
                  (label: string, idx: number) => {
                    const note =
                      table.sectionSix.sectionSixNotesEn[idx];
                    const item = table.sectionSix.sectionSixItemsEn[idx];
                    const itemDate2 = table.sectionSix.sectionSixItemsDate2En[idx];

                    const allEmpty =
                      (!label || label.trim() === "") &&
                      (!note || note.trim() === "") &&
                      (!item || item.toString().trim() === "") &&
                      (!itemDate2 || itemDate2.toString().trim() === "");

                    if (allEmpty) return null; // Skip this row entirely

                    return (
                      <tr
                        key={`non-current-${idx}`}
                        className="bg-white hover:bg-gray-50"
                      >
                        <td className="border border-gray-300 p-1">
                          {label || "-"}
                        </td>
                        <td className="border  text-center border-gray-300 p-1">
                          {note || ""}
                        </td>
                        <td className="border  text-right border-gray-300 p-1">
                          {item ? formatValue(item) : "-"}
                        </td>
                        <td className="border  text-right border-gray-300 p-1">
                          {itemDate2 ? formatValue(itemDate2) : "-"}
                        </td>
                      </tr>
                    );
                  }
                )}

                {table.sectionSix.sectionSixTotalLabel &&
                  table.sectionSix.sectionSixTotalLabel.trim() !==
                    "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className="p-1">
                        {
                          table.sectionSix.sectionSixTotalLabel
                        }
                      </td>
                      <td className="border border-gray-300"></td>
                      <td className="border  px-1   text-right border-gray-300">
                        {formatValue(table.sectionSix.TotalsectionSixItemsEn)}
                      </td>
                      <td className="border  px-1   text-right border-gray-300">
                        {formatValue(table.sectionSix.TotalsectionSixItemsDate2En)}
                      </td>
                    </tr>
                  )}

               

               

              
              </tbody>
            </table>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </>
    );
  }
);

export default CashFlowUserEnglish;
