import * as types from '../actions/types';
import initialState from './initialState';

export default function filterByReducer( state = initialState.filter, action ) {
  switch( action.type ) {
    case types.CHANGE_FILTER_BY :
      return state = action.payload;
    case types.CLEAR_FILTERS_BY :
      return initialState.filter;
    default:
      return state;
  }
}
