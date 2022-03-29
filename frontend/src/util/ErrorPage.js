import React from "react";

import MainNav from "../layout/MainNav";
import Footer from "../layout/Footer";

function PageNotFound() {
  return (
    <div>
      <MainNav />
      <section>
        <div className="error-main"></div>
      </section>
      <Footer />
    </div>
  );
}

export default PageNotFound;
