import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Navigate } from "react-router-dom";
import Toast from "../../layout/Toast";
import ProgressBar from "../../layout/ProgressBar";

import { makePayment, clearActions } from "../../action/userAction";

class Payment extends Component {
  state = {
    navigate: false,
    to: null,
    payOption: null,
    toast: false,
    toasttext: null,
    isLoading: false,
  };

  componentDidMount() {
    let search = window.location.search;

    if (search !== "") {
      let ref = search.split("?")[1],
        sender = ref.split("=")[0];
      if (sender === "details") {
        let params = search.split("details=")[1],
          opt = window.atob(params);
        this.setState({
          payOption: JSON.parse(opt),
        });
      } else if (sender === "success") {
      }
    } else {
      this.setState({
        to: "/user/pay",
        navigate: true,
      });
    }
  }

  componentWillUnmount() {
    this.props.clearActions("make-payment");
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.user.makepayment !== this.props.user.makepayment &&
      this.props.user.makepayment
    ) {
      this.afterUpdate();
    }
  }

  afterUpdate = (text) => {
    const { timer } = this.state;

    this.setState({
      isLoading: false,
      offset: 0,
      modal: false,
      toast: true,
      toasttext: `Payment successfully`,
    });
    this.props.clearActions("make-payment");

    setTimeout(() => {
      this.setState({
        toast: false,
        newsignal: {},
      });
    }, timer);
  };

  clickHandler = () => {
    const { payOption } = this.state;
    //lets make dummy payment
    let dummy = Math.floor(Math.random() * 10 + 1),
      reference = Math.random().toString(36).substring(2, 20).toLowerCase(),
      status,
      gateway,
      type;
    if (dummy % 2 === 0) {
      status = "f";
    } else {
      status = "s";
    }
    if (payOption.gateway === "bank") {
      gateway = "b";
      type = "p";
    } else if (payOption.gateway === "crypto") {
      gateway = "c";
      type = "p";
    } else if (payOption.gateway === "bonus") {
      gateway = "b";
      type = "b";
    }
    const payData = {
      status,
      reference,
      gateway,
      plan: payOption.plan,
      package: payOption.package,
      amount: payOption.amount,
    };
    this.setState({
      isLoading: true,
    });
    this.props.makePayment([type, payData]);
  };

  render() {
    const { navigate, to, payOption, toast, toasttext, isLoading } = this.state;
    let amount, gateway;
    if (payOption !== null) {
      amount = payOption.amount;
      gateway = payOption.gateway;
    }
    return (
      <div>
        {isLoading && <ProgressBar />}
        <div className="container">
          <div className="customer-plan  mb-3">
            <h2>Make Payment</h2>
          </div>
          <p className="mb-1">
            You have decided to pay ${amount} via {gateway}.
          </p>
          <p className="mb-1">
            Proceed to{" "}
            <button className="btn pay-with" onClick={this.clickHandler}>
              {gateway}
            </button>
            site to pay.
          </p>
        </div>
        {toast && <Toast text={toasttext} />}
        {navigate && <Navigate to={to} replace={false} />}
      </div>
    );
  }
}

Payment.propTypes = {
  makePayment: PropTypes.func,
  clearActions: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, {
  clearActions,
  makePayment,
})(Payment);
