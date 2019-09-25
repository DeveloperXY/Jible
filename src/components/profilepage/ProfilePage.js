import React, { useState, useEffect } from "react";
import ConsumerProfilePage from "../profile/ProfilePage";
import RiderPage from "../rider/RiderPage";
import openSocket from "socket.io-client";
import { connect } from "react-redux";
import * as authApi from "../../api/authApi";
import * as userActions from "../../redux/actions/userActions";
import { baseUrl } from "../../api/apiUtils";

function ProfilePage({ currentUser, saveUser, history }) {
  const [riderSocket, setRiderSocket] = useState(undefined);

  useEffect(() => {
    console.log(Object.keys(currentUser).length);
    if (Object.keys(currentUser).length === 0) {
      const jwtToken = localStorage.getItem("jwt");
      console.log(jwtToken);
      if (jwtToken) {
        authApi.verifyJwtToken(jwtToken).then(data => {
          if (data.status === "valid_token") {
            const user = data.user;
            saveUser(user);
          } else {
            localStorage.removeItem("jwt");
            history.push("/");
          }
        });
      } else {
        history.push("/");
      }
    }
  }, []);

  function openNewSocket() {
    setRiderSocket(
      openSocket(baseUrl, {
        query: `userId=${currentUser._id}&userType=${currentUser.userType}`,
        secure: true
      })
    );
  }

  if (currentUser.userType === "consumer") {
    return <ConsumerProfilePage history={history} />;
  } else if (currentUser.userType === "rider") {
    if (riderSocket === undefined) openNewSocket();
    return (
      <RiderPage
        history={history}
        socket={riderSocket}
        currentUser={currentUser}
      />
    );
  } else return <></>;
}

const mapStateToProps = ({ currentUser }) => ({ currentUser });

const mapDispatchToProps = {
  saveUser: userActions.saveUserLocally
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
