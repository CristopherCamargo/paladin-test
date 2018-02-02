import * as types from './types';
import { changeSnack } from './actions';

function pushCart( product ) {
  return {
      type : types.PUSH_TO_CART,
      payload : product
  };
}

function updateData( cart ) {
  return {
      type : types.UPDATE_CART,
      payload : cart
  };
}

function cartData( cart ) {
  return {
      type : types.GET_CART,
      payload : cart
  };
}

function clearData() {
  return {
      type : types.CLEAR_CART,
  };
}

export function pushToCart( product ) {
  return ( dispatch, getState ) => {
    const currentCart = getState().cartReducer;
    let isUpdate = false;

    if ( currentCart.length > 0 ) {
      for (let i = 0; i < currentCart.length; i++) {
        if (currentCart[i].id === product.id) {
          currentCart[i].quantity_to_cart += product.quantity_to_cart;
          isUpdate = true;
          break;
        }
      }
    }

    if ( isUpdate ) {
      dispatch( changeSnack( 'Producto actualizado satisfactoriamente' ) );
      dispatch( updateData( currentCart ) );
    } else {
      dispatch( changeSnack( 'Productos agregado satisfactoriamente' ) );
      dispatch( pushCart( product ) );
    }
  };
}

export function getCart() {
  const cart = window.localStorage.getItem("cart");
  if ( cart !== null && cart !== undefined ){
    return ( dispatch, getState ) => {
      dispatch( cartData( JSON.parse(cart) ) );
    };
  }
  return (dispatch) => {
    dispatch(()=> { return {} });
  };
}

export function clearCart() {
  window.localStorage.removeItem("cart");
  return ( dispatch, getState ) => {
    dispatch( changeSnack( 'Se ha limpiado satisfactoriamente' ) );
    dispatch( clearData() );
  }
}

export function updateCart( cart ) {
  return ( dispatch, getState ) => {
    dispatch( changeSnack( 'Productos actualizados satisfactoriamente' ) );
    dispatch( updateData( cart ) );
  };
}
