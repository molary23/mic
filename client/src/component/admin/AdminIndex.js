import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { GiWallet } from "react-icons/gi";
import { RiExchangeBoxLine, RiShieldUserLine } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi";
import { MdOutlinePayments } from "react-icons/md";
import { BsCurrencyExchange } from "react-icons/bs";

import { AiOutlineUsergroupAdd, AiOutlineMoneyCollect } from "react-icons/ai";
import { CgSignal } from "react-icons/cg";

import { getAnalytics, clearActions } from "../../action/adminAction";
import { getAllCounts } from "../../action/authAction";
import ProgressBar from "../../layout/ProgressBar";
import Spinner from "../../layout/Spinner";

import { roundUp } from "../../util/LoadFunction";

export class Index extends Component {
  state = {
    allCounts:
      JSON.parse(localStorage.getItem("counts")) ?? this.props.auth.allCounts,
    userinfo:
      this.props.auth.user ?? jwtDecode(localStorage.getItem("jwtDecode")),
  };
  componentDidMount() {
    this.props.getAnalytics();
  }
  componentWillUnmount() {
    this.props.clearActions("analytics");
  }

  render() {
    const { userinfo, allCounts } = this.state;
    const { loading, admin } = this.props;

    let username = userinfo.username,
      load = false,
      loader = false,
      analytics,
      premium,
      providers,
      currencies,
      signals,
      bonus,
      withdrawals,
      referrals,
      credit,
      debit,
      sub;

    if (admin.getanalytics === null || admin.loading) {
      load = true;
      loader = true;
    } else if (admin.getanalytics !== null || !admin.loading) {
      load = false;
      loader = false;
      analytics = admin.getanalytics;
      premium = analytics.premium;
      providers = analytics.providers;
      currencies = analytics.currencies;
      signals = analytics.signals;
      bonus = analytics.bonus;
      withdrawals = analytics.withdrawals;
      referrals = analytics.referrals;
      credit = analytics.credit;
      debit = analytics.debit;
      sub = analytics.sub;
    }

    /*const { auth } = this.props;
    const { allCounts } = auth.allCounts;
    console.log(allCounts);*/
    return (
      <div className="dash-contents">
        {loader && <ProgressBar />}
        {load ? (
          <Spinner />
        ) : (
          <div className="container">
            <div className="welcome-dashboard mb-5">
              <h1>
                Hi, <span className="dash-user-name">{username}</span>, welcome
                to your Dashboard
              </h1>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="sub-box dash-card admin-dash users">
                  <div className="row">
                    <div className="col-4">
                      <div className="box-icon">
                        <HiOutlineUsers />
                      </div>
                    </div>
                    <div className="col-8">
                      <p className="mb-1">Users</p>
                      <h2
                        className="mb-1"
                        title={`Real Figure: ${allCounts.users}`}
                      >
                        {roundUp(allCounts.users)}
                      </h2>
                    </div>
                  </div>
                  <div className="analytics">
                    <div className="row">
                      <div className="col-7">
                        <p className="mb-1" title={`Real Figure: ${premium}`}>
                          {roundUp(premium)} active users
                        </p>
                      </div>
                      <div className="col-5">
                        <span className="pay-now-btn">
                          <Link
                            className="btn btn-sm btn-light"
                            to="/admin/users"
                          >
                            View More
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="referrals-box dash-card admin-dash providers">
                  <div className="row">
                    <div className="col-4">
                      <div className="box-icon">
                        <RiShieldUserLine />
                      </div>
                    </div>
                    <div className="col-8">
                      <p className="mb-1">Signal Providers</p>
                      <h2 title={`Real Figure: ${allCounts.providers}`}>
                        {roundUp(allCounts.providers)}
                      </h2>
                    </div>
                  </div>
                  <div className="analytics">
                    <div className="row">
                      <div className="col-7">
                        <p className="mb-1">{providers} active providers</p>
                      </div>
                      <div className="col-5">
                        <span className="pay-now-btn">
                          <Link
                            className="btn btn-sm btn-light"
                            to="/admin/providers"
                          >
                            View More
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="bonus-box dash-card admin-dash signals">
                  <div className="row">
                    <div className="col-4">
                      <div className="box-icon">
                        <CgSignal />
                      </div>
                    </div>
                    <div className="col-8">
                      <p className="mb-1">Signals</p>
                      <h2 title={`Real Figure: ${allCounts.signals}`}>
                        {roundUp(allCounts.signals)}
                      </h2>
                    </div>
                  </div>
                  <div className="analytics">
                    <div className="row">
                      <div className="col-7">
                        <p className="mb-1" title={`Real Figure: ${signals}`}>
                          {roundUp(signals)} signals today
                        </p>
                      </div>
                      <div className="col-5">
                        <span className="pay-now-btn">
                          <Link
                            className="btn btn-sm btn-light"
                            to="/admin/signals"
                          >
                            View More
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="bonus-box dash-card admin-dash bonus">
                  <div className="row">
                    <div className="col-4">
                      <div className="box-icon">
                        <GiWallet />
                      </div>
                    </div>
                    <div className="col-8">
                      <p className="mb-1">Bonus</p>
                      <h2 title={`Real Figure: ${allCounts.bonus}`}>
                        {roundUp(allCounts.bonus)}
                      </h2>
                    </div>
                  </div>
                  <div className="analytics">
                    <div className="row">
                      <div className="col-7">
                        <p className="mb-1" title={`Real Figure: ${bonus}`}>
                          {roundUp(bonus)} pending Bonus
                        </p>
                      </div>
                      <div className="col-5">
                        <span className="pay-now-btn">
                          <Link
                            className="btn btn-sm btn-light"
                            to="/admin/bonus"
                          >
                            View More
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="withdrawal-box dash-card admin-dash payouts">
                  <div className="row">
                    <div className="col-4">
                      <div className="box-icon">
                        <AiOutlineMoneyCollect />
                      </div>
                    </div>
                    <div className="col-8">
                      <p
                        className="mb-1"
                        title={`Real Figure: ${allCounts.withdrawals}`}
                      >
                        Withdrawals
                      </p>
                      <h2>{roundUp(allCounts.withdrawals)}</h2>
                    </div>
                  </div>
                  <div className="analytics">
                    <div className="row">
                      <div className="col-7">
                        <p
                          className="mb-1"
                          title={`Real Figure: ${withdrawals}`}
                        >
                          {roundUp(withdrawals)} withdrawals this week
                        </p>
                      </div>
                      <div className="col-5">
                        <span className="pay-now-btn">
                          <Link
                            className="btn btn-sm btn-light"
                            to="/admin/withdrawals"
                          >
                            View More
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="currency-box dash-card admin-dash currencies">
                  <div className="row">
                    <div className="col-4">
                      <div className="box-icon">
                        <BsCurrencyExchange />
                      </div>
                    </div>
                    <div className="col-8">
                      <p className="mb-1">Currencies Pair</p>
                      <h2 title={`Real Figure: ${allCounts.currency}`}>
                        {roundUp(allCounts.currency)}
                      </h2>
                    </div>
                  </div>
                  <div className="analytics">
                    <div className="row">
                      <div className="col-7">
                        <p
                          className="mb-1"
                          title={`Real Figure: ${currencies}`}
                        >
                          {roundUp(currencies)} active currencies
                        </p>
                      </div>
                      <div className="col-5">
                        <span className="pay-now-btn">
                          <Link
                            className="btn btn-sm btn-light"
                            to="/admin/currencies"
                          >
                            View More
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="currency-box dash-card admin-dash transactions">
                  <div className="row">
                    <div className="col-4">
                      <div className="box-icon">
                        <RiExchangeBoxLine />
                      </div>
                    </div>
                    <div className="col-8">
                      <p className="mb-1">Transactions</p>
                      <h2 title={`Real Figure: ${allCounts.transactions}`}>
                        {roundUp(allCounts.transactions)}
                      </h2>
                    </div>
                  </div>
                  <div className="analytics">
                    <div className="row">
                      <div className="col-7">
                        <p
                          className="mb-1"
                          title={`Real Figure: ${allCounts.providers}`}
                        >
                          <span title={`Real Figure: ${debit}`}>
                            {roundUp(debit)}
                          </span>
                          debit,{" "}
                          <span title={`Real Figure: ${credit}`}>
                            {roundUp(credit)}
                          </span>
                          credit this week
                        </p>
                      </div>
                      <div className="col-5">
                        <span className="pay-now-btn">
                          <Link
                            className="btn btn-sm btn-light"
                            to="/admin/transactions"
                          >
                            View More
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="currency-box dash-card admin-dash subscriptions">
                  <div className="row">
                    <div className="col-4">
                      <div className="box-icon">
                        <MdOutlinePayments />
                      </div>
                    </div>
                    <div className="col-8">
                      <p className="mb-1">Subscription</p>
                      <h2 title={`Real Figure: ${allCounts.subscriptions}`}>
                        {roundUp(allCounts.subscriptions)}
                      </h2>
                    </div>
                  </div>
                  <div className="analytics">
                    <div className="row">
                      <div className="col-7">
                        <p className="mb-1" title={`Real Figure: ${sub}`}>
                          {roundUp(sub)} new subscriptions today
                        </p>
                      </div>
                      <div className="col-5">
                        <span className="pay-now-btn">
                          <Link
                            className="btn btn-sm btn-light"
                            to="/admin/subscriptions"
                          >
                            View More
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="currency-box dash-card admin-dash referrals">
                  <div className="row">
                    <div className="col-4">
                      <div className="box-icon">
                        <AiOutlineUsergroupAdd />
                      </div>
                    </div>
                    <div className="col-8">
                      <p className="mb-1">Referrals</p>
                      <h2 title={`Real Figure: ${allCounts.referrals}`}>
                        {roundUp(allCounts.referrals)}
                      </h2>
                    </div>
                  </div>
                  <div className="analytics">
                    <div className="row">
                      <div className="col-7">
                        <p className="mb-1" title={`Real Figure: ${referrals}`}>
                          {roundUp(referrals)} new referrals this week
                        </p>
                      </div>
                      <div className="col-5">
                        <span className="pay-now-btn">
                          <Link
                            className="btn btn-sm btn-light"
                            to="/admin/referrals"
                          >
                            View More
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
Index.propTypes = {
  auth: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  getAnalytics: PropTypes.func,
  clearActions: PropTypes.func,
  getAllCounts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  getAllCounts,
  getAnalytics,
  clearActions,
})(Index);
