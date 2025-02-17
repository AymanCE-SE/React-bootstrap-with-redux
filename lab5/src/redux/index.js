import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../store/productSlice";
// import { userReducer } from "../store/userSlice";

export const myStore = configureStore({
    reducer: {
		productSlice: productReducer
    // userSlice: userReducer
    },
});