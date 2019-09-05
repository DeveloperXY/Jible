export function fetchAddressSuggestions(query) {
  let service = new window.google.maps.places.AutocompleteService();
  return new Promise((resolve, reject) => {
    return service.getQueryPredictions(
      { input: query },
      (predictions, status) => {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
          alert(status);
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
