import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./components/home/HomePage";
import ConsumerProfilePage from "./components/profile/ProfilePage";
import RiderProfilePage from "./components/rider/ProfilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";

function App({ currentUser }) {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          path="/profile"
          component={() =>
            currentUser.userType === "consumer" ? (
              <ConsumerProfilePage />
            ) : currentUser.userType === "rider" ? (
              <RiderProfilePage currentUser={currentUser} />
            ) : (
              <h1>saf rak tlefti</h1>
            )
          }
        />
      </Switch>
      <ToastContainer autoClose={3000} newestOnTop hideProgressBar />
    </>
  );
}

const mapStateToProps = ({ currentUser }) => ({ currentUser });

export default connect(mapStateToProps)(App);
