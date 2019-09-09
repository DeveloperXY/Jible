import React, { useState } from "react";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { saveUserRemotely } from "../../redux/actions/userActions";
import { Route, Switch } from "react-router-dom";
import EditProfileComponent from "./edit/EditProfileComponent";
import FaqComponent from "../faq/FaqComponent";

function ProfileComponent({ currentUser, saveUserRemotely, history }) {
  const [user, setUser] = useState({ ...currentUser });
  const [isMySkheraSelected, setIsMySkheraSelected] = useState(false);
  const [isMyProfileSelected, setIsMyProfileSelected] = useState(true);
  const [isMyAddressSelected, setIsMyAddressSelected] = useState(false);
  const [isFaqSelected, setIsFaqSelected] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveUserRemotely(user).then(() => {
      toast.success("Profile info updated.");
    });
  }

  function goToMySkhera() {
    history.push("/profile/myskhera");
    setIsMySkheraSelected(true);
    setIsMyProfileSelected(false);
    setIsMyAddressSelected(false);
    setIsFaqSelected(false);
  }

  function goToMyProfile() {
    history.push("/profile/details");
    setIsMyProfileSelected(true);
    setIsMySkheraSelected(false);
    setIsMyAddressSelected(false);
    setIsFaqSelected(false);
  }

  function goToFaq() {
    history.push("/profile/faq");
    setIsFaqSelected(true);
    setIsMyProfileSelected(false);
    setIsMySkheraSelected(false);
    setIsMyAddressSelected(false);
  }

  return (
    <>
      <div className="options-menu page-section">
        <div
          className={
            "options-menu-item " +
            (isMySkheraSelected ? "options-menu-item-selected" : "")
          }
          onClick={goToMySkhera}
        >
          My Skhera
        </div>
        <div
          className={
            "options-menu-item " +
            (isMyProfileSelected ? "options-menu-item-selected" : "")
          }
          onClick={goToMyProfile}
        >
          My Profile
        </div>
        <div
          className={
            "options-menu-item " +
            (isMyAddressSelected ? "options-menu-item-selected" : "")
          }
        >
          My Address
        </div>
        <div
          className={
            "options-menu-item " +
            (isFaqSelected ? "options-menu-item-selected" : "")
          }
          onClick={goToFaq}
        >
          FAQ
        </div>
      </div>
      <Switch>
        <Route path="/profile/faq" component={FaqComponent} />
        <Route
          component={() => (
            <EditProfileComponent
              currentUser={user}
              onChange={handleChange}
              onSave={handleSave}
            />
          )}
        />
      </Switch>
    </>
  );
}

const mapStateToProps = state => {
  const { currentUser } = state;
  return {
    currentUser
  };
};

const mapDispatchToProps = {
  saveUserRemotely
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileComponent);
