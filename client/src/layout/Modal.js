import React, { useState } from "react";
import { Link } from "react-router-dom";

function Modal(props) {
  const { modal, sender } = props;
  const [open, setOpen] = useState(modal);

  const closeModal = () => {
    setOpen(false);
  };
  let text, title;
  if (sender === "register") {
    text = (
      <div>
        <p>Your have Successfully Registered! </p>
        <p>
          Click{" "}
          <Link to="//localhost:3000/login" className="default-anchor">
            Here
          </Link>{" "}
          to Login
        </p>
      </div>
    );
    title = "Registration Successful!";
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

export default Modal;
