import { createSlice } from "@reduxjs/toolkit";

import { addDocumentArabic } from "../../actions/admin/addDocumentArabicAction";
// import { MyObject } from "../../../interfaces/admin/addDoument";


 export interface  AddArabicDocumentState{
    error: string | null;
    loading: boolean;
}

const initialState: AddArabicDocumentState={
    error: null,
    loading: false,
}

 export const AddArabicDocumentSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
      updateError: (state, { payload }) => {
        state.error = payload;
      },
    },
    extraReducers: (builder) => {
      builder  
      .addCase(addDocumentArabic.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addDocumentArabic.fulfilled, (state, { payload }) => {
          console.log("inshaallah log of the payload ", payload);
          state.loading = false;
          state.error = null;
        })
        .addCase(addDocumentArabic.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload as string;
        })
  
    },
  });
  
  
  
  export const {updateError}= AddArabicDocumentSlice.actions
  export default AddArabicDocumentSlice