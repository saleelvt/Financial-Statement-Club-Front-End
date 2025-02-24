
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../config/constants";


export const axiosIn = axios.create({
    baseURL: URL,
  });

  export interface dataI {
    tadawalCode :string,
     nickName:string
      screenshotFile:File
  }
export const AdminAddTableAction = createAsyncThunk(
    "admin/addTable",
    async (data:dataI, { rejectWithValue }) => {
      try {
        console.log("the current tghe data aof hte ", data );
        
           const response= await axiosIn.post(`/api/v1/admin/addTable`)
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
  