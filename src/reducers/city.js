import {SET_CITY} from '../constants/cities';

const initialState = {
  label: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CITY:
      return {
        ...state,
        place_id: action.payload.placeId,
        label: action.payload.label
      };
    default:
      return state;
  }
}
