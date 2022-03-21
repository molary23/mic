import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Outlet } from "react-router-dom";
import SubNav from "../../layout/SubNav";
import SideNav from "../../layout/SideNav";
import Footer from "../../layout/Footer";

import { logoutUser } from "../../action/authAction";

function Dashboard() {
  const [open, setOpen] = useState(true),
    dispatch = useDispatch(),
    auth = useSelector((state) => state.auth),
    level = auth.user.level;
  if (level !== 3) {
    dispatch(logoutUser());
  }

  const toggleOpen = (opt) => {
    setOpen(opt);
  };
  return (
    <div>
      <SubNav onClick={toggleOpen} />
      <SideNav act={open} />
      <section>
        <div className={`dashboard-content pb-4 ${!open && "dash-full"}`}>
          <Outlet />
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
