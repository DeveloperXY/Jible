import React, { useState } from "react";
import "./requestSkhera.css";
import RequestSkheraDetails from "./details/RequestSkheraDetails";
import RequestSkheraMap from "./map/RequestSkheraMap";
import * as skheraApi from "../../api/skheraApi";
import { connect } from "react-redux";

function RequestSkhera({ currentUser }) {
  const [fromAddress, setFromAddress] = useState({});
  const [toAddress, setToAddress] = useState({});

  const handleSkheraOrder = (description, skheraItems, price) => {
    skheraApi.orderSkhera({
      id: currentUser._id,
      description,
      items: skheraItems,
      price,
      fromAddress,
      toAddress
    });
  };
  const handleFromAddressChange = fromAddr => {
    setFromAddress(fromAddr);
  };
  const handleToAddressChange = toAddr => {
    setToAddress(toAddr);
  };

  return (
    <div className="request-skhera-body">
      <h1 className="request-skhera-header">Request a Skhera</h1>
      <div className="request-content">
        <RequestSkheraDetails onOrderNow={handleSkheraOrder} />
        <RequestSkheraMap
          onFromAddrChange={handleFromAddressChange}
          onToAddrChange={handleToAddressChange}
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
