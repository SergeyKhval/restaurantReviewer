import {SET_CITY, FETCH_RESTAURANTS} from '../constants/cities';
import {SET_RESTAURANT, SET_PLACE_TYPE} from '../constants/restaurant';
import {REDIRECT} from '../constants/redirect';

//Google waits for DOM node as an argument for PlacesService() method
//We will create dummy node without actually rendering a map
const GOOGLE_PLACE_SERVICE = new google.maps.places.PlacesService(new google.maps.Map(document.createElement('div')));

export function setCity(city) {
  return (dispatch) => {
    dispatch({
      type: SET_CITY,
      payload: city
    });

    dispatch({
      type: REDIRECT,
      payload: {
        method: 'push',
        nextUrl: `/city/${city.placeId}/restaurants`
      }
    });
  }
}

export function fetchRestaurants() {
  return (dispatch, getState) => {
    let state = getState(),
      placeType = state.ui.placeType,
      city = state.city,
      location = new google.maps.LatLng(city.location.lat, city.location.lng),
      request = {
        location: location,
        radius: '5000',
        type: placeType
      };

    GOOGLE_PLACE_SERVICE.nearbySearch(request, function (results, status, pagination) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        dispatch({
          type: FETCH_RESTAURANTS,
          payload: {
            results: results.filter(r => !!r.rating && r.types.indexOf('lodging') < 0),
            pagination: pagination
          }
        });
      }
    });
  }
}

export function setRestaurant(id) {
  let request = {
    placeId: id
  };

  return (dispatch, getState) => {
    let cityId = getState().city.id;

    GOOGLE_PLACE_SERVICE.getDetails(request, (place, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        dispatch({
          type: SET_RESTAURANT,
          payload: place
        });

        dispatch({
          type: REDIRECT,
          payload: {
            method: 'push',
            nextUrl: `/city/${cityId}/restaurants/${id}`
          }
        });
      } else {
        console.log('Error with google places API');
      }
    });
  }
}

export function setPlaceType(type) {
  return (dispatch) => {
    dispatch({
      type: SET_PLACE_TYPE,
      payload: type
    });
  }
}
