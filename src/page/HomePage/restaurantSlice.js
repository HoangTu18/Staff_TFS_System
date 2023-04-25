import { createSlice } from "@reduxjs/toolkit";

export const restaurantManageSlice = createSlice({
  name: "restaurantManageSlice",
  initialState: {
    restaurant: [],
  },
  reducers: {
    getRestaurantRequest: (state, action) => {},
    getRestaurantSuccess: (state, action) => {
      state.restaurant = action.payload;
      state.isLoading = false;
    },
    getRestaurantFailure: (state) => {
      return state;
    },
  },
});

export const {
  getRestaurantFailure,
  getRestaurantRequest,
  getRestaurantSuccess,
} = restaurantManageSlice.actions;

export default restaurantManageSlice.reducer;
