import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Dashboard from "./dashboard/Dashboard";
import Main from "./main/Main";
import PageNotFound from "./util/404Page";
import Register from "./main/component/Register";
import Referral from "./main/component/Referral";
import Forgot from "./dashboard/component/Forgot";
import Login from "./dashboard/component/Login";
import HomePage from "./dashboard/component/HomePage";
import Signal from "./dashboard/component/Signal";

function App() {
  const [subdomain, setSubdomain] = useState(null);
  useEffect(() => {
    const host = window.location.host;
    const domainArray = host
      .split(".")
      .slice(0, host.includes("localhost") ? -1 : -2);

    if (domainArray.length > 0) {
      setSubdomain(domainArray[0]);
    }
  }, []);
  /*
  const subrouting = useRoutes(SubRoutes);
  const mainrouting = useRoutes(MainRoutes);

  return <div>{subdomain === "dashboard" ? subrouting : mainrouting}</div>;*/
  const tryfunc = () => {
    /*  axios
      .get("api/public/finder")
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });*/
  };
  tryfunc();
  return (
    <Routes>
      <Route
        path="/"
        element={subdomain === "dashboard" ? <Dashboard /> : <Main />}
        render={(props) => {
          if (subdomain === "dashboard") {
            return <Dashboard {...props} />;
          } else {
            return <Main {...props} />;
          }
        }}
      >
        {subdomain === "dashboard" ? (
          <Route path="/" element={<Dashboard />}>
            <Route path="/forgot" element={<Forgot />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<HomePage />}></Route>
            <Route exact path="/signal" element={<Signal />} />
          </Route>
        ) : (
          <Route path="/" element={<Main />}>
            <Route path="/register" element={<Register />} />
            <Route path="/referral/:username" element={<Referral />} />
          </Route>
        )}
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
