import { combineReducers } from 'redux';
import productsSlice from './productsSlice/productsSlice';
import reviewsSlice from './reviewsSlice/reviewsSlice';
import promoSlice from './promosSlice/promosSlice';
import cartSlice from './cartSlice/cartSlice';
import shippingSlice from './shippingSlice/shippingSlice';

export default combineReducers(
    {
        products: productsSlice,
        reviews: reviewsSlice,
        promos: promoSlice,
        cart: cartSlice,
        shippingAddress: shippingSlice
    });