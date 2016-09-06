import {SET_CITY, FETCH_RESTAURANTS, CLEAR_RESTAURANTS} from '../constants/cities';
import {SET_RESTAURANT, SET_PLACE_TYPE, SET_SELF_LOCATION} from '../constants/restaurant';
import {REDIRECT} from '../constants/redirect';
import googleService from '../services/googleService';

function getPlaceDetailsPromised(service, request) {
  function processResponse(resolve, reject) {
    return (place, status) => status === service.statuses.OK ? resolve(place) : reject(status)
  }

  return new Promise((resolve, reject) => service.places.getDetails(request, processResponse(resolve, reject)));
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

export function fetchCityInfo(placeId) {
  return (dispatch) => {
    getPlaceDetailsPromised(googleService, {placeId})
      .then(place => {
        let label = place.address_components.reduce((str, component) => {
          if (component.types.indexOf('locality') > -1 || component.types.indexOf('country') > -1) {
            str = `${str}, ${component.long_name}`;
          }

          return str.trim().replace(/^,/, '');
        }, '');

        dispatch({
          type: SET_CITY,
          payload: {
            label,
            place_id: placeId
          }
        })
      })
      .catch(e => {
        console.log(e);
      })
  }

}

export function fetchRestaurants(cityId = null, service = googleService) {
  return (dispatch, getState) => {
    function nearbySearchCallback(places, status, pagination) {
      if (status === service.statuses.OK) {
        dispatch({
          type: FETCH_RESTAURANTS,
          payload: {
            results: places.filter(r => !!r.rating && r.types.indexOf('lodging') < 0),
            pagination
          }
        })
      } else {
        console.log(status);
      }
    }

    let state = getState();

    let {placeType, openNow, rankBy, selfLocation} = state.restaurantList,
      placeId = cityId || state.city.place_id;

    if (!selfLocation.use) {
      getPlaceDetailsPromised(googleService, {placeId})
        .then(place => {
          let location = service.position(place.geometry.location.lat(), place.geometry.location.lng());
          return {
            location,
            radius: '25000',
            openNow,
            type: placeType
          };
        })
        .then(request => service.places.nearbySearch(request, nearbySearchCallback))
        .catch((e) => {
          console.log(e);
        })
    } else {
      let request = {
        location: service.position(selfLocation.latitude, selfLocation.longitude),
        openNow,
        rankBy,
        types: [placeType]
      };

      service.places.nearbySearch(request, nearbySearchCallback)
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
    return getPlaceDetailsPromised(googleService, {placeId})
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
      .catch((e) => {
        console.log(e)
      });
  }
}

export function setPlaceType(type) {
  return {
    type: SET_PLACE_TYPE,
    payload: type
  }
}

export function setSelfLocation(bool = false) {
  const getRestaurants = fetchRestaurants(googleService);

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
