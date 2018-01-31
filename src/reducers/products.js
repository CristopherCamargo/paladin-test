import * as types from '../actions/types';
import initialState from './initialState';

export default function productsReducer( state = initialState.products, action ) {
  switch( action.type ) {
    case types.GET_PRODUCTS :
      return state = action.payload;
    default:
      return state;
  }
}
