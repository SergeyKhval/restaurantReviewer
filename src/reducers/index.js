import {combineReducers} from 'redux';
import city from './city';
import restaurant from './restaurant';
import ui from './ui';

export default combineReducers({
  city,
  restaurant,
  ui
})
