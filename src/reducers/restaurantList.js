import {SET_CITY, FETCH_RESTAURANTS, CLEAR_RESTAURANTS} from '../constants/cities';
import {SET_PLACE_TYPE, SET_SELF_LOCATION} from '../constants/restaurant';

const initialState = {
  restaurants: [],
  pagination: {},
  placeType: 'restaurant',
  rankBy: google.maps.places.RankBy.DISTANCE,
  openNow: false,
  selfLocation: {
    use: false,
    lat: null,
    lon: null
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CITY:
      return {
        ...state,
        restaurants: []
      };
    case SET_PLACE_TYPE:
      return {...state, restaurants: [], placeType: action.payload};
    case FETCH_RESTAURANTS:
      return {
        ...state,
        restaurants: [...state.restaurants, ...action.payload.results],
        pagination: action.payload.pagination
      };
    case CLEAR_RESTAURANTS:
      return {
        ...state,
        restaurants: [],
        pagination: {}
      };
    case SET_SELF_LOCATION:
      return {
        ...state,
        selfLocation: action.payload.selfLocation
      };
    default:
      return state;
  }
}
