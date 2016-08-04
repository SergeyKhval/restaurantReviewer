import {TOGGLE_REVIEW_MODAL, SET_PLACE_TYPE} from '../constants/restaurant';

const initialState = {
  reviewModalOpen: false,
  placeType: 'restaurant'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_REVIEW_MODAL:
      return {...state, reviewModalOpen: action.payload};
    case SET_PLACE_TYPE:
      return {...state, placeType: action.payload};
    default:
      return state;
  }
}
