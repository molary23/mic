import React from "react";

function Toast() {
  return (
    <div>
      <div class="toast show">
        <div class="toast-header">
          Toast Header
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
          ></button>
        </div>
        <div class="toast-body">Some text inside the toast body</div>
      </div>
    </div>
  );
}

export default Toast;
