import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../../layout/Spinner";
import ProgressBar from "../../layout/ProgressBar";

import Toast from "../../layout/Toast";
import CardDetails from "../../layout/CardDetails";

import { GiWallet } from "react-icons/gi";
import { BsBell } from "react-icons/bs";

import { IoReturnUpBackOutline } from "react-icons/io5";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

import { GiMoneyStack, GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { RiShieldUserLine } from "react-icons/ri";

import {
  MdOutlinePayments,
  MdOutlineCreditCardOff,
  MdCreditScore,
} from "react-icons/md";
import { BsCurrencyExchange } from "react-icons/bs";

import {
  clearErrors,
  clearActions,
  clearAdminAction,
  getUser,
} from "../../action/adminAction";

class User extends Component {
  state = {
    text: "",
    sender: "admin-admin",
    error: {},
    url: new URL(window.location),
    userid: null,
    toast: null,
    toasttext: null,
    isLoading: {},
    servererror: {},
    adminaction: null,
  };
  componentDidMount() {
    const { url } = this.state;
    let id = url.pathname.split("/:")[1];
    this.setState({
      userid: id,
    });

    this.props.clearErrors();
    this.props.clearActions("get-admin");
    this.props.getUser(id);
  }

  componentWillUnmount() {
    this.props.clearActions("get-admin");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.errors) {
      update.servererror = nextProps.errors;
    }

    return update;
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.errors !== this.props.errors &&
      Object.keys(this.props.errors).length > 0
    ) {
      // console.log(this.props.errors);
    }
  }

  errorUpdate = () => {};

  render() {
    const { toasttext, toast, isLoading } = this.state;
    let loader = false,
      load = false,
      noRecord = false,
      notAllowed = false;
    const { admin } = this.props,
      { loading } = admin;
    let user,
      sub,
      bonus,
      debit,
      credit,
      withdrawal,
      premiumstatus,
      preference,
      pay,
      referralcount,
      currencies,
      providers,
      referredby,
      notify;

    if (admin.getuser === null || loading) {
      loader = true;
      load = true;
    } else if (admin.getuser.user !== null && !loading) {
      loader = false;
      load = false;
      user = admin.getuser.user;
      sub = admin.getuser.sub;
      bonus = admin.getuser.bonus ?? 0;
      debit = admin.getuser.debit ?? 0;
      credit = admin.getuser.credit ?? 0;
      withdrawal = admin.getuser.withdrawal ?? 0;
      premiumstatus = admin.getuser.premiumstatus;
      preference = admin.getuser.preference;
      currencies = preference.currencies;
      providers = preference.providers;
      notify = preference.notify;
      pay = admin.getuser.pay ?? 0;
      referralcount = admin.getuser.referralcount;
      referredby = admin.getuser.referredby;
    } else if (admin.getuser.user === null && !loading) {
      loader = false;
      load = false;
      noRecord = true;
      notAllowed = "There is no User with the specified ID";
    }

    return (
      <div>
        {loader && <ProgressBar />}
        {load ? (
          <Spinner />
        ) : (
          <div>
            {noRecord ? (
              <p className="no-records">
                {notAllowed}. Go{" "}
                <Link to="/admin/users">
                  Back <IoReturnUpBackOutline />
                </Link>
              </p>
            ) : (
              <div className="view-card card">
                <div className="page-dash-title mb-4">
                  <h1>User Details</h1>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <h3>Personal Info</h3>
                    <CardDetails
                      {...{
                        label: "last name",
                        value: `${
                          user.Profile !== null ? user.Profile.lastname : ""
                        } `,
                      }}
                    />
                    <CardDetails
                      {...{
                        label: "First Name",
                        value: `${
                          user.Profile !== null ? user.Profile.firstname : ""
                        } `,
                      }}
                    />
                    <CardDetails
                      {...{
                        label: "email",
                        value: user.email,
                      }}
                    />
                    <CardDetails
                      {...{
                        label: "username",
                        value: user.username,
                      }}
                    />
                    {}
                    <CardDetails
                      {...{
                        label: "phone number",
                        value: user.phone,
                      }}
                    />
                    {premiumstatus.status === "n" && (
                      <CardDetails
                        {...{
                          label: "premium status",
                          value: (
                            <div>
                              <span className="new-status status-info">
                                <span>&bull;</span>
                              </span>
                              new
                            </div>
                          ),
                        }}
                      />
                    )}
                    {premiumstatus.status === "i" && (
                      <CardDetails
                        {...{
                          label: "premium status",
                          value: (
                            <div>
                              <span className="inactive-status status-info">
                                <span>&bull;</span>
                              </span>
                              inactive
                            </div>
                          ),
                        }}
                      />
                    )}
                    {premiumstatus.status === "a" && (
                      <CardDetails
                        {...{
                          label: "premium status",
                          value: (
                            <div>
                              <span className="active-status status-info">
                                <span>&bull;</span>
                              </span>
                              active
                            </div>
                          ),
                        }}
                      />
                    )}
                    {(premiumstatus.status === "n" ||
                      premiumstatus.status === "i") && (
                      <CardDetails
                        {...{
                          label: "last subscription expiry date",
                          value: new Date(premiumstatus.enddate).toDateString(),
                        }}
                      />
                    )}
                    {premiumstatus.status === "a" && (
                      <CardDetails
                        {...{
                          label: "next subscription date",
                          value: new Date(premiumstatus.enddate).toDateString(),
                        }}
                      />
                    )}
                    {referredby !== null && (
                      <CardDetails
                        {...{
                          label: "referred by",
                          value: (
                            <a href={`/admin/user/:${referredby.referralid}`}>
                              {referredby.referral}
                            </a>
                          ),
                        }}
                      />
                    )}
                  </div>

                  <div className="col-md-6 col-sm-12">
                    <h3>Activity Info</h3>
                    <CardDetails
                      {...{
                        label: (
                          <span>
                            <AiOutlineUsergroupAdd /> referral count
                          </span>
                        ),
                        value: referralcount,
                      }}
                    />
                    <CardDetails
                      {...{
                        label: (
                          <span>
                            <MdOutlinePayments /> lifetime subscriptions
                          </span>
                        ),
                        value: sub,
                      }}
                    />
                    <CardDetails
                      {...{
                        label: (
                          <span>
                            <GiPayMoney /> lifetime payments
                          </span>
                        ),
                        value: (
                          <Link
                            to={`/admin/payments?search=${user.username}&status=s`}
                          >
                            {pay.toFixed(2)}
                          </Link>
                        ),
                      }}
                    />
                    <CardDetails
                      {...{
                        label: (
                          <span>
                            <GiWallet /> lifetime earnings
                          </span>
                        ),
                        value: bonus.toFixed(2),
                      }}
                    />
                    <CardDetails
                      {...{
                        label: (
                          <span>
                            <MdOutlineCreditCardOff /> lifetime debits
                          </span>
                        ),
                        value: debit.toFixed(2),
                      }}
                    />
                    <CardDetails
                      {...{
                        label: (
                          <span>
                            <MdCreditScore /> lifetime credits
                          </span>
                        ),
                        value: credit.toFixed(2),
                      }}
                    />
                    <CardDetails
                      {...{
                        label: (
                          <span>
                            <GiMoneyStack /> balance
                          </span>
                        ),
                        value: `${(credit - debit).toFixed(2)}`,
                      }}
                    />
                    <CardDetails
                      {...{
                        label: (
                          <span>
                            <GiReceiveMoney /> lifetime withdrawal
                          </span>
                        ),
                        value: withdrawal.toFixed(2),
                      }}
                    />
                    {currencies !== null ? (
                      <CardDetails
                        {...{
                          label: (
                            <span>
                              <BsCurrencyExchange /> following
                            </span>
                          ),
                          value: `${currencies.length} currency pair${
                            currencies.length > 1 ? "s" : ""
                          }`,
                        }}
                      />
                    ) : (
                      <CardDetails
                        {...{
                          label: (
                            <span>
                              <BsCurrencyExchange /> following
                            </span>
                          ),
                          value: "all currency  pairs",
                        }}
                      />
                    )}
                    {providers !== null ? (
                      <CardDetails
                        {...{
                          label: (
                            <span>
                              <RiShieldUserLine /> following
                            </span>
                          ),
                          value: `${providers.length} signal provider${
                            providers.length > 1 ? "s" : ""
                          }`,
                        }}
                      />
                    ) : (
                      <CardDetails
                        {...{
                          label: (
                            <span>
                              <RiShieldUserLine /> following
                            </span>
                          ),
                          value: "all signal providers",
                        }}
                      />
                    )}
                    <CardDetails
                      {...{
                        label: (
                          <span>
                            <BsBell /> email notification
                          </span>
                        ),
                        value: `${notify === "y" ? "on" : "off"}`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {toast && <Toast text={toasttext} />}
      </div>
    );
  }
}

User.propTypes = {
  clearErrors: PropTypes.func,
  clearActions: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  clearAdminAction: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  admin: PropTypes.object.isRequired,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  clearErrors,
  clearActions,
  clearAdminAction,
  getUser,
})(User);
