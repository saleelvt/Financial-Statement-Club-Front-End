


import { createAsyncThunk } from "@reduxjs/toolkit";

export const AdminLanguageChange = createAsyncThunk(
    "admin/languageChange",
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
  