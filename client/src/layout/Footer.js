import React from "react";

function Footer() {
  return (
    <div>
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
