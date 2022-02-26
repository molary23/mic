import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { getUserProfile } from "../../action/profileAction";
import ProgressBar from "../../layout/ProgressBar";

export class Index extends Component {
  state = {
    allCounts: JSON.parse(sessionStorage.getItem("tableCounts")),
  };
  componentDidMount() {
    this.props.getUserProfile();
    console.log(this.state.allCounts);
  }

  render() {
    const { allCounts } = this.state;
    const { profile, loading } = this.props;

    let load = true,
      user = {},
      fullname = "";

    if (profile.profile === null && loading) {
      load = true;
    } else if (profile.profile !== null && !loading) {
      user = profile.profile;

      fullname = user.fullname;

      load = false;
    }
    return (
      <div className="dashboard-item">
        {load ? (
          <div className="loader">
            <ProgressBar />
            <div>
              <i className="fas fa-circle-notch fa-2x fa-spin" />
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="dashboard-admin-intro card">
                  <div className="container-fluid">
                    <div className="dashboard-admin-welcome">
                      <h3 className="mb-2">Welcome back Super Admin</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-5"></div>
              <div className="col-md-4 mb-3">
                <div className="sub-box card">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-4">
                        <div className="box-icon">
                          <i className="fas fa-user-friends" />
                        </div>
                      </div>
                      <div className="col-8">
                        <h2>{allCounts.users}</h2>
                        <p>Users</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="referrals-box card">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-4">
                        <div className="box-icon">
                          <i className="fas fa-user-tag" />
                        </div>
                      </div>
                      <div className="col-8">
                        <h2>{allCounts.providers}</h2>
                        <p>Signal Providers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="bonus-box card">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-4">
                        <div className="box-icon">
                          <i className="fas fa-signal" />
                        </div>
                      </div>
                      <div className="col-8">
                        <h2>{allCounts.signals}</h2>
                        <p>Signals</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="sub-box card">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-4">
                        <div className="box-icon">
                          <i className="fas fa-wallet" />
                        </div>
                      </div>
                      <div className="col-8">
                        <h2>{allCounts.bonus}</h2>
                        <p>Pending Bonus</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="referrals-box card">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-4">
                        <div className="box-icon">
                          <i className="fas fa-hand-holding-usd" />
                        </div>
                      </div>
                      <div className="col-8">
                        <h2>20</h2>
                        <p>Pending Payouts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="bonus-box card">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-4">
                        <div className="box-icon">
                          <i className="fas fa-money-bill-wave-alt" />
                        </div>
                      </div>
                      <div className="col-8">
                        <h2>$20</h2>
                        <p>Currencies</p>
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
  getUserProfile: PropTypes.func,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getUserProfile })(Index);
