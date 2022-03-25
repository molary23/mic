import React, { useState } from "react";
import PropTypes from "prop-types";

import { FiCheckCircle } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";

function ConfirmModal(props) {
  const { checktext, checktitle, onClick, check } = props;
  const [open, setOpen] = useState(check);
  const confirmAction = (value) => {
    setOpen(false);
    onClick(value);
  };
  return (
    <div>
      <div
        className={`modal fade ${open ? "show d-block" : "d-none"}`}
        id="addModal"
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{checktitle}</h4>
            </div>

            <div className="modal-body">
              <div className="mb-4">{checktext}</div>

              <div className="row">
                <div className="col-6">
                  <button
                    type="button"
                    className="btn reject-btn"
                    onClick={() => confirmAction(false)}
                  >
                    Cancel <MdOutlineCancel />
                  </button>
                </div>
                <div className="col-6">
                  <button
                    type="button"
                    className="btn accept-btn"
                    onClick={() => confirmAction(true)}
                  >
                    Ok <FiCheckCircle />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
ConfirmModal.propTypes = {
  checktext: PropTypes.any.isRequired,
  checktitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  check: PropTypes.bool,
};

export default ConfirmModal;
