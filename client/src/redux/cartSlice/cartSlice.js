import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: "cart",
    initialState: { items: [], open: false },
    reducers: {
        addItem(state, action) {
            const itemExists = state.items.find(item => item._id === action.payload._id);
            if (itemExists) {
                const newPayload = { ...action.payload, qty: parseInt(action.payload.qty) + parseInt(itemExists.qty) };
                const cartItems = state.items.filter(item => item._id != itemExists._id);
                return { ...state, items: [...cartItems, newPayload] };
            }
            return { ...state, items: [...state.items, action.payload] };
        },
        isOpen(state, action) {
            return { ...state, open: action.payload };
        }
    }
});
export const { addItem, isOpen } = cartSlice.actions;
export default cartSlice.reducer;
