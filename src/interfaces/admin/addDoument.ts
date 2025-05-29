/* eslint-disable @typescript-eslint/no-explicit-any */


export type FieldKey = "Q1" | "Q2" | "Q3" | "Q4" | "S1" | "Board" | "Year";

export interface FormField {
  file?: string | File | null;
  date?: Date | null;
  year?: string;
  table?: {
    BalanceSheet?: any |null; 
    CashFlow?: any|null  
    ProfitLoss?: any|null
  };
  createAt?:string 
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

export interface DocumentSliceAr {
  _id?:string;
 fullNameAr: string;
 nickNameAr: string;
 tadawalCode: string;
 sector: string;
 formData: FormDataState;
 createdAt: string; // Add this line

}

export interface DocumentSliceEn  {
  _id?:string;
 fullNameEn: string;
 nickNameEn: string;
 tadawalCode: string;
 sector: string;
 formData: FormDataState;
 createdAt: string; // Add this line

}




export interface DocumentSliceAdminAr {
  _id?:string;
 fullNameAr: string;
 nickNameAr: string;
 tadawalCode: string;
 sector: string;
 createdAt: string; // Add this line

}

export interface DocumentSliceAdminEn  {
  _id?:string;
 fullNameEn: string;
 nickNameEn: string;
 tadawalCode: string;
 sector: string;

 createdAt: string; // Add this line

}





export interface ShowDocumentSliceForUser {
  fullName: string;
 nickName: string;
  tadawalCode: string;
  sector: string;
 }
