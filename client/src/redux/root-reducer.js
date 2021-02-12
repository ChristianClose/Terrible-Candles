import { combineReducers } from 'redux';
import productsSlice from './productsSlice/productsSlice';
import reviewsSlice from './reviewsSlice/reviewsSlice';
import promoSlice from './promosSlice/promosSlice';

export default combineReducers({ products: productsSlice, reviews: reviewsSlice, promos: promoSlice });