import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import store from "./store";
import jwtDecode from "jwt-decode";
import setAuthToken from "./util/setAuthToken";
import { setCurrentUser } from "./action/authAction";

import PrivateRoute from "./util/PrivateRoute";

import Dashboard from "./dashboard/Dashboard";
import Main from "./main/Main";
import PageNotFound from "./util/404Page";
import Register from "./main/component/Register";
import Referral from "./main/component/Referral";
import Forgot from "./dashboard/component/Forgot";
import Login from "./dashboard/component/Login";
import HomePage from "./dashboard/component/HomePage";
import Signals from "./dashboard/component/admin/Signals";

if (localStorage.jwtToken) {
  // Set Auth Toke  Header
  setAuthToken(localStorage.jwtToken);
  // Decode Token then get User Info and Expiry
  const decoded = jwtDecode(localStorage.jwtToken);

  // set User and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  const currenTime = Date.now() / 1000;
  if (decoded.expiry < currenTime) {
    // Logout User

    // Clear current Profile

    // Redirect to Login
    window.location.href = "/login";
  }
}

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
            <Route path="/" element={<PrivateRoute Component={HomePage} />} />
            <Route
              exact
              path="/admin-signals"
              element={<PrivateRoute Component={Signals} />}
            />
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
