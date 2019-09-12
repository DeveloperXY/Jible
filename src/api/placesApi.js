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

export function fetchRouteSegments(fromPlaceId, toPlaceId) {
  console.log("from place id: " + fromPlaceId);
  console.log("to place id: " + toPlaceId);
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
        travelMode: "WALKING"
      },
      (response, status) => {
        if (status === "OK") {
          const segments = response.routes[0].legs[0].steps;
          resolve(segments);
        } else {
          console.log("Directions request failed: " + status);
          reject(status);
        }
      }
    );
  });
}
