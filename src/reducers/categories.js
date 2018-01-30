import * as types from '../actions/types';
import initialState from './initialState';

export default function categoriesReducer( state = initialState.categories, action ) {
  switch( action.type ) {
    case types.GET_CATEGORIES :
      return state = action.payload;
    default:
      return state;
  }
}
