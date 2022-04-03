import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../asset/images/mic-light.png";

function Home() {
  const auth = useSelector((state) => state.auth),
    navigate = useNavigate();
  const checkAuth = () => {
    if (auth.isAuthenticated) {
      let to;
      if (auth.user.level === 1) {
        to = "/user?navigate=lost";
      }
      if (auth.user.level === 2) {
        to = "/sp?navigate=lost";
      }
      if (auth.user.level === 3) {
        to = "/admin?navigate=lost";
      }
      navigate(to, { replace: true });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(checkAuth, []);

  return (
    <div>
      <div className="home-page">
        <div className="home-page-box">
          <div className="container-fluid">
            <div className="home-box">
              <img alt="MIC Earn Business Logo" src={logo} className="mb-5" />
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
