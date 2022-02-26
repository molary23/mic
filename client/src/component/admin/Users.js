import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getUser, clearActions } from "../../action/adminAction";
import { searchUser, clearSearchActions } from "../../action/searchAction";

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
    isLoading: false,
    doneTypingInterval: 5000,
    usercount: JSON.parse(sessionStorage.getItem("tableCounts")).users,
    upLoad: true,
  };

  componentDidMount() {
    const { limit, offset, usercount } = this.state;

    const paginate = {
      limit,
      offset,
    };
    this.setState({
      numOfPages: Math.ceil(usercount / limit),
    });

    this.props.getUser(paginate);

    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  componentWillUnmount() {
    this.props.clearActions("users");
    this.props.clearSearchActions("users");
    window.removeEventListener("scroll", this.loadMore);
  }

  loadMore = () => {
    const { limit, numOfPages, iScrollPos, currentPage } = this.state;
    let searchParams = window.location.search;

    let winScroll = window.scrollY;

    if (winScroll > iScrollPos) {
      if (currentPage <= numOfPages) {
        this.setState((prevState) => ({
          offset: prevState.offset + limit,
        }));

        if (searchParams !== "") {
          let queryTerms = searchParams.split("?")[1];
          queryTerms = queryTerms.split("&");
          let terms = queryTerms.map((term) => term.split("="));
          let params = Object.fromEntries(terms);
          params.offset = this.state.offset;
          params.limit = this.state.limit;
          // Search Now
          this.props.searchUser(params);
        } else {
          const paginate = {
            offset: this.state.offset,
            limit: this.state.limit,
          };
          this.props.getUser(paginate);
        }

        this.setState({
          currentPage: this.state.currentPage + 1,
        });
      }
    }
  };

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      loading: true,
    });
    this.setSearchParams(e.target.name, e.target.value);
  };

  setSearchParams = (selected, valueOfSelected) => {
    const { url } = this.state;
    this.setState({
      offset: 0,
      limit: 4,
      currentPage: 2,
    });
    if (valueOfSelected !== "") {
      url.searchParams.set(selected, valueOfSelected);
      window.history.pushState({}, "", url);
    } else if (valueOfSelected === "") {
      url.searchParams.delete(selected);
      window.history.pushState({}, "", url);
    }

    let searchParams = window.location.search;
    if (searchParams !== "") {
      let queryTerms = searchParams.split("?")[1];
      queryTerms = queryTerms.split("&");
      let terms = queryTerms.map((term) => term.split("="));
      let params = Object.fromEntries(terms);
      console.log(params);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      params.offset = 0;
      params.limit = this.state.limit;

      // Search Now
      this.props.clearSearchActions("users");
      if (selected === "search") {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          this.setState({
            isLoading: true,
          });
          this.props.searchUser(params);
        }, this.state.doneTypingInterval);
      } else {
        this.setState({
          isLoading: true,
        });
        this.props.searchUser(params);
      }
    } else {
      const paginate = {
        offset: 0,
        limit: this.state.limit,
      };
      this.props.clearActions("users");
      this.setState((prevState) => ({
        upLoad: (prevState.upLoad = false),
      }));
      this.props.getUser(paginate);
    }
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
      totalCount = 0;

    console.log(admin.users);
    if (fetching) {
      showSearch = false;
      loader = true;
      totalCount = admin.usersCount;
      totalText = "Total Students";
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
        {loader || load ? (
          <div>
            <ProgressBar loading={{ loader, load }} />
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
  getUser: PropTypes.func,
  searchUsers: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  searchTerms: state.searchTerms,
});
export default connect(mapStateToProps, {
  clearActions,
  getUser,
  searchUser,
  clearSearchActions,
})(Users);
