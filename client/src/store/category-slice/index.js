import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial State
const initialState = {
  isLoading: false,
  categoryList: [],
};

// Add New Category
export const addNewCategory = createAsyncThunk(
  "/category/add",
  async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/admin/category/add`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error Adding Category:", error.response);
      return error.response?.data;
    }
  }
);

// Update Existing Category
export const updateCategory = createAsyncThunk(
  "/category/update",
  async ({ newFormData, id }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/api/admin/category/update/${id}`,
        newFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error Updating Category:", error.response);
      return error.response?.data;
    }
  }
);

// Delete Category
export const deleteCategory = createAsyncThunk(
  "/category/delete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URI}/api/admin/category/delete/${id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error Deleting Category:", error.response);
      return error.response?.data;
    }
  }
);

// Fetch All Categories
export const fetchAllCategory = createAsyncThunk("/category/list", async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/api/admin/category/list`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error Fetching Categories:", error.response);
    return error.response?.data;
  }
});

// Redux Slice for Categories
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle Adding a New Category
      .addCase(addNewCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewCategory.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewCategory.rejected, (state) => {
        state.isLoading = false;
      })

      // Handle Fetching Categories
      .addCase(fetchAllCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = action.payload.success
          ? action.payload.categoryList
          : [];
      })
      .addCase(fetchAllCategory.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default categorySlice.reducer;
