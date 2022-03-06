import React, { Component } from "react";

import Notification from "../../layout/Notification";
import AccountForm from "../../layout/AccountForm";
import DisplayForm from "../../layout/DisplayForm";
import SignalForm from "../../layout/SignalForm";
import PasswordForm from "../../layout/PasswordForm";

export default class Settings extends Component {
  state = {
    active: 0,
    sender: "user-settings",
  };

  moveActive = (nextTab) => {
    this.setState({
      active: nextTab,
    });
  };
  render() {
    const { active, sender } = this.state;
    return (
      <div>
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
                        className={`nav-link ${active === 0 ? "active" : ""} `}
                        onClick={() => this.moveActive(0)}
                      >
                        Notification <i className="far fa-bell" />
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${active === 1 ? "active" : ""} `}
                        onClick={() => this.moveActive(1)}
                      >
                        Account <i className="fas fa-file-invoice-dollar" />
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${active === 2 ? "active" : ""} `}
                        onClick={() => this.moveActive(2)}
                      >
                        Signal <i className="fas fa-signal" />
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${active === 3 ? "active" : ""} `}
                        onClick={() => this.moveActive(3)}
                      >
                        Password <i className="fas fa-shield-alt" />
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${active === 4 ? "active" : ""} `}
                        onClick={() => this.moveActive(4)}
                      >
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
                  id="notification-settings"
                >
                  <Notification onSubmit={this.submitHandler} sender={sender} />
                </div>
                <div
                  className={`tab-pane ${active === 1 ? "active" : ""} `}
                  id="account-settings"
                >
                  <div className="account-details">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6 col-xs-12">
                          <div className="first-account card">
                            <h3>Account Details 1 </h3>

                            <div className="settings-details">
                              <div className="settings-title">Bank Name</div>
                              <div className="settings-info"> Account 1</div>
                            </div>
                            <div className="settings-details">
                              <div className="settings-title">
                                Account Number
                              </div>
                              <div className="settings-info"> 0859867234 </div>
                            </div>
                            <button className="btn edit-btn">
                              <i className="fas fa-edit" />
                            </button>
                          </div>
                        </div>
                        <div className="col-md-6 col-xs-12">
                          <div className="second-account card">
                            <h3>Account Details 2 </h3>
                            <div className="settings-details">
                              <div className="settings-title">Bank Name</div>
                              <div className="settings-info"> Account 2</div>
                            </div>
                            <div className="settings-details">
                              <div className="settings-title">Bank Name</div>
                              <div className="settings-info"> Account 2</div>
                            </div>
                            <button className="btn edit-btn">
                              <i className="fas fa-edit" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <AccountForm onSubmit={this.submitHandler} sender={sender} />
                </div>
                <div
                  className={`tab-pane ${active === 2 ? "active" : ""} `}
                  id="signal-settings"
                >
                  <SignalForm onSubmit={this.submitHandler} sender={sender} />
                </div>
                <div
                  className={`tab-pane ${active === 3 ? "active" : ""} `}
                  id="password-settings"
                >
                  <PasswordForm onSubmit={this.submitHandler} sender={sender} />
                </div>
                <div
                  className={`tab-pane ${active === 4 ? "active" : ""} `}
                  id="dark-mode-settings"
                >
                  <DisplayForm onSubmit={this.submitHandler} sender={sender} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
