import { createSlice } from '@reduxjs/toolkit';
import {authUserExtraReducers, authUser} from './extraReducers/authUser';
import {authByTokenExtraReducer, authUserByToken} from './extraReducers/authUserByToken';
import {updateUserExtraReducer, updateUser} from './extraReducers/updateUser';
import {createUserExtraReducer, createUser} from './extraReducers/createUser';

const initialState = {
    loading: true,
    error: "",
    open: false,
    message: "",
    users: []
}

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
            const now = Date.now;
            document.cookie = `auth=; expires=${now}` ;
            return initialState
        }
    },
    extraReducers: {
            ...authUserExtraReducers,
            ...authByTokenExtraReducer,
            ...updateUserExtraReducer,
            ...createUserExtraReducer
    }
});

export const { setLoginOpen, logout } = userSlice.actions;
export {authUser, authUserByToken, updateUser, createUser}
export default userSlice.reducer;