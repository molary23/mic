import "../style/main.css";
import { Routes, Route } from "react-router-dom";

import Home from "./component/Home";
import Register from "./component/Register";
import MainNav from "./../layout/MainNav";
import Footer from "./../layout/Footer";
import Referral from "./component/Referral";

function Main() {
  return (
    <div className="Main">
      <MainNav />
      <section>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />} />
          <Route exact path="/referral/:username" element={<Referral />} />
        </Routes>
      </section>
      <Footer />
    </div>
  );
}

export default Main;
