import {SET_CITY} from '../constants/cities';

const initialState = {
  name: 'Старт',
  lat: 0,
  lng: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CITY:
      return {
        ...state,
        name: action.payload.label,
        lat: action.payload.location.lat,
        lng: action.payload.location.lng
      };
    default:
      return state;
  }
}
