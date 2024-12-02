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
            console.log( "this is for add the document )))))))))))))))))) ",adminCredentials );
            const formData = new FormData();
            for (const [key, value] of Object.entries(adminCredentials?.formData)) {
              if (value?.file) {
                formData.append(key, value?.file); // Appending file
                formData.append(`${key}Date`, value?.date!.toISOString()); // Appending date
                formData.append(`${key}Year`, value?.year); // Appending year
              } 
            }
            // Append other data
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
