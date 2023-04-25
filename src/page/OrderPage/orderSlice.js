import { createSlice } from "@reduxjs/toolkit";

export const orderManageSlice = createSlice({
  name: "orderManageSlice",
  initialState: {
    listOrder: [],
    customer: [],
    listCustomer: [],
  },
  reducers: {
    getOrderRequest: (state, action) => {},
    getOrderSuccess: (state, action) => {
      state.listOrder = action.payload;
      state.isLoading = false;
    },
    getOrderFailure: (state) => {
      return state;
    },
    getCustomerRequest: (state, action) => {},
    getCustomerSuccess: (state, action) => {
      state.customer = action.payload;
      state.isLoading = false;
    },
    getCustomerFailure: (state) => {
      return state;
    },
    getListCustomerRequest: (state) => {
      return state;
    },
    getListCustomerSuccess: (state, action) => {
      state.listCustomer = action.payload;
      state.isLoading = false;
    },
    getListCustomerFailure: (state) => {
      return state;
    },
    updateOrderRequest: (state, action) => {},
    // updateOrderSuccess: (state, action) => {
    //   state.listOrder = action.payload;
    // },
    updateOrderFail: (state) => {
      return state;
    },
    insertOrderRequest: (state, action) => {},
  },
});

export const {
  getOrderRequest,
  getOrderSuccess,
  getOrderFailure,
  getCustomerRequest,
  getCustomerSuccess,
  getCustomerFailure,
  getListCustomerRequest,
  getListCustomerSuccess,
  getListCustomerFailure,
  updateOrderRequest,
  updateOrderFail,
  insertOrderRequest,
} = orderManageSlice.actions;

export default orderManageSlice.reducer;
