import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  handleApiLoaded = (map, maps) => {
    this.props.onGoogleMapReady(map);
  };

  render() {
    const { mapRef } = this.props;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "500px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDd3dI_tqR6Rx-IMpS9r5mWCP5oAEibiE0" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          // onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
          onGoogleApiLoaded={({ map, maps }) => mapRef(map)}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
