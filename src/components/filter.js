import React, { Component } from 'react';
import Switch from 'material-ui/Switch';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { changefilterBy, clearFilterBy } from '../actions/actions';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';

class Filter extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      available: false,
      price: { min: 1000, max: 10000 },
      quantity: { min: 100, max: 800 }
    };
    this.handleChangeAvailable = this.handleChangeAvailable.bind(this);
    this.applyfilters = this.applyfilters.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
  }

  handleChangeAvailable( event, checked ) {
    this.setState({
      available: checked
    });
  }

  applyfilters() {
    this.props.changefilterBy( this.state, true );
  }

  clearFilters() {
    this.props.clearFilterBy();
    this.setState({
      available: false,
      price: { min: 1000, max: 10000 },
      quantity: { min: 100, max: 800 }
    });
  }

  render() {
    return (
      <FormGroup>
        <b>Filtros</b>
        <FormControlLabel
          control={
            <Switch
              checked={this.state.available}
              onChange={this.handleChangeAvailable}
              />
          }
          label="Disponibilidad"
        />
        <FormControlLabel
          control={
            <InputRange
            maxValue={20000}
            minValue={0}
            value={this.state.price}
            onChange={value => this.setState({ price: value })} />
          }
          label="Precio"
        />
        <FormControlLabel
          control={
            <InputRange
            maxValue={1000}
            minValue={0}
            value={this.state.quantity}
            onChange={value => this.setState({ quantity: value })} />
          }
          label="Cantidad"
        />
        <Button color="primary" onClick={this.applyfilters}>
          Aplicar filtros
        </Button>
        <Button color="secondary" onClick={this.clearFilters}>
          Limpiar filtros
        </Button>
      </FormGroup>
    );
  }
}

function mapStateToProps( state ) {
  return {};
}

export default connect(mapStateToProps, { changefilterBy, clearFilterBy })(Filter);
