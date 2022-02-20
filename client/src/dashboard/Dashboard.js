import "../style/sub.css";
import { Routes, Route } from "react-router-dom";

import PrivateRoute from "../util/PrivateRoute";

import Footer from "./../layout/Footer";
import Login from "./component/Login";
import Forgot from "./component/Forgot";
import HomePage from "./component/HomePage";
import Signals from "./component/admin/Signals";

function Dashboard() {
  return (
    <div className="Dashboard">
      <section>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgot" element={<Forgot />}></Route>
          <Route path="/" element={<PrivateRoute Component={HomePage} />}>
            <Route
              exact
              path="/admin-signals"
              element={<PrivateRoute Component={Signals} />}
            />
          </Route>
        </Routes>
      </section>
      <Footer />
    </div>
  );
}

export default Dashboard;
