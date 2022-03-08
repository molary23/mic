import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { getUserProfile } from "../../action/profileAction";
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
    const { premiuminfo, userinfo, daysleft } = this.state;
    const { profile, loading, user } = this.props;
    const { copy } = this.state;
    let load = true,
      username = userinfo.username,
      userprofile;
    if (
      (profile.profile === null || Object.keys(profile.profile).length <= 0) &&
      loading
    ) {
      load = true;
    } else if (profile.profile !== null && !loading) {
      userprofile = profile.profile;
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
                      daysleft > 1 && "premium-active"
                    }`}
                  >
                    <p className="mb-1">Active</p>
                    <h4 className="mb-1">{daysleft}</h4>
                    <div className="row">
                      <div className="col-6">
                        <p className="mb-1">day{daysleft > 1 && "s"} left</p>
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
                    <h4 className="mb-1">$28</h4>
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
                    <h4 className="mb-1">$28</h4>
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
                  <div className="dash-info-card dash-card">
                    <p className="mb-1">Balance</p>
                    <h4 className="mb-1">$28</h4>
                    <p>left</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="dash-intro mb-5">
              <div className="row">
                <div className="col-md-5 col-xs-12">
                  <div className="dash-basic dash-card">
                    <h4 className="mb-2">Referrals </h4>
                    <h1 className="mb-2">22</h1>
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
                    <h1 className="mb-3">$25009</h1>
                    <p>Estimated earning</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <AnnCard
                details={[
                  { title: "titel 1", content: "content1", url: "url1" },
                  { title: "titel 2", content: "content1222", url: "url122" },
                  { title: "titel 122", content: "content122", url: "url122" },
                ]}
              />
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
  user: state.user,
  profile: state.profile,
});
export default connect(mapStateToProps, { getUserProfile })(Index);
