import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../asset/images/logo.png";

function Home() {
  return (
    <div>
      <div className="home-page">
        <div className="home-box">
          <img alt="MIC Earn Business Logo" src={logo} className="mb-4" />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
