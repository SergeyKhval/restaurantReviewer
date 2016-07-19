import 'babel-polyfill';
import React from 'react';
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {render} from 'react-dom';
import {routes} from './routes';

const store = configureStore();

// Render the main component into the dom
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById('app')
);
