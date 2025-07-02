/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth/authSlice";
import { AddDocumentSlice } from "./reducers/admin/addDocumentSlice";
import { userLanguageSlice } from "./reducers/auth/authSlice";
import { adminLanguageSlice } from "./reducers/admin/adminLanguage";
import { AddArabicDocumentSlice } from "./reducers/admin/addDocumentArabic";
import setBalanceSheetDataSlice from "./reducers/Tables/balanceSheet";
import setBalanceSheetDataArSlice from "./reducers/Tables/balanceSheetAr";
import setCashFlowEnDataSlice from "./reducers/Tables/cashFlowEn";
import setCashFlowArDataSlice from "./reducers/Tables/cashFlowAr";
import setProfitLossArDataSlice from "./reducers/Tables/cashFlowAr";
import setProfitLossEnDataSlice from "./reducers/Tables/profitLossEn";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,  
    adminEn: AddDocumentSlice.reducer,
    adminAr: AddArabicDocumentSlice.reducer,
    userLanguage: userLanguageSlice.reducer,
    adminLanguage: adminLanguageSlice.reducer,
    table:setBalanceSheetDataSlice.reducer,
    tableAr:setBalanceSheetDataArSlice.reducer,
    cashFlowEn:setCashFlowEnDataSlice.reducer,
    cashFlowAr:setCashFlowArDataSlice.reducer,
    profitLossEn:setProfitLossEnDataSlice.reducer,
    profitLossAr:setProfitLossArDataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ExtendedAppDispatch = (action: any) => any;
export default store;
