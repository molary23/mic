import React from "react";
import GoUp from "./GoUp";

function Footer() {
  return (
    <div>
      <GoUp />
      <nav className="navbar navbar-expand-sm bg-light navbar-dark fixed-bottom justify-content-center">
        <p className="">
          Copyright © <span translate="no">MIC Earn Business</span> 2020 -{" "}
          {new Date().getFullYear()}
        </p>
      </nav>
    </div>
  );
}

export default Footer;
