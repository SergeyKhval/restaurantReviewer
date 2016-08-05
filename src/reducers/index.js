import {combineReducers} from 'redux';
import city from './city';
import restaurant from './restaurant';
import restaurantList from './restaurantList';
import ui from './ui';

export default combineReducers({
  city,
  restaurantList,
  restaurant,
  ui
})
