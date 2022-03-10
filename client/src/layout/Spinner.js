import React from "react";

function Spinner() {
  console.log("first");
  return (
    <div>
      <div className="loader">
        <i className="fas fa-circle-notch fa-2x fa-spin" />
      </div>
    </div>
  );
}

export default Spinner;
