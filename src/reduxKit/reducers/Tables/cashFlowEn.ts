/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

import { SetCashFlowDataEnglishAction } from "../../actions/Tables/cashFlowEn";



 export interface  AddTableEnState{
    error: string | null;
    loading: boolean;
    cashFlowDataEn:any

}

const initialState: AddTableEnState={
    error: null,
    loading: false,
    cashFlowDataEn:null,
}

 export const setCashFlowEnDataSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
      updateError: (state, { payload }) => {
        state.error = payload;
      },
    },
    extraReducers: (builder) => {
      builder  
      .addCase(SetCashFlowDataEnglishAction.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(SetCashFlowDataEnglishAction.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.error = null;
          state.cashFlowDataEn=payload
        }) 
        .addCase(SetCashFlowDataEnglishAction.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload as string;
        })
  
    },
  });
  
  
  
  export const {updateError}= setCashFlowEnDataSlice.actions
  export default setCashFlowEnDataSlice