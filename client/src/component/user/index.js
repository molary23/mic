import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import decrypt from "../../util/decrypt";

import { setDocumentTitle } from "../../util/LoadFunction";

import QRCode from "react-qr-code";

import { getUserDetails, clearActions } from "../../action/userAction";
import ProgressBar from "../../layout/ProgressBar";
import AnnCard from "../../layout/AnnCard";
import Spinner from "../../layout/Spinner";

import {
  FaTwitterSquare,
  FaFacebookSquare,
  FaWhatsappSquare,
  FaLinkedin,
} from "react-icons/fa";
import { IoMdCopy } from "react-icons/io";

export class Index extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      copy: false,
      premiuminfo:
        JSON.parse(decrypt(localStorage.getItem("premium"), "local")) ??
        this.props.user.premium,
      userinfo:
        this.props.auth.user ??
        jwtDecode(decrypt(localStorage.getItem("userToken"), "local")),
      daysleft: 0,
      premiumstatus: null,
    };
  }

  componentDidMount() {
    setDocumentTitle("my dashboard");
    const { premiuminfo } = this.state;
    let dateOnly = new Date().toDateString(),
      curDate = new Date(dateOnly).getTime() / 1000,
      expDate = new Date(premiuminfo.enddate).getTime() / 1000;
    let status = premiuminfo.status;

    this.setState({
      daysleft: Math.round((expDate - curDate) / (24 * 3600)),
      premiumstatus: status,
    });
    this.props.getUserDetails();
  }

  componentWillUnmount() {
    this.props.clearActions("user-details");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
    let text = encodeURIComponent(
      "I am inviting you to join MIC Earn Business. This platform shares accurate signals that facilitate successful trading."
    );
    let url = "//dashboard.micearnbusiness.org/referral/:mol";
    let hash_tags = "crypto,forex,fx,cryptocurrency,trading,signal";

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
    const { copy, userinfo, daysleft, premiumstatus } = this.state;
    const { loading, user } = this.props;

    let load = true,
      loader = false,
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
      loader = true;
    } else if (user.userdetails !== null && !loading) {
      userdetails = user.userdetails;
      bonus = userdetails.bonus ?? 0;
      credit = userdetails.credit ?? 0;
      debit = userdetails.debit ?? 0;
      transactions = userdetails.transactions ?? 0;
      sub = userdetails.sub ?? 0;
      referral = userdetails.referral ?? 0;
      load = false;
      loader = false;
    }
    return (
      <div className="dashboard-item">
        {loader && <ProgressBar />}
        {load ? (
          <Spinner />
        ) : (
          <div className="container-fluid">
            <div className="welcome-dashboard mb-5">
              <h1>
                <span className="dash-user-name">Hi {username}</span>,
                <span className="dash-welcome"> welcome to your Dashboard</span>
              </h1>
            </div>

            <div className="dash-info mb-5">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-12">
                  <div
                    className={`dash-premium dash-info-card dash-card ${
                      (premiumstatus === "a" && "premium-active") ||
                      (premiumstatus === "n" && "premium-new") ||
                      (premiumstatus === "i" && "premium-inactive")
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
                <div className="col-lg-3 col-md-6 col-12">
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
                <div className="col-lg-3 col-md-6 col-12">
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
                <div className="col-lg-3 col-md-6 col-12">
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

              <div className="dash-intro">
                <div className="row">
                  <div className="col-lg-5 col-md-12 col-12">
                    <div className="dash-basic dash-card">
                      <h4 className="mb-2">Referrals </h4>
                      <h1 className="mb-2">{referral}</h1>
                      <code>
                        https://dashboard.micearnbusiness.org/referral/:
                        {username}
                      </code>
                      <div className={`tiptool ${copy && "showTip"}`}>
                        <span className="tooltiptext">Copied to Clipboard</span>
                      </div>
                      <input
                        type="hidden"
                        ref={this.myRef}
                        id="copy-code"
                        value={`https://dashboard.micearnbusiness.org/referral/:${username}`}
                        readOnly
                      />
                      <p className="mb-1">Invite More</p>
                      <div className="share-ref-social">
                        <span
                          className="share-ref-btn"
                          onClick={() => this.shareRef("facebook")}
                        >
                          <FaFacebookSquare />
                        </span>
                        <span
                          className="share-ref-btn"
                          onClick={() => this.shareRef("twitter")}
                        >
                          <FaTwitterSquare />
                        </span>
                        <span
                          className="share-ref-btn"
                          onClick={() => this.shareRef("linkedin")}
                        >
                          <FaLinkedin />
                        </span>
                        <span
                          className="share-ref-btn"
                          onClick={() => this.shareRef("whatsapp")}
                        >
                          <FaWhatsappSquare />
                        </span>
                        <span
                          className="share-ref-btn"
                          onClick={() => this.shareRef("copy")}
                        >
                          <IoMdCopy />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-12 col-12">
                    <div className="dash-qr dash-card">
                      <div className="qr-code">
                        <QRCode
                          value={`https://dashboard.micearnbusiness.org/referral/:${username}`}
                          size={200}
                          level={"Q"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-12 col-12">
                    <div className="dash-bonus dash-card">
                      <h4 className="mb-3">Bonus Index</h4>
                      <h1 className="mb-3">${bonus.toFixed(2)}</h1>
                      <p>
                        Estimated earning{" "}
                        <span className="dash-earning">
                          ${credit.toFixed(2)}
                        </span>
                      </p>
                      <p>
                        Estimated spending{" "}
                        <span className="dash-earning">
                          ${debit.toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-0">
                {userdetails.ann.length >= 1 && (
                  <AnnCard details={userdetails.ann} />
                )}
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
  user: PropTypes.object.isRequired,
  getUserDetails: PropTypes.func.isRequired,
  clearActions: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});
export default connect(mapStateToProps, { getUserDetails, clearActions })(
  Index
);
