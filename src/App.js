import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./components/home/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthPage from "./components/home/AuthPage";
import ProfilePage from "./components/profilepage/ProfilePage";

function App(props) {
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

        <Route path="/profile" component={ProfilePage} />
      </Switch>
      <ToastContainer autoClose={3000} newestOnTop hideProgressBar />
    </>
  );
}

export default App;
