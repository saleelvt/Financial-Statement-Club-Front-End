/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { URL, } from "./constants";
 export const instance = axios.create({
    baseURL:URL,
     withCredentials:true,
     timeout: 300000, // 5-minute timeout for large uploads
     maxBodyLength: 200 * 1024 * 1024, // 100MB max body size
       maxContentLength: 100 * 1024 * 1024, // 100MB max content length
})

export const commonRequest= async(
    method:string,
    route: any,
    config: any,
    body?: any
)=>{
    const requestConfig = {
        method,
        url: route,
        headers: config,
        data: body,
      };
      try {
        const response= await  instance({...requestConfig})
        return response
      }  catch (error: any) {
        return error;
      }
}