/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

type CashFlowPropsAr = {
  Tabledata: any; // You can replace `any` with an actual type later
};

const CashFlowUserArabic: React.FC<CashFlowPropsAr> = React.memo(
  ({ Tabledata }) => {
    const [table, setTable] = useState<any>(null);

    useEffect(() => {
      console.log("my cashFlow on for show the data Arabic : ", Tabledata);

      setTable(Tabledata);
    }, [Tabledata]);

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
          <div className="flex justify-start mb-4    text-black">
            <table
              dir="rtl"
              className="border font-semibold border-gray-300 text-xs w-full "
            >
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-100 w-96"></th>
                  <th className="border border-gray-100 w-16">إيضاحات</th>

                  {/* Date 1 Display */}
                  <th className="border border-gray-100 p-1 w-28">
                    <div className="bg-gray-100 w-24 text-center font-bold">
                      {table.date1Ar
                        ? new Date(table.date1Ar).toLocaleDateString("ar-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : "-"}
                    </div>
                    <div className="w-full text-center bg-gray-100">
                      {"(غير مراجعة)"}
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
                    <div className="bg-gray-100 w-24 text-center font-bold">
                      {table.date2Ar
                        ? new Date(table.date2Ar).toLocaleDateString("ar-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : "-"}
                    </div>
                    <div className="w-full text-center bg-gray-100">
                      {"(مراجعة)"}
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
                    <tr className="bg-gray-200 px-1   font-semibold">
                      <td className="">
                        {table.sectionOne.sectionOneFirstLabelEn}
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
                    const itemDate2 =
                      table.sectionOne.sectionOneItemsDate2En[idx];

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
                  table.sectionOne.sectionOneTotalLabel.trim() !== "" && (
                    <tr className="bg-gray-200 px-1   font-semibold">
                      <td className="">
                        {table.sectionOne.sectionOneTotalLabel}
                      </td>
                      <td className="border   border-gray-300"></td>
                      <td className="border  px-1 text-right  border-gray-300">
                        {formatValue(table.sectionOne.TotalsectionOneItemsEn)}
                      </td>
                      <td className="border  px-1  text-right border-gray-300">
                        {formatValue(
                          table.sectionOne.TotalsectionOneItemsDate2En
                        )}
                      </td>
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
                    <tr className="bg-gray-300 border-gray-300 font-bold">
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

                {table.sectionFourSub.sectionFourSubFirstLabelEn &&
                  table.sectionFourSub.sectionFourSubFirstLabelEn.trim() !==
                    "" && (
                    <tr className="bg-gray-200 px-1   font-semibold">
                      <td className="">
                        {table.sectionFourSub.sectionFourSubFirstLabelEn}
                      </td>
                      <td className="  "></td>
                      <td className="  px-1 text-right  "></td>
                      <td className="  px-1  text-right "></td>
                    </tr>
                  )}

                {table.sectionFourSub.sectionFourSubLabelsEn.map(
                  (label: string, idx: number) => {
                    const note =
                      table.sectionFourSub.sectionFourSubNotesEn[idx];
                    const item =
                      table.sectionFourSub.sectionFourSubItemsEn[idx];
                    const itemDate2 =
                      table.sectionFourSub.sectionFourSubItemsDate2En[idx];

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

                {table.sectionFourSub.sectionFourSubTotalLabel &&
                  table.sectionFourSub.sectionFourSubTotalLabel.trim() !==
                    "" && (
                    <tr className="bg-gray-200 px-1   font-semibold">
                      <td className="">
                        {table.sectionFourSub.sectionFourSubTotalLabel}
                      </td>
                      <td className="border   border-gray-300"></td>
                      <td className="border  px-1 text-right  border-gray-300">
                        {formatValue(
                          table.sectionFourSub.TotalsectionFourSubItemsEn
                        )}
                      </td>
                      <td className="border  px-1  text-right border-gray-300">
                        {formatValue(
                          table.sectionFourSub.TotalsectionFourSubItemsDate2En
                        )}
                      </td>
                    </tr>
                  )}

                <br />
                <br />

                {table?.sectionAttributeOne?.sectionFourAttribute &&
                  table.sectionAttributeOne?.sectionFourAttribute.trim() !==
                    "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className="p-1">
                        {table.sectionAttributeOne?.sectionFourAttribute}
                      </td>
                      <td className=" border-gray-300"></td>
                      <td className="   px-1  text-right border-gray-300"></td>
                      <td className="   px-1  text-right border-gray-300"></td>
                    </tr>
                  )}

                {table.sectionAttributeOne.sectionFourAttributeLabelsEn.map(
                  (label: string, idx: number) => {
                    const item =
                      table.sectionAttributeOne.sectionFourAttributeItemsEn[
                        idx
                      ];
                    const itemDate2 =
                      table.sectionAttributeOne
                        .sectionFourAttributeItemsDate2En[idx];

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
                        <td className="border  text-center border-gray-300 p-1"></td>
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

                {(table.sectionAttributeOne.TotalsectionFourAttributeItemsEn ||
                  table.sectionAttributeOne
                    .TotalsectionFourAttributeItemsDate2En) && (
                  <tr className="bg-gray-100 font-semibold">
                    <td className="bg-white"></td>
                    <td className=""></td>
                    <td className="p-2">
                      {table.sectionAttributeOne
                        .TotalsectionFourAttributeItemsEn
                        ? formatValue(
                            table.sectionAttributeOne
                              .TotalsectionFourAttributeItemsEn
                          )
                        : "-"}
                    </td>
                    <td className="">
                      {table.sectionAttributeOne
                        .TotalsectionFourAttributeItemsDate2En
                        ? formatValue(
                            table.sectionAttributeOne
                              .TotalsectionFourAttributeItemsDate2En
                          )
                        : "-"}
                    </td>
                  </tr>
                )}

                <br />

                {table.sectionAttributeTwo.sectionFourAttribute2 &&
                  table.sectionAttributeTwo.sectionFourAttribute2.trim() !==
                    "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className="p-1">
                        {table.sectionAttributeTwo.sectionFourAttribute2}
                      </td>
                      <td className=" border-gray-300"></td>
                      <td className="   px-1  text-right border-gray-300"></td>
                      <td className="   px-1  text-right border-gray-300"></td>
                    </tr>
                  )}

                {table.sectionAttributeTwo.sectionFourAttribute2LabelsEn.map(
                  (label: string, idx: number) => {
                    const item =
                      table.sectionAttributeTwo.sectionFourAttribute2ItemsEn[
                        idx
                      ];
                    const itemDate2 =
                      table.sectionAttributeTwo
                        .sectionFourAttribute2ItemsDate2En[idx];

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
                        <td className="border  text-center border-gray-300 p-1"></td>
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

                {(table.sectionAttributeTwo.TotalsectionFourAttribute2ItemsEn ||
                  table.sectionAttributeTwo
                    .TotalsectionFourAttribute2ItemsDate2En) && (
                  <tr className="bg-gray-100 font-semibold">
                    <td className="bg-white"></td>
                    <td className=""></td>
                    <td className="p-2">
                      {table.sectionAttributeTwo
                        .TotalsectionFourAttribute2ItemsEn
                        ? formatValue(
                            table.sectionAttributeTwo
                              .TotalsectionFourAttribute2ItemsEn
                          )
                        : "-"}
                    </td>
                    <td className="">
                      {table.sectionAttributeTwo
                        .TotalsectionFourAttribute2ItemsDate2En
                        ? formatValue(
                            table.sectionAttributeTwo
                              .TotalsectionFourAttribute2ItemsDate2En
                          )
                        : "-"}
                    </td>
                  </tr>
                )}

                <br />

                {table.sectionOtherComprehensiveIncome
                  .sectionFourOtherComprehensiveIncome &&
                  table.sectionOtherComprehensiveIncome.sectionFourOtherComprehensiveIncome.trim() !==
                    "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className=" w-full   bg-gray-200 text-black px-1 ">
                        {
                          table.sectionOtherComprehensiveIncome
                            .sectionFourOtherComprehensiveIncome
                        }
                      </td>
                      <td className=" border-gray-300"></td>
                      <td className="   px-1  text-right border-gray-300"></td>
                      <td className="   px-1  text-right border-gray-300"></td>
                    </tr>
                  )}

                {table.sectionOtherComprehensiveIncome
                  .sectionFourOtherComprehensiveIncomeSubheading &&
                  table.sectionOtherComprehensiveIncome.sectionFourOtherComprehensiveIncomeSubheading.trim() !==
                    "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className=" w-full  px-1  text-[9px]   bg-gray-200 text-black  ">
                        {
                          table.sectionOtherComprehensiveIncome
                            .sectionFourOtherComprehensiveIncomeSubheading
                        }
                      </td>
                      <td className=" border-gray-300"></td>
                      <td className="   px-1  text-right border-gray-300"></td>
                      <td className="   px-1  text-right border-gray-300"></td>
                    </tr>
                  )}

                {table.sectionOtherComprehensiveIncome.sectionFourOtherComprehensiveIncomeSubheadingLabelsEn.map(
                  (label: string, idx: number) => {
                    const note =
                      table.sectionOtherComprehensiveIncome
                        .sectionFourOtherComprehensiveIncomeSubheadingNotesEn[
                        idx
                      ];
                    const item =
                      table.sectionOtherComprehensiveIncome
                        .sectionFourOtherComprehensiveIncomeSubheadingItemsEn[
                        idx
                      ];
                    const itemDate2 =
                      table.sectionOtherComprehensiveIncome
                        .sectionFourOtherComprehensiveIncomeSubheadingItemsDate2En[
                        idx
                      ];

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

                {table.sectionOtherComprehensiveIncome
                  .sectionFourOtherTotalComprehensiveIncome &&
                  table.sectionOtherComprehensiveIncome.sectionFourOtherTotalComprehensiveIncome.trim() !==
                    "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className="p-1">
                        {
                          table.sectionOtherComprehensiveIncome
                            .sectionFourOtherTotalComprehensiveIncome
                        }
                      </td>
                      <td className="border border-gray-300"></td>
                      <td className="border   px-1  text-right border-gray-300">
                        {formatValue(
                          table.sectionOtherComprehensiveIncome
                            .TotalsectionFourOtherComprehensiveIncomeSubheadingItemsEn
                        )}
                      </td>
                      <td className="border   px-1  text-right border-gray-300">
                        {formatValue(
                          table.sectionOtherComprehensiveIncome
                            .TotalsectionFourOtherComprehensiveIncomeSubheadingItemsDate2En
                        )}
                      </td>
                    </tr>
                  )}






              </tbody>




<br />

  <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-100 w-96"></th>
                  <th className="border border-gray-100 w-16">إيضاحات</th>

                  {/* Date 1 Display */}
                  <th className="border border-gray-100 p-1 w-28">
                    <div className="bg-gray-100 w-24 text-center font-bold">
                      {table?.Table2.dateTwo1Ar
                        ? new Date(table?.Table2.dateTwo1Ar).toLocaleDateString("ar-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : "-"}
                    </div>
                    <div className="w-full text-center bg-gray-100">
                      {"(غير مراجعة)"}
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
                    <div className="bg-gray-100 w-24 text-center font-bold">
                      {table?.Table2.dateTwo2Ar
                        ? new Date(table?.Table2.dateTwo2Ar).toLocaleDateString("ar-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : "-"}
                    </div>
                    <div className="w-full text-center bg-gray-100">
                      {"(مراجعة)"}
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





  {table.Table2.sectionOneTable2?.sectionLastLabel &&
                  table.Table2.sectionOneTable2?.sectionLastLabel.trim() !==
                    "" && (
                    <tr className="bg-gray-300 px-1   font-semibold">
                      <td className="">
                        {table.Table2.sectionOneTable2?.sectionLastLabel}
                      </td>
                      <td className="border   border-gray-300"></td>
                      <td className="border  px-1 text-right  border-gray-300">
                        {formatValue(
                          table.Table2.sectionOneTable2.TotalsectionFourSubItemsEn

                        )}
                      </td>
                      <td className="border  px-1  text-right border-gray-300">
                        {formatValue(
                          table.Table2.sectionOneTable2.TotalsectionFourSubItemsDate2En

                        )}
                      </td>
                    </tr>
                  )}


                {table.Table2.sectionOneTable2?.sectionSevenLastLabel&&
                 table.Table2.sectionOneTable2?.sectionSevenLastLabel.trim() !== "" && (
                    <tr className="bg-gray-300 px-1   font-semibold">
                      <td className="">
                        {table.Table2.sectionOneTable2?.sectionSevenLastLabel}
                      </td>
                      <td className="  "></td>
                      <td className="  px-1 text-right  "></td>
                      <td className="  px-1  text-right "></td>
                    </tr>
                  )}


                {table.Table2.sectionOneTable2?.sectionSevenSubheading&&
                 table.Table2.sectionOneTable2?.sectionSevenSubheading.trim() !== "" && (
                    <tr className="bg-gray-200 px-1   font-semibold">
                      <td className="">
                        {table.Table2.sectionOneTable2?.sectionSevenSubheading}
                      </td>
                      <td className="  "></td>
                      <td className="  px-1 text-right  "></td>
                      <td className="  px-1  text-right "></td>
                    </tr>
                  )}






                {table.Table2.sectionOneTable2?.sectionLastLabelsEn.map(
                  (label: string, idx: number) => {
                    const note = table.Table2.sectionOneTable2?.sectionLastNotesEn[idx];
                    const item =table.Table2.sectionOneTable2?.sectionLastItemsEn[idx];
                    const itemDate2 = table.Table2.sectionOneTable2.sectionLastItemsDate2En[idx];

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

                {table.Table2.sectionOneTable2.sectionLastTotalLabelEn&&
                 table.Table2.sectionOneTable2.sectionLastTotalLabelEn.trim() !== "" && (
                    <tr className="bg-gray-200 px-1   font-semibold">
                      <td className="">
                        {table.Table2.sectionOneTable2.sectionLastTotalLabelEn}
                      </td>
                      <td className="border   border-gray-300"></td>
                      <td className="border  px-1 text-right  border-gray-300">
                        {formatValue(table.Table2.sectionOneTable2.TotalSectionLastLabelItemsEn)}
                      </td>
                      <td className="border  px-1  text-right border-gray-300">
                        {formatValue(
                          table.Table2.sectionOneTable2.TotalSectionLastItemsDate2En
                        )}
                      </td>
                    </tr>
                  )}




<br />




       {table.Table2.sectionTwoTable2?.sectionSevenSubheading2&&
                 table.Table2.sectionTwoTable2?.sectionSevenSubheading2.trim() !== "" && (
                    <tr className="bg-gray-200 px-1   font-semibold">
                      <td className="">
                        {table.Table2.sectionTwoTable2?.sectionSevenSubheading2}
                      </td>
                      <td className="  "></td>
                      <td className="  px-1 text-right  "></td>
                      <td className="  px-1  text-right "></td>
                    </tr>
                  )}













                {table.Table2.sectionTwoTable2?.sectionLastLabelsEn2.map(
                  (label: string, idx: number) => {
                    const note = table.Table2.sectionTwoTable2?.sectionLastNotesEn2[idx];
                    const item = table.Table2.sectionTwoTable2?.sectionLastItemsEn2[idx];
                    const itemDate2 =
                      table.Table2.sectionTwoTable2?.sectionLastItemsDate2En2[idx];

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





 {table.Table2.sectionTwoTable2.sectionLastTotalLabelEn2&&  table.Table2.sectionTwoTable2.sectionLastTotalLabelEn2.trim() !== "" && (
                    <tr className="bg-gray-200 px-1   font-semibold">
                      <td className="">
                        {table.Table2.sectionTwoTable2.sectionLastTotalLabelEn2}
                      </td>
                      <td className="border   border-gray-300"></td>
                      <td className="border  px-1 text-right  border-gray-300">
                        {formatValue(table.Table2.sectionTwoTable2.TotalSectionLastLabelItemsEn2)}
                      </td>
                      <td className="border  px-1  text-right border-gray-300">
                        {formatValue(
                          table.Table2.sectionTwoTable2.TotalSectionLastItemsDate2En2
                        )}
                      </td>
                    </tr>
                  )}

 {table.Table2.sectionTwoTable2.totalComprehensiveLoss.SectionSevenLastLabel2&&  table.Table2.sectionTwoTable2.totalComprehensiveLoss.SectionSevenLastLabel2.trim() !== "" && (
                    <tr className="bg-gray-200 px-1   font-semibold">
                      <td className="">
                        {table.Table2.sectionTwoTable2.totalComprehensiveLoss.SectionSevenLastLabel2}
                      </td>
                      <td className="border   border-gray-300"></td>
                      <td className="border  px-1 text-right  border-gray-300">
                        {formatValue(table.Table2.sectionTwoTable2.totalComprehensiveLoss.TotalsectionSevenLastItemEn)}
                      </td>
                      <td className="border  px-1  text-right border-gray-300">
                        {formatValue(
                         table.Table2.sectionTwoTable2.totalComprehensiveLoss.TotalsectionSevenLastItemsDate2En
                        )}
                      </td>
                    </tr>
                  )}
 {table.Table2.sectionTwoTable2.totalOtherComp.SectionSevenSecondLastLabel2&&  table.Table2.sectionTwoTable2.totalOtherComp.SectionSevenSecondLastLabel2.trim() !== "" && (
                    <tr className="bg-gray-200 px-1   font-semibold">
                      <td className="">
                        {table.Table2.sectionTwoTable2.totalOtherComp.SectionSevenSecondLastLabel2}
                      </td>
                      <td className="border   border-gray-300"></td>
                      <td className="border  px-1 text-right  border-gray-300">
                        {formatValue(table.Table2.sectionTwoTable2.totalOtherComp.TotalsectionSevenSecondLastItemEn)}
                      </td>
                      <td className="border  px-1  text-right border-gray-300">
                        {formatValue(
                         table.Table2.sectionTwoTable2.totalOtherComp.TotalsectionSevenSecondLastItemsDate2En
                        )}
                      </td>
                    </tr>
                  )}





<br />


              
              


                {table.Table2.sectionAttributeOneTable2.sectionFourAttributeTable2 &&
                 table.Table2.sectionAttributeOneTable2.sectionFourAttributeTable2.trim() !==
                    "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className="p-1">
                        {table.Table2.sectionAttributeOneTable2.sectionFourAttributeTable2}
                      </td>
                      <td className=" border-gray-300"></td>
                      <td className="   px-1  text-right border-gray-300"></td>
                      <td className="   px-1  text-right border-gray-300"></td>
                    </tr>
                  )}

                {table.Table2.sectionAttributeOneTable2.sectionFourAttributeLabelsEnTable2.map(
                  (label: string, idx: number) => {
                    const item = table.Table2.sectionAttributeOneTable2.sectionFourAttributeItemsEnTable2[ idx ];
                    const itemDate2 = table.Table2.sectionAttributeOneTable2.sectionFourAttributeItemsDate2EnTable2[idx];

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
                        <td className="border  text-center border-gray-300 p-1"></td>
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


                {(table.Table2.sectionAttributeOneTable2.TotalsectionFourAttributeItemsEnTable2 || table.Table2.sectionAttributeOneTable2.TotalsectionFourAttributeItemsDate2EnTable2) && (
                  <tr className="bg-gray-100 font-semibold">
                    <td className="bg-white"></td>
                    <td className=""></td>
                    <td className="p-2">
                      {table.Table2.sectionAttributeOneTable2.TotalsectionFourAttributeItemsEnTable2
                        ? formatValue(   table.Table2.sectionAttributeOneTable2.TotalsectionFourAttributeItemsEnTable2)
                        : "-"}
                    </td>
                    <td className="">
                      { table.Table2.sectionAttributeOneTable2.TotalsectionFourAttributeItemsDate2EnTable2
                        ? formatValue( table.Table2.sectionAttributeOneTable2.TotalsectionFourAttributeItemsDate2EnTable2 )
                        : "-"}
                    </td>
                  </tr>
                )}
                <br />











                {table.Table2.sectionAttributeTwoTable2.sectionFourAttribute2Table2 &&
                 table.Table2.sectionAttributeTwoTable2.sectionFourAttribute2Table2.trim() !==
                    "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className="p-1">
                        {table.Table2.sectionAttributeTwoTable2.sectionFourAttribute2Table2}
                      </td>
                      <td className=" border-gray-300"></td>
                      <td className="   px-1  text-right border-gray-300"></td>
                      <td className="   px-1  text-right border-gray-300"></td>
                    </tr>
                  )}

                {table.Table2.sectionAttributeTwoTable2.sectionFourAttribute2LabelsEnTable2.map(
                  (label: string, idx: number) => {
                    const item = table.Table2.sectionAttributeTwoTable2.sectionFourAttribute2ItemsEnTable2[ idx ];
                    const itemDate2 = table.Table2.sectionAttributeTwoTable2.sectionFourAttribute2ItemsDate2EnTable2[idx];

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
                        <td className="border  text-center border-gray-300 p-1"></td>
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


                {(table.Table2.sectionAttributeTwoTable2.TotalsectionFourAttribute2ItemsEnTable2 || table.Table2.sectionAttribute2TwoTable2.TotalsectionFourAttribute2ItemsDate2EnTable2) && (
                  <tr className="bg-gray-100 font-semibold">
                    <td className="bg-white"></td>
                    <td className=""></td>
                    <td className="p-2">
                      {table.Table2.sectionAttributeTwoTable2.TotalsectionFourAttribute2ItemsEnTable2
                        ? formatValue(   table.Table2.sectionAttributeTwoTable2.TotalsectionFourAttribute2ItemsEnTable2)
                        : "-"}
                    </td>
                    <td className="">
                      { table.Table2.sectionAttributeTwoTable2.TotalsectionFourAttribute2ItemsDate2EnTable2
                        ? formatValue( table.Table2.sectionAttributeTwoTable2.TotalsectionFourAttribute2ItemsDate2EnTable2 )
                        : "-"}
                    </td>
                  </tr>
                )}








                <br />

                {table.Table2.sectionOtherComprehensiveIncomeTable2.sectionFourOtherComprehensiveIncomeTable2 &&
                 table.Table2.sectionOtherComprehensiveIncomeTable2.sectionFourOtherComprehensiveIncomeTable2.trim() !==
                    "" && (
                    <tr className="bg-gray-200 font-semibold">
                      <td className=" w-full   bg-gray-200 text-black px-1 ">
                        {
                   table.Table2.sectionOtherComprehensiveIncomeTable2.sectionFourOtherComprehensiveIncomeTable2
                        }
                      </td>
                      <td className=" border-gray-300"></td>
                      <td className="   px-1  text-right border-gray-300"></td>
                      <td className="   px-1  text-right border-gray-300"></td>
                    </tr>
                  )}





                { table.Table2.sectionOtherComprehensiveIncomeTable2.sectionFourOtherComprehensiveIncomeSubheadingLabelsEnTable2.map(
                  (label: string, idx: number) => {
                    const note = table.Table2.sectionOtherComprehensiveIncomeTable2.sectionFourOtherComprehensiveIncomeSubheadingNotesEnTable2[idx];
                    const item = table.Table2.sectionOtherComprehensiveIncomeTable2.sectionFourOtherComprehensiveIncomeSubheadingItemsEnTable2[idx];
                    const itemDate2 = table.Table2.sectionOtherComprehensiveIncomeTable2.sectionFourOtherComprehensiveIncomeSubheadingItemsDate2EnTable2[idx];

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

                







              </tbody>
       


            </table>
          </div>
        ) : (
          <div>Data Checking.</div>
        )}
      </>
    );
  }
);

export default CashFlowUserArabic;
