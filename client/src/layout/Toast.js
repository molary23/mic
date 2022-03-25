import React from "react";
import PropTypes from "prop-types";

import { BsCheckCircle } from "react-icons/bs";
import { MdReportGmailerrorred } from "react-icons/md";

function Toast(props) {
  const { text, category } = props;
  return (
    <div>
      <div
        className={`toast show text-white ${
          category !== "error" ? "toast-success" : "toast-error"
        }`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">
            {category !== "error" ? "Success" : "Error"}
          </strong>
          <small>
            {category !== "error" ? (
              <BsCheckCircle />
            ) : (
              <MdReportGmailerrorred />
            )}
          </small>
        </div>
        <div className="d-flex">
          <div className="toast-body">{text}</div>
        </div>
      </div>
    </div>
  );
}

Toast.propTypes = {
  text: PropTypes.string.isRequired,
  category: PropTypes.string,
};

export default Toast;
