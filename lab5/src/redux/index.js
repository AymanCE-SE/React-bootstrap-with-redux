import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../store/productSlice";
import { userReducer } from "../store/userSlice";
import { cartReducer } from "../store/cartSlice";

export const myStore = configureStore({
    reducer: {
		productSlice: productReducer,
    userSlice: userReducer,
    // cartSlice: cartReducer,
    },
});