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
