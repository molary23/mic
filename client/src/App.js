import "./style/sub.css";
import { Routes, Route } from "react-router-dom";
import store from "./store";
import jwtDecode from "jwt-decode";
import setAuthToken from "./util/setAuthToken";
import { setCurrentUser } from "./action/authAction";
import { logoutUser } from "./action/authAction";
import { clearCurrentProfile } from "./action/profileAction";

import PrivateRoute from "./util/PrivateRoute";

import PageNotFound from "./util/404Page";
import Register from "./component/Register";
import Referral from "./component/Referral";
import Forgot from "./component/Forgot";
import Reset from "./component/Reset";
import Login from "./component/Login";
import Home from "./component/Home";

//User
import Dashboard from "./component/user/Dashboard";
import Signals from "./component/user/Signals";
import Transactions from "./component/user/Transactions";
import Bonuses from "./component/user/Bonuses";
import Referrals from "./component/user/Referrals";
import Pay from "./component/user/Pay";
import Payments from "./component/user/Payments";
import Withdrawals from "./component/user/Withdrawals";

import Index from "./component/user";
import Subscriptions from "./component/user/Subscriptions";

//Admin
import AdminDashboard from "./component/admin/Dashboard";
import AdminIndex from "./component/admin/AdminIndex";
import AdminBonuses from "./component/admin/Bonuses";
import AdminBonus from "./component/admin/Bonus";
import AddminTransaction from "./component/admin/Transaction";
import AddminTransactions from "./component/admin/Transactions";
import AdminReferrals from "./component/admin/Referrals";
import AdminUsers from "./component/admin/Users";
import AdminUser from "./component/admin/User";
import AdminWithdrawals from "./component/admin/Withdrawals";
import AdminPayments from "./component/admin/Payments";
import AdminSubscriptions from "./component/admin/Subscriptions";
import AdminCurrency from "./component/admin/Currency";
import AdminSignalProviders from "./component/admin/SignalProviders";
import AdminViewAdmins from "./component/admin/ViewAdmin";
import AdminSignals from "./component/admin/Signals";
import AdminAccounts from "./component/admin/Accounts";
import AdminAnnouncements from "./component/admin/Announcements";

// Signal Provider
import ProviderDashboard from "./component/signalprovider/Dashboard";
import ProviderSignals from "./component/signalprovider/Signals";

/*
import axios from "axios";
let params = { name: "adeola" };
axios
  .get(`/api/public/finder/${JSON.stringify(params)}`)
  .then((response) => {
    console.log(response);
  })
  .catch((err) => console.log(err.response));
*/
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
        <Route
          path="/sp"
          element={<PrivateRoute Component={ProviderDashboard} />}
        >
          <Route
            path="/sp/"
            element={<PrivateRoute Component={ProviderSignals} />}
          />
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
            path="/user/subscriptions"
            element={<PrivateRoute Component={Subscriptions} />}
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

        <Route
          path="/admin"
          element={<PrivateRoute Component={AdminDashboard} />}
        >
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
            path="/admin/signals"
            element={<PrivateRoute Component={AdminSignals} />}
          />
          <Route
            exact
            path="/admin/subscriptions/"
            element={<PrivateRoute Component={AdminSubscriptions} />}
          />
          <Route
            exact
            path="/admin/currencies"
            element={<PrivateRoute Component={AdminCurrency} />}
          />
          <Route
            exact
            path="/admin/signal-providers"
            element={<PrivateRoute Component={AdminSignalProviders} />}
          />
          <Route
            exact
            path="/admin/referrals"
            element={<PrivateRoute Component={AdminReferrals} />}
          />
          <Route
            exact
            path="/admin/accounts"
            element={<PrivateRoute Component={AdminAccounts} />}
          />
          <Route
            exact
            path="/admin/announcements"
            element={<PrivateRoute Component={AdminAnnouncements} />}
          />
          <Route
            exact
            path="/admin/users"
            element={<PrivateRoute Component={AdminUsers} />}
          />
          <Route
            exact
            path="/admin/withdrawals"
            element={<PrivateRoute Component={AdminWithdrawals} />}
          />
          <Route
            exact
            path="/admin/payments"
            element={<PrivateRoute Component={AdminPayments} />}
          />
          <Route
            exact
            path="/admin/transactions"
            element={<PrivateRoute Component={AddminTransactions} />}
          />
          <Route
            exact
            path="/admin/viewadmins"
            element={<PrivateRoute Component={AdminViewAdmins} />}
          />

          <Route
            exact
            path="/admin/user/:userId"
            element={<PrivateRoute Component={AdminUser} />}
          />
          <Route
            exact
            path="/admin/bonus/:bonusId"
            element={<PrivateRoute Component={AdminBonus} />}
          />
          <Route
            exact
            path="/admin/transaction/:transactionId"
            element={<PrivateRoute Component={AddminTransaction} />}
          />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
