import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import lodash from 'lodash';
import IconButton from 'material-ui/IconButton';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';
import Input, { InputLabel } from 'material-ui/Input';
import OrderNavigation from './order-navigation';
import { changeOrderBy } from '../actions/actions';

class Products extends Component {
  constructor( props ) {
    super(props);

    let products = [];

    if ( props.products.length > 0 ) {
      const sublevel = props.params.sublevel;
      products = lodash.filter( props.products, function( product ) { return product.sublevel_id == sublevel });
    }
    for (let i = 0; i < products.length; i++) {
      products[i].quantity_to_cart = 1;
    }

    this.state = {
      products: products,
    };

    this.handleNumberInputChange = this.handleNumberInputChange.bind(this);
  }

  componentWillReceiveProps( nextProps ) {

    if ( nextProps.products.length > 0 ) {
      let products = [];
      const sublevel = nextProps.params.sublevel;
      products = lodash.filter( nextProps.products, function( product ) { return product.sublevel_id == sublevel });


      for (let i = 0; i < products.length; i++) {
        products[i].real_price = Number(products[i].price.replace(/[^0-9\.-]+/g,""));
        products[i].quantity_to_cart = 1;
      }

      if ( nextProps.orderBy > -1 ) {
        let order = 'name';
        switch ( nextProps.orderBy ) {
          case 0:
            order = 'real_price';
            break;
          case 1:
            order = 'available';
            break;
          case 2:
            order = 'quantity';
            break;
          default:
            break;
        }

        products = lodash.orderBy( products, [order], ['desc']);
      }

      this.setState({
        products: products,
      });
    }
  }

  handleNumberInputChange = product => (event) => {
    const products = this.state.products;
    for ( let i = 0; i < products.length; i++ ) {
      if ( products[i].id === product.id ) {
          products[i].quantity_to_cart = parseInt(event.target.value, 10);
      }
    }

    this.setState({
      products: products
    })
  }

  render() {
    const RenderProduct = ({ product }) => {
      return (
        <Grid item xs>
          <Paper className="paper">
            <h4>{product.name}</h4>
            <table className="table-product">
              <tbody>
                <tr>
                  <th>Precio: </th>
                  <th>{product.price}</th>
                </tr>
                <tr>
                  <th>Disponibles: </th>
                  <th>{product.quantity}</th>
                </tr>
                <tr>
                  <th>Disponibilidad: </th>
                  <th>{product.available ? ( <span>Si</span> ) : ( <span>No</span> ) }</th>
                </tr>
                <tr>
                  <th>
                    <Input
                      type="number"
                      style={
                        {
                          'width': '30%',
                          'margin': 'auto',
                          'float': 'right',
                        }
                      }
                      value={product.quantity_to_cart}
                      onChange={this.handleNumberInputChange( product )}
                      disabled={product.available ? false : true}
                    />
                  </th>
                  <th>
                    <IconButton color="primary" aria-label="Add to shopping cart" disabled={product.available ? false : true}>
                      <AddShoppingCartIcon />
                    </IconButton>
                  </th>
                </tr>
              </tbody>
            </table>
          </Paper>
        </Grid>
      );
    }

    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <h2>Products</h2>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={6}>
            <OrderNavigation />
          </Grid>
        </Grid>
        { this.state.products.map( ( row, index ) => {
          return (
            <RenderProduct product={ row } />
          );
        })}
      </Grid>
    );
  }
}
function mapStateToProps( state ) {
  return {
    products: state.productsReducer,
    orderBy: state.orderByReducer
  }
}

export default connect(mapStateToProps, { changeOrderBy })(Products);
