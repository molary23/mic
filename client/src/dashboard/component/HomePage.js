import { Routes, Route } from "react-router-dom";

import Footer from "../../layout/Footer";
import SubNav from "../../layout/SubNav";
import SideNav from "../../layout/SideNav";
import { useState } from "react";

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
        <Routes></Routes>
      </section>
      <Footer />
    </div>
  );
}

export default HomePage;
