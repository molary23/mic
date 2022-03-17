import React from "react";
import { RiLoader2Line } from "react-icons/ri";

function Spinner() {
  return (
    <div>
      <div className="loader ">
        <RiLoader2Line className="icon-spin" />
      </div>
    </div>
  );
}

export default Spinner;
