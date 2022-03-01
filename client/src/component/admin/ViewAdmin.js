import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getContent, clearActions } from "../../action/adminAction";
import { searchContent, clearSearchActions } from "../../action/searchAction";

import { getMore, setSearchParams } from "../../util/LoadFunction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import SearchInput from "../../layout/SearchInput";
import Select from "../../layout/Select";

class ViewAdmin extends Component {
  state = {
    sender: "admin-admins",
    search: "",
    statusOpt: [
      { value: "", option: "Filter by Package" },
      { value: "1", option: "Active" },
      { value: "2", option: "Inactive" },
    ],
    status: "",
    limit: 4,
    offset: 0,
    numOfPages: 0,
    iScrollPos: 10,
    currentPage: 2,
    url: new URL(window.location),
    isLoading: false,
    doneTypingInterval: 5000,
    upLoad: true,
    admincount: JSON.parse(localStorage.getItem("counts")).admins,
    content: "admins",
  };

  componentDidMount() {
    const { limit, offset, admincount, content } = this.state;

    const paginate = {
      limit,
      offset,
    };
    this.setState({
      numOfPages: Math.ceil(admincount / limit),
    });

    this.props.getContent(content, paginate);

    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  componentWillUnmount() {
    const { content } = this.state;
    this.props.clearActions(content);
    this.props.clearSearchActions(content);
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
      loading: true,
    });
    setSearchParams({
      selected: e.target.name,
      valueOfSelected: e.target.value,
      url,
      content,
      limit,
      offset,
      doneTypingInterval: this.state.doneTypingInterval,
      self: this,
    });
  };

  render() {
    const { sender, admincount, isLoading, upLoad, search, statusOpt, status } =
      this.state;

    const { admin, searchTerms } = this.props;
    const { loading } = admin;
    const { fetching } = admin;
    const { searching } = searchTerms;

    console.log(admin.admins);

    let load = upLoad,
      loader = isLoading,
      admins = [],
      searchadmins,
      showSearch,
      emptyRecord = false,
      noRecord = false,
      totalText = "",
      totalCount = admincount;

    if (fetching) {
      showSearch = false;
      loader = true;
      totalCount = admin.adCount;
      totalText = "Total Admins";
      if (admin.admins === [] && loading) {
        loader = true;
        load = upLoad;
      } else if (admin.admins.length > 0 && !loading) {
        admins = admin.admins;
        load = false;

        loader = false;
      } else if (admin.admins.length > 0 && loading) {
        admins = admin.admins;
        load = false;
        loader = true;
      } else {
        load = false;
        emptyRecord = true;
        admins = [];
      }
    }

    if (!searching) {
      showSearch = searching;
    } else {
      showSearch = true;
      loader = true;
      totalCount = searchTerms.adCount;
      totalText = "Selected/Searched Admins";
      if (searchTerms.admins === [] || searchTerms.admins.length <= 0) {
        noRecord = true;
        searchadmins = [];
        loader = false;
      } else if (searchTerms.admins.length > 0 && !searchTerms.loading) {
        searchadmins = searchTerms.admins;
        loader = false;
      } else if (searchTerms.admins.length > 0 && searchTerms.loading) {
        searchadmins = searchTerms.admins;
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
                    options={statusOpt}
                    onChange={this.changeHandler}
                    name="status"
                    value={status}
                  />
                </div>
                <div className="col-md-2 mb-3">
                  <button type="button" className="btn btn-outline-primary">
                    Download <i className="far fa-file-excel" />
                  </button>
                </div>
                <div className="col-md-2 mb-3">
                  <button type="button" className="btn btn-outline-primary">
                    Add Admin <i className="fas fa-user-plus" />
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
                "View",
              ]}
            >
              <TableBody
                sender={sender}
                tablebody={!showSearch ? admins : searchadmins}
              />
            </TableHead>
          </div>
        )}
      </div>
    );
  }
}

ViewAdmin.propTypes = {
  getContent: PropTypes.func,
  searchContent: PropTypes.func,
  auth: PropTypes.object.isRequired,
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
})(ViewAdmin);
