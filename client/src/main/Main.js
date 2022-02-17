import "../App.css";
import { Routes, Route } from "react-router-dom";

import Home from "./component/Home";
import Register from "./component/Register";

function Main() {
  return (
    <div className="Main">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default Main;
