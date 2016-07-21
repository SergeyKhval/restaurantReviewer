import {SET_CITY, SET_RESTAURANTS} from '../constants/cities';

export function setCity(city) {
  //Google waits for DOM node as an argument for PlacesService() method
  //We will create dummy node without actually rendering a map
  let map = new google.maps.Map(document.createElement('div')),
    location = new google.maps.LatLng(city.location.lat, city.location.lng),
    request = {
      location: location,
      radius: '5000',
      types: ['restaurant', 'cafe', 'bar']
    },
    service = new google.maps.places.PlacesService(map);

  return (dispatch) => {
    dispatch({
      type: SET_CITY,
      payload: city
    });

    service.nearbySearch(request, function (results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        dispatch({
          type: SET_RESTAURANTS,
          payload: results
        })
      }
    });
  }
}
