import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviewDetails: {},
};

export const createReview = createAsyncThunk(
  "/shop/review/create",
  async (reviewData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/shopping/review/create`,
        reviewData
      );
      return response?.data;
    } catch (error) {
      console.error("Create Order Error", error?.response?.data);
      return error?.response?.data;
    }
  }
);

export const fetchProductReview = createAsyncThunk(
  "/shop/review/fetchProductReview",
  async ({ productId, limitValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URI
        }/api/shopping/review/list/${productId}/${limitValue}`
      );
      return response?.data;
    } catch (error) {
      console.error("Create Order Error", error?.response?.data);
      return error?.response?.data;
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReview.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createReview.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchProductReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviewDetails = action?.payload?.reviewDetails;
      })
      .addCase(fetchProductReview.rejected, (state) => {
        state.reviewDetails = {};
        state.isLoading = false;
      });
  },
});

export default reviewSlice.reducer;
