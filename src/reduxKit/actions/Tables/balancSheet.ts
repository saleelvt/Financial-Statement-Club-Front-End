/* eslint-disable @typescript-eslint/no-explicit-any */

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../../config/constants";



export const axiosIn = axios.create({
    baseURL: URL,
  });


export const setBalanceSheetDataAction = createAsyncThunk(
    "admin/setBalanceSheetDataAction",
    async (data:any, { rejectWithValue }) => {
      try { 
         return data
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


  
  