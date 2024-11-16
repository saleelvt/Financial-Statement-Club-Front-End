/* eslint-disable @typescript-eslint/no-explicit-any */

export interface MyObject {
  companyNameAr: string | null;
  companyNameEn: string | null;
  yearOfReport: string | null;
  fileAr: File | null; // File is the correct type for file inputs
  fileEn: File | null; // File is the correct type for file inputs
}
