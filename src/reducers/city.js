import {SET_CITY, SET_RESTAURANTS} from '../constants/cities';

const initialState = {
  id: '',
  name: '',
  lat: 0,
  lng: 0,
  restaurants: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CITY:
      return {
        ...state,
        name: action.payload.city.label,
        id: action.payload.city.placeId,
        lat: action.payload.city.location.lat,
        lng: action.payload.city.location.lng,
        restaurants: action.payload.restaurants
      };
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
