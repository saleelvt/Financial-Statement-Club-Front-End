/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

import { SetProfitLossDataEnglishAction } from "../../actions/Tables/profitLossEn";



 export interface  AddTableEnState{
    error: string | null;
    loading: boolean;
    ProfitLossDataEn:any

}

const initialState: AddTableEnState={
    error: null,
    loading: false,
    ProfitLossDataEn:null,
}

 export const setProfitLossEnDataSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
      updateError: (state, { payload }) => {
        state.error = payload;
      },
    },
    extraReducers: (builder) => {
      builder  
      .addCase(SetProfitLossDataEnglishAction.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(SetProfitLossDataEnglishAction.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.error = null;
          state.ProfitLossDataEn=payload
        }) 
        .addCase(SetProfitLossDataEnglishAction.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload as string;
        })
  
    },
  });
  
  
  
  export const {updateError}= setProfitLossEnDataSlice.actions
  export default setProfitLossEnDataSlice