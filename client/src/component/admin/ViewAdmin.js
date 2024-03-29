import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../../layout/Spinner";
import ProgressBar from "../../layout/ProgressBar";
import DateFormat from "../../layout/DateFormat";
import Toast from "../../layout/Toast";
import CardDetails from "../../layout/CardDetails";
import ConfirmModal from "../../layout/ConfirmModal";

import { ImCancelCircle } from "react-icons/im";
import { VscCircleFilled } from "react-icons/vsc";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { FiCheckCircle } from "react-icons/fi";

import {
  clearErrors,
  clearActions,
  clearAdminAction,
  getAdmin,
  updateAdmin,
} from "../../action/adminAction";

import { setDocumentTitle } from "../../util/LoadFunction";

class ViewAdmin extends Component {
  state = {
    text: "",
    sender: "admin-admin",
    error: {},
    url: new URL(window.location),
    adminid: null,
    toast: null,
    toasttext: null,
    isLoading: {},
    adminaction: null,
    check: false,
    checktext: null,
    checktitle: null,
  };
  componentDidMount() {
    setDocumentTitle("admin view admin");
    const { url } = this.state;
    let id = url.pathname.split("/:")[1];
    this.setState({
      adminid: id,
    });
    this.props.clearErrors();
    this.props.getAdmin(id);
  }

  componentWillUnmount() {
    this.props.clearActions("get-admin");
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
      prevProps.admin.updateadmin !== this.props.admin.updateadmin &&
      this.props.admin.updateadmin
    ) {
      this.afterUpdate();
      this.setState({
        isLoading: {},
      });
    }
  }

  afterUpdate = () => {
    const { adminid, adminaction } = this.state;

    this.props.clearAdminAction("update-admin");

    this.setState({
      offset: 0,
      modal: false,
      toast: true,
      toasttext: `Admin ${adminaction} successfully`,
    });

    this.props.clearAdminAction("update-admin");
    this.props.getAdmin(adminid);

    setTimeout(() => {
      this.setState({
        toast: false,
        newsignal: {},
      });
    }, 3000);
  };

  errorUpdate = () => {};

  clickHandler = (value) => {
    this.setState({
      check: true,
      checktext: `Are you sure you want to ${value[0]} this Admin?`,
      checktitle: "Confirm Delete",
      isLoading: {
        [value[0]]: true,
      },
      adminaction: `${value[0]}d`,
    });

    this.confirmHandler = (option) => {
      if (option) {
        this.setState({
          isLoading: true,
        });
        this.props.updateAdmin(value);
      }
      this.setState({
        check: false,
      });
    };
  };

  render() {
    const {
      toasttext,
      toast,
      isLoading,
      sender,
      check,
      checktext,
      checktitle,
    } = this.state;
    let loader = false,
      load = false,
      noRecord = false,
      notAllowed = false;
    const { admin } = this.props,
      { loading } = admin;
    let adm, admininfo, currencycount, signalcount, followerscount;

    if (admin.getadmin === null || loading) {
      loader = true;
      load = true;
    } else if (admin.getadmin.user !== null && !loading) {
      loader = false;
      load = false;
      adm = admin.getadmin;
      admininfo = adm.user;
      if (admininfo.level === 3) {
        currencycount = adm.currencycount;
      } else if (admininfo.level === 2) {
        signalcount = adm.signalcount;
        followerscount = adm.followerscount;
      }
    } else if (admin.getadmin.user === null && !loading) {
      loader = false;
      load = false;
      noRecord = true;
      notAllowed = "There is no Admin with the specified ID";
    }

    if (isLoading.approve || isLoading.reject) {
      loader = true;
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
                <Link to="/admin/earnings">
                  Back <IoReturnUpBackOutline />
                </Link>
              </p>
            ) : (
              <div className="view-card card">
                <div className="page-dash-title mb-4">
                  <h1>Admin Details</h1>
                </div>
                <div className="row">
                  <div className="col-md-6 col-12 mb-5">
                    <div className="bonus-info-card">
                      <h3>Personal Info</h3>

                      <CardDetails
                        {...{
                          label: "last name",
                          value: `${
                            admininfo.Profile !== null
                              ? admininfo.Profile.lastname
                              : ""
                          } `,
                        }}
                      />
                      <CardDetails
                        {...{
                          label: "First Name",
                          value: `${
                            admininfo.Profile !== null
                              ? admininfo.Profile.firstname
                              : ""
                          } `,
                        }}
                      />
                      <CardDetails
                        {...{
                          label: "Email",
                          value: (
                            <span className="lower">{admininfo.email}</span>
                          ),
                        }}
                      />
                      <CardDetails
                        {...{ label: "Username", value: admininfo.username }}
                      />

                      <CardDetails
                        {...{
                          label: "Phone",
                          value: `${
                            admininfo.Profile !== null
                              ? admininfo.Profile.phone
                              : ""
                          }`,
                        }}
                      />

                      {admininfo.status === "a" ? (
                        <CardDetails
                          {...{
                            label: "status",
                            value: (
                              <div>
                                <span className="active-status status-info">
                                  <span>
                                    <VscCircleFilled />
                                  </span>
                                </span>
                                active
                              </div>
                            ),
                          }}
                        />
                      ) : (
                        <CardDetails
                          {...{
                            label: "status",
                            value: (
                              <div>
                                <span className="inactive-status status-info">
                                  <span>
                                    <VscCircleFilled />
                                  </span>
                                </span>
                                deactivated
                              </div>
                            ),
                          }}
                        />
                      )}

                      <CardDetails
                        {...{
                          label: "joined on",
                          value: <DateFormat date={admininfo.createdAt} />,
                        }}
                      />

                      <CardDetails
                        {...{
                          label: "role",
                          value: `${
                            admininfo.level === 3
                              ? "super admin"
                              : "signal provider"
                          }`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-5">
                    <div className="payer-info-card">
                      <h3>Job Info</h3>
                      {admininfo.level === 3 && (
                        <CardDetails
                          {...{
                            label: "currency pair created",
                            value:
                              currencycount !== 0 ? (
                                <Link
                                  to={`/admin/currencies?ref=true&creator=${admininfo.id}`}
                                >
                                  {currencycount}
                                </Link>
                              ) : (
                                currencycount
                              ),
                          }}
                        />
                      )}
                      {admininfo.level === 2 && (
                        <div>
                          <CardDetails
                            {...{
                              label: "signals created",
                              value:
                                signalcount !== 0 ? (
                                  <Link
                                    to={`/admin/signals?ref=true&creator=${admininfo.id}`}
                                  >
                                    {signalcount}
                                  </Link>
                                ) : (
                                  signalcount
                                ),
                            }}
                          />
                          <CardDetails
                            {...{
                              label: "number of followers",
                              value:
                                followerscount !== 0 ? (
                                  <Link
                                    to={`/admin/users?ref=true&creator=${admininfo.id}`}
                                  >
                                    {followerscount}
                                  </Link>
                                ) : (
                                  followerscount
                                ),
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="admin-action ">
                  <div className="row">
                    {admininfo.status === "i" && (
                      <div className="col-6">
                        <div className="d-grid">
                          <button
                            type="button"
                            className="btn default-btn btn-lg btn-block"
                            onClick={() =>
                              this.clickHandler(["reactivate", admininfo.id])
                            }
                          >
                            Reactivate <FiCheckCircle />
                            {isLoading.approve && (
                              <span className="spinner-border spinner-border-sm ms-2"></span>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                    {admininfo.status === "a" && (
                      <div className="col-6">
                        <div className="d-grid">
                          <button
                            type="button"
                            className="btn reject-btn btn-lg btn-block"
                            onClick={() =>
                              this.clickHandler(["delete", admininfo.id])
                            }
                          >
                            Delete <ImCancelCircle />
                            {isLoading.reject && (
                              <span className="spinner-border spinner-border-sm ms-2"></span>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {check && (
          <ConfirmModal
            {...{ check, sender, checktext, checktitle }}
            onClick={this.confirmHandler}
          />
        )}
        {toast && <Toast text={toasttext} />}
      </div>
    );
  }
}

ViewAdmin.propTypes = {
  clearErrors: PropTypes.func,
  clearActions: PropTypes.func.isRequired,
  getAdmin: PropTypes.func.isRequired,
  updateAdmin: PropTypes.func.isRequired,
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
  getAdmin,
  updateAdmin,
})(ViewAdmin);
