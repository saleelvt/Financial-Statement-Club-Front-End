
import axios  from "axios";
import { URL, createAxiosConfig ,config} from "../../../config/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { IAdminLogin } from "../../../interfaces/admin/login";


export const axiosIn = axios.create({
    baseURL: URL,
  });




  export const loginAdmin= createAsyncThunk(
    "admin/login",
    async (adminCredentials:IAdminLogin,{rejectWithValue})=>{
        try {
            console.log(
              "admin action got this si smy credential",
              adminCredentials
            );
            const config1= createAxiosConfig(false) 
            const {data} = await axiosIn.post(`/admin/login`, adminCredentials,config1);

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

  
export const adminLogout = createAsyncThunk(
  "admin/logout",
  async (__, { rejectWithValue }) => {
    try {

      axiosIn.delete(`admin/logout`, config )
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





export const userLanguageChange = createAsyncThunk(
  "admin/language change",
  async (lang:string, { rejectWithValue }) => {
    try {
         const language=lang
      return language 
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
