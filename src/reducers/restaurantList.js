import {SET_CITY, FETCH_RESTAURANTS, CLEAR_RESTAURANTS} from '../constants/cities';
import {SET_PLACE_TYPE} from '../constants/restaurant';

const initialState = {
  restaurants: [],
  pagination: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CITY:
      return {
        ...state,
        restaurants: []
      };
    case SET_PLACE_TYPE:
      return {...state, restaurants: []};
    case FETCH_RESTAURANTS:
      return {
        ...state,
        restaurants: [...state.restaurants, ...action.payload.results],
        pagination: action.payload.pagination
      };
    case CLEAR_RESTAURANTS:
      return {
        restaurants: [],
        pagination: {}
      };
    default:
      return state;
  }
}
