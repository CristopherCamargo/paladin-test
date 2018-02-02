import React, { Component } from 'react';
import { pushRotate as Menu } from 'react-burger-menu';
import MenuList from './components/menu';
import Grid from 'material-ui/Grid';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { clearSnack } from './actions/actions';

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      openSnack: false,
      snackMessage: '',
    }
  }

  showSettings (event) {
    event.preventDefault();
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      openSnack: false,
      snackMessage: '',
    });
    this.props.clearSnack();
  };

  componentWillReceiveProps( nextProps ) {
    if ( nextProps.snackMessage !== '' ) {
      this.setState({
        openSnack: true,
        snackMessage: nextProps.snackMessage
      });
    }
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
        <Snackbar
          open={this.state.openSnack}
          autoHideDuration={2000}
          onClose={this.handleClose}
          SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.snackMessage}</span>}
        />
      </div>
    );
  }
}
function mapStateToProps( state ) {
  return {
    snackMessage: state.snackReducer,
  };
}

export default connect(mapStateToProps, { clearSnack })(App);
