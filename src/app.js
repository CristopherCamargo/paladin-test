import React, { Component } from 'react';
import { pushRotate as Menu } from 'react-burger-menu';
import MenuList from './components/menu';
import Grid from 'material-ui/Grid';

class App extends Component {
  showSettings (event) {
    event.preventDefault();
  }

  render() {
    return (
      <div id="outer-container">
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <Menu pageWrapId={ "main" } outerContainerId={ "outer-container" } noOverlay>
              <MenuList />
            </Menu>
          </Grid>
          <Grid item xs={8}>
            <div id="main">
              { this.props.children }
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
