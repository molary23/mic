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
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <Login />
              </ErrorBoundary>
            }
          ></Route>
          <Route
            exact
            path="/forgot"
            element={
              <ErrorBoundary>
                <Forgot />
              </ErrorBoundary>
            }
          ></Route>
          <Route
            exact
            path="/reset"
            element={
              <ErrorBoundary>
                <Reset />
              </ErrorBoundary>
            }
          ></Route>
          <Route
            exact
            path="/confirm"
            element={
              <ErrorBoundary>
                <Confirm />
              </ErrorBoundary>
            }
          ></Route>
          <Route
            exact
            path="/verify"
            element={
              <ErrorBoundary>
                <VerifyEmail />
              </ErrorBoundary>
            }
          ></Route>
          <Route
            exact
            path="/register"
            element={
              <ErrorBoundary>
                <Register />
              </ErrorBoundary>
            }
          />
          <Route
            path="/referral/:username"
            element={
              <ErrorBoundary>
                <Referral />
              </ErrorBoundary>
            }
          />
        </Route>
        <Route
          path="/sp"
          element={<PrivateRoute Component={ProviderDashboard} />}
        >
          <Route
            path="/sp/"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={ProviderSignals} />
              </ErrorBoundary>
            }
          />
          <Route
            path="/sp/settings"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={ProviderSettings} />
              </ErrorBoundary>
            }
          />
        </Route>
        <Route
          path="/user"
          element={
            <ErrorBoundary>
              <PrivateRoute Component={Dashboard} />
            </ErrorBoundary>
          }
        >
          <Route
            exact
            path="/user/"
            element={<PrivateRoute Component={Index} />}
          ></Route>
          <Route
            exact
            path="/user/signals"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={Signals} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/user/transactions"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={Transactions} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/user/earnings"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={Earnings} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/user/referrals"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={Referrals} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/user/subscriptions"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={Subscriptions} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/user/pay"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={Pay} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/user/payment"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={Payment} />
              </ErrorBoundary>
            }
          ></Route>
          <Route
            exact
            path="/user/payments"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={Payments} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/user/withdrawals"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={Withdrawals} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/user/settings"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={Settings} />
              </ErrorBoundary>
            }
          />

          <Route
            exact
            path="/user/forum/:id"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={Forum} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/user/forums"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={Forums} />
              </ErrorBoundary>
            }
          />
        </Route>

        <Route
          path="/admin"
          element={<PrivateRoute Component={AdminDashboard} />}
        >
          <Route
            exact
            path="/admin/"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AdminIndex} />
              </ErrorBoundary>
            }
          ></Route>
          <Route
            exact
            path="/admin/earnings"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AdminEarnings} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/admin/signals"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AdminSignals} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/admin/subscriptions/"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AdminSubscriptions} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/admin/currencies"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AdminCurrency} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/admin/signal-providers"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AdminSignalProviders} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/admin/referrals"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AdminReferrals} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/admin/accounts"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AdminAccounts} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/admin/announcements"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AdminAnnouncements} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/admin/users"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AdminUsers} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/admin/withdrawals"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AdminWithdrawals} />
              </ErrorBoundary>
            }
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
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AddminTransactions} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/admin/admins"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AdminViewAdmins} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/admin/wallets"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AdminWallets} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/admin/settings"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AdminSettings} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/admin/forum/:id"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AdminForum} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/admin/forums"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AdminForums} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/admin/user/:id"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AdminUser} />
              </ErrorBoundary>
            }
          />

          <Route
            exact
            path="/admin/admin/:id/"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AdminViewAdmin} />
              </ErrorBoundary>
            }
          />
          <Route
            exact
            path="/admin/bonus/:bonusId"
            element={
              <ErrorBoundary>
                <PrivateRoute Component={AdminBonus} />
              </ErrorBoundary>
            }
          />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
