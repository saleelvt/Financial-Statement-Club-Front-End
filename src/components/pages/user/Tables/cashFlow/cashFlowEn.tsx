/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

type CashFlowArProps = {
  Tabledata: any; // You can replace `any` with an actual type later
};

const CashFlowUserEnglish: React.FC<CashFlowArProps> = React.memo(
  ({ Tabledata }) => {
    const [table, setTable] = useState<any>(null);

    useEffect(() => {
      console.log("my cashFlow on for show the data  English: ", Tabledata);

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




















                {table.sectionOne.sectionOneFirstLabelEn &&
                  table.sectionOne.sectionOneFirstLabelEn.trim() !== "" && (
                    <tr className="bg-gray-300 px-1   font-semibold">
                      <td className="">
                        {table.sectionOne.sectionOneFirstLabelEn}
                      </td>
                      <td className="  "></td>
                      <td className="  px-1 text-right  "></td>
                      <td className="  px-1  text-right "></td>
                    </tr>
                  )}
                {table.sectionOne.sectionOneSecondLabelEn &&
                  table.sectionOne.sectionOneSecondLabelEn.trim() !== "" && (
                    <tr className="bg-gray-200 px-1   font-semibold">
                      <td className="">
                        {table.sectionOne.sectionOneSecondLabelEn}
                      </td>
                      <td className="  "></td>
                      <td className="  px-1 text-right  "></td>
                      <td className="  px-1  text-right "></td>
                    </tr>
                  )}

                {table.sectionOne.sectionOneLabelsEn.map(
                  (label: string, idx: number) => {
                    const note = table.sectionOne.sectionOneNotesEn[idx];
                    const item = table.sectionOne.sectionOneItemsEn[idx];
                    const itemDate2 =table.sectionOne.sectionOneItemsDate2En[idx];

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


                    {table.sectionTwo.sectionTwoFirstLabel &&
                  table.sectionTwo.sectionTwoFirstLabel.trim() !== "" && (
                    <tr className="bg-gray-200 px-1   font-semibold">
                      <td className="">
                        {table.sectionTwo.sectionTwoFirstLabel}
                      </td>
                      <td className="  "></td>
                      <td className="  px-1 text-right  "></td>
                      <td className="  px-1  text-right "></td>
                    </tr>
                  )}

                {table.sectionTwo.sectionTwoLabelsEn.map(
                  (label: string, idx: number) => {
                    const note = table.sectionTwo.sectionTwoNotesEn[idx];
                    const item = table.sectionTwo.sectionTwoItemsEn[idx];
                    const itemDate2 =
                      table.sectionTwo.sectionTwoItemsDate2En[idx];

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
                {table.sectionTwo.sectionTwoTotalLabel &&
                  table.sectionTwo.sectionTwoTotalLabel.trim() !== "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className="px-1">
                        {table.sectionTwo.sectionTwoTotalLabel}
                      </td>
                      <td className="border border-gray-300"></td>
                      <td className="border   px-1  text-right border-gray-300">
                        {formatValue(table.sectionTwo.TotalsectionTwoItemsEn)}
                      </td>
                      <td className="border  px-1   text-right border-gray-300">
                        {formatValue(
                          table.sectionTwo.TotalsectionTwoItemsDate2En
                        )}
                      </td>
                    </tr>
                  )}





  {table.sectionThree.sectionThreeFirstLabel &&
                  table.sectionThree.sectionThreeFirstLabel.trim() !== "" && (
                    <tr className="bg-gray-200 px-1   font-semibold">
                      <td className="">
                        {table.sectionThree.sectionThreeFirstLabel}
                      </td>
                      <td className="  "></td>
                      <td className="  px-1 text-right  "></td>
                      <td className="  px-1  text-right "></td>
                    </tr>
                  )}





                {table.sectionThree.sectionThreeLabelsEn.map(
                  (label: string, idx: number) => {
                    const note = table.sectionThree.sectionThreeNotesEn[idx];
                    const item = table.sectionThree.sectionThreeItemsEn[idx];
                    const itemDate2 =
                      table.sectionThree.sectionThreeItemsDate2En[idx];

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
                    <tr className="bg-gray-200 border-gray-300 font-bold">
                      <td className=" p-1">
                        {table.sectionThree.sectionThreeTotalLabel} 
                      </td>
                      <td className="border border-gray-300"></td>
                      <td className="border  px-1   text-right border-gray-300">
                        {formatValue(
                          table.sectionThree.TotalsectionThreeItemsEn
                        )}
                      </td>
                      <td className="border   px-1   text-right border-gray-300">
                        {formatValue(
                          table.sectionThree.TotalsectionThreeItemsDate2En
                        )}
                      </td>
                    </tr>
                  )}




               {table.sectionFour.sectionFourFirstLabel &&
                  table.sectionFour.sectionFourFirstLabel.trim() !== "" && (
                    <tr className="bg-gray-200 px-1   font-semibold">
                      <td className="">
                        {table.sectionFour.sectionFourFirstLabel}
                      </td>
                      <td className="  "></td>
                      <td className="  px-1 text-right  "></td>
                      <td className="  px-1  text-right "></td>
                    </tr>
                  )}


                {table.sectionFour.sectionFourLabelsEn.map(
                  (label: string, idx: number) => {
                    const note = table.sectionFour.sectionFourNotesEn[idx];
                    const item = table.sectionFour.sectionFourItemsEn[idx];
                    const itemDate2 =
                      table.sectionFour.sectionFourItemsDate2En[idx];

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

                {table.sectionFour.sectionFourTotalLabel &&
                  table.sectionFour.sectionFourTotalLabel.trim() !== "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className="p-1">
                        {table.sectionFour.sectionFourTotalLabel}
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


               {table.sectionFive.sectionFiveFirstLabel &&
                  table.sectionFive.sectionFiveFirstLabel.trim() !== "" && (
                    <tr className="bg-gray-200 px-1   font-semibold">
                      <td className="">
                        {table.sectionFive.sectionFiveFirstLabel}
                      </td>
                      <td className="  "></td>
                      <td className="  px-1 text-right  "></td>
                      <td className="  px-1  text-right "></td>
                    </tr>
                  )}


                {table.sectionFive.sectionFiveLabelsEn.map(
                  (label: string, idx: number) => {
                    const note = table.sectionFive.sectionFiveNotesEn[idx];
                    const item = table.sectionFive.sectionFiveItemsEn[idx];
                    const itemDate2 =
                      table.sectionFive.sectionFiveItemsDate2En[idx];

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
                  table.sectionFive.sectionFiveTotalLabel.trim() !== "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className="p-1">
                        {table.sectionFive.sectionFiveTotalLabel}
                      </td>
                      <td className="border border-gray-300"></td>
                      <td className="border   px-1  text-right border-gray-300">
                        {formatValue(table.sectionFive.TotalsectionFiveItemsEn)}
                      </td>
                      <td className="border   px-1  text-right border-gray-300">
                        {formatValue(
                          table.sectionFive.TotalsectionFiveItemsDate2En
                        )}
                      </td>
                    </tr>
                  )}


               {table.sectionSix.sectionSixFirstLabel &&
                  table.sectionSix.sectionSixFirstLabel.trim() !== "" && (
                    <tr className="bg-gray-200 px-1   font-semibold">
                      <td className="">
                        {table.sectionSix.sectionSixFirstLabel}
                      </td>
                      <td className="  "></td>
                      <td className="  px-1 text-right  "></td>
                      <td className="  px-1  text-right "></td>
                    </tr>
                  )}


                {table.sectionSix.sectionSixLabelsEn.map(
                  (label: string, idx: number) => {
                    const note = table.sectionSix.sectionSixNotesEn[idx];
                    const item = table.sectionSix.sectionSixItemsEn[idx];
                    const itemDate2 =
                      table.sectionSix.sectionSixItemsDate2En[idx];

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
                  table.sectionSix.sectionSixTotalLabel.trim() !== "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className="p-1">
                        {table.sectionSix.sectionSixTotalLabel}
                      </td>
                      <td className="border border-gray-300"></td>
                      <td className="border   px-1  text-right border-gray-300">
                        {formatValue(table.sectionSix.TotalsectionSixItemsEn)}
                      </td>
                      <td className="border   px-1  text-right border-gray-300">
                        {formatValue(
                          table.sectionSix.TotalsectionSixItemsDate2En
                        )}
                      </td>
                    </tr>
                  )}

                {table.sectionSix.sectionSixSecondTotalLabel &&
                  table.sectionSix.sectionSixSecondTotalLabel.trim() !== "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className="p-1">
                        {table.sectionSix.sectionSixSecondTotalLabel}
                      </td>
                      <td className="border border-gray-300"></td>
                      <td className="border   px-1  text-right border-gray-300">
                        {formatValue(table.sectionSix.TotalsectionSixSecondItemsEn)}
                      </td>
                      <td className="border   px-1  text-right border-gray-300">
                        {formatValue(
                          table.sectionSix.TotalsectionSixSecondItemsDate2En
                        )}
                      </td>
                    </tr>
                  )}

                
                    {table.sectionSeven.sectionSevenLabelsEn.map(
                  (label: string, idx: number) => { 
                    const note = table.sectionSeven.sectionSevenNotesEn[idx]; 
                    const item = table.sectionSeven.sectionSevenItemsEn[idx]; 
                    const itemDate2 = table.sectionSeven.sectionSevenItemsDate2En[idx]; 
                    const allEmpty =(!label || label.trim() === "") &&
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
              
                {table.sectionSeven.sectionSevenTotalLabel &&
                  table.sectionSeven.sectionSevenTotalLabel.trim() !== "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className="p-1">
                        {table.sectionSeven.sectionSevenTotalLabel}
                      </td>
                      <td className="border text-center border-gray-300">{table.sectionSeven.sectionSevenTotalNote}</td>
                      <td className="border   px-1  text-right border-gray-300">
                        {formatValue(table.sectionSeven.TotalsectionSevenItemsEn)}
                      </td>
                      <td className="border   px-1  text-right border-gray-300">
                        {formatValue(
                          table.sectionSeven.TotalsectionSevenItemsDate2En
                        )}
                      </td>
                    </tr>
                  )}

                {table.sectionEight.sectionEightLabelsEn.map(
                  (label: string, idx: number) => { 
                    const note = table.sectionEight.sectionEightNotesEn[idx]; 
                    const item = table.sectionEight.sectionEightItemsEn[idx]; 
                    const itemDate2 = table.sectionEight.sectionEightItemsDate2En[idx]; 
                    const allEmpty =(!label || label.trim() === "") &&
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
              
                  

              </tbody>

<br />

              <thead>
                <tr className="bg-gray-100 ">
                  <th className="border border-gray-100 w-96"></th>
                  <th className="border border-gray-100 w-16">Notes</th>

                  {/* Date 1 Display */}
                  <th className="border  border-gray-100 p-1 w-28">
                    <div className="bg-gray-100 w-26  flex justify-center text-center font-bold">
                      {table.Table2?.dateTwo1En
                        ? new Date(table.Table2?.dateTwo1En).toLocaleDateString("en-GB", {
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
                      {table.Table2?.dateTwo2En
                        ? new Date(table.Table2?.dateTwo2En).toLocaleDateString("en-GB", {
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
 
                {table?.Table2?.sectionOneTable2?.sectionNineLabelsEn.map(
                  (label: string, idx: number) => {
                    const note = table.Table2.sectionOneTable2?.sectionNineNotesEn[idx];
                    const item =table.Table2.sectionOneTable2?.sectionNineItemsEn[idx];
                    const itemDate2 = table.Table2.sectionOneTable2?.sectionNineItemsDate2En[idx];
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
