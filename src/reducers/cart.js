import * as types from '../actions/types';
import initialState from './initialState';

export default function cartReducer( state = initialState.cart, action ) {
  switch( action.type ) {
    case types.PUSH_TO_CART :

      const cart = state;
      cart.push(action.payload);

      window.localStorage.setItem("cart", JSON.stringify(cart));

      return state = cart;
    case types.UPDATE_CART:

      const updateCart = action.payload;
      window.localStorage.setItem("cart", JSON.stringify(updateCart));
      return state = updateCart;
    case types.GET_CART:
      return state = action.payload;
    case types.CLEAR_CART:
      return state = initialState.cart;
    default:
      return state;
  }
}
