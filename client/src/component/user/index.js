import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { getUserProfile } from "../../action/profileAction";
import { getUserDetails } from "../../action/userAction";
import ProgressBar from "../../layout/ProgressBar";
import AnnCard from "../../layout/AnnCard";

//const [details, setDetails] = useState(null);

export class Index extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      copy: false,
      premiuminfo:
        JSON.parse(localStorage.getItem("premium")) ?? this.props.user.premium,
      userinfo:
        this.props.auth.user ?? jwtDecode(localStorage.getItem("jwtDecode")),
      daysleft: 0,
    };
  }

  componentDidMount() {
    const { premiuminfo } = this.state;
    this.props.getUserProfile();
    let curDate = Date.now() / 1000,
      expDate = new Date(premiuminfo.enddate).getTime() / 1000;

    this.setState({
      daysleft: Math.floor((expDate - curDate) / (24 * 3600)),
    });
    this.props.getUserDetails();
    // console.log(premiuminfo.enddate);
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

  shareRef = (value) => {
    let text = encodeURIComponent("Join MIC Earn Business");
    let url = "http://localhost:3000/referral/:mol";
    let hash_tags = "crypto,forex";

    let params = "menubar=no,toolbar=no,status=no,width=570,height=570"; // for window
    function ShareToTwitter() {
      let Shareurl = `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${hash_tags}`;
      window.open(Shareurl, "NewWindow", params);
    }

    function ShareToFaceBook() {
      let shareUrl = `http://www.facebook.com/sharer/sharer.phpu=${url}`;
      window.open(shareUrl, "NewWindow", params);
    }

    function ShareToLinkedin() {
      let shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      window.open(shareUrl, "NewWindow", params);
    }

    function ShareToWhatsApp() {
      let shareUrl = `https://api.whatsapp.com/send?text=${text}'%20'${url}`;
      window.open(shareUrl, "NewWindow", params);
    }

    if (value === "copy") {
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
    } else if (value === "twitter") {
      ShareToTwitter();
    } else if (value === "facebook") {
      ShareToFaceBook();
    } else if (value === "linkedin") {
      ShareToLinkedin();
    } else if (value === "whatsapp") {
      ShareToWhatsApp();
    }
  };

  render() {
    const { copy, userinfo, daysleft } = this.state;
    const { loading, user } = this.props;

    let load = true,
      username = userinfo.username,
      userdetails,
      bonus,
      credit,
      debit,
      transactions,
      sub,
      referral;
    if (
      (user.userdetails === null ||
        Object.keys(user.userdetails).length <= 0) &&
      loading
    ) {
      load = true;
    } else if (user.userdetails !== null && !loading) {
      userdetails = user.userdetails;
      bonus = userdetails.bonus ?? 0;
      credit = userdetails.credit ?? 0;
      debit = userdetails.debit ?? 0;
      transactions = userdetails.transactions ?? 0;
      sub = userdetails.sub ?? 0;
      referral = userdetails.referral ?? 0;
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
            <div className="welcome-dashboard mb-5">
              <h1>
                Hi, <span className="dash-user-name">{username}</span>, welcome
                to your Dashboard
              </h1>
            </div>
            <div className="dash-info mb-5">
              <div className="row">
                <div className="col-md-3 col-xs-12">
                  <div
                    className={`dash-premium dash-info-card dash-card ${
                      daysleft >= 1 ? "premium-active" : "premium-inactive"
                    }`}
                  >
                    <p className="mb-1">
                      {daysleft >= 1 ? "Active" : "Inactive"}
                    </p>
                    <h4 className="mb-1">{daysleft >= 0 ? daysleft : 0}</h4>
                    <div className="row">
                      <div className="col-6">
                        <p className="mb-1">
                          day{daysleft === 1 ? "" : "s"} left
                        </p>
                      </div>
                      <div className="col-6">
                        <span className="pay-now-btn">
                          <Link className="btn btn-sm btn-light" to="/user/pay">
                            Pay Now
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-xs-12">
                  <div className="dash-info-card dash-card dash-balance">
                    <p className="mb-1">Balance</p>
                    <h4 className="mb-1">${(credit - debit).toFixed(2)}</h4>
                    <div className="row">
                      <div className="col-6">
                        <p className="mb-1"></p>
                      </div>
                      <div className="col-6">
                        <span className="pay-now-btn">
                          <Link className="btn btn-sm btn-light" to="/user/pay">
                            Withdraw
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-xs-12">
                  <div className="dash-info-card dash-card dash-transaction">
                    <p className="mb-1">Transactions</p>
                    <h4 className="mb-1">{transactions}</h4>
                    <div className="row">
                      <div className="col-6">
                        <p className="mb-1"></p>
                      </div>
                      <div className="col-6">
                        <span className="pay-now-btn">
                          <Link
                            className="btn btn-sm btn-light"
                            to="/user/transactions"
                          >
                            View
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-xs-12">
                  <div className="dash-info-card dash-card dash-sub">
                    <p className="mb-1">Subscriptions</p>
                    <h4 className="mb-1">{sub}</h4>
                    <div className="row">
                      <div className="col-6">
                        <p className="mb-1"></p>
                      </div>
                      <div className="col-6">
                        <span className="pay-now-btn">
                          <Link
                            className="btn btn-sm btn-light"
                            to="/user/subscriptions"
                          >
                            View
                          </Link>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dash-intro mb-5">
              <div className="row">
                <div className="col-md-5 col-xs-12">
                  <div className="dash-basic dash-card">
                    <h4 className="mb-2">Referrals </h4>
                    <h1 className="mb-2">{referral}</h1>
                    <code>http://localhost:3000/referral/:{username}</code>
                    <div className={`tiptool ${copy && "showTip"}`}>
                      <span className="tooltiptext">Copied to Clipboard</span>
                    </div>
                    <input
                      type="hidden"
                      ref={this.myRef}
                      id="copy-code"
                      value={`http://localhost:3000/referral/:${username}`}
                      readOnly
                    />
                    <p className="mb-1">Invite More</p>
                    <div className="share-ref-social">
                      <i
                        className="fab fa-facebook-square"
                        title="Share on Facebook"
                        onClick={() => this.shareRef("facebook")}
                      />
                      <i
                        className="fab fa-twitter-square"
                        title="Share on Twitter"
                        onClick={() => this.shareRef("twitter")}
                      />
                      <i
                        className="fab fa-linkedin"
                        title="Share on Linkedin"
                        onClick={() => this.shareRef("linkedin")}
                      />
                      <i
                        className="fab fa-whatsapp-square"
                        title="Share on WhatsApp"
                        onClick={() => this.shareRef("whatsapp")}
                      />
                      <i
                        className="far fa-copy"
                        title="Copy Link"
                        onClick={() => this.shareRef("copy")}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-6 col-xs-12">
                  <div className="dash-bonus dash-card">
                    <h4 className="mb-3">Bonus Index</h4>
                    <h1 className="mb-3">${bonus.toFixed(2)}</h1>
                    <p>Estimated earning</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <AnnCard details={userdetails.ann} />
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
  getUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  profile: state.profile,
});
export default connect(mapStateToProps, { getUserProfile, getUserDetails })(
  Index
);
