import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import lodash from 'lodash';

class Products extends Component {
  constructor( props ) {
    super(props);

    this.state = {
      products: [],
      isLoad: false,
    };
  }

  componentWillReceiveProps( nextProps ) {
    if ( !this.state.isLoad ) {
      if ( nextProps.products.length > 0 ) {

        let products = [];
        const sublevel = nextProps.params.sublevel;
        products = lodash.filter( nextProps.products, function( product ) { return product.sublevel_id == sublevel });

        this.setState({
          products: products
        });
      }
    }
  }

  render() {
    const RenderProduct = ({ product }) => {
      return (
        <Grid item xs>
          <Paper className="paper">
            <h4>{product.name}</h4>
            <table className="table-product">
              <tr>
                <th>Disponibles: </th>
                <th>{product.quantity}</th>
              </tr>
              <tr>
                <th>Precio: </th>
                <th>{product.price}</th>
              </tr>
              <tr>
                <th>Disponibilidad: </th>
                <th>{product.available ? ( <span>Si</span> ) : ( <span>No</span> ) }</th>
              </tr>
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
    products: state.productsReducer
  }
}

export default connect(mapStateToProps, {})(Products);
