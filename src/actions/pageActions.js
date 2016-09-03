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

function getPlaceDetailsPromised(service, request) {
  function processResponse(resolve, reject) {
    return (place, status) => status === google.maps.places.PlacesServiceStatus.OK ? resolve(place) : reject()
  }

  return new Promise((resolve, reject) => service.getDetails(request, processResponse(resolve, reject)));
}

export function fetchCityInfo(cityId) {
  return (dispatch) => {
    let request = {
      placeId: cityId
    };

    getPlaceDetailsPromised(GOOGLE_PLACE_SERVICE, request)
      .then(place => dispatch({
        type: FETCH_CITY,
        payload: place
      }))
      .catch(() => {
        console.log('Error with google places API');
      });
  }
}

export function fetchRestaurants(cityId = null) {
  return (dispatch, getState) => {
    function nearbySearchCallback(places, status, pagination) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        dispatch({
          type: FETCH_RESTAURANTS,
          payload: {
            results: places.filter(r => !!r.rating && r.types.indexOf('lodging') < 0),
            pagination
          }
        })
      } else {
        console.log('error');
      }
    }

    let state = getState();

    let {placeType, openNow, rankBy, selfLocation} = state.restaurantList,
      placeId = cityId || state.city.place_id;

    if (!selfLocation.use) {
      getPlaceDetailsPromised(GOOGLE_PLACE_SERVICE, {placeId})
        .then(place => {
          let location = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
          return {
            location,
            radius: '25000',
            openNow,
            type: placeType
          };
        })
        .then(request => GOOGLE_PLACE_SERVICE.nearbySearch(request, nearbySearchCallback))
        .catch(() => {
          console.log('error getting city info');
        })
    } else {
      let request = {
        location: new google.maps.LatLng(selfLocation.latitude, selfLocation.longitude),
        openNow,
        rankBy,
        types: [placeType]
      };

      GOOGLE_PLACE_SERVICE.nearbySearch(request, nearbySearchCallback)
    }
  }
}

export function clearRestaurants() {
  return {
    type: CLEAR_RESTAURANTS
  }
}

export function setRestaurant(placeId) {
  return (dispatch) => {
    return getPlaceDetailsPromised(GOOGLE_PLACE_SERVICE, {placeId})
      .then(place => {
        dispatch({
          type: SET_RESTAURANT,
          payload: place
        });

        return Promise.resolve();
      })
      .then(() => {
        dispatch({
          type: REDIRECT,
          payload: {
            method: 'push',
            nextUrl: `/restaurants/${placeId}`
          }
        });

        return Promise.resolve();
      })
      .catch(() => {
        console.log('Could not fetch restaurant details')
      });
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
  const getRestaurants = fetchRestaurants();

  return (dispatch, getState) => {
    getPositionPromised()
      .then(position => {
        if (bool) {
          let {latitude, longitude} = position;

          dispatch({
            type: SET_SELF_LOCATION,
            payload: {selfLocation: {latitude, longitude, use: true}}
          });

          dispatch({
            type: CLEAR_RESTAURANTS
          })
        } else {
          return Promise.reject();
        }

        return Promise.resolve();
      })
      .then(() => getRestaurants(dispatch, getState))
      .catch(() => {
        dispatch({
          type: SET_SELF_LOCATION,
          payload: {selfLocation: {use: false, lat: null, lon: null}}
        })
      });
  }
}
