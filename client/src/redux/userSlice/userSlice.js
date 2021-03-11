import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    loading: true,
    error: "",
    open: false,
    message: "",
    users: []
}

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

export const authUserByToken = createAsyncThunk("users/authUserByToken", async() => {
    const response = await fetch('/api/users/login');
    if(response.status >= 400){
        const {message} = await response.json();
        throw new Error(message);
    } else {
        return await response.json();
    }
})

export const updateUser = createAsyncThunk("users/updateUser", async(userInfo) => {
    console.log(userInfo)
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

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setLoginOpen(state) {
            return {
                ...state,
                open: !state.open
            };
        },
        logout(){
            const date = Date.now;
            document.cookie = `auth=; expires=${date}` ;
            return initialState
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
        },
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
});

export const { setLoginOpen, logout } = userSlice.actions;
export default userSlice.reducer;