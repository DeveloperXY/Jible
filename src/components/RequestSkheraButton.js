import React from "react";
import icEdit from "../images/ic_edit.svg";
import { Link } from "react-router-dom";

function RequestSkheraButton({ history }) {
  function onRequestSkhera() {
    history.push("/profile/request");
  }

  return (
    <div className="request-skhera page-section" onClick={onRequestSkhera}>
      <img className="edit-icon" alt="" src={icEdit} />
      <Link to="/profile/request" className="request-shera-text">
        Request Skhera
      </Link>
    </div>
  );
}

export default RequestSkheraButton;
