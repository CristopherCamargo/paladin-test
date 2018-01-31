import React, { Component } from 'react';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { getCategories } from '../actions/categories';
import { connect } from 'react-redux';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import TextField from 'material-ui/TextField';

class MenuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      categories: [],
      openCategories: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps( nextProps ) {
    if (!this.state.isLoad) {
      if (nextProps.categories.length > 0) {

        for (let i = 0; i < nextProps.categories.length; i++) {
          const openCategories = this.state.openCategories;
          openCategories.push(false);
          this.setState({
            openCategories: openCategories,
          })
        }

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

  handleClick(index) {
    const openCategories = this.state.openCategories;
    if ( openCategories[index] ) {
      openCategories[index] = false;
    } else {
      openCategories[index] = true;
    }
    this.setState({
      openCategories: openCategories
    });
  }

  render() {

    const Menu = ({ data, level, id }) => {

      level = level + 1;
      const padding = 16 * level;
      const paddingText = padding+'px';
      const openSublevels = this.state.openCategories;

      return (
        <div>
        {data.map(sublevel => {
            return (
              <div>
                <ListItem button style={{'paddingLeft': paddingText}}>
                  <ListItemText primary={sublevel.name} />
                </ListItem>
                {sublevel.sublevels ?
                  ( <Menu data={sublevel.sublevels} level={level}/> )
                  :
                  ( <div>  </div> )
                }
              </div>
            );
          })}
        </div>
      );
    }

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
              <div>
                <ListItem button onClick={() => this.handleClick(index)}>
                  <ListItemText primary={ row.name } />
                  {this.state.openCategories[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={ this.state.openCategories[index] } timeout="auto" unmountOnExit>
                  <Menu data={ row.sublevels } level={ 1 } index={ row.id }/>
                </Collapse>
              </div>
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
