import React, { Component } from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { getCategories } from '../actions/categories';
import { getProducts } from '../actions/products';
import { connect } from 'react-redux';
import Collapse from 'material-ui/transitions/Collapse';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Downshift from 'downshift';
import lodash from 'lodash';
import { browserHistory } from 'react-router';
import { getCart } from '../actions/cart';

class MenuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false,
      categories: [],
      openCategories: [],
      products: []
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps( nextProps ) {

    if ( !this.state.isLoad ) {
      if ( nextProps.categories.length > 0 && nextProps.products.length > 0) {

        for (let i = 0; i < nextProps.categories.length; i++) {
          const openCategories = this.state.openCategories;
          openCategories.push(false);
          this.setState({
            openCategories: openCategories,
          })
        }

        this.setState({
          isLoad: true,
          categories: nextProps.categories,
          products: nextProps.products
        });
      }
    }
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getProducts();
    this.props.getCart();
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

  changeUrl( url ) {
    browserHistory.push( url );
  }

  searchProduct( selected, products, sublevelId ) {
    let id = 0;
    for (let i = 0; i < products.length; i++) {
      if (selected === products[i].name) {
        id = products[i].id;
        break;
      }
    }
    this.changeUrl( '/products/'+sublevelId+'/'+id );
  }

  render() {

    const Autocomplete = ({items, onChange, padding}) => {
      return (
        <Downshift
          onChange={onChange}
          render={({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            selectedItem,
            highlightedIndex,
          }) => (
            <div>
              <input {...getInputProps({placeholder: 'Buscar producto'})} style={{'marginLeft': padding, 'padding': '8px'}}/>
              {isOpen ? (
                <div style={{border: '1px solid #ccc', 'marginLeft': padding}}>
                  {items
                    .filter(
                      i =>
                        !inputValue ||
                        i.toLowerCase().includes(inputValue.toLowerCase()),
                    )
                    .map((item, index) => (
                      <div
                        {...getItemProps({item})}
                        key={item}
                        style={{
                          backgroundColor:
                            highlightedIndex === index ? '#fafafff2' : 'white',
                          fontWeight: selectedItem === item ? 'bold' : 'normal',
                          color: '#000',
                          fontSize: '0.8em',
                          padding: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        {item}
                      </div>
                    ))}
                </div>
              ) : null}
            </div>
          )}
        />
      )
    }

    const Menu = ({ data, level, id }) => {

      level = level + 1;
      const padding = 16 * level;
      const paddingText = padding+'px';

      return (
        <div>
        {data.map(sublevel => {
            let products = [];
            products = lodash.map(lodash.filter(this.state.products, function(product) { return product.sublevel_id == sublevel.id; } ), 'name');
            const productsData = lodash.filter(this.state.products, function(product) { return product.sublevel_id == sublevel.id; });

            return (
              <div key={sublevel.id}>
                <ListItem button style={{ 'paddingLeft': paddingText }} onClick={ () => this.changeUrl( '/products/'+sublevel.id ) }>
                  <ListItemText primary={sublevel.name} />
                </ListItem>
                {sublevel.sublevels ?
                  ( <Menu data={ sublevel.sublevels } level={ level } id={ sublevel.id }/> )
                  :
                  ( <Autocomplete
                      items = { products }
                      onChange = { selectedItem => this.searchProduct( selectedItem, productsData, sublevel.id ) }
                      padding = { paddingText }
                      /> )
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
            <ListItemText primary="Home" onClick={() => this.changeUrl( '/' )}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Cart" onClick={() => this.changeUrl( '/cart' )}/>
          </ListItem>
        </List>
        <Divider />
        { this.state.categories.map( (row, index ) => {
            return (
              <div key={index}>
                <ListItem button onClick={() => this.handleClick(index)} >
                  <ListItemText primary={ row.name } />
                  {this.state.openCategories[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={ this.state.openCategories[index] } timeout="auto" unmountOnExit>
                  <Menu data={ row.sublevels } level={ 1 } id={ index }/>
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
    products: state.productsReducer,
  }
}

export default connect(mapStateToProps,{ getCategories, getProducts, getCart }) (MenuList);
