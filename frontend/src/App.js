import React from "react";
import { Routes, Route } from "react-router-dom";
import "./style/main.css";
import Main from "./component/Main";
import ErrorPage from "./util/ErrorPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="*" exact element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
