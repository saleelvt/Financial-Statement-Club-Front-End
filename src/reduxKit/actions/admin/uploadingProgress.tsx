


import { createAsyncThunk } from "@reduxjs/toolkit";

export const AdminUploadingProgress = createAsyncThunk(
    "admin/AdminUploadingProgress",
    async (progress:number, { rejectWithValue }) => {
      try {
           const language=progress
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
  



  import { AppDispatch } from "../../store";



export const handleUploadProgress = (dispatch: AppDispatch) => {

  
  return (progressEvent: ProgressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / (progressEvent.total || 1)
    );
    dispatch(AdminUploadingProgress(percentCompleted)); // ✅ Dispatch progress update
  };
};
