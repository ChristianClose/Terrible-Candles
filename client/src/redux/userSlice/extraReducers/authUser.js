import {createAsyncThunk } from '@reduxjs/toolkit';
export const authUser = createAsyncThunk('users/authUser', async (userInfo) => {
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    };
    const response = await fetch("/api/users/login", options);
    if (response.status >= 400) {
        const { message } = await response.json();
        throw new Error(message);
    } else {
        return await response.json();
    }

});

export const authUserExtraReducers = {
    [authUser.pending]: (state, action) => {
        return { ...state, loading: true };
    },
    [authUser.fulfilled]: (state, action) => {
        return {
            ...state,
            loading: false,
            users: [action.payload]
        };
    },
    [authUser.rejected]: (state, action) => {
        return { ...state, loading: false, error: action.error.message };
    },
}