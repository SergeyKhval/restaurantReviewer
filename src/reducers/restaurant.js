import {SET_RESTAURANT, TOGGLE_REVIEW_MODAL} from '../constants/restaurant';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_RESTAURANT:
      return {...state, restaurant: action.payload};
    case TOGGLE_REVIEW_MODAL:
      return {...state, reviewModalOpen: action.payload};
    case 'GET_FIREBASE_REVIEWS':
      return {...state, reviews: action.payload};
    default:
      return state;
  }
}
