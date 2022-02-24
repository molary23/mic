import React, { Component } from "react";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import SearchInput from "../../layout/SearchInput";
import Select from "../../layout/Select";

const refer = [
  {
    referred: 200,
    createdAt: new Date(),
    status: "inactive",
  },
  {
    referred: 400,
    createdAt: new Date(),
    status: "active",
  },
  {
    referred: 250,
    createdAt: new Date(),
    status: "active",
  },
  {
    referred: 600,
    createdAt: new Date(),
    status: "active",
  },
  {
    referred: 700,
    createdAt: new Date(),
    status: "active",
  },
  {
    referred: 100,
    createdAt: new Date(),
    status: "inactive",
  },
  {
    referred: 500,
    createdAt: new Date(),
    status: "active",
  },
  {
    referred: 400,
    createdAt: new Date(),
    status: "active",
  },
  {
    referred: 650,
    createdAt: new Date(),
    status: "active",
  },
];

export class Referrals extends Component {
  state = {
    sender: "admin-referrals",
    loading: false,
    referred: "",
    statusOptions: [
      { value: 0, option: "Filter by Status" },
      { value: "a", option: "Active" },
      { value: "i", option: "Inactive" },
    ],
    premiumstatus: "",
  };

  changeHandler = (e) => {};
  render() {
    const { loading, sender, referred, premiumstatus, statusOptions } =
      this.state;
    return (
      <div>
        {loading && <ProgressBar />}
        <div className="transactions card holder-card ">
          <div className="page-dash-title mb-4">
            <h1>Referrals</h1>
          </div>
          <div className="container-fluid mb-3">
            <div className="row">
              <div className="col-md-3">
                <SearchInput
                  placeholder="Search by Name"
                  type="text"
                  name="referred"
                  value={referred}
                  onChange={this.changeHandler}
                />
              </div>
              <div className="col-md-3 ">
                <Select
                  sender={sender}
                  options={statusOptions}
                  onChange={this.changeHandler}
                  name="premiumstatus"
                  value={premiumstatus}
                />
              </div>
              <div className="col-md-3 ">
                <button type="button" className="btn btn-outline-primary">
                  Download <i className="far fa-file-excel" />
                </button>
              </div>
              <div className="col-md-3 ">
                <div className="table-figure">
                  <h5>
                    Total
                    <span className="badge rounded-pill bg-success">
                      2500000
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <TableHead
            sender={sender}
            head={[
              "S/N",
              "Referred Name",
              "email",
              "phone number",
              "Status",
              "Referral Name",
              "registered date",
            ]}
          >
            <TableBody sender={sender} tablebody={refer} />
          </TableHead>
        </div>
      </div>
    );
  }
}

export default Referrals;
