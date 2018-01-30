import * as types from './types';
import categories from '../data/categories';

function categoriesData () {
  return {
      type : types.GET_CATEGORIES,
      payload : categories
  };
}

export function getCategories() {
  return ( dispatch, getState ) => {
    dispatch(categoriesData());
  };
}
