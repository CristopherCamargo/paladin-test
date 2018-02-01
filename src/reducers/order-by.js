import * as types from '../actions/types';
import initialState from './initialState';

export default function orderByReducer( state = initialState.order, action ) {
  switch( action.type ) {
    case types.CHANGE_ORDER_BY :
      return state = action.payload;
    default:
      return state;
  }
}
