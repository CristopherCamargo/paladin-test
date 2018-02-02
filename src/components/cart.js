import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Input from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Button from 'material-ui/Button';

class Cart extends Component {
  constructor( props ) {
    super( props );
    // window.localStorage.removeItem("cart");
    let cart = [];
    cart = window.localStorage.getItem("cart");

    this.state = {
      cart: JSON.parse(cart),
    };
  }

  componentWillReceiveProps( nextProps ) {

    if ( nextProps.cart.length > 0 ){
      this.setState({
        cart: nextProps.cart
      })
    }
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
                  />
                </th>
              </tr>
              <tr>
                <th></th>
                <th>
                  <IconButton  aria-label="Delete">
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
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <h2>Cart</h2>
        </Grid>
        {this.state.cart.map( ( row,index ) => {
          return (
            <Product product={ row }/>
          );
        })}
        <Grid item xs={12}>
          <Button color="primary" style={{ 'width': '100%' }}>
            Pagar carrito
          </Button>
        </Grid>
      </Grid>
    );
  }
}
function mapStateToProps( state ) {
  return {
    cart: state.cartReducer,
  };
}

export default connect( mapStateToProps, {} )(Cart);
