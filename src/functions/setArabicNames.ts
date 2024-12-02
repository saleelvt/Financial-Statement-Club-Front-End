/* eslint-disable @typescript-eslint/no-explicit-any */

export const setArabicNames = (documents: any) => {
    try {
        const arabicNamesArray: { fullNameEn: string ,nickNameEn:string,tadawalCode:string,sector:string}[] = [];
        const arabicFormFiles: any[] = [];  // Separate array for Arabic files
        for (const x of documents) {
            arabicNamesArray.push({
                fullNameEn: x?.fullNameEn,
                nickNameEn:x?.nickNameEn,
                tadawalCode:x?.tadawalCode,
                sector:x?.sector
            });
            if (x?.formData) arabicFormFiles.push(x?.formData);  // Push file to Arabic files array
        }
        arabicNamesArray.sort((a, b) => b.nickNameEn.localeCompare(a.nickNameEn, 'ar'));

        return { arabicNamesArray, arabicFormFiles };
    } catch (error: any) {
        console.log(error);
        return { arabicNamesArray: [], arabicFormFiles: [] };
    }
};
