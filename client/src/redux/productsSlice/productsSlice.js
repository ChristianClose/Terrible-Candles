import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    const response = await fetch("/api/products");

    return await response.json();
});

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        loading: true,
        error: "",
        products: []
    },
    extraReducers: {
        [getProducts.pending]: (state, action) => {
            return { ...state, loading: true };
        },
        [getProducts.fulfilled]: (state, action) => {
            return {
                ...state,
                loading: false,
                products: action.payload
            };
        },
        [getProducts.rejected]: (state, action) => {
            return { ...state, loading: false, error: action.error };
        }
    }
});

export default productsSlice.reducer;