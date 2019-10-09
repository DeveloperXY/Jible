import React, { useEffect, useState } from "react";
import "./skheraDetails.css";
import callIcon from "../images/ic_call.svg";
import { loadSkhera } from "../../../api/skheraApi";
import ListItemCheckBoxes from "./ListItemCheckBoxes";
import { loadRiderItinerary } from "../../../redux/actions/skheraActions";
import { connect } from "react-redux";
import greenArrow from "../images/green_arrow_back.svg";
import ItemPriceDialog from "./ItemPriceDialog";

function SkheraDetails({
  loadRiderItinerary,
  emitSkheraItemReady,
  emitSkheraPickedUp,
  emitSkheraDelivered,
  navigateToSkherasTodo,
  match: {
    params: { skheraId }
  },
  currentUser,
  socket
}) {
  const [skhera, setCurrentSkhera] = useState({});
  const [client, setSkheraClient] = useState({});
  const [areAllItemsChecked, setAreAllItemsChecked] = useState(false);
  const [openItemPriceDialog, setOpenItemPriceDialog] = useState(false);
  const [payload, setPayload] = useState({});

  function loadSkheraDetails() {
    loadSkhera(skheraId).then(data => {
      setCurrentSkhera(data.skhera);
      setSkheraClient(data.client);
    });
  }

  useEffect(() => {
    loadSkheraDetails();

    socket.on("skheraItemReadyResponse", data => {
      loadSkheraDetails();
    });
  }, []);

  useEffect(() => {
    if (Object.keys(skhera).length > 0)
      setAreAllItemsChecked(skhera.items.every(item => item.isReady));
  }, [skhera]);

  function handleItemReadinessChange(
    itemId,
    itemName,
    newValue,
    checkboxes,
    checkCurrent,
    uncheckCurrent,
    setNewItemPrice
  ) {
    setPayload({
      itemId,
      itemName,
      newValue,
      checkboxes,
      checkCurrent,
      uncheckCurrent,
      setNewItemPrice
    });
    setOpenItemPriceDialog(true);
  }

  function handlePriceDialogClose() {
    setOpenItemPriceDialog(false);
    payload.uncheckCurrent();
  }

  function handleConfirm(price) {
    if (price === 0) {
      handlePriceDialogClose();
      return;
    }

    payload.setNewItemPrice(price);

    emitSkheraItemReady(payload.itemId, skheraId, payload.newValue, price);
    setAreAllItemsChecked(
      Object.keys(payload.checkboxes).every(
        key => payload.checkboxes[key].isChecked
      )
    );
    setOpenItemPriceDialog(false);
  }

  return (
    <>
      <div className="back-link back-container" onClick={navigateToSkherasTodo}>
        <img src={greenArrow} alt="" />
        <div>All skheras</div>
      </div>
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
          <div className="skhera-price-value">
            {skhera.actualPrice === 0 ? "N/A" : `${skhera.actualPrice} dh`}
          </div>
        </div>
        <div className="skhera-time-distance">
          <div className="skhera-time-distance-label">Time and Distance</div>
          <div className="skhera-time-distance-value">
            {skhera.timeAndDistance}
          </div>
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
          disabled={
            skhera.status === "ON_THE_WAY" ||
            skhera.status === "ORDER_DELIVERED"
          }
          onClick={() => {
            emitSkheraDelivered(skheraId, currentUser._id);
          }}
        />
      </div>

      {openItemPriceDialog && (
        <ItemPriceDialog
          open={openItemPriceDialog}
          handleClose={handlePriceDialogClose}
          handleConfirm={handleConfirm}
          payload={payload}
        />
      )}
    </>
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
