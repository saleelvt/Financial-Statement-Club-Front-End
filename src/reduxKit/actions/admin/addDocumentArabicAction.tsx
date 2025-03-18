/* eslint-disable @typescript-eslint/no-unused-vars */
import axios  from "axios";
import {  URL, } from "../../../config/constants";
import { createAxiosConfig } from "../../../config/constants";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleUploadProgress } from "./uploadingProgress";

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
          console.log("the form data of the data : ", adminCredentials);
          
          const formDataf = adminCredentials.formData;
          // Check if at least one field is fully filled
          const isAnyFieldValid = Object.values(formDataf).some(
            (field) => field.file && field.date && field.year
          );
    
          if (!isAnyFieldValid) {
            return rejectWithValue({
              message:
                "At least one field (Q1, Q2, Q3, Q4, S1, Year, Board) must be fully filled with file, date, and year.",
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

            const response = await axiosIn.post(`/api/v1/admin/addDocumentArabic`,formData,createAxiosConfig(true));
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
