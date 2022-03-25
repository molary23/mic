import React from "react";
import PropTypes from "prop-types";

function CardDetails(props) {
  const { label, value } = props;
  return (
    <div className="card-line-details">
      <div className="card-label">{label}</div>
      <div className="card-value">{value}</div>
    </div>
  );
}

CardDetails.propTypes = {
  label: PropTypes.any.isRequired,
  value: PropTypes.any,
};
export default CardDetails;
