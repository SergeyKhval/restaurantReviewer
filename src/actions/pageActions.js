import {SET_CITY} from '../constants/cities';

export function setCity(city) {
  return (dispatch) => {
    dispatch({
      type: SET_CITY,
      payload: city
    });
  }
}
