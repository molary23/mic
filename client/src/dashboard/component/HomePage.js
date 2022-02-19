import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Footer from "../../layout/Footer";
import SubNav from "../../layout/SubNav";
import SideNav from "../../layout/SideNav";
import Signal from "./Signal";

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
        <Routes>
          <Route exact path="/signal" element={<Signal />} />
        </Routes>
      </section>
      <Footer />
    </div>
  );
}

export default HomePage;
