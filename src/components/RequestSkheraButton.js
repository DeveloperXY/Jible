import React from "react";
import icEdit from "../images/ic_edit.svg";
import { Link } from "react-router-dom";
import "./requestSkheraButton.css";
import whiteRightArrowIcon from "../images/arrowRightWhite.svg";

function RequestSkheraButton({ history }) {
  function onRequestSkhera() {
    history.push("/profile/request");
  }

  return (
    <div className="request-skhera page-section" onClick={onRequestSkhera}>
      <img className="edit-icon" alt="" src={icEdit} />
      <div className="bottom-container">
        <Link to="/profile/request" className="request-shera-text">
          Request Skhera
        </Link>
        <img
          src={whiteRightArrowIcon}
          className="request-skhera-arrow-icon"
          alt="Go"
        />
      </div>
    </div>
  );
}

export default RequestSkheraButton;
