import React, { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

function Modal(props) {
  const { modal, onClick, sender } = props,
    [open, setOpen] = useState(modal);

  const closeModal = () => {
    setOpen(false);
    onClick(false);
  };
  let title, content;
  if (sender === "success") {
    title = "Message Sent!";
    content = (
      <div>
        <p className="mb-1">Thanks for Contacting Us.</p>
        <p>You will receive a response soon.</p>
      </div>
    );
  }
  if (sender === "error") {
    title = "Error sending Message!";
    content = "There was a Network Problem. Refresh and try again later.";
  }
  return (
    <div className="">
      <div
        className={`modal fade ${open ? "show d-block" : "d-none"}`}
        id="myModal"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{title}</h4>
              <button type="button" className="btn-close" onClick={closeModal}>
                <AiOutlineClose />
              </button>
            </div>

            <div className="modal-body">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
