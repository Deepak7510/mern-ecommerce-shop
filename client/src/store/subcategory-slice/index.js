import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  subCategoryList: [],
};

export const addSubCategory = createAsyncThunk(
  "/subcategory/add",
  async (formData) => {
    console.log(formData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/admin/subcategory/add`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("Axios Error:", error.response);
      return error.response.data;
    }
  }
);

export const updateSubCategory = createAsyncThunk(
  "/subcategory/update",
  async ({ formData, id }) => {
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_BACKEND_URI
        }/api/admin/subcategory/update/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("Axios Error:", error.response);
      return error.response.data;
    }
  }
);

export const deleteSubCategory = createAsyncThunk(
  "/subcategory/delete",
  async (id) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URI
        }/api/admin/subcategory/delete/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("Axios Error:", error.response);
      return error.response.data;
    }
  }
);

export const fetchAllSubCategory = createAsyncThunk(
  "/subcategory/list",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/admin/subcategory/list`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("Axios Error:", error.response);
      return error.response.data;
    }
  }
);

const subCategorySlice = createSlice({
  name: "subcategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSubCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllSubCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subCategoryList = action.payload.success
          ? action.payload.subCategoryList
          : [];
      })
      .addCase(fetchAllSubCategory.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default subCategorySlice.reducer;
