import "../App.css";
import { Routes, Route, Link } from "react-router-dom";

import Home from "./component/Home";
import Register from "./component/Register";

function Main() {
  return (
    <div className="Main">
      Hello from Main <Link to="/register">Click</Link>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default Main;
