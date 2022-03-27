import React, { useState } from "react";
import PropTypes from "prop-types";

function Accordion(props) {
  const { title, content, active } = props;
  const [isActive, setIsActive] = useState(active);

  return (
    <div className="mb-4">
      <div className="card">
        <div
          className="card-header"
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          <span className="card-link">{title}</span>
          {isActive ? (
            <span className="accordion-control">-</span>
          ) : (
            <span className="accordion-control">+</span>
          )}
        </div>
        <div>{isActive && <div className="card-body">{content}</div>}</div>
      </div>
    </div>
  );
}
Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};
export default Accordion;
