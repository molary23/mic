import React from "react";

import MainNav from "../layout/MainNav";
import Footer from "../layout/Footer";
import SubFooter from "../layout/SubFooter";

function PageNotFound() {
  return (
    <div>
      <MainNav />
      <section>
        <div className="error-main"></div>
      </section>
      <SubFooter />
      <Footer />
    </div>
  );
}

export default PageNotFound;
