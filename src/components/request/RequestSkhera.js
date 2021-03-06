import React, { useState, useEffect } from "react";
import "./requestSkhera.css";
import RequestSkheraDetails from "./details/RequestSkheraDetails";
import RequestSkheraMap from "./map/RequestSkheraMap";
import * as skheraApi from "../../api/skheraApi";
import { connect } from "react-redux";
import { toast } from "react-toastify";

function RequestSkhera({ currentUser, history }) {
  const [fromAddress, setFromAddress] = useState({});
  const [toAddress, setToAddress] = useState({});
  const [timeAndDistance, setTimeAndDistance] = useState("");
  const [distanceValue, setDistanceValue] = useState(0);
  const [estimatedPrice, setEstimatedPrice] = useState("");

  useEffect(() => {
    window.fbq("track", "viewContent", {
      content_name: "Really Fast Running Shoes",
      content_category: "Apparel & Accessories > Shoes"
    });
  });

  const handleSkheraOrder = (description, skheraItems, price) => {
    skheraApi
      .orderSkhera({
        id: currentUser._id,
        description,
        items: skheraItems,
        price,
        fromAddress,
        toAddress,
        timeAndDistance,
        distanceValue
      })
      .then(data => {
        if (data.status === "ok") {
          toast.success("Skhera created.");
          history.push("/profile/myskhera");
        }
      });
  };
  const handleFromAddressChange = fromAddr => {
    setFromAddress(fromAddr);
  };
  const handleToAddressChange = toAddr => {
    setToAddress(toAddr);
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="request-skhera-body">
      <div className="request-skhera-header">
        <h1 className="request-skhera-header-text">Request a Skhera</h1>
      </div>
      <div className="request-content">
        <RequestSkheraDetails
          onOrderNow={handleSkheraOrder}
          estimatedPrice={estimatedPrice}
          setEstimatedPrice={setEstimatedPrice}
        />
        <RequestSkheraMap
          onFromAddrChange={handleFromAddressChange}
          onToAddrChange={handleToAddressChange}
          setTimeAndDistance={setTimeAndDistance}
          setDistanceValue={setDistanceValue}
          estimatedPrice={estimatedPrice}
        />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  const { currentUser } = state;
  return {
    currentUser
  };
};

export default connect(mapStateToProps)(RequestSkhera);
