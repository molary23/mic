import { Routes, Route } from "react-router-dom";

import Footer from "../../layout/Footer";
import SubNav from "../../layout/SubNav";

function HomePage() {
  return (
    <div className="HomePage">
      <SubNav />
      <section>
        <Routes></Routes>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
