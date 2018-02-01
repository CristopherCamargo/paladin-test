import * as types from './types';

function orderBy( order ) {
  return {
      type : types.CHANGE_ORDER_BY,
      payload : order
  };
}

export function changeOrderBy( order ) {
  return ( dispatch, getState ) => {
    dispatch(orderBy( order ));
  };
}
