import React from "react";
import GoogleMapReact from "google-map-react";
import icPickUp from "../../../images/ic_pickup.svg";
import icDropOff from "../../../images/ic_drop_off.svg";
import ScooterImg from "../../../images/ic_scooter.svg";

const SkheraMap = ({
  skhera,
  onGoogleApiLoaded,
  bootstrapURLKeys,
  defaultCenter,
  defaultZoom,
  zoom
}) => (
  <GoogleMapReact
    bootstrapURLKeys={bootstrapURLKeys}
    defaultCenter={defaultCenter}
    defaultZoom={defaultZoom}
    zoom={zoom}
    onGoogleApiLoaded={({ map, maps }) =>
      onGoogleApiLoaded(map, steps => {
        new window.google.maps.Polyline({
          path: steps,
          geodesic: true,
          strokeColor: "#000000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map
        });
      })
    }
  >
    <img
      src={icPickUp}
      alt=""
      lat={skhera.fromAddress.lat}
      lng={skhera.fromAddress.lng}
    />
    <img
      src={icDropOff}
      alt=""
      lat={skhera.toAddress.lat}
      lng={skhera.toAddress.lng}
    />
    {skhera.currentRiderLocation && (
      <img
        src={ScooterImg}
        alt=""
        lat={skhera.currentRiderLocation.lat}
        lng={skhera.currentRiderLocation.lng}
      />
    )}
  </GoogleMapReact>
);

export default SkheraMap;
