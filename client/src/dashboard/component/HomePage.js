import { Routes, Route, Outlet } from "react-router-dom";
import { useState } from "react";

import Footer from "../../layout/Footer";
import SubNav from "../../layout/SubNav";
import SideNav from "../../layout/SideNav";
import Signals from "./admin/Signals";

function HomePage(props) {
  const [open, setOpen] = useState(false);

  const toggleOpen = (opt) => {
    setOpen(opt);
  };

  return (
    <div className="HomePage">
      <SubNav onClick={toggleOpen} />
      <SideNav act={open} />
      <section>
        Homepage
        <Outlet />
        {/*<Routes>
          <Route exact path="/admin-signals" element={<Signals />} />
        </Routes>*/}
      </section>
      <Footer />
    </div>
  );
}

export default HomePage;
