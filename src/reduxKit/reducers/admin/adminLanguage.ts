
import { createSlice } from "@reduxjs/toolkit";
import { AdminLanguageChange } from "../../actions/admin/adminLanguage";



export interface AdminLanguageState {
    adminLanguage:string|null
    error: string | null;
    loading: boolean;
  }


  const initialStateForLanguage: AdminLanguageState = {
    adminLanguage:JSON.parse(localStorage.getItem("adminLanguage") || `"English"`),
    error: null,
    loading: false,
  };
  

  
  export const adminLanguageSlice = createSlice({
    name: "/adminLanguage",
    initialState: initialStateForLanguage,
    reducers: {
      updateError: (state, { payload }) => {
        state.error = payload;
      },
    },

    extraReducers: (builder) => {
      builder
        .addCase(AdminLanguageChange.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(AdminLanguageChange.fulfilled, (state, { payload }) => {
          console.log("Payload after language change:", payload);
          state.loading = false;
          state.error = null;
          state.adminLanguage = payload;
          localStorage.setItem("adminLanguage", JSON.stringify(state.adminLanguage));
        })
        .addCase(AdminLanguageChange.rejected, (state, { payload }) => {
          state.loading = false;
          state.error = payload as string;
        });
    },
  });
  
  
  
  