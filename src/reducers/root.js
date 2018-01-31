import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import productsReducer from './products';

const rootReducer = combineReducers({
  categoriesReducer,
  productsReducer
});


export default rootReducer;
