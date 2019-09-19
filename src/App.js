import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./components/home/HomePage";
import ConsumerProfilePage from "./components/profile/ProfilePage";
import RiderPage from "./components/rider/RiderPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import openSocket from "socket.io-client";

function App({ currentUser }) {
  const [riderSocket, setRiderSocket] = useState(undefined);

  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          path="/profile"
          render={props => {
            if (riderSocket === undefined) {
              setRiderSocket(
                openSocket("http://localhost:5000", {
                  query: `userId=${currentUser._id}&userType=${currentUser.userType}`
                })
              );
            }

            return currentUser.userType === "consumer" ? (
              <ConsumerProfilePage />
            ) : currentUser.userType === "rider" ? (
              <RiderPage
                {...props}
                socket={riderSocket}
                currentUser={currentUser}
              />
            ) : (
              <h1>saf rak tlefti</h1>
            );
          }}
        />
      </Switch>
      <ToastContainer autoClose={3000} newestOnTop hideProgressBar />
    </>
  );
}

const mapStateToProps = ({ currentUser }) => ({ currentUser });

export default connect(mapStateToProps)(App);
