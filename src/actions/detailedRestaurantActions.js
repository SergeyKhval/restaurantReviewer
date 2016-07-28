import {TOGGLE_REVIEW_MODAL} from '../constants/restaurant'

export function toggleModal(isModalOpen) {
  return (dispatch) => {
    return dispatch({
      type: TOGGLE_REVIEW_MODAL,
      payload: isModalOpen
    })
  }
}
