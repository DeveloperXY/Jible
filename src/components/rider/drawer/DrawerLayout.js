import React from "react";
import "./drawerLayout.css";
import closeIcon from "../images/ic_close.svg";
import { connect } from "react-redux";

const DrawerLayout = ({
  currentUser,
  isOpen,
  closeDrawer,
  currentPage,
  routes,
  children
}) => {
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
          {routes.map(route => (
            <li
              className={
                "drawer-menu-item" +
                (currentPage === route.value
                  ? " drawer-menu-item-selected"
                  : "")
              }
              onClick={route.action}
              key={route.value}
            >
              {route.name}
            </li>
          ))}
        </ul>
      </div>
      {children}
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
