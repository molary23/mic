import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TableHead from "../../layout/TableHead";
import TableBody from "../../layout/TableBody";
import ProgressBar from "../../layout/ProgressBar";
import Select from "../../layout/Select";
import Spinner from "../../layout/Spinner";
import Toast from "../../layout/Toast";

import { RiFileExcel2Line } from "react-icons/ri";

import { getContent, clearActions } from "../../action/userAction";
import {
  searchContent,
  clearSearchActions,
} from "../../action/userSearchAction";

import {
  getMore,
  setSearchParams,
  landingLoad,
  renderArrange,
  downloadFile,
  setDocumentTitle,
} from "../../util/LoadFunction";

import Pagination from "../../util/Pagination";

export class Transactions extends Component {
  state = {
    sender: "user-transactions",
    loading: false,
    methodOptions: [
      { value: "", option: "Filter by Method" },
      { value: "b", option: "Bonus" },
      { value: "s", option: "Subscriptions" },
      { value: "w", option: "Withdrawal" },
    ],
    typeOptions: [
      { value: "", option: "Filter by Type" },
      { value: "d", option: "Debit" },
      { value: "c", option: "Credit" },
    ],
    type: "",
    method: "",
    limit: Pagination.limit,
    offset: Pagination.offset,
    numOfPages: Pagination.numberofpages,
    iScrollPos: Pagination.scrollposition,
    currentPage: Pagination.currentpage,
    lastScrollTop: 0,
    url: new URL(window.location),
    transcount:
      JSON.parse(localStorage.getItem("userCounts")).transactions ??
      this.props.auth.userCounts.transactions,
    content: "transactions",
    toast: false,
    toastcategory: null,
    toasttext: null,
  };

  componentDidMount() {
    setDocumentTitle("my transactions");
    const { limit, offset, transcount, content } = this.state;
    let searchParams = window.location.search;
    landingLoad({ limit, offset, self: this, content, searchParams });
    this.setState({
      numOfPages: Math.ceil(transcount / limit),
    });
    window.addEventListener("scroll", this.loadMore, { passive: true });
  }

  componentWillUnmount() {
    const { content } = this.state;
    window.removeEventListener("scroll", this.loadMore);
    this.props.clearActions(content);
    this.props.clearSearchActions(content);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.userSearch.searching !== this.props.userSearch.searching &&
      this.props.userSearch.searching
    ) {
      this.setState({
        numOfPages: (this.props.userSearch.transcount + 1) / this.state.limit,
      });
    }
  }

  loadMore = () => {
    const {
      limit,
      numOfPages,
      iScrollPos,
      currentPage,
      content,
      lastScrollTop,
    } = this.state;
    let searchParams = window.location.search,
      winScroll = window.scrollY,
      toTop = window.pageYOffset || document.documentElement.scrollTop;
    if (toTop > lastScrollTop) {
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
    }
    this.setState({
      lastScrollTop: toTop <= 0 ? 0 : toTop,
    });
  };

  changeHandler = (e) => {
    const { url, content, limit, offset, timer } = this.state;
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
      timer,
    });
  };

  downloadHandler = () => {
    const { sender } = this.state;
    downloadFile({ sender, self: this });
  };

  render() {
    const {
      sender,
      methodOptions,
      typeOptions,
      type,
      method,
      transcount,
      toast,
      toastcategory,
      toasttext,
    } = this.state;

    const { user, userSearch } = this.props;
    const { loading, fetching } = user;
    const { searching } = userSearch;
    const count = user.transcount,
      list = user.transactions,
      searchcount = userSearch.transcount,
      searchlist = userSearch.transactions,
      searchloading = userSearch.loading;

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
      transcount,
    });

    return (
      <div>
        {loader && <ProgressBar />}

        <div className="transactions card holder-card ">
          <div className="page-dash-title mb-4">
            <h1>Transactions</h1>
          </div>
          <div className="container-fluid mb-4">
            <div className="row">
              <div className="col-lg-3 col-md-6  col-12">
                <Select
                  sender={sender}
                  options={methodOptions}
                  onChange={this.changeHandler}
                  name="method"
                  value={method}
                />
              </div>
              <div className="col-lg-3 col-md-6  col-12">
                <Select
                  sender={sender}
                  options={typeOptions}
                  onChange={this.changeHandler}
                  name="type"
                  value={type}
                />
              </div>
              <div className="col-lg-2 col-md-6  col-12">
                <button
                  type="button"
                  className="btn download-btn"
                  onClick={this.downloadHandler}
                >
                  Download <RiFileExcel2Line />
                </button>
              </div>
              <div className="col-lg-4 col-md-6  col-12">
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
          {(noRecord || emptyRecord) && (
            <p className="no-records">No Record(s) found</p>
          )}
          {load ? (
            <Spinner />
          ) : (
            <TableHead
              sender={sender}
              head={["S/N", "amount", "method", "type", "date"]}
            >
              <TableBody
                sender={sender}
                tablebody={!showSearch ? main : searchMain}
              />
            </TableHead>
          )}
        </div>
        {toast && <Toast text={toasttext} category={toastcategory} />}
      </div>
    );
  }
}

Transactions.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.any,
  user: PropTypes.object.isRequired,
  userSearch: PropTypes.object,
  getContent: PropTypes.func,
  searchContent: PropTypes.func,
  clearActions: PropTypes.func,
  clearSearchActions: PropTypes.func,
  landingLoad: PropTypes.func,
  renderArrange: PropTypes.func,
  getMore: PropTypes.func,
  setSearchParams: PropTypes.func,
  downloadFile: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.user,
  userSearch: state.userSearch,
  errors: state.errors,
});
export default connect(mapStateToProps, {
  clearActions,
  getContent,
  searchContent,
  clearSearchActions,
})(Transactions);
