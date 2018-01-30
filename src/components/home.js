import React, { Component } from 'react';
import Grid from 'material-ui/Grid';

class Home extends Component {
  render() {
    return (
      <Grid item xs={12}>
        <Grid item xs={12}>
          <h1>El Baratón</h1>
        </Grid>
        <Grid item xs={12}>
          <img className="home-image" src="/images/vino_0.jpg"></img>
        </Grid>
      </Grid>
    );
  }
}

export default Home;
