import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../../layout/Spinner";
import ProgressBar from "../../layout/ProgressBar";
import DateFormat from "../../layout/DateFormat";
import Toast from "../../layout/Toast";
import CardDetails from "../../layout/CardDetails";

import { ImCancelCircle } from "react-icons/im";

import { IoReturnUpBackOutline } from "react-icons/io5";
import { FiCheckCircle } from "react-icons/fi";

import {
  clearErrors,
  clearActions,
  clearAdminAction,
  getAdmin,
  updateAdmin,
} from "../../action/adminAction";

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
    servererror: {},
    adminaction: null,
  };
  componentDidMount() {
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
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.errors) {
      update.error = nextProps.errors;
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
    let check = window.confirm(
      `Are you sure you want to ${value[0]} this Admin?`
    );
    if (check) {
      this.setState({
        isLoading: {
          [value[0]]: true,
        },
        adminaction: `${value[0]}d`,
      });
      this.props.updateAdmin(value);
    } else {
      return false;
    }
  };

  render() {
    const { toasttext, toast, isLoading } = this.state;
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
      notAllowed = "There is no User with the specified ID";
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
              <div className="bonus-card card">
                <div className="page-dash-title mb-4">
                  <h1>Admin Details</h1>
                </div>
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    <div className="bonus-info-card">
                      <h3>Personal Info</h3>
                      <div className="card-line-details">
                        <div className="card-label">Last Name</div>
                        <div className="card-value">
                          {admininfo.Profile !== null &&
                            admininfo.Profile.firstname}
                        </div>
                      </div>
                      <div className="card-line-details">
                        <div className="card-label">First Name</div>
                        <div className="card-value">
                          {admininfo.Profile !== null &&
                            admininfo.Profile.lastname}
                        </div>
                      </div>
                      <CardDetails
                        {...{ label: "Email", value: admininfo.email }}
                      />
                      <CardDetails
                        {...{ label: "Username", value: admininfo.username }}
                      />
                      <CardDetails
                        {...{ label: "Phone", value: admininfo.phone }}
                      />
                      {admininfo.status === "a" ? (
                        <CardDetails
                          {...{
                            label: "status",
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
                      ) : (
                        <CardDetails
                          {...{
                            label: "status",
                            value: (
                              <div>
                                <span className="inactive-status status-info">
                                  <span>&bull;</span>
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
                      <div className="card-line-details">
                        <div className="card-label">Role</div>
                        <div className="card-value">
                          {admininfo.level === 3
                            ? "super admin"
                            : "signal provider"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <div className="payer-info-card">
                      <h3>Job Info</h3>
                      {admininfo.level === 3 && (
                        <div className="bonus-from">
                          <div className="card-label">
                            currency pair created
                          </div>
                          <div className="card-value">{currencycount}</div>
                        </div>
                      )}
                      {admininfo.level === 2 && (
                        <div className="card-line-details">
                          <div className="card-label">signals created</div>
                          <div className="card-value">{signalcount}</div>
                        </div>
                      )}
                      {admininfo.level === 2 && (
                        <div className="card-line-details">
                          <div className="card-label">number of followerss</div>
                          <div className="card-value">{followerscount}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bonus-action">
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
                            Approve <FiCheckCircle />
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
                            Reject <ImCancelCircle />
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
