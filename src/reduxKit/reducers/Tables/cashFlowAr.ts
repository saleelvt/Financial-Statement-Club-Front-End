/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

import { SetCashFlowDataArabicAction } from "../../actions/Tables/cashFlowAr";


 export interface  AddTableArState{
    error: string | null;
    loading: boolean;
    cashFlowDataAr:any

}

const initialState: AddTableArState={
    error: null,
    loading: false,
    cashFlowDataAr:null,
}

 export const setCashFlowArDataSlice = createSlice({ 
    name: "admin",
    initialState,
    reducers: {
      updateError: (state, { payload }) => {
        state.error = payload;
      },
    },
    extraReducers: (builder) => {
      builder  
      .addCase(SetCashFlowDataArabicAction.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(SetCashFlowDataArabicAction.fulfilled, (state, { payload }) => {
          state.loading = false;
          state.error = null;
          state.cashFlowDataAr=payload
        }) 
        .addCase(SetCashFlowDataArabicAction.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload as string;
        })
  
    },
  });
  
  
  
  export const {updateError}= setCashFlowArDataSlice.actions
  export default setCashFlowArDataSlice