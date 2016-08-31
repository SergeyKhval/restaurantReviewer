import {SET_CITY, FETCH_CITY, FETCH_RESTAURANTS, CLEAR_RESTAURANTS} from '../constants/cities';
import {SET_RESTAURANT, SET_PLACE_TYPE, SET_SELF_LOCATION} from '../constants/restaurant';
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
  function nearbySearchCb(dispatch) {
    return (results, status, pagination) => {
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
    }
  }

  return (dispatch, getState) => {
    let state = getState();

    let {placeType, openNow, rankBy, selfLocation} = state.restaurantList,
      cityPlaceId = cityId || state.city.place_id;

    let cityDetailsRequest = {
      placeId: cityPlaceId
    };

    if (!selfLocation.use) {
      GOOGLE_PLACE_SERVICE.getDetails(cityDetailsRequest, (place, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          let location = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
          let request = {
            location,
            radius: '25000',
            openNow,
            type: placeType
          };

          GOOGLE_PLACE_SERVICE.nearbySearch(request, nearbySearchCb(dispatch));
        } else {
          console.log('error getting city info');
        }

      });
    } else {
      let location = new google.maps.LatLng(selfLocation.latitude, selfLocation.longitude);
      let request = {
        location,
        openNow,
        rankBy,
        types: [placeType]
      };

      console.log(request);

      GOOGLE_PLACE_SERVICE.nearbySearch(request, nearbySearchCb(dispatch));
    }
  }
}

export function clearRestaurants() {
  return {
    type: CLEAR_RESTAURANTS
  }
}

export function setRestaurant(id) {
  function successCb(dispatch) {
    return (place, status) => {
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
    }
  }

  let request = {
    placeId: id
  };

  return (dispatch) => {
    GOOGLE_PLACE_SERVICE.getDetails(request, successCb(dispatch));
  }
}

export function setPlaceType(type) {
  return {
    type: SET_PLACE_TYPE,
    payload: type
  }
}

function getPositionPromised() {
  function successCb(cb) {
    return position => cb(position.coords);
  }

  function errorCb(cb) {
    return () => cb();
  }

  return new Promise((resolve, reject) => {
    if (window.navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCb(resolve), errorCb(reject));
    } else {
      reject()
    }
  })
}

export function setSelfLocation(bool = false) {
  return (dispatch) => {
    getPositionPromised()
      .then(position => {
        if (bool) {
          let {latitude, longitude} = position;

          dispatch({
            type: SET_SELF_LOCATION,
            payload: {selfLocation: {latitude, longitude, use: true}}
          });
        } else {
          return Promise.reject();
        }
      })
      .catch(() => {
        dispatch({
          type: SET_SELF_LOCATION,
          payload: {selfLocation: {use: false, lat: null, lon: null}}
        })
      });
  }
}
