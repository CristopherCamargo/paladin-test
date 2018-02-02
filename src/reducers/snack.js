import * as types from '../actions/types';
import initialState from './initialState';

export default function snackReducer( state = initialState.snackMessage, action ) {
  switch( action.type ) {
    case types.SNACK_MESSAGE :
      return state = action.payload;
    case types.SNACK_CLEAR:
      return state = initialState.snackMessage;
    default:
      return state;
  }
}
