/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

import { SetProfitLossDataArabicAction } from "../../actions/Tables/profitLossAr";


 export interface  AddTableArState{
    error: string | null;
    loading: boolean;
    ProfitLossDataAr:any

}

const initialState: AddTableArState={
    error: null,
    loading: false,
    ProfitLossDataAr:null,
}

 export const setProfitLossArDataSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
      updateError: (state, { payload }) => {
        state.error = payload;
      },
    },
    extraReducers: (builder) => {
      builder  
      .addCase(SetProfitLossDataArabicAction.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(SetProfitLossDataArabicAction.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.error = null;
          state.ProfitLossDataAr=payload
        }) 
        .addCase(SetProfitLossDataArabicAction.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload as string;
        })
  
    },
  });
  
  
  
  export const {updateError}= setProfitLossArDataSlice.actions
  export default setProfitLossArDataSlice