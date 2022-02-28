import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getContent, clearActions } from "../../action/adminAction";
import { searchContent, clearSearchActions } from "../../action/searchAction";

import { getMore, setSearchParams } from "../../util/LoadFunction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import SearchInput from "../../layout/SearchInput";

let typingTimer;
class Users extends Component {
  state = {
    sender: "admin-users",
    search: "",
    premiumstatusOpt: [
      { value: "", option: "Filter by Package" },
      { value: "1", option: "Active" },
      { value: "2", option: "Inactive" },
    ],
    premiumstatus: "",
    limit: 4,
    offset: 0,
    numOfPages: 0,
    iScrollPos: 10,
    currentPage: 2,
    url: new URL(window.location),
    usercount: JSON.parse(localStorage.getItem("counts")).users,
    startLoad: false,
    getLoad: true,
    content: "users",
  };

  componentDidMount() {
    const { limit, offset, usercount, content } = this.state;

    const paginate = {
      limit,
      offset,
    };
    this.setState({
      numOfPages: Math.ceil(usercount / limit),
      startLoad: true,
    });

    this.props.getContent(content, paginate);

    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  componentWillUnmount() {
    this.props.clearActions("users");
    this.props.clearSearchActions("users");
    window.removeEventListener("scroll", this.loadMore);
  }

  loadMore = () => {
    const { limit, numOfPages, iScrollPos, currentPage, content } = this.state;
    let searchParams = window.location.search,
      winScroll = window.scrollY;
    getMore({
      limit,
      numOfPages,
      iScrollPos,
      currentPage,
      content,
      winScroll,
      searchParams,
      self: this,
    });
  };

  changeHandler = (e) => {
    const { url, content, limit, offset } = this.state;
    this.setState({
      [e.target.name]: e.target.value,
    });

    setSearchParams({
      selected: e.target.name,
      valueOfSelected: e.target.value,
      url,
      content,
      limit,
      offset,
      self: this,
    });
  };

  render() {
    const {
      sender,
      premiumstatus,
      premiumstatusOpt,
      usercount,
      isLoading,
      upLoad,
      search,
    } = this.state;

    const { admin, searchTerms } = this.props;
    const { loading } = admin;
    const { fetching } = admin;
    const { searching } = searchTerms;

    let load = upLoad,
      loader = isLoading,
      users = [],
      searchUsers,
      showSearch,
      emptyRecord = false,
      noRecord = false,
      totalText = "",
      totalCount = usercount;

    console.log(admin.users);
    if (fetching) {
      showSearch = false;
      loader = true;
      totalCount = admin.usersCount;
      totalText = "Total User";
      if (admin.users === [] && loading) {
        loader = true;
        load = upLoad;
      } else if (admin.users.length > 0 && !loading) {
        users = admin.users;
        load = false;

        loader = false;
      } else if (admin.users.length > 0 && loading) {
        users = admin.users;
        load = false;
        loader = true;
      } else {
        load = false;
        emptyRecord = true;
        users = [];
      }
    }

    if (!searching) {
      showSearch = searching;
    } else {
      showSearch = true;
      loader = true;
      if (searchTerms.users === [] || searchTerms.users.length <= 0) {
        noRecord = true;
        searchUsers = [];
        loader = false;
      } else if (searchTerms.users.length > 0 && !searchTerms.loading) {
        searchUsers = searchTerms.users;
        loader = false;
      } else if (searchTerms.users.length > 0 && searchTerms.loading) {
        searchUsers = searchTerms.users;
        loader = true;
      }
    }
    return (
      <div>
        {loader && <ProgressBar />}
        {load ? (
          <div className="loader">
            <i className="fas fa-circle-notch fa-2x fa-spin" />
          </div>
        ) : (
          <div className="transactions card holder-card ">
            <div className="page-dash-title mb-4">
              <h1>Transactions</h1>
            </div>
            <div className="container-fluid mb-4">
              <div className="row">
                <div className="col-md-3 mb-2">
                  <SearchInput
                    sender={sender}
                    placeholder="Search by Name, Email, Username"
                    onChange={this.changeHandler}
                    name="search"
                    value={search}
                  />
                </div>
                <div className="col-md-2 mb-3">
                  <Select
                    sender={sender}
                    options={premiumstatusOpt}
                    onChange={this.changeHandler}
                    name="premiumstatus"
                    value={premiumstatus}
                  />
                </div>

                <div className="col-md-2 mb-3">
                  <button type="button" className="btn btn-outline-primary">
                    Download <i className="far fa-file-excel" />
                  </button>
                </div>
                <div className="col-md-2 mb-3">
                  <button type="button" className="btn btn-outline-primary">
                    Add SP <i className="fas fa-user-plus" />
                  </button>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="transactions-total table-figure">
                    <h6>
                      {totalText}
                      <span className="badge rounded-pill bg-success">
                        {totalCount}
                      </span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            {(noRecord || emptyRecord) && "No Record(s) found"}
            <TableHead
              sender={sender}
              head={[
                "S/N",
                "Fullname",
                "email",
                "ussername",
                "phone number",
                "User Status ",
                "Premium Status",
                "View",
              ]}
            >
              <TableBody
                sender={sender}
                tablebody={!showSearch ? users : searchUsers}
              />
            </TableHead>
          </div>
        )}
      </div>
    );
  }
}

Users.propTypes = {
  getContent: PropTypes.func,
  searchContent: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  searchTerms: state.searchTerms,
});
export default connect(mapStateToProps, {
  clearActions,
  getContent,
  searchContent,
  clearSearchActions,
})(Users);
