import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import App from './containers/App';
import City from './components/City';
import DetailedRestaurant from './components/DetailedRestaurant';
import configureStore from './store/configureStore';

const store = configureStore();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={City}/>
        <Route path='/restaurants/:id' component={DetailedRestaurant}/>
      </Route>
    </Router>

  </Provider>,
  document.getElementById('root')
);
