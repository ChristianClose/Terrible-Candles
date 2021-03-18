import {createAsyncThunk } from '@reduxjs/toolkit';

export const updateUser = createAsyncThunk("users/updateUser", async(userInfo) => {
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    };

    const response = await fetch('/api/users', options);
    if(response.status >= 400){
        const {message} = await response.json();
        throw new Error(message);
    } else {
        return await response.json();
    }
})

export const updateUserExtraReducer = {
    [updateUser.pending]: (state, action) => {
        return { ...state, loading: true };
    },
    [updateUser.fulfilled]: (state, action) => {
        return {
            ...state,
            loading: false,
            message: action.payload.message,
            users: [action.payload.user]
        };
    },
    [updateUser.rejected]: (state, action) => {
        return { ...state, loading: false};
    }
}