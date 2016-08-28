import {SET_CITY, FETCH_CITY} from '../constants/cities';

const initialState = {
  address_components: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CITY:
      return {
        ...state,
        place_id: action.payload.placeId
      };
    case FETCH_CITY:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
