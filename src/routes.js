import React from 'react'
import {Route, IndexRoute} from 'react-router'

import App from './containers/App';
import Home from './components/Home';
import Restaurants from './components/Restaurants';

export const routes = (
  <div>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path='/restaurants' component={Restaurants}/>
    </Route>
  </div>
);
