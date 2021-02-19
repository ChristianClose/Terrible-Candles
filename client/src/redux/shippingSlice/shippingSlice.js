import { createSlice } from '@reduxjs/toolkit';

const shippingSlice = createSlice({
    name: "shippingAddress",
    initialState: {},
    reducers: {
        setAddress(state, action) {
            return { ...state, ...action.payload };
        },
    }
});
export const { setAddress } = shippingSlice.actions;
export default shippingSlice.reducer;
