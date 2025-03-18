import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminUploadingProgress } from "../../actions/admin/uploadingProgress";

export interface AdminProgressState {
  uploadProgress: number;
  error: string | null;
  loading: boolean;
}

const initialStateForProgress: AdminProgressState = {
  uploadProgress: 0,
  error: null,
  loading: false,
};

 const adminProgressSlice = createSlice({
  name: "adminProgress",
  initialState: initialStateForProgress,
  reducers: {
    updateError: (state, { payload }: PayloadAction<string | null>) => {
      state.error = payload;
    },
    setUploadProgress: (state, { payload }: PayloadAction<number>) => {
      state.uploadProgress = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AdminUploadingProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.uploadProgress = 0; // Reset progress when a new upload starts
      })
      .addCase(AdminUploadingProgress.fulfilled, (state) => {
        state.loading = false;
        state.uploadProgress = 100; // Ensure completion state
        state.error = null;
      })
      .addCase(AdminUploadingProgress.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
        state.uploadProgress = 0; // Reset progress on failure
      });
  },
});

// Export actions
export const { updateError, setUploadProgress } = adminProgressSlice.actions;
export default adminProgressSlice.reducer;
