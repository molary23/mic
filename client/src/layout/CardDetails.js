import React from "react";

function CardDetails(props) {
  const { label, value } = props;
  return (
    <div className="card-line-details">
      <div className="card-label">{label}</div>
      <div className="card-value">{value}</div>
    </div>
  );
}

export default CardDetails;
