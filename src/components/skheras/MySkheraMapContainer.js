import React from "react";
import { fetchRouteSegmentsByCoords } from "../../api/placesApi";
import MySkheraMap from "./MySkheraMap";

export default class MySkheraMapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onGoogleApiLoaded = this.onGoogleApiLoaded.bind(this);
  }

  render() {
    return (
      <MySkheraMap
        skhera={this.props.skhera}
        onGoogleApiLoaded={this.onGoogleApiLoaded}
        bootstrapURLKeys={{
          key: "AIzaSyDd3dI_tqR6Rx-IMpS9r5mWCP5oAEibiE0"
        }}
        defaultCenter={{
          lat: 33.589886,
          lng: -7.603869
        }}
        defaultZoom={10}
        zoom={15}
      />
    );
  }

  onGoogleApiLoaded(map, next) {
    console.table(map);
    const skhera = this.props.skhera;
    const bounds = new window.google.maps.LatLngBounds();
    const from = {
      lat: parseFloat(skhera.fromAddress.lat),
      lng: parseFloat(skhera.fromAddress.lng)
    };
    const to = {
      lat: parseFloat(skhera.toAddress.lat),
      lng: parseFloat(skhera.toAddress.lng)
    };
    bounds.extend(from);
    bounds.extend(to);
    map.fitBounds(bounds);

    fetchRouteSegmentsByCoords(from, to).then(data => {
      const segments = data.segments;

      const steps = segments
        .map(segment => ({
          startLat: segment.start_location.lat(),
          endLat: segment.end_location.lat(),
          startLng: segment.start_location.lng(),
          endLng: segment.end_location.lng()
        }))
        .reduce(
          (acc, s) => [
            ...acc,
            { lat: s.startLat, lng: s.startLng },
            { lat: s.endLat, lng: s.endLng }
          ],
          []
        );

      next(steps);
    });
  }
}
