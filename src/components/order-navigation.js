import React, { Component } from 'react';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import AttachMoney from 'material-ui-icons/AttachMoney';
import Storage from 'material-ui-icons/Storage';
import FilterList from 'material-ui-icons/FilterList';
import { connect } from 'react-redux';
import { changeOrderBy } from '../actions/actions';

class OrderNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: -1
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    this.props.changeOrderBy( value );
    this.setState({
      selection: value
    });
  }

  render() {
    return(
      <BottomNavigation
        value={this.state.selection}
        onChange={this.handleChange}
        showLabels
      >
        <BottomNavigationAction label="Ordenar por precio" icon={<AttachMoney />}/>
        <BottomNavigationAction label="Ordenar por disponibilidad" icon={<Storage />}/>
        <BottomNavigationAction label="Ordenar por cantidad" icon={<FilterList />}/>
      </BottomNavigation>
    );
  }
}

function mapStateToProps( state ) {
  return {}
}

export default connect(mapStateToProps, { changeOrderBy })(OrderNavigation);
