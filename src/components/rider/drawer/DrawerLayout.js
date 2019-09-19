import React, { useState } from "react";
import "./drawerLayout.css";
import closeIcon from "../images/ic_close.svg";
import ToggleButton from "react-toggle-button";
import { connect } from "react-redux";

const DrawerLayout = ({
  currentUser,
  isOpen,
  closeDrawer,
  navigateToSkherasTodo,
  navigateToMyProfile,
  navigateToStatistics,
  navigateToFaq,
  availability,
  setAvailability
}) => {
  const [isSkheratTodoSelected, setIsSkheratTodoSelected] = useState(false);
  const [isMyProfileSelected, setIsMyProfileSelected] = useState(true);
  const [isStatisticsSelected, setIsStatisticsSelected] = useState(false);
  const [isFaqSelected, setIsFaqSelected] = useState(false);

  function goToSkherasTodo() {
    setIsSkheratTodoSelected(true);
    setIsMyProfileSelected(false);
    setIsStatisticsSelected(false);
    setIsFaqSelected(false);
    navigateToSkherasTodo();
  }

  function goToMyProfile() {
    setIsSkheratTodoSelected(false);
    setIsMyProfileSelected(true);
    setIsStatisticsSelected(false);
    setIsFaqSelected(false);
    navigateToMyProfile();
  }

  function goToFaq() {
    setIsSkheratTodoSelected(false);
    setIsMyProfileSelected(false);
    setIsStatisticsSelected(false);
    setIsFaqSelected(true);
    navigateToFaq();
  }

  function goToStatistics() {
    setIsSkheratTodoSelected(false);
    setIsMyProfileSelected(false);
    setIsStatisticsSelected(true);
    setIsFaqSelected(false);
    navigateToStatistics();
  }

  return (
    <div className={"drawer-container" + (isOpen ? " drawer-open" : "")}>
      <img
        src={closeIcon}
        alt=""
        className="close-icon"
        onClick={closeDrawer}
      />
      <div className="drawer-header">
        <img className="drawer-profile-img" alt="" src={currentUser.image} />
        <div className="drawer-username">{currentUser.name}</div>
      </div>
      <div className="drawer-menu-items">
        <ul className="menu-items-list">
          <li
            className={
              "drawer-menu-item " +
              (isSkheratTodoSelected ? "drawer-menu-item-selected" : "")
            }
            onClick={goToSkherasTodo}
          >
            Skheras TODO
          </li>
          <li
            className={
              "drawer-menu-item " +
              (isMyProfileSelected ? "drawer-menu-item-selected" : "")
            }
            onClick={goToMyProfile}
          >
            My Profile
          </li>
          <li
            className={
              "drawer-menu-item " +
              (isStatisticsSelected ? "drawer-menu-item-selected" : "")
            }
            onClick={goToStatistics}
          >
            Statistics
          </li>
          <li
            className={
              "drawer-menu-item " +
              (isFaqSelected ? "drawer-menu-item-selected" : "")
            }
            onClick={goToFaq}
          >
            FAQ
          </li>
        </ul>
      </div>
      <div className="availability-container">
        <div className="availability-label">Availability</div>
        <ToggleButton
          value={availability}
          onToggle={value => {
            setAvailability(!value);
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { currentUser } = state;
  return {
    currentUser
  };
};

export default connect(mapStateToProps)(DrawerLayout);