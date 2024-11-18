/* eslint-disable @typescript-eslint/no-explicit-any */

export const setArabicNames = (documents: any) => {
    try {
        const arabicNamesArray: { name: string, year:string}[] = [];
        const arabicFiles: any[] = [];  // Separate array for Arabic files
        for (const x of documents) {
            arabicNamesArray.push({
                name: x?.companyNameAr,
                year:x?.yearOfReport
            });
            if (x?.fileAr) arabicFiles.push(x?.fileAr);  // Push file to Arabic files array
        }
        arabicNamesArray.sort((a, b) => b.name.localeCompare(a.name, 'ar'));

        return { arabicNamesArray, arabicFiles };
    } catch (error: any) {
        console.log(error);
        return { arabicNamesArray: [], arabicFiles: [] };
    }
};
