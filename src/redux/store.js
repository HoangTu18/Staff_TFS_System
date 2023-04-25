import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";
import loadingReducer from "../component/Loading/LoadingSlice";
import orderReducer from "../page/OrderPage/orderSlice";
import categoryReducer from "../page/MenuPage/categorySlice";
import restaurantReducer from "../page/HomePage/restaurantSlice";
import cartReducer from "../page/MenuPage/cartSlice";
const saga = createSagaMiddleware();

const store = configureStore({
  reducer: {
    loading: loadingReducer,
    orderManage: orderReducer,
    categoryManage: categoryReducer,
    restaurantManage: restaurantReducer,
    cart: cartReducer,
  },
  middleware: [saga],
});

saga.run(rootSaga);
export default store;
