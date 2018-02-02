import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import productsReducer from './products';
import orderByReducer from './order-by';
import filterByReducer from './filters';
import cartReducer from './cart';
import snackReducer from './snack'

const rootReducer = combineReducers({
  categoriesReducer,
  productsReducer,
  orderByReducer,
  filterByReducer,
  cartReducer,
  snackReducer
});


export default rootReducer;
