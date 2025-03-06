import { createSlice } from "@reduxjs/toolkit";

import { addDocumentEnglish } from "../../actions/admin/addDocumentAction";
import { UpdateDocumentEnglish } from "../../actions/admin/updateEnglishDocument";
// import { MyObject } from "../../../interfaces/admin/addDoument";


export interface AddDocumentState {
    error: string | null;
    loading: boolean;
}

const initialState:AddDocumentState ={
    error: null,
    loading: false,
}

export const AddDocumentSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
      updateError: (state, { payload }) => {
        state.error = payload;
      },
    },
    extraReducers: (builder) => {
      builder  
      .addCase(addDocumentEnglish.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addDocumentEnglish.fulfilled, (state, { payload }) => {
          console.log("inshaallah log of the payload ", payload);
          state.loading = false;
          state.error = null;
        })
        .addCase(addDocumentEnglish.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload as string;
        })


      .addCase(UpdateDocumentEnglish.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(UpdateDocumentEnglish.fulfilled, (state, { payload }) => {
          console.log("updateDocumentEnglish log of the payload ", payload);
          state.loading = false;
          state.error = null;
        })
        .addCase(UpdateDocumentEnglish.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload as string;
        })



  
    },
  });
  
  
  
  export const {updateError}= AddDocumentSlice.actions
  export default AddDocumentSlice