/* eslint-disable @typescript-eslint/no-unused-vars */
import axios  from "axios";
import {  URL, } from "../../../config/constants";
import { createAxiosConfig } from "../../../config/constants";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { FieldKey } from "../../../interfaces/admin/addDoument";

import { FormField } from "../../../interfaces/admin/addDoument";



export const axiosIn = axios.create({
    baseURL: URL,
  });
  interface DocumentPayload {
    fullNameAr: string;
    nickNameAr: string;
    tadawalCode: string;
    sector: string;
    formData: Record<FieldKey, FormField>;
  }


  export const addDocumentArabic= createAsyncThunk(
    "admin/addDocumentArabic",
    async (adminCredentials:DocumentPayload,{rejectWithValue})=>{
        try {
          const formDataf = adminCredentials.formData;
          const q1Field = formDataf?.Q1;
          if (!q1Field || !q1Field.file || !q1Field.date || !q1Field.year) {
            return rejectWithValue({
              message: "The Q1 field is required. Please fill in all Details Of Q1 .",
            });
          } 
    
           const formData = new FormData();
            for (const [key, value] of Object.entries(adminCredentials?.formData || {})) {
              if (value && typeof value === 'object' && 'file' in value && value.file) {
                if (typeof value.file === 'string' || value.file instanceof File) {
                  formData.append(key, value.file);
                } else {
                  console.warn(`Invalid file type for key: ${key}`);
                }
                if (value.date instanceof Date) {
                  formData.append(`${key}Date`, value.date.toISOString());
                } else {
                  console.warn(`Invalid or missing date for key: ${key}`);
                }
                if (typeof value.year === 'string') {
                  formData.append(`${key}Year`, value.year);
                } else {
                  console.warn(`Invalid or missing year for key: ${key}`);
                }
              } else {
                console.warn(`Skipping key: ${key}, value is null or invalid`);
              }
            }
            
            formData.append("fullNameAr", adminCredentials?.fullNameAr);
            formData.append("nickNameAr", adminCredentials?.nickNameAr);
            formData.append("tadawalCode", adminCredentials?.tadawalCode);
            formData.append("sector", adminCredentials?.sector);
            console.log("got hte datas in arabic side}}}}}}}}}}} ",adminCredentials);
            
            const response = await axiosIn.post(`/admin/addDocumentArabic`,formData,createAxiosConfig(true));
            return response.data ;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            if (error.response) {
              return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: "Something went wrong!" });
          }
    }
  )
