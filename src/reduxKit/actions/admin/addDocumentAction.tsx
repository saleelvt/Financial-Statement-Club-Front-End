import axios  from "axios";
import { URL,config } from "../../../config/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { MyObject } from "../../../interfaces/admin/addDoument";


export const axiosIn = axios.create({
    baseURL: URL,
  });
  

  export const addDocument= createAsyncThunk(
    "admin/addDocument",
    async (adminCredentials:FormData,{rejectWithValue})=>{
        try {
            console.log(
              "this is for add the document ",
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
