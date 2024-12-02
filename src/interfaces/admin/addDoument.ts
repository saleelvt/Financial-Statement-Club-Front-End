/* eslint-disable @typescript-eslint/no-explicit-any */


export type FieldKey = "Q1" | "Q2" | "Q3" | "Q4" | "S1" | "Board" | "Year";

export interface FormField {
 file: File | null;
 date: Date | null;
 year: string;
}

export interface FormDataState {
 Q1: FormField;
 Q2: FormField;
 Q3: FormField;
 Q4: FormField;
 S1: FormField;
 Board: FormField;
 Year: FormField;
}

export interface DocumentSlice {
 fullNameEn: string;
 nickNameEn: string;
 tadawalCode: string;
 sector: string;
 formData: FormDataState;
}
export interface DocumentSliceAr {
 fullNameAr: string;
 nickNameAr: string;
 tadawalCode: string;
 sector: string;
 formData: FormDataState;
}
