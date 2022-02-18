import "../style/sub.css";
import { Routes, Route } from "react-router-dom";

import Footer from "./../layout/Footer";
import Login from "./component/Login";
import Forgot from "./component/Forgot";
import HomePage from "./component/HomePage";

function Dashboard() {
  return (
    <div className="Dashboard">
      <section>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/forgot" element={<Forgot />}></Route>
          <Route
            path="/dashboard/*"
            element={<HomePage />}
            render={(props) => {}}
          ></Route>
        </Routes>
      </section>
      <Footer />
    </div>
  );
}

export default Dashboard;
