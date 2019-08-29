import React from "react";
import Modal from "react-modal";
import "./authDialog.css";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)"
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "65px 95px 65px 95px",
    transform: "translate(-50%, -50%)"
  }
};

const AuthDialog = ({ contentLabel, action, isModalOpen, closeModal }) => {
  const responseFacebook = response => {
    console.log(response);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <button onClick={closeModal}>close</button>
      <div className="auth-header">{action}</div>
      <h6 className="auth-subheader">Welcome to Jible Services</h6>

      <FacebookLogin
        appId="2375768049184396"
        autoload
        fields="name,email,picture"
        callback={responseFacebook}
        render={renderProps => (
          <button className="auth-facebook-btn" onClick={renderProps.onClick}>
            {action} with Facebook
          </button>
        )}
      />
    </Modal>
  );
};

export default AuthDialog;
