'use strict';

/**
 Google waits for DOM node as an argument for PlacesService() method
 We will create dummy node without actually rendering a map
 */
const googleService = {
  places: new google.maps.places.PlacesService(new google.maps.Map(document.createElement('div'))),
  position: (lat, lng) => new google.maps.LatLng(lat, lng),
  statuses: google.maps.places.PlacesServiceStatus
};


export default googleService;
