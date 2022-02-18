import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Dashboard from "./dashboard/Dashboard";
import Main from "./main/Main";
import Register from "./main/component/Register";

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
          ""
        ) : (
          <Route path="/register" element={<Register />} />
        )}
      </Route>
    </Routes>
  );
}

export default App;
