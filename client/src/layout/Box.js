import React from "react";

function Box(props) {
  return (
    <div>
      <div>
        <div className="form-box mb-3">
          <div className="page-title mb-4 mt-2">
            <h1>{props.sender}</h1>
          </div>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Box;
