import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { getUserProfile } from "../../action/profileAction";
import ProgressBar from "../../layout/ProgressBar";

//const [details, setDetails] = useState(null);

export class Index extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      copy: false,
    };
  }

  componentDidMount() {
    this.props.getUserProfile();
  }

  clickHandler = (e) => {
    const code = this.myRef.current.value;
    navigator.clipboard.writeText(code);
    this.setState({
      copy: true,
    });
    setTimeout(() => {
      this.setState({
        copy: false,
      });
    }, 3000);
  };

  render() {
    const { profile, loading } = this.props;
    const { copy } = this.state;
    let load = true,
      user = {},
      premiumstatus,
      fullname = "",
      username = "";

    if (
      (profile.profile === null || Object.keys(profile.profile).length <= 0) &&
      loading
    ) {
      load = true;
    } else if (profile.profile !== null && !loading) {
      user = profile.profile;

      premiumstatus = user.premiumstatus;
      fullname = user.fullname;
      username = user.username;
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
                <div className="dashboard-intro card">
                  <div className="container-">
                    <div className="row">
                      <div className="col-8">
                        <div className="dashboard-welcome">
                          <h3 className="mb-2">
                            Welcome back {fullname}
                            {premiumstatus === 1 && (
                              <span className="premium-user">
                                <i className="fas fa-check-circle" />
                              </span>
                            )}
                          </h3>
                          <p>
                            You have 20 days left in your current Subscription.
                          </p>
                        </div>
                      </div>
                      <div className="col-4 days-left-section">
                        <div className="days-left">
                          <Link
                            className="btn dashboard-pay-btn default-btn"
                            to="/user/pay"
                          >
                            Pay Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-5">
                <div className="referral-details">
                  <div className="referral-id-box card">
                    <div className="referrral-id  ms-2  pt-1">
                      <code>http://localhost:3000/referral/:{username}</code>
                      <input
                        type="hidden"
                        ref={this.myRef}
                        id="copy-code"
                        value={`http://localhost:3000/referral/:${username}`}
                        readOnly
                      />
                    </div>
                    <div className="copy-referrral-id">
                      <button
                        type="button"
                        className="btn"
                        onClick={this.clickHandler}
                      >
                        <i className="far fa-copy" />
                      </button>
                    </div>
                    <div className={`tiptool ${copy && "showTip"}`}>
                      <span className="tooltiptext">Copied to Clipboard</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="sub-box card">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-4">
                        <div className="box-icon">
                          <i className="fas fa-exchange-alt" />
                        </div>
                      </div>
                      <div className="col-8">
                        <h2>30</h2>
                        <p>Transactions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="referrals-box card">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-4">
                        <div className="box-icon">
                          <i className="fas fa-user-friends " />
                        </div>
                      </div>
                      <div className="col-8">
                        <h2>20</h2>
                        <p>Referrals</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="bonus-box card">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-4">
                        <div className="box-icon">
                          <i className="fas fa-hand-holding-usd" />
                        </div>
                      </div>
                      <div className="col-8">
                        <h2>$20</h2>
                        <p>Bonus</p>
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
