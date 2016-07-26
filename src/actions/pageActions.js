import {SET_CITY, SET_RESTAURANTS} from '../constants/cities';
import {SET_RESTAURANT} from '../constants/restaurant';
import {REDIRECT} from '../constants/redirect';

const GOOGLE_PLACE_SERVICE = new google.maps.places.PlacesService(new google.maps.Map(document.createElement('div')));

export function setCity(city) {
  //Google waits for DOM node as an argument for PlacesService() method
  //We will create dummy node without actually rendering a map
  let location = new google.maps.LatLng(city.location.lat, city.location.lng),
    request = {
      location: location,
      radius: '5000',
      types: ['restaurant', 'cafe', 'bar']
    };

  return (dispatch) => {
    dispatch({
      type: SET_CITY,
      payload: city
    });

    GOOGLE_PLACE_SERVICE.nearbySearch(request, function (results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        dispatch({
          type: SET_RESTAURANTS,
          payload: results.filter(r => !!r.rating && r.types.indexOf('lodging') < 0)
        });

        dispatch({
          type: REDIRECT,
          payload: {
            method: 'push',
            nextUrl: `/city/${city.placeId}/restaurants`
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
