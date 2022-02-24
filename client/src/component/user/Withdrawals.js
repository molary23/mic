import React, { Component } from "react";

import TableBody from "../../layout/TableBody";
import TableHead from "../../layout/TableHead";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";

const withdraw = [
  {
    amount: 200,
    reference: "bonus",
    status: "credit",
    date: new Date(),
    update: new Date(),
  },
  {
    amount: 400,
    reference: "bonus",
    status: "credit",
    date: new Date(),
    update: new Date(),
  },
  {
    amount: 250,
    reference: "withdrawal",
    status: "debit",
    date: new Date(),
    update: new Date(),
  },
  {
    amount: 600,
    reference: "subscription",
    status: "debit",
    date: new Date(),
    update: new Date(),
  },
  {
    amount: 700,
    reference: "bonus",
    status: "credit",
    date: new Date(),
    update: new Date(),
  },
  {
    amount: 100,
    reference: "bonus",
    status: "credit",
    date: new Date(),
    update: new Date(),
  },
  {
    amount: 500,
    reference: "bonus",
    status: "credit",
    date: new Date(),
    update: new Date(),
  },
  {
    amount: 400,
    reference: "subscription",
    status: "debit",
    date: new Date(),
    update: new Date(),
  },
  {
    amount: 650,
    reference: "bonus",
    status: "credit",
    date: new Date(),
    update: new Date(),
  },
];
export default class Withdrawals extends Component {
  state = {
    sender: "withdrawals",
    loading: false,
    withOptions: [
      { value: 0, option: "Filter by Use" },
      { value: "p", option: "Payout" },
      { value: "s", option: "Subscriptions" },
    ],
    use: "",
  };

  changeHandler = () => {};
  render() {
    const { loading, sender, withOptions, use } = this.state;
    return (
      <div>
        {loading && <ProgressBar />}
        <div className="withdrawals card holder-card ">
          <div className="page-dash-title mb-4">
            <h1>Withdrawals</h1>
          </div>
          <div className="container-fluid mb-4">
            <div className="row">
              <div className="col-md-3">
                <Select
                  sender={sender}
                  options={withOptions}
                  onChange={this.changeHandler}
                  name="use"
                  value={use}
                />
              </div>
              <div className="col-md-3">
                <button type="button" className="btn btn-outline-primary">
                  Download <i className="far fa-file-excel" />
                </button>
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
            head={[
              "S/N",
              "amount",
              "Use",
              "status",
              "request date",
              "approved date",
            ]}
          >
            <TableBody sender={sender} tablebody={withdraw} />
          </TableHead>
        </div>
      </div>
    );
  }
}
