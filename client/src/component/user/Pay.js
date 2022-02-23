import React, { Component } from "react";

export default class Pay extends Component {
  state = {
    months: 1,
    yearPrice: 600,
    monthPrice: 50,
    monthly: "",
    yearly: "",
    checkedMonth: false,
    checkedYear: false,
    displayMonths: false,
  };

  checkHandler = (e) => {
    if (e.target.name === "monthly") {
      this.setState({
        checkedMonth: true,
        checkedYear: false,
        displayMonths: true,
      });
    } else if (e.target.name === "yearly") {
      this.setState({
        checkedMonth: false,
        checkedYear: true,
        displayMonths: false,
      });
    }
  };

  removeMonths = () => {
    const { months } = this.state;
    if (months <= 1) {
      return false;
    } else {
      this.setState((prevState) => ({
        months: prevState.months - 1,
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
      }));
    }
  };

  changeHandler = (e) => {};

  render() {
    const {
      months,
      monthPrice,
      yearPrice,
      monthly,
      yearly,
      checkedYear,
      checkedMonth,
      displayMonths,
    } = this.state;
    return (
      <div>
        <div className="pay-plan">
          <div className="container">
            <div className="customer-plan card mb-3">
              <h2>Fresh Subscription</h2>
            </div>
            <div className="choose-plan">
              <h3>Choose your Plan</h3>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div
                  className={`pay-plan-box plan-month card ${
                    checkedMonth && "pay-plan-selected"
                  }`}
                >
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="check-pay-month"
                      name="monthly"
                      onChange={this.checkHandler}
                      value={monthly}
                      checked={checkedMonth}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="check-pay-month"
                    >
                      Billed Monthly
                    </label>
                  </div>

                  <h2 className="mt-3">${monthPrice * months}</h2>
                </div>
                <div
                  className={`pay-plan-box plan-year card ${
                    checkedYear && "pay-plan-selected"
                  }`}
                >
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="check-pay-year"
                      name="yearly"
                      value={yearly}
                      onChange={this.checkHandler}
                      checked={checkedYear}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="check-pay-year"
                    >
                      Billed Annually
                    </label>
                  </div>

                  <h2 className="mt-3">${yearPrice}</h2>
                </div>
              </div>
              <div className="col-md-6">
                {displayMonths && (
                  <div className="monthly-pay mb-4">
                    <h3>Choose plan month(s)</h3>

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
                        onChange={this.changeHandler}
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
                )}
                <div className="pay-method">
                  <h3>Choose Payment Method</h3>

                  <button type="button" className="btn btn-primary btn-lg">
                    <i className="fab fa-cc-stripe fa-4x" />
                  </button>
                  <button type="button" className="btn btn-primary btn-lg">
                    <i className="fab fa-bitcoin fa-4x" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
