import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { MdReportGmailerrorred } from "react-icons/md";

function Toast(props) {
  const { text, category } = props;
  return (
    <div>
      <div
        className={`toast show bottom-0 start-10 text-white ${
          category === "success" ? "toast-success" : "toast-error"
        }`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <strong class="me-auto">
            {category === "success" ? "Success" : "Error"}
          </strong>
          <small>
            {category === "success" ? (
              <BsCheckCircle />
            ) : (
              <MdReportGmailerrorred />
            )}
          </small>
        </div>
        <div class="d-flex">
          <div class="toast-body">{text}</div>
        </div>
      </div>
    </div>
  );
}

export default Toast;
