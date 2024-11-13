import axios  from "axios";
import { URL,config } from "../../../config/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { MyObject } from "../../../interfaces/admin/addDoument";


export const axiosIn = axios.create({
    baseURL: URL,
  });

  export const addDocument= createAsyncThunk(
    "admin/addDocument",
    async (adminCredentials:MyObject,{rejectWithValue})=>{
        try {
            console.log(
              "this is for add the document ",
              adminCredentials
            );
            const {data} = await axiosIn.post(`/admin/addDocument`, adminCredentials,config);

            console.log(data.data, "admin login response data");
            return data.data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            if (error.response && error.response.data) {
              return rejectWithValue(error.response.data.message);
            } else {
              return rejectWithValue({ message: "Something went wrong!" });
            }
          }
    }
  )
