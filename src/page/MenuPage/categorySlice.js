import { createSlice } from "@reduxjs/toolkit";

export const categoryManageSlice = createSlice({
  name: "categoryManageSlice",
  initialState: {
    listCategory: [],
  },
  reducers: {
    getCategoryRequest: (state) => {},
    getCategorySuccess: (state, action) => {
      state.listCategory = action.payload;
      state.isLoading = false;
    },
    getCategoryFailure: (state) => {
      return state;
    },
  },
});

export const { getCategoryRequest, getCategorySuccess, getCategoryFailure } =
  categoryManageSlice.actions;

export default categoryManageSlice.reducer;
