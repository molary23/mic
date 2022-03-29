import React from "react";
import Register from "./Register";
import { useLocation } from "react-router-dom";

function Referral() {
  let location = useLocation();
  let params = location.pathname.split("referral")[1];
  let referral = params.split(":")[1];

  return (
    <div>
      <Register
        referred={referral !== "" || referral !== undefined ? true : false}
        referral={referral}
      />
    </div>
  );
}

export default Referral;
