import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./style/main.css";
import Main from "./component/Main";
import ErrorPage from "./util/ErrorPage";
import ProgressBar from "./layout/ProgressBar";

function App() {
  return (
    <Suspense fallback={<ProgressBar />}>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="*" exact element={<ErrorPage />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
