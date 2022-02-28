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

class Accounts extends Component {
  state = {
    sender: "admin-accounts",
    search: "",
    limit: 4,
    offset: 0,
    numOfPages: 0,
    iScrollPos: 10,
    currentPage: 2,
    url: new URL(window.location),
    accountcount: JSON.parse(localStorage.getItem("counts")).accounts,
    startLoad: false,
    getLoad: true,
    content: "accounts",
  };

  componentDidMount() {
    const { limit, offset, accountcount, content } = this.state;

    const paginate = {
      limit,
      offset,
    };
    this.setState({
      numOfPages: Math.ceil(accountcount / limit),
      startLoad: true,
    });

    this.props.getContent(content, paginate);

    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  componentWillUnmount() {
    this.props.clearActions(this.state.content);
    this.props.clearSearchActions(this.state.content);
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
    const { sender, accountcount, isLoading, upLoad, search } = this.state;

    const { admin, searchTerms } = this.props;
    const { loading } = admin;
    const { fetching } = admin;
    const { searching } = searchTerms;

    let load = upLoad,
      loader = isLoading,
      accounts = [],
      searchaccounts,
      showSearch,
      emptyRecord = false,
      noRecord = false,
      totalText = "",
      totalCount = accountcount;

    if (fetching) {
      showSearch = false;
      loader = true;
      totalCount = admin.accCount;
      totalText = "Total User";
      if (admin.accounts === [] && loading) {
        loader = true;
        load = upLoad;
      } else if (admin.accounts.length > 0 && !loading) {
        accounts = admin.accounts;
        load = false;

        loader = false;
      } else if (admin.accounts.length > 0 && loading) {
        accounts = admin.accounts;
        load = false;
        loader = true;
      } else {
        load = false;
        emptyRecord = true;
        accounts = [];
      }
    }

    if (!searching) {
      showSearch = searching;
    } else {
      showSearch = true;
      loader = true;
      totalCount = searchTerms.accCount;
      totalText = "Selected/Searched";
      if (searchTerms.accounts === [] || searchTerms.accounts.length <= 0) {
        noRecord = true;
        searchaccounts = [];
        loader = false;
      } else if (searchTerms.accounts.length > 0 && !searchTerms.loading) {
        searchaccounts = searchTerms.accounts;
        loader = false;
      } else if (searchTerms.accounts.length > 0 && searchTerms.loading) {
        searchaccounts = searchTerms.accounts;
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
              <h1>Accounts</h1>
            </div>
            <div className="container-fluid mb-4">
              <div className="row">
                <div className="col-md-4 mb-2">
                  <SearchInput
                    sender={sender}
                    placeholder="Search by Name, Email, Username"
                    onChange={this.changeHandler}
                    name="search"
                    value={search}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <button type="button" className="btn btn-outline-primary">
                    Download <i className="far fa-file-excel" />
                  </button>
                </div>
                <div className="col-md-4 mb-2">
                  <div className="transactions-total table-figure">
                    <h6>
                      {totalText} Accounts
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
                "ussername",
                "category",
                "bank/wallet",
                "account number",
                "account type",
              ]}
            >
              <TableBody
                sender={sender}
                tablebody={!showSearch ? accounts : searchaccounts}
              />
            </TableHead>
          </div>
        )}
      </div>
    );
  }
}

Accounts.propTypes = {
  getContent: PropTypes.func.isRequired,
  searchContent: PropTypes.func.isRequired,
  clearActions: PropTypes.func.isRequired,
  clearSearchActions: PropTypes.func.isRequired,
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
})(Accounts);
