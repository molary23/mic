import React, { Component } from "react";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";

const trans = [
  {
    amount: 200,
    method: "bonus",
    type: "credit",
    date: new Date(),
  },
  {
    amount: 400,
    method: "bonus",
    type: "credit",
    date: new Date(),
  },
  {
    amount: 250,
    method: "withdrawal",
    type: "debit",
    date: new Date(),
  },
  {
    amount: 600,
    method: "subscription",
    type: "debit",
    date: new Date(),
  },
  {
    amount: 700,
    method: "bonus",
    type: "credit",
    date: new Date(),
  },
  {
    amount: 100,
    method: "bonus",
    type: "credit",
    date: new Date(),
  },
  {
    amount: 500,
    method: "bonus",
    type: "credit",
    date: new Date(),
  },
  {
    amount: 400,
    method: "subscription",
    type: "debit",
    date: new Date(),
  },
  {
    amount: 650,
    method: "bonus",
    type: "credit",
    date: new Date(),
  },
];

export class Transactions extends Component {
  state = {
    sender: "transactions",
    loading: false,
    methodOptions: [
      { value: 0, option: "Filter by Method" },
      { value: "b", option: "Bonus" },
      { value: "s", option: "Subscriptions" },
      { value: "w", option: "Withdrawal" },
    ],
    typeOptions: [
      { value: 0, option: "Filter by Type" },
      { value: "d", option: "Debit" },
      { value: "c", option: "Credit" },
    ],
    type: "",
    method: "",
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      loading: true,
    });

    // select from DB
  };
  render() {
    const { loading, sender, methodOptions, typeOptions, type, method } =
      this.state;
    return (
      <div>
        {loading && <ProgressBar />}
        <div className="transactions card holder-card ">
          <div className="page-dash-title mb-4">
            <h1>Transactions</h1>
          </div>
          <div className="container-fluid mb-4">
            <div className="row">
              <div className="col-md-3">
                <Select
                  sender={sender}
                  options={methodOptions}
                  onChange={this.changeHandler}
                  name="method"
                  value={method}
                />
              </div>
              <div className="col-md-3">
                <Select
                  sender={sender}
                  options={typeOptions}
                  onChange={this.changeHandler}
                  name="type"
                  value={type}
                />
              </div>
              <div className="col-md-3">
                <div className="col-md-3 ">
                  <button type="button" className="btn btn-outline-primary">
                    Download <i className="far fa-file-excel" />
                  </button>
                </div>
              </div>
              <div className="col-md-3">
                <div className="transactions-total table-figure">
                  <h4>
                    Balance
                    <span className="badge rounded-pill bg-success">
                      2500000
                    </span>
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <TableHead
            sender={sender}
            head={["S/N", "amount", "method", "type", "date"]}
          >
            <TableBody sender={sender} tablebody={trans} />
          </TableHead>
        </div>
      </div>
    );
  }
}

export default Transactions;
