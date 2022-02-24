import React, { Component } from "react";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";

const users = [
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

class Users extends Component {
  state = {
    sender: "admin-users",
    loading: false,
    searchname: "",

    premiumstatusOpt: [
      { value: "", option: "Filter by Package" },
      { value: "1", option: "Active" },
      { value: "2", option: "Inactive" },
    ],

    premiumstatus: "",
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
      premiumstatus,

      premiumstatusOpt,

      searchname,
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
              <div className="col-md-3">
                <SearchInput
                  sender={sender}
                  placeholder="Search by Name, Email, Username"
                  onChange={this.changeHandler}
                  name="searchname"
                  value={searchname}
                />
              </div>
              <div className="col-md-2">
                <Select
                  sender={sender}
                  options={premiumstatusOpt}
                  onChange={this.changeHandler}
                  name="premiumstatus"
                  value={premiumstatus}
                />
              </div>

              <div className="col-md-2">
                <button type="button" className="btn btn-outline-primary">
                  Download <i className="far fa-file-excel" />
                </button>
              </div>
              <div className="col-md-2">
                <button type="button" className="btn btn-outline-primary">
                  Add SP <i className="fas fa-user-plus" />
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
              "amount",
              "Fullname",
              "email",
              "phone number",
              "Premium Status",
              "Registration Date",
              "View",
            ]}
          >
            <TableBody sender={sender} tablebody={users} />
          </TableHead>
        </div>
      </div>
    );
  }
}

export default Users;
