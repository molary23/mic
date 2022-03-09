import React, { Component } from "react";

import Notification from "../../layout/Notification";
import DisplayForm from "../../layout/DisplayForm";
import SignalForm from "../../layout/SignalForm";
import PasswordForm from "../../layout/PasswordForm";
import AccountCol from "../../layout/AccountCol";
import AddModal from "../../layout/AddModal";
import Toast from "../../layout/Toast";

export default class Settings extends Component {
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

  render() {
    const { active, sender, loading, modal, error, toast, toasttext, purpose } =
      this.state;
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
                        Signal <i className="fas fa-signal" />
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
                        Password <i className="fas fa-shield-alt" />
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${active === 3 ? "active" : ""} `}
                        onClick={() => this.moveActive(3)}
                      >
                        Notification <i className="far fa-bell" />
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
                  id="signal-settings"
                >
                  <SignalForm onSubmit={this.submitHandler} sender={sender} />
                </div>
                <div
                  className={`tab-pane ${active === 1 ? "active" : ""} `}
                  id="account-settings"
                >
                  <div className="account-details">
                    <div className="container">
                      <h4 className="mb-3">Account Details</h4>
                      <div className="row">
                        <AccountCol
                          details={[
                            {
                              wallet: "bitcoin",
                              account: "8t6yghvw76r2567yufvww",
                            },
                            {
                              wallet: "doge",
                              account: "j2gefq678tufgvsuyit798iu",
                            },
                            {
                              wallet: "pi",
                              account: "uit2r67ruy1fwtykfghv",
                            },
                          ]}
                        />
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
                  className={`tab-pane ${active === 2 ? "active" : ""} `}
                  id="password-settings"
                >
                  <PasswordForm onSubmit={this.submitHandler} sender={sender} />
                </div>
                <div
                  className={`tab-pane ${active === 3 ? "active" : ""} `}
                  id="notification-settings"
                >
                  <Notification
                    onSubmit={this.submitNotifyHandler}
                    sender={sender}
                    load={loading}
                  />
                </div>
                <div
                  className={`tab-pane ${active === 4 ? "active" : ""} `}
                  id="dark-mode-settings"
                >
                  <DisplayForm
                    onSubmit={this.submitDisplayHandler}
                    sender={sender}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
