import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { RiLockPasswordLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

import { BiAdjust } from "react-icons/bi";

import {
  getProviderSettings,
  saveSettings,
  clearActions,
} from "../../action/providerAction";

import DisplayForm from "../../layout/DisplayForm";
import PasswordForm from "../../layout/PasswordForm";
import Toast from "../../layout/Toast";
import ProfileForm from "../../layout/ProfileForm";
import ProgressBar from "../../layout/ProgressBar";
import Spinner from "../../layout/Spinner";
import AddModal from "../../layout/AddModal";

class Settings extends Component {
  state = {
    active: 0,
    sender: "provider-settings",
    isLoading: false,
    error: {},
    toast: false,
    toasttext: "",
  };

  componentDidMount() {
    this.props.getProviderSettings();
  }
  componentWillUnmount() {
    this.props.clearActions("provider-settings");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
      prevProps.provider.setpass !== this.props.provider.setpass &&
      this.props.provider.setpass
    ) {
      this.afterUpdate("pass");
    }

    if (
      prevProps.provider.setmode !== this.props.provider.setmode &&
      this.props.provider.setmode
    ) {
      this.afterUpdate("display");
    }
    if (
      prevProps.provider.setprofile !== this.props.provider.setprofile &&
      this.props.provider.setprofile
    ) {
      this.afterUpdate("profile");
    }
  }

  afterUpdate = (text) => {
    // this.props.clearActions("admin-settings");
    this.props.getProviderSettings();
    let words;
    if (text === "pass") {
      words = "Your Password has been changed successfully";
      this.moveActive(1);
    }
    if (text === "profile") {
      words = "Your Profile has been updated successfully";
      this.moveActive(0);
    }
    if (text === "display") {
      words = "Your Display Mode has been updated";
      this.moveActive(2);
    }
    this.setState({
      offset: 0,
      toast: true,
      toasttext: words,
      loading: false,
    });

    setTimeout(() => {
      this.setState({
        toast: false,
      });
    }, 5000);
  };

  moveActive = (nextTab) => {
    this.setState({
      active: nextTab,
    });
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

  submitPassHandler = (value) => {
    this.setState({
      loading: true,
    });
    this.props.saveSettings("password", value);
  };

  render() {
    const { active, sender, loading, modal, error, toast, toasttext, purpose } =
      this.state;
    const { provider } = this.props;

    let load = false,
      loader = false,
      settings = null,
      profile = null,
      mode = null;

    if (provider.providersettings === null || provider.loading) {
      load = true;
      loader = true;
    } else if (provider.providersettings !== null || !provider.loading) {
      load = false;
      loader = false;
      settings = provider.providersettings;
      mode = settings.settings.mode;
      profile = provider.providersettings.profile;
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
                        error={error}
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
                    id="dark-mode-settings"
                  >
                    {mode !== null && (
                      <DisplayForm
                        onSubmit={this.submitDisplayHandler}
                        sender={sender}
                        display={mode}
                        load={loading}
                        error={error}
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
            onSubmit={this.submitAccountHandler}
          />
        ) : null}
        {toast && <Toast text={toasttext} />}
      </div>
    );
  }
}

Settings.propTypes = {
  getProviderSettings: PropTypes.func.isRequired,
  saveSettings: PropTypes.func.isRequired,
  clearActions: PropTypes.func,
  auth: PropTypes.object,
  provider: PropTypes.object,
  errors: PropTypes.any,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  provider: state.provider,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  getProviderSettings,
  saveSettings,
  clearActions,
})(Settings);
