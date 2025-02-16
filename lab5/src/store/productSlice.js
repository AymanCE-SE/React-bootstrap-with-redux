import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	addNewProduct,
	deleteProduct,
	getAllProducts,
} from "../api/productapi";

const initialState = {
	products: [],
	isLoading: true,
	errors: null,
};

export const getAllProductsAction = createAsyncThunk(
	"product/getAllProductsAction",

	async (args, thunkAPI) => {
		const { rejectWithValue } = thunkAPI;
		try {
			let response = await getAllProducts();
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const deleteProductAction = createAsyncThunk(
	"product/deleteProductAction",
	async (productId, { rejectWithValue }) => {
		try {
			await deleteProduct(productId);
			return productId;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const addProductAction = createAsyncThunk(
	"product/addProductAction",
	async (product, { rejectWithValue }) => {
		try {
			let response = await addNewProduct(product);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllProductsAction.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(getAllProductsAction.fulfilled, (state, action) => {
			state.isLoading = false;
			state.products = action.payload;
		});
		builder.addCase(getAllProductsAction.rejected, (state, action) => {
			state.isLoading = false;
			state.errors = action.payload;
		});
		builder.addCase(deleteProductAction.fulfilled, (state, action) => {
			state.products = state.products.filter(
				(product) => product.id != action.payload
			);
		});
	},
});

export const productReducer = productSlice.reducer;