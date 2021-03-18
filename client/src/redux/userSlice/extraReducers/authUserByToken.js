import {createAsyncThunk } from '@reduxjs/toolkit';

export const authUserByToken = createAsyncThunk("users/authUserByToken", async() => {
    const response = await fetch('/api/users/login');
    if(response.status >= 400){
        const {message} = await response.json();
        throw new Error(message);
    } else {
        return await response.json();
    }
})

export const authByTokenExtraReducer = {
    [authUserByToken.pending]: (state, action) => {
        return { ...state, loading: true };
    },
    [authUserByToken.fulfilled]: (state, action) => {
        return {
            ...state,
            loading: false,
            users: [action.payload]
        };
    },
    [authUserByToken.rejected]: (state, action) => {
        return { ...state, loading: false};
    },
    [authUserByToken.rejected]: (state, action) => {
        return { ...state, loading: false };
    },
}