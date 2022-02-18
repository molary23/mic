import "../style/sub.css";
import { Routes, Route } from "react-router-dom";

import Footer from "./../layout/Footer";
import Login from "./component/Login";

function Dashboard() {
  return (
    <div className="Dashboard">
      <section>
        <Routes>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </section>
      <Footer />
    </div>
  );
}

export default Dashboard;
