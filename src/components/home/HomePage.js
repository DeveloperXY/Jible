import React from "react";
import PropTypes from "prop-types";
import "./homePage.css";
import homeIcon from "../../images/home.svg";
import rightArrowIcon from "../../images/arrowRight.svg";
import helmetIcon from "../../images/helmet.svg";
import appImage from "../../images/app.png";
import playStoreImage from "../../images/google-play-badge.svg";
import appStoreImage from "../../images/download-on-the-app-store-apple.svg";

const HomePage = props => {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="header-content">
          <span className="jible-header">Jible</span>
          <div className="buttons-container">
            <input type="button" className="green-btn" value="Signup" />
            <input type="button" className="white-btn" value="Login" />
          </div>
        </div>
        <div className="content-description">
          <p>
            An on demand service that picks-up anything you requested through
            the app and delivers it to your door within one hour.
          </p>
        </div>
        <div className="signup-section">
          <div className="consumer-btn">
            <img src={homeIcon} class="left-icon" alt="Home" />
            <span className="signup-consumer-text">Signup as a Consumer</span>
            <img src={rightArrowIcon} class="right-icon" alt="Go" />
          </div>
          <div className="rider-btn">
            <img src={helmetIcon} class="left-icon" alt="Home" />
            <span className="signup-rider-text">Signup as a Rider</span>
            <img src={rightArrowIcon} class="right-icon" alt="Go" />
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
    </div>
  );
};

export default HomePage;