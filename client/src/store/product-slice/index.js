import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial State
const initialState = {
  isLoading: false,
  productList: [],
};

// Add New Product
export const addProduct = createAsyncThunk("/product/add", async (formData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URI}/api/admin/product/add`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error Adding Product:", error.response);
    return error.response?.data;
  }
});

// Fetch All Products
export const fetchAllProducts = createAsyncThunk(
  "/product/getAll",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/admin/product/list`,
        { withCredentials: true }
      );
      return response?.data;
    } catch (error) {
      console.error("Error Fetching Products:", error.response);
      return error.response?.data;
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  "/product/update",
  async ({ newFormData, id }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/api/admin/product/update/${id}`,
        newFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      return response?.data;
    } catch (error) {
      console.error("Error Updating Product:", error.response);
      return error.response?.data;
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk("/product/delete", async (id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URI}/api/admin/product/delete/${id}`,
      { withCredentials: true }
    );
    return response?.data;
  } catch (error) {
    console.error("Error Deleting Product:", error.response);
    return error.response?.data;
  }
});

// Admin Product Slice
const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetching All Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.productList;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default adminProductSlice.reducer;
