import "./style/sub.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import store from "./store";
import jwtDecode from "jwt-decode";
import setAuthToken from "./util/setAuthToken";
import { setCurrentUser } from "./action/authAction";
import { logoutUser } from "./action/authAction";
import { clearCurrentProfile } from "./action/profileAction";

import ErrorBoundary from "./util/ErrorBoundary";

import PrivateRoute from "./util/PrivateRoute";

import PageNotFound from "./util/404Page";
import Register from "./component/Register";
import Referral from "./component/Referral";
import Forgot from "./component/Forgot";
import Reset from "./component/Reset";
import Login from "./component/Login";
import Confirm from "./component/Confirm";
import VerifyEmail from "./component/VerifyEmail";
import Home from "./component/Home";

//User
import Dashboard from "./component/user/Dashboard";
import Signals from "./component/user/Signals";
import Transactions from "./component/user/Transactions";
import Earnings from "./component/user/Earnings";
import Referrals from "./component/user/Referrals";
import Pay from "./component/user/Pay";
import Payments from "./component/user/Payments";
import Withdrawals from "./component/user/Withdrawals";
import Settings from "./component/user/Settings";
import Forum from "./component/user/Forum";
import Forums from "./component/user/Forums";
import Payment from "./component/user/Payment";

import Index from "./component/user/Index";
import Subscriptions from "./component/user/Subscriptions";

//Admin
import AdminDashboard from "./component/admin/Dashboard";
import AdminIndex from "./component/admin/AdminIndex";
import AdminEarnings from "./component/admin/Earnings";
import AdminBonus from "./component/admin/Bonus";
import AddminTransactions from "./component/admin/Transactions";
import AdminReferrals from "./component/admin/Referrals";
import AdminUsers from "./component/admin/Users";
import AdminUser from "./component/admin/User";
import AdminWithdrawals from "./component/admin/Withdrawals";
import AdminPayments from "./component/admin/Payments";
import AdminSubscriptions from "./component/admin/Subscriptions";
import AdminCurrency from "./component/admin/Currency";
import AdminSignalProviders from "./component/admin/SignalProviders";
import AdminViewAdmins from "./component/admin/ViewAdmins";
import AdminSignals from "./component/admin/Signals";
import AdminAccounts from "./component/admin/Accounts";
import AdminAnnouncements from "./component/admin/Announcements";
import AdminSettings from "./component/admin/Settings";
import AdminForum from "./component/admin/Forum";
import AdminForums from "./component/admin/Forums";
import AdminWallets from "./component/admin/Wallets";
import AdminViewAdmin from "./component/admin/ViewAdmin";

// Signal Provider
import ProviderDashboard from "./component/signalprovider/Dashboard";
import ProviderSignals from "./component/signalprovider/Signals";
import ProviderSettings from "./component/signalprovider/Settings";

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
          <Route exact path="/confirm" element={<Confirm />}></Route>
          <Route exact path="/verify" element={<VerifyEmail />}></Route>
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
          <Route
            path="/sp/settings"
            element={<PrivateRoute Component={ProviderSettings} />}
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
            path="/user/earnings"
            element={<PrivateRoute Component={Earnings} />}
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
            path="/user/payment"
            element={<PrivateRoute Component={Payment} />}
          ></Route>
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
          <Route
            exact
            path="/user/settings"
            element={<PrivateRoute Component={Settings} />}
          />

          <Route
            exact
            path="/user/forum/:id"
            element={<PrivateRoute Component={Forum} />}
          />
          <Route
            exact
            path="/user/forums"
            element={<PrivateRoute Component={Forums} />}
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
            path="/admin/earnings"
            element={<PrivateRoute Component={AdminEarnings} />}
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
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AdminPayments} />
              </ErrorBoundary>
            }
          />

          <Route
            exact
            path="/admin/transactions"
            element={<PrivateRoute Component={AddminTransactions} />}
          />
          <Route
            exact
            path="/admin/admins"
            element={<PrivateRoute Component={AdminViewAdmins} />}
          />
          <Route
            exact
            path="/admin/wallets"
            element={<PrivateRoute Component={AdminWallets} />}
          />
          <Route
            exact
            path="/admin/settings"
            element={<PrivateRoute Component={AdminSettings} />}
          />
          <Route
            exact
            path="/admin/forum/:id"
            element={<PrivateRoute Component={AdminForum} />}
          />
          <Route
            exact
            path="/admin/forums"
            element={<PrivateRoute Component={AdminForums} />}
          />
          <Route
            exact
            path="/admin/user/:id"
            element={<PrivateRoute Component={AdminUser} />}
          />

          <Route
            exact
            path="/admin/admin/:id/"
            element={<PrivateRoute Component={AdminViewAdmin} />}
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
