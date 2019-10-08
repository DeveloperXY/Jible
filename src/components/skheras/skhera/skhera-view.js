import React from "react";
import MySkheraMapContainer from "../map/skhera-map-container";
import mapPin from "../../../images/map_pin.svg";
import icPhone from "../../../images/ic_phone.svg";
import { Motion, spring } from "react-motion";
import { SkheraContainer } from "./style";

const Skhera = ({ skhera, index }) => (
  <SkheraContainer key={skhera._id}>
    <div className="my-skheras-header">
      <Motion defaultStyle={{ opacity: 0.01 }} style={{ opacity: spring(1) }}>
        {interpolatingStyle => (
          <div className="skhera-count">Skhera #{index + 1}</div>
        )}
      </Motion>
    </div>
    <div className="status-tracker">
      <div className="textual-status">
        <div
          className={
            "status-item " +
            (skhera.status === "ORDER_RECEIVED" ? "status-item-selected" : "")
          }
        >
          Order Received
          <br />
          <span
            className={
              "mini-status " +
              (skhera.status === "ORDER_RECEIVED" ? "mini-status-selected" : "")
            }
          >
            Message/Call
          </span>
          <div
            className={
              "dot status-dot " +
              (skhera.status === "ORDER_RECEIVED" ? "status-dot-selected" : "")
            }
          ></div>
        </div>
        <div
          className={
            "status-item " +
            (skhera.status === "ON_THE_WAY" ||
            skhera.status === "ORDER_PICKED_UP"
              ? "status-item-selected"
              : "")
          }
        >
          On the way
          <br />
          <span
            className={
              "mini-status " +
              (skhera.status === "ON_THE_WAY" ||
              skhera.status === "ORDER_PICKED_UP"
                ? "mini-status-selected"
                : "")
            }
          >
            tracking
          </span>
          <div
            className={
              "dot status-dot " +
              (skhera.status === "ORDER_PICKED_UP" ||
              skhera.status === "ON_THE_WAY"
                ? "status-dot-selected"
                : "")
            }
          ></div>
        </div>
        <div
          className={
            "status-item " +
            (skhera.status === "ORDER_DELIVERED" ? "status-item-selected" : "")
          }
        >
          Delivered
          <br />
          <span
            className={
              "mini-status " +
              (skhera.status === "ORDER_DELIVERED"
                ? "mini-status-selected"
                : "")
            }
          >
            Rate
          </span>
          <div
            className={
              "dot status-dot " +
              (skhera.status === "ORDER_DELIVERED" ? "status-dot-selected" : "")
            }
          ></div>
        </div>
      </div>
      <div className="status-dots-connector"></div>
      <div className="client-map" style={{ height: "400px", width: "100%" }}>
        <MySkheraMapContainer skhera={skhera} />
      </div>
      <div className="my-skhera-details">
        <div className="my-skhera-text-details">
          <div className="my-skhera-date carved">{skhera.date}</div>
          <div className="my-skhera-price carved">Price: {skhera.price}</div>
          <div className="my-skhera-address carved">
            <img src={mapPin} alt="" />
            <div style={{ marginLeft: "8px" }}>{skhera.toAddress.name}</div>
          </div>
          <div className="my-skhera-description">{skhera.description}</div>
          <ul>
            {skhera.items.map(item => (
              <li>{item.name}</li>
            ))}
          </ul>
        </div>
        {skhera.riderId && (
          <div className="my-skhera-rider-details">
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={skhera.riderId.image}
                alt=""
                className="rider-profile-img"
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                  {skhera.riderId.name}
                </div>
                <div style={{ color: "#909090", fontSize: "16px" }}>
                  {skhera.riderId.phone}
                </div>
              </div>
            </div>
            <img
              src={icPhone}
              alt=""
              style={{
                minWidth: "24px",
                minHeight: "24px",
                marginRight: "8px"
              }}
            />
          </div>
        )}
      </div>
      <div className="my-skhera-price-est">
        <div className="estimated-price-labels">
          <div className="estimated-price">Estimated Price</div>
          <div className="estimated-time-distance">
            Estimated time and distance
          </div>
        </div>
        <div className="estimated-values">
          <div className="estimated-price-value">N/A</div>
          <div className="estimated-time-distance-value">
            {skhera.timeAndDistance}
          </div>
        </div>
      </div>
    </div>
  </SkheraContainer>
);

export default Skhera;
