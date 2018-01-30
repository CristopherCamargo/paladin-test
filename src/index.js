import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './index.css';
import App from './app';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers/root';

const store = createStore( rootReducer, applyMiddleware( thunk ) );

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ browserHistory } routes={ routes } />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
