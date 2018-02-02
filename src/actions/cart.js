import * as types from './types';
import categories from '../data/categories';

function pushCart ( product ) {
  return {
      type : types.PUSH_TO_CART,
      payload : product
  };
}

export function pushToCart( product ) {
  return ( dispatch, getState ) => {
    dispatch( pushCart( product ) );
  };
}
