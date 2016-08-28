import {SET_CITY, FETCH_CITY, FETCH_RESTAURANTS, CLEAR_RESTAURANTS} from '../constants/cities';
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

export function fetchCityInfo(cityId) {
  return (dispatch) => {
    let request = {
      placeId: cityId
    };

    GOOGLE_PLACE_SERVICE.getDetails(request, (place, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        dispatch({
          type: FETCH_CITY,
          payload: place
        });
      } else {
        console.log('Error with google places API');
      }
    });
  }
}

export function fetchRestaurants(cityId = null) {
  return (dispatch, getState) => {
    let state = getState(),
      placeType = state.restaurantList.placeType,
      cityPlaceId = cityId || state.city.place_id;

    let cityDetailsRequest = {
      placeId: cityPlaceId
    };

    GOOGLE_PLACE_SERVICE.getDetails(cityDetailsRequest, (place, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        let location = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng()),
          request = {
            location: location,
            radius: '25000',
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
          } else {
            console.log('error fetching restaurants');
          }
        });
      } else {
        console.log('error getting city info');
      }

    });


  }
}

export function clearRestaurants() {
  return {
    type: CLEAR_RESTAURANTS
  }
}

export function setRestaurant(id) {
  let request = {
    placeId: id
  };

  return (dispatch) => {
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
            nextUrl: `/restaurants/${id}`
          }
        });
      } else {
        console.log('Error with google places API');
      }
    });
  }
}

export function setPlaceType(type) {
  return {
    type: SET_PLACE_TYPE,
    payload: type
  }
}
