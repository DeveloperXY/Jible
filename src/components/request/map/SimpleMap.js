import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import MapMarker from "./marker/MapMarker";
import "./simpleMap.css";

class SimpleMap extends Component {
  state = {
    fromAddress: this.props.fromAddress,
    toAddress: this.props.toAddress
  };

  static defaultProps = {
    height: "500px",
    width: "100%",
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
    const {
      mapRef,
      fromAddress,
      toAddress,
      height,
      width,
      centerMarker
    } = this.props;
    return (
      <div className={this.props.className} style={{ height, width }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDd3dI_tqR6Rx-IMpS9r5mWCP5oAEibiE0" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center={this.props.center}
          zoom={this.props.zoom}
          onGoogleApiLoaded={({ map, maps }) => {
            if (mapRef !== undefined) mapRef(map);
          }}
        >
          {centerMarker}
          {fromAddress !== undefined && (
            <MapMarker lat={fromAddress.lat} lng={fromAddress.lng} text="A" />
          )}
          {toAddress !== undefined && (
            <MapMarker lat={toAddress.lat} lng={toAddress.lng} text="B" />
          )}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
