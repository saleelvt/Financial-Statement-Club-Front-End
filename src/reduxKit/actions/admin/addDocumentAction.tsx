import axios  from "axios";
import { URL,config } from "../../../config/constants";

import { createAsyncThunk } from "@reduxjs/toolkit";

import { FieldKey } from "../../../interfaces/admin/addDoument";

import { FormField } from "../../../interfaces/admin/addDoument";



export const axiosIn = axios.create({
    baseURL: URL,
  });
  

  interface DocumentPayload {
    fullNameEn: string;
    nickNameEn: string;
    tadawalCode: string;
    sector: string;
    formData: Record<FieldKey, FormField>;
  }



  export const addDocumentEnglish= createAsyncThunk(
    "admin/addDocument",
    async (adminCredentials:DocumentPayload,{rejectWithValue})=>{
        try {
            console.log(
              "this is for add the document )))))))))))))))))) ",
              adminCredentials
            );
            console.log("------------------");
            const response = await axiosIn.post(`/admin/addDocument`, adminCredentials,config);
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
