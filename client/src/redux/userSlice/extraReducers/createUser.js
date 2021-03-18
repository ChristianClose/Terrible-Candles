import {createAsyncThunk } from '@reduxjs/toolkit';

export const createUser  = createAsyncThunk("users/createUser", async(userInfo) => {
    const options = {
        method: "POST",
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

export const createUserExtraReducer = {
        [createUser.pending]: (state, action) => {
            return { ...state, loading: true };
        },
        [createUser.fulfilled]: (state, action) => {
            return {
                ...state,
                loading: false,
                message: action.payload.message,
                users: [action.payload.user]
            };
        },
        [createUser.rejected]: (state, action) => {
            return { ...state, loading: false};
        }
}