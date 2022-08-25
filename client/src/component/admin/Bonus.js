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
import { VscCircleFilled } from "react-icons/vsc";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { FiCheckCircle } from "react-icons/fi";

import {
  clearErrors,
  getBonus,
  clearActions,
  updateBonus,
  clearAdminAction,
} from "../../action/adminAction";

import { setDocumentTitle } from "../../util/LoadFunction";

class Bonus extends Component {
  state = {
    text: "",
    sender: "admin-bonus",
    url: new URL(window.location),
    bonusid: null,
    toast: null,
    toasttext: null,
    isLoading: false,
    bonusaction: null,
    toastcategory: null,
  };
  componentDidMount() {
    setDocumentTitle("admin", "view user earning");
    const { url } = this.state;
    let params = url.pathname.split("bonus")[1],
      id = params.split(":")[1];
    this.setState({
      bonusid: id,
    });
    this.props.clearErrors();
    this.props.getBonus(id);
  }

  componentWillUnmount() {
    this.props.clearActions("get-bonus");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let update = {};
    if (nextProps.errors) {
      update.isLoading = false;
    }

    return update;
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.admin.updatebonus !== this.props.admin.updatebonus &&
      this.props.admin.updatebonus
    ) {
      this.afterUpdate();
      this.setState({
        isLoading: false,
      });
    }
  }

  afterUpdate = () => {
    const { bonusid, bonusaction } = this.state;
    this.setState({
      text: "",
      toast: true,
      toasttext: `Bonus ${bonusaction}.`,
    });
    this.props.clearAdminAction("update-bonus");
    this.props.getBonus(bonusid);

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
      this.setState({
        isLoading: true,
        bonusaction: `${value[0]}d`,
      });
      this.props.updateBonus({ action: value[0], id: value[1] });
    } else {
      return false;
    }
  };

  render() {
    const { toasttext, toast, isLoading, toastcategory } = this.state;
    let loader = false,
      load = false,
      noRecord = false,
      notAllowed = false;
    const { admin } = this.props,
      { loading } = admin;
    let bonus, bonusinfo, pay;
    if (admin.getbonus === null || loading) {
      loader = true;
      load = true;
    } else if (admin.getbonus.bonus !== null && !loading) {
      loader = false;
      load = false;
      bonus = admin.getbonus;
      bonusinfo = bonus.bonus;
      pay = bonus.pay;
    } else if (admin.getbonus.bonus === null && !loading) {
      loader = false;
      load = false;
      noRecord = true;
      notAllowed = "There is no Bonus with the specified ID";
    }

    return (
      <div>
        {(loader || isLoading) && <ProgressBar />}
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
                  <h1>Bonus Details</h1>
                </div>
                <div className="row">
                  <div className="col-md-6 col-12 mb-5">
                    <div className="bonus-info-card">
                      <h3>Bonus Info</h3>
                      <CardDetails
                        {...{
                          label: "Bonus to",
                          value: bonusinfo.username,
                        }}
                      />
                      <CardDetails
                        {...{
                          label: "Amount",
                          value: bonusinfo.amount,
                        }}
                      />

                      {bonusinfo.status === "p" && (
                        <CardDetails
                          {...{
                            label: "status",
                            value: (
                              <div>
                                <span className="new-status status-info">
                                  <span>
                                    <VscCircleFilled />
                                  </span>
                                </span>
                                pending
                              </div>
                            ),
                          }}
                        />
                      )}
                      {bonusinfo.status === "a" && (
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
                                approved
                              </div>
                            ),
                          }}
                        />
                      )}
                      {bonusinfo.status === "r" && (
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
                                rejected
                              </div>
                            ),
                          }}
                        />
                      )}

                      <CardDetails
                        {...{
                          label: "date created",
                          value: <DateFormat date={bonusinfo.createdAt} />,
                        }}
                      />
                      {bonusinfo.status !== "p" && (
                        <CardDetails
                          {...{
                            label: `date ${
                              bonusinfo.status === "a" ? "approved" : "rejected"
                            }`,
                            value: <DateFormat date={bonusinfo.updatedAt} />,
                          }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-12 mb-5">
                    <div className="payer-info-card">
                      <h3>Payment Info</h3>
                      <CardDetails
                        {...{
                          label: "bonus from",
                          value: bonusinfo.payer,
                        }}
                      />
                      <CardDetails
                        {...{
                          label: "amount paid",
                          value: pay.amount,
                        }}
                      />
                      <CardDetails
                        {...{
                          label: "payment medium",
                          value: `${pay.gateway ? "crypto" : "bank"}`,
                        }}
                      />

                      {pay.status === "s" ? (
                        <CardDetails
                          {...{
                            label: "payment status",
                            value: (
                              <div>
                                <span className="active-status status-info">
                                  <span>
                                    <VscCircleFilled />
                                  </span>
                                </span>
                                successful
                              </div>
                            ),
                          }}
                        />
                      ) : (
                        <CardDetails
                          {...{
                            label: "payment status",
                            value: (
                              <div>
                                <span className="inactive-status status-info">
                                  <span>
                                    <VscCircleFilled />
                                  </span>
                                </span>
                                failed
                              </div>
                            ),
                          }}
                        />
                      )}
                      <CardDetails
                        {...{
                          label: "payment reference",
                          value: pay.reference,
                        }}
                      />
                      <CardDetails
                        {...{
                          label: "date of payment",
                          value: <DateFormat date={pay.createdAt} />,
                        }}
                      />
                    </div>
                  </div>
                </div>
                {bonusinfo.status === "p" && (
                  <div className="bonus-action ">
                    <div className="row">
                      <div className="col-6">
                        <div className="d-grid">
                          <button
                            type="button"
                            className="btn accept-btn btn-lg btn-block"
                            onClick={() =>
                              this.clickHandler(["approve", bonusinfo.bonusid])
                            }
                          >
                            Approve <FiCheckCircle />
                            {isLoading.approve && (
                              <span className="spinner-border spinner-border-sm ms-2"></span>
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-grid">
                          <button
                            type="button"
                            className="btn reject-btn btn-lg btn-block"
                            onClick={() =>
                              this.clickHandler(["reject", bonusinfo.bonusid])
                            }
                          >
                            Reject <ImCancelCircle />
                            {isLoading.reject && (
                              <span className="spinner-border spinner-border-sm ms-2"></span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        {toast && <Toast text={toasttext} category={toastcategory} />}
      </div>
    );
  }
}

Bonus.propTypes = {
  clearErrors: PropTypes.func,
  updateBonus: PropTypes.func,
  clearActions: PropTypes.func.isRequired,
  clearAdminAction: PropTypes.func.isRequired,
  getBonus: PropTypes.func.isRequired,
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
  getBonus,
  clearActions,
  updateBonus,
  clearAdminAction,
})(Bonus);
