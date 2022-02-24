import React, { useState } from "react";
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
          {/*<Routes>
          
          <Route
            exact
            path="/signals"
            element={<PrivateRoute Component={Signals} />}
          />
        </Routes>*/}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Dashboard;
