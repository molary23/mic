import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../asset/images/mic-light.png";

function Home() {
  return (
    <div>
      <div className="home-page">
        <div className="home-box">
          <img alt="MIC Earn Business Logo" src={logo} className="mb-5" />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
