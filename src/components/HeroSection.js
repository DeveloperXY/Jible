import React from "react";
import PropTypes from "prop-types";
import "./heroSection.css";
import homeIcon from "../images/home.svg";
import rightArrowIcon from "../images/arrowRight.svg";
import helmetIcon from "../images/helmet.svg";

const HeroSection = props => {
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
            <img src={homeIcon} class="right-icon" alt="Go" />
          </div>
          <div className="rider-btn">
            <img src={helmetIcon} class="left-icon" alt="Home" />
            <span className="signup-rider-text">Signup as a Rider</span>
            <img src={helmetIcon} class="right-icon" alt="Go" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
