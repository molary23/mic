import React, { Component } from "react";

import TableBody from "../../layout/TableBody";
import TableHead from "../../layout/TableHead";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";

const pay = [
  {
    amount: 200,
    reference: "bonus",
    status: "credit",
    date: new Date(),
  },
  {
    amount: 400,
    reference: "bonus",
    status: "credit",
    date: new Date(),
  },
  {
    amount: 250,
    reference: "withdrawal",
    status: "debit",
    date: new Date(),
  },
  {
    amount: 600,
    reference: "subscription",
    status: "debit",
    date: new Date(),
  },
  {
    amount: 700,
    reference: "bonus",
    status: "credit",
    date: new Date(),
  },
  {
    amount: 100,
    reference: "bonus",
    status: "credit",
    date: new Date(),
  },
  {
    amount: 500,
    reference: "bonus",
    status: "credit",
    date: new Date(),
  },
  {
    amount: 400,
    reference: "subscription",
    status: "debit",
    date: new Date(),
  },
  {
    amount: 650,
    reference: "bonus",
    status: "credit",
    date: new Date(),
  },
];
export class Payments extends Component {
  state = {
    sender: "admin-payments",
    loading: false,
    statusOptions: [
      { value: 0, option: "Filter by Status" },
      { value: "f", option: "Failed" },
      { value: "s", option: "Success" },
    ],
    status: "",
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      loading: true,
    });

    // select from DB
  };

  render() {
    const { loading, sender, statusOptions, status } = this.state;
    return (
      <div>
        {loading && <ProgressBar />}
        <div className="payments card holder-card ">
          <div className="page-dash-title mb-4">
            <h1>Payments</h1>
          </div>
          <div className="container-fluid mb-4">
            <div className="row">
              <div className="col-md-3">
                <Select
                  sender={sender}
                  options={statusOptions}
                  onChange={this.changeHandler}
                  name="status"
                  value={status}
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
              "Payer",
              "Payment Gateway",
              "reference",
              "status",
              "date",
            ]}
          >
            <TableBody sender={sender} tablebody={pay} />
          </TableHead>
        </div>
      </div>
    );
  }
}

export default Payments;
