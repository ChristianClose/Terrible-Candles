import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getReviews = createAsyncThunk('reviews/getReviews', async () => {
    const response = await fetch("/api/reviews");
    return await response.json();
});

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        loading: true,
        error: "",
        reviews: null
    },
    extraReducers: {
        [getReviews.pending]: (state, action) => {
            return { ...state, loading: true };
        },
        [getReviews.fulfilled]: (state, action) => {
            return {
                ...state,
                loading: false,
                reviews: action.payload
            };
        },
        [getReviews.rejected]: (state, action) => {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }
    }
});

export default reviewsSlice.reducer;