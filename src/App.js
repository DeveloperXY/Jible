import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./components/home/HomePage";
import ProfilePage from "./components/profile/ProfilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/profile" component={ProfilePage} />
      </Switch>
      <ToastContainer autoClose={3000} newestOnTop hideProgressBar />
    </>
  );
}

export default App;
