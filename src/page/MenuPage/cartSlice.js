import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { CART } from "../../utils/constant";

const initialState = {
  cartItems: [],
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity += 1;
      } else {
        const tmpProduct = { ...action.payload, quantity: 1 };
        state.cartItems.push(tmpProduct);
      }
      toast.success("Đã thêm món ăn vào giỏ", { position: "top-center" });
      // localStorage.setItem(CART, JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      } else if (state.cartItems[itemIndex].quantity === 1) {
        const nextCartItem = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = nextCartItem;
      }
      // localStorage.setItem(CART, JSON.stringify(state.cartItems));
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;
          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );
      state.cartTotalAmount = total;
    },
    deleteCart(state, action) {
      return {
        ...state,
        cartItems: [],
        cartTotalAmount: 0,
      };
    },
  },
});
export const { addToCart, decreaseCart, getTotals, deleteCart } =
  cartSlice.actions;
export default cartSlice.reducer;
