import React, { useState, useEffect } from "react";
import tawkTo from "../../util/TawkTo";

import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import ErrorBoundary from "../../util/ErrorBoundary";
import { useLocation } from "react-router-dom";

import { Outlet } from "react-router-dom";
import SubNav from "../../layout/SubNav";
import SideNav from "../../layout/SideNav";
import Footer from "../../layout/Footer";

import { logoutUser } from "../../action/authAction";

function Dashboard() {
  const [open, setOpen] = useState(true),
    location = useLocation(),
    dispatch = useDispatch(),
    auth = useSelector((state) => state.auth),
    level = auth.user.level,
    username = auth.user.username;

  const tawkToPropertyId = process.env.REACT_APP_TAWK_PROPERTY_ID;
  useEffect(() => {
    if (username) {
      tawkTo(tawkToPropertyId, username);
    }
    return () => {
      window.Tawk_API.hideWidget();
    };
  }, [username]);

  if (level !== 1) {
    dispatch(logoutUser());
  }

  const toggleOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const closeSide = (value) => {
    setOpen(value);
  };
  return (
    <div className="dashboard-body">
      <SubNav onClick={toggleOpen} />
      <SideNav act={open} onClick={closeSide} />
      <section>
        <div className={`dashboard-content pb-4 ${!open && "dash-full"}`}>
          <ErrorBoundary {...location}>
            <Outlet />
          </ErrorBoundary>
        </div>
      </section>
      <Footer />
    </div>
  );
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func,
};

export default Dashboard;
