import { combineReducers } from 'redux';
import categoriesReducer from './categories';

const rootReducer = combineReducers({
  categoriesReducer,
});


export default rootReducer;
