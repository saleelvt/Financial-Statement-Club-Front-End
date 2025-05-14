/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL,createAxiosConfig } from "../../../config/constants";



export const axiosIn = axios.create({
    baseURL: URL,
  });

  export interface dataI {
    tadawalCode :string,
    language:string
      data:any
      selectedYear:string
      quarterYear:string
      selectedTableType:string
  }
export const AdminAddTableAction = createAsyncThunk(
    "admin/addTable",
    async (data:dataI, { rejectWithValue }) => {
      try {
        console.log("The current action of the Last submition Data of the Table : ", data );
        
           const response= await axiosIn.post(`/api/v1/admin/addTable`,data,createAxiosConfig(true))
           console.log("the response ",response);
           
        return response.data  
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue({ message: "Something went wrong!" });
        }
      }
    }
  );


  
  