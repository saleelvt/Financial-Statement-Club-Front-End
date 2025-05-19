/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

import { setBalanceSheetDataArAction } from "../../actions/Tables/balanceSheetAr";



 export interface  AddTableArState{
    error: string | null;
    loading: boolean;
    dataAr:any

}

const initialState: AddTableArState={
    error: null,
    loading: false,
    dataAr:null,
   
}

 export const setBalanceSheetDataArSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
      updateError: (state, { payload }) => {
        state.error = payload;
      },
    },
    extraReducers: (builder) => {
      builder  
      .addCase(setBalanceSheetDataArAction.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(setBalanceSheetDataArAction.fulfilled, (state, { payload }) => {
          console.log("the ARabic REdux Updated data  :  ", payload);
          state.loading = false;
          state.error = null;
          state.dataAr=payload
        }) 
        .addCase(setBalanceSheetDataArAction.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload as string;
        })
  
    },
  });
  
  
  
  export const {updateError}= setBalanceSheetDataArSlice.actions
  export default setBalanceSheetDataArSlice