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
        name: action.payload.label,
        id: action.payload.placeId,
        lat: action.payload.location.lat,
        lng: action.payload.location.lng
      };
    case SET_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload
      };
    default:
      return state;
  }
}
