
import axios  from "axios";
import { URL, createAxiosConfig ,config} from "../../../config/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
// import { adminOtpinterface } from "../../../interfaces/admin/login";
import { IAdminLogin } from "../../../interfaces/admin/login";

export interface IAdminVerifyOtp{
  email:string | null | undefined;
  otp:string;

}



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
            const {data} = await axiosIn.post(`/api/v1/admin/login`, adminCredentials,config1);
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




  export const adminVerifyOtp = createAsyncThunk(  
    "admin/verifyOtp",
    async ( { email,  otp}:IAdminVerifyOtp, { rejectWithValue }) => {
      try {
        const  response= await axiosIn.post(`/api/v1/admin/verifyOtp`,{email:email!,otp}, config )
        console.log("the otp verification data : ", response );       
        return response;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
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
      axiosIn.delete(`/api/v1/admin/logout`, config )
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



