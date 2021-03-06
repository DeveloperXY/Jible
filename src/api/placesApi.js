export function fetchAddressSuggestions(query) {
  let service = new window.google.maps.places.AutocompleteService();
  return new Promise((resolve, reject) => {
    return service.getQueryPredictions(
      { input: query },
      (predictions, status) => {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
          reject(status);
          return;
        }

        resolve(
          predictions.map(p => ({
            id: p.id,
            placeId: p.place_id,
            name: p.description
          }))
        );
      }
    );
  });
}

export function fetchPlaceGeometry(placeId, map) {
  let service = new window.google.maps.places.PlacesService(map);
  return new Promise((resolve, reject) => {
    return service.getDetails(
      {
        placeId,
        fields: ["geometry"]
      },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          resolve(place.geometry.location);
          return;
        }

        reject(status);
      }
    );
  });
}

export function fetchRouteSegmentsByPlaceIds(fromPlaceId, toPlaceId) {
  let service = new window.google.maps.DirectionsService();
  return new Promise((resolve, reject) => {
    return service.route(
      {
        origin: {
          placeId: fromPlaceId
        },
        destination: {
          placeId: toPlaceId
        },
        travelMode: "DRIVING"
      },
      (response, status) => {
        if (status === "OK") {
          const leg = response.routes[0].legs[0];
          const distance = leg.distance;
          const duration = leg.duration;
          const segments = leg.steps;
          resolve({
            segments,
            distance,
            duration
          });
        } else {
          console.log("Directions request failed: " + status);
          reject(status);
        }
      }
    );
  });
}

export function fetchRouteSegmentsByCoords(fromPlace, toPlace) {
  let service = new window.google.maps.DirectionsService();
  return new Promise((resolve, reject) => {
    return service.route(
      {
        origin: new window.google.maps.LatLng(
          parseFloat(fromPlace.lat),
          parseFloat(fromPlace.lng)
        ),
        destination: new window.google.maps.LatLng(
          parseFloat(toPlace.lat),
          parseFloat(toPlace.lng)
        ),
        travelMode: "DRIVING"
      },
      (response, status) => {
        if (status === "OK") {
          const leg = response.routes[0].legs[0];
          const distance = leg.distance;
          const duration = leg.duration;
          const segments = leg.steps;
          resolve({
            segments,
            distance,
            duration
          });
        } else {
          console.log("Directions request failed: " + status);
          reject(status);
        }
      }
    );
  });
}

export function fetchCurrentLocation(navigator) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      function() {
        reject({
          browserHasGeolocation: true
        });
      }
    );
  });
}
