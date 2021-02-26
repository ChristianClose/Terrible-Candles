import { createSlice } from '@reduxjs/toolkit';

const localStorageCart = JSON.parse(localStorage.getItem("cart"));

const cartSlice = createSlice({
    name: "cart",
    initialState: localStorageCart ? localStorageCart : { items: [], open: false, subtotal: 0 },
    reducers: {
        addItem(state, action) {
            const itemExists = state.items.find(item => item._id === action.payload._id);
            const cartItems = itemExists ? state.items.filter(item => item._id !== itemExists._id) : state.items;
            const subtotal = parseFloat((cartItems.reduce((acc, item) =>
                (acc + item.price) * item.qty, 0) + (action.payload.price * action.payload.qty)).toFixed(2));

            localStorage.setItem("cart", JSON.stringify({ ...state, items: [...cartItems, action.payload], subtotal, isOpen: false }));
            return { ...state, items: [...cartItems, action.payload], subtotal };
        },
        removeItem(state, action) {
            const cartItems = state.items.filter((item) => item._id !== action.payload);
            const subtotal = parseFloat((cartItems.reduce((acc, item) => (acc + item.price) * item.qty, 0)).toFixed(2));

            localStorage.setItem("cart", JSON.stringify({ ...state, items: cartItems }));
            return { ...state, items: cartItems, subtotal };

        },
        isOpen(state, action) {
            return { ...state, open: action.payload };
        },
        resetCart() {
            localStorage.removeItem("cart");
            return { items: [], open: false, subtotal: 0 };
        }
    }
});
export const { addItem, isOpen, removeItem, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
