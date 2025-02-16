import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "../store/productSlice";

export const myStore = configureStore({
    reducer: {
		productSlice: productReducer,
    },
});