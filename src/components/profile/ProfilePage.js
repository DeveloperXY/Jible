import React from "react";
import "./profilePage.css";
import RequestSkhera from "../request/RequestSkhera";
import ProfileComponent from "./ProfileComponent";
import { connect } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";
import JibleLogo from "../../images/Logo";

function ProfilePage({ currentUser }) {
  return (
    <div className="main-content">
      <div className="header-content">
        <Link to="/" className="jible-link">
          <JibleLogo />
        </Link>
        <div className="profile-header-section">
          <img className="profile-img" alt="" src={currentUser.image} />
          <div className="current-username">{currentUser.name}</div>
        </div>
      </div>
      <div className="body-content">
        <Switch>
          <Route path="/profile/request" component={RequestSkhera} />
          <Route path="/profile/details" component={ProfileComponent} />
          <Route component={ProfileComponent} />
        </Switch>
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

export default connect(mapStateToProps)(ProfilePage);
