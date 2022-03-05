import React from "react";

function Toast(props) {
  const { text } = props;
  return (
    <div>
      <div
        className="toast show bottom-0 start-10 text-white"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{text}</div>
        </div>
      </div>
    </div>
  );
}

export default Toast;
