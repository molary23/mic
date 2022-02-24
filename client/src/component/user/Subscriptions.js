import React, { Component } from "react";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";

const sub = [
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
export class Subscriptions extends Component {
  state = {
    sender: "subscriptions",
    loading: false,
    statusOptions: [
      { value: "", option: "Filter by Status" },
      { value: "0", option: "Disapproved" },
      { value: "1", option: "Pending" },
      { value: "2", option: "Approved" },
    ],
    typeOptions: [
      { value: "", option: "Filter by Type" },
      { value: "b", option: "Bonus" },
      { value: "p", option: "Pay" },
    ],

    packageOptions: [
      { value: 0, option: "Filter by Package" },
      { value: "m", option: "Monthly" },
      { value: "y", option: "Yearly" },
    ],
    type: "",
    status: "",
    subPackage: "",
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      loading: true,
    });

    // select from DB
  };
  render() {
    const {
      loading,
      sender,
      statusOptions,
      typeOptions,
      packageOptions,
      type,
      status,
      subPackage,
    } = this.state;
    return (
      <div>
        {loading && <ProgressBar />}
        <div className="transactions card holder-card ">
          <div className="page-dash-title mb-4">
            <h1>Transactions</h1>
          </div>
          <div className="container-fluid mb-4">
            <div className="row">
              <div className="col-md-2">
                <Select
                  sender={sender}
                  options={statusOptions}
                  onChange={this.changeHandler}
                  name="status"
                  value={status}
                />
              </div>
              <div className="col-md-2">
                <Select
                  sender={sender}
                  options={typeOptions}
                  onChange={this.changeHandler}
                  name="type"
                  value={type}
                />
              </div>
              <div className="col-md-2">
                <Select
                  sender={sender}
                  options={packageOptions}
                  onChange={this.changeHandler}
                  name="subPackage"
                  value={subPackage}
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
              "status",
              "type",
              "package",
              "duration",
              "plan",
              "date",
            ]}
          >
            <TableBody sender={sender} tablebody={sub} />
          </TableHead>
        </div>
      </div>
    );
  }
}

export default Subscriptions;
