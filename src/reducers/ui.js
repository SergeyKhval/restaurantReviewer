import {TOGGLE_REVIEW_MODAL} from '../constants/restaurant';

const initialState = {
  reviewModalOpen: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_REVIEW_MODAL:
      return {...state, reviewModalOpen: action.payload};
    default:
      return state;
  }
}
