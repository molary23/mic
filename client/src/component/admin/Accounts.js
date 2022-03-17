import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { RiFileExcel2Line } from "react-icons/ri";

import { getContent, clearActions } from "../../action/adminAction";
import { searchContent, clearSearchActions } from "../../action/searchAction";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import SearchInput from "../../layout/SearchInput";
import Spinner from "../../layout/Spinner";

import {
  getMore,
  setSearchParams,
  renderArrange,
  loadFromParams,
} from "../../util/LoadFunction";
import Pagination from "../../util/Pagination";

class Accounts extends Component {
  state = {
    sender: "admin-accounts",
    search: "",
    limit: Pagination.limit,
    offset: Pagination.offset,
    numOfPages: Pagination.numberofpages,
    iScrollPos: Pagination.scrollposition,
    currentPage: Pagination.currentpage,
    url: new URL(window.location),
    accountcount: JSON.parse(localStorage.getItem("counts")).accounts,
    startLoad: false,
    getLoad: true,
    content: "accounts",
  };

  componentDidMount() {
    const { limit, offset, accountcount, content } = this.state;

    let searchParams = window.location.search;

    if (searchParams !== "") {
      loadFromParams({ limit, self: this, content, searchParams });
    } else {
      const paginate = {
        limit,
        offset,
      };
      this.props.getContent(content, paginate);
    }
    this.setState({
      numOfPages: Math.ceil(accountcount / limit),
      startLoad: true,
    });

    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  componentWillUnmount() {
    const { content } = this.state;
    window.removeEventListener("scroll", this.loadMore);
    this.props.clearActions(content);
    this.props.clearSearchActions(content);
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
    const { sender, accountcount, search, startLoad, getLoad } = this.state;

    const { admin, searchTerms } = this.props;
    const { loading } = admin;
    const { fetching } = admin;
    const { searching } = searchTerms;
    const count = admin.accCount,
      list = admin.accounts,
      searchcount = searchTerms.accCount,
      searchlist = searchTerms.accounts,
      searchloading = searchTerms.loading;

    const {
      showSearch,
      main,
      searchMain,
      emptyRecord,
      noRecord,
      totalText,
      totalCount,
      load,
      loader,
    } = renderArrange({
      fetching,
      loading,
      list,
      count,
      searching,
      searchcount,
      searchlist,
      searchloading,
      startLoad,
      getLoad,
      accountcount,
    });

    return (
      <div>
        {loader && <ProgressBar />}
        {load ? (
          <Spinner />
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
                    placeholder="Search by Name, Username, Wallet and Account Number"
                    onChange={this.changeHandler}
                    name="search"
                    value={search}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <button type="button" className="btn download-btn">
                    Download <RiFileExcel2Line />
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
            {(noRecord || emptyRecord) && (
              <p className="no-records">No Record(s) found</p>
            )}
            <TableHead
              sender={sender}
              head={[
                "S/N",
                "Fullname",
                "ussername",
                "wallet",
                "account number",
                "added",
                "changed",
              ]}
            >
              <TableBody
                sender={sender}
                tablebody={!showSearch ? main : searchMain}
              />
            </TableHead>
          </div>
        )}
      </div>
    );
  }
}

Accounts.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.any,
  admin: PropTypes.object.isRequired,
  searchTerms: PropTypes.object,
  getContent: PropTypes.func.isRequired,
  clearActions: PropTypes.func,
  searchContent: PropTypes.func,
  clearSearchActions: PropTypes.func,
  renderArrange: PropTypes.func,
  setSearchParams: PropTypes.func,
  loadFromParams: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  admin: state.admin,
  searchTerms: state.searchTerms,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  clearActions,
  getContent,
  searchContent,
  clearSearchActions,
})(Accounts);
