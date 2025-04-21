import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Initial State
const initialState = {
  isLoading: false, // API Call Loading State
  shoppingProductList: [], // Store for Product List
  productDetails: [], // Store for Single Product Details
};

// Fetch Products with Filters & Sorting
export const getShoppingProduct = createAsyncThunk(
  "/shoppingProduct/get",
  async ({ filterParams, sortParams }) => {
    try {
      const query = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      });

      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URI
        }/api/shopping/product/list?${query}`,
        { withCredentials: true }
      );
      return response?.data;
    } catch (error) {
      console.error("Error Fetching Products:", error.response);
      return error.response?.data;
    }
  }
);

// Fetch Single Product Details by ID
export const fetchProductDetails = createAsyncThunk(
  "/shoppingProduct/fetchProductDetails",
  async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/shopping/product/list/${id}`,
        { withCredentials: true }
      );
      return response?.data;
    } catch (error) {
      console.error("Error Fetching Product Details:", error.response);
      return error.response?.data;
    }
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProduct",
  initialState,
  reducers: {}, // No direct reducers, only async operations
  extraReducers: (builder) => {
    builder
      // Handle Product List Fetching
      .addCase(getShoppingProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShoppingProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shoppingProductList = action.payload.productList;
      })
      .addCase(getShoppingProduct.rejected, (state) => {
        state.isLoading = false;
        state.shoppingProductList = [];
      })

      //Handle Single Product Details Fetching
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export default shoppingProductSlice.reducer;
