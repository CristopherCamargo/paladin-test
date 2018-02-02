import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import Input from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Button from 'material-ui/Button';
import { clearCart, updateCart } from '../actions/cart';
import lodash from 'lodash';
import Chip from 'material-ui/Chip';

class Cart extends Component {
  constructor( props ) {
    super( props );

    let cart = [];
    if ( props.cart.length > 0 ) {
      cart = props.cart;
    }

    this.state = {
      cart: cart,
    };
    this.clearCart = this.clearCart.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
  }

  componentWillReceiveProps( nextProps ) {
    if ( nextProps.cart.length > 0 ){
      this.setState({
        cart: nextProps.cart
      });
    }
  }

  clearCart() {
    this.setState({
      cart: []
    })
    this.props.clearCart();
  }

  updateQuantity = product => ( event ) => {
    const cart = this.state.cart;
    for ( let i = 0; i < cart.length; i++ ) {
      if ( cart[i].id === product.id ) {
          cart[i].quantity_to_cart = parseInt(event.target.value, 10);
      }
    }
    this.setState({
      cart: cart
    })

    this.props.updateCart( cart );
  }

  removeProduct = product => ( event ) => {

    let cart = this.state.cart;
    const removes = lodash.remove(cart, function(o) {
      return o.name == product.name;
    });
    this.setState({
      cart: cart
    });
    this.props.updateCart( cart, removes );
  }

  render() {
    const Product = ({ product }) => {
      return (
        <Grid item xs>
          <table className="table-product-cart">
            <tbody>
              <tr>
                <th colSpan="2"><h4>{product.name}</h4></th>
              </tr>
              <tr>
                <th>Precio: </th>
                <th>{product.price}</th>
              </tr>
              <tr>
                <th>Cantidad agregada: </th>
                <th>
                  <Input
                    type="number"
                    style={
                      {
                        'width': '40%',
                        'float': 'right'
                      }
                    }
                    value={product.quantity_to_cart}
                    onChange={this.updateQuantity( product )}
                  />
                </th>
              </tr>
              <tr>
                <th></th>
                <th>
                  <IconButton  aria-label="Delete" onClick={ this.removeProduct( product ) }>
                    <DeleteIcon />
                  </IconButton>
                </th>
              </tr>
            </tbody>
          </table>
        </Grid>
      );
    }

    return (
      <Grid container spacing={24} className="cart">
        <Grid item xs={12}>
          <h2>Carrito de compras</h2>
        </Grid>
        {this.state.cart.map( ( row, index ) => {
          return (
            <Product product={ row } key={index}/>
          );
        })}
        {this.state.cart.length < 1 ?
          (
            <Grid item xs={12} className="empty-message">
              <Chip label="Carrito vacio" />
            </Grid>
          ) :
          (
            <Grid item xs={12}>
              <Button color="secondary" style={{ 'width': '100%' }} onClick={ this.clearCart }>
                Limpiar carrito
              </Button>
            </Grid>
          )
        }
      </Grid>
    );
  }
}

function mapStateToProps( state ) {
  return {
    cart: state.cartReducer,
  };
}

export default connect( mapStateToProps, { clearCart, updateCart } )(Cart);
