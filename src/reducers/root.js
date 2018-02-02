import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import productsReducer from './products';
import orderByReducer from './order-by';
import filterByReducer from './filters';

const rootReducer = combineReducers({
  categoriesReducer,
  productsReducer,
  orderByReducer,
  filterByReducer,
});


export default rootReducer;
