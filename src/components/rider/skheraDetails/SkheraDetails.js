import React, { useEffect, useState } from "react";
import "./skheraDetails.css";
import callIcon from "../images/ic_call.svg";
import { loadSkhera } from "../../../api/skheraApi";
import ListItemCheckBoxes from "./ListItemCheckBoxes";
import { loadRiderItinerary } from "../../../redux/actions/skheraActions";
import { connect } from "react-redux";

function SkheraDetails({
  loadRiderItinerary,
  emitSkheraItemReady,
  emitSkheraPickedUp,
  match: {
    params: { skheraId }
  },
  currentUser
}) {
  const [skhera, setCurrentSkhera] = useState({});
  const [client, setSkheraClient] = useState({});
  const [areAllItemsChecked, setAreAllItemsChecked] = useState(false);

  useEffect(() => {
    loadSkhera(skheraId).then(data => {
      setCurrentSkhera(data.skhera);
      setSkheraClient(data.client);
    });
  }, []);

  useEffect(() => {
    if (Object.keys(skhera).length > 0)
      setAreAllItemsChecked(skhera.items.every(item => item.isReady));
  }, [skhera]);

  function handleItemReadinessChange(itemId, newValue, checkboxes) {
    emitSkheraItemReady(itemId, skheraId, newValue);
    setAreAllItemsChecked(
      Object.keys(checkboxes).every(key => checkboxes[key].isChecked)
    );
  }

  return (
    <div className="skhera-details-container">
      <div className="skhera-details-header">
        <div className="skhera-counter">Skhera 1</div>
        <div className="skhera-info">
          {skhera.date}
          <br />
          Price: {skhera.price}
        </div>
      </div>
      <div className="client-contact-details">
        <div className="client-personal-info">
          <img className="client-profile-img" alt="" src={client.image} />
          <div className="client-textual-info">
            <div className="client-name">{client.name}</div>
            <div className="client-phone-number">{client.phone}</div>
          </div>
        </div>
        <img src={callIcon} alt="" />
      </div>
      <div className="skhera-description">{skhera.description}</div>
      <div className="skhera-items-checklist">
        {skhera.items && (
          <ListItemCheckBoxes
            items={skhera.items}
            handleItemReadinessChange={handleItemReadinessChange}
          />
        )}
      </div>
      <div className="price-container">
        <div className="skhera-price-label">Price</div>
        <div className="skhera-price-value">N/A</div>
      </div>
      <div className="skhera-time-distance">
        <div className="skhera-time-distance-label">Time and Distance</div>
        <div className="skhera-time-distance-value">Unknown</div>
      </div>
      <input
        type="button"
        className="green-btn picked-up-btn"
        value="Picked up"
        disabled={skhera.status !== "ON_THE_WAY" || !areAllItemsChecked}
        onClick={() => {
          emitSkheraPickedUp(skheraId);
          setCurrentSkhera({ ...skhera, status: "ORDER_PICKED_UP" });
          loadRiderItinerary(currentUser._id);
        }}
      />
      <input
        type="button"
        className="green-btn delivered-btn"
        value="Delivered"
        disabled={skhera.status === "ON_THE_WAY"}
      />
    </div>
  );
}

const mapStateToProps = ({ currentUser }) => ({
  currentUser
});

const mapDispatchToProps = {
  loadRiderItinerary
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SkheraDetails);
