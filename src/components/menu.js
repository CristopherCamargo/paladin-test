import React, { Component } from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { getCategories } from '../actions/categories';
import { connect } from 'react-redux';

class MenuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      categories: [],
    };
  }

  componentWillReceiveProps( nextProps ) {
    if (!this.state.isLoad) {
      if (nextProps.categories.length > 0) {
        this.setState({
          isLoad: true,
          categories: nextProps.categories
        });
      }
    }
  }

  componentDidMount() {
    this.props.getCategories();
  }
  
  render() {
    return (
      <div>
        <List>
          <ListItem button>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Cart" />
          </ListItem>
        </List>
        <Divider />
        { this.state.categories.map( (row, index ) => {
            return (
              <ListItem button>
                <ListItemText primary={ row.name } />
              </ListItem>
            );
          }
        )}
      </div>
    );
  }
}

function mapStateToProps( state ) {
  return {
    categories: state.categoriesReducer,
  }
}

export default connect(mapStateToProps,{ getCategories }) (MenuList);
