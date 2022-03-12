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

import {
  AiOutlineUsergroupAdd,
  AiFillSignal,
  AiOutlineMoneyCollect,
} from "react-icons/ai";

import { getUserProfile } from "../../action/profileAction";
import { getAllCounts } from "../../action/authAction";
import ProgressBar from "../../layout/ProgressBar";

export class Index extends Component {
  state = {
    allCounts:
      JSON.parse(localStorage.getItem("counts")) ?? this.props.auth.allCounts,
    userinfo:
      this.props.auth.user ?? jwtDecode(localStorage.getItem("jwtDecode")),
  };
  componentDidMount() {
    this.props.getUserProfile();
  }

  render() {
    const { userinfo, allCounts } = this.state;
    const { loading, user } = this.props;
    let load = true,
      username = userinfo.username,
      userdetails;
    /*const { auth } = this.props;
    const { allCounts } = auth.allCounts;
    console.log(allCounts);*/
    return (
      <div className="dash-contents">
        <div className="container">
          <div className="welcome-dashboard mb-5">
            <h1>
              Hi, <span className="dash-user-name">{username}</span>, welcome to
              your Dashboard
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
                    <h2 className="mb-1">{allCounts.users}</h2>
                  </div>
                </div>
                <div className="analytics">
                  <div className="row">
                    <div className="col-7">
                      <p className="mb-1">{5} active users</p>
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
                    <h2>{allCounts.providers}</h2>
                  </div>
                </div>
                <div className="analytics">
                  <div className="row">
                    <div className="col-7">
                      <p className="mb-1">{5} active providers</p>
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
                      <AiFillSignal />
                    </div>
                  </div>
                  <div className="col-8">
                    <p className="mb-1">Signals</p>
                    <h2>{allCounts.signals}</h2>
                  </div>
                </div>
                <div className="analytics">
                  <div className="row">
                    <div className="col-7">
                      <p className="mb-1">{5} signals today</p>
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
                    <p className="mb-1">Pending Bonus</p>
                    <h2>{allCounts.bonus}</h2>
                  </div>
                </div>
                <div className="analytics">
                  <div className="row">
                    <div className="col-7">
                      <p className="mb-1">{25} bonus this week</p>
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
                    <p className="mb-1">Pending Withdrawals</p>
                    <h2>20</h2>
                  </div>
                </div>
                <div className="analytics">
                  <div className="row">
                    <div className="col-7">
                      <p className="mb-1">{5} withdrawals last week</p>
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
                    <h2>{allCounts.currency}</h2>
                  </div>
                </div>
                <div className="analytics">
                  <div className="row">
                    <div className="col-7">
                      <p className="mb-1">{5} active currencies</p>
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
                    <h2>{allCounts.transactions}</h2>
                  </div>
                </div>
                <div className="analytics">
                  <div className="row">
                    <div className="col-7">
                      <p className="mb-1">
                        {5} debit, {10} credit this week
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
                    <h2>{allCounts.subscriptions}</h2>
                  </div>
                </div>
                <div className="analytics">
                  <div className="row">
                    <div className="col-7">
                      <p className="mb-1">{5} new subscriptions today</p>
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
                    <h2>{allCounts.referrals}</h2>
                  </div>
                </div>
                <div className="analytics">
                  <div className="row">
                    <div className="col-7">
                      <p className="mb-1">{5} new referrals this week</p>
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
      </div>
    );
  }
}
Index.propTypes = {
  getUserProfile: PropTypes.func,
  auth: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  profile: state.profile,
});
export default connect(mapStateToProps, { getUserProfile, getAllCounts })(
  Index
);
