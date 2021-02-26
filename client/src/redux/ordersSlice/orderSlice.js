import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getOrders = createAsyncThunk('orders/getOrders', async () => {
    const response = await fetch("/api/admin/orders");

    return await response.json();
});

export const getOrder = createAsyncThunk('orders/getOrder', async (id) => {
    const response = await fetch(`/api/orders/${id}`);
    return await response.json();
});


const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        loading: true,
        error: "",
        orders: []
    },
    extraReducers: {
        [getOrders.pending]: (state, action) => {
            return { ...state, loading: true };
        },
        [getOrders.fulfilled]: (state, action) => {
            return {
                ...state,
                loading: false,
                orders: action.payload
            };
        },
        [getOrders.rejected]: (state, action) => {
            return { ...state, loading: false, error: action.error };
        },
        [getOrder.pending]: (state, action) => {
            return { ...state, loading: true };
        },
        [getOrder.fulfilled]: (state, action) => {
            return {
                ...state,
                loading: false,
                orders: action.payload
            };
        },
        [getOrder.rejected]: (state, action) => {
            return { ...state, loading: false, error: action.error };
        },
    }
});

export default ordersSlice.reducer;