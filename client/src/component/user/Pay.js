import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

import { FaStripe, FaBitcoin } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";

import { getBalance, clearActions } from "../../action/userAction";

class Pay extends Component {
  constructor(props) {
    super(props);
    this.payRef = React.createRef();
  }
  state = {
    months: 1,
    yearPrice: 600,
    monthPrice: 50,
    displayMonths: false,
    totalPrice: 0,
    navigate: false,
    to: null,
  };

  componentDidMount() {
    this.props.getBalance();
  }
  componentWillUnmount() {
    this.props.clearActions("user-balance");
  }

  removeMonths = () => {
    const { months } = this.state;
    if (months <= 1) {
      return false;
    } else {
      this.setState((prevState) => ({
        months: prevState.months - 1,
        totalPrice: prevState.totalPrice - 50,
      }));
    }
  };

  addMonths = () => {
    const { months } = this.state;
    if (months >= 11) {
      return false;
    } else {
      this.setState((prevState) => ({
        months: prevState.months + 1,
        totalPrice: prevState.totalPrice + 50,
      }));
    }
  };

  payHandler = (option) => {
    const { totalPrice, displayMonths, months } = this.state;
    let plan = displayMonths ? "m" : "y",
      subPackage = displayMonths ? months : 1;

    const toencrypt = {
      amount: totalPrice,
      gateway: option,
      plan,
      package: subPackage,
    };
    const details = window.btoa(JSON.stringify(toencrypt));

    let url = `/user/payment?details=${details}`;
    this.setState({
      to: url,
      navigate: true,
    });
  };

  clickHandler = (value) => {
    const { monthPrice, yearPrice } = this.state;
    const node = this.payRef.current;
    window.scrollTo({
      top: node.offsetTop,
      behavior: "smooth",
    });
    this.setState({
      totalPrice: value === "month" ? monthPrice : yearPrice,
      displayMonths: value === "month" ? true : false,
    });
  };

  render() {
    const {
      months,
      monthPrice,
      yearPrice,
      displayMonths,
      totalPrice,
      to,
      navigate,
    } = this.state;

    let balance = 0;
    const { user } = this.props;
    if (user.userbalance !== 0) {
      balance = user.userbalance.toFixed(2);
    }
    return (
      <div>
        <div className="pay-plan">
          <div className="container">
            <div className="customer-plan  mb-3">
              <h2>Make Payment</h2>
            </div>
            <div className="choose-plan">
              <h1 className="mb-2">Choose a Plan</h1>
            </div>

            <div className="pay-table">
              <div className="pricing-wrapper">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="pricing-table">
                      <h3 className="pricing-title">Monthly</h3>
                      <div className="price">
                        ${monthPrice}
                        <sup>/ month</sup>
                      </div>

                      <ul className="table-list">
                        <li>
                          30 days <span>Unlimited Signal Updates</span>
                        </li>
                        <li>
                          24/7 <span>customer support</span>
                        </li>
                      </ul>

                      <div className="table-buy">
                        <p>
                          ${monthPrice}
                          <sup>/ month</sup>
                        </p>
                        <button
                          className="pricing-action btn"
                          onClick={() => this.clickHandler("month")}
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="pricing-table recommended">
                      <h3 className="pricing-title">Annually</h3>
                      <div className="price">
                        ${yearPrice}
                        <sup>/ year</sup>
                      </div>

                      <ul className="table-list">
                        <li>
                          365 days <span>Unlimited Signal Updates</span>
                        </li>
                        <li>
                          24/7 <span>customer support</span>
                        </li>
                      </ul>

                      <div className="table-buy">
                        <p>
                          ${yearPrice}
                          <sup>/ year</sup>
                        </p>
                        <button
                          className="pricing-action btn"
                          onClick={() => this.clickHandler("year")}
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pay-balance-info" ref={this.payRef}>
              <div className="plan-pay-card card">
                <div className="row">
                  <div className="col-md-3 col-12">
                    <div className="plan-box">
                      <h3>Plan</h3>
                      <h4>Monthly</h4>
                    </div>
                  </div>
                  <div className="col-md-3 col-12 mb-3">
                    {displayMonths && (
                      <div className="monthly-pay mb-4">
                        <h3>Choose plan month(s)</h3>
                        <div className="change-month-sub">
                          <div className="input-group mb-3 input-group-sm">
                            <button
                              type="button"
                              className="input-group-text"
                              onClick={this.removeMonths}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              className="form-control"
                              value={months}
                              id="pay-months"
                              readOnly
                            />
                            <button
                              type="button"
                              className="input-group-text"
                              onClick={this.addMonths}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="col-md-3 col-12 mb-3">
                    <div className="total-box">
                      <h3>Total</h3>
                      <h2>${totalPrice}</h2>
                    </div>
                  </div>

                  <div className="col-md-3 col-12 mb-3">
                    <div className="total-box">
                      <h3>Balance</h3>
                      <h2>${balance}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {totalPrice > 0 && (
              <div className="pay-gateway card">
                <h1 className="mb-5">Choose a Payment Gateway</h1>

                <div className="gateways-available">
                  <div className="crypto-card card">
                    <FaStripe />
                    <button
                      className="btn pay-with mt-2"
                      onClick={() => this.payHandler("crypto")}
                    >
                      Stripe
                    </button>
                  </div>
                  <div className="bank-card card">
                    <FaBitcoin />
                    <button
                      className="btn pay-with mt-2"
                      onClick={() => this.payHandler("bank")}
                    >
                      Bitpay
                    </button>
                  </div>
                  {balance > totalPrice && (
                    <div
                      className="bonus-card card"
                      onClick={() => this.payHandler("bonus")}
                    >
                      <GiWallet />
                      <button className="btn pay-with mt-2">Bonus</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {navigate && <Navigate to={to} replace={false} />}
      </div>
    );
  }
}

Pay.propTypes = {
  getBalance: PropTypes.func.isRequired,
  clearActions: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
});

export default connect(mapStateToProps, {
  clearActions,
  getBalance,
})(Pay);
