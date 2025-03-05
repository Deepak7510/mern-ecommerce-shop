import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    isLoading: false,
    brandList: []
}


export const addBrand = createAsyncThunk('/brand/add', async (formData) => {
    try {
        const response = await axios.post('http://localhost:8000/api/admin/brand/add', formData, {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.log("Axios Error:", error.response);
        return error.response.data;
    }
})

export const updateBrand = createAsyncThunk('/brand/update', async ({ formData, id }) => {
    try {
        const response = await axios.put(`http://localhost:8000/api/admin/brand/update/${id}`, formData, {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.log("Axios Error:", error.response);
        return error.response.data;
    }
})

export const deleteBrand = createAsyncThunk('/brand/delete', async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/admin/brand/delete/${id}`, {}, {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.log("Axios Error:", error.response);
        return error.response.data;
    }
});

export const fetchAllBrand = createAsyncThunk('/brand/list', async () => {
    try {
        const response = await axios.get(`http://localhost:8000/api/admin/brand/list`, {
            withCredentials: true
        })
        return response.data;
    } catch (error) {
        console.log("Axios Error:", error.response);
        return error.response.data;
    }
})

const brandSlice = createSlice({
    name: 'brand',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllBrand.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchAllBrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.brandList = action.payload.success ? action.payload.brandList : []
        }).addCase(fetchAllBrand.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export default brandSlice.reducer