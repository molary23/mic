import "./style/sub.css";
import { Routes, Route } from "react-router-dom";
import store from "./store";
import jwtDecode from "jwt-decode";
import setAuthToken from "./util/setAuthToken";
import { setCurrentUser } from "./action/authAction";
import { logoutUser } from "./action/authAction";
import { clearCurrentProfile } from "./action/profileAction";

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
import Bonuses from "./component/user/Bonuses";
import Referrals from "./component/user/Referrals";
import Pay from "./component/user/Pay";
import Payments from "./component/user/Payments";
import Withdrawals from "./component/user/Withdrawals";

import Index from "./component/user";

//Admin
import AdminIndex from "./component/admin/AdminIndex";
import AdminBonuses from "./component/admin/Bonuses";
import AdminBonus from "./component/admin/Bonus";

if (localStorage.jwtToken) {
  // Set Auth Toke  Header
  setAuthToken(localStorage.jwtToken);
  // Decode Token then get User Info and Expiry
  const decoded = jwtDecode(localStorage.jwtToken);

  // set User and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  const currenTime = Date.now() / 1000;

  if (decoded.exp < currenTime) {
    // Logout User
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to Login
    window.location.href = "/";
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
          <Route
            exact
            path="/user/bonus"
            element={<PrivateRoute Component={Bonuses} />}
          />
          <Route
            exact
            path="/user/referrals"
            element={<PrivateRoute Component={Referrals} />}
          />
          <Route
            exact
            path="/user/pay"
            element={<PrivateRoute Component={Pay} />}
          />
          <Route
            exact
            path="/user/payments"
            element={<PrivateRoute Component={Payments} />}
          />
          <Route
            exact
            path="/user/withdrawals"
            element={<PrivateRoute Component={Withdrawals} />}
          />
        </Route>

        <Route path="/admin" element={<PrivateRoute Component={Dashboard} />}>
          <Route
            exact
            path="/admin/"
            element={<PrivateRoute Component={AdminIndex} />}
          ></Route>
          <Route
            exact
            path="/admin/bonuses"
            element={<PrivateRoute Component={AdminBonuses} />}
          />
          <Route
            exact
            path="/admin/bonus/:bonusId"
            element={<PrivateRoute Component={AdminBonus} />}
          />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
