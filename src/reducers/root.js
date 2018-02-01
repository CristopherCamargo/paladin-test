import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import productsReducer from './products';
import orderByReducer from './order-by';

const rootReducer = combineReducers({
  categoriesReducer,
  productsReducer,
  orderByReducer,
});


export default rootReducer;
