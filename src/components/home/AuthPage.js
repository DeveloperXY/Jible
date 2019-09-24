import React, { useEffect } from "react";
import queryString from "query-string";
import * as authApi from "../../api/authApi";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/userActions";

function AuthPage({
  action,
  location: { search },
  match: {
    params: { userType }
  },
  history,
  saveUser
}) {
  useEffect(() => {
    const values = queryString.parse(search);
    const code = values.code;
    const redirectUri = "https://0db4f3be.ngrok.io/auth";

    if (action === "login") {
      authApi
        .login({ code, redirectUri: `${redirectUri}/login` })
        .then(data => {
          if (data.status === "no_such_user") {
            history.push("/");
            return;
          }

          if (data.status === "ok") {
            const token = data.token;
            const user = data.user;
            localStorage.setItem("jwt", token);
            saveUser(user);
            history.push("/profile");
          }
        });
    } else if (action === "signup") {
      authApi
        .signUp({
          code,
          userType,
          redirectUri: `${redirectUri}/signup/${userType}`
        })
        .then(data => {
          if (data.status === "email_already_exists") {
            history.push("/");
            return;
          }

          if (data.status === "ok") {
            const token = data.token;
            const user = data.user;
            localStorage.setItem("jwt", token);
            saveUser(user);
            history.push("/profile");
          }
        });
    }
  }, []);

  return (
    <>
      {action === "login" ? (
        <h1>Logging you in...</h1>
      ) : (
        <h1>Signing you up...</h1>
      )}
    </>
  );
}

const mapDispatchToProps = {
  saveUser: userActions.saveUserLocally
};

export default connect(
  null,
  mapDispatchToProps
)(AuthPage);
