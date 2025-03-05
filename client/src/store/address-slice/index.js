import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    addressList: []
}

export const addAddress = createAsyncThunk('addresses/addNewAddress', async (formData) => {
    try {
        const response = await axios.post('http://localhost:8000/api/shopping/address/add', formData);
        return response.data
    } catch (error) {
        console.error(error.response.data)
        return error.response.data
    }
});

export const updateAddress = createAsyncThunk('addresses/updateAddress', async ({ userId, addressId, formData }) => {
    try {
        const response = await axios.put(`http://localhost:8000/api/shopping/address/update/${userId}/${addressId}`, formData);
        return response.data
    } catch (error) {
        console.error(error.response.data)
        return error.response.data
    }
});

export const deleteAddress = createAsyncThunk('addresses/deleteAddress', async ({ userId, addressId }) => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/shopping/address/delete/${userId}/${addressId}`);
        return response.data
    } catch (error) {
        console.error(error.response.data)
        return error.response.data
    }
});

export const fetchAddress = createAsyncThunk('addresses/fetchAddress', async (userId) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/shopping/address/get/${userId}`);
        return response.data
    } catch (error) {
        console.error(error.response.data)
        return error.response.data
    }
})


const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(addAddress.pending, (state => {
            state.isLoading = true
        })).addCase(addAddress.fulfilled, ((state, action) => {
            state.isLoading = false
        })).addCase(addAddress.rejected, (state => {
            state.isLoading = false
            state.addressList = []
        })).addCase(fetchAddress.pending, (state => {
            state.isLoading = true
        })).addCase(fetchAddress.fulfilled, ((state, action) => {
            state.isLoading = false
            state.addressList = action.payload.data
        })).addCase(fetchAddress.rejected, (state => {
            state.isLoading = false
            state.addressList = []
        }))
    }
})


export default addressSlice.reducer