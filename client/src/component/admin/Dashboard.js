import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Outlet } from "react-router-dom";
import SubNav from "../../layout/SubNav";
import SideNav from "../../layout/SideNav";
import Footer from "../../layout/Footer";

function Dashboard() {
  const [open, setOpen] = useState(true);

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
  getTableCount: PropTypes.func,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
});
export default connect(mapStateToProps, null)(Dashboard);
