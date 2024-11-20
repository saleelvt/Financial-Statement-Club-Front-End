import { createSlice } from "@reduxjs/toolkit";

import { addDocument } from "../../actions/admin/addDocumentAction";
// import { MyObject } from "../../../interfaces/admin/addDoument";


interface document{
    error: string | null;
    loading: boolean;
}

const initialState:document={
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
      .addCase(addDocument.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addDocument.fulfilled, (state, { payload }) => {
          console.log("inshaallah log of the payload ", payload);
          state.loading = false;
          state.error = null;
        })
        .addCase(addDocument.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload as string;
        })
  
    },
  });
  
  
  
  export const {updateError}= AddDocumentSlice.actions
  export default AddDocumentSlice