import {firebaseDB} from '../services/firebase';
import {TOGGLE_REVIEW_MODAL} from '../constants/restaurant'


export function toggleModal(isModalOpen) {
  return (dispatch) => {
    return dispatch({
      type: TOGGLE_REVIEW_MODAL,
      payload: isModalOpen
    })
  }
}

export function getReviews(restaurantId) {
  let Reviews = firebaseDB.ref(`restaurants/${restaurantId}/reviews`);

  return dispatch => {
    Reviews.on('value', snapshot => {
      dispatch({
        type: 'GET_FIREBASE_REVIEWS',
        payload: snapshot.val() || {}
      })
    })
  }
}

export function addReview(review, restaurantId) {
  let Reviews = firebaseDB.ref(`restaurants/${restaurantId}/reviews`);

  return dispatch => {
    dispatch({
      type: TOGGLE_REVIEW_MODAL,
      payload: false
    });
    return Reviews.push(review);
  }
}
