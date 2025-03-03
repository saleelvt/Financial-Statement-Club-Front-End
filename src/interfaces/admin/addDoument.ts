/* eslint-disable @typescript-eslint/no-explicit-any */


export type FieldKey = "Q1" | "Q2" | "Q3" | "Q4" | "S1" | "Board" | "Year";

export interface FormField {
  file?: string | File | null;
  date?: Date | null;
  year?: string;
  table?: {
    BalanceSheet?: string |null; 
    CashFlow?: string|null
    ProfitLoss?: string|null
  };
}

export interface FormDataState {
 Q1: FormField;
 Q2: FormField;
 Q3: FormField;
 Q4: FormField;
 S1: FormField;
 Board: FormField;
 Year: FormField;
 [key: string]: FormField; // Add this line
}

export interface DocumentSliceEn  {
  _id?:string;
 fullNameEn: string;
 nickNameEn: string;
 tadawalCode: string;
 sector: string;
 formData: FormDataState;
}


export interface DocumentSliceAr {
  _id?:string;
 fullNameAr: string;
 nickNameAr: string;
 tadawalCode: string;
 sector: string;
 formData: FormDataState;
}

export interface ShowDocumentSliceForUser {
  fullName: string;
 nickName: string;
  tadawalCode: string;
  sector: string;
 }
