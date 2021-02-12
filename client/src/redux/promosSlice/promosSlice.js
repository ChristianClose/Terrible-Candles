import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getPromos = createAsyncThunk('promos/getPromos', async () => {
    const response = await fetch("/api/promos");

    return await response.json();
});

const promoSlice = createSlice({
    name: 'promos',
    initialState: {
        loading: true,
        error: "",
        promos: null
    },
    extraReducers: {
        [getPromos.pending]: (state, action) => {
            return { ...state, loading: true };
        },
        [getPromos.fulfilled]: (state, action) => {
            return {
                ...state,
                loading: false,
                promos: action.payload
            };
        },
        [getPromos.rejected]: (state, action) => {
            return { ...state, loading: false, error: action.error };
        }
    }
});

export default promoSlice.reducer;