import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./components/home/HomePage";
import ConsumerProfilePage from "./components/profile/ProfilePage";
import RiderPage from "./components/rider/RiderPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { DrawerLayout } from "./components/rider/drawer/DrawerLayout";

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
              // <RiderPage currentUser={currentUser} />
              <DrawerLayout />
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
