import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const authUser = createAsyncThunk('users/authUser', async (userInfo) => {

    console.log(userInfo);
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

const userSlice = createSlice({
    name: 'users',
    initialState: {
        loading: true,
        error: "",
        open: false,
        users: []
    },
    reducers: {
        setLoginOpen(state) {
            return {
                ...state,
                open: !state.open
            };
        }
    },
    extraReducers: {
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
        }
    }
});

export const { setLoginOpen } = userSlice.actions;
export default userSlice.reducer;