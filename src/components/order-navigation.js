import React, { Component } from 'react';
import BottomNavigation, { BottomNavigationAction } from 'material-ui/BottomNavigation';
import AttachMoney from 'material-ui-icons/AttachMoney';
import Storage from 'material-ui-icons/Storage';
import FilterList from 'material-ui-icons/FilterList';
import { connect } from 'react-redux';
import { changeOrderBy } from '../actions/actions';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Collapse from 'material-ui/transitions/Collapse';
import Filter from './filter';
import Paper from 'material-ui/Paper';

class OrderNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: -1,
      openFilters: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event, value) {
    this.props.changeOrderBy( value );
    this.setState({
      selection: value
    });
  }

  handleClick () {
    if ( this.state.openFilters ) {
      this.setState({
        openFilters: false
      });
    } else {
      this.setState({
        openFilters: true
      })
    }

  }

  render() {
    return(
      <div>
        <BottomNavigation
          value={this.state.selection}
          onChange={this.handleChange}
          showLabels
        >
          <BottomNavigationAction label="Ordenar por precio" icon={<AttachMoney />}/>
          <BottomNavigationAction label="Ordenar por disponibilidad" icon={<Storage />}/>
          <BottomNavigationAction label="Ordenar por cantidad" icon={<FilterList />}/>
          <IconButton
            aria-label="Filtros"
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <MoreVertIcon />
          </IconButton>
        </BottomNavigation>
        <Collapse in={this.state.openFilters} timeout="auto" unmountOnExit>
          <Paper className="paper paper-collapse">
            <Filter />
          </Paper>
        </Collapse>
      </div>
    );
  }
}

function mapStateToProps( state ) {
  return {}
}

export default connect(mapStateToProps, { changeOrderBy })(OrderNavigation);
