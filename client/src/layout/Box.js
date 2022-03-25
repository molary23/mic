import React from "react";
import PropTypes from "prop-types";

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

Box.propTypes = {
  sender: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

export default Box;
