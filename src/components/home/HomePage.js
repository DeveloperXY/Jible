import React, { useState } from "react";
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
import { withRouter } from "react-router";
import jwt from "jsonwebtoken";

Modal.setAppElement("#root");

function HomePage({ history, actions }) {
  const [isSignupDialogOpen, setSignupDialogOpenState] = useState(false);
  const [isLoginDialogOpen, setLoginDialogOpenState] = useState(false);
  const [userType, setUserType] = useState(undefined);
  const signUpRedirecUri = "https://bc13a39a.ngrok.io/auth/signup";
  const loginRedirecUri = "https://bc13a39a.ngrok.io/auth/login";

  function signUserUp() {
    window.location.replace(
      `https://www.facebook.com/v4.0/dialog/oauth?client_id=2375768049184396&redirect_uri=${signUpRedirecUri}/${userType}&state=state-param`
    );
  }

  function logUserIn() {
    window.location.replace(
      `https://www.facebook.com/v4.0/dialog/oauth?client_id=2375768049184396&redirect_uri=${loginRedirecUri}&state=state-param`
    );
  }

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
            actions.saveUserLocally(data.user);
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
            actions.saveUserLocally(data.user);
            history.push("/profile");
          }
          console.log(`fetch data: ${data}`);
        })
        .catch(error => console.log(error));
    }
  }

  return (
    <div className="hero">
      <div className="hero-content-wrapper">
        <div className="hero-content">
          <div className="header-content">
            <span className="jible-header">Jible</span>
            <div className="buttons-container">
              <input
                type="button"
                className="green-btn signup-btn"
                value="Signup"
              />
              <input
                type="button"
                className="white-btn login-btn"
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
            <div
              className="rider-btn"
              onClick={() => openSignupDialog("rider")}
            >
              <img src={helmetIcon} className="left-icon" alt="Home" />
              <span className="signup-rider-text">Signup as a Rider</span>
              <img src={rightArrowIcon} className="right-icon" alt="Go" />
            </div>
            <div className="rider-btn" onClick={openLoginDialog}>
              <span className="signup-rider-text">Log in</span>
            </div>
          </div>
        </div>
      </div>
      <div className="how-it-works-header">
        <p>How it Works</p>
      </div>
      <div className="how-it-works-content">
        <div className="how-it-works-part1-wrapper part-wrapper">
          <div className="how-it-works-part1 how-it-works-part">
            <p className="sub-header">REQUEST YOUR SKHERA</p>
            <p className="sub-content">Choosing a quality cookware set</p>
          </div>
          <div className="how-it-works-part-empty how-it-works-part"></div>
        </div>
        <div className="how-it-works-part2-wrapper part-wrapper">
          <div className="how-it-works-part-empty how-it-works-part"></div>
          <div className="how-it-works-part2 how-it-works-part">
            <p className="sub-header">EASY ORDERING</p>
            <p className="sub-content">Serve eggs anytime</p>
          </div>
        </div>
        <div className="how-it-works-part3-wrapper part-wrapper">
          <div className="how-it-works-part-empty how-it-works-part"></div>
          <div className="how-it-works-part3 how-it-works-part">
            <p className="sub-header">REAL-TIME TRACKING</p>
            <p className="sub-content">
              Microwave cooking is the next wave of the future
            </p>
          </div>
        </div>
      </div>
      <div className="apps-section">
        <img src={appImage} className="app-image" alt="Mobile app" />
        <div className="apps-right-section">
          <div className="apps-header">
            Track your deliveries with the Jible app
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
        action="Signup"
        isModalOpen={isSignupDialogOpen}
        closeModal={closeSignupDialog}
        handleFacebookAuth={signUserUp}
      />
      <AuthDialog
        action="Login"
        isModalOpen={isLoginDialogOpen}
        closeModal={closeLoginDialog}
        handleFacebookAuth={logUserIn}
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
)(withRouter(HomePage));
