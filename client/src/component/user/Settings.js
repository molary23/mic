import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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
import CurrencyForm from "../../layout/CurrencyForm";
import Spinner from "../../layout/Spinner";

class Settings extends Component {
  state = {
    active: 0,
    sender: "user-settings",
    loading: null,
    modal: false,
    error: {},
    toast: false,
    toasttext: "",
    purpose: "",
  };

  componentDidMount() {
    this.props.getUserSettings();
    this.props.getList("currency");
    this.props.getList("provider");
  }
  componentWillUnmount() {
    this.props.clearActions("user-settings");
    this.props.clearActions("user-currency");
    this.props.clearActions("user-provider");
  }

  moveActive = (nextTab) => {
    this.setState({
      active: nextTab,
    });
  };

  submitNotifyHandler = (value) => {
    console.log(value);
    this.setState({
      loading: false,
    });
  };

  submitDisplayHandler = (value) => {
    console.log(value);
    this.setState({
      loading: false,
    });
  };
  submitProfileHandler = (value) => {};

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
      //   loading: true,
    });
    //console.log(value);
    this.props.saveSettings("provider", value);
    this.setState({
      // loading: false,
    });
  };

  render() {
    const { active, sender, loading, modal, error, toast, toasttext, purpose } =
      this.state;
    const { user } = this.props;

    let load = false,
      loader = false,
      settings = null,
      providers = null,
      profile = null,
      currencies = null,
      accounts = null,
      providerList = null,
      currencyList = null,
      notify = null,
      mode = null;

    if (user.usersettings === null || user.loading) {
      load = true;
      loader = true;
    } else if (user.usersettings !== null || !user.loading) {
      load = false;
      loader = false;
      settings = user.usersettings;
      notify = settings.settings.notify;
      mode = settings.settings.mode;
      providers = settings.settings.providers;
      currencies = settings.settings.currencies;
      accounts = settings.accounts;
      profile = settings.profile;
      currencyList = user.usercurrencies;
      providerList = user.userproviders;
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
              <div className="card-header card-header-primary d-none d-md-block">
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
                          <i className="fas fa-id-card-alt" /> Profile
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            active === 1 ? "active" : ""
                          } `}
                          onClick={() => this.moveActive(1)}
                        >
                          <i className="fas fa-shield-alt" /> Password
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            active === 2 ? "active" : ""
                          } `}
                          onClick={() => this.moveActive(2)}
                        >
                          <i className="fas fa-user-tag" /> Providers
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            active === 3 ? "active" : ""
                          } `}
                          onClick={() => this.moveActive(3)}
                        >
                          <i className="fas fa-money-bill-wave-alt" /> Currency
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            active === 4 ? "active" : ""
                          } `}
                          onClick={() => this.moveActive(4)}
                        >
                          <i className="far fa-bell" /> Notification
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            active === 5 ? "active" : ""
                          } `}
                          onClick={() => this.moveActive(5)}
                        >
                          <i className="fas fa-file-invoice-dollar" /> Account
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          className={`nav-link ${
                            active === 6 ? "active" : ""
                          } `}
                          onClick={() => this.moveActive(6)}
                        >
                          {" "}
                          <i className="fas fa-adjust" />
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
                    <ProfileForm
                      onSubmit={this.submitProfileHandler}
                      userinfo={profile}
                    />
                  </div>
                  <div
                    className={`tab-pane ${active === 1 ? "active" : ""} `}
                    id="password-settings"
                  >
                    <PasswordForm
                      onSubmit={this.submitHandler}
                      sender={sender}
                    />
                  </div>
                  <div
                    className={`tab-pane ${active === 2 ? "active" : ""} `}
                    id="signal-settings"
                  >
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-5 col-xs-12">
                          <div className="provider-list">
                            <h4 className="mb-3">
                              List of Providers you subscribed to
                            </h4>
                            <ul className="list-group mb-3">
                              <SelectList
                                list={providers}
                                sender={"provider"}
                                providerList={providerList}
                              />
                            </ul>
                            {providers !== null && (
                              <div className="d-grid">
                                <button
                                  type="submit"
                                  className="btn default-btn btn-lg btn-block"
                                >
                                  Update List
                                  {loading && (
                                    <span className="spinner-border spinner-border-sm ms-2"></span>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-md-2"></div>
                        <div className="col-md-5 col-xs-12">
                          {providerList !== null && (
                            <SignalForm
                              onSubmit={this.submitProviderHandler}
                              sender={sender}
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
                          <div className="provider-list">
                            <h4 className="mb-3">
                              List of Currencies you subscribed to
                            </h4>
                            <ul className="list-group mb-3">
                              <SelectList
                                list={currencies}
                                sender={"currency"}
                              />
                            </ul>
                            {currencies !== null && (
                              <div className="d-grid">
                                <button
                                  type="submit"
                                  className="btn default-btn btn-lg btn-block"
                                >
                                  Update List
                                  {loading && (
                                    <span className="spinner-border spinner-border-sm ms-2"></span>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
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
                        sender={sender}
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
            onClick={this.modalHandler}
            onSubmit={this.submitHandler}
          />
        ) : null}
        {toast && <Toast text={toasttext} />}
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  profile: state.profile,
});
export default connect(mapStateToProps, {
  getUserSettings,
  getList,
  clearActions,
  clearSettings,
  saveSettings,
})(Settings);
