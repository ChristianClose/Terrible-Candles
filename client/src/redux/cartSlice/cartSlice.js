import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addItem(state, action) {
            const itemExists = state.find(item => item._id === action.payload._id);
            console.log(JSON.stringify(action.payload));

            if (itemExists) {
                const newPayload = { ...action.payload, qty: action.payload.qty + itemExists.qty };
                const newState = state.filter(item => item._id != itemExists._id);
                console.log(newPayload, newState);
                return [...newState, newPayload];
            }
            return [...state, action.payload];
        }
    }
});
export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
