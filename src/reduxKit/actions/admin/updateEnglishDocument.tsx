import axios from "axios";
import { URL } from "../../../config/constants";
import { createAxiosConfig } from "../../../config/constants";
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

export const UpdateDocumentEnglish = createAsyncThunk(
  "admin/update doc ",
  async ( { id, language, adminCredentials }:{ id: string; language: string; adminCredentials: DocumentPayload }, { rejectWithValue }) => {
    try {

        console.log("adminCredentials", adminCredentials);
        
      const formData = new FormData();
      for (const [key, value] of Object.entries(
        adminCredentials?.formData
      )) {

        if (
          value &&
          typeof value === "object" &&
          "file" in value &&
          value.file
        ) {
          if (typeof value.file === "string" || value.file instanceof File) {
            formData.append(key, value.file);
          } else {
            console.warn(`Invalid file type for key: ${key}`);
          }
          
          if (value.date instanceof Date) {
            formData.append(`${key}Date`, value.date.toISOString());
          } else {
            console.warn(`Invalid or missing date for key: ${key}`);
          }
          if (typeof value.year === "string") {
            formData.append(`${key}Year`, value.year);
          } else {
            console.warn(`Invalid or missing year for key: ${key}`);
          }
        } else {
          console.warn(`Skipping key: ${key}, value is null or invalid`);
        }
      }

      // Append other data
      formData.append("fullNameEn", adminCredentials?.fullNameEn);
      formData.append("nickNameEn", adminCredentials?.nickNameEn);
      formData.append("tadawalCode", adminCredentials?.tadawalCode);
      formData.append("sector", adminCredentials?.sector);
      console.log("FormData contents:");
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      console.log("this is my data ++++++++++++ updating " , formData);
      const response = await axiosIn.put(`/admin/updateDocumentEnglish?id=${id}&language=${language}`,formData,createAxiosConfig(true)
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: "Something went wrong!" });
    }
  }
);
