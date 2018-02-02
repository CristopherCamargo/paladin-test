import * as types from './types';

function orderBy( order ) {
  return {
      type : types.CHANGE_ORDER_BY,
      payload : order
  };
}

function filterBy( filters, applyfilters ) {
  return {
      type : types.CHANGE_FILTER_BY,
      payload : {
        available: filters.available,
        price: filters.price,
        quantity: filters.quantity,
        applyfilters: applyfilters
      }
  };
}

function clearFilters() {
  return {
      type : types.CLEAR_FILTERS_BY,
  };
}

function snackMessage( message ) {
  return {
    type : types.SNACK_MESSAGE,
    payload: message
  }
}

function snackClear() {
  return {
    type : types.SNACK_CLEAR,
  }
}

export function changeOrderBy( order ) {
  return ( dispatch, getState ) => {
    dispatch( orderBy( order ) );
  };
}

export function changefilterBy( filters, applyfilters ) {
  return ( dispatch, getState ) => {
    dispatch( filterBy( filters, applyfilters ) );
  };
}

export function clearFilterBy() {
  return ( dispatch, getState ) => {
    dispatch( clearFilters() );
  };
}

export function changeSnack( message ) {
  return ( dispatch, getState ) => {
    dispatch( snackMessage( message ) );
  }
}

export function clearSnack() {
  return ( dispatch, getState ) => {
    dispatch( snackClear() );
  }
}
