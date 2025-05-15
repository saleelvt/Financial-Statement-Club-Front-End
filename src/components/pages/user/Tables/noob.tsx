// // /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect, useState } from "react";

// type BalanceSheetFormUserProps = {
//   Tabledata: any; // You can replace `any` with an actual type later
// };

// const BalanceSheetFormUser: React.FC<BalanceSheetFormUserProps> = React.memo(
//   ({ Tabledata }) => {
//     const [table, setTable] = useState<any>(null);

//     useEffect(() => {
//       setTable(Tabledata);
//     }, [Tabledata]);

//     console.log("The table data from props:", Tabledata);

//     return (
//       <>
//         {table ? (
//           // <div>
//           //   This is the Balance Sheet: {table?.ItotalEquityAndLiabilities}
//           // </div>

//           <div className="flex justify-start   my-2 text-black">
//             <table className="border font-semibold border-gray-300 text-xs mb-12 table-fixed ">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="border border-gray-100 w-96"></th>
//                   <th className="border border-gray-100 w-16">Notes</th>

//                   {/* Date 1 Display */}
//                   <th className="border border-gray-100 p-1 w-28">
//                     <div className="bg-gray-100 w-24 text-center font-bold">
//                       {table.data1En
//                         ? new Date(table.data1En).toLocaleDateString("en-GB", {
//                             day: "2-digit",
//                             month: "long",
//                             year: "numeric",
//                           })
//                         : "-"}
//                     </div>
//                     <div className="w-full text-center bg-gray-100">
//                       {"(Unaudited)"}
//                     </div>
//                     <div
//                       dir="ltr"
//                       className="flex items-center justify-center bg-gray-100 w-full rounded"
//                     >
//                       <img
//                         src="https://res.cloudinary.com/dllmjze4p/image/upload/fl_preserve_transparency/v1746013121/riyal_uxhuwz.jpg?_s=public-apps"
//                         alt="Riyal"
//                         className="w-3 h-3"
//                       />
//                       <span className="w-8 text-center bg-gray-100 block">
//                         {  "'000"}
//                       </span>
//                     </div>
//                   </th>

//                   {/* Date 2 Display */}
//                   <th className="border border-gray-100 p-1 w-28">
//                     <div className="bg-gray-100 w-24 text-center font-bold">
//                       {table.data1En
//                         ? new Date(table.data1En).toLocaleDateString("en-GB", {
//                             day: "2-digit",
//                             month: "long",
//                             year: "numeric",
//                           })
//                         : "-"}
//                     </div>
//                     <div className="w-full text-center bg-gray-100">
//                       { "(Audited)"}
//                     </div>
//                     <div
//                       dir="ltr"
//                       className="flex items-center justify-center bg-gray-100 w-full rounded"
//                     >
//                       <img
//                         src="https://res.cloudinary.com/dllmjze4p/image/upload/fl_preserve_transparency/v1746013121/riyal_uxhuwz.jpg?_s=public-apps"
//                         alt="Riyal"
//                         className="w-3 h-3"
//                       />
//                       <span className="w-8 text-center bg-gray-100 block">
//                         { "'000"}
//                       </span>
//                     </div>
//                   </th>
//                 </tr>
//               </thead>








//  <tbody>

//  <tr className="bg-gray-400 text-sm font-semibold">
//     <td colSpan={4} className="p-1 text-start">
//       {table.assets.sassets}
//     </td>
//   </tr>

//   <tr className="bg-gray-200 font-medium">
//     <td colSpan={4} className="p-1 text-start">
//       {table.assets.nonCurrent.snonCurrentAssets}
//     </td>
//   </tr>

//     {table.assets.nonCurrent.nonCurrentLabels.map((label, idx) => {
//       const formatValue = (v: string | number) => {
//         const num = Number(String(v).replace(/[(),\s]/g, ""));
//         if (isNaN(num)) return v;
//         if (num === 0) return "-";
//         if (v.toString().startsWith("-") || v.toString().startsWith("(")) {
//           return `(${new Intl.NumberFormat("en-US").format(Math.abs(num))})`;
//         }
//         return new Intl.NumberFormat("en-US").format(num);
//       };

//       return (
//         <tr key={`non-current-${idx}`} className="bg-white hover:bg-gray-50">
//           <td className="border border-gray-300 p-1">{label}</td>
//           <td className="border border-gray-300 p-1">
//             {table.assets.nonCurrent.nonCurrentNotes[idx] || "-"}
//           </td>
//           <td className="border border-gray-300 p-1">
//             {formatValue(table.assets.nonCurrent.items[idx] || "")}
//           </td>
//           <td className="border border-gray-300 p-1">
//             {formatValue(table.assets.nonCurrent.itemsDate2[idx] || "")}
//           </td>
//         </tr>
//       );
//     })}
//   </tbody>
















              
//             </table>
//           </div>
//         ) : (
//           <div>Loading...</div>
//         )}
//       </>
//     );
//   }
// );

// export default BalanceSheetFormUser;

