import {SET_CITY} from '../constants/cities';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CITY:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}
