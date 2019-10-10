import React, { useState, useRef, useEffect } from "react";
import "./profilePage.css";
import RequestSkhera from "../request/RequestSkhera";
import ProfileComponent from "./ProfileComponent";
import { connect } from "react-redux";
import { Route, Switch, Link } from "react-router-dom";
import JibleLogo from "../../images/Logo";
import notificationIcon from "../../images/bell_unselected.svg";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { loadClientNotifications } from "../../redux/actions/notificationsActions";
import ClientNotifications from "./clientnotifications/ClientNotifications";

function ProfilePage({ currentUser, socket, loadNotifications }) {
  const isFirstSocketCheck = useRef(true);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    loadNotifications(currentUser._id);
  }, []);

  useEffect(() => {
    if (isFirstSocketCheck.current && socket !== undefined) {
      isFirstSocketCheck.current = false;

      socket.on("newNotification", data => {
        loadNotifications(currentUser._id);
      });
    }
  }, [socket]);

  const useStyles = makeStyles(theme => ({
    typography: {
      padding: theme.spacing(2)
    }
  }));
  const classes = useStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <div className="main-content">
      <div className="header-content">
        <Link to="/" className="jible-link">
          <JibleLogo />
        </Link>
        <div className="profile-header-section">
          <img
            className="notif-icon"
            alt=""
            src={notificationIcon}
            onClick={handleClick}
          />
          <img className="profile-img" alt="" src={currentUser.image} />
          <Link to="/profile/details" className="current-username">
            <div>{currentUser.name}</div>
          </Link>
        </div>
      </div>
      <div className="body-content">
        <Switch>
          <Route path="/profile/request" component={RequestSkhera} />
          <Route path="/profile/details" component={ProfileComponent} />
          <Route component={ProfileComponent} />
        </Switch>
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Typography className={classes.typography}>
          <ClientNotifications />
        </Typography>
      </Popover>
    </div>
  );
}

const mapStateToProps = state => {
  const { currentUser } = state;
  return {
    currentUser
  };
};

const mapDispatchToProps = {
  loadNotifications: loadClientNotifications
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
