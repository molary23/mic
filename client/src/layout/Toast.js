import React from "react";

function Toast(props) {
  const { text } = props;
  return (
    <div>
      <div className="toast show">
        <div className="toast-body">{text}</div>
      </div>
    </div>
  );
}

export default Toast;
