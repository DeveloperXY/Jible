import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import MapMarker from "./marker/MapMarker";

class SimpleMap extends Component {
  state = {
    fromAddress: this.props.fromAddress,
    toAddress: this.props.toAddress
  };

  static defaultProps = {
    center: {
      lat: 33.589886,
      lng: -7.603869
    },
    zoom: 6
  };

  handleApiLoaded = (map, maps) => {
    this.props.onGoogleMapReady(map);
  };

  render() {
    const { mapRef, fromAddress, toAddress } = this.props;
    return (
      <div style={{ height: "500px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDd3dI_tqR6Rx-IMpS9r5mWCP5oAEibiE0" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center={this.props.center}
          zoom={this.props.zoom}
          onGoogleApiLoaded={({ map, maps }) => mapRef(map)}
        >
          <MapMarker lat={fromAddress.lat} lng={fromAddress.lng} text="A" />
          <MapMarker lat={toAddress.lat} lng={toAddress.lng} text="B" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
