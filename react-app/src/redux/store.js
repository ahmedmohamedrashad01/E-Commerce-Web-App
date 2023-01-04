import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productsSlice";
import cartReducer from "./cartSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cartProduct: cartReducer,
  },
});
