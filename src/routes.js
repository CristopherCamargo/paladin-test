import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import Home from './components/home';
import Products from './components/products';

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home }/>
    <Route path="/products/:sublevel" component={ Products }/>
  </Route>
);
