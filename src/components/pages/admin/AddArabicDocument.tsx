
// export  const AddArabicDocument= ()=>{


//     return (
//         <div className="">

// <div className="flex -mx-3">
//             <div className="w-1/2 px-3 mb-6 md:mb-3">
//               <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
//                 الاسم الكامل <span className="font-mono text-xs"> (عربي)</span>
//               </label>
//               <input
//                 className="appearance-none block text-x text-sm w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
//                 type="text"
//                 placeholder="أدخل الاسم الكامل"
//                 value={companyNameAr}
//                 onChange={handleCompanyNameArChange}
//                 required
//               />
//               {errors.companyNameAr && (
//                 <p className="text-red-500 text-xs">{errors.companyNameAr}</p>
//               )}
//             </div>
//             <div className="w-1/2 px-3 mb-6 md:mb-0">
//               <label className="block uppercase tracking-wide text-gray-700 font-bold mb-2">
//                 اسم المستعار <span className="text-xs font-mono"> (عربي)</span>
//               </label>
//               <input
//                 className="appearance-none block w-full text-sm bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
//                 type="text"
//                 placeholder=" أدخل الاسم المستعار"
//                 value={companyNameEn}
//                 onChange={handleCompanyNameEnChange}
//                 required
//               />
//               {errors.companyNameEn && (
//                 <p className="text-red-500 text-xs">{errors.companyNameEn}</p>
//               )}
//             </div>
//           </div>
//         </div>
//     )
// }