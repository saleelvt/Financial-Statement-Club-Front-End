/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { loginAdmin, adminLogout, userLanguageChange,adminVerifyOtp } from "../../actions/auth/authAction";

export interface UserState {
  userData: UserState | null;
  error: string | null;
  loading: boolean;
  role: string | null;
  status?: string | null;
  isLogged: boolean;
  _id?: string | null;
  email?: string | null;
}

const safeParse = (key: string, fallback: any = null) => {
  const value = localStorage.getItem(key);
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
   console.log("Error while parsing local storage value for key: ", error);
   
    return fallback;
  }
};

const initialState: UserState = {
  userData: safeParse("user"),
  error: null,
  loading: false,
  role: safeParse("role"),
  email: safeParse("email"),
  isLogged: safeParse("isLogged", false),
  status: safeParse("status"),
  _id: safeParse("_id"),
};

export interface UserLanguageState {
  userLanguage: string | null;
  error: string | null;
  loading: boolean;
}

const initialStateForLanguage: UserLanguageState = {
  userLanguage: safeParse("userLanguage", "English"), // Default to "English"
  error: null,
  loading: false,
};

export const userLanguageSlice = createSlice({
  name: "/userLanguage",
  initialState: initialStateForLanguage,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },


  extraReducers: (builder) => {
    builder
      .addCase(userLanguageChange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLanguageChange.fulfilled, (state, { payload }) => {
        console.log("Payload after language change:", payload);
        state.loading = false;
        state.error = null;
        state.userLanguage = payload;
        localStorage.setItem("userLanguage", JSON.stringify(state.userLanguage));
      })
      .addCase(userLanguageChange.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginAdmin.fulfilled, (state, { payload }) => {
        console.log("Login payload:", payload);
        state.loading = false;
        state.error = null;
        state.userData = payload;
        state.email = payload.email;
        state.role = payload.role;
        state.isLogged = false;
        localStorage.setItem("email", JSON.stringify(state.email));
        localStorage.setItem("role", JSON.stringify(state.role));
        localStorage.setItem("isLogged", JSON.stringify(state.isLogged));
        localStorage.setItem("user", JSON.stringify(state.userData));
        localStorage.setItem("status", JSON.stringify(payload.status));
      })

      .addCase(loginAdmin.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.role = null;
        state.error = payload as string;
      })



      .addCase(adminVerifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
       })
       .addCase(adminVerifyOtp.fulfilled, (state, { payload }) => {
        console.log("Login payload:", payload);
        state.loading = false;
        state.error = null;
        // state.userData = payload;
        // state.role = payload.role;
        state.isLogged = true;
        // localStorage.setItem("role", JSON.stringify(state.role));
        localStorage.setItem("isLogged", JSON.stringify(state.isLogged));
        // localStorage.setItem("user", JSON.stringify(state.userData));
        // localStorage.setItem("status", JSON.stringify(payload.status));
      })

      .addCase(adminVerifyOtp.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.role = null;
        state.error = payload as string;
        localStorage.clear();
      })




      .addCase(adminLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(adminLogout.fulfilled, (state) => {
        state.loading = false;
        state.isLogged = false;
        state.error = null;
        state.role = null;
        state.userData = null;
        localStorage.clear();
      })
      .addCase(adminLogout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export const { updateError } = authSlice.actions;
export default authSlice;
