/* eslint-disable @typescript-eslint/no-explicit-any */

export const setEnglishNames = (documents: any) => {
    try {
        const englishNamesArray: { name: string, file: any }[] = [];
        const englishFiles: any[] = [];  // Separate array for English files
        for (const x of documents) {
            englishNamesArray.push({
                name: x?.companyNameEn,
                file: x?.fileEn, // Add the English file as well
            });
            if (x?.fileEn) englishFiles.push(x?.fileEn);  // Push file to English files array
        }
        return { englishNamesArray, englishFiles };
    } catch (error: any) {
        console.log(error);
        return { englishNamesArray: [], englishFiles: [] };
    }
};
