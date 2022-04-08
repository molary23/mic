import React, { useState } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

function Modal(props) {
  const { modal, sender, onClick } = props;
  const [open, setOpen] = useState(modal);

  const closeModal = () => {
    setOpen(false);
    onClick(false);
  };
  let text, title;
  if (sender === "register") {
    text = (
      <div>
        <p>Your are almost there. Next step is to Verify your Email Address </p>
        <p>
          Click{" "}
          <Link to="/verify" className="default-anchor">
            Here
          </Link>{" "}
          to Verify your Email Address
        </p>
      </div>
    );
    title = "Registration Successful!";
  }
  if (sender === "forgot") {
    text = (
      <div>
        <p>A Password Reset Code has been sent to your Email. </p>
        <p>
          Click{" "}
          <Link to="/confirm" className="default-anchor">
            Here
          </Link>{" "}
          to confirm.
        </p>
      </div>
    );
    title = "Registration Successful!";
  }
  if (sender === "confirmed") {
    text = (
      <div>
        <p>Your Password Reset Code has been confirmed. </p>
        <p>
          Click{" "}
          <Link to="/reset" className="default-anchor">
            {" "}
            Here{" "}
          </Link>{" "}
          to change your password.
        </p>
      </div>
    );
    title = "Code Confirmed";
  }

  if (sender === "unconfirmed") {
    text = (
      <div>
        <p>Your Account has been secured. </p>
        <p>
          Click{" "}
          <Link to="/" className="default-anchor">
            {" "}
            Here{" "}
          </Link>{" "}
          to Login.
        </p>
      </div>
    );
    title = "Account Secured!";
  }

  if (sender === "reset") {
    text = (
      <div>
        <p>You have successfully reset your password. </p>
        <p>
          Click{" "}
          <Link to="/" className="default-anchor">
            {" "}
            Here{" "}
          </Link>{" "}
          to Login.
        </p>
      </div>
    );
    title = "Registration Successful!";
  }

  if (sender === "unverified") {
    text = (
      <div>
        <p>You are yet to verify your Email Address. </p>
        <p>A new Verification Code has been sent to your mail. </p>
        <p>
          Click{" "}
          <Link to="/verify" className="default-anchor">
            {" "}
            Here
          </Link>{" "}
          to Verify.
        </p>
      </div>
    );
    title = "Verify Email Address!";
  }

  if (sender === "verify") {
    text = (
      <div>
        <p>You are all done creating your Profile. </p>
        <p>
          Click{" "}
          <Link to="/" className="default-anchor">
            Here
          </Link>{" "}
          to Login into your Profile.
        </p>
      </div>
    );
    title = "Verification Successful!";
  }
  return (
    <div>
      <div
        className={`modal fade ${open ? "show d-block" : "d-none"}`}
        id="myModal"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{title}</h4>
              <button
                type="button"
                className="btn-close "
                onClick={closeModal}
              ></button>
            </div>

            <div className="modal-body">{text}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  sender: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  modal: PropTypes.bool,
};

export default Modal;
