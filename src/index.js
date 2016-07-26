import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import App from './containers/App';
import City from './components/City';
import DetailedRestaurant from './components/DetailedRestaurant';
import configureStore from './store/configureStore';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}/>
      <Route path='/city/:cityId/restaurants' component={City}/>
      <Route path='/city/:cityId/restaurants/:restaurantId' component={DetailedRestaurant}/>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
