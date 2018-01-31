import * as types from './types';
import products from '../data/products';

function productsData () {
  return {
      type : types.GET_PRODUCTS,
      payload : products
  };
}

export function getProducts() {
  return ( dispatch, getState ) => {
    dispatch(productsData());
  };
}
