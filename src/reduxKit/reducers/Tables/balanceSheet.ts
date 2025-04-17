/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

import { setBalanceSheetDataAction } from "../../actions/Tables/balancSheet";



 export interface  AddArabicDocumentState{
    error: string | null;
    loading: boolean;
    data:any
}

const initialState: AddArabicDocumentState={
    error: null,
    loading: false,
    data:null
}

 export const setBalanceSheetDataSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
      updateError: (state, { payload }) => {
        state.error = payload;
      },
    },
    extraReducers: (builder) => {
      builder  
      .addCase(setBalanceSheetDataAction.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(setBalanceSheetDataAction.fulfilled, (state, { payload }) => {
          console.log("The TAble data values :  ", payload);
          state.loading = false;
          state.error = null;
          state.data=payload
        }) 
        .addCase(setBalanceSheetDataAction.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload as string;
        })
  
    },
  });
  
  
  
  export const {updateError}= setBalanceSheetDataSlice.actions
  export default setBalanceSheetDataSlice