import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Spinner from "../../layout/Spinner";
import ProgressBar from "../../layout/ProgressBar";
import DateFormat from "../../layout/DateFormat";
import Toast from "../../layout/Toast";

import { ImCancelCircle } from "react-icons/im";

import { IoReturnUpBackOutline } from "react-icons/io5";
import { FiCheckCircle } from "react-icons/fi";

import {
  clearErrors,
  clearActions,
  clearAdminAction,
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
    this.props.getAdmin(id);
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
    /*  if (
      prevProps.admin.updatebonus !== this.props.admin.updatebonus &&
      this.props.admin.updatebonus
    ) {
      this.afterUpdate();
      this.setState({
        isLoading: {},
      });
    }*/
  }

  errorUpdate = () => {};

  afterUpdate = () => {
    const { userid, adminaction } = this.state;
    this.setState({
      text: "",
      toast: true,
      toasttext: `Bonus ${adminaction}.`,
    });
    this.props.clearAdminAction("update-bonus");
    this.props.clearActions("get-bonus");
    // this.props.getAdmin(userid);

    setTimeout(() => {
      this.setState({
        toast: false,
      });
    }, 3000);
  };

  clickHandler = (value) => {
    let check = window.confirm(
      `Are you sure you want to ${value[0]} this Bonus?`
    );
    if (check) {
      // this.props.updateBonus({ action: value[0], id: value[1] });
      this.setState({
        isLoading: {
          [value[0]]: true,
        },
        adminaction: `${value[0]}d`,
      });
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
                      <div className="card-line-details">
                        <div className="card-label">Email</div>
                        <div className="card-value">{admininfo.email}</div>
                      </div>
                      <div className="card-line-details">
                        <div className="card-label">Username</div>
                        <div className="card-value">{admininfo.username}</div>
                      </div>
                      <div className="card-line-details">
                        <div className="card-label">Phone</div>
                        <div className="card-value">{admininfo.phone}</div>
                      </div>
                      <div className="card-line-details">
                        <div className="card-label">Status</div>
                        <div className="card-value">
                          {admininfo.status === "a" && (
                            <div>
                              <span className="active-status status-info">
                                <span>&bull;</span>
                              </span>
                              active
                            </div>
                          )}
                          {admininfo.status === "i" && (
                            <div>
                              <span className="inactive-status status-info">
                                <span>&bull;</span>
                              </span>
                              deactivated
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="card-line-details">
                        <div className="card-label">joined on</div>
                        <div className="card-value">
                          <DateFormat date={admininfo.createdAt} />
                        </div>
                      </div>
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
                              this.clickHandler(["approve", admininfo.bonusid])
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
                              this.clickHandler(["reject", admininfo.bonusid])
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

User.propTypes = {
  clearErrors: PropTypes.func,
  clearActions: PropTypes.func.isRequired,

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
})(User);
