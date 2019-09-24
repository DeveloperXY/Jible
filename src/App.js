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
import AuthPage from "./components/home/AuthPage";

function App({ currentUser }) {
  const [riderSocket, setRiderSocket] = useState(undefined);

  function openNewSocket() {
    setRiderSocket(
      openSocket("http://localhost:5000", {
        query: `userId=${currentUser._id}&userType=${currentUser.userType}`
      })
    );
  }

  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          path="/auth/signup/:userType"
          render={props => <AuthPage action="signup" {...props} />}
        />
        <Route
          path="/auth/login"
          render={props => <AuthPage action="login" {...props} />}
        />

        <Route
          path="/profile"
          render={props => {
            const jwtToken = localStorage.getItem("jwt");

            if (currentUser.userType === "consumer") {
              return <ConsumerProfilePage />;
            } else if (currentUser.userType === "rider") {
              if (riderSocket === undefined) openNewSocket();
              return (
                <RiderPage
                  {...props}
                  socket={riderSocket}
                  currentUser={currentUser}
                />
              );
            } else {
              return <h1>saf rak tlefti</h1>;
            }
          }}
        />
      </Switch>
      <ToastContainer autoClose={3000} newestOnTop hideProgressBar />
    </>
  );
}

const mapStateToProps = ({ currentUser }) => ({ currentUser });

export default connect(mapStateToProps)(App);
