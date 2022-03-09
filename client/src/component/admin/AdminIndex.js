import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

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
      <div>
        <div className="container">
          <div className="welcome-dashboard mb-5">
            <h1>
              Hi, <span className="dash-user-name">{username}</span>, welcome to
              your Dashboard
            </h1>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="sub-box dash-card admin-dash">
                <div className="row">
                  <div className="col-4">
                    <div className="box-icon">
                      <i className="fas fa-user-friends" />
                    </div>
                  </div>
                  <div className="col-8">
                    <p className="mb-1">Users</p>
                    <h2>{allCounts.users}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="referrals-box dash-card admin-dash">
                <div className="row">
                  <div className="col-4">
                    <div className="box-icon">
                      <i className="fas fa-user-tag" />
                    </div>
                  </div>
                  <div className="col-8">
                    <p className="mb-1">Signal Providers</p>
                    <h2>{allCounts.providers}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="bonus-box dash-card admin-dash">
                <div className="row">
                  <div className="col-4">
                    <div className="box-icon">
                      <i className="fas fa-signal" />
                    </div>
                  </div>
                  <div className="col-8">
                    <p className="mb-1">Signals</p>
                    <h2>{allCounts.signals}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="bonus-box dash-card admin-dash">
                <div className="row">
                  <div className="col-4">
                    <div className="box-icon">
                      <i className="fas fa-wallet" />
                    </div>
                  </div>
                  <div className="col-8">
                    <p className="mb-1">Pending Bonus</p>
                    <h2>{allCounts.bonus}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="withdrawal-box dash-card admin-dash">
                <div className="row">
                  <div className="col-4">
                    <div className="box-icon">
                      <i className="fas fa-hand-holding-usd" />
                    </div>
                  </div>
                  <div className="col-8">
                    <p className="mb-1">Pending Payouts</p>
                    <h2>20</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="currency-box dash-card admin-dash">
                <div className="row">
                  <div className="col-4">
                    <div className="box-icon">
                      <i className="fas fa-money-bill-wave-alt" />
                    </div>
                  </div>
                  <div className="col-8">
                    <p className="mb-1">Currencies Pair</p>
                    <h2>{allCounts.currency}</h2>
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
