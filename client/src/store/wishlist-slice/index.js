import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  wishlistList: [],
};

export const createWishlist = createAsyncThunk(
  "/wishlist/createWishlist",
  async (wishlistData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/shopping/wishlist/create`,
        wishlistData
      );
      return response?.data;
    } catch (error) {
      console.log(error?.response?.data);
      return error?.response?.data;
    }
  }
);

export const fetchAllWishlist = createAsyncThunk(
  "/wishlist/fetchAllWishlist",
  async (userId) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URI
        }/api/shopping/wishlist/list/${userId}`
      );
      return response?.data;
    } catch (error) {
      console.log(error?.response?.data);
      return error?.response?.data;
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlistList = action?.payload?.success
          ? action?.payload?.wishlistList
          : [];
      })
      .addCase(fetchAllWishlist.rejected, (state) => {
        state.isLoading = false;
        state.wishlistList = [];
      });
  },
});

export default wishlistSlice.reducer;
