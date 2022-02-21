import React from "react";

import MainNav from "../layout/MainNav";
import Footer from "../layout/Footer";

function PageNotFound() {
  return (
    <div>
      <MainNav />
      <section>
        <h1>404 Error</h1>
        <h1>Page Not Found</h1>
      </section>
      <Footer />
    </div>
  );
}

export default PageNotFound;
