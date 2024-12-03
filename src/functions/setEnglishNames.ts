/* eslint-disable @typescript-eslint/no-explicit-any */



export const setEnglishNames = (documents: any) => {
    try {
        const englishNamesArray: { fullNameEn: string ,nickNameEn:string,tadawalCode:string,sector:string,id:string}[] = [];
        const englishFormFiles: any[] = [];  // Separate array for English files
        for (const x of documents) {
            englishNamesArray.push({
                fullNameEn: x?.fullNameEn,
                nickNameEn:x?.nickNameEn,
                tadawalCode:x?.tadawalCode,
                sector:x?.sector,
                id:x?._id
            });
            if (x?.formData) englishFormFiles.push(x?.formData);  // Push file to English files array
        }
        englishNamesArray.sort((a, b) => a.nickNameEn.localeCompare(b.nickNameEn));
        return { englishNamesArray, englishFormFiles };
    } catch (error: any) {
        console.log(error);
        return { englishNamesArray: [], englishFiles: [] };
    }
};
