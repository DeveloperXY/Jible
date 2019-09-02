import React, { useState } from "react";
import PropTypes from "prop-types";
import "./homePage.css";
import homeIcon from "../../images/home.svg";
import rightArrowIcon from "../../images/arrowRight.svg";
import helmetIcon from "../../images/helmet.svg";
import appImage from "../../images/app.png";
import playStoreImage from "../../images/google-play-badge.svg";
import appStoreImage from "../../images/download-on-the-app-store-apple.svg";
import Modal from "react-modal";
import AuthDialog from "../dialogs/AuthDialog";
import { bindActionCreators } from "redux";
import * as userActions from "../../redux/actions/userActions";
import { connect } from "react-redux";

Modal.setAppElement("#root");

function HomePage({ history }) {
  const [isSignupDialogOpen, setSignupDialogOpenState] = useState(false);
  const [isLoginDialogOpen, setLoginDialogOpenState] = useState(false);
  const [userType, setUserType] = useState(undefined);

  function openSignupDialog(type = "consumer") {
    setUserType(type);
    setSignupDialogOpenState(true);
  }

  function openLoginDialog() {
    setLoginDialogOpenState(true);
  }

  function closeSignupDialog() {
    setUserType(undefined);
    setSignupDialogOpenState(false);
  }

  function closeLoginDialog() {
    setLoginDialogOpenState(false);
  }

  function onFacebookResponse(response, action) {
    if (isSignupDialogOpen) closeSignupDialog();
    if (isLoginDialogOpen) closeLoginDialog();

    const {
      name,
      email,
      picture: {
        data: { url }
      }
    } = response;

    if (action === "signup") {
      fetch("http://localhost:9000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          image: url,
          userType
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === "ok") {
            userActions.saveUser({ name, email, url });
            history.push("/profile");
          }
          console.log(`fetch data: ${data}`);
        })
        .catch(error => console.log(error));
    } else if (action === "login") {
      fetch("http://localhost:9000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === "ok") {
            userActions.saveUser({ name, email, url });
            history.push("/profile");
          }
          console.log(`fetch data: ${data}`);
        })
        .catch(error => console.log(error));
    }
  }

  return (
    <div className="hero">
      <div className="hero-content">
        <div className="header-content">
          <span className="jible-header">Jible</span>
          <div className="buttons-container">
            <input type="button" className="green-btn" value="Signup" />
            <input
              type="button"
              className="white-btn"
              value="Login"
              onClick={openLoginDialog}
            />
          </div>
        </div>
        <div className="content-description">
          <p>
            An on demand service that picks-up anything you requested through
            the app and delivers it to your door within one hour.
          </p>
        </div>
        <div className="signup-section">
          <div className="consumer-btn" onClick={() => openSignupDialog()}>
            <img src={homeIcon} className="left-icon" alt="Home" />
            <span className="signup-consumer-text">Signup as a Consumer</span>
            <img src={rightArrowIcon} className="right-icon" alt="Go" />
          </div>
          <div className="rider-btn" onClick={() => openSignupDialog("rider")}>
            <img src={helmetIcon} className="left-icon" alt="Home" />
            <span className="signup-rider-text">Signup as a Rider</span>
            <img src={rightArrowIcon} className="right-icon" alt="Go" />
          </div>
        </div>
      </div>
      <div className="how-it-works-header">
        <p>How it Works</p>
      </div>
      <div className="how-it-works-content">
        <div className="how-it-works-part1">
          <p className="sub-header">REQUEST YOUR SKHERA</p>
          <p className="sub-content">Choosing a quality cookware set</p>
        </div>
        <div className="how-it-works-part2">
          <p className="sub-header">EASY ORDERING</p>
          <p className="sub-content">Serve eggs anytime</p>
        </div>
        <div className="how-it-works-part3">
          <p className="sub-header">REAL-TIME TRACKING</p>
          <p className="sub-content">
            Microwave cooking is the next wave of the future
          </p>
        </div>
      </div>
      <div className="apps-section">
        <img src={appImage} className="app-image" alt="Mobile app" />
        <div className="apps-right-section">
          <div className="apps-header">
            <p>Track your deliveries with the Jible app</p>
          </div>
          <div className="store-logos">
            <img
              src={playStoreImage}
              className="store-img play-store"
              alt="Play Store"
            />
            <img src={appStoreImage} className="store-img" alt="App Store" />
          </div>
        </div>
      </div>
      <div className="footer-content">
        <span className="jible-footer-header">Jible</span>
        <div className="footer-items">
          <a href="#" className="about-item footer-link">
            About
          </a>
          <a href="#" className="terms-item footer-link">
            Terms
          </a>
          <a href="#" className="policy-item footer-link">
            Privacy policy
          </a>
        </div>
      </div>
      <AuthDialog
        contentLabel="Signup dialog"
        action="Signup"
        isModalOpen={isSignupDialogOpen}
        closeModal={closeSignupDialog}
        responseFacebook={response => {
          onFacebookResponse(response, "signup");
        }}
      />
      <AuthDialog
        contentLabel="Login dialog"
        action="Login"
        isModalOpen={isLoginDialogOpen}
        closeModal={closeLoginDialog}
        responseFacebook={response => {
          onFacebookResponse(response, "login");
        }}
      />
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(HomePage);
