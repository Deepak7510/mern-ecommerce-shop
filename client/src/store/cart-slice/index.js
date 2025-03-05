import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    isLoading: false,
    cartItems: []
}

export const addToCart = createAsyncThunk('cart/addToCart', async ({ userId, productId, quantity, size }) => {
    try {
        const response = await axios.post('http://localhost:8000/api/shopping/cart/add', { userId, productId, quantity, size })
        return response?.data;
    } catch (error) {
        // console.error(error?.response?.data)
        return error?.response?.data;
    }
});

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async ({ userId }) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/shopping/cart/get/${userId}`)
        return response.data;
    } catch (error) {
        // console.error(error?.response?.data)
        return error?.response?.data;
    }
});

export const deleteCartItems = createAsyncThunk('cart/deleteCartItems', async ({ userId, productId }) => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/shopping/cart/delete/${userId}/${productId}`)
        return response?.data;
    } catch (error) {
        // console.error(error?.response?.data)
        return error?.response?.data;
    }
});

export const upadateCartQuantity = createAsyncThunk('cart/upadateCartQuantity', async ({ userId, productId, quantity, size }) => {
    try {
        const response = await axios.put('http://localhost:8000/api/shopping/cart/update-cart', { userId, productId, quantity, size })
        return response.data;
    } catch (error) {
        console.error(error)
        return response.data;
    }
});

const shoppingCartSilce = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            state.isLoading = true
        }).addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload.data
        }).addCase(addToCart.rejected, (state) => {
            state.isLoading = false
            state.cartItems = []
        }).addCase(fetchCartItems.pending, (state) => {
            state.isLoading = true
        }).addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload.success ? action.payload.data : []
        }).addCase(fetchCartItems.rejected, (state) => {
            state.isLoading = false
            state.cartItems = []
        }).addCase(upadateCartQuantity.pending, (state) => {
            // state.isLoading = true
        }).addCase(upadateCartQuantity.fulfilled, (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload.data
        }).addCase(upadateCartQuantity.rejected, (state) => {
            state.isLoading = false
            state.cartItems = []
        }).addCase(deleteCartItems.pending, (state) => {
            state.isLoading = true
        }).addCase(deleteCartItems.fulfilled, (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload.data
        }).addCase(deleteCartItems.rejected, (state) => {
            state.isLoading = false
            state.cartItems = []
        })
    }
})


export default shoppingCartSilce.reducer