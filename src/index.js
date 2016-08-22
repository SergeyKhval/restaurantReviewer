import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import Home from './containers/Home';
import RestaurantList from './containers/RestaurantList';
import DetailedRestaurant from './containers/DetailedRestaurant';
import configureStore from './store/configureStore';

import './styles/app.scss';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Home}/>
      <Route path='/city/:cityId/restaurants' component={RestaurantList}/>
      <Route path='/restaurants/:restaurantId' component={DetailedRestaurant}/>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
