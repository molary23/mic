import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import {
  RiLockPasswordLine,
  RiCurrencyLine,
  RiShieldUserLine,
} from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { BiAdjust } from "react-icons/bi";
import { HiOutlineBell } from "react-icons/hi";

import {
  getUserSettings,
  getList,
  clearActions,
  clearSettings,
  saveSettings,
} from "../../action/userAction";

import Notification from "../../layout/Notification";
import DisplayForm from "../../layout/DisplayForm";
import SignalForm from "../../layout/SignalForm";
import PasswordForm from "../../layout/PasswordForm";
import AccountCol from "../../layout/AccountCol";
import AddModal from "../../layout/AddModal";
import Toast from "../../layout/Toast";
import ProfileForm from "../../layout/ProfileForm";
import ProgressBar from "../../layout/ProgressBar";
import SelectList from "../../layout/SelectList";
import List from "../../layout/List";
import CurrencyForm from "../../layout/CurrencyForm";
import Spinner from "../../layout/Spinner";

class Settings extends Component {
  state = {
    active: 0,
    sender: "user-settings",
    loading: false,
    modal: false,
    error: {},
    toast: false,
    toasttext: "",
    toastcategory: "",
    purpose: "",
  };

  componentDidMount() {
    this.props.getUserSettings();
    this.props.getList("currency");
    this.props.getList("provider");
    this.props.getList("wallet");
  }
  componentWillUnmount() {
    this.props.clearActions("user-settings");
    this.props.clearActions("user-currency");
    this.props.clearActions("user-provider");
    this.props.clearActions("user-wallet");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (
      nextProps.errors !== prevState.errors &&
      Object.keys(nextProps.errors).length > 0
    ) {
      update.error = nextProps.errors.data;
      update.isLoading = false;
    } else if (
      nextProps.errors !== prevState.errors &&
      Object.keys(nextProps.errors).length === 0
    ) {
      update.error = {};
    }
    return update;
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.user.setpass !== this.props.user.setpass &&
      this.props.user.setpass
    ) {
      this.afterUpdate("pass");
    }
    if (
      prevProps.user.setcurrency !== this.props.user.setcurrency &&
      this.props.user.setcurrency
    ) {
      this.afterUpdate("currency");
    }
    if (
      prevProps.user.setprovider !== this.props.user.setprovider &&
      this.props.user.setprovider
    ) {
      this.afterUpdate("provider");
    }
    if (
      prevProps.user.setnotify !== this.props.user.setnotify &&
      this.props.user.setnotify
    ) {
      this.afterUpdate("notify");
    }
    if (
      prevProps.user.setmode !== this.props.user.setmode &&
      this.props.user.setmode
    ) {
      this.afterUpdate("display");
    }
    if (
      prevProps.user.setprofile !== this.props.user.setprofile &&
      this.props.user.setprofile
    ) {
      this.afterUpdate("profile");
    }
    if (
      prevProps.user.setaccount !== this.props.user.setaccount &&
      this.props.user.setaccount
    ) {
      this.afterUpdate("account");
    }
  }

  afterUpdate = (text) => {
    // this.props.clearActions("user-settings");
    this.props.getUserSettings();
    let words;
    if (text === "pass") {
      words = "Your Password has been changed successfully";
      this.moveActive(1);
    }
    if (text === "profile") {
      words = "Your Profile has been updated successfully";
      this.moveActive(0);
    }
    if (text === "account") {
      words = "Your Account details has been updated";
      this.moveActive(4);
    }
    if (text === "provider") {
      words = "Your Provider options has been updated";
      this.moveActive(2);
    }
    if (text === "currency") {
      words = "Your Currency options has been updated";
      this.moveActive(3);
    }
    if (text === "notify") {
      words = "Your Notification options has been updated";
      this.moveActive(4);
    }
    if (text === "display") {
      words = "Your Display Mode has been updated";
      this.moveActive(6);
    }
    this.setState({
      offset: 0,
      toast: true,
      toasttext: words,
      toastcategory: "success",
      loading: false,
    });

    setTimeout(() => {
      this.setState({
        toast: false,
      });
    }, 3000);
  };

  moveActive = (nextTab) => {
    this.setState({
      active: nextTab,
    });
  };

  submitNotifyHandler = (value) => {
    this.setState({
      loading: true,
    });
    this.props.saveSettings("notify", { notify: value });
  };

  submitDisplayHandler = (value) => {
    this.setState({
      loading: true,
    });
    this.props.saveSettings("mode", { mode: value });
  };
  submitProfileHandler = (value) => {
    this.setState({
      loading: true,
    });
    this.props.saveSettings("profile", value);
  };

  submitCurrencyHandler = (value) => {
    this.setState({
      loading: true,
    });
    if (value[0] === "selected") {
      this.props.saveSettings("currency", value[1]);
    } else if (value[0] === "all") {
      this.props.saveSettings("reset-currency", value[1]);
    }
  };

  submitAccountHandler = (value) => {
    this.setState({
      loading: true,
    });
    //console.log(value);
    this.props.saveSettings("account", value);
  };

  submitPassHandler = (value) => {
    this.setState({
      loading: true,
    });
    this.props.saveSettings("password", value);
  };

  openModal = () => {
    this.setState({
      modal: true,
      purpose: "account",
    });
  };

  modalHandler = (close) => {
    this.setState({
      modal: close,
    });
  };

  submitProviderHandler = (value) => {
    this.setState({
      loading: true,
    });
    if (value[0] === "selected") {
      this.props.saveSettings("provider", value[1]);
    } else if (value[0] === "all") {
      this.props.saveSettings("reset-provider", value[1]);
    }
  };

  submitListHandler = (value) => {
    this.setState({
      loading: true,
    });
    this.props.saveSettings(value[0], value[1]);
  };

  render() {
    const {
      active,
      sender,
      loading,
      modal,
      error,
      toast,
      toasttext,
      purpose,
      toastcategory,
    } = this.state;
    const { user } = this.props;

    let load = false,
      loader = false,
      settings = null,
      profile = null,
      accounts = null,
      providerList = null,
      currencyList = null,
      walletList = null,
      notify = null,
      mode = null;

    if (user.usersettings === null || user.loading) {
      load = true;
      loader = true;
    } else if (user.usersettings !== null || !user.loading) {
      load = false;
      loader = false;
      settings = user.usersettings;
      notify = settings.preference.notify;
      mode = settings.settings.mode;
      accounts = settings.accounts;
      profile = settings.profile;
      currencyList = user.usercurrencies;
      providerList = user.userproviders;
      walletList = user.userwallet;
    }

    return (
      <div>
        {(loader || loading) && <ProgressBar />}
        {load ? (
          <Spinner />
        ) : (
          <div className="settings">
            <div className="page-dash-title mb-4">
              <h1>Settings</h1>
            </div>
            <div className="card card-nav-tabs card-plain">
              <div className="card-header card-header-primary">
                <div className="nav-tabs-navigation">
                  <div className="nav-tabs-wrapper">
                    <ul className="nav nav-pills" data-tabs="tabs">
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            active === 0 ? "active" : ""
                          } `}
                          onClick={() => this.moveActive(0)}
                        >
                          <CgProfile /> Profile
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            active === 1 ? "active" : ""
                          } `}
                          onClick={() => this.moveActive(1)}
                        >
                          <RiLockPasswordLine /> Password
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            active === 2 ? "active" : ""
                          } `}
                          onClick={() => this.moveActive(2)}
                        >
                          <RiShieldUserLine /> Providers
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            active === 3 ? "active" : ""
                          } `}
                          onClick={() => this.moveActive(3)}
                        >
                          <RiCurrencyLine /> Currency
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            active === 4 ? "active" : ""
                          } `}
                          onClick={() => this.moveActive(4)}
                        >
                          <HiOutlineBell /> Notification
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            active === 5 ? "active" : ""
                          } `}
                          onClick={() => this.moveActive(5)}
                        >
                          <AiOutlineMoneyCollect /> Account
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            active === 6 ? "active" : ""
                          } `}
                          onClick={() => this.moveActive(6)}
                        >
                          <BiAdjust /> Display Mode
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body container">
                <div className="tab-content">
                  <div
                    className={`tab-pane ${active === 0 ? "active" : ""} `}
                    id="profile-settings"
                  >
                    {profile !== null && (
                      <ProfileForm
                        onSubmit={this.submitProfileHandler}
                        userinfo={profile}
                      />
                    )}
                  </div>
                  <div
                    className={`tab-pane ${active === 1 ? "active" : ""} `}
                    id="password-settings"
                  >
                    <PasswordForm
                      onSubmit={this.submitPassHandler}
                      sender={sender}
                      load={loading}
                      error={error}
                    />
                  </div>
                  <div
                    className={`tab-pane ${active === 2 ? "active" : ""} `}
                    id="signal-settings"
                  >
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-5 col-xs-12">
                          <List
                            list={settings.providers}
                            sender={"provider"}
                            onSubmit={this.submitListHandler}
                            load={loading}
                          />
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 col-xs-12">
                          {providerList !== null && (
                            <SignalForm
                              onSubmit={this.submitProviderHandler}
                              providerList={providerList}
                              load={loading}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`tab-pane ${active === 3 ? "active" : ""} `}
                    id="currency-settings"
                  >
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-5 col-xs-12">
                          <SelectList
                            list={settings.currencies}
                            onSubmit={this.submitListHandler}
                            load={loading}
                          />
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 col-xs-12">
                          {currencyList !== null && (
                            <CurrencyForm
                              onSubmit={this.submitCurrencyHandler}
                              currencyList={currencyList}
                              load={loading}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`tab-pane ${active === 4 ? "active" : ""} `}
                    id="notification-settings"
                  >
                    {notify !== null && (
                      <Notification
                        onSubmit={this.submitNotifyHandler}
                        sender={"currency"}
                        load={loading}
                        alert={notify}
                      />
                    )}
                  </div>
                  <div
                    className={`tab-pane ${active === 5 ? "active" : ""} `}
                    id="account-settings"
                  >
                    <div className="account-details">
                      <div className="container">
                        <h4 className="mb-3">Account Details</h4>
                        <div className="row">
                          <AccountCol details={accounts} />
                        </div>
                      </div>
                    </div>
                    <div className="add-new-account">
                      <button
                        className="btn add-new-btn"
                        onClick={this.openModal}
                      >
                        Add/Change Account <i className="fas fa-edit" />
                      </button>
                    </div>
                  </div>
                  <div
                    className={`tab-pane ${active === 6 ? "active" : ""} `}
                    id="dark-mode-settings"
                  >
                    {mode !== null && (
                      <DisplayForm
                        onSubmit={this.submitDisplayHandler}
                        sender={sender}
                        display={mode}
                        load={loading}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {modal ? (
          <AddModal
            {...{ modal, sender, error, purpose }}
            walletList={walletList !== null && walletList}
            onClick={this.modalHandler}
            onSubmit={this.submitAccountHandler}
          />
        ) : null}
        {toast && <Toast text={toasttext} category={toastcategory} />}
      </div>
    );
  }
}

Settings.propTypes = {
  getUserSettings: PropTypes.func.isRequired,
  getList: PropTypes.func,
  clearActions: PropTypes.func,
  clearSettings: PropTypes.func,
  saveSettings: PropTypes.func,
  auth: PropTypes.object,
  user: PropTypes.object,
  errors: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  getUserSettings,
  getList,
  clearActions,
  clearSettings,
  saveSettings,
})(Settings);
