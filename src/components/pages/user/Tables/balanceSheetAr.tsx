/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

type BalanceSheetFormUserProps = {
  Tabledata: any; // You can replace `any` with an actual type later
};

const BalanceSheetFormUserArabic: React.FC<BalanceSheetFormUserProps> = React.memo(
  ({ Tabledata }) => {
    const [table, setTable] = useState<any>(null);

    useEffect(() => {
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
          <div className="flex justify-start   my-2 text-black">
            <table dir="rtl" className="border font-semibold border-gray-300 text-xs mb-8  w-full ">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-100 w-96"></th>
                  <th className="border border-gray-100 w-16">إيضاحات</th>

                  {/* Date 1 Display */}
                  <th className="border border-gray-100 p-1 w-28">
                    <div className="bg-gray-100 w-24 text-center font-bold">
                      {table.data1En
                        ? new Date(table.data1En).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
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
                      {table.data1En
                        ? new Date(table.data1En).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
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
                 {table.assets.sassets && table.assets.sassets.trim() !== "" && (
                  <tr className="bg-gray-400 text-sm font-semibold">
                    <td colSpan={4} className="p-1 text-start">
                      {table.assets.sassets}
                    </td>
                  </tr>
                )}

                {table.assets.nonCurrent.snonCurrentAssets &&
                  table.assets.nonCurrent.snonCurrentAssets.trim() !== "" && (
                    <tr className="bg-gray-200 font-medium">
                      <td colSpan={4} className="p-1 text-start">
                        {table.assets.nonCurrent.snonCurrentAssets}
                      </td>
                    </tr>
                  )}
                {table.assets.nonCurrent.nonCurrentLabels.map(
                  (label: string, idx: number) => {
                    const note = table.assets.nonCurrent.nonCurrentNotes[idx];
                    const item = table.assets.nonCurrent.items[idx];
                    const itemDate2 = table.assets.nonCurrent.itemsDate2[idx];

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
                        <td className="border border-gray-300 p-1">
                          {note || "-"}
                        </td>
                        <td className="border border-gray-300 p-1">
                          {item ? formatValue(item) : "-"}
                        </td>
                        <td className="border border-gray-300 p-1">
                          {itemDate2 ? formatValue(itemDate2) : "-"}
                        </td>
                      </tr>
                    );
                  }
                )}

              {table.assets.nonCurrent.sfirtsTotalnonCurrentAssets &&
 table.assets.nonCurrent.sfirtsTotalnonCurrentAssets.trim() !== "" && (
  <tr className="bg-gray-200 font-semibold">
    <td className="">
      {table.assets.nonCurrent.sfirtsTotalnonCurrentAssets}
    </td>
    <td className="border border-gray-300"></td>
    <td className="border border-gray-300">
      {formatValue(table.assets.nonCurrent.firstTotal)}
    </td>
    <td className="border border-gray-300">
      {formatValue(table.assets.nonCurrent.firstTotalDate2)}
    </td>
  </tr>
)}


                {table.assets.nonCurrent.nonCurrentSubLabels.map(
                  (label: string, idx: number) => {
                    // const note = table.assets.nonCurrent.nonCurrentNotes[idx];
                    const item = table.assets.nonCurrent.subItems[idx];
                    const itemDate2 =
                      table.assets.nonCurrent.subItemsDate2[idx];

                    const allEmpty =
                      (!label || label.trim() === "") &&
                      //   (!note || note.trim() === "") &&
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
                        <td className="border border-gray-300 p-1">{""}</td>
                        <td className="border border-gray-300 p-1">
                          {item ? formatValue(item) : "-"}
                        </td>
                        <td className="border border-gray-300 p-1">
                          {itemDate2 ? formatValue(itemDate2) : "-"}
                        </td>
                      </tr>
                    );
                  }
                )}

               {table.assets.nonCurrent.stotalNonCurrentAssets &&
 table.assets.nonCurrent.stotalNonCurrentAssets.trim() !== "" && (
  <tr className="bg-gray-200 font-semibold">
    <td className="border border-gray-300">
      {table.assets.nonCurrent.stotalNonCurrentAssets}
    </td>
    <td className="border border-gray-300 bg-gray-200 p-1"></td>
    <td className="border border-gray-300 bg-gray-200 p-1 text-start">
      {formatValue(table.assets.nonCurrent.secondTotal)}
    </td>
    <td className="border border-gray-300 font bg-gray-200 p-1 text-start">
      {formatValue(table.assets.nonCurrent.secondTotalDate2)}
    </td>
  </tr>
)}

{table.assets.current.scurrentAssets &&
 table.assets.current.scurrentAssets.trim() !== "" && (
  <tr className="bg-gray-200 font-semibold">
    <td colSpan={4} className="p-0.5">
      {table.assets.current.scurrentAssets}
    </td>
  </tr>
)}


                {table.assets.current.currentLabels.map(
                  (label: string, idx: number) => {
                    const note = table.assets.current.CurrentAssetsNotes[idx];
                    const item = table.assets.current.items[idx];
                    const itemDate2 = table.assets.current.itemsDate2[idx];

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
                        <td className="border border-gray-300 p-1">
                          {note || "-"}
                        </td>
                        <td className="border border-gray-300 p-1">
                          {item ? formatValue(item) : "-"}
                        </td>
                        <td className="border border-gray-300 p-1">
                          {itemDate2 ? formatValue(itemDate2) : "-"}
                        </td>
                      </tr>
                    );
                  }
                )}

              {table.assets.current.sfirtsTotalCurrentAssets &&
 table.assets.current.sfirtsTotalCurrentAssets.trim() !== "" && (
  <tr className="bg-gray-200 font-semibold">
    <td className="">
      {table.assets.current.sfirtsTotalCurrentAssets}
    </td>
    <td className="border border-gray-300"></td>
    <td className="border border-gray-300">
      {formatValue(table.assets.current.firstTotal)}
    </td>
    <td className="border border-gray-300">
      {formatValue(table.assets.current.firstTotalDate2)}
    </td>
  </tr>
)}


                {table.assets.current.currentSubLabels.map(
                  (label: string, idx: number) => {
                    // const note = table.assets.nonCurrent.nonCurrentNotes[idx];
                    const item = table.assets.current.subItems[idx];
                    const itemDate2 = table.assets.current.subItemsDate2[idx];

                    const allEmpty =
                      (!label || label.trim() === "") &&
                      //   (!note || note.trim() === "") &&
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
                        <td className="border border-gray-300 p-1">{""}</td>
                        <td className="border border-gray-300 p-1">
                          {item ? formatValue(item) : "-"}
                        </td>
                        <td className="border border-gray-300 p-1">
                          {itemDate2 ? formatValue(itemDate2) : "-"}
                        </td>
                      </tr>
                    );
                  }
                )}
               {table.assets.current.stotalCurrentAssets &&
 table.assets.current.stotalCurrentAssets.trim() !== "" && (
  <tr className="bg-gray-200 font-semibold">
    <td className="">
      {table.assets.current.stotalCurrentAssets}
    </td>
    <td className="border border-gray-300"></td>
    <td className="border border-gray-300">
      {formatValue(table.assets.current.secondTotal)}
    </td>
    <td className="border border-gray-300">
      {formatValue(table.assets.current.secondTotalDate2)}
    </td>
  </tr>
)}

{table.assets.stotalAssets &&
 table.assets.stotalAssets.trim() !== "" && (
  <tr className="bg-gray-400 font-bold">
    <td className="">{table.assets.stotalAssets}</td>
    <td className="border border-gray-300"></td>
    <td className="border border-gray-300">
      {formatValue(table.assets.totalAssets)}
    </td>
    <td className="border border-gray-300">
      {formatValue(table.assets.totalAssetsDate2)}
    </td>
  </tr>
)}

{table.sShareholdersEquityandliabilitiess &&
 table.sShareholdersEquityandliabilitiess.trim() !== "" && (
  <>
    <br />
    <tr className="bg-gray-400 font-semibold">
      <td colSpan={4} className="">
        {table.sShareholdersEquityandliabilitiess}
      </td>
    </tr>
  </>
)}

{table.equity.sShareholdersEquity &&
 table.equity.sShareholdersEquity.trim() !== "" && (
  <tr className="bg-gray-300 font-medium">
    <td colSpan={4} className="">
      {table.equity.sShareholdersEquity}
    </td>
  </tr>
)}


                {table.equity.equityLabels.map((label: string, idx: number) => {
                  const note = table.equity.equityItemsNotes[idx];
                  const item = table.equity.items[idx];
                  const itemDate2 = table.equity.itemsDate2[idx];

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
                      <td className="border border-gray-300 p-1">
                        {note || "-"}
                      </td>
                      <td className="border border-gray-300 p-1">
                        {item ? formatValue(item) : "-"}
                      </td>
                      <td className="border border-gray-300 p-1">
                        {itemDate2 ? formatValue(itemDate2) : "-"}
                      </td>
                    </tr>
                  );
                })}

               {table.equity.sfirtsTotalShareholdersEquity &&
 table.equity.sfirtsTotalShareholdersEquity.trim() !== "" && (
  <tr className="bg-gray-200 font-semibold">
    <td className="border border-gray-300">
      {table.equity.sfirtsTotalShareholdersEquity}
    </td>
    <td className="border border-gray-300"></td>
    <td className="border border-gray-300">
      {formatValue(table.equity.firstTotal)}
    </td>
    <td className="border border-gray-300">
      {formatValue(table.equity.firstTotalDate2)}
    </td>
  </tr>
)}


                {table.equity.equitySubLabels.map(
                  (label: string, idx: number) => {
                    // const note = table.assets.nonCurrent.nonCurrentNotes[idx];
                    const item = table.equity.subItems[idx];
                    const itemDate2 = table.assets.current.subItemsDate2[idx];

                    const allEmpty =
                      (!label || label.trim() === "") &&
                      //   (!note || note.trim() === "") &&
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
                        <td className="border border-gray-300 p-1">{""}</td>
                        <td className="border border-gray-300 p-1">
                          {item ? formatValue(item) : "-"}
                        </td>
                        <td className="border border-gray-300 p-1">
                          {itemDate2 ? formatValue(itemDate2) : "-"}
                        </td>
                      </tr>
                    );
                  }
                )}

{table.equity.stotalShareholdersEquity &&
 table.equity.stotalShareholdersEquity.trim() !== "" && (
  <tr className="bg-gray-300 border-gray-300 font-bold">
    <td className="">{table.equity.stotalShareholdersEquity}</td>
    <td className="border border-gray-300"></td>
    <td className="border border-gray-300">
      {formatValue(table.equity.totalEquity)}
    </td>
    <td className="border border-gray-300">
      {formatValue(table.equity.totalEquityDate2)}
    </td>
  </tr>
)}

{table.liabilities.liabilities &&
 table.liabilities.liabilities.trim() !== "" && (
  <tr className="bg-gray-200 font-semibold">
    <td colSpan={4} className="">
      {table.liabilities.liabilities}
    </td>
  </tr>
)}

{table.liabilities.nonCurrent.sNoncurrentliabilities &&
 table.liabilities.nonCurrent.sNoncurrentliabilities.trim() !== "" && (
  <tr className="bg-gray-200 font-semibold">
    <td colSpan={4} className="">
      {table.liabilities.nonCurrent.sNoncurrentliabilities}
    </td>
  </tr>
)}


                {table.liabilities.nonCurrent.NonCurrentLiabilitiesLabels.map(
                  (label: string, idx: number) => {
                    const note =
                      table.liabilities.nonCurrent.nonCurrentLiabilitiesNotes[
                        idx
                      ];
                    const item = table.liabilities.nonCurrent.items[idx];
                    const itemDate2 =
                      table.liabilities.nonCurrent.itemsDate2[idx];

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
                        <td className="border border-gray-300 p-1">
                          {note || "-"}
                        </td>
                        <td className="border border-gray-300 p-1">
                          {item ? formatValue(item) : "-"}
                        </td>
                        <td className="border border-gray-300 p-1">
                          {itemDate2 ? formatValue(itemDate2) : "-"}
                        </td>
                      </tr>
                    );
                  }
                )}

{table.liabilities.nonCurrent.sfirtsTotalNoncurrentLiabilities &&
 table.liabilities.nonCurrent.sfirtsTotalNoncurrentLiabilities.trim() !== "" && (
  <tr className="bg-gray-200 font-semibold">
    <td className="">
      {table.liabilities.nonCurrent.sfirtsTotalNoncurrentLiabilities}
    </td>
    <td className="border border-gray-300"></td>
    <td className="border border-gray-300">
      {formatValue(table.liabilities.nonCurrent.firstTotal)}
    </td>
    <td className="border border-gray-300">
      {formatValue(table.liabilities.nonCurrent.firstTotalDate2)}
    </td>
  </tr>
)}

                {table.liabilities.nonCurrent.NonCurrentLiabilitiesSubLabels.map(
                  (label: string, idx: number) => {
                    // const note = table.assets.nonCurrent.nonCurrentNotes[idx];
                    const item = table.liabilities.nonCurrent.subItems[idx];
                    const itemDate2 =
                      table.liabilities.nonCurrent.subItemsDate2[idx];

                    const allEmpty =
                      (!label || label.trim() === "") &&
                      //   (!note || note.trim() === "") &&
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
                        <td className="border border-gray-300 p-1">{""}</td>
                        <td className="border border-gray-300 p-1">
                          {item ? formatValue(item) : "-"}
                        </td>
                        <td className="border border-gray-300 p-1">
                          {itemDate2 ? formatValue(itemDate2) : "-"}
                        </td>
                      </tr>
                    );
                  }
                )}

              {table.liabilities.nonCurrent.stotalNoncurrentliabilities &&
 table.liabilities.nonCurrent.stotalNoncurrentliabilities.trim() !== "" && (
  <tr className="bg-gray-200 font-semibold">
    <td className="p-0.5">
      {table.liabilities.nonCurrent.stotalNoncurrentliabilities}
    </td>
    <td className="border border-gray-300"></td>
    <td className="border border-gray-300">
      {formatValue(table.liabilities.nonCurrent.total)}
    </td>
    <td className="border border-gray-300">
      {formatValue(table.liabilities.nonCurrent.totalDate2)}
    </td>
  </tr>
)}

{table.liabilities.current.scurrentliabilities &&
 table.liabilities.current.scurrentliabilities.trim() !== "" && (
  <tr className="bg-gray-200 font-semibold">
    <td colSpan={4} className="p-0.5">
      {table.liabilities.current.scurrentliabilities}
    </td>
  </tr>
)}


                 {table.liabilities.current.currentLiabilitiesLabels.map(
                  (label: string, idx: number) => {
                    const note =  table.liabilities.current.currentLiabilitiesNotes[idx];
                    const item = table.liabilities.current.items[idx];
                    const itemDate2 = table.liabilities.current.itemsDate2[idx];

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
                        <td className="border border-gray-300 p-1">
                          {note || "-"}
                        </td>
                        <td className="border border-gray-300 p-1">
                          {item ? formatValue(item) : "-"}
                        </td>
                        <td className="border border-gray-300 p-1">
                          {itemDate2 ? formatValue(itemDate2) : "-"}
                        </td>
                      </tr>
                    );
                  }
                )}

             {table.liabilities.current.sfirtsTotalcurrentLiabilities &&
 table.liabilities.current.sfirtsTotalcurrentLiabilities.trim() !== "" && (
  <tr className="bg-gray-200 font-semibold">
    <td className="">
      {table.liabilities.current.sfirtsTotalcurrentLiabilities}
    </td>
    <td className="border border-gray-300"></td>
    <td className="border border-gray-300">
      {formatValue(table.liabilities.current.firstTotal)}
    </td>
    <td className="border border-gray-300">
      {formatValue(table.liabilities.current.firstTotalDate2)}
    </td>
  </tr>
)}



            {table.liabilities.current.currentLiabilitiesSubLabels.map(
                  (label: string, idx: number) => {
                    // const note = table.assets.nonCurrent.nonCurrentNotes[idx];
                    const item = table.liabilities.current.subItems[idx];
                    const itemDate2 = table.liabilities.current.subItemsDate2[idx];

                    const allEmpty = (!label || label.trim() === "") &&
                      //   (!note || note.trim() === "") &&
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
                        <td className="border border-gray-300 p-1">{""}</td>
                        <td className="border border-gray-300 p-1">
                          {item ? formatValue(item) : "-"}
                        </td>
                        <td className="border border-gray-300 p-1">
                          {itemDate2 ? formatValue(itemDate2) : "-"}
                        </td>
                      </tr>
                    );
                  }
                )}

         {table.liabilities.current.stotalcurrentliabilities?.trim() && (
  <tr className="bg-gray-200 font-semibold">
    <td className="p-0.5">
      {table.liabilities.current.stotalcurrentliabilities}
    </td>
    <td className="border border-gray-300"></td>
    <td className="border border-gray-300">
      {formatValue(table.liabilities.current.total)}
    </td>
    <td className="border border-gray-300">
      {formatValue(table.liabilities.current.totalDate2)}
    </td>
  </tr>
)}

{table.liabilities.stotalliabilities?.trim() && (
  <tr className="bg-gray-300 font-bold">
    <td className="p-0.5">
      {table.liabilities.stotalliabilities}
    </td>
    <td className="border border-gray-300"></td>
    <td className="border border-gray-300">
      {formatValue(table.liabilities.totalLiabilities)}
    </td>
    <td className="border border-gray-300">
      {formatValue(table.liabilities.totalLiabilitiesDate2)}
    </td>
  </tr>
)}

{table.stotalEquityAndLiabilities?.trim() && (
  <tr className="bg-gray-400 font-bold">
    <td className="p-0.5">
      {table.stotalEquityAndLiabilities}
    </td>
    <td className="border border-gray-300"></td>
    <td className="border border-gray-300">
      {formatValue(table.ItotalEquityAndLiabilities)}
    </td>
    <td className="border border-gray-300">
      {formatValue(table.ItotalEquityAndLiabilitiesDate2)}
    </td>
  </tr>
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

export default BalanceSheetFormUserArabic;
