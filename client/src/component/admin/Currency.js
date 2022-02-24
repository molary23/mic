import React, { Component } from "react";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";

const cur = [
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
class Currency extends Component {
  state = {
    sender: "admin-currencies",
    loading: false,
    searchname: "",

    statusOpt: [
      { value: "", option: "Filter by Status" },
      { value: "1", option: "Active" },
      { value: "2", option: "Inactive" },
    ],
    searchcurrency: "",
    status: "",
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      loading: true,
    });
  };

  render() {
    const {
      loading,
      sender,
      status,

      statusOpt,

      searchcurrency,
    } = this.state;
    return (
      <div>
        {loading && <ProgressBar />}
        <div className="transactions card holder-card ">
          <div className="page-dash-title mb-4">
            <h1>Currencies</h1>
          </div>
          <div className="container-fluid mb-4">
            <div className="row">
              <div className="col-md-3">
                <SearchInput
                  sender={sender}
                  placeholder="Search by Name, Email, Username"
                  onChange={this.changeHandler}
                  name="searchcurrency"
                  value={searchcurrency}
                />
              </div>
              <div className="col-md-2">
                <Select
                  sender={sender}
                  options={statusOpt}
                  onChange={this.changeHandler}
                  name="status"
                  value={status}
                />
              </div>

              <div className="col-md-2">
                <button type="button" className="btn btn-outline-primary">
                  Download <i className="far fa-file-excel" />
                </button>
              </div>
              <div className="col-md-2">
                <button type="button" className="btn btn-outline-primary">
                  Add New <i className="fas fa-folder-plus" />
                </button>
              </div>
              <div className="col-md-3">
                <div className="transactions-total table-figure">
                  <h6>
                    Balance
                    <span className="badge rounded-pill bg-success">
                      2500000
                    </span>
                  </h6>
                </div>
              </div>
            </div>
          </div>

          <TableHead
            sender={sender}
            head={[
              "S/N",
              "currency name",
              "currency flag",
              "created at",
              "created by",
              "action",
            ]}
          >
            <TableBody sender={sender} tablebody={cur} />
          </TableHead>
        </div>
      </div>
    );
  }
}

export default Currency;
