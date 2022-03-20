import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../../layout/Spinner";
import ProgressBar from "../../layout/ProgressBar";

import Toast from "../../layout/Toast";
import CardDetails from "../../layout/CardDetails";
import AddModal from "../../layout/AddModal";

import { GiWallet } from "react-icons/gi";
import { BsBell } from "react-icons/bs";
import { VscCircleFilled } from "react-icons/vsc";

import { IoReturnUpBackOutline } from "react-icons/io5";
import { AiOutlineUsergroupAdd, AiOutlineMoneyCollect } from "react-icons/ai";

import { GiMoneyStack, GiReceiveMoney, GiPayMoney } from "react-icons/gi";
import { RiShieldUserLine, RiFindReplaceLine } from "react-icons/ri";

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
  changeEmail,
} from "../../action/adminAction";

import Pagination from "../../util/Pagination";

class User extends Component {
  state = {
    text: "",
    sender: "admin-user",
    error: {},
    url: new URL(window.location),
    timer: Pagination.timer,
    userid: null,
    toast: null,
    toasttext: null,
    toastcategory: null,
    isLoading: {},
    servererror: {},
    adminaction: null,
    modal: false,
  };
  componentDidMount() {
    const { url } = this.state;
    let id = url.pathname.split("/:")[1];
    this.setState({
      userid: id,
    });
    this.props.clearErrors();
    this.props.getUser(id);
  }

  componentWillUnmount() {
    this.props.clearActions("get-user");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.errors) {
      update.servererror = nextProps.errors;
      update.isLoading = false;
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

    if (
      prevProps.admin.changeemail !== this.props.admin.changeemail &&
      this.props.admin.changeemail
    ) {
      this.afterUpdate();
    }
  }

  afterUpdate = () => {
    const { userid, timer } = this.state;

    this.setState({
      isLoading: false,
      modal: false,
      toast: true,
      toasttext: `Email changed successfully`,
      toastcategory: "success",
    });

    this.props.clearActions("get-user");
    this.props.getUser(userid);

    setTimeout(() => {
      this.setState({
        toast: false,
      });
    }, timer);
  };

  openModal = () => {
    this.setState({
      modal: true,
      purpose: "change-email",
    });
  };

  modalHandler = (close) => {
    this.setState({
      modal: close,
    });
  };

  submitHandler = (value) => {
    this.props.changeEmail(value);
  };

  errorUpdate = () => {};

  render() {
    const {
      toasttext,
      toast,
      isLoading,
      modal,
      sender,
      purpose,
      servererror,
      toastcategory,
    } = this.state;
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
      accountcount,
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
      if (preference) {
        currencies = preference.currencies;
        providers = preference.providers;
      }
      notify = preference.notify;
      pay = admin.getuser.pay ?? 0;
      referralcount = admin.getuser.referralcount;
      accountcount = admin.getuser.accountcount;
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
                        value: <span className="lower">{user.email}</span>,
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

                    <CardDetails
                      {...{
                        label: "premium status",
                        value:
                          (premiumstatus.status === "n" && (
                            <div>
                              <span className="new-status status-info">
                                <span>
                                  <VscCircleFilled />
                                </span>
                              </span>
                              new
                            </div>
                          )) ||
                          (premiumstatus.status === "a" && (
                            <div>
                              <span className="active-status status-info">
                                <span>
                                  <VscCircleFilled />
                                </span>
                              </span>
                              new
                            </div>
                          )) ||
                          (premiumstatus.status === "i" && (
                            <div>
                              <span className="inactive-status status-info">
                                <span>
                                  <VscCircleFilled />
                                </span>
                              </span>
                              new
                            </div>
                          )),
                      }}
                    />

                    {premiumstatus.status === "n" ||
                    premiumstatus.status === "i" ? (
                      <CardDetails
                        {...{
                          label: "last subscription expiry date",
                          value: new Date(premiumstatus.enddate).toDateString(),
                        }}
                      />
                    ) : (
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
                        value:
                          referralcount !== 0 ? (
                            <Link
                              to={`/admin/referrals?ref=true&user=${user.id}`}
                            >
                              {referralcount}
                            </Link>
                          ) : (
                            referralcount
                          ),
                      }}
                    />
                    <CardDetails
                      {...{
                        label: (
                          <span>
                            <MdOutlinePayments /> lifetime subscriptions
                          </span>
                        ),
                        value:
                          sub !== 0 ? (
                            <Link
                              to={`/admin/subscriptions?ref=true&user=${user.id}`}
                            >
                              {sub}
                            </Link>
                          ) : (
                            sub
                          ),
                      }}
                    />
                    <CardDetails
                      {...{
                        label: (
                          <span>
                            <GiPayMoney /> lifetime payments
                          </span>
                        ),
                        value:
                          pay !== 0 ? (
                            <Link
                              to={`/admin/payments?ref=true&user=${user.id}&status=s`}
                            >
                              {pay.toFixed(2)}
                            </Link>
                          ) : (
                            pay
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
                        value:
                          bonus !== 0 ? (
                            <Link
                              to={`/admin/earnings?ref=true&user=${user.id}&status=a`}
                            >
                              {bonus.toFixed(2)}
                            </Link>
                          ) : (
                            bonus
                          ),
                      }}
                    />
                    <CardDetails
                      {...{
                        label: (
                          <span>
                            <MdOutlineCreditCardOff /> lifetime debits
                          </span>
                        ),
                        value:
                          debit !== 0 ? (
                            <Link
                              to={`/admin/transactions?ref=true&user=${user.id}&type=d`}
                            >
                              {debit.toFixed(2)}
                            </Link>
                          ) : (
                            debit
                          ),
                      }}
                    />
                    <CardDetails
                      {...{
                        label: (
                          <span>
                            <MdCreditScore /> lifetime credits
                          </span>
                        ),
                        value:
                          credit !== 0 ? (
                            <Link
                              to={`/admin/transactions?ref=true&user=${user.id}&type=c`}
                            >
                              {credit.toFixed(2)}
                            </Link>
                          ) : (
                            credit
                          ),
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
                        value:
                          withdrawal !== 0 ? (
                            <Link
                              to={`/admin/withdrawals?ref=true&user=${user.id}&status=a`}
                            >
                              {withdrawal.toFixed(2)}
                            </Link>
                          ) : (
                            withdrawal
                          ),
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
                          value: (
                            <Link
                              to={`/admin/currencies?ref=true&user=${user.id}&status=a`}
                            >
                              {`${currencies.length} currency pair${
                                currencies.length > 1 ? "s" : ""
                              }`}
                            </Link>
                          ),
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

                          value: (
                            <Link
                              to={`/admin/signal-providers?ref=true&user=${user.id}&status=a`}
                            >
                              {`${providers.length} signal provider${
                                providers.length > 1 ? "s" : ""
                              }`}
                            </Link>
                          ),
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
                    <CardDetails
                      {...{
                        label: (
                          <span>
                            <AiOutlineMoneyCollect /> all account details
                          </span>
                        ),
                        value:
                          accountcount !== 0 ? (
                            <Link
                              to={`/admin/accounts?ref=true&user=${user.id}`}
                            >
                              {accountcount}
                            </Link>
                          ) : (
                            accountcount
                          ),
                      }}
                    />
                  </div>
                </div>

                <div className="mt-3 admin-change-email-btn">
                  <button
                    type="button"
                    className="btn add-btn btn-lg btn-block"
                    onClick={this.openModal}
                  >
                    Change Email <RiFindReplaceLine />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {modal ? (
          <AddModal
            {...{
              modal,
              sender,
              purpose,
              error: servererror,
              user: user.username,
              info: { email: user.email, id: user.id },
              isLoading,
            }}
            onClick={this.modalHandler}
            onSubmit={this.submitHandler}
          />
        ) : null}
        {toast && <Toast text={toasttext} category={toastcategory} />}
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
  errors: PropTypes.any,
  changeEmail: PropTypes.func,
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
  changeEmail,
})(User);
