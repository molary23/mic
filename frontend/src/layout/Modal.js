import React, { useState } from "react";

import { AiOutlineClose } from "react-icons/ai";

function Modal(props) {
  const { modal, onClick } = props,
    [open, setOpen] = useState(modal);

  const closeModal = () => {
    setOpen(false);
    onClick(false);
  };
  return (
    <div className="">
      <div
        className={`modal fade ${open ? "show d-block" : "d-none"}`}
        id="myModal"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{"title"}</h4>
              <button type="button" className="btn-close" onClick={closeModal}>
                <AiOutlineClose />
              </button>
            </div>

            <div className="modal-body">{"text"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
