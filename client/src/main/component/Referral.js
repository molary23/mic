import React from "react";
import Register from "./Register";
import { useLocation } from "react-router-dom";

function Referral() {
  let location = useLocation();
  let referral = location.pathname.split(":")[1];

  //redirect to register if nothing is there

  return (
    <div>
      <Register referred={referral !== "" ? true : false} referral={referral} />
    </div>
  );
}

export default Referral;
