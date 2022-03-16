import React from "react";
import { CgSpinner } from "react-icons/cg";

function Spinner() {
  return (
    <div>
      <div className="loader icon-spin">
        <CgSpinner />
      </div>
    </div>
  );
}

export default Spinner;
