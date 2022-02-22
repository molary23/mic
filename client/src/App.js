import "./style/sub.css";
import { Routes, Route } from "react-router-dom";
import store from "./store";
import jwtDecode from "jwt-decode";
import setAuthToken from "./util/setAuthToken";
import { setCurrentUser } from "./action/authAction";
import { logoutUser } from "./action/authAction";

import PrivateRoute from "./util/PrivateRoute";

import Dashboard from "./component/Dashboard";
import PageNotFound from "./util/404Page";
import Register from "./component/Register";
import Referral from "./component/Referral";
import Forgot from "./component/Forgot";
import Reset from "./component/Reset";
import Login from "./component/Login";
import Home from "./component/Home";
import Signals from "./component/user/Signals";
import Transactions from "./component/user/Transactions";

import Index from "./component/user";

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
    store.dispatch(logoutUser());
    // Clear current Profile

    // Redirect to Login
    window.location.href = "/login";
  }
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Login />}></Route>
          <Route exact path="/forgot" element={<Forgot />}></Route>
          <Route exact path="/reset" element={<Reset />}></Route>
          <Route exact path="/register" element={<Register />} />
          <Route path="/referral/:username" element={<Referral />} />
        </Route>

        <Route path="/user" element={<PrivateRoute Component={Dashboard} />}>
          <Route
            exact
            path="/user/"
            element={<PrivateRoute Component={Index} />}
          ></Route>
          <Route
            exact
            path="/user/signals"
            element={<PrivateRoute Component={Signals} />}
          />
          <Route
            exact
            path="/user/transactions"
            element={<PrivateRoute Component={Transactions} />}
          />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
