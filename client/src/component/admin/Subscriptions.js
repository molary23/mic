import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getSub } from "../../action/adminAction";
import { getTableCount } from "../../action/adminAction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";
let iScrollPos = 10,
  currentPage = 2;
export class Subscriptions extends Component {
  state = {
    sender: "admin-subscriptions",
    searchname: "",
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
    limit: 4,
    offset: 0,
    sub: "",
    subcount: {},
  };

  componentDidMount() {
    const { limit, offset } = this.state;
    const paginate = {
      limit,
      offset,
    };
    this.props.getSub(paginate);
    this.props.getTableCount("subscriptions");

    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.loadMore);
    sessionStorage.removeItem("subcount");
  }

  loadMore = () => {
    const { limit } = this.state;
    let subcount = sessionStorage.getItem("subcount"),
      numOfPages = Math.ceil(subcount / limit);
    let winScroll = window.scrollY;
    if (winScroll > iScrollPos) {
      if (currentPage <= numOfPages) {
        this.setState((prevState) => ({
          offset: prevState.offset + limit,
        }));
        const paginate = {
          offset: this.state.offset,
          limit: this.state.limit,
        };
        this.props.getSub(paginate);
        currentPage++;
      }
    }
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
      sender,
      statusOptions,
      typeOptions,
      packageOptions,
      type,
      status,
      subPackage,
      searchname,
    } = this.state;
    const { admin } = this.props;
    const { loading } = admin;
    console.log(admin.sub, loading);
    let load = true,
      loader = false,
      sub;
    if (admin.sub === [] && loading) {
      load = true;
    } else if (admin.sub.length > 0 && !loading) {
      sub = admin.sub;
      load = false;
      loader = false;
    } else if (admin.sub.length > 0 && loading) {
      loader = true;
    }
    return (
      <div>
        {loader && (
          <div>
            <ProgressBar />
          </div>
        )}
        {load ? (
          <div className="loader">
            <ProgressBar />
            <div>
              <i className="fas fa-circle-notch fa-2x fa-spin" />
            </div>
          </div>
        ) : (
          <div className="transactions card holder-card ">
            <div className="page-dash-title mb-4">
              <h1>Subscriptions</h1>
            </div>
            <div className="container-fluid mb-4">
              <div className="row">
                <div className="col-md-2">
                  <SearchInput
                    sender={sender}
                    placeholder="Search by Name"
                    onChange={this.changeHandler}
                    name="searchname"
                    value={searchname}
                  />
                </div>
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
                <div className="col-md-2">
                  <button type="button" className="btn btn-outline-primary">
                    Download <i className="far fa-file-excel" />
                  </button>
                </div>
                <div className="col-md-2">
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
                "User Fullname",
                "type",
                "package",
                "plan",
                "date",
              ]}
            >
              <TableBody sender={sender} tablebody={sub} />
            </TableHead>
          </div>
        )}
      </div>
    );
  }
}

Subscriptions.propTypes = {
  getSub: PropTypes.func,
  getTableCount: PropTypes.func,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
});
export default connect(mapStateToProps, { getSub, getTableCount })(
  Subscriptions
);
