import {SET_RESTAURANT} from '../constants/restaurant';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_RESTAURANT:
      return {...state, restaurant: action.payload};
    default:
      return state;
  }
}
