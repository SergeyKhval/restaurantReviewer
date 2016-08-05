import {SET_CITY, SET_RESTAURANTS} from '../constants/cities';
import {SET_PLACE_TYPE} from '../constants/restaurant';

const initialState = {
  city: {},
  restaurants: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CITY:
      return {
        ...state,
        city: action.payload.city,
        restaurants: action.payload.restaurants
      };
    case SET_PLACE_TYPE:
      return {...state, restaurants: []};
    case SET_RESTAURANTS:
      return {
        ...state,
        restaurants: [...state.restaurants, ...action.payload.results],
        pagination: action.payload.pagination
      };
    default:
      return state;
  }
}
